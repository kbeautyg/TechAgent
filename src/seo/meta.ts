/**
 * Центральный SEO-резолвер: по pathname возвращает title/description/canonical/OG/JSON-LD.
 * Используется тремя потребителями:
 *  1) рантайм-хук (SPA-навигация) — src/seo/dom.ts;
 *  2) пререндер (scripts/prerender.mjs через entry-server);
 *  3) генератор sitemap (scripts/generate-sitemap.mjs).
 */
import { products, type Product } from '../data/products'
import { getProductImage } from '../utils/productImages'
import { translateProductName } from '../utils/translate'
import { faqData } from '../data/faq'
import { blogPosts, getPostBySlug } from '../data/blog'
import { categoryLandings, getCategoryBySlug, type CategoryLanding } from './categories'
import {
  SITE_URL, SITE_NAME, LEGAL_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE, CONTACT_EMAIL, PARTNERS_EMAIL, absoluteUrl, clampDescription, pluralRu,
} from './site'

export interface PageMeta {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article' | 'product'
  robots?: string
  jsonLd: object[]
}

/* ────────────────────────── JSON-LD builders ────────────────────────── */

function organizationLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Бишкек',
      addressCountry: 'KG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        availableLanguage: ['Russian'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: PARTNERS_EMAIL,
        availableLanguage: ['Russian'],
      },
    ],
  }
}

function websiteLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ru',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/catalog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

interface Crumb {
  name: string
  path?: string
}

function breadcrumbLd(crumbs: Crumb[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absoluteUrl(c.path) } : {}),
    })),
  }
}

function faqLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

