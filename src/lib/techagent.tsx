/* Core data, helpers, icons and the useTechAgent hook.
   Ported from the "TechAgent" design concept — the single source of app state. */
import { createElement, useRef, useState, type ReactNode } from 'react'

/* ---------- types ---------- */
export interface Product {
  id: string; brand: string; name: string; cat: string; catLabel: string;
  glyph: string; price: number; origin: string; spec: string; pop: number; hot?: boolean
}
export interface OrderRaw {
  id: string; pid?: string; custom?: boolean; title?: string; category?: string;
  price?: number; step: number; date: string; note: string
}
export interface ChatMsg { from: 'me' | 'agent'; name?: string; text: string; time: string }
export interface NoForm { link: string; category: string; price: number; note: string }
export interface PayCtx { title: string; price: number; orderId: string }

/* ---------- static data ---------- */
export const DATA: Product[] = [
  { id: 'iphone15pro', brand: 'Apple', name: 'iPhone 15 Pro 256 ГБ', cat: 'phone', catLabel: 'Смартфоны', glyph: 'phone', price: 105000, origin: 'ОАЭ · Дубай', spec: 'A17 Pro · титан · 6.1"', pop: 99, hot: true },
  { id: 's24ultra', brand: 'Samsung', name: 'Galaxy S24 Ultra 512 ГБ', cat: 'phone', catLabel: 'Смартфоны', glyph: 'phone', price: 118000, origin: 'Гонконг', spec: 'Snapdragon 8 Gen 3 · S Pen', pop: 92 },
  { id: 'ipadpro', brand: 'Apple', name: 'iPad Pro 11" M4 256 ГБ', cat: 'phone', catLabel: 'Планшеты', glyph: 'tablet', price: 99000, origin: 'США', spec: 'M4 · OLED · Wi-Fi', pop: 81 },
  { id: 'macbook14', brand: 'Apple', name: 'MacBook Pro 14" M3 Pro', cat: 'laptop', catLabel: 'Ноутбуки', glyph: 'laptop', price: 235000, origin: 'США', spec: 'M3 Pro · 18 ГБ · 512 ГБ', pop: 95, hot: true },
  { id: 'rogg16', brand: 'ASUS', name: 'ROG Zephyrus G16', cat: 'laptop', catLabel: 'Ноутбуки', glyph: 'laptop', price: 189000, origin: 'Германия', spec: 'Core Ultra 9 · RTX 4070', pop: 78 },
  { id: 'rtx4090', brand: 'NVIDIA', name: 'GeForce RTX 4090', cat: 'gpu', catLabel: 'Видеокарты', glyph: 'gpu', price: 172000, origin: 'США', spec: '24 ГБ GDDR6X · Founders', pop: 90, hot: true },
  { id: 'rtx4080', brand: 'NVIDIA', name: 'GeForce RTX 4080 SUPER', cat: 'gpu', catLabel: 'Видеокарты', glyph: 'gpu', price: 118000, origin: 'Гонконг', spec: '16 ГБ GDDR6X', pop: 74 },
  { id: 'ps5pro', brand: 'Sony', name: 'PlayStation 5 Pro', cat: 'console', catLabel: 'Консоли', glyph: 'console', price: 79000, origin: 'Япония · Токио', spec: '2 ТБ · 8K · без дисковода', pop: 96, hot: true },
  { id: 'xboxx', brand: 'Microsoft', name: 'Xbox Series X', cat: 'console', catLabel: 'Консоли', glyph: 'console', price: 62000, origin: 'США', spec: '1 ТБ · 4K 120 к/с', pop: 70 },
  { id: 'switcholed', brand: 'Nintendo', name: 'Switch OLED', cat: 'console', catLabel: 'Консоли', glyph: 'console', price: 34000, origin: 'Япония', spec: '7" OLED · 64 ГБ', pop: 68 },
  { id: 'airpodspro2', brand: 'Apple', name: 'AirPods Pro 2 USB-C', cat: 'audio', catLabel: 'Аудио', glyph: 'headphones', price: 22000, origin: 'ОАЭ', spec: 'ANC · USB-C · MagSafe', pop: 88 },
  { id: 'sonyxm5', brand: 'Sony', name: 'WH-1000XM5', cat: 'audio', catLabel: 'Аудио', glyph: 'headphones', price: 33000, origin: 'Япония', spec: 'ANC · 30 ч работы', pop: 79 },
  { id: 'boseqc', brand: 'Bose', name: 'QuietComfort Ultra', cat: 'audio', catLabel: 'Аудио', glyph: 'headphones', price: 39000, origin: 'США', spec: 'Immersive Audio', pop: 65 },
  { id: 'unifiudmpro', brand: 'Ubiquiti', name: 'UniFi Dream Machine Pro', cat: 'network', catLabel: 'Сеть', glyph: 'router', price: 61000, origin: 'США', spec: '10G · IDS/IPS · rack', pop: 72 },
  { id: 'ds923', brand: 'Synology', name: 'DiskStation DS923+', cat: 'network', catLabel: 'NAS', glyph: 'nas', price: 74000, origin: 'Германия', spec: '4 отсека · AMD Ryzen', pop: 60 },
  { id: 'ccr2004', brand: 'MikroTik', name: 'CCR2004-16G-2S+', cat: 'network', catLabel: 'Сеть', glyph: 'router', price: 58000, origin: 'Латвия', spec: '16×1G · 2×SFP+', pop: 55 },
]

