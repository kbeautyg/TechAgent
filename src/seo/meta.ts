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
import { categoryLandings, getCategoryBySlug, type CategoryLanding } from './categories'
import {
  SITE_URL, SITE_NAME, LEGAL_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE, CONTACT_EMAIL, PARTNERS_EMAIL, SUPPORT_EMAIL, absoluteUrl, clampDescription, pluralRu,
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
        email: SUPPORT_EMAIL,
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
    image: getProductImage(product.id, product.name, product.category)
      ? absoluteUrl(getProductImage(product.id, product.name, product.category))
      : DEFAULT_OG_IMAGE,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/catalog/${product.id}`),
      price: product.price,
      priceCurrency: 'RUB',
      /* Товар выкупается у поставщика после оплаты — «под заказ», а не «в наличии» */
      availability: product.inStock
        ? 'https://schema.org/BackOrder'
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

/** Документы /legal/:docType — ключ совпадает с адресом */
const legalDocMeta: Record<string, { title: string; description: string }> = {
  'sale-offer': {
    title: 'Публичная оферта купли-продажи | TechAgent',
    description: 'Условия покупки у продавца ОсОО «ТехЭйджент»: оплата через СБП, получение товара в пункте выдачи партнёра, отказ от заказа и возврат денежных средств.',
  },
  offer: {
    title: 'Агентский договор-оферта для партнёров | TechAgent',
    description: 'Агентский договор-оферта для партнёров ОсОО «ТехЭйджент»: оформление заказов покупателей, выдача товара в точке, вознаграждение, отчёт агента и акт.',
  },
  privacy: {
    title: 'Политика конфиденциальности | TechAgent',
    description: 'Политика конфиденциальности TechAgent: какие данные партнёров и покупателей обрабатывает ОсОО «ТехЭйджент», зачем, кому передаёт и как отозвать согласие.',
  },
  terms: {
    title: 'Пользовательское соглашение | TechAgent',
    description: 'Пользовательское соглашение TechAgent: правила использования сайта, каталога и личного кабинета партнёра.',
  },
  payment: {
    title: 'Условия оплаты и возврата | TechAgent',
    description: 'Условия оплаты и возврата для покупателей: продавец — ОсОО «ТехЭйджент», оплата через СБП по ссылке или QR-коду, порядок возврата денежных средств.',
  },
}

const LEGAL_DOC_PATHS = Object.keys(legalDocMeta)

/** Короткая строка условий покупки для сниппетов товаров */
const PURCHASE_TERMS_SNIPPET = `Продавец — ${LEGAL_NAME}, оплата через СБП, получение в пункте выдачи партнёра.`

const fmtPrice = (n: number) => n.toLocaleString('ru-RU')

/** Главный резолвер: путь без query-параметров → мета страницы */
export function resolveMeta(pathname: string): PageMeta {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (path === '/') {
    return baseMeta({
      title: DEFAULT_TITLE,
      description:
        'Станьте пунктом выдачи электроники TechAgent: оформляйте заказы покупателей и выдавайте товар в своей точке. Продавец — ОсОО «ТехЭйджент», оплата через СБП.',
      canonical: SITE_URL + '/',
      jsonLd: [organizationLd(), websiteLd(), faqLd()],
    })
  }

  if (path === '/about') {
    return baseMeta({
      title: 'О TechAgent — продавец ОсОО «ТехЭйджент» и пункты выдачи партнёров',
      description:
        'Как устроен TechAgent: ОсОО «ТехЭйджент» покупает товар у поставщика и продаёт его покупателю, партнёры оформляют заказы и выдают товар в своих точках.',
      canonical: `${SITE_URL}/about`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'О платформе' }])],
    })
  }

  if (path === '/how-it-works') {
    return baseMeta({
      title: 'Как это работает — заказ, оплата через СБП и получение товара | TechAgent',
      description:
        'Партнёр оформляет заказ, покупатель платит ОсОО «ТехЭйджент» через СБП, товар приходит в пункт выдачи ориентировочно за 5–7 рабочих дней после выкупа у поставщика.',
      canonical: `${SITE_URL}/how-it-works`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Как это работает' }])],
    })
  }

  if (path === '/catalog') {
    return baseMeta({
      title: `Каталог электроники — ${products.length} ${pluralRu(products.length, ['товар', 'товара', 'товаров'])} с ценами | TechAgent`,
      description:
        'Цены на смартфоны, ноутбуки, планшеты, наушники и технику для дома. Продавец — ОсОО «ТехЭйджент», оплата через СБП, получение в пункте выдачи партнёра.',
      canonical: `${SITE_URL}/catalog`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Каталог' }])],
    })
  }

  if (path === '/legal') {
    return baseMeta({
      title: 'Правовая информация — документы платформы | TechAgent',
      description:
        'Документы TechAgent: оферта купли-продажи для покупателей, агентский договор-оферта для партнёров, условия оплаты и возврата, политика конфиденциальности.',
      canonical: `${SITE_URL}/legal`,
      jsonLd: [organizationLd(), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Документы' }])],
    })
  }

  const legalMatch = path.match(/^\/legal\/([^/]+)$/)
  if (legalMatch) {
    const key = legalMatch[1].toLowerCase()
    const doc = legalDocMeta[key]
    if (doc) {
      return baseMeta({
        title: doc.title,
        description: doc.description,
        canonical: `${SITE_URL}/legal/${key}`,
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
        title: `${name} — цена ${fmtPrice(product.price)} ₽ | TechAgent`,
        description: clampDescription(
          `${name}: ${fmtPrice(product.price)} ₽. ${PURCHASE_TERMS_SNIPPET} ${product.description}`,
        ),
        canonical: `${SITE_URL}/catalog/${product.id}`,
        /* Превью в мессенджерах — общая картинка 1200×630: фото товаров квадратные webp, их обрезают */
        ogImage: DEFAULT_OG_IMAGE,
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
      description: 'Регистрация партнёра TechAgent: анкета компании и пункта выдачи. ОсОО «ТехЭйджент» проверяет данные до первого заказа.',
      canonical: `${SITE_URL}/register`,
      robots: NOINDEX,
    })
  }
  if (path.startsWith('/pay/')) {
    return baseMeta({
      title: 'Оплата заказа | TechAgent',
      description: `Оплата заказа через СБП. Продавец — ${LEGAL_NAME}.`,
      canonical: SITE_URL + path,
      robots: NOINDEX,
    })
  }
  if (path.startsWith('/admin')) {
    return baseMeta({
      title: 'Админка | TechAgent',
      description: 'Админка TechAgent.',
      canonical: SITE_URL + path,
      robots: NOINDEX,
    })
  }
  if (path.startsWith('/dashboard')) {
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
    { path: '/legal', changefreq: 'monthly', priority: 0.3 },
    /* Оферта купли-продажи — главный документ для покупателя, поэтому приоритет выше остальных */
    ...LEGAL_DOC_PATHS.map((d): SitemapEntry => ({ path: `/legal/${d}`, changefreq: 'monthly', priority: d === 'sale-offer' ? 0.5 : 0.3 })),
    ...categoryLandings.map((c): SitemapEntry => ({ path: `/catalog/${c.slug}`, changefreq: 'weekly', priority: 0.8 })),
    ...products.map((p): SitemapEntry => ({ path: `/catalog/${p.id}`, changefreq: 'weekly', priority: 0.6 })),
  ]
}
