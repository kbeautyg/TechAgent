/*
 * Пункты выдачи СДЭК для карты на странице оформления. Ключи СДЭК живут только на сервере:
 * браузер спрашивает наш /api/sdek/*, сервер — API СДЭК (OAuth client_credentials), ответы кэшируются.
 * CDEK_CLIENT_ID / CDEK_CLIENT_SECRET — ключи интеграции из личного кабинета СДЭК. Без них карта на сайте
 * не показывается, и покупатель вписывает адрес пункта сам (как раньше).
 * Без ключей (разработка DEV=1 или демо-кабинет покупателя) — выдуманные пункты в трёх городах, чтобы посмотреть карту.
 * С ключами демо-кабинет видит настоящие пункты СДЭК.
 */

const API = process.env.CDEK_API || 'https://api.cdek.ru/v2'
const ID = process.env.CDEK_CLIENT_ID || ''
const SECRET = process.env.CDEK_CLIENT_SECRET || ''
const DEV = process.env.DEV === '1'

export const cdekReady = () => Boolean(ID && SECRET) || DEV

let token = null
let tokenUntil = 0

async function getToken() {
  if (token && Date.now() < tokenUntil) return token
  const res = await fetch(`${API}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: ID, client_secret: SECRET }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`cdek token ${res.status}`)
  const j = await res.json()
  token = j.access_token
  tokenUntil = Date.now() + (Number(j.expires_in || 3600) - 120) * 1000
  return token
}

async function cdek(path, params) {
  const url = `${API}${path}?${new URLSearchParams(params)}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${await getToken()}` }, signal: AbortSignal.timeout(15_000) })
  if (res.status === 401) {
    token = null
    throw new Error('cdek 401')
  }
  if (!res.ok) throw new Error(`cdek ${path} ${res.status}`)
  return res.json()
}

/* ── Кэш: города — на час, пункты города — на 6 часов (СДЭК меняет их редко) ── */
const cache = new Map()
async function cached(key, ttlMs, load) {
  const hit = cache.get(key)
  if (hit && hit.until > Date.now()) return hit.value
  const value = await load()
  cache.set(key, { value, until: Date.now() + ttlMs })
  if (cache.size > 2000) cache.delete(cache.keys().next().value)
  return value
}

/** Подсказки городов: [{ code, name }] — name с областью, чтобы различать одноимённые */
export async function suggestCities(q, fake = false) {
  const name = q.trim().slice(0, 60)
  if (name.length < 2) return []
  if (!ID && (fake || DEV)) return DEV_CITIES.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
  return cached(`c:${name.toLowerCase()}`, 3600_000, async () => {
    const list = await cdek('/location/suggest/cities', { name, country_code: 'RU' })
    return (Array.isArray(list) ? list : []).slice(0, 10).map((c) => ({ code: c.code, name: c.full_name || c.city }))
  })
}

/** Пункты выдачи и постаматы города: [{ code, type, name, address, lat, lon, workTime, note }] */
export async function cityPoints(cityCode, fake = false) {
  const code = Number(cityCode)
  if (!Number.isInteger(code) || code <= 0) return []
  if (!ID && (fake || DEV)) return devPoints(code)
  return cached(`p:${code}`, 6 * 3600_000, async () => {
    const list = await cdek('/deliverypoints', { city_code: String(code), country_code: 'RU', type: 'ALL' })
    return (Array.isArray(list) ? list : [])
      .filter((p) => p.location && p.code && p.is_handout !== false)
      .map((p) => ({
        code: p.code,
        type: p.type === 'POSTAMAT' ? 'POSTAMAT' : 'PVZ',
        name: p.name || '',
        address: p.location.address || p.location.address_full || '',
        lat: p.location.latitude,
        lon: p.location.longitude,
        workTime: p.work_time || '',
        note: p.address_comment || '',
      }))
  })
}

/** Пункт по коду — чтобы проверить выбор покупателя при оформлении заказа */
export async function findPoint(cityCode, pointCode) {
  const list = await cityPoints(cityCode)
  return list.find((p) => p.code === pointCode) || null
}

/* ── Выдуманные данные для разработки без ключей ── */
const DEV_CITIES = [
  { code: 44, name: 'Москва, Россия', lat: 55.7522, lon: 37.6156 },
  { code: 137, name: 'Санкт-Петербург, Россия', lat: 59.9386, lon: 30.3141 },
  { code: 270, name: 'Новосибирск, Новосибирская обл., Россия', lat: 55.0302, lon: 82.9204 },
]
function devPoints(code) {
  const c = DEV_CITIES.find((x) => x.code === code)
  if (!c) return []
  const streets = ['ул. Ленина', 'пр. Мира', 'ул. Гагарина', 'ул. Советская', 'ул. Пушкина', 'Садовая ул.', 'ул. Лесная', 'Школьная ул.']
  const out = []
  for (let i = 0; i < 24; i++) {
    const postamat = i % 4 === 3
    out.push({
      code: `DEV${code}${String(i + 1).padStart(2, '0')}`,
      type: postamat ? 'POSTAMAT' : 'PVZ',
      name: postamat ? `Постамат ${i + 1}` : `Пункт выдачи ${i + 1}`,
      address: `${streets[i % streets.length]}, ${10 + i * 3}`,
      lat: c.lat + Math.sin(i * 1.7) * 0.07,
      lon: c.lon + Math.cos(i * 1.3) * 0.12,
      workTime: postamat ? 'Круглосуточно' : 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-18:00',
      note: i % 5 === 0 ? 'Вход со двора, рядом с аптекой' : '',
    })
  }
  return out
}
