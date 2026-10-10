/*
 * Сервер заказов TechAgent — база покупок с сайта и кабинета покупателя.
 *
 * Стоит на российском сервере (srv91, LiteHost): данные покупателей хранятся в РФ, как обещает политика.
 * nginx отдаёт ему всё под /api/ (кроме /api/partner-application — это PHP), сайт по-прежнему на Railway.
 * Без внешних пакетов: Node 22+ (встроенные http, sqlite, crypto). Письма — через msmtp сервера.
 *
 * Покупатель: оформляет заказ → входит по коду на email → видит свои заказы и этапы.
 * Сотрудник ТехЭйджент (/staff): входит по паролю → подтверждает наличие, даёт ссылку на оплату,
 * отмечает оплату, отправку (трек СДЭК), прибытие и получение. Каждое действие уходит покупателю письмом.
 *
 * Настройки — переменные окружения (на сервере /etc/techagent-api.env, пример: api/techagent-api.env.example).
 */
import http from 'node:http'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import { sendMail, mailReady } from './mail.mjs'
import * as letters from './letters.mjs'
import { cdekReady, suggestCities, cityPoints, findPoint } from './cdek.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const env = (k, d = '') => process.env[k] ?? d

const PORT = Number(env('PORT', '8787'))
const DB_PATH = env('DB_PATH', path.join(HERE, 'data/techagent.db'))
const CATALOG_PATH = env('CATALOG_PATH', path.join(HERE, 'catalog.json'))
/** Пункты выдачи партнёров TechAgent (радиорынки и магазины электроники): синие точки на карте оформления */
const PARTNER_POINTS_PATH = env('PARTNER_POINTS_PATH', path.join(HERE, 'partner-points.json'))
const DELIVERY_PRICE = Number(env('DELIVERY_PRICE', '350'))
const ORDERS_EMAIL_TO = env('ORDERS_EMAIL_TO', '')
/** Пароль сотрудников: scrypt$соль$хэш (задаётся командой api/set-staff-password.mjs) */
const STAFF_PASSWORD_HASH = env('STAFF_PASSWORD_HASH', '')
/** Локальная разработка: код входа возвращается в ответе, cookie без Secure */
const DEV = env('DEV') === '1'
const PUBLIC_URL = env('PUBLIC_URL', 'https://techagent.pro')
/** Ключ JavaScript API Яндекс Карт — открытый по природе (ограничивается адресом сайта в кабинете Яндекса) */
const YMAPS_KEY = env('YMAPS_KEY', '')

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
const db = new DatabaseSync(DB_PATH)
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS buyers (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    sdek_point TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    number TEXT NOT NULL UNIQUE,
    buyer_id INTEGER NOT NULL REFERENCES buyers(id),
    status TEXT NOT NULL,
    items TEXT NOT NULL,
    goods_total INTEGER NOT NULL,
    delivery INTEGER NOT NULL,
    total INTEGER NOT NULL,
    buyer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    sdek_point TEXT NOT NULL,
    comment TEXT NOT NULL DEFAULT '',
    payment_url TEXT NOT NULL DEFAULT '',
    track_number TEXT NOT NULL DEFAULT '',
    staff_note TEXT NOT NULL DEFAULT '',
    cancel_reason TEXT NOT NULL DEFAULT '',
    offer_accepted_at TEXT NOT NULL,
    pd_consent_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS orders_buyer ON orders(buyer_id);
  CREATE INDEX IF NOT EXISTS orders_status ON orders(status);
  CREATE TABLE IF NOT EXISTS order_events (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    status TEXT NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS events_order ON order_events(order_id);
  CREATE TABLE IF NOT EXISTS login_codes (
    email TEXT PRIMARY KEY,
    code_hash TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    sent_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    buyer_id INTEGER,
    expires_at INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
`)

/* Колонки, добавленные позже: выбранный на карте пункт СДЭК */
for (const [col, def] of [['sdek_city_code', 'INTEGER'], ['sdek_point_code', "TEXT NOT NULL DEFAULT ''"], ['pickup_type', "TEXT NOT NULL DEFAULT 'SDEK'"]]) {
  if (!db.prepare('PRAGMA table_info(orders)').all().some((c) => c.name === col)) db.exec(`ALTER TABLE orders ADD COLUMN ${col} ${def}`)
}

/* ── Этапы заказа с сайта ── */
export const STATUSES = ['NEW', 'AWAITING_PAYMENT', 'PAID', 'SHIPPED', 'READY', 'RECEIVED', 'CANCELLED']
/** Куда сотрудник может перевести заказ из каждого этапа */
const NEXT = {
  NEW: ['AWAITING_PAYMENT', 'CANCELLED'],
  AWAITING_PAYMENT: ['PAID', 'CANCELLED'],
  PAID: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['READY', 'CANCELLED'],
  READY: ['RECEIVED', 'CANCELLED'],
  RECEIVED: [],
  CANCELLED: [],
}

const now = () => new Date().toISOString()
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex')

let catalog = {}
function loadCatalog() {
  try {
    catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'))
  } catch (e) {
    console.error('catalog.json не прочитан:', e.message)
  }
}
loadCatalog()

/* Пункты партнёров. active=false — партнёра в этом месте ещё нет: покупатели точку не видят, демо-кабинет видит */
let partnerPoints = []
try {
  partnerPoints = JSON.parse(fs.readFileSync(PARTNER_POINTS_PATH, 'utf8'))
} catch (e) {
  console.error('partner-points.json не прочитан:', e.message)
}
const partnersOf = (cityCode, withPlanned) =>
  partnerPoints
    .filter((p) => p.cityCode === Number(cityCode) && (p.active || withPlanned))
    .map(({ code, name, address, lat, lon, workTime, note, active }) => ({ code, type: 'PARTNER', name, address, lat, lon, workTime, note, active }))

/* ── Демо-кабинет покупателя: вход без кода, примеры заказов на разных этапах ──
 * Адрес demo@techagent.pro зарезервирован: на него нельзя оформить заказ и получить код, профиль не сохраняется.
 * Заказы демо-покупателя не попадают в раздел сотрудников. При каждом запуске сервера примеры пересоздаются
 * со свежими датами («вчера», «неделю назад»). */
const DEMO_EMAIL = 'demo@techagent.pro'
function seedDemo() {
  const t = now()
  db.prepare(`INSERT INTO buyers (email, name, phone, city, sdek_point, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET name = excluded.name, phone = excluded.phone, city = excluded.city, sdek_point = excluded.sdek_point`)
    .run(DEMO_EMAIL, 'Иванов Иван', '+7 900 123-45-67', 'Москва', 'ул. Ленина, 10 (пункт СДЭК MSK123)', t, t)
  const buyer = db.prepare('SELECT id FROM buyers WHERE email = ?').get(DEMO_EMAIL)
  const old = db.prepare('SELECT id FROM orders WHERE buyer_id = ?').all(buyer.id)
  for (const o of old) db.prepare('DELETE FROM order_events WHERE order_id = ?').run(o.id)
  db.prepare('DELETE FROM orders WHERE buyer_id = ?').run(buyer.id)

  const ago = (days, hours = 0) => new Date(Date.now() - (days * 24 + hours) * 3600_000).toISOString()
  const day = (iso) => iso.slice(2, 10).replace(/-/g, '')
  const examples = [
    { items: [['iph15pm256w', 1], ['airpodspro2', 1]], steps: [['NEW', ago(0, 6)], ['AWAITING_PAYMENT', ago(0, 5)]],
      paymentUrl: 'https://techagent.pro/legal/payment' },
    { items: [['sgts24u256b', 1]], steps: [['NEW', ago(4)], ['AWAITING_PAYMENT', ago(4, -1)], ['PAID', ago(3, 20)], ['SHIPPED', ago(2)]],
      track: '1534672980' },
    { items: [['macbookairm3256', 1]], steps: [['NEW', ago(18)], ['AWAITING_PAYMENT', ago(18, -1)], ['PAID', ago(17)], ['SHIPPED', ago(15)], ['READY', ago(9)], ['RECEIVED', ago(8)]],
      track: '1528841207' },
    { items: [['aw9s45m', 1]], steps: [['NEW', ago(25)], ['CANCELLED', ago(24)]],
      reason: 'Этого цвета не оказалось у поставщика. Оплата не списывалась.' },
  ]
  examples.forEach((ex, i) => {
    const items = ex.items.filter(([id]) => catalog[id]).map(([id, qty]) => ({ productId: id, name: catalog[id].name, price: catalog[id].price, qty }))
    if (!items.length) return
    const goods = items.reduce((s, x) => s + x.price * x.qty, 0)
    const created = ex.steps[0][1]
    const last = ex.steps[ex.steps.length - 1]
    let number = `S-${day(created)}-${9001 + i}`
    while (db.prepare('SELECT 1 FROM orders WHERE number = ?').get(number)) number = newNumber()
    const r = db.prepare(`INSERT INTO orders (number, buyer_id, status, items, goods_total, delivery, total, buyer_name, phone, email,
        city, sdek_point, payment_url, track_number, cancel_reason, offer_accepted_at, pd_consent_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Иванов Иван', '+7 900 123-45-67', ?, 'Москва', 'ул. Ленина, 10 (пункт СДЭК MSK123)', ?, ?, ?, ?, ?, ?, ?)`)
      .run(number, buyer.id, last[0], JSON.stringify(items), goods, DELIVERY_PRICE, goods + DELIVERY_PRICE, DEMO_EMAIL,
        ex.paymentUrl ?? '', ex.track ?? '', ex.reason ?? '', created, created, created, last[1])
    for (const [status, at] of ex.steps) {
      db.prepare('INSERT INTO order_events (order_id, status, note, at) VALUES (?, ?, ?, ?)')
        .run(Number(r.lastInsertRowid), status, status === 'SHIPPED' ? ex.track ?? '' : status === 'CANCELLED' ? ex.reason ?? '' : '', at)
    }
  })
}

/* ── Ограничение частоты: по ключу не больше n раз за окно ── */
const hits = new Map()
function limited(key, n, windowMs) {
  const t = Date.now()
  const arr = (hits.get(key) || []).filter((x) => x > t - windowMs)
  if (arr.length >= n) return true
  arr.push(t)
  hits.set(key, arr)
  return false
}
setInterval(() => {
  const t = Date.now()
  for (const [k, arr] of hits) if (!arr.some((x) => x > t - 3600_000)) hits.delete(k)
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(t)
  db.prepare('DELETE FROM login_codes WHERE expires_at < ?').run(t - 3600_000)
}, 600_000).unref()

/* ── HTTP-помощники ── */
class HttpError extends Error {
  constructor(status, code, extra) {
    super(code)
    this.status = status
    this.code = code
    this.extra = extra
  }
}
const fail = (status, code, extra) => { throw new HttpError(status, code, extra) }

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  })
  res.end(JSON.stringify(body))
}