export const CATS = [
  { key: 'all', label: 'Все' }, { key: 'phone', label: 'Смартфоны' }, { key: 'laptop', label: 'Ноутбуки' },
  { key: 'gpu', label: 'Видеокарты' }, { key: 'console', label: 'Консоли' }, { key: 'audio', label: 'Аудио' }, { key: 'network', label: 'Сеть' },
]
export const ACCENTS: Record<string, string> = { phone: '#1B44F5', laptop: '#6D4BF5', gpu: '#0F9E6E', console: '#E38A00', audio: '#FB2C36', network: '#1B8FF5' }
export const TINTS: Record<string, string> = { phone: '#EDF0FF', laptop: '#F1ECFF', gpu: '#E6F7F0', console: '#FFF3E0', audio: '#FFECEC', network: '#E7F3FF' }
export const GLYPH_OF: Record<string, string> = { phone: 'phone', laptop: 'laptop', gpu: 'gpu', console: 'console', audio: 'headphones', network: 'router' }

export const HOW_STEPS = [
  { n: '01', t: 'Выбираете товар', d: 'В каталоге или присылаете ссылку на любой зарубежный магазин.' },
  { n: '02', t: 'Фиксируем цену', d: 'Показываем стоимость и комиссию 2–3% сразу — без скрытых платежей.' },
  { n: '03', t: 'Оплата по СБП', d: 'Одна ссылка, платёж на расчётный счёт. Договор и чек — автоматически.' },
  { n: '04', t: 'Выкуп за рубежом', d: 'Агент покупает оригинал в стране и готовит к отправке в РФ.' },
  { n: '05', t: 'Доставка и выдача', d: 'Привозим, выдаём с чеком и гарантией. Статус — в кабинете.' },
]
export const FAQ_RAW = [
  { q: 'Почему это законно?', a: 'Мы работаем по агентскому договору (поручению): вы поручаете нам выкупить товар за рубежом, мы покупаем оригинал и передаём вам с полным пакетом документов. Это «белая» схема параллельного импорта.' },
  { q: 'Из чего складывается цена?', a: 'Стоимость товара за рубежом с учётом доставки и таможенных платежей плюс комиссия TechAgent 2–3%. Больше ничего — итог виден сразу.' },
  { q: 'Как проходит оплата?', a: 'По ссылке через СБП на наш расчётный счёт. Платёж занимает секунды, чек приходит автоматически.' },
  { q: 'А если товара нет в каталоге?', a: 'Пришлите ссылку на любой зарубежный магазин в разделе «Новый заказ» — рассчитаем комиссию и выкупим.' },
  { q: 'Какие документы я получу?', a: 'Агентский отчёт, кассовый чек магазина, закрывающие документы для бухгалтерии и гарантийный талон.' },
]
export const PROFILE = { ip: 'ИП Иванов Иван Иванович', inn: '772345678901', ogrnip: '321774600123456', account: '40802810500001234567', bank: 'АО «ТБанк»', bik: '044525974', email: 'ivan@shop.ru', phone: '+7 900 123-45-67', since: 'Партнёр с марта 2025' }
export const BANKS = ['Сбербанк', 'Т-Банк', 'Альфа-Банк', 'ВТБ', 'Райффайзен', 'Озон Банк']
export const PRESET_LIST = [{ label: 'iPhone 15 Pro', v: 105000 }, { label: 'MacBook Pro', v: 235000 }, { label: 'RTX 4090', v: 172000 }, { label: 'PS5 Pro', v: 79000 }]
export const STEP_NAMES = ['Оплата', 'Выкуп', 'Доставка', 'Выдача']

