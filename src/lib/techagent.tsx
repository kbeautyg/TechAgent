/* Shared design helpers for the TechAgent visual system:
   icons, category styling, QR mock, price/status formatting. */
import { createElement, type ReactNode } from 'react'
import type { OrderStatus } from '../types'
import { calculateOrder, formatPrice } from '../utils/calculate'
import { getProductImage } from '../utils/productImages'
import type { Product } from '../data/products'

/* ---------- category visual system ---------- */
export interface CategoryMeta { label: string; accent: string; tint: string; glyph: string }
export const CATEGORY_META: Record<string, CategoryMeta> = {
  'Смартфоны': { label: 'Смартфоны', accent: '#1B44F5', tint: '#EDF0FF', glyph: 'phone' },
  'Ноутбуки': { label: 'Ноутбуки', accent: '#6D4BF5', tint: '#F1ECFF', glyph: 'laptop' },
  'Планшеты': { label: 'Планшеты', accent: '#1B8FF5', tint: '#E7F3FF', glyph: 'tablet' },
  'Наушники': { label: 'Наушники', accent: '#FB2C36', tint: '#FFECEC', glyph: 'headphones' },
  'Часы': { label: 'Часы', accent: '#E38A00', tint: '#FFF3E0', glyph: 'watch' },
  'Камеры и дроны': { label: 'Камеры и дроны', accent: '#0F9E6E', tint: '#E6F7F0', glyph: 'camera' },
  'Игровые консоли': { label: 'Игровые консоли', accent: '#E38A00', tint: '#FFF3E0', glyph: 'console' },
  'Для дома': { label: 'Для дома', accent: '#6D4BF5', tint: '#F1ECFF', glyph: 'home' },
  'Телевизоры': { label: 'Телевизоры', accent: '#1B8FF5', tint: '#E7F3FF', glyph: 'tv' },
  'Аксессуары': { label: 'Аксессуары', accent: '#8891A5', tint: '#F2F4FB', glyph: 'box' },
}
export const CATEGORY_LIST = Object.keys(CATEGORY_META)
const FALLBACK_META: CategoryMeta = { label: 'Товар', accent: '#8891A5', tint: '#F2F4FB', glyph: 'box' }
export const categoryMeta = (cat: string): CategoryMeta => CATEGORY_META[cat] || FALLBACK_META

/* ---------- order status visual system ---------- */
export const STATUS_META: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  CREATED: { label: 'Создан', color: '#5B647A', bg: '#F2F4FB' },
  PAID: { label: 'Оплачен', color: '#0B7A55', bg: '#E4F8F0' },
  PURCHASING: { label: 'Выкупаем товар', color: '#1B44F5', bg: '#EDF0FF' },
  PURCHASED: { label: 'Выкуплен', color: '#1B44F5', bg: '#EDF0FF' },
  SHIPPING: { label: 'Передан карго', color: '#B5680A', bg: '#FFF3E0' },
  DELIVERED: { label: 'Доставлен', color: '#0B7A55', bg: '#E4F8F0' },
  COMPLETED: { label: 'Завершён', color: '#0B7A55', bg: '#E4F8F0' },
  CANCELLED: { label: 'Отменён', color: '#C81E2C', bg: '#FFECEC' },
}
export { ORDER_STEPS as ORDER_TRACK_STEPS } from '../utils/status'

/* ---------- money / product helpers ---------- */
export { formatPrice as rub, formatDate, formatDateTime } from '../utils/calculate'
export const COMMISSION_RATE_LABEL = '3%'

export function decorateProduct(p: Product) {
  const meta = categoryMeta(p.category)
  const calc = calculateOrder(p.price, false)
  return {
    ...p,
    accent: meta.accent,
    tint: meta.tint,
    catLabel: meta.label,
    img: getProductImage(p.id, p.name, p.category),
    icon: <Icon name={meta.glyph} size={56} color={meta.accent} sw={1.5} />,
    priceStr: formatPrice(p.price),
    rateStr: COMMISSION_RATE_LABEL,
    commStr: formatPrice(calc.commission),
    totalStr: formatPrice(calc.totalCost),
    total: calc.totalCost,
  }
}
export type DecoratedProduct = ReturnType<typeof decorateProduct>

export function pluralizeItems(n: number): string {
  const t = n % 10, h = n % 100
  if (t === 1 && h !== 11) return n + ' товар'
  if (t >= 2 && t <= 4 && (h < 10 || h >= 20)) return n + ' товара'
  return n + ' товаров'
}