async function readJson(req, limit = 32_000) {
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) fail(415, 'json')
  let size = 0
  const chunks = []
  for await (const c of req) {
    size += c.length
    if (size > limit) fail(413, 'too_large')
    chunks.push(c)
  }
  try {
    const v = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
    return v && typeof v === 'object' ? v : {}
  } catch {
    fail(400, 'json')
  }
}

const clean = (v, max) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : ''

function ip(req) {
  return String(req.headers['x-real-ip'] || req.socket.remoteAddress || '')
}

function parseCookies(req) {
  const out = {}
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}

const COOKIE = 'ta_session'
function sessionCookie(token, maxAgeSec) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}${DEV ? '' : '; Secure'}`
}

function session(req) {
  const token = parseCookies(req)[COOKIE]
  if (!token) return null
  const s = db.prepare('SELECT * FROM sessions WHERE token_hash = ?').get(sha(token))
  if (!s || s.expires_at < Date.now()) return null
  return s
}

function openSession(res, role, buyerId) {
  const token = crypto.randomBytes(32).toString('base64url')
  const days = role === 'staff' ? 7 : 30
  db.prepare('INSERT INTO sessions (token_hash, role, buyer_id, expires_at, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(sha(token), role, buyerId ?? null, Date.now() + days * 86400_000, now())
  res.setHeader('Set-Cookie', sessionCookie(token, days * 86400))
}

/* ── Проверки полей (те же правила, что на сайте: src/utils/validate.ts) ── */
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/
function normPhone(v) {
  const d = String(v).replace(/\D/g, '')
  const n = d.length === 11 && (d[0] === '7' || d[0] === '8') ? d.slice(1) : d.length === 10 ? d : null
  return n ? `+7 ${n.slice(0, 3)} ${n.slice(3, 6)}-${n.slice(6, 8)}-${n.slice(8)}` : null
}

/* ── Представление заказа ── */
function events(orderId) {
  return db.prepare('SELECT status, note, at FROM order_events WHERE order_id = ? ORDER BY id').all(orderId)
}
function viewOrder(o, forStaff = false) {
  const v = {
    number: o.number,
    status: o.status,
    items: JSON.parse(o.items),
    goodsTotal: o.goods_total,
    delivery: o.delivery,
    total: o.total,
    buyerName: o.buyer_name,
    phone: o.phone,
    email: o.email,
    city: o.city,
    sdekPoint: o.sdek_point,
    sdekPointCode: o.sdek_point_code ?? '',
    /** SDEK — пункт или постамат СДЭК, PARTNER — пункт выдачи партнёра TechAgent */
    pickupType: o.pickup_type ?? 'SDEK',
    comment: o.comment,
    paymentUrl: o.status === 'AWAITING_PAYMENT' || forStaff ? o.payment_url : '',
    trackNumber: o.track_number,
    cancelReason: o.cancel_reason,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
    events: events(o.id),
  }
  if (forStaff) v.staffNote = o.staff_note
  return v
}

function addEvent(orderId, status, note = '') {
  db.prepare('INSERT INTO order_events (order_id, status, note, at) VALUES (?, ?, ?, ?)').run(orderId, status, note, now())
}

function newNumber() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const date = `${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}`
  for (;;) {
    const n = `S-${date}-${crypto.randomInt(1000, 10000)}`
    if (!db.prepare('SELECT 1 FROM orders WHERE number = ?').get(n)) return n
  }
}

seedDemo()
const DEMO_BUYER_ID = db.prepare('SELECT id FROM buyers WHERE email = ?').get(DEMO_EMAIL).id

/* ── Обработчики ── */

/** Заказ с сайта. Цены и доступность берём из каталога сервера, а не из браузера */
async function createOrder(req, res) {
  // Из демо-кабинета заказ не оформляется: там выдуманные пункты СДЭК
  if (isDemo(req)) fail(403, 'demo')
  if (limited('order:' + ip(req), 5, 600_000)) fail(429, 'rate')
  const b = await readJson(req)
  const d = {
    buyerName: clean(b.buyerName, 200),
    phone: normPhone(clean(b.buyerPhone, 40)),
    email: clean(b.buyerEmail, 200).toLowerCase(),
    city: clean(b.city, 120),
    sdekPoint: clean(b.sdekPoint, 300),
    comment: clean(b.comment, 1000),
  }
  const errors = []
  if (d.buyerName.split(/\s+/).filter(Boolean).length < 2) errors.push('buyerName')
  if (!d.phone) errors.push('buyerPhone')
  if (!EMAIL_RE.test(d.email) || d.email === DEMO_EMAIL) errors.push('buyerEmail')
  // Пункт партнёра: город и адрес сервер берёт из своего списка (ниже), из браузера они не нужны
  const viaPartner = Boolean(clean(b.partnerPointCode, 40))
  if (!d.city && !viaPartner) errors.push('city')
  if (d.sdekPoint.length < 5 && !viaPartner) errors.push('sdekPoint')
  if (b.offerAccepted !== true) errors.push('offer')
  if (b.pdConsent !== true) errors.push('pd')

  // Пункт выбран на карте: проверяем по списку СДЭК и берём адрес оттуда, а не из браузера
  const pointCode = clean(b.sdekPointCode, 40)
  const cityCode = Number(b.sdekCityCode)
  let point = null
  const partnerCode = clean(b.partnerPointCode, 40)
  let partner = null
  if (partnerCode) {
    partner = partnerPoints.find((p) => p.code === partnerCode && p.active) || null
    if (!partner) errors.push('sdekPoint')
    else {
      d.city = partner.city
      d.sdekPoint = `${partner.name}, ${partner.address} (пункт выдачи партнёра TechAgent ${partner.code})`
    }
  } else if (pointCode) {
    try {
      point = Number.isInteger(cityCode) && cityCode > 0 ? await findPoint(cityCode, pointCode) : null
    } catch (e) {
      console.error('cdek:', e.message)
    }
    if (!point) errors.push('sdekPoint')
    else d.sdekPoint = `${point.address} (${point.type === 'POSTAMAT' ? 'постамат' : 'пункт'} СДЭК ${point.code})`
  }

  const items = []
  const seen = new Set()
  for (const it of Array.isArray(b.items) ? b.items.slice(0, 30) : []) {
    const id = clean(it?.productId, 80)
    const qty = Number(it?.qty)
    const p = catalog[id]
    if (!p || seen.has(id) || !Number.isInteger(qty) || qty < 1 || qty > 5) continue
    if (!p.inStock) {
      errors.push('unavailable:' + id)
      continue
    }
    seen.add(id)
    items.push({ productId: id, name: p.name, price: p.price, qty })
  }
  if (!items.length) errors.push('items')
  if (errors.length) fail(422, 'fields', { fields: errors })

  const goods = items.reduce((s, i) => s + i.price * i.qty, 0)
  // В пункт партнёра доставка входит в цену товара (оферта, п. 4.1), в пункт СДЭК — фиксированная сумма
  const delivery = partner ? 0 : DELIVERY_PRICE
  const total = goods + delivery
  const t = now()

  let buyer = db.prepare('SELECT * FROM buyers WHERE email = ?').get(d.email)
  if (!buyer) {
    db.prepare('INSERT INTO buyers (email, name, phone, city, sdek_point, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(d.email, d.buyerName, d.phone, d.city, d.sdekPoint, t, t)
    buyer = db.prepare('SELECT * FROM buyers WHERE email = ?').get(d.email)
  } else {
    // Последние данные из заказа — в профиль: в следующий раз форма заполнится сама
    db.prepare('UPDATE buyers SET name = ?, phone = ?, city = ?, sdek_point = ?, updated_at = ? WHERE id = ?')
      .run(d.buyerName, d.phone, d.city, d.sdekPoint, t, buyer.id)
  }

  const number = newNumber()
  const r = db.prepare(`INSERT INTO orders (number, buyer_id, status, items, goods_total, delivery, total, buyer_name, phone, email,
      city, sdek_point, sdek_city_code, sdek_point_code, pickup_type, comment, offer_accepted_at, pd_consent_at, created_at, updated_at)
      VALUES (?, ?, 'NEW', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(number, buyer.id, JSON.stringify(items), goods, delivery, total, d.buyerName, d.phone, d.email,
      d.city, d.sdekPoint, point ? cityCode : partner ? partner.cityCode : null, point ? point.code : partner ? partner.code : '',
      partner ? 'PARTNER' : 'SDEK', d.comment, t, t, t, t)
  addEvent(Number(r.lastInsertRowid), 'NEW')
  const order = db.prepare('SELECT * FROM orders WHERE number = ?').get(number)

  // Письма — после ответа: заказ уже в базе, почта не должна его задерживать
  queueMicrotask(() => {
    sendMail(order.email, ...letters.orderCreated(viewOrder(order), PUBLIC_URL))
    if (ORDERS_EMAIL_TO) sendMail(ORDERS_EMAIL_TO, ...letters.staffNewOrder(viewOrder(order, true), PUBLIC_URL), order.email)
  })
  console.log(`order ${number} ${total}`)
  send(res, 200, { ok: true, orderNumber: number, total })
}

