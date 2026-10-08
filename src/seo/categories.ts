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
    h1: 'Смартфоны iPhone, Samsung Galaxy и Xiaomi',
    title: 'Смартфоны iPhone, Samsung Galaxy, Xiaomi — цены и условия покупки | TechAgent',
    description: `iPhone 15 и 16, Samsung Galaxy S24/S25, Z Fold и Z Flip, Xiaomi и Redmi. ${TERMS}`,
    intro: [
      'iPhone 15 и 16 серии, Samsung Galaxy S23–S25 и складные Z Fold / Z Flip, Xiaomi и Redmi, а также Google Pixel, OnePlus, Honor и другие бренды. Модели представлены в разных объёмах памяти и цветах — конфигурацию можно выбрать в карточке товара.',
    ],
  },
  {
    slug: 'noutbuki',
    category: 'Ноутбуки',
    h1: 'Ноутбуки MacBook, Lenovo, Dell и ASUS',
    title: 'Ноутбуки MacBook, Lenovo, ASUS, Dell — цены и условия покупки | TechAgent',
    description: `MacBook Air и Pro на чипах M2 и M3, ноутбуки Lenovo, Dell, ASUS, MSI. ${TERMS}`,
    intro: [
      'MacBook Air и MacBook Pro на чипах M2 и M3, ноутбуки для работы Lenovo ThinkPad и Dell XPS, игровые модели ASUS ROG, MSI, Razer и Gigabyte с видеокартами RTX.',
    ],
  },
  {
    slug: 'planshety',
    category: 'Планшеты',
    h1: 'Планшеты iPad, Samsung Galaxy Tab и Xiaomi Pad',
    title: 'Планшеты iPad, Samsung Galaxy Tab, Xiaomi Pad — цены | TechAgent',
    description: `iPad, iPad mini, Air и Pro, Samsung Galaxy Tab, Xiaomi Pad. ${TERMS}`,
    intro: [
      'iPad всех линеек — базовый, mini, Air и Pro, Samsung Galaxy Tab S8–S10, Xiaomi Pad, а также Microsoft Surface Pro, Lenovo и Huawei MatePad.',
    ],
  },
  {
    slug: 'naushniki',
    category: 'Наушники',
    h1: 'Наушники AirPods, Sony, Samsung и JBL',
    title: 'Наушники AirPods, Sony, Samsung, JBL — цены и условия покупки | TechAgent',
    description: `AirPods, AirPods Pro и Max, Sony WH-1000XM5, Galaxy Buds, JBL, Bose. ${TERMS}`,
    intro: [
      'AirPods, AirPods Pro и AirPods Max, полноразмерные Sony WH-1000XM5 и Bose QuietComfort с шумоподавлением, Samsung Galaxy Buds, студийные Beyerdynamic. В этом же разделе — саундбары Samsung и JBL.',
    ],
  },
  {
    slug: 'chasy',
    category: 'Часы',
    h1: 'Умные часы Apple Watch, Samsung Galaxy Watch и Garmin',
    title: 'Умные часы Apple Watch, Galaxy Watch, Garmin — цены | TechAgent',
    description: `Apple Watch Series 9, SE и Ultra 2, Galaxy Watch, Garmin, Mi Band. ${TERMS}`,
    intro: [
      'Apple Watch Series 9, SE и Ultra 2, Samsung Galaxy Watch 4–7, Garmin Epix и Fenix, фитнес-браслеты Xiaomi Mi Band — в разных размерах корпуса и цветах.',
    ],
  },
  {
    slug: 'aksessuary',
    category: 'Аксессуары',
    h1: 'Аксессуары для смартфонов и компьютеров',
    title: 'Аксессуары: зарядки, кабели, чехлы, накопители — цены | TechAgent',
    description: `Кабели и зарядки Apple, пауэрбанки Anker, чехлы, SSD Samsung. ${TERMS}`,
    intro: [
      'Кабели и MagSafe Battery Pack Apple, пауэрбанки и беспроводные зарядки Anker, чехлы Spigen и OtterBox, SSD Samsung, AirTag, клавиатуры и Wi-Fi-роутеры.',
    ],
  },
  {
    slug: 'televizory',
    category: 'Телевизоры',
    h1: 'Телевизоры Samsung, LG и Sony',
    title: 'Телевизоры Samsung, LG OLED, Sony Bravia — цены | TechAgent',
    description: `QLED и OLED телевизоры Samsung, LG и Sony от 55 до 98 дюймов. ${TERMS}`,
    intro: [
      'QLED и OLED телевизоры Samsung, LG OLED, Sony Bravia с подсветкой Mini-LED, Hisense и TCL — диагонали от 55 до 98 дюймов. В разделе также мониторы Acer, ASUS и LG.',
    ],
  },
  {
    slug: 'tehnika-dlya-doma',
    category: 'Для дома',
    h1: 'Техника для дома Dyson, Nespresso и другие',
    title: 'Техника для дома: Dyson, Nespresso, DeLonghi — цены | TechAgent',
    description: `Dyson Airwrap и Supersonic, кофемашины Nespresso и DeLonghi. ${TERMS}`,
    intro: [
      'Стайлер Dyson Airwrap и фены Supersonic, кофемашины Nespresso и DeLonghi, очиститель воздуха Sharp, увлажнитель и осушитель воздуха, пылесос Shark.',
    ],
  },
  {
    slug: 'igrovye-konsoli',
    category: 'Игровые консоли',
    h1: 'Игровые консоли PlayStation, Xbox и Nintendo Switch',
    title: 'Игровые консоли PlayStation 5, Xbox, Nintendo Switch — цены | TechAgent',
    description: `PlayStation 5 и PS5 Pro, Xbox Series X и S, Nintendo Switch OLED. ${TERMS}`,
    intro: [
      'PlayStation 5, PS5 Pro и Digital Edition, Xbox Series X и Series S, Nintendo Switch OLED, а также геймпады DualSense и Xbox Wireless Controller.',
    ],
  },
  {
    slug: 'kamery-i-drony',
    category: 'Камеры и дроны',
    h1: 'Камеры и дроны DJI, GoPro и Sony',
    title: 'Дроны DJI, экшн-камеры GoPro, Sony Alpha — цены | TechAgent',
    description: `Дроны DJI Mini, Air, Mavic и Avata, экшн-камеры GoPro, Sony Alpha. ${TERMS}`,
    intro: [
      'Дроны DJI Mini 3 Pro и Mini 4 Pro, Air 3, Mavic 3 Classic и Avata 2 в комплектах Fly More Combo, экшн-камеры GoPro Hero 11 и 12, беззеркальная камера Sony Alpha 7R V.',
    ],
  },
]

export function getCategoryBySlug(slug: string): CategoryLanding | undefined {
  return categoryLandings.find((c) => c.slug === slug)
}

export function getCategoryByName(name: string): CategoryLanding | undefined {
  return categoryLandings.find((c) => c.category === name)
}