/* ---------- misc content ---------- */
export const HOW_STEPS = [
  { n: '01', t: 'Выбираете товар', d: 'В каталоге или присылаете ссылку на любой зарубежный магазин.' },
  { n: '02', t: 'Фиксируем цену', d: 'Показываем стоимость и комиссию агента сразу — без скрытых платежей.' },
  { n: '03', t: 'Оплата по СБП', d: 'Одна ссылка, платёж на расчётный счёт. Договор и чек — автоматически.' },
  { n: '04', t: 'Выкуп за рубежом', d: 'Агент покупает оригинал в стране и готовит к отправке в РФ.' },
  { n: '05', t: 'Доставка и выдача', d: 'Привозим, выдаём с чеком и гарантией. Статус — в кабинете.' },
]
export const FAQ_ITEMS = [
  { q: 'Почему это законно?', a: 'Мы работаем по агентскому договору (поручению): вы поручаете нам выкупить товар за рубежом, мы покупаем оригинал и передаём вам с полным пакетом документов. Это «белая» схема параллельного импорта.' },
  { q: 'Из чего складывается цена?', a: 'Стоимость товара за рубежом с учётом доставки и таможенных платежей плюс комиссия агента 3%. Больше ничего — итог виден сразу.' },
  { q: 'Как проходит оплата?', a: 'По ссылке через СБП на расчётный счёт. Платёж занимает секунды, чек приходит автоматически.' },
  { q: 'А если товара нет в каталоге?', a: 'Пришлите ссылку на любой зарубежный магазин в разделе «Новый заказ» — рассчитаем комиссию и выкупим.' },
  { q: 'Какие документы я получу?', a: 'Агентский отчёт, кассовый чек магазина, закрывающие документы для бухгалтерии и гарантийный талон.' },
]
export const BANKS = ['Сбербанк', 'Т-Банк', 'Альфа-Банк', 'ВТБ', 'Райффайзен', 'Озон Банк']
export const CALC_PRESETS = [{ label: 'iPhone 15 Pro', v: 105000 }, { label: 'MacBook Pro', v: 235000 }, { label: 'RTX 4090', v: 172000 }, { label: 'PS5 Pro', v: 79000 }]

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
  watch: [['rect', { x: 8, y: 2, width: 8, height: 4, rx: 1.4 }], ['rect', { x: 8, y: 18, width: 8, height: 4, rx: 1.4 }], ['circle', { cx: 12, cy: 12, r: 6.2 }], ['path', { d: 'M12 9.3V12l1.7 1.6' }]],
  camera: [['rect', { x: 2.5, y: 7, width: 19, height: 13, rx: 2.5 }], ['path', { d: 'M8.3 7l1.4-2.6h4.6L15.7 7' }], ['circle', { cx: 12, cy: 13.6, r: 4 }]],
  tv: [['rect', { x: 2.5, y: 5, width: 19, height: 12.5, rx: 2 }], ['path', { d: 'M8 20.5h8M12 17.5v3' }]],
  home: [['path', { d: 'M4 11 12 4l8 7' }], ['path', { d: 'M6 10v9.5h12V10' }], ['path', { d: 'M10 19.5v-6h4v6' }]],
  doc: [['path', { d: 'M6 3h8l4 4v14H6z' }], ['path', { d: 'M14 3v4h4M9 12h6M9 16h4' }]],
  shield: [['path', { d: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z' }], ['path', { d: 'M9 12l2 2 4-4' }]],
  grid: [['rect', { x: 3, y: 3, width: 8, height: 8, rx: 1.8 }], ['rect', { x: 13, y: 3, width: 8, height: 8, rx: 1.8 }], ['rect', { x: 3, y: 13, width: 8, height: 8, rx: 1.8 }], ['rect', { x: 13, y: 13, width: 8, height: 8, rx: 1.8 }]],
  coins: [['circle', { cx: 9, cy: 9, r: 6 }], ['path', { d: 'M13.5 6.2A6 6 0 1 1 6.2 13.5' }], ['path', { d: 'M9 6.5v5M6.8 9h4.4' }]],
  truck: [['path', { d: 'M2.5 6h11v9H2.5z' }], ['path', { d: 'M13.5 9.5h4l3 3v2.5h-7z' }], ['circle', { cx: 7, cy: 18, r: 1.8 }], ['circle', { cx: 17, cy: 18, r: 1.8 }]],
  globe: [['circle', { cx: 12, cy: 12, r: 9 }], ['path', { d: 'M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18' }]],
  bolt: [['path', { d: 'M12.5 2.5 4 14h6l-1.5 7.5L20 10h-6.5z' }]],
}
export function Icon({ name, size = 24, color = 'currentColor', sw = 1.7 }: { name: string; size?: number; color?: string; sw?: number }) {
  const parts = (GLYPHS[name] || GLYPHS.box).map((s, i) => createElement(s[0], { key: i, ...s[1] }))
  return createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' }, parts)
}

export function QrCode({ seedText = 'techagent' }: { seedText?: string }) {
  const N = 25, cell = 6, size = N * cell
  let seed = 0
  for (let i = 0; i < seedText.length; i++) seed = (seed * 31 + seedText.charCodeAt(i)) & 0x7fffffff
  seed = seed || 1337
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