/** Код входа на email. Отвечаем одинаково, есть такой покупатель или нет — чтобы по ответу нельзя было проверять адреса */
async function requestCode(req, res) {
  const b = await readJson(req)
  const email = clean(b.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) fail(422, 'fields', { fields: ['email'] })
  if (limited('code:' + ip(req), 10, 3600_000) || limited('code:' + email, 5, 3600_000)) fail(429, 'rate')
  const buyer = email === DEMO_EMAIL ? null : db.prepare('SELECT id FROM buyers WHERE email = ?').get(email)
  let devCode
  if (buyer) {
    const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0')
    db.prepare(`INSERT INTO login_codes (email, code_hash, expires_at, attempts, sent_at) VALUES (?, ?, ?, 0, ?)
      ON CONFLICT(email) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0, sent_at = excluded.sent_at`)
      .run(email, sha(email + ':' + code), Date.now() + 15 * 60_000, Date.now())
    sendMail(email, ...letters.loginCode(code))
    if (DEV) devCode = code
  }
  send(res, 200, { ok: true, mail: mailReady(), ...(devCode ? { devCode } : {}) })
}

async function verifyCode(req, res) {
  const b = await readJson(req)
  const email = clean(b.email, 200).toLowerCase()
  const code = clean(b.code, 10).replace(/\D/g, '')
  if (limited('verify:' + ip(req), 30, 3600_000)) fail(429, 'rate')
  const row = db.prepare('SELECT * FROM login_codes WHERE email = ?').get(email)
  if (!row || row.expires_at < Date.now() || row.attempts >= 5) fail(400, 'code_expired')
  if (row.code_hash !== sha(email + ':' + code)) {
    db.prepare('UPDATE login_codes SET attempts = attempts + 1 WHERE email = ?').run(email)
    fail(400, 'code_wrong')
  }
  db.prepare('DELETE FROM login_codes WHERE email = ?').run(email)
  const buyer = db.prepare('SELECT id FROM buyers WHERE email = ?').get(email)
  if (!buyer) fail(400, 'code_expired')
  openSession(res, 'buyer', buyer.id)
  send(res, 200, { ok: true })
}

