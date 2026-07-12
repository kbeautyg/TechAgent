/**
 * Рантайм-применение SEO-меты при SPA-навигации.
 * Пререндер отдаёт краулерам готовый HTML; этот модуль поддерживает
 * актуальность title/canonical/OG при переходах внутри приложения.
 */
import type { PageMeta } from './meta'
import { SITE_NAME } from './site'

const MANAGED_ATTR = 'data-seo'

function upsertMeta(selector: string, create: () => HTMLElement, content: string): void {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    el.setAttribute(MANAGED_ATTR, '1')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertNamedMeta(name: string, content: string): void {
  upsertMeta(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('name', name)
    return el
  }, content)
}

function upsertPropertyMeta(property: string, content: string): void {
  upsertMeta(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('property', property)
    return el
  }, content)
}

export function applyMeta(meta: PageMeta): void {
  document.title = meta.title

  upsertNamedMeta('description', meta.description)

  /* robots: выставляем только когда нужен noindex, иначе убираем управляемый тег */
  const robotsEl = document.head.querySelector('meta[name="robots"]')
  if (meta.robots) {
    upsertNamedMeta('robots', meta.robots)
  } else if (robotsEl?.getAttribute(MANAGED_ATTR)) {
    robotsEl.remove()
  }

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', meta.canonical)

  upsertPropertyMeta('og:type', meta.ogType)
  upsertPropertyMeta('og:site_name', SITE_NAME)
  upsertPropertyMeta('og:locale', 'ru_RU')
  upsertPropertyMeta('og:title', meta.title)
  upsertPropertyMeta('og:description', meta.description)
  upsertPropertyMeta('og:url', meta.canonical)
  upsertPropertyMeta('og:image', meta.ogImage)
  upsertNamedMeta('twitter:card', 'summary_large_image')
  upsertNamedMeta('twitter:title', meta.title)
  upsertNamedMeta('twitter:description', meta.description)
  upsertNamedMeta('twitter:image', meta.ogImage)

  /* JSON-LD: заменяем управляемые скрипты целиком */
  document.head.querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}]`).forEach((el) => el.remove())
  for (const data of meta.jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(MANAGED_ATTR, '1')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}
