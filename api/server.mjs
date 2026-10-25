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
 * Партнёр: оставляет заявку на /register → сотрудник одобряет её в /staff/partners → партнёру уходит письмо
 * с временным паролем → при первом входе он задаёт свой пароль и сам отмечает согласие с агентским договором-офертой.
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
/** Куда приходят заявки партнёров (сотрудникам ТехЭйджент) */
const PARTNERS_EMAIL_TO = env('PARTNERS_EMAIL_TO', 'partners@techagent.pro')
/** Редакция агентского договора-оферты, с которой партнёр соглашается при первом входе (src/data/documents.ts, EDITION_DATE) */
const OFFER_EDITION = '10.10.2026'
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
  CREATE TABLE IF NOT EXISTS login_links (
    token_hash TEXT PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    buyer_id INTEGER,
    expires_at INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS partner_applications (
    id INTEGER PRIMARY KEY,
    company_name TEXT NOT NULL,
    inn TEXT NOT NULL,
    ogrn TEXT NOT NULL,
    point_address TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    bik TEXT NOT NULL,
    account TEXT NOT NULL,
    comment TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'NEW',
    decline_reason TEXT NOT NULL DEFAULT '',
    partner_id INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    inn TEXT NOT NULL,
    ogrn TEXT NOT NULL,
    point_address TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    bik TEXT NOT NULL,
    account TEXT NOT NULL,
    reward_percent REAL NOT NULL,
    password_hash TEXT NOT NULL,
    must_change_password INTEGER NOT NULL DEFAULT 1,
    offer_accepted_at TEXT,
    offer_edition TEXT NOT NULL DEFAULT '',
    offer_accept_ip TEXT NOT NULL DEFAULT '',
    offer_accept_ua TEXT NOT NULL DEFAULT '',
    application_id INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`)

/* Сессия партнёра: role = 'partner', partner_id — его учётка */
if (!db.prepare('PRAGMA table_info(sessions)').all().some((c) => c.name === 'partner_id')) db.exec('ALTER TABLE sessions ADD COLUMN partner_id INTEGER')

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
    { items: [['iphone-17-pro-max-256-gb', 1], ['airpods-pro-3', 1]], steps: [['NEW', ago(0, 6)], ['AWAITING_PAYMENT', ago(0, 5)]],
      paymentUrl: 'https://techagent.pro/legal/payment' },
    { items: [['galaxy-s26-ultra-256-gb', 1]], steps: [['NEW', ago(4)], ['AWAITING_PAYMENT', ago(4, -1)], ['PAID', ago(3, 20)], ['SHIPPED', ago(2)]],
      track: '1534672980' },
    { items: [['macbook-air-13-m5-10-8-16-gb-512-gb', 1]], steps: [['NEW', ago(18)], ['AWAITING_PAYMENT', ago(18, -1)], ['PAID', ago(17)], ['SHIPPED', ago(15)], ['READY', ago(9)], ['RECEIVED', ago(8)]],
      track: '1528841207' },
    { items: [['apple-watch-series-12-46-mm-alyuminiy', 1]], steps: [['NEW', ago(25)], ['CANCELLED', ago(24)]],
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
  db.prepare('DELETE FROM login_links WHERE expires_at < ?').run(t)
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

/**
 * Ссылка «Открыть заказ в кабинете» для писем: вход без пароля и кода — покупатель нажал и он в кабинете.
 * Действует 30 дней; доступ к ней — только у владельца почты, значит, и адрес этим подтверждён.
 */
const LINK_DAYS = 30
function loginLink(buyerId, to) {
  const token = crypto.randomBytes(32).toString('base64url')
  db.prepare('INSERT INTO login_links (token_hash, buyer_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .run(sha(token), buyerId, Date.now() + LINK_DAYS * 86400_000, now())
  return `${PUBLIC_URL}/api/auth/link?t=${token}&to=${encodeURIComponent(to)}`
}

function openSession(res, role, buyerId, partnerId) {
  const token = crypto.randomBytes(32).toString('base64url')
  const days = role === 'staff' ? 7 : 30
  db.prepare('INSERT INTO sessions (token_hash, role, buyer_id, partner_id, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(sha(token), role, buyerId ?? null, partnerId ?? null, Date.now() + days * 86400_000, now())
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
    // Цвет — только из списка цветов товара; если не передан или неизвестен — первый (у товаров без выбора цвета список пуст)
    const colors = Array.isArray(p?.colors) ? p.colors : []
    // У часов «цвет» — это корпус и ремешок, до ~100 знаков; обрезать нельзя, иначе не узнаем цвет и подставим первый
    const asked = clean(it?.color, 200)
    const color = colors.includes(asked) ? asked : (colors[0] || '')
    const key = id + '|' + color
    if (!p || seen.has(key) || !Number.isInteger(qty) || qty < 1 || qty > 5) continue
    if (!p.inStock) {
      errors.push('unavailable:' + id)
      continue
    }
    seen.add(key)
    // Цена — по цвету: у разных цветов одной модели она бывает разной (prices — только цвета дороже цены карточки)
    const price = (color && p.prices?.[color]) || p.price
    items.push({ productId: id, ...(color ? { color } : {}), name: color && colors.length > 1 ? `${p.name}, ${color}` : p.name, price, qty })
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
    sendMail(order.email, ...letters.orderCreated(viewOrder(order), PUBLIC_URL, loginLink(buyer.id, `/account/orders/${number}`)))
    if (ORDERS_EMAIL_TO) sendMail(ORDERS_EMAIL_TO, ...letters.staffNewOrder(viewOrder(order, true), PUBLIC_URL), order.email)
  })
  console.log(`order ${number} ${total}`)
  send(res, 200, { ok: true, orderNumber: number, total })
}

/** Код входа на email. Новый адрес тоже получает код: после ввода кода для него заводится кабинет покупателя */
async function requestCode(req, res) {
  const b = await readJson(req)
  const email = clean(b.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) fail(422, 'fields', { fields: ['email'] })
  if (limited('code:' + ip(req), 10, 3600_000) || limited('code:' + email, 5, 3600_000)) fail(429, 'rate')
  let devCode
  if (email !== DEMO_EMAIL) {
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
  let buyer = db.prepare('SELECT id FROM buyers WHERE email = ?').get(email)
  if (!buyer) {
    // Новый покупатель: адрес подтверждён кодом — заводим пустой кабинет, данные он заполнит при заказе
    const t = now()
    db.prepare('INSERT INTO buyers (email, created_at, updated_at) VALUES (?, ?, ?)').run(email, t, t)
    buyer = db.prepare('SELECT id FROM buyers WHERE email = ?').get(email)
  }
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

/** Вход по ссылке из письма: ставим cookie и ведём на страницу заказа. Устаревшая ссылка — на вход по коду */
function linkLogin(req, res, query) {
  if (limited('link:' + ip(req), 60, 3600_000)) fail(429, 'rate')
  const token = String(query.get('t') || '')
  const to = String(query.get('to') || '/account')
  const safeTo = /^\/account(\/[\w\-/]*)?$/.test(to) ? to : '/account'
  const row = token ? db.prepare('SELECT * FROM login_links WHERE token_hash = ?').get(sha(token)) : null
  if (!row || row.expires_at < Date.now() || !db.prepare('SELECT 1 FROM buyers WHERE id = ?').get(row.buyer_id)) {
    res.writeHead(302, { Location: '/login/buyer?expired=1', 'Cache-Control': 'no-store' })
    return res.end()
  }
  openSession(res, 'buyer', row.buyer_id)
  res.writeHead(302, { Location: safeTo, 'Cache-Control': 'no-store' })
  res.end()
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
  if (s.role === 'partner') {
    const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(s.partner_id)
    return send(res, 200, p ? { role: 'partner', partner: viewPartner(p) } : { role: null })
  }
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
  const letter = letters.statusChanged(viewOrder(fresh), PUBLIC_URL, loginLink(fresh.buyer_id, `/account/orders/${fresh.number}`))
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

/* ── Партнёры: заявка → одобрение сотрудником → письмо с доступом → первый вход с согласием на оферту ── */

/** Пароль партнёра: scrypt$соль$хэш — тот же формат, что у пароля сотрудников */
function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  return `scrypt$${salt.toString('base64')}$${crypto.scryptSync(password, salt, 64).toString('base64')}`
}
function checkPassword(password, stored) {
  const [scheme, salt, hash] = String(stored || '').split('$')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const got = crypto.scryptSync(password, Buffer.from(salt, 'base64'), 64)
  const want = Buffer.from(hash, 'base64')
  return got.length === want.length && crypto.timingSafeEqual(got, want)
}
/** Временный пароль из письма: без похожих букв и цифр (0/O, 1/l/I), чтобы его можно было продиктовать */
function tempPassword() {
  const abc = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 10 }, () => abc[crypto.randomInt(abc.length)]).join('')
}

const APP_FIELDS = [
  ['companyName', 'company_name', 300], ['inn', 'inn', 12], ['ogrn', 'ogrn', 15], ['pointAddress', 'point_address', 500],
  ['contactName', 'contact_name', 200], ['phone', 'phone', 40], ['email', 'email', 200], ['bankName', 'bank_name', 300],
  ['bik', 'bik', 9], ['account', 'account', 20], ['comment', 'comment', 1000],
]
function viewApplication(a) {
  const v = Object.fromEntries(APP_FIELDS.map(([k, col]) => [k, a[col]]))
  return { id: a.id, ...v, status: a.status, declineReason: a.decline_reason, partnerId: a.partner_id, createdAt: a.created_at, updatedAt: a.updated_at }
}
function viewPartner(p, forStaff = false) {
  const v = {
    id: p.id,
    email: p.email,
    companyName: p.company_name,
    inn: p.inn,
    ogrn: p.ogrn,
    pointAddress: p.point_address,
    contactName: p.contact_name,
    phone: p.phone,
    bankName: p.bank_name,
    bik: p.bik,
    account: p.account,
    rewardPercent: p.reward_percent,
    mustChangePassword: Boolean(p.must_change_password),
    offerAcceptedAt: p.offer_accepted_at || null,
    offerEdition: p.offer_edition,
    createdAt: p.created_at,
  }
  if (forStaff) Object.assign(v, { offerAcceptIp: p.offer_accept_ip, applicationId: p.application_id })
  return v
}

/** Заявка с /register. Сохраняется в базе, сотрудникам — письмо, заявителю — подтверждение */
async function partnerApplication(req, res) {
  if (limited('app:' + ip(req), 5, 600_000)) fail(429, 'rate')
  const b = await readJson(req)
  const d = Object.fromEntries(APP_FIELDS.map(([k, , max]) => [k, clean(b[k], max)]))
  d.email = d.email.toLowerCase()
  const phone = normPhone(d.phone)
  const errors = []
  for (const k of ['companyName', 'pointAddress', 'contactName', 'bankName']) if (!d[k]) errors.push(k)
  if (!phone) errors.push('phone')
  if (!/^(\d{10}|\d{12})$/.test(d.inn)) errors.push('inn')
  if (!/^(\d{13}|\d{15})$/.test(d.ogrn)) errors.push('ogrn')
  if (!/^\d{9}$/.test(d.bik)) errors.push('bik')
  if (!/^\d{20}$/.test(d.account)) errors.push('account')
  if (!EMAIL_RE.test(d.email)) errors.push('email')
  if (errors.length) fail(422, 'fields', { fields: errors })
  d.phone = phone
  const t = now()
  const cols = APP_FIELDS.map(([, col]) => col)
  const r = db.prepare(`INSERT INTO partner_applications (${cols.join(', ')}, created_at, updated_at) VALUES (${cols.map(() => '?').join(', ')}, ?, ?)`)
    .run(...APP_FIELDS.map(([k]) => d[k]), t, t)
  queueMicrotask(() => {
    sendMail(PARTNERS_EMAIL_TO, ...letters.staffNewApplication(d, PUBLIC_URL), d.email)
    sendMail(d.email, ...letters.applicationReceived(d), PARTNERS_EMAIL_TO)
  })
  console.log(`partner application ${r.lastInsertRowid}`)
  send(res, 200, { ok: true })
}

async function partnerLogin(req, res) {
  const b = await readJson(req)
  const email = clean(b.email, 200).toLowerCase()
  if (limited('plogin:' + ip(req), 20, 3600_000) || limited('plogin:' + email, 10, 3600_000)) fail(429, 'rate')
  const p = db.prepare('SELECT * FROM partners WHERE email = ?').get(email)
  // Неизвестный email и неверный пароль — одна и та же ошибка: по ней нельзя узнать, кто партнёр
  if (!p || !checkPassword(clean(b.password, 200), p.password_hash)) fail(400, 'password_wrong')
  openSession(res, 'partner', null, p.id)
  send(res, 200, { ok: true })
}

function needPartner(req) {
  const s = session(req)
  if (!s || s.role !== 'partner') fail(401, 'auth')
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(s.partner_id)
  if (!p) fail(401, 'auth')
  return p
}

/** Первый вход: свой пароль вместо временного и согласие с офертой — его ставит только сам партнёр (п. 2.1).
 *  Запоминаем, когда, с какого адреса и какой браузер — это подтверждение акцепта */
async function partnerActivate(req, res) {
  const p = needPartner(req)
  const b = await readJson(req)
  const password = typeof b.password === 'string' ? b.password : ''
  if (p.must_change_password && password.length < 8) fail(422, 'fields', { fields: ['password'] })
  if (password && password.length > 200) fail(422, 'fields', { fields: ['password'] })
  if (!p.offer_accepted_at && b.acceptOffer !== true) fail(422, 'fields', { fields: ['offer'] })
  const t = now()
  if (password) db.prepare('UPDATE partners SET password_hash = ?, must_change_password = 0, updated_at = ? WHERE id = ?').run(hashPassword(password), t, p.id)
  if (!p.offer_accepted_at) {
    db.prepare('UPDATE partners SET offer_accepted_at = ?, offer_edition = ?, offer_accept_ip = ?, offer_accept_ua = ?, updated_at = ? WHERE id = ?')
      .run(t, OFFER_EDITION, ip(req), clean(req.headers['user-agent'], 300), t, p.id)
    console.log(`partner ${p.id} accepted offer`)
  }
  send(res, 200, { ok: true, partner: viewPartner(db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id)) })
}

/** Контакты партнёр меняет сам; наименование, ИНН и реквизиты — через partners@techagent.pro */
async function partnerProfile(req, res) {
  const p = needPartner(req)
  const b = await readJson(req)
  const contactName = clean(b.contactName, 200)
  const phone = normPhone(clean(b.phone, 40))
  if (!contactName || !phone) fail(422, 'fields', { fields: [...(contactName ? [] : ['contactName']), ...(phone ? [] : ['phone'])] })
  db.prepare('UPDATE partners SET contact_name = ?, phone = ?, updated_at = ? WHERE id = ?').run(contactName, phone, now(), p.id)
  send(res, 200, { ok: true, partner: viewPartner(db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id)) })
}

function staffPartners(req, res) {
  needStaff(req)
  const applications = db.prepare('SELECT * FROM partner_applications ORDER BY id DESC LIMIT 500').all().map(viewApplication)
  const partners = db.prepare('SELECT * FROM partners ORDER BY id DESC').all().map((p) => viewPartner(p, true))
  send(res, 200, { applications, partners })
}

/** Одобрить заявку: заводим учётку с временным паролем и пишем партнёру. Договор он заключит сам при первом входе */
async function staffApprove(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const a = db.prepare('SELECT * FROM partner_applications WHERE id = ?').get(Number(id))
  if (!a) fail(404, 'not_found')
  if (a.status !== 'NEW') fail(409, 'decided')
  const percent = Number(b.rewardPercent)
  if (!Number.isFinite(percent) || percent <= 0 || percent > 50) fail(422, 'fields', { fields: ['rewardPercent'] })
  if (db.prepare('SELECT 1 FROM partners WHERE email = ?').get(a.email)) fail(409, 'email_taken')
  const password = tempPassword()
  const t = now()
  const r = db.prepare(`INSERT INTO partners (email, company_name, inn, ogrn, point_address, contact_name, phone, bank_name, bik, account,
      reward_percent, password_hash, must_change_password, application_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`)
    .run(a.email, a.company_name, a.inn, a.ogrn, a.point_address, a.contact_name, a.phone, a.bank_name, a.bik, a.account,
      Math.round(percent * 100) / 100, hashPassword(password), a.id, t, t)
  const partnerId = Number(r.lastInsertRowid)
  db.prepare("UPDATE partner_applications SET status = 'APPROVED', partner_id = ?, updated_at = ? WHERE id = ?").run(partnerId, t, a.id)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(partnerId)
  queueMicrotask(() => sendMail(p.email, ...letters.partnerAccess(viewPartner(p), password, PUBLIC_URL), PARTNERS_EMAIL_TO))
  console.log(`partner ${partnerId} approved from application ${a.id}`)
  // Пароль показываем сотруднику один раз — на случай, если письмо не дойдёт и его надо будет продиктовать
  send(res, 200, { ok: true, partner: viewPartner(p, true), password, mail: mailReady() })
}

async function staffDecline(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const a = db.prepare('SELECT * FROM partner_applications WHERE id = ?').get(Number(id))
  if (!a) fail(404, 'not_found')
  if (a.status !== 'NEW') fail(409, 'decided')
  const reason = clean(b.reason, 500)
  db.prepare("UPDATE partner_applications SET status = 'DECLINED', decline_reason = ?, updated_at = ? WHERE id = ?").run(reason, now(), a.id)
  if (b.notify !== false) queueMicrotask(() => sendMail(a.email, ...letters.applicationDeclined(viewApplication(a), reason), PARTNERS_EMAIL_TO))
  send(res, 200, { ok: true })
}

/** Новый временный пароль: старые входы партнёра закрываются, при входе он снова задаст свой пароль */
async function staffResetPartner(req, res, id) {
  needStaff(req)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(Number(id))
  if (!p) fail(404, 'not_found')
  const password = tempPassword()
  db.prepare('UPDATE partners SET password_hash = ?, must_change_password = 1, updated_at = ? WHERE id = ?').run(hashPassword(password), now(), p.id)
  db.prepare("DELETE FROM sessions WHERE role = 'partner' AND partner_id = ?").run(p.id)
  queueMicrotask(() => sendMail(p.email, ...letters.partnerAccess(viewPartner(p), password, PUBLIC_URL, true), PARTNERS_EMAIL_TO))
  send(res, 200, { ok: true, password, mail: mailReady() })
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
  ['GET', /^\/api\/auth\/link$/, linkLogin],
  ['POST', /^\/api\/auth\/logout$/, logout],
  ['GET', /^\/api\/me$/, me],
  ['GET', /^\/api\/my\/orders$/, myOrders],
  ['GET', new RegExp(`^/api/my/orders/${ORDER_NO}$`), myOrder],
  ['POST', /^\/api\/my\/profile$/, updateProfile],
  ['GET', /^\/api\/staff\/orders$/, staffOrders],
  ['GET', new RegExp(`^/api/staff/orders/${ORDER_NO}$`), staffOrder],
  ['POST', new RegExp(`^/api/staff/orders/${ORDER_NO}/status$`), staffSetStatus],
  ['POST', new RegExp(`^/api/staff/orders/${ORDER_NO}/note$`), staffNote],
  ['POST', /^\/api\/partners\/applications$/, partnerApplication],
  ['POST', /^\/api\/auth\/partner$/, partnerLogin],
  ['POST', /^\/api\/partner\/activate$/, partnerActivate],
  ['POST', /^\/api\/partner\/profile$/, partnerProfile],
  ['GET', /^\/api\/staff\/partners$/, staffPartners],
  ['POST', /^\/api\/staff\/applications\/(\d+)\/approve$/, staffApprove],
  ['POST', /^\/api\/staff\/applications\/(\d+)\/decline$/, staffDecline],
  ['POST', /^\/api\/staff\/partners\/(\d+)\/reset$/, staffResetPartner],
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