function checkStaffPassword(password) {
  const [scheme, salt, hash] = STAFF_PASSWORD_HASH.split('$')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const got = crypto.scryptSync(password, Buffer.from(salt, 'base64'), 64)
  const want = Buffer.from(hash, 'base64')
  return got.length === want.length && crypto.timingSafeEqual(got, want)
}

async function staffLogin(req, res) {
  if (limited('staff:' + ip(req), 10, 3600_000)) fail(429, 'rate')
  const b = await readJson(req)
  if (!STAFF_PASSWORD_HASH) fail(503, 'staff_not_configured')
  if (!checkStaffPassword(clean(b.password, 200))) fail(400, 'password_wrong')
  openSession(res, 'staff')
  send(res, 200, { ok: true })
}

/* ── Пункты СДЭК для карты ──
 * Браузеру ответы не кэшируем: у демо-кабинета пункты выдуманные, и кэш браузера показал бы их потом и настоящему покупателю.
 * Кэш — на сервере (api/cdek.mjs). */
/** Демо-кабинет покупателя видит карту на выдуманных пунктах, даже пока ключей СДЭК нет */
function isDemo(req) {
  const s = session(req)
  return Boolean(s && s.role === 'buyer' && s.buyer_id === DEMO_BUYER_ID)
}
function sdekConfig(req, res) {
  const demo = isDemo(req)
  send(res, 200, { enabled: cdekReady() || demo, demo, ymapsKey: YMAPS_KEY })
}
async function sdekCities(req, res, query) {
  const demo = isDemo(req)
  if (!cdekReady() && !demo) fail(503, 'sdek_off')
  if (limited('sdek:' + ip(req), 300, 600_000)) fail(429, 'rate')
  try {
    send(res, 200, { cities: await suggestCities(query.get('q') || '', demo) })
  } catch (e) {
    console.error('cdek:', e.message)
    fail(502, 'sdek_error')
  }
}
async function sdekPoints(req, res, query) {
  const demo = isDemo(req)
  if (!cdekReady() && !demo) fail(503, 'sdek_off')
  if (limited('sdek:' + ip(req), 300, 600_000)) fail(429, 'rate')
  try {
    send(res, 200, { points: await cityPoints(query.get('city'), demo), partners: partnersOf(query.get('city'), demo) })
  } catch (e) {
    console.error('cdek:', e.message)
    fail(502, 'sdek_error')
  }
}