function productLd(product: Product): object {
  const name = translateProductName(product.name)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    sku: product.id,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    description: clampDescription(product.description, 300),
    image: absoluteUrl(getProductImage(product.id, product.name, product.category)),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/catalog/${product.id}`),
      price: product.price,
      priceCurrency: 'RUB',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }
}

function categoryItemListLd(landing: CategoryLanding, items: Product[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: landing.h1,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: translateProductName(p.name),
      url: absoluteUrl(`/catalog/${p.id}`),
    })),
  }
}

function articleLd(slug: string): object | null {
  const post = getPostBySlug(slug)
  if (!post) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    inLanguage: 'ru',
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: DEFAULT_OG_IMAGE,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

/* ────────────────────────── resolver ────────────────────────── */

const NOINDEX = 'noindex, nofollow'

function baseMeta(overrides: Partial<PageMeta> & { title: string; description: string; canonical: string }): PageMeta {
  return {
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd: [],
    ...overrides,
  }
}

const legalDocMeta: Record<string, { title: string; description: string }> = {
  offer: {
    title: 'Публичная оферта — агентский договор | TechAgent',
    description: 'Публичная оферта TechAgent: условия агентского договора на закупку электроники, вознаграждение агента 3%, порядок расчётов и ответственность сторон.',
  },
  privacy: {
    title: 'Политика конфиденциальности | TechAgent',
    description: 'Политика конфиденциальности TechAgent: какие данные мы обрабатываем, как храним и защищаем персональные данные партнёров.',
  },
  terms: {
    title: 'Пользовательское соглашение | TechAgent',
    description: 'Пользовательское соглашение платформы TechAgent: правила использования личного кабинета и сервиса агентской закупки.',
  },
  contract: {
    title: 'Типовой агентский договор | TechAgent',
    description: 'Типовой агентский договор TechAgent для партнёров: предмет, вознаграждение 3%, отчётность агента и порядок поставки.',
  },
}

/** Главный резолвер: путь без query-параметров → мета страницы */
export function resolveMeta(pathname: string): PageMeta {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (path === '/') {
    return baseMeta({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonical: SITE_URL + '/',
      jsonLd: [organizationLd(), websiteLd(), faqLd()],
    })
  }

  if (path === '/about') {
    return baseMeta({
      title: 'О платформе TechAgent — как устроена агентская закупка электроники',
      description:
        'TechAgent — B2B-платформа агентской закупки электроники: роли агента и партнёра, юридическая модель по главе 52 ГК РФ, комиссия 3%, реквизиты компании.',
      canonical: `${SITE_URL}/about`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'О платформе' }])],
    })
  }

  if (path === '/how-it-works') {
    return baseMeta({
      title: 'Как работает агентская закупка электроники — 4 шага | TechAgent',
      description:
        'Пошагово: как магазин заказывает электронику через TechAgent — создание заказа, оплата клиентом по ссылке, выкуп и доставка за 5–7 дней. Комиссия 3%.',
      canonical: `${SITE_URL}/how-it-works`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Как это работает' }])],
    })
  }

  if (path === '/catalog') {
    return baseMeta({
      title: `Каталог электроники для бизнеса — ${products.length} ${pluralRu(products.length, ['товар', 'товара', 'товаров'])} по агентской схеме | TechAgent`,
      description:
        'Каталог TechAgent: смартфоны, ноутбуки, планшеты, наушники и техника для дома. Закупка для бизнеса по агентской схеме с комиссией 3% и доставкой 5–7 дней.',
      canonical: `${SITE_URL}/catalog`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Каталог' }])],
    })
  }

  if (path === '/calculator') {
    return baseMeta({
      title: 'Калькулятор стоимости агентской закупки — комиссия 3% | TechAgent',
      description:
        'Рассчитайте итоговую стоимость закупки электроники через TechAgent: цена товара + комиссия агента 3%. Сумма фиксируется до оплаты.',
      canonical: `${SITE_URL}/calculator`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Калькулятор' }])],
    })
  }

  if (path === '/blog') {
    return baseMeta({
      title: 'Блог TechAgent — агентская закупка электроники для бизнеса',
      description:
        'Статьи TechAgent: как работает агентская схема, документы и налоги для ИП, сравнение агента и самостоятельного ввоза электроники.',
      canonical: `${SITE_URL}/blog`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Блог' }])],
    })
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const post = getPostBySlug(blogMatch[1])
    if (post) {
      const ld = articleLd(post.slug)
      return baseMeta({
        title: `${post.title} | TechAgent`,
        description: post.description,
        canonical: `${SITE_URL}/blog/${post.slug}`,
        ogType: 'article',
        jsonLd: [
          organizationLd(),
          ...(ld ? [ld] : []),
          breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Блог', path: '/blog' }, { name: post.title }]),
        ],
      })
    }
  }

  if (path === '/legal') {
    return baseMeta({
      title: 'Правовая информация — документы платформы | TechAgent',
      description:
        'Юридические документы TechAgent: публичная оферта, политика конфиденциальности, пользовательское соглашение и типовой агентский договор.',
      canonical: `${SITE_URL}/legal`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Документы' }])],
    })
  }

  const legalMatch = path.match(/^\/legal\/([^/]+)$/)
  if (legalMatch) {
    const doc = legalDocMeta[legalMatch[1].toLowerCase()]
    if (doc) {
      return baseMeta({
        title: doc.title,
        description: doc.description,
        canonical: `${SITE_URL}/legal/${legalMatch[1].toLowerCase()}`,
        jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Документы', path: '/legal' }, { name: doc.title.split(' | ')[0] }])],
      })
    }
  }

  const catalogChild = path.match(/^\/catalog\/([^/]+)$/)
  if (catalogChild) {
    const landing = getCategoryBySlug(catalogChild[1])
    if (landing) {
      const items = products.filter((p) => p.category === landing.category)
      return baseMeta({
        title: landing.title,
        description: landing.description,
        canonical: `${SITE_URL}/catalog/${landing.slug}`,
        jsonLd: [
          organizationLd(),
          categoryItemListLd(landing, items),
          breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Каталог', path: '/catalog' }, { name: landing.category }]),
        ],
      })
    }

    const product = products.find((p) => p.id === catalogChild[1])
    if (product) {
      const name = translateProductName(product.name)
      return baseMeta({
        title: `${name} для бизнеса — купить по агентской схеме | TechAgent`,
        description: clampDescription(
          `${name}: закупка для бизнеса по агентской схеме с комиссией 3%. ${product.description}`,
        ),
        canonical: `${SITE_URL}/catalog/${product.id}`,
        ogImage: absoluteUrl(getProductImage(product.id, product.name, product.category)),
        ogType: 'product',
        jsonLd: [
          organizationLd(),
          productLd(product),
          breadcrumbLd([
            { name: 'Главная', path: '/' },
            { name: 'Каталог', path: '/catalog' },
            { name: product.category, path: categoryPathByName(product.category) },
            { name },
          ]),
        ],
      })
    }
  }

  /* Служебные страницы: не индексируем */
  if (path === '/login') {
    return baseMeta({
      title: 'Вход в личный кабинет | TechAgent',
      description: 'Вход в личный кабинет партнёра TechAgent.',
      canonical: `${SITE_URL}/login`,
      robots: NOINDEX,
    })
  }
  if (path === '/register') {
    return baseMeta({
      title: 'Регистрация партнёра | TechAgent',
      description: 'Регистрация партнёра TechAgent: создайте аккаунт за 2 минуты — нужен только ИНН.',
      canonical: `${SITE_URL}/register`,
      robots: NOINDEX,
    })
  }
  if (path.startsWith('/dashboard') || path.startsWith('/admin') || path.startsWith('/pay/')) {
    return baseMeta({
      title: 'Личный кабинет | TechAgent',
      description: 'Личный кабинет партнёра TechAgent.',
      canonical: SITE_URL + path,
      robots: NOINDEX,
    })
  }

  /* 404 и всё неизвестное */
  return baseMeta({
    title: 'Страница не найдена | TechAgent',
    description: DEFAULT_DESCRIPTION,
    canonical: SITE_URL + path,
    robots: NOINDEX,
  })
}

function categoryPathByName(category: string): string | undefined {
  const landing = categoryLandings.find((c) => c.category === category)
  return landing ? `/catalog/${landing.slug}` : '/catalog'
}

/* ────────────────────────── head-теги для пререндера ────────────────────────── */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function jsonLdScript(data: object): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/** Полный блок head-тегов страницы (для вставки пререндером) */
export function metaToHeadTags(meta: PageMeta): string {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const lines = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    ...(meta.robots ? [`<meta name="robots" content="${meta.robots}" />`] : []),
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${meta.ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${meta.ogImage}" />`,
    ...meta.jsonLd.map(jsonLdScript),
  ]
  return lines.join('\n    ')
}