/* ---------- helpers ---------- */
export const rub = (n: number): string => Math.round(n || 0).toLocaleString('ru-RU') + ' ₽'
export function quote(price: number) {
  price = price || 0
  const rate = price >= 800000 ? 2 : price >= 300000 ? 2.5 : 3
  const commission = Math.round(price * rate / 100)
  return { rate, commission, total: price + commission, rateStr: (rate % 1 === 0 ? String(rate) : rate.toFixed(1)) + '%' }
}
const now = (): string => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') }
function plural(n: number): string {
  const t = n % 10, h = n % 100
  if (t === 1 && h !== 11) return ' товар'
  if (t >= 2 && t <= 4 && (h < 10 || h >= 20)) return ' товара'
  return ' товаров'
}

/* ---------- icons ---------- */
type IconPart = [string, Record<string, number | string>]
const GLYPHS: Record<string, IconPart[]> = {
  phone: [['rect', { x: 6, y: 2, width: 12, height: 20, rx: 3 }], ['line', { x1: 10, y1: 18.5, x2: 14, y2: 18.5 }]],
  tablet: [['rect', { x: 3.5, y: 3, width: 17, height: 18, rx: 2.6 }], ['line', { x1: 10, y1: 18, x2: 14, y2: 18 }]],
  laptop: [['rect', { x: 4, y: 5, width: 16, height: 10.5, rx: 1.6 }], ['path', { d: 'M2.4 19h19.2l-1.2-2.6H3.6z' }]],
  gpu: [['rect', { x: 3, y: 6, width: 18, height: 11, rx: 2 }], ['circle', { cx: 9, cy: 11.5, r: 2.4 }], ['circle', { cx: 15, cy: 11.5, r: 2.4 }], ['path', { d: 'M6.5 17v3M17.5 17v3' }]],
  console: [['rect', { x: 3, y: 8, width: 18, height: 9, rx: 4.5 }], ['path', { d: 'M7.5 12.5h3M9 11v3' }], ['circle', { cx: 15.5, cy: 11.6, r: 1 }], ['circle', { cx: 17.4, cy: 13.6, r: 1 }]],
  headphones: [['path', { d: 'M4 13.5v-1.5a8 8 0 0 1 16 0v1.5' }], ['rect', { x: 2.5, y: 13, width: 4, height: 6.5, rx: 1.8 }], ['rect', { x: 17.5, y: 13, width: 4, height: 6.5, rx: 1.8 }]],
  router: [['rect', { x: 3, y: 13, width: 18, height: 6.5, rx: 2 }], ['path', { d: 'M7 16.2h.01M11 16.2h4' }], ['path', { d: 'M8 13V9.5M16 13V9.5' }], ['path', { d: 'M9.5 6.5a4 4 0 0 1 5 0' }]],
  nas: [['rect', { x: 5, y: 3, width: 14, height: 18, rx: 2.2 }], ['path', { d: 'M9 7.5h.01M9 11.5h.01M9 15.5h.01' }], ['path', { d: 'M12 7.5h4M12 11.5h4M12 15.5h4' }]],
  box: [['path', { d: 'M12 3l8 4.6v8.8L12 21l-8-4.6V7.6z' }], ['path', { d: 'M4.2 7.8 12 12l7.8-4.2M12 12v9' }]],
  plus: [['path', { d: 'M12 5v14M5 12h14' }]],
  chat: [['path', { d: 'M4 5.5h16v11H8l-4 3.5z' }], ['path', { d: 'M8 10h8M8 13h5' }]],
  user: [['circle', { cx: 12, cy: 8, r: 3.4 }], ['path', { d: 'M5 20a7 7 0 0 1 14 0' }]],
}
export function Icon({ name, size = 24, color = 'currentColor', sw = 1.7 }: { name: string; size?: number; color?: string; sw?: number }) {
  const parts = (GLYPHS[name] || GLYPHS.box).map((s, i) => createElement(s[0], { key: i, ...s[1] }))
  return createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' }, parts)
}