/** Демо-кабинет: вход без кода, только просмотр */
function demoLogin(req, res) {
  if (limited('demo:' + ip(req), 30, 3600_000)) fail(429, 'rate')
  openSession(res, 'buyer', DEMO_BUYER_ID)
  send(res, 200, { ok: true })
}

function logout(req, res) {
  const token = parseCookies(req)[COOKIE]
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha(token))
  send(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) })
}

function me(req, res) {
  const s = session(req)
  if (!s) return send(res, 200, { role: null })
  if (s.role === 'staff') return send(res, 200, { role: 'staff' })
  const b = db.prepare('SELECT * FROM buyers WHERE id = ?').get(s.buyer_id)
  if (!b) return send(res, 200, { role: null })
  send(res, 200, {
    role: 'buyer',
    buyer: { email: b.email, name: b.name, phone: b.phone, city: b.city, sdekPoint: b.sdek_point, demo: b.id === DEMO_BUYER_ID },
  })
}

function needBuyer(req) {
  const s = session(req)
  if (!s || s.role !== 'buyer') fail(401, 'auth')
  return s
}
function needStaff(req) {
  const s = session(req)
  if (!s || s.role !== 'staff') fail(401, 'auth')
  return s
}

function myOrders(req, res) {
  const s = needBuyer(req)
  const rows = db.prepare('SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC, id DESC').all(s.buyer_id)
  send(res, 200, { orders: rows.map((o) => viewOrder(o)) })
}

