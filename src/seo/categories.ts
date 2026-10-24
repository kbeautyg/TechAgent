/**
 * Категорийные посадочные страницы /catalog/{slug}.
 * Slug-и не пересекаются с ID товаров (ID — короткие латинские коды без дефисов такого вида).
 *
 * Тексты — для покупателя: что есть в категории. Условия покупки (продавец, оплата, получение, срок)
 * страница выводит общим блоком, поэтому здесь они не повторяются — только в мета-описании.
 */
import { LEGAL_NAME } from './site'

export interface CategoryLanding {
  slug: string
  /** Название категории ровно как в products.ts */
  category: string
  h1: string
  title: string
  description: string
  /** Вводный текст посадочной: какие бренды и модели есть в категории */
  intro: string[]
}

/** Хвост мета-описания категорий — условия покупки */
const TERMS = `Продавец — ${LEGAL_NAME}, оплата через СБП, получение в пункте выдачи партнёра.`

export const categoryLandings: CategoryLanding[] = [
  {
    slug: 'smartfony',
    category: 'Смартфоны',
    h1: 'Смартфоны iPhone, Samsung Galaxy, Google Pixel и Xiaomi',
    title: 'Смартфоны iPhone, Samsung Galaxy, Pixel, Xiaomi — цены и условия покупки | TechAgent',
    description: `iPhone 18 Pro, iPhone Duo, Air и 17, Samsung Galaxy S26 и Z Fold8, Google Pixel 11, Xiaomi, Honor, Huawei. ${TERMS}`,
    intro: [
      'iPhone 18 Pro и Pro Max, складной iPhone Duo, iPhone Air, 17 и 17e; Samsung Galaxy S26, S26 FE, Z Fold8 и Z Flip8; Google Pixel 11; Xiaomi 17 и 15T, POCO и Redmi Note 17; Honor, Huawei, OnePlus, Nothing, vivo. В карточке модели выбираются объём памяти и цвет.',
    ],
  },
  {
    slug: 'noutbuki',
    category: 'Ноутбуки',
    h1: 'Ноутбуки MacBook, ASUS, Lenovo, Dell и MSI',
    title: 'Ноутбуки MacBook, ASUS, Lenovo, Dell, MSI — цены и условия покупки | TechAgent',
    description: `MacBook Air и Pro на M5, MacBook Neo, ASUS Zenbook и ROG, Lenovo ThinkPad и Legion, Dell XPS, MSI, Surface. ${TERMS}`,
    intro: [
      'MacBook Air 13″ и 15″ и MacBook Pro 14″ и 16″ на чипах M5, M5 Pro и M5 Max, MacBook Neo; ASUS Zenbook и ROG Zephyrus, Lenovo ThinkPad X1 Carbon и Legion Pro, Dell XPS 14, HP OMEN, MSI, Microsoft Surface и Samsung Galaxy Book6.',
    ],
  },
  {
    slug: 'planshety',
    category: 'Планшеты',
    h1: 'Планшеты iPad, Samsung Galaxy Tab и Xiaomi Pad',
    title: 'Планшеты iPad, Samsung Galaxy Tab, Xiaomi Pad — цены | TechAgent',
    description: `iPad Pro на M5, iPad Air на M4, iPad и iPad mini, Galaxy Tab S12 и S11, Xiaomi Pad 8, Huawei MatePad. ${TERMS}`,
    intro: [
      'iPad Pro 11″ и 13″ на M5, iPad Air на M4, iPad (A16) и iPad mini; Samsung Galaxy Tab S12, S11 и S10 FE; Xiaomi Pad 8 и Redmi Pad 2 Pro; Huawei MatePad. Версии с Wi‑Fi и с сотовой связью.',
    ],
  },
  {
    slug: 'naushniki',
    category: 'Наушники',
    h1: 'Наушники AirPods, Sony, Bose, Samsung и Beats',
    title: 'Наушники AirPods, Sony, Bose, Samsung — цены и условия покупки | TechAgent',
    description: `AirPods Pro 3, AirPods 5, AirPods Max 2, Sony WH-1000XM6, Bose QuietComfort Ultra, Galaxy Buds4, Beats, Marshall. ${TERMS}`,
    intro: [
      'AirPods Pro 3, AirPods 5 и AirPods Max 2; Sony WH-1000XM6 и WF-1000XM6; Bose QuietComfort Ultra второго поколения; Samsung Galaxy Buds4; Beats, Marshall и Huawei FreeClip 2, а также портативные колонки Marshall.',
    ],
  },
  {
    slug: 'chasy',
    category: 'Часы',
    h1: 'Умные часы Apple Watch, Galaxy Watch и Garmin',
    title: 'Умные часы Apple Watch, Galaxy Watch, Garmin — цены | TechAgent',
    description: `Apple Watch Series 12, Ultra 4 и SE 3, Galaxy Watch9 и Watch8, Garmin fenix 9 Pro, Huawei Watch, умные кольца. ${TERMS}`,
    intro: [
      'Apple Watch Series 12, Ultra 4 и SE 3; Samsung Galaxy Watch9, Watch8, Watch Ultra2 и Galaxy Ring; Garmin fenix 9 Pro, Forerunner и Venu X1; Huawei Watch GT 6; Oura Ring 5 и Xiaomi Smart Band 10.',
    ],
  },
  {
    slug: 'aksessuary',
    category: 'Аксессуары',
    h1: 'Аксессуары Apple, Anker, Samsung и другие',
    title: 'Аксессуары Apple, Anker, Samsung — цены и условия покупки | TechAgent',
    description: `AirTag второго поколения, зарядки MagSafe и Apple, Magic Keyboard и Mouse, Apple Pencil Pro, Anker, SSD Samsung, роутеры Wi‑Fi 7, мониторы. ${TERMS}`,
    intro: [
      'AirTag второго поколения, зарядные устройства Apple и MagSafe, Magic Keyboard, Magic Mouse и Apple Pencil Pro; пауэрбанки и зарядки Anker, SSD Samsung 990 EVO Plus и 9100 PRO, роутеры Wi‑Fi 7, мониторы LG, Samsung и Dell.',
    ],
  },
  {
    slug: 'televizory',
    category: 'Телевизоры',
    h1: 'Телевизоры Samsung, LG, Sony, TCL и Hisense',
    title: 'Телевизоры Samsung, LG, Sony, TCL, Hisense — цены | TechAgent',
    description: `Телевизоры 2026 года: Samsung Neo QLED и OLED, LG OLED evo C6 и G6, Sony BRAVIA, TCL и Hisense Mini LED, саундбары. ${TERMS}`,
    intro: [
      'Модели 2026 года: Samsung Neo QLED QN80H и OLED S90H и S95H, LG OLED evo C6 и G6, Sony BRAVIA 7 II и 8 II, TCL C8L и C7L, Hisense U7S и UR8S; саундбар Samsung HW-Q990H.',
    ],
  },
  {
    slug: 'tehnika-dlya-doma',
    category: 'Для дома',
    h1: 'Техника для дома Dyson, Dreame и Xiaomi',
    title: 'Техника для дома Dyson, Dreame, Xiaomi — цены | TechAgent',
    description: `Dyson Airwrap Co-anda 2x, Supersonic Nural, Airstrait, пылесосы V16 и PencilVac, очистители воздуха, роботы-пылесосы Dreame. ${TERMS}`,
    intro: [
      'Стайлеры Dyson Airwrap Co-anda 2x и Airwrap i.d., фены Supersonic Nural и Supersonic r, выпрямитель Airstrait, пылесосы V16, V15 и PencilVac, очистители воздуха Dyson и Xiaomi; роботы-пылесосы и вертикальные пылесосы Dreame.',
    ],
  },
  {
    slug: 'igrovye-konsoli',
    category: 'Игровые консоли',
    h1: 'Игровые консоли PlayStation, Xbox и Nintendo Switch',
    title: 'Игровые консоли PlayStation 5, Xbox, Nintendo Switch 2 — цены | TechAgent',
    description: `PlayStation 5 Pro и PS5 Slim, Nintendo Switch 2, Switch OLED и Lite, Xbox Series X и S, Steam Deck OLED, ROG Xbox Ally, геймпады. ${TERMS}`,
    intro: [
      'PlayStation 5 Pro, PlayStation 5 Slim и Slim Digital Edition, геймпады DualSense и DualSense Edge; Nintendo Switch 2, Switch OLED и Switch Lite; Xbox Series X и S; портативные Steam Deck OLED и ASUS ROG Xbox Ally.',
    ],
  },
  {
    slug: 'kamery-i-drony',
    category: 'Камеры и дроны',
    h1: 'Камеры и дроны DJI, GoPro и Insta360',
    title: 'Дроны и камеры DJI, GoPro, Insta360 — цены | TechAgent',
    description: `Дроны DJI Mini 5 Pro, Air 3S, Avata 360 и Neo 2, экшн-камеры Osmo Action 6, GoPro HERO13, Insta360 X6, Osmo Pocket, стабилизаторы. ${TERMS}`,
    intro: [
      'Дроны DJI Mini 5 Pro, Air 3S, Avata 360 и Neo 2; экшн-камеры DJI Osmo Action 6, Osmo 360, GoPro HERO13 Black и Insta360 X6; карманные камеры Osmo Pocket 4 и 4P, стабилизаторы Osmo Mobile 8.',
    ],
  },
]

export function getCategoryBySlug(slug: string): CategoryLanding | undefined {
  return categoryLandings.find((c) => c.slug === slug)
}

export function getCategoryByName(name: string): CategoryLanding | undefined {
  return categoryLandings.find((c) => c.category === name)
}