export function QrCode() {
  const N = 25, cell = 6, size = N * cell
  let seed = 1337
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
  const inBox = (x: number, y: number, bx: number, by: number) => x >= bx && x < bx + 7 && y >= by && y < by + 7
  const finderZone = (x: number, y: number) => inBox(x, y, 0, 0) || inBox(x, y, N - 7, 0) || inBox(x, y, 0, N - 7)
  const els: ReactNode[] = []
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (finderZone(x, y)) continue
    if (rnd() > 0.55) els.push(createElement('rect', { key: 'm' + x + '-' + y, x: x * cell + 0.6, y: y * cell + 0.6, width: cell - 1.2, height: cell - 1.2, rx: 1.2, fill: '#0B1020' }))
  }
  const finder = (bx: number, by: number) => [
    createElement('rect', { key: 'a' + bx + by, x: bx * cell, y: by * cell, width: 7 * cell, height: 7 * cell, rx: cell, fill: '#0B1020' }),
    createElement('rect', { key: 'b' + bx + by, x: (bx + 1) * cell, y: (by + 1) * cell, width: 5 * cell, height: 5 * cell, rx: cell * 0.7, fill: '#fff' }),
    createElement('rect', { key: 'c' + bx + by, x: (bx + 2) * cell, y: (by + 2) * cell, width: 3 * cell, height: 3 * cell, rx: cell * 0.5, fill: '#1B44F5' }),
  ]
  const all = els.concat(finder(0, 0), finder(N - 7, 0), finder(0, N - 7))
  return createElement('svg', { width: '100%', height: '100%', viewBox: '0 0 ' + size + ' ' + size, style: { display: 'block' } }, all)
}

const find = (id: string): Product => DATA.find((x) => x.id === id) || DATA[0]

function decorate(p: Product) {
  const q = quote(p.price)
  const acc = ACCENTS[p.cat] || '#1B44F5'
  return {
    ...p, accent: acc, tint: TINTS[p.cat] || '#EDF0FF', priceStr: rub(p.price), rateStr: q.rateStr,
    commStr: rub(q.commission), commission: q.commission, totalStr: rub(q.total), total: q.total,
    icon: <Icon name={p.glyph} size={62} color={acc} sw={1.5} />,
  }
}
export type DecoratedProduct = ReturnType<typeof decorate>

function decorateOrder(o: OrderRaw) {
  let title: string, price: number, catLabel: string, glyph: string, accent: string
  if (o.custom) { title = o.title || ''; price = o.price || 0; catLabel = o.category || 'Заявка'; glyph = 'box'; accent = '#6D4BF5' }
  else { const p = find(o.pid || ''); title = p.brand + ' ' + p.name; price = p.price; catLabel = p.catLabel; glyph = p.glyph; accent = ACCENTS[p.cat] }
  const q = quote(price), n = STEP_NAMES.length, idx = o.step
  let pct: number
  if (idx <= -1) pct = 0; else if (idx >= n) pct = 100; else pct = (idx / (n - 1)) * 100
  const tracker = STEP_NAMES.map((s, i) => {
    const stt = idx <= -1 ? 'todo' : (i < idx ? 'done' : (i === idx ? 'active' : 'todo'))
    const done = stt === 'done' || stt === 'active'
    return { label: s, color: done ? (idx >= 3 ? '#12B981' : '#1B44F5') : '#AEB4C4', weight: done ? 600 : 500 }
  })
  return {
    ...o, title, catLabel, glyph, accent, tint: TINTS[o.custom ? 'laptop' : find(o.pid || '').cat],
    icon: <Icon name={glyph} size={26} color={accent} sw={1.7} />,
    priceStr: rub(price), totalStr: rub(q.total), rateStr: q.rateStr, commStr: rub(q.commission), total: q.total,
    tracker, progressPct: pct + '%',
    statusLabel: idx <= -1 ? 'Ожидает оплаты' : (idx >= n ? 'Получен' : STEP_NAMES[idx]),
    statusColor: idx <= -1 ? '#FB2C36' : (idx >= 3 ? '#12B981' : '#1B44F5'),
    statusBg: idx <= -1 ? '#FFECEC' : (idx >= 3 ? '#E4F8F0' : '#EDF0FF'),
    awaiting: idx <= -1,
  }
}
export type DecoratedOrder = ReturnType<typeof decorateOrder>

