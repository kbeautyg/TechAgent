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
for (const [col, def] of [['sdek_city_code', 'INTEGER'], ['sdek_point_code', "TEXT NOT NULL DEFAULT ''"], ['pickup_type', "TEXT NOT NULL DEFAULT 'SDEK'"],
  /* Заказы партнёров: source = PARTNER — оформил партнёр в кабинете, SITE — покупатель на сайте.
   * partner_id — чей пункт выдачи (у заказа с сайта — если покупатель выбрал пункт партнёра на карте).
   * reward — вознаграждение по проценту на дату заказа; только у заказов, оформленных партнёром (оферта партнёру, «Заказ»).
   * pay_token — страница оплаты /pay/<token>: покупатель отмечает согласия и переходит к оплате */
  ['source', "TEXT NOT NULL DEFAULT 'SITE'"], ['partner_id', 'INTEGER'], ['reward_percent', 'REAL'], ['reward', 'INTEGER'], ['pay_token', 'TEXT'],
  /* Пункт выдачи: приёмка (с замечанием и фото), уведомление покупателя, выдача с фото подписанного акта, обращения */
  ['received_at', 'TEXT'], ['received_issue', "TEXT NOT NULL DEFAULT ''"], ['received_photos', 'INTEGER NOT NULL DEFAULT 0'],
  ['notified_at', 'TEXT'], ['issued_at', 'TEXT'], ['issued_to_name', "TEXT NOT NULL DEFAULT ''"], ['act_file', "TEXT NOT NULL DEFAULT ''"],
  ['claims', "TEXT NOT NULL DEFAULT '[]'"]]) {
  if (!db.prepare('PRAGMA table_info(orders)').all().some((c) => c.name === col)) db.exec(`ALTER TABLE orders ADD COLUMN ${col} ${def}`)
}
db.exec('CREATE INDEX IF NOT EXISTS orders_partner ON orders(partner_id)')
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS orders_pay_token ON orders(pay_token)')
/* Партнёр: точка на карте магазина (код из partner-points.json или map_points); новый процент вознаграждения с даты
 * (уведомление за 14 дней, оферта партнёру, п. 7.1); отключение доступа */
for (const [col, def] of [['point_code', "TEXT NOT NULL DEFAULT ''"], ['reward_percent_next', 'REAL'], ['reward_percent_next_from', 'TEXT'],
  ['blocked_at', 'TEXT'], ['block_reason', "TEXT NOT NULL DEFAULT ''"]]) {
  if (!db.prepare('PRAGMA table_info(partners)').all().some((c) => c.name === col)) db.exec(`ALTER TABLE partners ADD COLUMN ${col} ${def}`)
}
/* Отчёт агента и акт за месяц (оферта партнёру, п. 7.2–7.6): form — бланк на дату формирования (строки, итоги,
 * реквизиты партнёра), order_numbers — заказы в отчёте. Решение партнёра: ACCEPTED или OBJECTED; без решения
 * за 10 рабочих дней отчёт считается принятым. Выплату отмечает сотрудник */
db.exec(`CREATE TABLE IF NOT EXISTS agent_reports (
  id INTEGER PRIMARY KEY,
  partner_id INTEGER NOT NULL REFERENCES partners(id),
  period TEXT NOT NULL,
  number TEXT NOT NULL UNIQUE,
  form TEXT NOT NULL,
  order_numbers TEXT NOT NULL,
  payable INTEGER NOT NULL,
  review_status TEXT NOT NULL DEFAULT '',
  review_at TEXT,
  review_text TEXT NOT NULL DEFAULT '',
  revoked_at TEXT,
  paid_at TEXT,
  paid_amount INTEGER,
  paid_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS reports_partner ON agent_reports(partner_id);`)

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

/* Пункты партнёров. active=false — партнёра в этом месте ещё нет: покупатели точку не видят, демо-кабинет видит.
 * Две части: заготовленные точки (partner-points.json, приезжает с выкладкой) и точки, которые завёл сотрудник
 * в /staff/partners (таблица map_points — файл при выкладке перезаписывается, поэтому в базе) */
let filePoints = []
try {
  filePoints = JSON.parse(fs.readFileSync(PARTNER_POINTS_PATH, 'utf8'))
} catch (e) {
  console.error('partner-points.json не прочитан:', e.message)
}
db.exec(`CREATE TABLE IF NOT EXISTS map_points (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  city_code INTEGER NOT NULL,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  work_time TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
)`)
const allPoints = () => [
  ...filePoints,
  ...db.prepare('SELECT * FROM map_points ORDER BY created_at').all().map((r) => ({
    code: r.code, name: r.name, address: r.address, city: r.city, cityCode: r.city_code, lat: r.lat, lon: r.lon,
    workTime: r.work_time, note: r.note, active: false, own: true,
  })),
]
const findMapPoint = (code) => (code ? allPoints().find((x) => x.code === code) ?? null : null)
/** Партнёр, привязанный к точке и уже принявший оферту */
const linkedPartner = (code) =>
  code ? db.prepare("SELECT * FROM partners WHERE point_code = ? AND COALESCE(offer_accepted_at, '') <> '' AND blocked_at IS NULL").get(code) ?? null : null
/** Точка открыта для покупателей: отмечена в списке (active) или к ней привязан партнёр */
const pointOpen = (p) => Boolean(p.active || linkedPartner(p.code))
const partnersOf = (cityCode, withPlanned) =>
  allPoints()
    .filter((p) => p.cityCode === Number(cityCode) && (withPlanned || pointOpen(p)))
    .map(({ code, name, address, lat, lon, workTime, note, active }) => ({ code, type: 'PARTNER', name, address, lat, lon, workTime, note, active: Boolean(active || linkedPartner(code)) }))

/* ── Демо-кабинет покупателя: вход без кода, примеры заказов на разных этапах ──
 * Адрес demo@techagent.pro зарезервирован: на него нельзя оформить заказ и получить код, профиль не сохраняется.
 * Заказы демо-покупателя не попадают в раздел сотрудников. При каждом запуске сервера примеры пересоздаются
 * со свежими датами («вчера», «неделю назад»). */
const DEMO_EMAIL = 'demo@techagent.pro'
/** Покупатель без email (заказ оформил партнёр, email необязателен): одна служебная запись на всех таких.
 *  Домен .invalid не существует — войти под этим адресом нельзя, писем на него нет */