/* ────────────────────────── маршруты для пререндера и sitemap ────────────────────────── */

export interface SitemapEntry {
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
}

/** Публичные маршруты, которые пререндерятся и попадают в sitemap */
export function getPublicRoutes(): SitemapEntry[] {
  return [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/catalog', changefreq: 'daily', priority: 0.9 },
    { path: '/about', changefreq: 'monthly', priority: 0.7 },
    { path: '/how-it-works', changefreq: 'monthly', priority: 0.7 },
    { path: '/calculator', changefreq: 'monthly', priority: 0.6 },
    { path: '/blog', changefreq: 'weekly', priority: 0.6 },
    ...blogPosts.map((p): SitemapEntry => ({ path: `/blog/${p.slug}`, changefreq: 'monthly', priority: 0.6 })),
    { path: '/legal', changefreq: 'monthly', priority: 0.3 },
    ...['offer', 'privacy', 'terms', 'contract'].map((d): SitemapEntry => ({ path: `/legal/${d}`, changefreq: 'monthly', priority: 0.3 })),
    ...categoryLandings.map((c): SitemapEntry => ({ path: `/catalog/${c.slug}`, changefreq: 'weekly', priority: 0.8 })),
    ...products.map((p): SitemapEntry => ({ path: `/catalog/${p.id}`, changefreq: 'weekly', priority: 0.6 })),
  ]
}