const DEFAULT_ORDERS: OrderRaw[] = [
  { id: 'TA-2041', pid: 'macbook14', step: 2, date: '2 июля', note: 'Прибыл в сортировочный центр · Москва' },
  { id: 'TA-2038', pid: 'rtx4090', step: 3, date: '28 июня', note: 'Готов к выдаче · ПВЗ Тверская, 7' },
  { id: 'TA-2035', pid: 'ps5pro', step: 1, date: '4 июля', note: 'Агент выкупает товар · Токио' },
  { id: 'TA-2044', pid: 'iphone15pro', step: -1, date: 'сегодня', note: 'Ожидает оплаты по СБП' },
]
const DEFAULT_CHAT: ChatMsg[] = [
  { from: 'agent', name: 'Мария · ваш агент', text: 'Здравствуйте! Заказ TA-2041 (MacBook Pro 14") выкуплен в Дубае — оригинал, запечатан.', time: '11:02' },
  { from: 'agent', text: 'Фото коробки и чек магазина приложил к карточке заказа.', time: '11:03' },
  { from: 'me', text: 'Отлично! Когда ждать доставку в Москву?', time: '11:20' },
  { from: 'agent', text: 'Вылет сегодня вечером. В РФ будет через 3–4 дня, трек добавлю в заказ.', time: '11:22' },
]

