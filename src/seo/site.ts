/**
 * Единые константы сайта для SEO-слоя.
 * Используются рантайм-хуком, пререндером и генератором sitemap.
 */

export const SITE_URL = 'https://techagent.pro'
export const SITE_NAME = 'TechAgent'
export const LEGAL_NAME = 'ОсОО «ТехЭйджент»'

/** Единая цифра комиссии по всему сайту (совпадает с COMMISSION_RATE в utils/calculate.ts) */
export const COMMISSION_TEXT = '3%'

export const DEFAULT_TITLE = 'TechAgent — агентская закупка электроники для бизнеса'
export const DEFAULT_DESCRIPTION =
  'Агентская закупка электроники для розничных магазинов и ИП: Apple, Samsung, Xiaomi, Dyson и другие бренды. Комиссия 3%, доставка 5–7 дней, полный документооборот.'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`

export const CONTACT_EMAIL = 'info@techagent.pro'
export const PARTNERS_EMAIL = 'partners@techagent.pro'

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