const NO_EMAIL = 'no-email@buyers.techagent.invalid'
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
    email: o.email === NO_EMAIL ? '' : o.email,
    city: o.city,
    sdekPoint: o.sdek_point,
    sdekPointCode: o.sdek_point_code ?? '',
    /** SDEK — пункт или постамат СДЭК, PARTNER — пункт выдачи партнёра TechAgent */
    pickupType: o.pickup_type ?? 'SDEK',
    comment: o.comment,
    // Заказ партнёра покупатель оплачивает через страницу /pay: там он сначала отмечает согласия
    paymentUrl: forStaff ? o.payment_url : o.status !== 'AWAITING_PAYMENT' ? '' : o.pay_token ? payPage(o) : o.payment_url,
    trackNumber: o.track_number,
    cancelReason: o.cancel_reason,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
    events: events(o.id),
  }
  if (forStaff) {
    v.staffNote = o.staff_note
    Object.assign(v, pointPart(o))
    if (o.partner_id) {
      const p = db.prepare('SELECT company_name, email, phone FROM partners WHERE id = ?').get(o.partner_id)
      v.partner = p ? { id: o.partner_id, companyName: p.company_name, email: p.email, phone: p.phone } : null
    }
    v.payPage = o.pay_token ? payPage(o) : ''
    v.consentAt = o.offer_accepted_at || null
  }
  return v
}

const payPage = (o) => `${PUBLIC_URL}/pay/${o.pay_token}`

/** Что сделано в пункте выдачи — для кабинета партнёра и раздела сотрудников */
function pointPart(o) {
  return {
    source: o.source,
    rewardPercent: o.reward_percent ?? null,
    reward: o.reward ?? null,
    receivedAt: o.received_at || null,
    receivedIssue: o.received_issue,
    receivedPhotos: o.received_photos,
    notifiedAt: o.notified_at || null,
    issuedAt: o.issued_at || null,
    issuedToName: o.issued_to_name,
    actFile: o.act_file,
    claims: JSON.parse(o.claims || '[]'),
    files: orderFiles(o.number),
  }
}