function myOrder(req, res, number) {
  const s = needBuyer(req)
  const o = db.prepare('SELECT * FROM orders WHERE number = ? AND buyer_id = ?').get(number, s.buyer_id)
  if (!o) fail(404, 'not_found')
  send(res, 200, { order: viewOrder(o) })
}

async function updateProfile(req, res) {
  const s = needBuyer(req)
  const b = await readJson(req)
  if (s.buyer_id === DEMO_BUYER_ID) return send(res, 200, { ok: true, demo: true })
  const phone = b.phone ? normPhone(clean(b.phone, 40)) : ''
  if (b.phone && !phone) fail(422, 'fields', { fields: ['phone'] })
  db.prepare('UPDATE buyers SET name = ?, phone = ?, city = ?, sdek_point = ?, updated_at = ? WHERE id = ?')
    .run(clean(b.name, 200), phone || '', clean(b.city, 120), clean(b.sdekPoint, 300), now(), s.buyer_id)
  send(res, 200, { ok: true })
}

function staffOrders(req, res, query) {
  needStaff(req)
  const status = query.get('status')
  const rows = status && STATUSES.includes(status)
    ? db.prepare('SELECT * FROM orders WHERE status = ? AND buyer_id <> ? ORDER BY id DESC LIMIT 500').all(status, DEMO_BUYER_ID)
    : db.prepare('SELECT * FROM orders WHERE buyer_id <> ? ORDER BY id DESC LIMIT 500').all(DEMO_BUYER_ID)
  const counts = Object.fromEntries(db.prepare('SELECT status, COUNT(*) AS n FROM orders WHERE buyer_id <> ? GROUP BY status').all(DEMO_BUYER_ID).map((r) => [r.status, r.n]))
  send(res, 200, { orders: rows.map((o) => viewOrder(o, true)), counts })
}