/* ---------- the hook ---------- */
export function useTechAgent() {
  const [route, setRoute] = useState('landing')
  const [calcPrice, setCalcPrice] = useState(105000)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [productId, setProductId] = useState('iphone15pro')
  const [chatDraft, setChatDraft] = useState('')
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>(DEFAULT_CHAT)
  const [payStep, setPayStep] = useState('summary')
  const [payMethod, setPayMethod] = useState('Т-Банк')
  const [payCtx, setPayCtx] = useState<PayCtx>({ title: 'Apple iPhone 15 Pro 256 ГБ', price: 105000, orderId: 'TA-2044' })
  const [faqOpen, setFaqOpen] = useState(0)
  const [noForm, setNoForm] = useState<NoForm>({ link: '', category: 'Смартфоны', price: 90000, note: '' })
  const [toast, setToast] = useState('')
  const [orders, setOrders] = useState<OrderRaw[]>(DEFAULT_ORDERS)
  const timers = useRef<{ chat?: number; pay?: number; toast?: number }>({})

  const scrollTop = () => { try { window.scrollTo(0, 0) } catch { /* noop */ } }
  const go = (r: string) => { setRoute(r); scrollTop() }
  const onNav = (e: React.MouseEvent<HTMLElement>) => { const r = e.currentTarget.dataset.route; if (r) go(r) }
  const onProductClick = (e: React.MouseEvent<HTMLElement>) => { const id = e.currentTarget.dataset.id; if (id) { setProductId(id); setRoute('product'); scrollTop() } }
  const onCatClick = (e: React.MouseEvent<HTMLElement>) => { const c = e.currentTarget.dataset.cat; if (c) setCategory(c) }
  const onCatTile = (e: React.MouseEvent<HTMLElement>) => { const c = e.currentTarget.dataset.cat; if (c) { setCategory(c); setRoute('catalog'); scrollTop() } }
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const onSortSel = (e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)
  const setCalc = (v: number) => setCalcPrice(Math.max(5000, Math.min(3000000, v)))
  const calcDec = () => setCalc(calcPrice - 5000)
  const calcInc = () => setCalc(calcPrice + 5000)
  const onPreset = (e: React.MouseEvent<HTMLElement>) => { const v = Number(e.currentTarget.dataset.v); if (v) setCalc(v) }
  const onFaq = (e: React.MouseEvent<HTMLElement>) => { const i = Number(e.currentTarget.dataset.i); setFaqOpen((cur) => (cur === i ? -1 : i)) }
  const onChat = (e: React.ChangeEvent<HTMLInputElement>) => setChatDraft(e.target.value)
  const sendChat = () => {
    const t = (chatDraft || '').trim(); if (!t) return
    setChatMsgs((m) => m.concat([{ from: 'me', text: t, time: now() }])); setChatDraft('')
    window.clearTimeout(timers.current.chat)
    timers.current.chat = window.setTimeout(() => {
      setChatMsgs((m) => m.concat([{ from: 'agent', text: 'Принято! Обновил информацию по заказу — детали в карточке.', time: now() }]))
    }, 1300)
  }
  const onChatKey = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat() } }
  const startPay = (ctx: PayCtx) => { setPayCtx(ctx); setPayStep('summary'); setRoute('pay'); scrollTop() }
  const buy = () => { const s = find(productId); startPay({ title: s.brand + ' ' + s.name, price: s.price, orderId: 'TA-2047' }) }
  const onPayOrder = (e: React.MouseEvent<HTMLElement>) => {
    const oid = e.currentTarget.dataset.oid; const o = orders.find((x) => x.id === oid); if (!o) return
    const d = decorateOrder(o); startPay({ title: d.title, price: o.custom ? (o.price || 0) : find(o.pid || '').price, orderId: o.id })
  }
  const onBank = (e: React.MouseEvent<HTMLElement>) => { const b = e.currentTarget.dataset.bank; if (b) setPayMethod(b) }
  const payNow = () => { setPayStep('processing'); window.clearTimeout(timers.current.pay); timers.current.pay = window.setTimeout(() => setPayStep('done'), 1800) }
  const onNoLink = (e: React.ChangeEvent<HTMLInputElement>) => { const v = e.target.value; setNoForm((f) => ({ ...f, link: v })) }
  const onNoCat = (e: React.ChangeEvent<HTMLSelectElement>) => { const v = e.target.value; setNoForm((f) => ({ ...f, category: v })) }
  const onNoPrice = (e: React.ChangeEvent<HTMLInputElement>) => { const v = Number(e.target.value) || 0; setNoForm((f) => ({ ...f, price: v })) }
  const onNoNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => { const v = e.target.value; setNoForm((f) => ({ ...f, note: v })) }
  const submitOrder = () => {
    const f = noForm
    const title = f.link ? ('Заявка: ' + (f.link.length > 36 ? f.link.slice(0, 36) + '…' : f.link)) : ('Новый товар · ' + f.category)
    setOrders((cur) => [{ id: 'TA-2046', custom: true, title, category: f.category, price: f.price, step: -1, date: 'сегодня', note: 'Новая заявка · агент подтвердит в чате' }, ...cur])
    setRoute('orders'); scrollTop(); setToast('Заявка создана — агент свяжется в чате')
    window.clearTimeout(timers.current.toast); timers.current.toast = window.setTimeout(() => setToast(''), 3400)
  }
  const resetFilters = () => { setCategory('all'); setSearch('') }

  /* derived (mirrors the concept's renderVals) */
  const isCab = route === 'orders' || route === 'new' || route === 'chat' || route === 'profile'
  const cq = quote(calcPrice)
  const chips = CATS.map((c) => { const a = c.key === category; return { key: c.key, label: c.label, bg: a ? '#1B44F5' : '#FFFFFF', fg: a ? '#FFFFFF' : '#3A4256', bd: a ? '#1B44F5' : '#E7E9F2' } })
  const catTiles = CATS.filter((c) => c.key !== 'all').map((c) => { const acc = ACCENTS[c.key]; const cnt = DATA.filter((p) => p.cat === c.key).length; return { key: c.key, label: c.label, accent: acc, tint: TINTS[c.key], count: cnt + ' поз.', icon: <Icon name={GLYPH_OF[c.key]} size={26} color={acc} sw={1.7} /> } })
  let list = DATA.filter((p) => category === 'all' || p.cat === category)
  const s = search.trim().toLowerCase()
  if (s) list = list.filter((p) => (p.brand + ' ' + p.name + ' ' + p.catLabel).toLowerCase().indexOf(s) >= 0)
  if (sort === 'priceAsc') list = list.slice().sort((a, b) => a.price - b.price)
  else if (sort === 'priceDesc') list = list.slice().sort((a, b) => b.price - a.price)
  else list = list.slice().sort((a, b) => b.pop - a.pop)
  const filtered = list.map(decorate)
  const popular = DATA.slice().sort((a, b) => b.pop - a.pop).slice(0, 4).map(decorate)
  const selected = decorate(find(productId))
  const ordersDec = orders.map(decorateOrder)
  const chatDec = chatMsgs.map((m) => ({ text: m.text, time: m.time, name: m.name || (m.from === 'agent' ? 'Мария · агент' : 'Вы'), bg: m.from === 'me' ? '#1B44F5' : '#FFFFFF', fg: m.from === 'me' ? '#FFFFFF' : '#0B1020', bd: m.from === 'me' ? '#1B44F5' : '#EAECF4', align: m.from === 'me' ? 'flex-end' : 'flex-start', agent: m.from === 'agent' }))
  const nq = quote(noForm.price || 0)
  const banks = BANKS.map((b) => { const a = b === payMethod; return { name: b, active: a, bg: a ? '#EDF0FF' : '#FFFFFF', bd: a ? '#1B44F5' : '#E7E9F2', ring: a ? '#1B44F5' : '#D3D8E8' } })
  const pq = quote(payCtx.price || 0)
  const faqItems = FAQ_RAW.map((f, i) => ({ q: f.q, a: f.a, i, open: i === faqOpen, rot: i === faqOpen ? '45deg' : '0deg', bd: i === faqOpen ? '#D6DEFF' : '#E7E9F2' }))
  const presets = PRESET_LIST.map((p) => { const a = p.v === calcPrice; return { label: p.label, v: p.v, bg: a ? '#1B44F5' : '#F2F4FB', fg: a ? '#FFFFFF' : '#3A4256' } })
  const cabTabs = [{ key: 'orders', label: 'Заказы', g: 'box' }, { key: 'new', label: 'Новый заказ', g: 'plus' }, { key: 'chat', label: 'Чат', g: 'chat' }, { key: 'profile', label: 'Профиль', g: 'user' }].map((t) => { const a = route === t.key; return { key: t.key, label: t.label, bg: a ? '#0B1020' : '#FFFFFF', fg: a ? '#FFFFFF' : '#3A4256', bd: a ? '#0B1020' : '#E7E9F2', icon: <Icon name={t.g} size={17} color={a ? '#FFFFFF' : '#8891A5'} sw={1.8} /> } })

  return {
    route, isLanding: route === 'landing', isCatalog: route === 'catalog', isProduct: route === 'product', isHow: route === 'how', isPay: route === 'pay',
    isCabinet: isCab, isOrders: route === 'orders', isNew: route === 'new', isChat: route === 'chat', isProfile: route === 'profile',
    showFooter: route === 'landing' || route === 'catalog' || route === 'product' || route === 'how',
    toast,
    onNav, onProductClick, onCatClick, onCatTile, go,
    calc: { price: calcPrice, priceStr: rub(calcPrice), rateStr: cq.rateStr, commStr: rub(cq.commission), totalStr: rub(cq.total) },
    calcDec, calcInc, onPreset, presets,
    chips, catTiles, filtered, filteredCount: filtered.length + plural(filtered.length), popular, howSteps: HOW_STEPS,
    category, search, sort, onSearch, onSortSel,
    selected, buy, noResults: filtered.length === 0, resetFilters,
    faqItems, onFaq,
    orders: ordersDec, onPayOrder,
    chatMsgs: chatDec, chatDraft, onChat, onChatKey, sendChat,
    profile: PROFILE, cabTabs,
    noForm: { ...noForm, priceStr: rub(noForm.price), rateStr: nq.rateStr, commStr: rub(nq.commission), totalStr: rub(nq.total) },
    onNoLink, onNoCat, onNoPrice, onNoNote, submitOrder,
    pay: { title: payCtx.title, orderId: payCtx.orderId, priceStr: rub(payCtx.price), rateStr: pq.rateStr, commStr: rub(pq.commission), totalStr: rub(pq.total), step: payStep, isSummary: payStep === 'summary', isProcessing: payStep === 'processing', isDone: payStep === 'done' },
    banks, onBank, payNow,
    qr: <QrCode />,
  }
}

export type AppCtx = ReturnType<typeof useTechAgent>
