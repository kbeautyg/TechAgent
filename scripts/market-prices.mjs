/**
 * Цены рынка с Яндекс Маркета: для каждого товара каталога — поиск на market.yandex.ru, из страницы берётся
 * список товаров (schema.org ItemList), отбираются предложения именно этой модели и памяти, считается медиана.
 * Капчу не обходит: если Маркет её показал — товар помечается и пропускается.
 *
 *   node scripts/market-prices.mjs [ids через запятую] > market-prices.json
 *
 * Пауза между запросами 4–7 с, чтобы не нагружать Маркет.
 */
import { products } from '../src/data/products.ts'

const COLOR = /\b(black|white|silver|gray|grey|graphite|gold|blue|red|green|pink|purple|midnight|starlight|titanium|natural|blueblack|navy|space|cosmic|orange|lavender|mint|yellow|teal|ultramarine|desert|jet|rose|sage|nickel|piano|deluxe|bundle|combo|fly|more)\b/gi
// Слова, которые отличают соседние модели: если их нет в нашем названии, а в предложении есть — это другая модель
const VARIANTS = ['pro', 'max', 'ultra', 'plus', '+', 'mini', 'fe', 'lite', 'edge', 'air', 'se', 'classic', 'xl', 'fold', 'flip', 'slim', 'digital', 'oled', 'cellular']
const JUNK = /чехол|стекл|плёнк|пленк|накладк|б\/у|восстановл|ремонт|муляж|копия|реплик|корпус|аккумулятор для|запчаст|дисплей для|кабель для|ремешок|защитн/i

const storageOf = (s) => {
  const m = s.match(/(\d+)\s?(TB|GB)\b/i)
  return m ? { n: m[1], tb: /tb/i.test(m[2]) } : null
}
const norm = (s) => s.toLowerCase().replace(/ё/g, 'е').replace(/[«»"(),]/g, ' ')

function queryFor(p) {
  // «iPhone 16 Pro Max 256GB Black Titanium» → «iPhone 16 Pro Max 256GB»
  const st = p.name.match(/^(.*?\d+\s?(?:GB|TB))\b/i)
  const base = st ? st[1] : p.name.replace(COLOR, '').replace(/\s+/g, ' ').trim()
  return (base.toLowerCase().startsWith(p.brand.toLowerCase()) ? base : `${p.brand} ${base}`).trim()
}

function matcher(p) {
  const q = norm(queryFor(p))
  const st = storageOf(p.name)
  const words = q.replace(/(\d+)\s?(gb|tb)\b/g, ' ').split(/\s+/).filter((w) => w && w.length > 0)
  const ours = new Set(words)
  return (title) => {
    const t = norm(title)
    if (JUNK.test(t)) return false
    for (const w of words) {
      if (w === p.brand.toLowerCase() && !t.includes(w)) continue // бренд в названии предложения может отсутствовать
      if (!new RegExp(`(^|[^a-zа-я0-9])${w.replace(/[+]/g, '\\+')}($|[^a-zа-я0-9])`).test(t)) return false
    }
    for (const v of VARIANTS) {
      if (ours.has(v)) continue
      const re = v === '+' ? /[a-z0-9]\+(\s|$)/ : new RegExp(`(^|[^a-zа-я0-9])${v}($|[^a-zа-я0-9])`)
      if (re.test(t)) return false
    }
    if (st) {
      const n = st.n
      const re = st.tb
        ? new RegExp(`(^|[^0-9])${n}\\s?(tb|тб)`)
        : new RegExp(`(^|[^0-9])${n}\\s?(gb|гб)|/\\s?${n}(\\s|$|[^0-9])|\\+\\s?${n}\\s?(gb|гб)?`)
      if (!re.test(t)) return false
    }
    return true
  }
}

const median = (a) => {
  const s = [...a].sort((x, y) => x - y)
  const m = s.length >> 1
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchMarket(query) {
  const url = `https://market.yandex.ru/search?text=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
      'Accept-Language': 'ru-RU,ru;q=0.9',
    },
  })
  const html = await res.text()
  if (/showcaptcha|SmartCaptcha/.test(res.url + html.slice(0, 3000))) return { captcha: true, url }
  const items = []
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const d = JSON.parse(m[1])
      if (d['@type'] !== 'ItemList') continue
      for (const el of d.itemListElement || []) {
        const it = el.item || {}
        const price = Number(it.offers?.price ?? it.offers?.lowPrice)
        if (it.name && price > 0) items.push({ name: it.name, price, url: it['@id'] || it.url })
      }
    } catch { /* не JSON */ }
  }
  return { items, url }
}

const only = process.argv[2] ? new Set(process.argv[2].split(',')) : null
const list = products.filter((p) => !only || only.has(p.id))
const out = []
for (const [i, p] of list.entries()) {
  const query = queryFor(p)
  let r
  try { r = await fetchMarket(query) } catch (e) { r = { error: String(e) } }
  if (r.captcha) {
    out.push({ id: p.id, name: p.name, query, status: 'captcha' })
    console.error(`${i + 1}/${list.length} ${p.id}: КАПЧА — останавливаюсь`)
    break
  }
  const ok = matcher(p)
  const matched = (r.items || []).filter((x) => ok(x.name))
  const prices = matched.map((x) => x.price)
  const med = prices.length ? median(prices) : null
  out.push({
    id: p.id, name: p.name, our: p.price, query, url: r.url,
    found: (r.items || []).length, matched: matched.length, median: med,
    min: prices.length ? Math.min(...prices) : null, max: prices.length ? Math.max(...prices) : null,
    offers: matched.slice(0, 8), status: r.error ? 'error' : matched.length >= 3 ? 'ok' : matched.length ? 'few' : 'none',
  })
  console.error(`${i + 1}/${list.length} ${p.id}: ${matched.length}/${(r.items || []).length} → ${med ?? '—'}`)
  await sleep(4000 + Math.random() * 3000)
}
process.stdout.write(JSON.stringify(out, null, 1))