function staffOrder(req, res, number) {
  needStaff(req)
  const o = db.prepare('SELECT * FROM orders WHERE number = ? AND buyer_id <> ?').get(number, DEMO_BUYER_ID)
  if (!o) fail(404, 'not_found')
  send(res, 200, { order: viewOrder(o, true), next: NEXT[o.status] })
}

/** Сотрудник переводит заказ на следующий этап. Покупателю уходит письмо об этом этапе */
async function staffSetStatus(req, res, number) {
  needStaff(req)
  const b = await readJson(req)
  const o = db.prepare('SELECT * FROM orders WHERE number = ? AND buyer_id <> ?').get(number, DEMO_BUYER_ID)
  if (!o) fail(404, 'not_found')
  const to = String(b.status || '')
  if (!NEXT[o.status]?.includes(to)) fail(409, 'bad_transition')
  const paymentUrl = clean(b.paymentUrl, 1000)
  const track = clean(b.trackNumber, 60)
  const reason = clean(b.reason, 500)
  if (to === 'AWAITING_PAYMENT' && !/^https:\/\/\S+$/.test(paymentUrl)) fail(422, 'fields', { fields: ['paymentUrl'] })
  if (to === 'SHIPPED' && !track) fail(422, 'fields', { fields: ['trackNumber'] })
  if (to === 'CANCELLED' && !reason) fail(422, 'fields', { fields: ['reason'] })
  db.prepare(`UPDATE orders SET status = ?, payment_url = CASE WHEN ? <> '' THEN ? ELSE payment_url END,
      track_number = CASE WHEN ? <> '' THEN ? ELSE track_number END,
      cancel_reason = CASE WHEN ? <> '' THEN ? ELSE cancel_reason END, updated_at = ? WHERE id = ?`)
    .run(to, paymentUrl, paymentUrl, track, track, reason, reason, now(), o.id)
  addEvent(o.id, to, to === 'SHIPPED' ? track : to === 'CANCELLED' ? reason : '')
  const fresh = db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)
  const letter = letters.statusChanged(viewOrder(fresh), PUBLIC_URL)
  if (letter) queueMicrotask(() => sendMail(fresh.email, ...letter))
  send(res, 200, { order: viewOrder(fresh, true), next: NEXT[fresh.status] })
}