/** Заказ в кабинете партнёра: без адреса электронной почты сотрудникам и служебных заметок */
function viewPartnerOrder(o) {
  const v = viewOrder(o)
  return {
    ...v,
    ...pointPart(o),
    // Партнёр всегда отправляет покупателю свою ссылку на страницу оплаты — даже до того, как появится ссылка банка
    paymentUrl: o.pay_token ? payPage(o) : '',
    payToken: o.pay_token || '',
    paymentReady: o.status === 'AWAITING_PAYMENT',
    consentAt: o.offer_accepted_at || null,
  }
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
  if (!EMAIL_RE.test(d.email) || d.email === DEMO_EMAIL || d.email.endsWith('.invalid')) errors.push('buyerEmail')
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
    partner = allPoints().find((p) => p.code === partnerCode && pointOpen(p)) || null
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
  // Пункт партнёра: заказ виден партнёру в кабинете — он принимает и выдаёт товар. Вознаграждения нет:
  // по агентской оферте оно положено за заказы, оформленные самим партнёром
  const owner = partner ? linkedPartner(partner.code) : null
  const r = db.prepare(`INSERT INTO orders (number, buyer_id, status, items, goods_total, delivery, total, buyer_name, phone, email,
      city, sdek_point, sdek_city_code, sdek_point_code, pickup_type, partner_id, comment, offer_accepted_at, pd_consent_at, created_at, updated_at)
      VALUES (?, ?, 'NEW', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(number, buyer.id, JSON.stringify(items), goods, delivery, total, d.buyerName, d.phone, d.email,
      d.city, d.sdekPoint, point ? cityCode : partner ? partner.cityCode : null, point ? point.code : partner ? partner.code : '',
      partner ? 'PARTNER' : 'SDEK', owner?.id ?? null, d.comment, t, t, t, t)
  addEvent(Number(r.lastInsertRowid), 'NEW')
  const order = db.prepare('SELECT * FROM orders WHERE number = ?').get(number)

  // Письма — после ответа: заказ уже в базе, почта не должна его задерживать
  queueMicrotask(() => {
    sendMail(order.email, ...letters.orderCreated(viewOrder(order), PUBLIC_URL, loginLink(buyer.id, `/account/orders/${number}`)))
    if (ORDERS_EMAIL_TO) sendMail(ORDERS_EMAIL_TO, ...letters.staffNewOrder(viewOrder(order, true), PUBLIC_URL), order.email)
    if (owner) sendMail(owner.email, ...letters.partnerSiteOrder(viewOrder(order), PUBLIC_URL), PARTNERS_EMAIL_TO)
  })
  console.log(`order ${number} ${total}`)
  send(res, 200, { ok: true, orderNumber: number, total })
}

/** Код входа на email. Новый адрес тоже получает код: после ввода кода для него заводится кабинет покупателя */
async function requestCode(req, res) {
  const b = await readJson(req)
  const email = clean(b.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email) || email.endsWith('.invalid')) fail(422, 'fields', { fields: ['email'] })
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
    const p = settlePercent(db.prepare('SELECT * FROM partners WHERE id = ?').get(s.partner_id))
    return send(res, 200, p && !p.blocked_at ? { role: 'partner', partner: viewPartner(p) } : { role: null })
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
  // Трек обязателен для СДЭК; в пункт партнёра товар может ехать и без трек-номера
  if (to === 'SHIPPED' && !track && o.pickup_type !== 'PARTNER') fail(422, 'fields', { fields: ['trackNumber'] })
  if (to === 'CANCELLED' && !reason) fail(422, 'fields', { fields: ['reason'] })
  db.prepare(`UPDATE orders SET status = ?, payment_url = CASE WHEN ? <> '' THEN ? ELSE payment_url END,
      track_number = CASE WHEN ? <> '' THEN ? ELSE track_number END,
      cancel_reason = CASE WHEN ? <> '' THEN ? ELSE cancel_reason END, updated_at = ? WHERE id = ?`)
    .run(to, paymentUrl, paymentUrl, track, track, reason, reason, now(), o.id)
  // Сотрудник отметил приёмку или выдачу за партнёра (например, партнёр позвонил) — даты те же, что от кнопок в кабинете
  if (to === 'READY' && !o.received_at) db.prepare('UPDATE orders SET received_at = ? WHERE id = ?').run(now(), o.id)
  if (to === 'RECEIVED' && !o.issued_at) db.prepare('UPDATE orders SET issued_at = ?, issued_to_name = buyer_name WHERE id = ?').run(now(), o.id)
  addEvent(o.id, to, to === 'SHIPPED' ? track : to === 'CANCELLED' ? reason : '')
  const fresh = db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)
  notifyStatus(fresh)
  send(res, 200, { order: viewOrder(fresh, true), next: NEXT[fresh.status] })
}

/** Письма о новом этапе: покупателю (если оставил email) и партнёру, в чей пункт едет товар */
function notifyStatus(o) {
  const letter = o.email ? letters.statusChanged(viewOrder(o), PUBLIC_URL, loginLink(o.buyer_id, `/account/orders/${o.number}`)) : null
  if (letter) queueMicrotask(() => sendMail(o.email, ...letter))
  const p = o.partner_id ? db.prepare('SELECT * FROM partners WHERE id = ?').get(o.partner_id) : null
  const toPartner = p ? letters.partnerStatus(viewPartnerOrder(o), PUBLIC_URL) : null
  if (toPartner) queueMicrotask(() => sendMail(p.email, ...toPartner, PARTNERS_EMAIL_TO))
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
const mapPointView = (x) =>
  x ? { code: x.code, name: x.name, address: x.address, city: x.city, workTime: x.workTime || '', lat: x.lat, lon: x.lon } : null

/** Где покупатель забирает заказ партнёра: точка на карте, если привязана, иначе адрес из анкеты */
function pickupOf(p) {
  const x = findMapPoint(p.point_code)
  return x
    ? { city: x.city, cityCode: x.cityCode, code: x.code, text: `${x.name}, ${x.address} — пункт партнёра ${p.company_name}`, address: `${x.city}, ${x.address}`, name: x.name, workTime: x.workTime || '' }
    : { city: '', cityCode: null, code: '', text: `${p.company_name}, ${p.point_address}`, address: p.point_address, name: '', workTime: '' }
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
    pointCode: p.point_code,
    point: mapPointView(findMapPoint(p.point_code)),
    // Точка видна покупателям на карте магазина: привязана и оферта принята
    pointVisible: Boolean(p.point_code && findMapPoint(p.point_code) && p.offer_accepted_at && !p.blocked_at),
    rewardPercentNext: p.reward_percent_next ?? null,
    rewardPercentNextFrom: p.reward_percent_next_from ?? null,
    createdAt: p.created_at,
  }
  if (forStaff) Object.assign(v, { offerAcceptIp: p.offer_accept_ip, applicationId: p.application_id, blockedAt: p.blocked_at ?? null, blockReason: p.block_reason, stats: partnerStats(p.id) })
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
  if (p.blocked_at) fail(403, 'blocked')
  openSession(res, 'partner', null, p.id)
  send(res, 200, { ok: true })
}

function needPartner(req) {
  const s = session(req)
  if (!s || s.role !== 'partner') fail(401, 'auth')
  const p = settlePercent(db.prepare('SELECT * FROM partners WHERE id = ?').get(s.partner_id))
  if (!p || p.blocked_at) fail(401, 'auth')
  return p
}

/** Новый процент наступил — он становится текущим (запись обновляется при первом обращении) */
function settlePercent(p) {
  if (!p || p.reward_percent_next == null || !p.reward_percent_next_from || new Date(p.reward_percent_next_from) > new Date()) return p
  db.prepare('UPDATE partners SET reward_percent = reward_percent_next, reward_percent_next = NULL, reward_percent_next_from = NULL WHERE id = ?').run(p.id)
  return db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id)
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
  const partners = db.prepare('SELECT * FROM partners ORDER BY id DESC').all().map((p) => viewPartner(settlePercent(p), true))
  const points = allPoints().map(({ code, name, address, city, active, own }) => ({ code, name, address, city, active: Boolean(active), own: Boolean(own) }))
  send(res, 200, { applications, partners, points })
}

/** Координаты по адресу — HTTP Геокодер Яндекса (ключ YGEOCODER_KEY, ставится api/set-geocoder.sh). null — не нашёл */
const YGEOCODER_KEY = env('YGEOCODER_KEY', '')
async function geocode(address) {
  if (!YGEOCODER_KEY) return null
  try {
    const u = new URL('https://geocode-maps.yandex.ru/1.x/')
    for (const [k, v] of Object.entries({ apikey: YGEOCODER_KEY, geocode: address, format: 'json', results: '1', lang: 'ru_RU' })) u.searchParams.set(k, v)
    const r = await fetch(u, { headers: { Referer: `${PUBLIC_URL}/` }, signal: AbortSignal.timeout(8000) })
    const pos = (await r.json())?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos
    const [lon, lat] = String(pos || '').split(' ').map(Number)
    return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null
  } catch (e) {
    console.error('geocoder:', e.message)
    return null
  }
}
/** «55.742, 37.504» из Яндекс Карт → { lat, lon } */
function parseCoords(v) {
  const m = /^\s*(-?\d{1,2}(?:[.,]\d+)?)\s*[,; ]\s*(-?\d{1,3}(?:[.,]\d+)?)\s*$/.exec(String(v || ''))
  if (!m) return null
  const lat = Number(m[1].replace(',', '.'))
  const lon = Number(m[2].replace(',', '.'))
  return Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? { lat, lon } : null
}

/**
 * Пункт выдачи партнёра — правит сотрудник: адрес из анкеты, точка на карте магазина (готовая из списка или новая).
 * Привязанная точка открывается покупателям (когда партнёр принял оферту), заказы с сайта в неё видит партнёр,
 * а в заказах партнёра и на странице оплаты покупатель видит её адрес. У точки один партнёр; пустой код — отвязать
 */
async function staffPartnerPoint(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(Number(id))
  if (!p) fail(404, 'not_found')
  const t = now()
  if (typeof b.pointAddress === 'string') {
    const address = clean(b.pointAddress, 500)
    if (address.length < 5) fail(422, 'fields', { fields: ['pointAddress'] })
    db.prepare('UPDATE partners SET point_address = ?, updated_at = ? WHERE id = ?').run(address, t, p.id)
  }
  let code = typeof b.pointCode === 'string' ? clean(b.pointCode, 40) : p.point_code
  if (b.newPoint && typeof b.newPoint === 'object') {
    // Новая точка: город ищем в справочнике СДЭК (по его коду карта показывает точки города), координаты — с Яндекс Карт или геокодером
    const n = { name: clean(b.newPoint.name, 120), city: clean(b.newPoint.city, 120), address: clean(b.newPoint.address, 300), workTime: clean(b.newPoint.workTime, 120) }
    const errors = []
    if (!n.name) errors.push('name')
    if (n.address.length < 5) errors.push('address')
    let city = null
    if (n.city.length < 2) errors.push('city')
    else {
      try {
        city = (await suggestCities(n.city))[0] ?? null
      } catch (e) {
        console.error('cdek:', e.message)
      }
      if (!city) errors.push('city')
    }
    const coords = parseCoords(b.newPoint.coords) ?? (b.newPoint.coords ? null : await geocode(`${n.city}, ${n.address}`))
    if (!coords) errors.push('coords')
    if (errors.length) fail(422, 'fields', { fields: errors })
    code = 'TA-' + Array.from({ length: 5 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ'[crypto.randomInt(24)]).join('')
    db.prepare('INSERT INTO map_points (code, name, address, city, city_code, lat, lon, work_time, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(code, n.name, n.address, city.name.split(',')[0], city.code, coords.lat, coords.lon, n.workTime, t)
    console.log(`map point ${code} ${n.city}, ${n.address}`)
  }
  if (code && !findMapPoint(code)) fail(422, 'fields', { fields: ['pointCode'] })
  if (code && db.prepare('SELECT 1 FROM partners WHERE point_code = ? AND id <> ?').get(code, p.id)) fail(409, 'point_taken')
  db.prepare('UPDATE partners SET point_code = ?, updated_at = ? WHERE id = ?').run(code, t, p.id)
  console.log(`partner ${p.id} point ${code || '—'}`)
  send(res, 200, { ok: true, partner: viewPartner(db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id), true) })
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

/* ── Заказы партнёра: оформление в кабинете → страница оплаты для покупателя → приёмка и выдача в пункте ── */

/** Фото и сканы из пункта выдачи (замечание при приёмке, подписанный акт, обращение покупателя): FILES_DIR/<номер заказа>/ */
const FILES_DIR = env('FILES_DIR', path.join(path.dirname(DB_PATH), 'files'))
const FILE_TYPES = [
  ['jpg', 'image/jpeg', (b) => b[0] === 0xff && b[1] === 0xd8],
  ['png', 'image/png', (b) => b.subarray(0, 4).toString('hex') === '89504e47'],
  ['webp', 'image/webp', (b) => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP'],
  ['pdf', 'application/pdf', (b) => b.subarray(0, 4).toString() === '%PDF'],
]
const MAX_FILE = 10 * 1024 * 1024
/** Файл из браузера (data:...;base64,...) → на диск. Тип определяем по содержимому, а не по тому, что прислал браузер */
function saveFile(number, kind, dataUrl, allowPdf = false) {
  const m = /^data:[\w/+.-]*;base64,([A-Za-z0-9+/=]+)$/.exec(typeof dataUrl === 'string' ? dataUrl : '')
  if (!m) fail(422, 'fields', { fields: ['file'] })
  const buf = Buffer.from(m[1], 'base64')
  if (!buf.length || buf.length > MAX_FILE) fail(413, 'too_large')
  const type = FILE_TYPES.find(([ext, , test]) => test(buf) && (allowPdf || ext !== 'pdf'))
  if (!type) fail(422, 'fields', { fields: ['file'] })
  const dir = path.join(FILES_DIR, number)
  fs.mkdirSync(dir, { recursive: true })
  const name = `${kind}-${Date.now().toString(36)}${crypto.randomInt(100, 1000)}.${type[0]}`
  fs.writeFileSync(path.join(dir, name), buf)
  return name
}
function orderFiles(number) {
  try {
    return fs.readdirSync(path.join(FILES_DIR, number)).filter((f) => /^[\w-]+\.(jpg|png|webp|pdf)$/.test(f)).sort()
  } catch {
    return []
  }
}
function sendFile(res, number, name) {
  if (!/^[\w-]+\.(jpg|png|webp|pdf)$/.test(name) || !orderFiles(number).includes(name)) fail(404, 'not_found')
  const type = FILE_TYPES.find(([ext]) => name.endsWith('.' + ext))[1]
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff',
    'Content-Disposition': `inline; filename="${number}-${name}"` })
  res.end(fs.readFileSync(path.join(FILES_DIR, number, name)))
}

function partnerOrderRow(p, number) {
  const o = db.prepare('SELECT * FROM orders WHERE number = ? AND partner_id = ?').get(number, p.id)
  if (!o) fail(404, 'not_found')
  return o
}

/** Партнёр оформляет заказ по просьбе покупателя (оферта партнёру, п. 5.1). Цена — из каталога сервера, доставка в пункт входит в цену */
async function partnerCreateOrder(req, res) {
  const p = needPartner(req)
  if (!p.offer_accepted_at) fail(403, 'offer')
  if (limited('porder:' + p.id, 30, 3600_000)) fail(429, 'rate')
  const b = await readJson(req)
  const d = {
    buyerName: clean(b.buyerName, 200).replace(/\s+/g, ' '),
    phone: normPhone(clean(b.buyerPhone, 40)),
    email: clean(b.buyerEmail, 200).toLowerCase(),
  }
  const errors = []
  if (d.buyerName.split(' ').filter(Boolean).length < 2) errors.push('buyerName')
  if (!d.phone) errors.push('buyerPhone')
  if (d.email && (!EMAIL_RE.test(d.email) || d.email === DEMO_EMAIL || d.email.endsWith('.invalid'))) errors.push('buyerEmail')
  if (b.buyerInformed !== true) errors.push('informed')
  const id = clean(b.productId, 80)
  const prod = catalog[id]
  if (!prod) errors.push('product')
  else if (!prod.inStock) errors.push('unavailable:' + id)
  if (errors.length) fail(422, 'fields', { fields: errors })

  const colors = Array.isArray(prod.colors) ? prod.colors : []
  const asked = clean(b.color, 200)
  const color = colors.includes(asked) ? asked : (colors[0] || '')
  const price = (color && prod.prices?.[color]) || prod.price
  const items = [{ productId: id, ...(color ? { color } : {}), name: color && colors.length > 1 ? `${prod.name}, ${color}` : prod.name, price, qty: 1 }]
  const percent = p.reward_percent
  const reward = percent > 0 ? Math.round((price * percent) / 100) : null
  const t = now()

  const buyerEmail = d.email || NO_EMAIL
  let buyer = db.prepare('SELECT * FROM buyers WHERE email = ?').get(buyerEmail)
  if (!buyer) {
    // У служебной записи «без email» имя и телефон пустые: данные покупателя хранятся только в заказе
    const own = buyerEmail !== NO_EMAIL
    db.prepare('INSERT INTO buyers (email, name, phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
      .run(buyerEmail, own ? d.buyerName : '', own ? d.phone : '', t, t)
    buyer = db.prepare('SELECT * FROM buyers WHERE email = ?').get(buyerEmail)
  }

  const pickup = pickupOf(p)
  const number = newNumber()
  const token = crypto.randomBytes(18).toString('base64url')
  const r = db.prepare(`INSERT INTO orders (number, buyer_id, status, items, goods_total, delivery, total, buyer_name, phone, email,
      city, sdek_point, sdek_city_code, sdek_point_code, pickup_type, source, partner_id, reward_percent, reward, pay_token,
      offer_accepted_at, pd_consent_at, created_at, updated_at)
      VALUES (?, ?, 'NEW', ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, 'PARTNER', 'PARTNER', ?, ?, ?, ?, '', '', ?, ?)`)
    .run(number, buyer.id, JSON.stringify(items), price, price, d.buyerName, d.phone, d.email,
      pickup.city, pickup.text, pickup.cityCode, pickup.code,
      p.id, percent > 0 ? percent : null, reward, token, t, t)
  addEvent(Number(r.lastInsertRowid), 'NEW')
  const order = db.prepare('SELECT * FROM orders WHERE number = ?').get(number)
  queueMicrotask(() => {
    if (d.email) sendMail(d.email, ...letters.partnerOrderCreated(viewOrder(order), PUBLIC_URL, payPage(order), loginLink(buyer.id, `/account/orders/${number}`)))
    if (ORDERS_EMAIL_TO) sendMail(ORDERS_EMAIL_TO, ...letters.staffNewOrder(viewOrder(order, true), PUBLIC_URL), d.email || undefined)
  })
  console.log(`partner ${p.id} order ${number} ${price}`)
  send(res, 200, { ok: true, order: viewPartnerOrder(order) })
}

function partnerOrders(req, res) {
  const p = needPartner(req)
  const rows = db.prepare('SELECT * FROM orders WHERE partner_id = ? ORDER BY created_at DESC, id DESC LIMIT 1000').all(p.id)
  send(res, 200, { orders: rows.map(viewPartnerOrder) })
}

/** Приёмка в пункте (оферта партнёру, п. 5.1, 8.2): упаковка цела — или замечание с фото. Покупателю — письмо «можно забирать» */
async function partnerAccept(req, res, number) {
  const p = needPartner(req)
  const o = partnerOrderRow(p, number)
  const b = await readJson(req, 40 * 1024 * 1024)
  if (!['PAID', 'SHIPPED'].includes(o.status)) fail(409, 'bad_transition')
  const issue = clean(b.issue, 1000)
  const photos = Array.isArray(b.photos) ? b.photos.slice(0, 6) : []
  if (issue && !photos.length) fail(422, 'fields', { fields: ['photos'] })
  for (const ph of photos) saveFile(o.number, 'accept', ph)
  const t = now()
  db.prepare("UPDATE orders SET status = 'READY', received_at = ?, received_issue = ?, received_photos = ?, updated_at = ? WHERE id = ?")
    .run(t, issue, issue ? photos.length : 0, t, o.id)
  addEvent(o.id, 'READY', issue ? `При приёмке: ${issue}` : '')
  const fresh = db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)
  notifyStatus(fresh)
  if (issue) queueMicrotask(() => sendMail(PARTNERS_EMAIL_TO, ...letters.staffAcceptIssue(viewOrder(fresh, true), p.company_name, PUBLIC_URL)))
  send(res, 200, { ok: true, order: viewPartnerOrder(fresh) })
}

/** Покупатель уведомлён о поступлении: с этой даты товар хранится 5 дней (оферта партнёру, п. 8.3) */
function partnerNotified(req, res, number) {
  const p = needPartner(req)
  const o = partnerOrderRow(p, number)
  if (o.status !== 'READY') fail(409, 'bad_transition')
  if (!o.notified_at) db.prepare('UPDATE orders SET notified_at = ?, updated_at = ? WHERE id = ?').run(now(), now(), o.id)
  send(res, 200, { ok: true, order: viewPartnerOrder(db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)) })
}

/** Выдача покупателю из заказа: только оплаченный заказ, с фото или сканом подписанного акта приёма-передачи */
async function partnerIssue(req, res, number) {
  const p = needPartner(req)
  const o = partnerOrderRow(p, number)
  const b = await readJson(req, 25 * 1024 * 1024)
  if (o.status !== 'READY') fail(409, 'bad_transition')
  const act = saveFile(o.number, 'act', b.act, true)
  const t = now()
  db.prepare("UPDATE orders SET status = 'RECEIVED', issued_at = ?, issued_to_name = buyer_name, act_file = ?, updated_at = ? WHERE id = ?")
    .run(t, act, t, o.id)
  addEvent(o.id, 'RECEIVED', 'Выдан в пункте партнёра, акт загружен')
  const fresh = db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)
  notifyStatus(fresh)
  send(res, 200, { ok: true, order: viewPartnerOrder(fresh) })
}

const CLAIM_TYPES = { EXCHANGE: 'Обмен', RETURN: 'Возврат', DEFECT: 'Недостаток товара' }
/** Обращение покупателя об обмене или возврате, принятое в пункте (оферта партнёру, п. 5.1, 8.4) — уходит сотрудникам */
async function partnerClaim(req, res, number) {
  const p = needPartner(req)
  const o = partnerOrderRow(p, number)
  const b = await readJson(req, 25 * 1024 * 1024)
  if (o.status !== 'RECEIVED') fail(409, 'bad_transition')
  const type = CLAIM_TYPES[b.type] ? b.type : null
  const text = clean(b.text, 2000)
  if (!type || !text) fail(422, 'fields', { fields: [...(type ? [] : ['type']), ...(text ? [] : ['text'])] })
  const photo = b.photo ? saveFile(o.number, 'claim', b.photo) : ''
  const claims = JSON.parse(o.claims || '[]')
  const claim = { id: crypto.randomUUID(), type, text, photo, createdAt: now() }
  claims.push(claim)
  db.prepare('UPDATE orders SET claims = ?, updated_at = ? WHERE id = ?').run(JSON.stringify(claims), now(), o.id)
  const fresh = db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)
  queueMicrotask(() => sendMail(ORDERS_EMAIL_TO || PARTNERS_EMAIL_TO, ...letters.staffClaim(viewOrder(fresh, true), p.company_name, CLAIM_TYPES[type], text, PUBLIC_URL)))
  send(res, 200, { ok: true, order: viewPartnerOrder(fresh) })
}

function partnerFile(req, res, number, name) {
  const p = needPartner(req)
  partnerOrderRow(p, number)
  sendFile(res, number, name)
}
function staffFile(req, res, number, name) {
  needStaff(req)
  sendFile(res, number, name)
}

/* Страница оплаты заказа партнёра (/pay/<token>): ссылку партнёр отправляет покупателю сразу после оформления.
 * Покупатель отмечает согласие с офертой купли-продажи и на обработку персональных данных, затем переходит к оплате СБП.
 * Ссылку банка ставит сотрудник, когда подтвердит наличие (этап «Ждёт оплаты») — до этого страница так и говорит */
function payView(o) {
  const p = o.partner_id ? db.prepare('SELECT * FROM partners WHERE id = ?').get(o.partner_id) : null
  const pickup = p ? pickupOf(p) : null
  const consented = Boolean(o.offer_accepted_at)
  const paidAt = db.prepare("SELECT at FROM order_events WHERE order_id = ? AND status = 'PAID' ORDER BY id DESC LIMIT 1").get(o.id)?.at ?? null
  return {
    number: o.number,
    status: o.status,
    items: JSON.parse(o.items),
    total: o.total,
    point: p ? { companyName: p.company_name, name: pickup.name, address: pickup.address, workTime: pickup.workTime, phone: p.phone } : null,
    consentAt: o.offer_accepted_at || null,
    paymentUrl: consented && o.status === 'AWAITING_PAYMENT' ? o.payment_url : '',
    paidAt,
    issuedAt: o.issued_at || null,
    cancelReason: o.status === 'CANCELLED' ? o.cancel_reason : '',
  }
}
function payOrder(req, token) {
  if (limited('pay:' + ip(req), 120, 600_000)) fail(429, 'rate')
  const o = db.prepare('SELECT * FROM orders WHERE pay_token = ?').get(token)
  if (!o) fail(404, 'not_found')
  return o
}
function payGet(req, res, token) {
  send(res, 200, { order: payView(payOrder(req, token)) })
}
async function payConsent(req, res, token) {
  const o = payOrder(req, token)
  const b = await readJson(req)
  if (b.offer !== true || b.pd !== true) fail(422, 'fields', { fields: [...(b.offer === true ? [] : ['offer']), ...(b.pd === true ? [] : ['pd'])] })
  if (o.status === 'CANCELLED') fail(409, 'cancelled')
  if (!o.offer_accepted_at) {
    const t = now()
    db.prepare('UPDATE orders SET offer_accepted_at = ?, pd_consent_at = ?, updated_at = ? WHERE id = ?').run(t, t, t, o.id)
    console.log(`order ${o.number} buyer consent`)
  }
  send(res, 200, { order: payView(db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id)) })
}

/* ── Расчёты с партнёром: сводка, отчёт агента и акт за месяц, выплата, процент, отключение ── */

/** Сводка по партнёру для сотрудников: сколько оформил и выдал, сколько начислено, в отчётах и выплачено */
function partnerStats(partnerId) {
  const q = (sql, ...a) => db.prepare(sql).get(partnerId, ...a)
  const orders = q("SELECT COUNT(*) n, COALESCE(SUM(total), 0) sum FROM orders WHERE partner_id = ? AND source = 'PARTNER'")
  const active = q("SELECT COUNT(*) n FROM orders WHERE partner_id = ? AND status NOT IN ('RECEIVED', 'CANCELLED')")
  const issued = q("SELECT COUNT(*) n, COALESCE(SUM(total), 0) sum, COALESCE(SUM(reward), 0) reward FROM orders WHERE partner_id = ? AND source = 'PARTNER' AND status = 'RECEIVED' AND act_file <> ''")
  const reports = q('SELECT COALESCE(SUM(payable), 0) reported, COALESCE(SUM(paid_amount), 0) paid FROM agent_reports WHERE partner_id = ? AND revoked_at IS NULL')
  const siteOrders = q("SELECT COUNT(*) n FROM orders WHERE partner_id = ? AND source = 'SITE'")
  return {
    orders: orders.n, ordersSum: orders.sum, active: active.n, siteOrders: siteOrders.n,
    issued: issued.n, issuedSum: issued.sum, accrued: issued.reward,
    reported: reports.reported, paid: reports.paid,
    // Начислено, но ещё не вошло в отчёт — войдёт в отчёт за свой месяц
    notReported: Math.max(0, issued.reward - reports.reported),
  }
}

/** Отчётный месяц по московскому времени: 'ГГГГ-ММ' */
const mskPeriod = (iso) => new Date(Date.parse(iso) + 3 * 3600_000).toISOString().slice(0, 7)
const ddmmyyyy = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`

/** Реквизиты партнёра на дату документа — как partnerParty в src/data/parties.ts */
function agentParty(p) {
  return {
    name: p.company_name || p.email,
    details: [
      p.inn ? `ИНН ${p.inn}` : '',
      p.ogrn ? `${p.ogrn.length === 15 ? 'ОГРНИП' : 'ОГРН'} ${p.ogrn}` : '',
      p.point_address ? `Пункт выдачи: ${p.point_address}` : '',
      p.account ? `Р/с ${p.account}${p.bank_name ? ` в ${p.bank_name}` : ''}` : '',
      p.bik ? `БИК ${p.bik}` : '',
    ].filter(Boolean),
  }
}

function viewReport(r) {
  return {
    id: r.id, partnerId: r.partner_id, period: r.period, number: r.number, form: JSON.parse(r.form),
    orderNumbers: JSON.parse(r.order_numbers), payable: r.payable,
    review: r.review_status ? { status: r.review_status, at: r.review_at, text: r.review_text } : null,
    revokedAt: r.revoked_at ?? null,
    paid: r.paid_at ? { at: r.paid_at, amount: r.paid_amount, note: r.paid_note } : null,
    createdAt: r.created_at,
  }
}

/** Сформировать отчёт агента и акт за месяц: заказы, оформленные партнёром, выданные покупателю в этом месяце
 *  с загруженным подписанным актом и ещё не вошедшие в отчёт. Возвратов после выдачи сервер пока не ведёт —
 *  удержаний (п. 7.3) в отчёте нет */
async function staffReportCreate(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(Number(id))
  if (!p) fail(404, 'not_found')
  const period = clean(b.period, 7)
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(period)) fail(422, 'fields', { fields: ['period'] })
  if (db.prepare('SELECT 1 FROM agent_reports WHERE partner_id = ? AND period = ? AND revoked_at IS NULL').get(p.id, period)) fail(409, 'exists')
  const inReports = new Set(db.prepare('SELECT order_numbers FROM agent_reports WHERE partner_id = ? AND revoked_at IS NULL').all(p.id).flatMap((r) => JSON.parse(r.order_numbers)))
  const list = db.prepare("SELECT * FROM orders WHERE partner_id = ? AND source = 'PARTNER' AND status = 'RECEIVED' AND act_file <> '' AND issued_at IS NOT NULL ORDER BY issued_at")
    .all(p.id).filter((o) => mskPeriod(o.issued_at) === period && !inReports.has(o.number))
  if (!list.length) fail(422, 'empty')

  const [y, m] = period.split('-').map(Number)
  const used = db.prepare('SELECT number FROM agent_reports WHERE number LIKE ?').all(`TA-${y}/${String(m).padStart(2, '0')}-%`)
    .map((r) => Number(r.number.split('-').pop()) || 0)
  const number = `TA-${y}/${String(m).padStart(2, '0')}-${String(Math.max(0, ...used) + 1).padStart(3, '0')}`
  const t = now()
  const rows = list.map((o) => ({
    orderNumber: o.number,
    product: JSON.parse(o.items).map((i) => (i.qty > 1 ? `${i.name} × ${i.qty}` : i.name)).join(', '),
    paidAt: db.prepare("SELECT at FROM order_events WHERE order_id = ? AND status = 'PAID' ORDER BY id DESC LIMIT 1").get(o.id)?.at,
    issuedAt: o.issued_at,
    buyer: o.issued_to_name || o.buyer_name,
    price: o.total,
    percent: o.reward_percent ?? null,
    reward: o.reward ?? null,
  }))
  const goodsTotal = rows.reduce((a, r) => a + r.price, 0)
  const accruedTotal = rows.reduce((a, r) => a + (r.reward ?? 0), 0)
  const form = {
    number, date: t,
    periodFrom: ddmmyyyy(new Date(Date.UTC(y, m - 1, 1))), periodTo: ddmmyyyy(new Date(Date.UTC(y, m, 0))),
    acceptedAt: p.offer_accepted_at || undefined,
    agent: agentParty(p),
    rows, returns: [], carried: 0, deducted: 0, carryForward: 0,
    goodsTotal, accruedTotal, payable: accruedTotal,
  }
  const r = db.prepare('INSERT INTO agent_reports (partner_id, period, number, form, order_numbers, payable, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(p.id, period, number, JSON.stringify(form), JSON.stringify(list.map((o) => o.number)), accruedTotal, t)
  const report = db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(Number(r.lastInsertRowid))
  queueMicrotask(() => sendMail(p.email, ...letters.partnerReport(viewReport(report), PUBLIC_URL), PARTNERS_EMAIL_TO))
  console.log(`report ${number} partner ${p.id} ${accruedTotal}`)
  send(res, 200, { ok: true, report: viewReport(report) })
}

function staffReports(req, res) {
  needStaff(req)
  const rows = db.prepare('SELECT r.*, p.company_name FROM agent_reports r JOIN partners p ON p.id = r.partner_id ORDER BY r.id DESC LIMIT 1000').all()
  send(res, 200, { reports: rows.map((r) => ({ ...viewReport(r), companyName: r.company_name })) })
}
function staffReport(req, res, id) {
  needStaff(req)
  const r = db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(Number(id))
  if (!r) fail(404, 'not_found')
  send(res, 200, { report: viewReport(r) })
}

/** Отозвать отчёт, пока партнёр его не принял и выплаты не было: заказы вернутся в расчёт, отчёт можно сформировать заново */
function staffReportRevoke(req, res, id) {
  needStaff(req)
  const r = db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(Number(id))
  if (!r) fail(404, 'not_found')
  if (r.revoked_at || r.paid_at || r.review_status === 'ACCEPTED') fail(409, 'decided')
  db.prepare('UPDATE agent_reports SET revoked_at = ? WHERE id = ?').run(now(), r.id)
  send(res, 200, { ok: true })
}

/** Выплата вознаграждения по отчёту (п. 7.6). Сумму вводит сотрудник — обычно «к выплате» по отчёту */
async function staffReportPaid(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const r = db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(Number(id))
  if (!r) fail(404, 'not_found')
  if (r.revoked_at || r.review_status === 'OBJECTED') fail(409, 'decided')
  const amount = Math.round(Number(b.amount))
  const date = clean(b.date, 10)
  if (!Number.isFinite(amount) || amount < 0 || amount > 100_000_000) fail(422, 'fields', { fields: ['amount'] })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(422, 'fields', { fields: ['date'] })
  db.prepare('UPDATE agent_reports SET paid_at = ?, paid_amount = ?, paid_note = ? WHERE id = ?').run(`${date}T12:00:00.000Z`, amount, clean(b.note, 300), r.id)
  const fresh = db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(r.id)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(r.partner_id)
  queueMicrotask(() => sendMail(p.email, ...letters.partnerPaid(viewReport(fresh), PUBLIC_URL), PARTNERS_EMAIL_TO))
  send(res, 200, { ok: true, report: viewReport(fresh) })
}

function partnerReports(req, res) {
  const p = needPartner(req)
  const rows = db.prepare('SELECT * FROM agent_reports WHERE partner_id = ? AND revoked_at IS NULL ORDER BY id DESC').all(p.id)
  send(res, 200, { reports: rows.map(viewReport) })
}

/** Решение партнёра по отчёту и акту: принять или направить возражения (п. 7.5). Возражения — письмом сотрудникам */
async function partnerReportReview(req, res, id) {
  const p = needPartner(req)
  const b = await readJson(req)
  const r = db.prepare('SELECT * FROM agent_reports WHERE id = ? AND partner_id = ?').get(Number(id), p.id)
  if (!r || r.revoked_at) fail(404, 'not_found')
  if (r.review_status || r.paid_at) fail(409, 'decided')
  const status = b.status === 'ACCEPTED' || b.status === 'OBJECTED' ? b.status : null
  const text = clean(b.text, 3000)
  if (!status || (status === 'OBJECTED' && !text)) fail(422, 'fields', { fields: ['text'] })
  db.prepare('UPDATE agent_reports SET review_status = ?, review_at = ?, review_text = ? WHERE id = ?').run(status, now(), status === 'OBJECTED' ? text : '', r.id)
  if (status === 'OBJECTED') queueMicrotask(() => sendMail(PARTNERS_EMAIL_TO, ...letters.staffObjection(viewReport(r), p.company_name, text, PUBLIC_URL), p.email))
  send(res, 200, { ok: true, report: viewReport(db.prepare('SELECT * FROM agent_reports WHERE id = ?').get(r.id)) })
}

/** Новый процент вознаграждения: применяется к заказам, оформленным через 14 дней (оферта партнёру, п. 7.1).
 *  Партнёр видит его в кабинете и получает письмо */
async function staffPartnerPercent(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const p = settlePercent(db.prepare('SELECT * FROM partners WHERE id = ?').get(Number(id)))
  if (!p) fail(404, 'not_found')
  const percent = Math.round(Number(String(b.percent).replace(',', '.')) * 100) / 100
  if (!Number.isFinite(percent) || percent <= 0 || percent > 50) fail(422, 'fields', { fields: ['percent'] })
  const from = new Date()
  from.setUTCDate(from.getUTCDate() + 14)
  db.prepare('UPDATE partners SET reward_percent_next = ?, reward_percent_next_from = ?, updated_at = ? WHERE id = ?').run(percent, from.toISOString(), now(), p.id)
  const fresh = db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id)
  queueMicrotask(() => sendMail(p.email, ...letters.partnerPercent(viewPartner(fresh), PUBLIC_URL), PARTNERS_EMAIL_TO))
  send(res, 200, { ok: true, partner: viewPartner(fresh, true) })
}

/** Отключить доступ партнёра (или вернуть): входы закрываются, его точка пропадает с карты. Заказы остаются у сотрудников */
async function staffPartnerBlock(req, res, id) {
  needStaff(req)
  const b = await readJson(req)
  const p = db.prepare('SELECT * FROM partners WHERE id = ?').get(Number(id))
  if (!p) fail(404, 'not_found')
  if (b.blocked === true) {
    const reason = clean(b.reason, 300)
    if (!reason) fail(422, 'fields', { fields: ['reason'] })
    db.prepare('UPDATE partners SET blocked_at = ?, block_reason = ?, updated_at = ? WHERE id = ?').run(now(), reason, now(), p.id)
    db.prepare("DELETE FROM sessions WHERE role = 'partner' AND partner_id = ?").run(p.id)
  } else {
    db.prepare("UPDATE partners SET blocked_at = NULL, block_reason = '', updated_at = ? WHERE id = ?").run(now(), p.id)
  }
  console.log(`partner ${p.id} ${b.blocked === true ? 'blocked' : 'unblocked'}`)
  send(res, 200, { ok: true, partner: viewPartner(db.prepare('SELECT * FROM partners WHERE id = ?').get(p.id), true) })
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
  ['POST', /^\/api\/staff\/partners\/(\d+)\/point$/, staffPartnerPoint],
  ['POST', /^\/api\/staff\/partners\/(\d+)\/percent$/, staffPartnerPercent],
  ['POST', /^\/api\/staff\/partners\/(\d+)\/block$/, staffPartnerBlock],
  ['POST', /^\/api\/staff\/partners\/(\d+)\/reports$/, staffReportCreate],
  ['GET', /^\/api\/staff\/reports$/, staffReports],
  ['GET', /^\/api\/staff\/reports\/(\d+)$/, staffReport],
  ['POST', /^\/api\/staff\/reports\/(\d+)\/revoke$/, staffReportRevoke],
  ['POST', /^\/api\/staff\/reports\/(\d+)\/paid$/, staffReportPaid],
  ['GET', /^\/api\/partner\/reports$/, partnerReports],
  ['POST', /^\/api\/partner\/reports\/(\d+)\/review$/, partnerReportReview],
  ['GET', new RegExp(`^/api/staff/orders/${ORDER_NO}/files/([\\w.-]+)$`), staffFile],
  ['GET', /^\/api\/partner\/orders$/, partnerOrders],
  ['POST', /^\/api\/partner\/orders$/, partnerCreateOrder],
  ['POST', new RegExp(`^/api/partner/orders/${ORDER_NO}/accept$`), partnerAccept],
  ['POST', new RegExp(`^/api/partner/orders/${ORDER_NO}/notified$`), partnerNotified],
  ['POST', new RegExp(`^/api/partner/orders/${ORDER_NO}/issue$`), partnerIssue],
  ['POST', new RegExp(`^/api/partner/orders/${ORDER_NO}/claim$`), partnerClaim],
  ['GET', new RegExp(`^/api/partner/orders/${ORDER_NO}/files/([\\w.-]+)$`), partnerFile],
  ['GET', /^\/api\/pay\/([\w-]{20,40})$/, payGet],
  ['POST', /^\/api\/pay\/([\w-]{20,40})\/consent$/, payConsent],
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
      await handler(req, res, m[1] ?? url.searchParams, m[2] ?? url.searchParams)
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
