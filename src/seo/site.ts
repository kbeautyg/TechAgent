/**
 * Единые константы сайта для SEO-слоя.
 * Используются рантайм-хуком, пререндером и генератором sitemap.
 */

export const SITE_URL = 'https://techagent.pro'
export const SITE_NAME = 'TechAgent'
export const LEGAL_NAME = 'ОсОО\u00A0«ТехЭйджент»'

/** Позиционирование сайта — одно на title, описание, OG и index.html */
export const DEFAULT_TITLE = 'TechAgent — электроника с получением в пунктах выдачи партнёров'
export const DEFAULT_DESCRIPTION =
  'Смартфоны, ноутбуки, планшеты и техника Apple, Samsung, Xiaomi, Dyson. Продавец — ОсОО «ТехЭйджент», оплата через СБП, получение в пункте выдачи партнёра.'

/** Публичная оферта купли-продажи для покупателей */
export const SALE_OFFER_PATH = '/legal/sale-offer'

/** Срок доставки — единственная цифра, которая уже была на сайте; других сроков не писать */
export const DELIVERY_TERM = 'ориентировочно 5–7\u00A0рабочих дней с момента выкупа у поставщика'

/** Списка пунктов выдачи на сайте нет: у каждого партнёра свой пункт, адрес — на странице оплаты */
export const PICKUP_POINTS = 'адрес пункта указан на странице оплаты'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`

export const CONTACT_EMAIL = 'info@techagent.pro'
export const PARTNERS_EMAIL = 'partners@techagent.pro'
export const SUPPORT_EMAIL = 'help@techagent.pro'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Обрезает описание до безопасной для сниппета длины, не разрывая слова */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/** Русское склонение: pluralRu(202, ['товар', 'товара', 'товаров']) → «товара» */
export function pluralRu(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return forms[2]
  if (last > 1 && last < 5) return forms[1]
  if (last === 1) return forms[0]
  return forms[2]
}