async function staffNote(req, res, number) {
  needStaff(req)
  const b = await readJson(req)
  const o = db.prepare('SELECT id FROM orders WHERE number = ? AND buyer_id <> ?').get(number, DEMO_BUYER_ID)
  if (!o) fail(404, 'not_found')
  db.prepare('UPDATE orders SET staff_note = ?, updated_at = ? WHERE id = ?').run(clean(b.staffNote, 2000), now(), o.id)
  send(res, 200, { ok: true })
}

/* ── Маршрутизация ── */
const ORDER_NO = '(S-\\d{6}-\\d{4})'
const routes = [
  ['GET', /^\/api\/health$/, (req, res) => send(res, 200, { ok: true, mail: mailReady(), sdek: cdekReady(), products: Object.keys(catalog).length })],
  ['POST', /^\/api\/orders$/, createOrder],
  ['GET', /^\/api\/sdek\/config$/, sdekConfig],
  ['GET', /^\/api\/sdek\/cities$/, sdekCities],
  ['GET', /^\/api\/sdek\/points$/, sdekPoints],
  ['POST', /^\/api\/auth\/code$/, requestCode],
  ['POST', /^\/api\/auth\/verify$/, verifyCode],
  ['POST', /^\/api\/auth\/staff$/, staffLogin],
  ['POST', /^\/api\/auth\/demo$/, demoLogin],
  ['POST', /^\/api\/auth\/logout$/, logout],
  ['GET', /^\/api\/me$/, me],
  ['GET', /^\/api\/my\/orders$/, myOrders],
  ['GET', new RegExp(`^/api/my/orders/${ORDER_NO}$`), myOrder],
  ['POST', /^\/api\/my\/profile$/, updateProfile],
  ['GET', /^\/api\/staff\/orders$/, staffOrders],
  ['GET', new RegExp(`^/api/staff/orders/${ORDER_NO}$`), staffOrder],
  ['POST', new RegExp(`^/api/staff/orders/${ORDER_NO}/status$`), staffSetStatus],
  ['POST', new RegExp(`^/api/staff/orders/${ORDER_NO}/note$`), staffNote],
]

/** Запросы, меняющие данные, принимаем только со своего сайта (защита от подделки запросов) */
function sameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true
  try {
    const o = new URL(origin)
    return o.host === req.headers.host || o.origin === PUBLIC_URL || (DEV && o.hostname === 'localhost')
  } catch {
    return false
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://local')
  try {
    if (req.method === 'POST' && !sameOrigin(req)) fail(403, 'origin')
    for (const [method, re, handler] of routes) {
      const m = url.pathname.match(re)
      if (!m) continue
      if (req.method !== method) continue
      await handler(req, res, m[1] ?? url.searchParams, url.searchParams)
      return
    }
    fail(404, 'not_found')
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { ok: false, error: e.code, ...(e.extra || {}) })
    console.error(e)
    send(res, 500, { ok: false, error: 'server' })
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`techagent-api :${PORT} db=${DB_PATH} products=${Object.keys(catalog).length} mail=${mailReady() ? 'on' : 'off'}`)
})
