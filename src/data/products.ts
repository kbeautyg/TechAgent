/* Каталог TechAgent. Файл собирается скриптом docs/catalog-2026-10/emit_products.py из выгрузки BigGeek
 * и линеек производителей — руками не править: правки цен и состава делаются в сборке.
 * Карточка = модель + конфигурация (память / размер / комплектация); цвета — внутри карточки (colors). */

export interface ProductColor {
  name: string
  /** Фото этого цвета, /images/p/<семейство>/<цвет>.webp */
  image: string
  /** Цена этого цвета, если она не равна цене карточки (цена карточки — самый дешёвый цвет) */
  price?: number
}

export interface Product {
  id: string
  /** Модель и конфигурация: «iPhone 18 Pro 256 ГБ» */
  name: string
  model: string
  /** Конфигурация внутри модели: «256 ГБ», «256 ГБ · Wi‑Fi», «M5 10/10 · 16 ГБ · 1 ТБ»; null — у модели одна конфигурация */
  variant: string | null
  /** Память, если конфигурация — это объём памяти (для фильтра) */
  storage: string | null
  /** Карточки одной модели — одно семейство */
  family: string
  brand: string
  category: string
  price: number
  /** Фото первого цвета */
  image: string
  colors: ProductColor[]
  specs: Record<string, string>
  /** Короткая строка характеристик для плиток каталога */
  summary: string
  inStock: boolean
  description: string
}

export const products: Product[] = [
 {
  "id": "iphone-18-pro-max-256-gb",
  "name": "iPhone 18 Pro Max 256 ГБ",
  "model": "iPhone 18 Pro Max",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-18-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 131090,
  "image": "/images/p/iphone-18-pro-max/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro-max/chernyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro-max/serebristyy.webp",
    "price": 131990
   },
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp",
    "price": 136790
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro-max/burgundskiy.webp",
    "price": 136790
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "249"
  },
  "summary": "6.9″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-max-512-gb",
  "name": "iPhone 18 Pro Max 512 ГБ",
  "model": "iPhone 18 Pro Max",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-18-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 154790,
  "image": "/images/p/iphone-18-pro-max/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro-max/serebristyy.webp"
   },
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp",
    "price": 156690
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro-max/chernyy.webp",
    "price": 157690
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro-max/burgundskiy.webp",
    "price": 161490
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "249"
  },
  "summary": "6.9″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-max-1-tb",
  "name": "iPhone 18 Pro Max 1 ТБ",
  "model": "iPhone 18 Pro Max",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-18-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 203290,
  "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp",
  "colors": [
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro-max/chernyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro-max/serebristyy.webp",
    "price": 206090
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro-max/burgundskiy.webp",
    "price": 208990
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "249"
  },
  "summary": "6.9″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-max-2-tb",
  "name": "iPhone 18 Pro Max 2 ТБ",
  "model": "iPhone 18 Pro Max",
  "variant": "2 ТБ",
  "storage": "2 ТБ",
  "family": "iphone-18-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 227990,
  "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp",
  "colors": [
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro-max/ledovyy-schit.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro-max/chernyy.webp",
    "price": 232690
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro-max/serebristyy.webp",
    "price": 237490
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro-max/burgundskiy.webp",
    "price": 270690
   }
  ],
  "specs": {
   "Память": "2 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "249"
  },
  "summary": "6.9″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-256-gb",
  "name": "iPhone 18 Pro 256 ГБ",
  "model": "iPhone 18 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-18-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 116790,
  "image": "/images/p/iphone-18-pro/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro/serebristyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro/chernyy.webp",
    "price": 118690
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro/burgundskiy.webp",
    "price": 119690
   },
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro/ledovyy-schit.webp",
    "price": 120590
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "211"
  },
  "summary": "6.3″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-512-gb",
  "name": "iPhone 18 Pro 512 ГБ",
  "model": "iPhone 18 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-18-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 139590,
  "image": "/images/p/iphone-18-pro/burgundskiy.webp",
  "colors": [
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro/burgundskiy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro/serebristyy.webp",
    "price": 140590
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro/chernyy.webp",
    "price": 140590
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "211"
  },
  "summary": "6.3″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-1-tb",
  "name": "iPhone 18 Pro 1 ТБ",
  "model": "iPhone 18 Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-18-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 176690,
  "image": "/images/p/iphone-18-pro/ledovyy-schit.webp",
  "colors": [
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro/ledovyy-schit.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-18-pro/serebristyy.webp",
    "price": 180490
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro/chernyy.webp",
    "price": 180490
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro/burgundskiy.webp",
    "price": 182390
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "211"
  },
  "summary": "6.3″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-18-pro-2-tb",
  "name": "iPhone 18 Pro 2 ТБ",
  "model": "iPhone 18 Pro",
  "variant": "2 ТБ",
  "storage": "2 ТБ",
  "family": "iphone-18-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 242190,
  "image": "/images/p/iphone-18-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-18-pro/chernyy.webp"
   },
   {
    "name": "Ледовый щит",
    "image": "/images/p/iphone-18-pro/ledovyy-schit.webp",
    "price": 246990
   },
   {
    "name": "Бургундский",
    "image": "/images/p/iphone-18-pro/burgundskiy.webp",
    "price": 266890
   }
  ],
  "specs": {
   "Память": "2 ТБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.5-4.0, 24mm, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "211"
  },
  "summary": "6.3″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 18 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-duo-256-gb",
  "name": "iPhone Duo 256 ГБ",
  "model": "iPhone Duo",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-duo",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 322990,
  "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp",
  "colors": [
   {
    "name": "Звёздный белый",
    "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp"
   },
   {
    "name": "Ночное небо",
    "image": "/images/p/iphone-duo/nochnoe-nebo.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "5.4″; 7.6″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1398 x 2034; 1878 x 2670",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/2.55″, 0.7µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "254",
   "Размеры": "В сложенном виде 11,78 x 8,41 x 1,13 см; В разложенном виде 11,78 x 16,46 x 0,52 см"
  },
  "summary": "5.4″; 7.6″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Duo: экран 5.4″; 7.6″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-duo-512-gb",
  "name": "iPhone Duo 512 ГБ",
  "model": "iPhone Duo",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-duo",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 375190,
  "image": "/images/p/iphone-duo/nochnoe-nebo.webp",
  "colors": [
   {
    "name": "Ночное небо",
    "image": "/images/p/iphone-duo/nochnoe-nebo.webp"
   },
   {
    "name": "Звёздный белый",
    "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "5.4″; 7.6″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1398 x 2034; 1878 x 2670",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/2.55″, 0.7µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "254",
   "Размеры": "В сложенном виде 11,78 x 8,41 x 1,13 см; В разложенном виде 11,78 x 16,46 x 0,52 см"
  },
  "summary": "5.4″; 7.6″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Duo: экран 5.4″; 7.6″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-duo-1-tb",
  "name": "iPhone Duo 1 ТБ",
  "model": "iPhone Duo",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-duo",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 455990,
  "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp",
  "colors": [
   {
    "name": "Звёздный белый",
    "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp"
   },
   {
    "name": "Ночное небо",
    "image": "/images/p/iphone-duo/nochnoe-nebo.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "5.4″; 7.6″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1398 x 2034; 1878 x 2670",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/2.55″, 0.7µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "254",
   "Размеры": "В сложенном виде 11,78 x 8,41 x 1,13 см; В разложенном виде 11,78 x 16,46 x 0,52 см"
  },
  "summary": "5.4″; 7.6″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Duo: экран 5.4″; 7.6″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-duo-2-tb",
  "name": "iPhone Duo 2 ТБ",
  "model": "iPhone Duo",
  "variant": "2 ТБ",
  "storage": "2 ТБ",
  "family": "iphone-duo",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 493990,
  "image": "/images/p/iphone-duo/nochnoe-nebo.webp",
  "colors": [
   {
    "name": "Ночное небо",
    "image": "/images/p/iphone-duo/nochnoe-nebo.webp"
   },
   {
    "name": "Звёздный белый",
    "image": "/images/p/iphone-duo/zvezdnyy-belyy.webp"
   }
  ],
  "specs": {
   "Память": "2 ТБ",
   "Экран": "5.4″; 7.6″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1398 x 2034; 1878 x 2670",
   "Процессор": "Apple A20 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/2.55″, 0.7µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "254",
   "Размеры": "В сложенном виде 11,78 x 8,41 x 1,13 см; В разложенном виде 11,78 x 16,46 x 0,52 см"
  },
  "summary": "5.4″; 7.6″ · Apple A20 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Duo: экран 5.4″; 7.6″ Super Retina XDR, 120 Гц, процессор Apple A20 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "galaxy-s26-ultra-256-gb",
  "name": "Galaxy S26 Ultra 256 ГБ",
  "model": "Galaxy S26 Ultra",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s26-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 83590,
  "image": "/images/p/galaxy-s26-ultra/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26-ultra/belyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26-ultra/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-ultra/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-ultra/chernyy.webp"
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26-ultra/rozovoe-zoloto.webp",
    "price": 85490
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26-ultra/serebristyy.webp",
    "price": 85490
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.4, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "60 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S26 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-s26-ultra-512-gb",
  "name": "Galaxy S26 Ultra 512 ГБ",
  "model": "Galaxy S26 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s26-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 98790,
  "image": "/images/p/galaxy-s26-ultra/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26-ultra/belyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26-ultra/goluboy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-ultra/chernyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-ultra/fioletovyy.webp",
    "price": 100690
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26-ultra/serebristyy.webp",
    "price": 104490
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26-ultra/rozovoe-zoloto.webp",
    "price": 104490
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.4, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "60 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S26 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-s26-ultra-1-tb",
  "name": "Galaxy S26 Ultra 1 ТБ",
  "model": "Galaxy S26 Ultra",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "galaxy-s26-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 121590,
  "image": "/images/p/galaxy-s26-ultra/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26-ultra/belyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26-ultra/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-ultra/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-ultra/chernyy.webp"
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26-ultra/rozovoe-zoloto.webp",
    "price": 129190
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26-ultra/serebristyy.webp",
    "price": 129190
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.4, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "60 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S26 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-z-fold8-ultra-256-gb",
  "name": "Galaxy Z Fold8 Ultra 256 ГБ",
  "model": "Galaxy Z Fold8 Ultra",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-z-fold8-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 131090,
  "image": "/images/p/galaxy-z-fold8-ultra/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-z-fold8-ultra/fioletovyy.webp"
   },
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8-ultra/grafitovyy.webp"
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8-ultra/kremovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.5″; 8″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2520; 2256 x 2504",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 1/2.5″, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8 Ultra: экран 6.5″; 8″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-z-fold8-ultra-512-gb",
  "name": "Galaxy Z Fold8 Ultra 512 ГБ",
  "model": "Galaxy Z Fold8 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-z-fold8-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 149090,
  "image": "/images/p/galaxy-z-fold8-ultra/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8-ultra/grafitovyy.webp"
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8-ultra/kremovyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-z-fold8-ultra/fioletovyy.webp",
    "price": 153890
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.5″; 8″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2520; 2256 x 2504",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 1/2.5″, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8 Ultra: экран 6.5″; 8″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-z-fold8-ultra-1-tb",
  "name": "Galaxy Z Fold8 Ultra 1 ТБ",
  "model": "Galaxy Z Fold8 Ultra",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "galaxy-z-fold8-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 193790,
  "image": "/images/p/galaxy-z-fold8-ultra/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-z-fold8-ultra/fioletovyy.webp"
   },
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8-ultra/grafitovyy.webp",
    "price": 195690
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8-ultra/kremovyy.webp",
    "price": 199490
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.5″; 8″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2520; 2256 x 2504",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 1/2.5″, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8 Ultra: экран 6.5″; 8″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-z-fold8-256-gb",
  "name": "Galaxy Z Fold8 256 ГБ",
  "model": "Galaxy Z Fold8",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-z-fold8",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 120590,
  "image": "/images/p/galaxy-z-fold8/kremovyy.webp",
  "colors": [
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8/kremovyy.webp"
   },
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8/grafitovyy.webp"
   },
   {
    "name": "Лавандовый",
    "image": "/images/p/galaxy-z-fold8/lavandovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "5.5″; 7.6″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1248 x 1972; 1828 x 2448",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 120˚, 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4800 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "5.5″; 7.6″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8: экран 5.5″; 7.6″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 4800 мАч."
 },
 {
  "id": "galaxy-z-fold8-512-gb",
  "name": "Galaxy Z Fold8 512 ГБ",
  "model": "Galaxy Z Fold8",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-z-fold8",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 131090,
  "image": "/images/p/galaxy-z-fold8/lavandovyy.webp",
  "colors": [
   {
    "name": "Лавандовый",
    "image": "/images/p/galaxy-z-fold8/lavandovyy.webp"
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8/kremovyy.webp",
    "price": 132990
   },
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8/grafitovyy.webp",
    "price": 132990
   },
   {
    "name": "Фисташковый",
    "image": "/images/p/galaxy-z-fold8/fistashkovyy.webp",
    "price": 143390
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "5.5″; 7.6″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1248 x 1972; 1828 x 2448",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 120˚, 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4800 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "5.5″; 7.6″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8: экран 5.5″; 7.6″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 4800 мАч."
 },
 {
  "id": "galaxy-z-fold8-1-tb",
  "name": "Galaxy Z Fold8 1 ТБ",
  "model": "Galaxy Z Fold8",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "galaxy-z-fold8",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 169090,
  "image": "/images/p/galaxy-z-fold8/lavandovyy.webp",
  "colors": [
   {
    "name": "Лавандовый",
    "image": "/images/p/galaxy-z-fold8/lavandovyy.webp"
   },
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-fold8/grafitovyy.webp",
    "price": 174790
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-fold8/kremovyy.webp",
    "price": 178590
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "5.5″; 7.6″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1248 x 1972; 1828 x 2448",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 120˚, 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1.0µm",
   "Фронтальная камера": "10 МП, f/2.2, 18 мм, 1.12µm; 10 МП, f/2.2, 24 мм, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4800 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "5.5″; 7.6″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy Z Fold8: экран 5.5″; 7.6″ Dynamic LTPO AMOLED 2X; Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 4800 мАч."
 },
 {
  "id": "galaxy-z-flip8-256-gb",
  "name": "Galaxy Z Flip8 256 ГБ",
  "model": "Galaxy Z Flip8",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-z-flip8",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 74990,
  "image": "/images/p/galaxy-z-flip8/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-flip8/grafitovyy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-z-flip8/rozovyy.webp",
    "price": 79790
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-flip8/kremovyy.webp",
    "price": 79790
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "4,1″; 6,9″",
   "Тип экрана": "Super AMOLED; Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "948 x 1048; 1080 x 2520",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 23 мм, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚ , 1.12µm",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1.12µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "4300 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP48"
  },
  "summary": "4,1″; 6,9″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy Z Flip8: экран 4,1″; 6,9″ Super AMOLED; Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4300 мАч, защита IP48."
 },
 {
  "id": "galaxy-z-flip8-512-gb",
  "name": "Galaxy Z Flip8 512 ГБ",
  "model": "Galaxy Z Flip8",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-z-flip8",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 86390,
  "image": "/images/p/galaxy-z-flip8/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-z-flip8/grafitovyy.webp"
   },
   {
    "name": "Кремовый",
    "image": "/images/p/galaxy-z-flip8/kremovyy.webp",
    "price": 88290
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-z-flip8/rozovyy.webp",
    "price": 95890
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "4,1″; 6,9″",
   "Тип экрана": "Super AMOLED; Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "948 x 1048; 1080 x 2520",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 23 мм, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚ , 1.12µm",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1.12µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "4300 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP48"
  },
  "summary": "4,1″; 6,9″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy Z Flip8: экран 4,1″; 6,9″ Super AMOLED; Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4300 мАч, защита IP48."
 },
 {
  "id": "pixel-11-pro-xl-256-gb",
  "name": "Pixel 11 Pro XL 256 ГБ",
  "model": "Pixel 11 Pro XL",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-11-pro-xl",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 93090,
  "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp",
  "colors": [
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp"
   },
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-11-pro-xl/tumannyy-sero-goluboy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/pixel-11-pro-xl/rozovyy.webp"
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro-xl/olivkovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.8″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1344 x 2992",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5115 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.8″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro XL: экран 6.8″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 5115 мАч."
 },
 {
  "id": "pixel-11-pro-xl-512-gb",
  "name": "Pixel 11 Pro XL 512 ГБ",
  "model": "Pixel 11 Pro XL",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "pixel-11-pro-xl",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 112990,
  "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp",
  "colors": [
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp"
   },
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-11-pro-xl/tumannyy-sero-goluboy.webp",
    "price": 113990
   },
   {
    "name": "Розовый",
    "image": "/images/p/pixel-11-pro-xl/rozovyy.webp",
    "price": 115890
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro-xl/olivkovyy.webp",
    "price": 115890
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.8″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1344 x 2992",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5115 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.8″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro XL: экран 6.8″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 5115 мАч."
 },
 {
  "id": "pixel-11-pro-xl-1-tb",
  "name": "Pixel 11 Pro XL 1 ТБ",
  "model": "Pixel 11 Pro XL",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "pixel-11-pro-xl",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 139590,
  "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp",
  "colors": [
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro-xl/matovyy-chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.8″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1344 x 2992",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5115 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.8″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro XL: экран 6.8″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 5115 мАч."
 },
 {
  "id": "pixel-11-pro-256-gb",
  "name": "Pixel 11 Pro 256 ГБ",
  "model": "Pixel 11 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-11-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 89290,
  "image": "/images/p/pixel-11-pro/rozovyy.webp",
  "colors": [
   {
    "name": "Розовый",
    "image": "/images/p/pixel-11-pro/rozovyy.webp"
   },
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro/matovyy-chernyy.webp"
   },
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-11-pro/tumannyy-sero-goluboy.webp"
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro/olivkovyy.webp",
    "price": 91190
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚ 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″,",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4850 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4850 мАч."
 },
 {
  "id": "pixel-11-pro-512-gb",
  "name": "Pixel 11 Pro 512 ГБ",
  "model": "Pixel 11 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "pixel-11-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 108290,
  "image": "/images/p/pixel-11-pro/tumannyy-sero-goluboy.webp",
  "colors": [
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-11-pro/tumannyy-sero-goluboy.webp"
   },
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro/matovyy-chernyy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/pixel-11-pro/rozovyy.webp",
    "price": 111090
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro/olivkovyy.webp",
    "price": 111090
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚ 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″,",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4850 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4850 мАч."
 },
 {
  "id": "pixel-11-pro-1-tb",
  "name": "Pixel 11 Pro 1 ТБ",
  "model": "Pixel 11 Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "pixel-11-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 130090,
  "image": "/images/p/pixel-11-pro/matovyy-chernyy.webp",
  "colors": [
   {
    "name": "Матовый чёрный",
    "image": "/images/p/pixel-11-pro/matovyy-chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚ 1/2.51″",
   "Телефото-камера": "48 МП, f/2.8, 106 мм, 1/1.95″,",
   "Фронтальная камера": "42 МП, f/2.2, 103˚",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4850 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4850 мАч."
 },
 {
  "id": "pixel-11-pro-fold-256-gb",
  "name": "Pixel 11 Pro Fold 256 ГБ",
  "model": "Pixel 11 Pro Fold",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-11-pro-fold",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 138690,
  "image": "/images/p/pixel-11-pro-fold/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-11-pro-fold/chernyy.webp"
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro-fold/olivkovyy.webp",
    "price": 139590
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.5″; 8.0″",
   "Тип экрана": "OLED; OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2364; 2076 x 2152",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "48 МП, f/1.7, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "10.5 МП, f/2.2, 127˚, 1/3.4″",
   "Телефото-камера": "10.8 МП, f/3.1, 112 мм, 1/3.2″",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1/3.94″",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "4806 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8.0″ · Google Tensor · 48 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro Fold: экран 6.5″; 8.0″ OLED; OLED, 120 Гц, процессор Google Tensor. Основная камера 48 МП, аккумулятор 4806 мАч."
 },
 {
  "id": "pixel-11-pro-fold-512-gb",
  "name": "Pixel 11 Pro Fold 512 ГБ",
  "model": "Pixel 11 Pro Fold",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "pixel-11-pro-fold",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 155790,
  "image": "/images/p/pixel-11-pro-fold/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-11-pro-fold/chernyy.webp"
   },
   {
    "name": "Оливковый",
    "image": "/images/p/pixel-11-pro-fold/olivkovyy.webp",
    "price": 157690
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.5″; 8.0″",
   "Тип экрана": "OLED; OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2364; 2076 x 2152",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "48 МП, f/1.7, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "10.5 МП, f/2.2, 127˚, 1/3.4″",
   "Телефото-камера": "10.8 МП, f/3.1, 112 мм, 1/3.2″",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1/3.94″",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "4806 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8.0″ · Google Tensor · 48 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro Fold: экран 6.5″; 8.0″ OLED; OLED, 120 Гц, процессор Google Tensor. Основная камера 48 МП, аккумулятор 4806 мАч."
 },
 {
  "id": "pixel-11-pro-fold-1-tb",
  "name": "Pixel 11 Pro Fold 1 ТБ",
  "model": "Pixel 11 Pro Fold",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "pixel-11-pro-fold",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 184290,
  "image": "/images/p/pixel-11-pro-fold/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-11-pro-fold/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.5″; 8.0″",
   "Тип экрана": "OLED; OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2364; 2076 x 2152",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "48 МП, f/1.7, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "10.5 МП, f/2.2, 127˚, 1/3.4″",
   "Телефото-камера": "10.8 МП, f/3.1, 112 мм, 1/3.2″",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1/3.94″",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "4806 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.5″; 8.0″ · Google Tensor · 48 Мп",
  "inStock": true,
  "description": "Pixel 11 Pro Fold: экран 6.5″; 8.0″ OLED; OLED, 120 Гц, процессор Google Tensor. Основная камера 48 МП, аккумулятор 4806 мАч."
 },
 {
  "id": "pixel-11-256-gb",
  "name": "Pixel 11 256 ГБ",
  "model": "Pixel 11",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-11",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 70290,
  "image": "/images/p/pixel-11/fistashkovyy.webp",
  "colors": [
   {
    "name": "Фисташковый",
    "image": "/images/p/pixel-11/fistashkovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-11/chernyy.webp"
   },
   {
    "name": "Морозный сиреневый",
    "image": "/images/p/pixel-11/moroznyy-sirenevyy.webp"
   },
   {
    "name": "Красный",
    "image": "/images/p/pixel-11/krasnyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2424",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "48 МП, f/1.7, 24 мм, 1/1.56″, 1.0µm,",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 120˚, 1/3.1″",
   "Телефото-камера": "10.8 МП, f/3.1, 112 мм, 1/3.2″",
   "Фронтальная камера": "10.5 МП, f/2.2, 20 мм, 1/3.1″, 1.22µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "4985 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.3″ · 48 Мп",
  "inStock": true,
  "description": "Pixel 11: экран 6.3″ OLED, 120 Гц. Основная камера 48 МП, аккумулятор 4985 мАч, защита IP68."
 },
 {
  "id": "pixel-11-512-gb",
  "name": "Pixel 11 512 ГБ",
  "model": "Pixel 11",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "pixel-11",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 79790,
  "image": "/images/p/pixel-11/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-11/chernyy.webp"
   },
   {
    "name": "Морозный сиреневый",
    "image": "/images/p/pixel-11/moroznyy-sirenevyy.webp"
   },
   {
    "name": "Красный",
    "image": "/images/p/pixel-11/krasnyy.webp",
    "price": 80690
   },
   {
    "name": "Фисташковый",
    "image": "/images/p/pixel-11/fistashkovyy.webp",
    "price": 82590
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2424",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "48 МП, f/1.7, 24 мм, 1/1.56″, 1.0µm,",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 120˚, 1/3.1″",
   "Телефото-камера": "10.8 МП, f/3.1, 112 мм, 1/3.2″",
   "Фронтальная камера": "10.5 МП, f/2.2, 20 мм, 1/3.1″, 1.22µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "4985 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.3″ · 48 Мп",
  "inStock": true,
  "description": "Pixel 11: экран 6.3″ OLED, 120 Гц. Основная камера 48 МП, аккумулятор 4985 мАч, защита IP68."
 },
 {
  "id": "iphone-air-256-gb",
  "name": "iPhone Air 256 ГБ",
  "model": "iPhone Air",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-air",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 75990,
  "image": "/images/p/iphone-air/kosmicheskiy-chernyy.webp",
  "colors": [
   {
    "name": "Космический чёрный",
    "image": "/images/p/iphone-air/kosmicheskiy-chernyy.webp"
   },
   {
    "name": "Облачно-белый",
    "image": "/images/p/iphone-air/oblachno-belyy.webp"
   },
   {
    "name": "Небесно-голубой",
    "image": "/images/p/iphone-air/nebesno-goluboy.webp"
   },
   {
    "name": "Светло-золотой",
    "image": "/images/p/iphone-air/svetlo-zolotoy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.5″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2736",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "165",
   "Размеры": "15,62 x 7,47 x 0,56 см",
   "Операционная система": "iOS 26"
  },
  "summary": "6.5″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Air: экран 6.5″ Super Retina XDR OLED, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-air-512-gb",
  "name": "iPhone Air 512 ГБ",
  "model": "iPhone Air",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-air",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 82590,
  "image": "/images/p/iphone-air/svetlo-zolotoy.webp",
  "colors": [
   {
    "name": "Светло-золотой",
    "image": "/images/p/iphone-air/svetlo-zolotoy.webp"
   },
   {
    "name": "Космический чёрный",
    "image": "/images/p/iphone-air/kosmicheskiy-chernyy.webp",
    "price": 84490
   },
   {
    "name": "Небесно-голубой",
    "image": "/images/p/iphone-air/nebesno-goluboy.webp",
    "price": 86390
   },
   {
    "name": "Облачно-белый",
    "image": "/images/p/iphone-air/oblachno-belyy.webp",
    "price": 93090
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.5″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2736",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "165",
   "Размеры": "15,62 x 7,47 x 0,56 см",
   "Операционная система": "iOS 26"
  },
  "summary": "6.5″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Air: экран 6.5″ Super Retina XDR OLED, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-air-1-tb",
  "name": "iPhone Air 1 ТБ",
  "model": "iPhone Air",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-air",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 98790,
  "image": "/images/p/iphone-air/kosmicheskiy-chernyy.webp",
  "colors": [
   {
    "name": "Космический чёрный",
    "image": "/images/p/iphone-air/kosmicheskiy-chernyy.webp"
   },
   {
    "name": "Светло-золотой",
    "image": "/images/p/iphone-air/svetlo-zolotoy.webp"
   },
   {
    "name": "Облачно-белый",
    "image": "/images/p/iphone-air/oblachno-belyy.webp",
    "price": 101590
   },
   {
    "name": "Небесно-голубой",
    "image": "/images/p/iphone-air/nebesno-goluboy.webp",
    "price": 112090
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.5″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2736",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Титан",
   "Вес, г": "165",
   "Размеры": "15,62 x 7,47 x 0,56 см",
   "Операционная система": "iOS 26"
  },
  "summary": "6.5″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone Air: экран 6.5″ Super Retina XDR OLED, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-256-gb",
  "name": "iPhone 17 256 ГБ",
  "model": "iPhone 17",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-17",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 75990,
  "image": "/images/p/iphone-17/shalfeynyy.webp",
  "colors": [
   {
    "name": "Шалфейный",
    "image": "/images/p/iphone-17/shalfeynyy.webp"
   },
   {
    "name": "Туманно-голубой",
    "image": "/images/p/iphone-17/tumanno-goluboy.webp",
    "price": 77890
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-17/chernyy.webp",
    "price": 78790
   },
   {
    "name": "Лавандовый",
    "image": "/images/p/iphone-17/lavandovyy.webp",
    "price": 78790
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-17/belyy.webp",
    "price": 78790
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A19",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚ , 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "177",
   "Размеры": "14,96 x 7,15 x 0,8 см"
  },
  "summary": "6.3″ · Apple A19 · 48 Мп",
  "inStock": true,
  "description": "iPhone 17: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A19. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-512-gb",
  "name": "iPhone 17 512 ГБ",
  "model": "iPhone 17",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-17",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 90190,
  "image": "/images/p/iphone-17/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-17/chernyy.webp"
   },
   {
    "name": "Шалфейный",
    "image": "/images/p/iphone-17/shalfeynyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-17/belyy.webp",
    "price": 93090
   },
   {
    "name": "Туманно-голубой",
    "image": "/images/p/iphone-17/tumanno-goluboy.webp",
    "price": 93090
   },
   {
    "name": "Лавандовый",
    "image": "/images/p/iphone-17/lavandovyy.webp",
    "price": 95890
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A19",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚ , 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "177",
   "Размеры": "14,96 x 7,15 x 0,8 см"
  },
  "summary": "6.3″ · Apple A19 · 48 Мп",
  "inStock": true,
  "description": "iPhone 17: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A19. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17e-256-gb",
  "name": "iPhone 17e 256 ГБ",
  "model": "iPhone 17e",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-17e",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 63590,
  "image": "/images/p/iphone-17e/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-17e/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-17e/belyy.webp"
   },
   {
    "name": "Бледно-розовый",
    "image": "/images/p/iphone-17e/bledno-rozovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.1″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1170 x 2532",
   "Процессор": "Apple A19",
   "Основная камера": "48 МП, f/1.6, 26 мм",
   "Фронтальная камера": "12 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Время работы": "до 26 часов воспроизведения видео, до 90 часов воспроизведения музыки",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "169",
   "Размеры": "14,67 x 7,15 x 0,78 см"
  },
  "summary": "6.1″ · Apple A19 · 48 Мп",
  "inStock": true,
  "description": "iPhone 17e: экран 6.1″ Super Retina XDR OLED, 60 Гц, процессор Apple A19. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17e-512-gb",
  "name": "iPhone 17e 512 ГБ",
  "model": "iPhone 17e",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-17e",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 70290,
  "image": "/images/p/iphone-17e/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-17e/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-17e/belyy.webp"
   },
   {
    "name": "Бледно-розовый",
    "image": "/images/p/iphone-17e/bledno-rozovyy.webp",
    "price": 71190
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.1″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1170 x 2532",
   "Процессор": "Apple A19",
   "Основная камера": "48 МП, f/1.6, 26 мм",
   "Фронтальная камера": "12 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Время работы": "до 26 часов воспроизведения видео, до 90 часов воспроизведения музыки",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "169",
   "Размеры": "14,67 x 7,15 x 0,78 см"
  },
  "summary": "6.1″ · Apple A19 · 48 Мп",
  "inStock": true,
  "description": "iPhone 17e: экран 6.1″ Super Retina XDR OLED, 60 Гц, процессор Apple A19. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "galaxy-s26-plus-256-gb",
  "name": "Galaxy S26+ 256 ГБ",
  "model": "Galaxy S26+",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s26-plus",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 74990,
  "image": "/images/p/galaxy-s26-plus/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26-plus/goluboy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-plus/chernyy.webp",
    "price": 76890
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-plus/fioletovyy.webp",
    "price": 76890
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26-plus/belyy.webp",
    "price": 76890
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26-plus/rozovoe-zoloto.webp",
    "price": 79790
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26-plus/serebristyy.webp",
    "price": 79790
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.7″ · Exynos",
  "inStock": true,
  "description": "Galaxy S26+: экран 6.7″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 MP, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s26-plus-512-gb",
  "name": "Galaxy S26+ 512 ГБ",
  "model": "Galaxy S26+",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s26-plus",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 83590,
  "image": "/images/p/galaxy-s26-plus/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-plus/chernyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-plus/fioletovyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26-plus/goluboy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26-plus/belyy.webp"
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26-plus/rozovoe-zoloto.webp",
    "price": 87390
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26-plus/serebristyy.webp",
    "price": 87390
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.7″ · Exynos",
  "inStock": true,
  "description": "Galaxy S26+: экран 6.7″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 MP, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s26-256-gb",
  "name": "Galaxy S26 256 ГБ",
  "model": "Galaxy S26",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s26",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 65490,
  "image": "/images/p/galaxy-s26/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26/chernyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26/goluboy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26/belyy.webp"
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26/rozovoe-zoloto.webp",
    "price": 68390
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26/serebristyy.webp",
    "price": 68390
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4300 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Exynos",
  "inStock": true,
  "description": "Galaxy S26: экран 6.3″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 MP, аккумулятор 4300 мАч."
 },
 {
  "id": "galaxy-s26-512-gb",
  "name": "Galaxy S26 512 ГБ",
  "model": "Galaxy S26",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s26",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 75990,
  "image": "/images/p/galaxy-s26/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26/chernyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s26/goluboy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s26/belyy.webp"
   },
   {
    "name": "Розовое золото",
    "image": "/images/p/galaxy-s26/rozovoe-zoloto.webp",
    "price": 77890
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-s26/serebristyy.webp",
    "price": 77890
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4300 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Exynos",
  "inStock": true,
  "description": "Galaxy S26: экран 6.3″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 MP, аккумулятор 4300 мАч."
 },
 {
  "id": "galaxy-s26-fe-128-gb",
  "name": "Galaxy S26 FE 128 ГБ",
  "model": "Galaxy S26 FE",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-s26-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 49390,
  "image": "/images/p/galaxy-s26-fe/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-fe/fioletovyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-s26-fe/zelenyy.webp",
    "price": 50290
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Процессор": "Exynos 2500",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚",
   "Телефото-камера": "8 МП, f/2.4, 75мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт"
  },
  "summary": "6.7″ · Exynos 2500 · 50 Мп",
  "inStock": true,
  "description": "Galaxy S26 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos 2500. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s26-fe-256-gb",
  "name": "Galaxy S26 FE 256 ГБ",
  "model": "Galaxy S26 FE",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s26-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 53190,
  "image": "/images/p/galaxy-s26-fe/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-s26-fe/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Процессор": "Exynos 2500",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚",
   "Телефото-камера": "8 МП, f/2.4, 75мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт"
  },
  "summary": "6.7″ · Exynos 2500 · 50 Мп",
  "inStock": true,
  "description": "Galaxy S26 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos 2500. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s26-fe-512-gb",
  "name": "Galaxy S26 FE 512 ГБ",
  "model": "Galaxy S26 FE",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s26-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 70290,
  "image": "/images/p/galaxy-s26-fe/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/galaxy-s26-fe/fioletovyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-s26-fe/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s26-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Процессор": "Exynos 2500",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚",
   "Телефото-камера": "8 МП, f/2.4, 75мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт"
  },
  "summary": "6.7″ · Exynos 2500 · 50 Мп",
  "inStock": true,
  "description": "Galaxy S26 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos 2500. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "xiaomi-17-ultra-512-gb",
  "name": "Xiaomi 17 Ultra 512 ГБ",
  "model": "Xiaomi 17 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-17-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 100690,
  "image": "/images/p/xiaomi-17-ultra/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17-ultra/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.9\" OLED (HyperRGB)",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "Leica 50 Мп 1\" + перископ 200 Мп (75–100 мм)",
   "battery": "6000 мА·ч, 90 Вт / 50 Вт беспр."
  },
  "summary": "6.9\" OLED (HyperRGB) · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Камерофлагман Xiaomi с основным сенсором формата 1 дюйм и оптикой Leica. Отличается телеобъективом 200 Мп с переменным фокусным расстоянием 75–100 мм."
 },
 {
  "id": "xiaomi-17-ultra-1-tb",
  "name": "Xiaomi 17 Ultra 1 ТБ",
  "model": "Xiaomi 17 Ultra",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "xiaomi-17-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 112990,
  "image": "/images/p/xiaomi-17-ultra/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17-ultra/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "display": "6.9\" OLED (HyperRGB)",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "Leica 50 Мп 1\" + перископ 200 Мп (75–100 мм)",
   "battery": "6000 мА·ч, 90 Вт / 50 Вт беспр."
  },
  "summary": "6.9\" OLED (HyperRGB) · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Камерофлагман Xiaomi с основным сенсором формата 1 дюйм и оптикой Leica. Отличается телеобъективом 200 Мп с переменным фокусным расстоянием 75–100 мм."
 },
 {
  "id": "xiaomi-17-256-gb",
  "name": "Xiaomi 17 256 ГБ",
  "model": "Xiaomi 17",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-17",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 77890,
  "image": "/images/p/xiaomi-17/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "6.3\" OLED",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "Leica 50 Мп (1/1.31\") + теле 60 мм 50 Мп + ширик 50 Мп",
   "battery": "6330 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.3\" OLED · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Компактный флагман Xiaomi с экраном 6,3 дюйма и тройной камерой Leica. При небольшом корпусе (191 г) получил батарею 6330 мА·ч."
 },
 {
  "id": "xiaomi-17-512-gb",
  "name": "Xiaomi 17 512 ГБ",
  "model": "Xiaomi 17",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-17",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 83590,
  "image": "/images/p/xiaomi-17/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.3\" OLED",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "Leica 50 Мп (1/1.31\") + теле 60 мм 50 Мп + ширик 50 Мп",
   "battery": "6330 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.3\" OLED · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Компактный флагман Xiaomi с экраном 6,3 дюйма и тройной камерой Leica. При небольшом корпусе (191 г) получил батарею 6330 мА·ч."
 },
 {
  "id": "huawei-pura-90s-pro-max-256-gb",
  "name": "Huawei Pura 90s Pro Max 256 ГБ",
  "model": "Huawei Pura 90s Pro Max",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "huawei-pura-90s-pro-max",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 68390,
  "image": "/images/p/huawei-pura-90s-pro-max/oranzhevo-goluboy.webp",
  "colors": [
   {
    "name": "Оранжево-голубой",
    "image": "/images/p/huawei-pura-90s-pro-max/oranzhevo-goluboy.webp"
   },
   {
    "name": "Бежево-фиолетовый",
    "image": "/images/p/huawei-pura-90s-pro-max/bezhevo-fioletovyy.webp"
   },
   {
    "name": "Графитовый чёрный",
    "image": "/images/p/huawei-pura-90s-pro-max/grafitovyy-chernyy.webp"
   },
   {
    "name": "Пудровый розовый",
    "image": "/images/p/huawei-pura-90s-pro-max/pudrovyy-rozovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,9″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1308 x 2880",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.4-4.0, 24 мм, 1/1.28″",
   "Сверхширокоугольная камера": "40 МП, f/2.2, 13 мм",
   "Телефото-камера": "200 МП, f/2.6, 89 мм, 1/1.28″",
   "Фронтальная камера": "13 МП, f/2.0",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,9″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei Pura 90s Pro Max: экран 6,9″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "huawei-pura-90s-pro-max-512-gb",
  "name": "Huawei Pura 90s Pro Max 512 ГБ",
  "model": "Huawei Pura 90s Pro Max",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "huawei-pura-90s-pro-max",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 78790,
  "image": "/images/p/huawei-pura-90s-pro-max/pudrovyy-rozovyy.webp",
  "colors": [
   {
    "name": "Пудровый розовый",
    "image": "/images/p/huawei-pura-90s-pro-max/pudrovyy-rozovyy.webp"
   },
   {
    "name": "Оранжево-голубой",
    "image": "/images/p/huawei-pura-90s-pro-max/oranzhevo-goluboy.webp"
   },
   {
    "name": "Бежево-фиолетовый",
    "image": "/images/p/huawei-pura-90s-pro-max/bezhevo-fioletovyy.webp"
   },
   {
    "name": "Графитовый чёрный",
    "image": "/images/p/huawei-pura-90s-pro-max/grafitovyy-chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,9″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1308 x 2880",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.4-4.0, 24 мм, 1/1.28″",
   "Сверхширокоугольная камера": "40 МП, f/2.2, 13 мм",
   "Телефото-камера": "200 МП, f/2.6, 89 мм, 1/1.28″",
   "Фронтальная камера": "13 МП, f/2.0",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,9″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei Pura 90s Pro Max: экран 6,9″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "huawei-pura-90s-pro-256-gb",
  "name": "Huawei Pura 90s Pro 256 ГБ",
  "model": "Huawei Pura 90s Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "huawei-pura-90s-pro",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 56990,
  "image": "/images/p/huawei-pura-90s-pro/rozovo-zelenyy.webp",
  "colors": [
   {
    "name": "Розово-зелёный",
    "image": "/images/p/huawei-pura-90s-pro/rozovo-zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-pura-90s-pro/chernyy.webp"
   },
   {
    "name": "Оранжевый",
    "image": "/images/p/huawei-pura-90s-pro/oranzhevyy.webp",
    "price": 58890
   },
   {
    "name": "Белый",
    "image": "/images/p/huawei-pura-90s-pro/belyy.webp",
    "price": 58890
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,6″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1256 x 2760",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.4-4.0, 24 мм, 1/1.28″",
   "Сверхширокоугольная камера": "12.5 МП, f/2.2, 13 мм",
   "Телефото-камера": "50 МП, f/2.1, 91 мм",
   "Фронтальная камера": "13 МП, f/2.0",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "66 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,6″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei Pura 90s Pro: экран 6,6″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "huawei-pura-90s-pro-512-gb",
  "name": "Huawei Pura 90s Pro 512 ГБ",
  "model": "Huawei Pura 90s Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "huawei-pura-90s-pro",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 62690,
  "image": "/images/p/huawei-pura-90s-pro/rozovo-zelenyy.webp",
  "colors": [
   {
    "name": "Розово-зелёный",
    "image": "/images/p/huawei-pura-90s-pro/rozovo-zelenyy.webp"
   },
   {
    "name": "Оранжевый",
    "image": "/images/p/huawei-pura-90s-pro/oranzhevyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/huawei-pura-90s-pro/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-pura-90s-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,6″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1256 x 2760",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.4-4.0, 24 мм, 1/1.28″",
   "Сверхширокоугольная камера": "12.5 МП, f/2.2, 13 мм",
   "Телефото-камера": "50 МП, f/2.1, 91 мм",
   "Фронтальная камера": "13 МП, f/2.0",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "66 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,6″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei Pura 90s Pro: экран 6,6″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "honor-magic-v6-512-gb",
  "name": "Honor Magic V6 512 ГБ",
  "model": "Honor Magic V6",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "honor-magic-v6",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 139590,
  "image": "/images/p/honor-magic-v6/krasnyy.webp",
  "colors": [
   {
    "name": "Красный",
    "image": "/images/p/honor-magic-v6/krasnyy.webp"
   },
   {
    "name": "Золотой",
    "image": "/images/p/honor-magic-v6/zolotoy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/honor-magic-v6/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/honor-magic-v6/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.52″; 7.95″",
   "Тип экрана": "LTPO2 OLED; Foldable LTPO2 AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2420; 2172 x 2352",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.6, 23мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "50 МП, f/2.2, 13мм",
   "Фронтальная камера": "20 МП, f/2.2, 0.61µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6660 мАч",
   "Максимальная мощность зарядки": "80 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.52″; 7.95″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Honor Magic V6: экран 6.52″; 7.95″ LTPO2 OLED; Foldable LTPO2 AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6660 мАч, защита IP68/IP69."
 },
 {
  "id": "honor-magic-v6-1-tb",
  "name": "Honor Magic V6 1 ТБ",
  "model": "Honor Magic V6",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "honor-magic-v6",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 150090,
  "image": "/images/p/honor-magic-v6/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/honor-magic-v6/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/honor-magic-v6/chernyy.webp"
   },
   {
    "name": "Красный",
    "image": "/images/p/honor-magic-v6/krasnyy.webp"
   },
   {
    "name": "Золотой",
    "image": "/images/p/honor-magic-v6/zolotoy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.52″; 7.95″",
   "Тип экрана": "LTPO2 OLED; Foldable LTPO2 AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2420; 2172 x 2352",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.6, 23мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "50 МП, f/2.2, 13мм",
   "Фронтальная камера": "20 МП, f/2.2, 0.61µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6660 мАч",
   "Максимальная мощность зарядки": "80 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.52″; 7.95″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Honor Magic V6: экран 6.52″; 7.95″ LTPO2 OLED; Foldable LTPO2 AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6660 мАч, защита IP68/IP69."
 },
 {
  "id": "iphone-17-pro-max-256-gb",
  "name": "iPhone 17 Pro Max 256 ГБ",
  "model": "iPhone 17 Pro Max",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-17-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 104490,
  "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro-max/nasyschennyy-siniy.webp",
    "price": 105390
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro-max/serebristyy.webp",
    "price": 109190
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "233"
  },
  "summary": "6.9″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-max-512-gb",
  "name": "iPhone 17 Pro Max 512 ГБ",
  "model": "iPhone 17 Pro Max",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-17-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 117790,
  "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro-max/nasyschennyy-siniy.webp",
    "price": 120590
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro-max/serebristyy.webp",
    "price": 129190
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "233"
  },
  "summary": "6.9″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-max-1-tb",
  "name": "iPhone 17 Pro Max 1 ТБ",
  "model": "iPhone 17 Pro Max",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-17-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 134890,
  "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro-max/nasyschennyy-siniy.webp",
    "price": 139590
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro-max/serebristyy.webp",
    "price": 141490
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "233"
  },
  "summary": "6.9″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-max-2-tb",
  "name": "iPhone 17 Pro Max 2 ТБ",
  "model": "iPhone 17 Pro Max",
  "variant": "2 ТБ",
  "storage": "2 ТБ",
  "family": "iphone-17-pro-max",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 146290,
  "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro-max/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro-max/nasyschennyy-siniy.webp",
    "price": 150090
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro-max/serebristyy.webp",
    "price": 165290
   }
  ],
  "specs": {
   "Память": "2 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2868",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "233"
  },
  "summary": "6.9″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro Max: экран 6.9″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-256-gb",
  "name": "iPhone 17 Pro 256 ГБ",
  "model": "iPhone 17 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-17-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 98790,
  "image": "/images/p/iphone-17-pro/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro/nasyschennyy-siniy.webp",
    "price": 99690
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro/serebristyy.webp",
    "price": 102590
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "206"
  },
  "summary": "6.3″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-512-gb",
  "name": "iPhone 17 Pro 512 ГБ",
  "model": "iPhone 17 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-17-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 116790,
  "image": "/images/p/iphone-17-pro/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro/serebristyy.webp"
   },
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro/kosmicheskiy-oranzhevyy.webp",
    "price": 117790
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro/nasyschennyy-siniy.webp",
    "price": 120590
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "206"
  },
  "summary": "6.3″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-17-pro-1-tb",
  "name": "iPhone 17 Pro 1 ТБ",
  "model": "iPhone 17 Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "iphone-17-pro",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 131090,
  "image": "/images/p/iphone-17-pro/kosmicheskiy-oranzhevyy.webp",
  "colors": [
   {
    "name": "Космический оранжевый",
    "image": "/images/p/iphone-17-pro/kosmicheskiy-oranzhevyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/iphone-17-pro/nasyschennyy-siniy.webp",
    "price": 132990
   },
   {
    "name": "Серебристый",
    "image": "/images/p/iphone-17-pro/serebristyy.webp",
    "price": 135790
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.3″",
   "Тип экрана": "Super Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1206 x 2622",
   "Процессор": "Apple A19 Pro",
   "Основная камера": "48 МП, f/1.6, 24 мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "48 МП, f/2.2, 13 мм, 120˚, 1/2.55″, 0.7µm",
   "Телефото-камера": "48 МП, f/2.8, 100 мм, 1/2.55″, 0.7µm",
   "Фронтальная камера": "18 МП, f/1.9",
   "Макс. разрешение видео": "4K",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "206"
  },
  "summary": "6.3″ · Apple A19 Pro · 48 Мп",
  "inStock": true,
  "description": "iPhone 17 Pro: экран 6.3″ Super Retina XDR, 120 Гц, процессор Apple A19 Pro. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-16-128-gb",
  "name": "iPhone 16 128 ГБ",
  "model": "iPhone 16",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "iphone-16",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 65490,
  "image": "/images/p/iphone-16/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/iphone-16/belyy.webp"
   },
   {
    "name": "Морская бирюза",
    "image": "/images/p/iphone-16/morskaya-biryuza.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-16/chernyy.webp",
    "price": 66490
   },
   {
    "name": "Ультрамарин",
    "image": "/images/p/iphone-16/ultramarin.webp",
    "price": 67390
   },
   {
    "name": "Розовый",
    "image": "/images/p/iphone-16/rozovyy.webp",
    "price": 68390
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.1″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1179 x 2556",
   "Процессор": "Apple A18",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 0.7µm",
   "Фронтальная камера": "12 МП, f/1.9, 23 мм, 1/3.6″",
   "Макс. разрешение видео": "4K",
   "Время работы": "Воспроизведение видео до 22 часов, воспроизведение аудио до 80 часов",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "170"
  },
  "summary": "6.1″ · Apple A18 · 48 Мп",
  "inStock": true,
  "description": "iPhone 16: экран 6.1″ Super Retina XDR OLED, 60 Гц, процессор Apple A18. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-16-256-gb",
  "name": "iPhone 16 256 ГБ",
  "model": "iPhone 16",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "iphone-16",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 79790,
  "image": "/images/p/iphone-16/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-16/chernyy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/iphone-16/rozovyy.webp"
   },
   {
    "name": "Морская бирюза",
    "image": "/images/p/iphone-16/morskaya-biryuza.webp",
    "price": 80690
   },
   {
    "name": "Ультрамарин",
    "image": "/images/p/iphone-16/ultramarin.webp",
    "price": 81690
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-16/belyy.webp",
    "price": 82590
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.1″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1179 x 2556",
   "Процессор": "Apple A18",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 0.7µm",
   "Фронтальная камера": "12 МП, f/1.9, 23 мм, 1/3.6″",
   "Макс. разрешение видео": "4K",
   "Время работы": "Воспроизведение видео до 22 часов, воспроизведение аудио до 80 часов",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "170"
  },
  "summary": "6.1″ · Apple A18 · 48 Мп",
  "inStock": true,
  "description": "iPhone 16: экран 6.1″ Super Retina XDR OLED, 60 Гц, процессор Apple A18. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "iphone-16-512-gb",
  "name": "iPhone 16 512 ГБ",
  "model": "iPhone 16",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "iphone-16",
  "brand": "Apple",
  "category": "Смартфоны",
  "price": 106390,
  "image": "/images/p/iphone-16/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/iphone-16/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/iphone-16/belyy.webp"
   },
   {
    "name": "Ультрамарин",
    "image": "/images/p/iphone-16/ultramarin.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/iphone-16/rozovyy.webp"
   },
   {
    "name": "Морская бирюза",
    "image": "/images/p/iphone-16/morskaya-biryuza.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.1″",
   "Тип экрана": "Super Retina XDR OLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1179 x 2556",
   "Процессор": "Apple A18",
   "Основная камера": "48 МП, f/1.6, 26 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 0.7µm",
   "Фронтальная камера": "12 МП, f/1.9, 23 мм, 1/3.6″",
   "Макс. разрешение видео": "4K",
   "Время работы": "Воспроизведение видео до 22 часов, воспроизведение аудио до 80 часов",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий",
   "Вес, г": "170"
  },
  "summary": "6.1″ · Apple A18 · 48 Мп",
  "inStock": true,
  "description": "iPhone 16: экран 6.1″ Super Retina XDR OLED, 60 Гц, процессор Apple A18. Основная камера 48 МП, защита IP68."
 },
 {
  "id": "galaxy-s25-edge-256-gb",
  "name": "Galaxy S25 Edge 256 ГБ",
  "model": "Galaxy S25 Edge",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s25-edge",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 53190,
  "image": "/images/p/galaxy-s25-edge/ugolno-chernyy-titan.webp",
  "colors": [
   {
    "name": "Угольно-чёрный титан",
    "image": "/images/p/galaxy-s25-edge/ugolno-chernyy-titan.webp"
   },
   {
    "name": "Голубой титан",
    "image": "/images/p/galaxy-s25-edge/goluboy-titan.webp"
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-s25-edge/serebryanyy-titan.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 1/2.55″, 1.4µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "3900 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.7″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S25 Edge: экран 6.7″ AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 3900 мАч, защита IP68."
 },
 {
  "id": "galaxy-s25-edge-512-gb",
  "name": "Galaxy S25 Edge 512 ГБ",
  "model": "Galaxy S25 Edge",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s25-edge",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 66490,
  "image": "/images/p/galaxy-s25-edge/ugolno-chernyy-titan.webp",
  "colors": [
   {
    "name": "Угольно-чёрный титан",
    "image": "/images/p/galaxy-s25-edge/ugolno-chernyy-titan.webp"
   },
   {
    "name": "Голубой титан",
    "image": "/images/p/galaxy-s25-edge/goluboy-titan.webp"
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-s25-edge/serebryanyy-titan.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 1/2.55″, 1.4µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "3900 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.7″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S25 Edge: экран 6.7″ AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 3900 мАч, защита IP68."
 },
 {
  "id": "galaxy-s25-ultra-256-gb",
  "name": "Galaxy S25 Ultra 256 ГБ",
  "model": "Galaxy S25 Ultra",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s25-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 71190,
  "image": "/images/p/galaxy-s25-ultra/siniy-titan.webp",
  "colors": [
   {
    "name": "Синий титан",
    "image": "/images/p/galaxy-s25-ultra/siniy-titan.webp"
   },
   {
    "name": "Серый титан",
    "image": "/images/p/galaxy-s25-ultra/seryy-titan.webp"
   },
   {
    "name": "Чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/chernyy-titan.webp"
   },
   {
    "name": "Угольно-чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/ugolno-chernyy-titan.webp",
    "price": 73090
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-s25-ultra/serebryanyy-titan.webp",
    "price": 74090
   },
   {
    "name": "Зелёный титан",
    "image": "/images/p/galaxy-s25-ultra/zelenyy-titan.webp",
    "price": 74990
   },
   {
    "name": "Розовый титан",
    "image": "/images/p/galaxy-s25-ultra/rozovyy-titan.webp",
    "price": 74990
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.52″, 1.12µm,",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S25 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-s25-ultra-512-gb",
  "name": "Galaxy S25 Ultra 512 ГБ",
  "model": "Galaxy S25 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s25-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 77890,
  "image": "/images/p/galaxy-s25-ultra/seryy-titan.webp",
  "colors": [
   {
    "name": "Серый титан",
    "image": "/images/p/galaxy-s25-ultra/seryy-titan.webp"
   },
   {
    "name": "Чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/chernyy-titan.webp"
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-s25-ultra/serebryanyy-titan.webp"
   },
   {
    "name": "Синий титан",
    "image": "/images/p/galaxy-s25-ultra/siniy-titan.webp"
   },
   {
    "name": "Угольно-чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/ugolno-chernyy-titan.webp",
    "price": 81690
   },
   {
    "name": "Зелёный титан",
    "image": "/images/p/galaxy-s25-ultra/zelenyy-titan.webp",
    "price": 85490
   },
   {
    "name": "Розовый титан",
    "image": "/images/p/galaxy-s25-ultra/rozovyy-titan.webp",
    "price": 85490
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.52″, 1.12µm,",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S25 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-s25-ultra-1-tb",
  "name": "Galaxy S25 Ultra 1 ТБ",
  "model": "Galaxy S25 Ultra",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "galaxy-s25-ultra",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 86390,
  "image": "/images/p/galaxy-s25-ultra/ugolno-chernyy-titan.webp",
  "colors": [
   {
    "name": "Угольно-чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/ugolno-chernyy-titan.webp"
   },
   {
    "name": "Синий титан",
    "image": "/images/p/galaxy-s25-ultra/siniy-titan.webp"
   },
   {
    "name": "Серый титан",
    "image": "/images/p/galaxy-s25-ultra/seryy-titan.webp"
   },
   {
    "name": "Чёрный титан",
    "image": "/images/p/galaxy-s25-ultra/chernyy-titan.webp"
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-s25-ultra/serebryanyy-titan.webp"
   },
   {
    "name": "Зелёный титан",
    "image": "/images/p/galaxy-s25-ultra/zelenyy-titan.webp",
    "price": 92090
   },
   {
    "name": "Розовый титан",
    "image": "/images/p/galaxy-s25-ultra/rozovyy-titan.webp",
    "price": 92090
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.9″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1440 x 3120",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.7, 24 мм, 1/1.3″, 0.6µm",
   "Сверхширокоугольная камера": "50 МП, f/1.9, 120˚, 0.7µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.52″, 1.12µm,",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.9″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Galaxy S25 Ultra: экран 6.9″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 5000 мАч."
 },
 {
  "id": "galaxy-s25-fe-128-gb",
  "name": "Galaxy S25 FE 128 ГБ",
  "model": "Galaxy S25 FE",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-s25-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 40290,
  "image": "/images/p/galaxy-s25-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25-fe/goluboy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25-fe/siniy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s25-fe/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 123˚, 1/3.0″, 1.12µm",
   "Телефото-камера": "8 МП, f/2.4, 75 мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "есть"
  },
  "summary": "6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy S25 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s25-fe-256-gb",
  "name": "Galaxy S25 FE 256 ГБ",
  "model": "Galaxy S25 FE",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s25-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 46490,
  "image": "/images/p/galaxy-s25-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25-fe/goluboy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25-fe/siniy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s25-fe/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 123˚, 1/3.0″, 1.12µm",
   "Телефото-камера": "8 МП, f/2.4, 75 мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "есть"
  },
  "summary": "6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy S25 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s25-fe-512-gb",
  "name": "Galaxy S25 FE 512 ГБ",
  "model": "Galaxy S25 FE",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s25-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 54090,
  "image": "/images/p/galaxy-s25-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25-fe/goluboy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25-fe/siniy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-s25-fe/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.57″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 123˚, 1/3.0″, 1.12µm",
   "Телефото-камера": "8 МП, f/2.4, 75 мм, 1/4.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4900 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "есть"
  },
  "summary": "6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy S25 FE: экран 6.7″ Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4900 мАч."
 },
 {
  "id": "galaxy-s25-128-gb",
  "name": "Galaxy S25 128 ГБ",
  "model": "Galaxy S25",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-s25",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 51290,
  "image": "/images/p/galaxy-s25/siniy.webp",
  "colors": [
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25/siniy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25/goluboy.webp"
   },
   {
    "name": "Мятный",
    "image": "/images/p/galaxy-s25/myatnyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25/chernyy.webp",
    "price": 54090
   },
   {
    "name": "Коралловый",
    "image": "/images/p/galaxy-s25/korallovyy.webp",
    "price": 54090
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-s25/rozovyy.webp",
    "price": 54090
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-s25/seryy.webp",
    "price": 54090
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.2″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4000 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.2″ · Snapdragon",
  "inStock": true,
  "description": "Galaxy S25: экран 6.2″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 50 MP, аккумулятор 4000 мАч."
 },
 {
  "id": "galaxy-s25-256-gb",
  "name": "Galaxy S25 256 ГБ",
  "model": "Galaxy S25",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-s25",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 55090,
  "image": "/images/p/galaxy-s25/siniy.webp",
  "colors": [
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25/siniy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25/goluboy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-s25/seryy.webp"
   },
   {
    "name": "Мятный",
    "image": "/images/p/galaxy-s25/myatnyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25/chernyy.webp",
    "price": 56990
   },
   {
    "name": "Коралловый",
    "image": "/images/p/galaxy-s25/korallovyy.webp",
    "price": 58890
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-s25/rozovyy.webp",
    "price": 58890
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.2″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4000 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.2″ · Snapdragon",
  "inStock": true,
  "description": "Galaxy S25: экран 6.2″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 50 MP, аккумулятор 4000 мАч."
 },
 {
  "id": "galaxy-s25-512-gb",
  "name": "Galaxy S25 512 ГБ",
  "model": "Galaxy S25",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-s25",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 65490,
  "image": "/images/p/galaxy-s25/siniy.webp",
  "colors": [
   {
    "name": "Синий",
    "image": "/images/p/galaxy-s25/siniy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-s25/goluboy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-s25/seryy.webp"
   },
   {
    "name": "Мятный",
    "image": "/images/p/galaxy-s25/myatnyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-s25/chernyy.webp",
    "price": 67390
   },
   {
    "name": "Коралловый",
    "image": "/images/p/galaxy-s25/korallovyy.webp",
    "price": 67390
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-s25/rozovyy.webp",
    "price": 67390
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.2″",
   "Тип экрана": "Dynamic LTPO AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 MP, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 13 мм, 120˚, 1/2.55″ 1.4µm",
   "Телефото-камера": "10 МП, f/2.4, 67 мм, 1/3.94″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.2, 26 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4000 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.2″ · Snapdragon",
  "inStock": true,
  "description": "Galaxy S25: экран 6.2″ Dynamic LTPO AMOLED 2X, 120 Гц, процессор Snapdragon. Основная камера 50 MP, аккумулятор 4000 мАч."
 },
 {
  "id": "galaxy-z-flip7-fe-128-gb",
  "name": "Galaxy Z Flip7 FE 128 ГБ",
  "model": "Galaxy Z Flip7 FE",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-z-flip7-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 56990,
  "image": "/images/p/galaxy-z-flip7-fe/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/galaxy-z-flip7-fe/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-z-flip7-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "3.4″; 6.7″",
   "Тип экрана": "Super AMOLED; Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "720 x 748; 1080 x 2640",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 23 мм, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚ , 1.12µm",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1.22µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "4000 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP48"
  },
  "summary": "3.4″; 6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy Z Flip7 FE: экран 3.4″; 6.7″ Super AMOLED; Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4000 мАч, защита IP48."
 },
 {
  "id": "galaxy-z-flip7-fe-256-gb",
  "name": "Galaxy Z Flip7 FE 256 ГБ",
  "model": "Galaxy Z Flip7 FE",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-z-flip7-fe",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 62690,
  "image": "/images/p/galaxy-z-flip7-fe/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/galaxy-z-flip7-fe/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-z-flip7-fe/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "3.4″; 6.7″",
   "Тип экрана": "Super AMOLED; Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "720 x 748; 1080 x 2640",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 23 мм, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚ , 1.12µm",
   "Фронтальная камера": "10 МП, f/2.2, 23 мм, 1.22µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "4000 мАч",
   "Максимальная мощность зарядки": "25 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP48"
  },
  "summary": "3.4″; 6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy Z Flip7 FE: экран 3.4″; 6.7″ Super AMOLED; Dynamic AMOLED 2X, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 4000 мАч, защита IP48."
 },
 {
  "id": "galaxy-a56-128-gb",
  "name": "Galaxy A56 128 ГБ",
  "model": "Galaxy A56",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-a56",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 28490,
  "image": "/images/p/galaxy-a56/rozovyy.webp",
  "colors": [
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-a56/rozovyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-a56/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a56/chernyy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-a56/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚, 1/3.06″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP67"
  },
  "summary": "6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy A56: экран 6.7″ Super AMOLED, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP67."
 },
 {
  "id": "galaxy-a56-256-gb",
  "name": "Galaxy A56 256 ГБ",
  "model": "Galaxy A56",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-a56",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 31790,
  "image": "/images/p/galaxy-a56/rozovyy.webp",
  "colors": [
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-a56/rozovyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-a56/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a56/chernyy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-a56/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 123˚, 1/3.06″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP67"
  },
  "summary": "6.7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy A56: экран 6.7″ Super AMOLED, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP67."
 },
 {
  "id": "galaxy-a36-256-gb",
  "name": "Galaxy A36 256 ГБ",
  "model": "Galaxy A36",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-a36",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 26090,
  "image": "/images/p/galaxy-a36/laym.webp",
  "colors": [
   {
    "name": "Лайм",
    "image": "/images/p/galaxy-a36/laym.webp"
   },
   {
    "name": "Лаванда",
    "image": "/images/p/galaxy-a36/lavanda.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-a36/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a36/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 1/1.96″",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 123˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5000 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP67"
  },
  "summary": "6.7″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Galaxy A36: экран 6.7″ Super AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP67."
 },
 {
  "id": "pixel-10-pro-128-gb",
  "name": "Pixel 10 Pro 128 ГБ",
  "model": "Pixel 10 Pro",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "pixel-10-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 68390,
  "image": "/images/p/pixel-10-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10-pro/chernyy.webp"
   },
   {
    "name": "Лунный серый",
    "image": "/images/p/pixel-10-pro/lunnyy-seryy.webp",
    "price": 72190
   },
   {
    "name": "Светло-кремовый",
    "image": "/images/p/pixel-10-pro/svetlo-kremovyy.webp",
    "price": 72190
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.55″",
   "Телефото-камера": "48 МП, f/2.8, 113 мм, 1/2.55″",
   "Фронтальная камера": "42 МП, f/2.2, 17 мм",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4870 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 10 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4870 мАч."
 },
 {
  "id": "pixel-10-pro-256-gb",
  "name": "Pixel 10 Pro 256 ГБ",
  "model": "Pixel 10 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-10-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 90190,
  "image": "/images/p/pixel-10-pro/lunnyy-seryy.webp",
  "colors": [
   {
    "name": "Лунный серый",
    "image": "/images/p/pixel-10-pro/lunnyy-seryy.webp"
   },
   {
    "name": "Жадеитовый",
    "image": "/images/p/pixel-10-pro/zhadeitovyy.webp"
   },
   {
    "name": "Светло-кремовый",
    "image": "/images/p/pixel-10-pro/svetlo-kremovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.55″",
   "Телефото-камера": "48 МП, f/2.8, 113 мм, 1/2.55″",
   "Фронтальная камера": "42 МП, f/2.2, 17 мм",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4870 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 10 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4870 мАч."
 },
 {
  "id": "pixel-10-pro-512-gb",
  "name": "Pixel 10 Pro 512 ГБ",
  "model": "Pixel 10 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "pixel-10-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 102590,
  "image": "/images/p/pixel-10-pro/lunnyy-seryy.webp",
  "colors": [
   {
    "name": "Лунный серый",
    "image": "/images/p/pixel-10-pro/lunnyy-seryy.webp"
   },
   {
    "name": "Светло-кремовый",
    "image": "/images/p/pixel-10-pro/svetlo-kremovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.55″",
   "Телефото-камера": "48 МП, f/2.8, 113 мм, 1/2.55″",
   "Фронтальная камера": "42 МП, f/2.2, 17 мм",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4870 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 10 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4870 мАч."
 },
 {
  "id": "pixel-10-pro-1-tb",
  "name": "Pixel 10 Pro 1 ТБ",
  "model": "Pixel 10 Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "pixel-10-pro",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 121590,
  "image": "/images/p/pixel-10-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.3″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2856",
   "Система на чипе (SoC)": "Google Tensor",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 25 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "48 МП, f/1.7, 123˚, 1/2.55″",
   "Телефото-камера": "48 МП, f/2.8, 113 мм, 1/2.55″",
   "Фронтальная камера": "42 МП, f/2.2, 17 мм",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "4870 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.3″ · Google Tensor · 50 Мп",
  "inStock": true,
  "description": "Pixel 10 Pro: экран 6.3″ OLED, 120 Гц, процессор Google Tensor. Основная камера 50 МП, аккумулятор 4870 мАч."
 },
 {
  "id": "pixel-10a-128-gb",
  "name": "Pixel 10a 128 ГБ",
  "model": "Pixel 10a",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "pixel-10a",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 41790,
  "image": "/images/p/pixel-10a/lavandovyy.webp",
  "colors": [
   {
    "name": "Лавандовый",
    "image": "/images/p/pixel-10a/lavandovyy.webp"
   },
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-10a/tumannyy-sero-goluboy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10a/chernyy.webp"
   },
   {
    "name": "Малиновый",
    "image": "/images/p/pixel-10a/malinovyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "P-OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2424",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "48 МП, f/1.7, 25 мм, 1/2.0″, 0.8µ",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 120˚, 1/3.1″, 1.12µm",
   "Фронтальная камера": "13 МП, f/2.2, 20 мм, 1/3.1″, 1.12µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5100 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий"
  },
  "summary": "6.3″ · 48 Мп",
  "inStock": true,
  "description": "Pixel 10a: экран 6.3″ P-OLED, 120 Гц. Основная камера 48 МП, аккумулятор 5100 мАч, защита IP68."
 },
 {
  "id": "pixel-10a-256-gb",
  "name": "Pixel 10a 256 ГБ",
  "model": "Pixel 10a",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "pixel-10a",
  "brand": "Google",
  "category": "Смартфоны",
  "price": 47490,
  "image": "/images/p/pixel-10a/lavandovyy.webp",
  "colors": [
   {
    "name": "Лавандовый",
    "image": "/images/p/pixel-10a/lavandovyy.webp"
   },
   {
    "name": "Туманный серо-голубой",
    "image": "/images/p/pixel-10a/tumannyy-sero-goluboy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/pixel-10a/chernyy.webp"
   },
   {
    "name": "Малиновый",
    "image": "/images/p/pixel-10a/malinovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.3″",
   "Тип экрана": "P-OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2424",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "48 МП, f/1.7, 25 мм, 1/2.0″, 0.8µ",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 120˚, 1/3.1″, 1.12µm",
   "Фронтальная камера": "13 МП, f/2.2, 20 мм, 1/3.1″, 1.12µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5100 мАч",
   "Максимальная мощность зарядки": "30 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Алюминий"
  },
  "summary": "6.3″ · 48 Мп",
  "inStock": true,
  "description": "Pixel 10a: экран 6.3″ P-OLED, 120 Гц. Основная камера 48 МП, аккумулятор 5100 мАч, защита IP68."
 },
 {
  "id": "xiaomi-15-256-gb",
  "name": "Xiaomi 15 256 ГБ",
  "model": "Xiaomi 15",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-15",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 55090,
  "image": "/images/p/xiaomi-15/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/xiaomi-15/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/xiaomi-15/belyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.36″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1200 x 2670",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.2, 14 мм, 115˚, 1/2.76″, 0.64µm",
   "Телефото-камера": "50 МП, f/2.0, 60 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.0, 21 мм, 0.7µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5240 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.36″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15: экран 6.36″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 5240 мАч."
 },
 {
  "id": "xiaomi-15-512-gb",
  "name": "Xiaomi 15 512 ГБ",
  "model": "Xiaomi 15",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-15",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 61690,
  "image": "/images/p/xiaomi-15/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/xiaomi-15/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/xiaomi-15/belyy.webp"
   },
   {
    "name": "Жидкое серебро",
    "image": "/images/p/xiaomi-15/zhidkoe-serebro.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.36″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1200 x 2670",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.2, 14 мм, 115˚, 1/2.76″, 0.64µm",
   "Телефото-камера": "50 МП, f/2.0, 60 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.0, 21 мм, 0.7µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5240 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.36″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15: экран 6.36″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 5240 мАч."
 },
 {
  "id": "xiaomi-15t-256-gb",
  "name": "Xiaomi 15T 256 ГБ",
  "model": "Xiaomi 15T",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-15t",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 42190,
  "image": "/images/p/xiaomi-15t/rozovoe-zoloto.webp",
  "colors": [
   {
    "name": "Розовое золото",
    "image": "/images/p/xiaomi-15t/rozovoe-zoloto.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-15t/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15t/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Система на чипе (SoC)": "Mediatek",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.7, 23 мм, 1/1.55″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 15 мм, 120˚, 1/3.06″, 1.12µm",
   "Телефото-камера": "50 МП, f/1.9, 46 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5500 мАч",
   "Максимальная мощность зарядки": "67 Вт",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Mediatek · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15T: экран 6.83″ AMOLED, 120 Гц, процессор Mediatek. Основная камера 50 МП, аккумулятор 5500 мАч, защита IP68."
 },
 {
  "id": "xiaomi-15t-512-gb",
  "name": "Xiaomi 15T 512 ГБ",
  "model": "Xiaomi 15T",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-15t",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 46490,
  "image": "/images/p/xiaomi-15t/rozovoe-zoloto.webp",
  "colors": [
   {
    "name": "Розовое золото",
    "image": "/images/p/xiaomi-15t/rozovoe-zoloto.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-15t/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15t/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Система на чипе (SoC)": "Mediatek",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.7, 23 мм, 1/1.55″, 1.0µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 15 мм, 120˚, 1/3.06″, 1.12µm",
   "Телефото-камера": "50 МП, f/1.9, 46 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5500 мАч",
   "Максимальная мощность зарядки": "67 Вт",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Mediatek · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15T: экран 6.83″ AMOLED, 120 Гц, процессор Mediatek. Основная камера 50 МП, аккумулятор 5500 мАч, защита IP68."
 },
 {
  "id": "xiaomi-15t-pro-256-gb",
  "name": "Xiaomi 15T Pro 256 ГБ",
  "model": "Xiaomi 15T Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-15t-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 55090,
  "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp",
  "colors": [
   {
    "name": "Золотой мокко",
    "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-15t-pro/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15t-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Система на чипе (SoC)": "Mediatek",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 15 мм, 120˚, 1/3.06″, 1.12µm",
   "Телефото-камера": "50 МП, f/3.0, 115 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5500 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.83″ · Mediatek · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15T Pro: экран 6.83″ AMOLED, 144 Гц, процессор Mediatek. Основная камера 50 МП, аккумулятор 5500 мАч."
 },
 {
  "id": "xiaomi-15t-pro-512-gb",
  "name": "Xiaomi 15T Pro 512 ГБ",
  "model": "Xiaomi 15T Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-15t-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 58890,
  "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp",
  "colors": [
   {
    "name": "Золотой мокко",
    "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-15t-pro/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15t-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Система на чипе (SoC)": "Mediatek",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 15 мм, 120˚, 1/3.06″, 1.12µm",
   "Телефото-камера": "50 МП, f/3.0, 115 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5500 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.83″ · Mediatek · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15T Pro: экран 6.83″ AMOLED, 144 Гц, процессор Mediatek. Основная камера 50 МП, аккумулятор 5500 мАч."
 },
 {
  "id": "xiaomi-15t-pro-1-tb",
  "name": "Xiaomi 15T Pro 1 ТБ",
  "model": "Xiaomi 15T Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "xiaomi-15t-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 67390,
  "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp",
  "colors": [
   {
    "name": "Золотой мокко",
    "image": "/images/p/xiaomi-15t-pro/zolotoy-mokko.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-15t-pro/seryy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-15t-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Система на чипе (SoC)": "Mediatek",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 15 мм, 120˚, 1/3.06″, 1.12µm",
   "Телефото-камера": "50 МП, f/3.0, 115 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "5500 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.83″ · Mediatek · 50 Мп",
  "inStock": true,
  "description": "Xiaomi 15T Pro: экран 6.83″ AMOLED, 144 Гц, процессор Mediatek. Основная камера 50 МП, аккумулятор 5500 мАч."
 },
 {
  "id": "poco-f8-ultra-256-gb",
  "name": "POCO F8 Ultra 256 ГБ",
  "model": "POCO F8 Ultra",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "poco-f8-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 55090,
  "image": "/images/p/poco-f8-ultra/siniy-denim.webp",
  "colors": [
   {
    "name": "Синий деним",
    "image": "/images/p/poco-f8-ultra/siniy-denim.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f8-ultra/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,9″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1200 x 2608",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.7, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.4, 18 мм, 102˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "50 МП, f/3.0, 115 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6500 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,9″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "POCO F8 Ultra: экран 6,9″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6500 мАч."
 },
 {
  "id": "poco-f8-ultra-512-gb",
  "name": "POCO F8 Ultra 512 ГБ",
  "model": "POCO F8 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "poco-f8-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 65490,
  "image": "/images/p/poco-f8-ultra/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f8-ultra/chernyy.webp"
   },
   {
    "name": "Синий деним",
    "image": "/images/p/poco-f8-ultra/siniy-denim.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,9″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1200 x 2608",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.7, 23 мм, 1/1.31″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.4, 18 мм, 102˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "50 МП, f/3.0, 115 мм, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.2, 21 мм, 1/3.44″, 0.64µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6500 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,9″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "POCO F8 Ultra: экран 6,9″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6500 мАч."
 },
 {
  "id": "poco-f8-pro-256-gb",
  "name": "POCO F8 Pro 256 ГБ",
  "model": "POCO F8 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "poco-f8-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 42690,
  "image": "/images/p/poco-f8-pro/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/poco-f8-pro/goluboy.webp"
   },
   {
    "name": "Серый титан",
    "image": "/images/p/poco-f8-pro/seryy-titan.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f8-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,59″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1156 x 2510",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.9, 24 мм, 1/1.55″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15 мм, 120˚, 1/4.0″, 1.12µm",
   "Телефото-камера": "50 МП, f/2.2, 60 мм, 1/2.88″, 0.61µm",
   "Фронтальная камера": "20 МП, f/2.2, 21 мм, 1/4.0″, 0.7µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6210 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6,59″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "POCO F8 Pro: экран 6,59″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6210 мАч, защита IP68."
 },
 {
  "id": "poco-f8-pro-512-gb",
  "name": "POCO F8 Pro 512 ГБ",
  "model": "POCO F8 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "poco-f8-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 47490,
  "image": "/images/p/poco-f8-pro/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/poco-f8-pro/goluboy.webp"
   },
   {
    "name": "Серый титан",
    "image": "/images/p/poco-f8-pro/seryy-titan.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f8-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,59″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1156 x 2510",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.9, 24 мм, 1/1.55″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15 мм, 120˚, 1/4.0″, 1.12µm",
   "Телефото-камера": "50 МП, f/2.2, 60 мм, 1/2.88″, 0.61µm",
   "Фронтальная камера": "20 МП, f/2.2, 21 мм, 1/4.0″, 0.7µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6210 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6,59″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "POCO F8 Pro: экран 6,59″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 6210 мАч, защита IP68."
 },
 {
  "id": "poco-x7-pro-256-gb",
  "name": "POCO X7 Pro 256 ГБ",
  "model": "POCO X7 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "poco-x7-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 29390,
  "image": "/images/p/poco-x7-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-x7-pro/chernyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/poco-x7-pro/zelenyy.webp"
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/poco-x7-pro/zheltyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.67″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1220 x 2712",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.5, 26 мм, 1/1.95″, 0.8µ",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15 мм, 1/4.0″, 1.12µm",
   "Фронтальная камера": "20 МП, f/2.2, 25 мм, 1/4.0″, 0.7µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Класс водонепроницаемости": "IP69",
   "Материал корпуса": "Пластик",
   "Вес, г": "195"
  },
  "summary": "6.67″ · 50 Мп",
  "inStock": true,
  "description": "POCO X7 Pro: экран 6.67″ AMOLED, 120 Гц. Основная камера 50 МП, аккумулятор 6000 мАч, защита IP69."
 },
 {
  "id": "poco-x7-pro-512-gb",
  "name": "POCO X7 Pro 512 ГБ",
  "model": "POCO X7 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "poco-x7-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 33190,
  "image": "/images/p/poco-x7-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-x7-pro/chernyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/poco-x7-pro/zelenyy.webp"
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/poco-x7-pro/zheltyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.67″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1220 x 2712",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.5, 26 мм, 1/1.95″, 0.8µ",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15 мм, 1/4.0″, 1.12µm",
   "Фронтальная камера": "20 МП, f/2.2, 25 мм, 1/4.0″, 0.7µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Класс водонепроницаемости": "IP69",
   "Материал корпуса": "Пластик",
   "Вес, г": "195"
  },
  "summary": "6.67″ · 50 Мп",
  "inStock": true,
  "description": "POCO X7 Pro: экран 6.67″ AMOLED, 120 Гц. Основная камера 50 МП, аккумулятор 6000 мАч, защита IP69."
 },
 {
  "id": "oneplus-15-256-gb",
  "name": "OnePlus 15 256 ГБ",
  "model": "OnePlus 15",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "oneplus-15",
  "brand": "OnePlus",
  "category": "Смартфоны",
  "price": 75990,
  "image": "/images/p/oneplus-15/beskonechno-chernyy.webp",
  "colors": [
   {
    "name": "Бесконечно чёрный",
    "image": "/images/p/oneplus-15/beskonechno-chernyy.webp"
   },
   {
    "name": "Песчаная буря",
    "image": "/images/p/oneplus-15/peschanaya-burya.webp",
    "price": 76890
   },
   {
    "name": "Ультрафиолет",
    "image": "/images/p/oneplus-15/ultrafiolet.webp",
    "price": 76890
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.78″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "165 Гц",
   "Разрешение экрана": "1272 x 2772",
   "Система на чипе (SoC)": "Qualcomm",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.56″, 1.0µm,",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 16 мм, 116˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "50 мП, f/2.8, 80 мм , 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.4, 21 мм, 1/2.74″, 0.8µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "7300 мАч",
   "Максимальная мощность зарядки": "120 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.78″ · Qualcomm · 50 Мп",
  "inStock": true,
  "description": "OnePlus 15: экран 6.78″ AMOLED, 165 Гц, процессор Qualcomm. Основная камера 50 МП, аккумулятор 7300 мАч."
 },
 {
  "id": "oneplus-15-512-gb",
  "name": "OnePlus 15 512 ГБ",
  "model": "OnePlus 15",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "oneplus-15",
  "brand": "OnePlus",
  "category": "Смартфоны",
  "price": 86390,
  "image": "/images/p/oneplus-15/beskonechno-chernyy.webp",
  "colors": [
   {
    "name": "Бесконечно чёрный",
    "image": "/images/p/oneplus-15/beskonechno-chernyy.webp"
   },
   {
    "name": "Ультрафиолет",
    "image": "/images/p/oneplus-15/ultrafiolet.webp"
   },
   {
    "name": "Песчаная буря",
    "image": "/images/p/oneplus-15/peschanaya-burya.webp",
    "price": 88290
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.78″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "165 Гц",
   "Разрешение экрана": "1272 x 2772",
   "Система на чипе (SoC)": "Qualcomm",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.56″, 1.0µm,",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 16 мм, 116˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "50 мП, f/2.8, 80 мм , 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 МП, f/2.4, 21 мм, 1/2.74″, 0.8µm",
   "Макс. разрешение видео": "8K",
   "Ёмкость аккумулятора": "7300 мАч",
   "Максимальная мощность зарядки": "120 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.78″ · Qualcomm · 50 Мп",
  "inStock": true,
  "description": "OnePlus 15: экран 6.78″ AMOLED, 165 Гц, процессор Qualcomm. Основная камера 50 МП, аккумулятор 7300 мАч."
 },
 {
  "id": "oneplus-15r-256-gb",
  "name": "OnePlus 15R 256 ГБ",
  "model": "OnePlus 15R",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "oneplus-15r",
  "brand": "OnePlus",
  "category": "Смартфоны",
  "price": 52190,
  "image": "/images/p/oneplus-15r/myatnyy-briz.webp",
  "colors": [
   {
    "name": "Мятный бриз",
    "image": "/images/p/oneplus-15r/myatnyy-briz.webp"
   },
   {
    "name": "Угольно-чёрный",
    "image": "/images/p/oneplus-15r/ugolno-chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "165 Гц",
   "Разрешение экрана": "1272 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 16 мм, 112˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.0, 25 мм",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "7400 мАч",
   "Максимальная мощность зарядки": "80 Вт",
   "Класс водонепроницаемости": "IP68/IP69K",
   "Материал корпуса": "Алюминий"
  },
  "summary": "6,83″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "OnePlus 15R: экран 6,83″ AMOLED, 165 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 7400 мАч, защита IP68/IP69K."
 },
 {
  "id": "oneplus-15r-512-gb",
  "name": "OnePlus 15R 512 ГБ",
  "model": "OnePlus 15R",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "oneplus-15r",
  "brand": "OnePlus",
  "category": "Смартфоны",
  "price": 61690,
  "image": "/images/p/oneplus-15r/myatnyy-briz.webp",
  "colors": [
   {
    "name": "Мятный бриз",
    "image": "/images/p/oneplus-15r/myatnyy-briz.webp"
   },
   {
    "name": "Угольно-чёрный",
    "image": "/images/p/oneplus-15r/ugolno-chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "165 Гц",
   "Разрешение экрана": "1272 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 16 мм, 112˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.0, 25 мм",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "7400 мАч",
   "Максимальная мощность зарядки": "80 Вт",
   "Класс водонепроницаемости": "IP68/IP69K",
   "Материал корпуса": "Алюминий"
  },
  "summary": "6,83″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "OnePlus 15R: экран 6,83″ AMOLED, 165 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 7400 мАч, защита IP68/IP69K."
 },
 {
  "id": "nothing-phone-3-256-gb",
  "name": "Nothing Phone (3) 256 ГБ",
  "model": "Nothing Phone (3)",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "nothing-phone-3",
  "brand": "Nothing",
  "category": "Смартфоны",
  "price": 43690,
  "image": "/images/p/nothing-phone-3/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/nothing-phone-3/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/nothing-phone-3/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.67″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 24 мм, 1/1.3″",
   "Сверхширокоугольная камера": "50 МП, f/2.2,114˚, 1/2.76″",
   "Телефото-камера": "50 МП, f/2.7, 1/2.75″",
   "Фронтальная камера": "50 МП, f/2.2, 1/2.76″",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5150 мАч",
   "Максимальная мощность зарядки": "65 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.67″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Nothing Phone (3): экран 6.67″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 5150 мАч."
 },
 {
  "id": "nothing-phone-3-512-gb",
  "name": "Nothing Phone (3) 512 ГБ",
  "model": "Nothing Phone (3)",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "nothing-phone-3",
  "brand": "Nothing",
  "category": "Смартфоны",
  "price": 50290,
  "image": "/images/p/nothing-phone-3/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/nothing-phone-3/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/nothing-phone-3/belyy.webp",
    "price": 52190
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.67″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.7, 24 мм, 1/1.3″",
   "Сверхширокоугольная камера": "50 МП, f/2.2,114˚, 1/2.76″",
   "Телефото-камера": "50 МП, f/2.7, 1/2.75″",
   "Фронтальная камера": "50 МП, f/2.2, 1/2.76″",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "5150 мАч",
   "Максимальная мощность зарядки": "65 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.67″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Nothing Phone (3): экран 6.67″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 5150 мАч."
 },
 {
  "id": "huawei-mate-x7-512-gb",
  "name": "Huawei Mate X7 512 ГБ",
  "model": "Huawei Mate X7",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "huawei-mate-x7",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 115890,
  "image": "/images/p/huawei-mate-x7/parchovyy-belyy.webp",
  "colors": [
   {
    "name": "Парчовый белый",
    "image": "/images/p/huawei-mate-x7/parchovyy-belyy.webp"
   },
   {
    "name": "Красный",
    "image": "/images/p/huawei-mate-x7/krasnyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-mate-x7/chernyy.webp",
    "price": 118690
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.49″; 8.0″",
   "Тип экрана": "LTPO OLED; Foldable LTPO OLED",
   "Частота обновления экрана": "120 Гц; 120 Гц",
   "Разрешение экрана": "1080 x 2444; 2210 x 2416",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.5-f/4.0, 24 мм, 1/1.28″",
   "Сверхширокоугольная камера": "40 МП, f/2.2, 13 мм, 120˚",
   "Телефото-камера": "50 МП, f/2.2, 81 мм",
   "Фронтальная камера": "8 МП, f/2.2; 8 МП, f/2.4",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "5600 мАч",
   "Максимальная мощность зарядки": "66 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.49″; 8.0″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei Mate X7: экран 6.49″; 8.0″ LTPO OLED; Foldable LTPO OLED, 120 Гц; 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 5600 мАч."
 },
 {
  "id": "honor-magic8-pro-512-gb",
  "name": "Honor Magic8 Pro 512 ГБ",
  "model": "Honor Magic8 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "honor-magic8-pro",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 81690,
  "image": "/images/p/honor-magic8-pro/bezhevyy-metallik.webp",
  "colors": [
   {
    "name": "Бежевый металлик",
    "image": "/images/p/honor-magic8-pro/bezhevyy-metallik.webp"
   },
   {
    "name": "Голубой металлик",
    "image": "/images/p/honor-magic8-pro/goluboy-metallik.webp"
   },
   {
    "name": "Чёрный графит",
    "image": "/images/p/honor-magic8-pro/chernyy-grafit.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6,71″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1256 x 2808",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 12 мм, 122˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "200 МП, f/2.6, 85 мм, 1/1.4″, 0.56µm",
   "Фронтальная камера": "50 МП, f/2.0, 21 мм, 1/2.93″, 0.6µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "7100 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,71″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Honor Magic8 Pro: экран 6,71″ OLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 7100 мАч."
 },
 {
  "id": "honor-magic8-pro-1-tb",
  "name": "Honor Magic8 Pro 1 ТБ",
  "model": "Honor Magic8 Pro",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "honor-magic8-pro",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 93090,
  "image": "/images/p/honor-magic8-pro/bezhevyy-metallik.webp",
  "colors": [
   {
    "name": "Бежевый металлик",
    "image": "/images/p/honor-magic8-pro/bezhevyy-metallik.webp"
   },
   {
    "name": "Голубой металлик",
    "image": "/images/p/honor-magic8-pro/goluboy-metallik.webp"
   },
   {
    "name": "Чёрный графит",
    "image": "/images/p/honor-magic8-pro/chernyy-grafit.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Экран": "6,71″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1256 x 2808",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.6, 23 мм, 1/1.3″, 1.2µm",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 12 мм, 122˚, 1/2.88″, 0.61µm",
   "Телефото-камера": "200 МП, f/2.6, 85 мм, 1/1.4″, 0.56µm",
   "Фронтальная камера": "50 МП, f/2.0, 21 мм, 1/2.93″, 0.6µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "7100 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6,71″ · Snapdragon · 50 Мп",
  "inStock": true,
  "description": "Honor Magic8 Pro: экран 6,71″ OLED, 120 Гц, процессор Snapdragon. Основная камера 50 МП, аккумулятор 7100 мАч."
 },
 {
  "id": "honor-400-pro-256-gb",
  "name": "Honor 400 Pro 256 ГБ",
  "model": "Honor 400 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "honor-400-pro",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 45590,
  "image": "/images/p/honor-400-pro/atlanticheskiy-siniy.webp",
  "colors": [
   {
    "name": "Атлантический синий",
    "image": "/images/p/honor-400-pro/atlanticheskiy-siniy.webp"
   },
   {
    "name": "Вельветовый чёрный",
    "image": "/images/p/honor-400-pro/velvetovyy-chernyy.webp"
   },
   {
    "name": "Титановый серый",
    "image": "/images/p/honor-400-pro/titanovyy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.9, 1/1.4″",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 112˚",
   "Телефото-камера": "50 МП, f/2.4, 1/2.0″, 0.8µm",
   "Фронтальная камера": "50 МП, f/2.0",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.7″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Honor 400 Pro: экран 6.7″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "honor-400-pro-512-gb",
  "name": "Honor 400 Pro 512 ГБ",
  "model": "Honor 400 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "honor-400-pro",
  "brand": "Honor",
  "category": "Смартфоны",
  "price": 49390,
  "image": "/images/p/honor-400-pro/atlanticheskiy-siniy.webp",
  "colors": [
   {
    "name": "Атлантический синий",
    "image": "/images/p/honor-400-pro/atlanticheskiy-siniy.webp"
   },
   {
    "name": "Вельветовый чёрный",
    "image": "/images/p/honor-400-pro/velvetovyy-chernyy.webp"
   },
   {
    "name": "Титановый серый",
    "image": "/images/p/honor-400-pro/titanovyy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.7″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2800",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "200 МП, f/1.9, 1/1.4″",
   "Сверхширокоугольная камера": "12 МП, f/2.2, 112˚",
   "Телефото-камера": "50 МП, f/2.4, 1/2.0″, 0.8µm",
   "Фронтальная камера": "50 МП, f/2.0",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да"
  },
  "summary": "6.7″ · Snapdragon · 200 Мп",
  "inStock": true,
  "description": "Honor 400 Pro: экран 6.7″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 200 МП, аккумулятор 6000 мАч."
 },
 {
  "id": "vivo-x300-pro-512-gb",
  "name": "Vivo X300 Pro 512 ГБ",
  "model": "Vivo X300 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "vivo-x300-pro",
  "brand": "Vivo",
  "category": "Смартфоны",
  "price": 82590,
  "image": "/images/p/vivo-x300-pro/korichnevyy.webp",
  "colors": [
   {
    "name": "Коричневый",
    "image": "/images/p/vivo-x300-pro/korichnevyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/vivo-x300-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.78″",
   "Тип экрана": "LTPO AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1260 x 2800",
   "Процессор": "Mediatek Dimensity 9500",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "50 МП, f/1.6, 24мм, 1/1.28″, 1.22µm",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 15мм, 119˚, 1/2.76″, 0.64µm",
   "Фронтальная камера": "50 МП, f/2.0, 20мм, 1/2.76″, 0.64µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6510 мАч",
   "Максимальная мощность зарядки": "90 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.78″ · Mediatek Dimensity 9500 · 50 Мп",
  "inStock": true,
  "description": "Vivo X300 Pro: экран 6.78″ LTPO AMOLED, 120 Гц, процессор Mediatek Dimensity 9500. Основная камера 50 МП, аккумулятор 6510 мАч, защита IP68/IP69."
 },
 {
  "id": "vivo-x300-ultra-512-gb",
  "name": "Vivo X300 Ultra 512 ГБ",
  "model": "Vivo X300 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "vivo-x300-ultra",
  "brand": "Vivo",
  "category": "Смартфоны",
  "price": 109190,
  "image": "/images/p/vivo-x300-ultra/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/vivo-x300-ultra/zelenyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/vivo-x300-ultra/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/vivo-x300-ultra/belyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.82″",
   "Тип экрана": "LTPO AMOLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "1440 x 3168",
   "Процессор": "Qualcomm Snapdragon 8 Elite Gen 5",
   "Объем оперативной памяти": "16 ГБ",
   "Основная камера": "200 МП, f/1.9, 35мм, 1/1.12″, 0.7µm",
   "Сверхширокоугольная камера": "50 МП, f/2.0, 14мм, 116˚, 1/1.28″, 1.22µm",
   "Фронтальная камера": "50 МП, f/2.5, 24мм, 1/2.76″, 0.64µm",
   "Макс. разрешение видео": "8К",
   "Ёмкость аккумулятора": "6600 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.82″ · Qualcomm Snapdragon 8 Elite Gen 5 · 200 Мп",
  "inStock": true,
  "description": "Vivo X300 Ultra: экран 6.82″ LTPO AMOLED, 144 Гц, процессор Qualcomm Snapdragon 8 Elite Gen 5. Основная камера 200 МП, аккумулятор 6600 мАч, защита IP68/IP69."
 },
 {
  "id": "redmi-note-17-pro-max-128-gb",
  "name": "Redmi Note 17 Pro Max 128 ГБ",
  "model": "Redmi Note 17 Pro Max",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "redmi-note-17-pro-max",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 34590,
  "image": "/images/p/redmi-note-17-pro-max/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-note-17-pro-max/chernyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro-max/fioletovyy.webp"
   },
   {
    "name": "Облачные румяна",
    "image": "/images/p/redmi-note-17-pro-max/oblachnye-rumyana.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/redmi-note-17-pro-max/zelenyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6 Gen 5",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.5, 26мм, 1/1.95″, 0.8µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.2, 1/3.6″, 0.61µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6 Gen 5 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro Max: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6 Gen 5. Основная камера 50 МП, аккумулятор 10000 мАч, защита IP68."
 },
 {
  "id": "redmi-note-17-pro-max-256-gb",
  "name": "Redmi Note 17 Pro Max 256 ГБ",
  "model": "Redmi Note 17 Pro Max",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "redmi-note-17-pro-max",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 36990,
  "image": "/images/p/redmi-note-17-pro-max/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-note-17-pro-max/chernyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/redmi-note-17-pro-max/zelenyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro-max/fioletovyy.webp"
   },
   {
    "name": "Облачные румяна",
    "image": "/images/p/redmi-note-17-pro-max/oblachnye-rumyana.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6 Gen 5",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.5, 26мм, 1/1.95″, 0.8µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.2, 1/3.6″, 0.61µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6 Gen 5 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro Max: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6 Gen 5. Основная камера 50 МП, аккумулятор 10000 мАч, защита IP68."
 },
 {
  "id": "redmi-note-17-pro-max-512-gb",
  "name": "Redmi Note 17 Pro Max 512 ГБ",
  "model": "Redmi Note 17 Pro Max",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "redmi-note-17-pro-max",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 41790,
  "image": "/images/p/redmi-note-17-pro-max/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/redmi-note-17-pro-max/zelenyy.webp"
   },
   {
    "name": "Облачные румяна",
    "image": "/images/p/redmi-note-17-pro-max/oblachnye-rumyana.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro-max/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-note-17-pro-max/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6 Gen 5",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.5, 26мм, 1/1.95″, 0.8µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.2, 1/3.6″, 0.61µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10000 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6 Gen 5 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro Max: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6 Gen 5. Основная камера 50 МП, аккумулятор 10000 мАч, защита IP68."
 },
 {
  "id": "redmi-17-128-gb",
  "name": "Redmi 17 128 ГБ",
  "model": "Redmi 17",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "redmi-17",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 15590,
  "image": "/images/p/redmi-17/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-17/chernyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/redmi-17/nasyschennyy-siniy.webp"
   },
   {
    "name": "Фиолетовый лотос",
    "image": "/images/p/redmi-17/fioletovyy-lotos.webp"
   },
   {
    "name": "Зелёный дуб",
    "image": "/images/p/redmi-17/zelenyy-dub.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "720 x 1600",
   "Процессор": "Mediatek Helio G91 Ultra",
   "Объем оперативной памяти": "4 ГБ",
   "Основная камера": "50 МП, f/1.8",
   "Фронтальная камера": "8 МП, f/2.1",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "7500 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP64",
   "Материал корпуса": "Пластик"
  },
  "summary": "6.9″ · Mediatek Helio G91 Ultra · 50 Мп",
  "inStock": true,
  "description": "Redmi 17: экран 6.9″ IPS, 120 Гц, процессор Mediatek Helio G91 Ultra. Основная камера 50 МП, аккумулятор 7500 мАч, защита IP64."
 },
 {
  "id": "redmi-17-256-gb",
  "name": "Redmi 17 256 ГБ",
  "model": "Redmi 17",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "redmi-17",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 18490,
  "image": "/images/p/redmi-17/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-17/chernyy.webp"
   },
   {
    "name": "Насыщенный синий",
    "image": "/images/p/redmi-17/nasyschennyy-siniy.webp"
   },
   {
    "name": "Зелёный дуб",
    "image": "/images/p/redmi-17/zelenyy-dub.webp"
   },
   {
    "name": "Фиолетовый лотос",
    "image": "/images/p/redmi-17/fioletovyy-lotos.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "720 x 1600",
   "Процессор": "Mediatek Helio G91 Ultra",
   "Объем оперативной памяти": "4 ГБ",
   "Основная камера": "50 МП, f/1.8",
   "Фронтальная камера": "8 МП, f/2.1",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "7500 мАч",
   "Максимальная мощность зарядки": "45 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP64",
   "Материал корпуса": "Пластик"
  },
  "summary": "6.9″ · Mediatek Helio G91 Ultra · 50 Мп",
  "inStock": true,
  "description": "Redmi 17: экран 6.9″ IPS, 120 Гц, процессор Mediatek Helio G91 Ultra. Основная камера 50 МП, аккумулятор 7500 мАч, защита IP64."
 },
 {
  "id": "realme-gt-7t-256-gb",
  "name": "Realme GT 7T 256 ГБ",
  "model": "Realme GT 7T",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "realme-gt-7t",
  "brand": "Realme",
  "category": "Смартфоны",
  "price": 36990,
  "image": "/images/p/realme-gt-7t/siniy-lednik.webp",
  "colors": [
   {
    "name": "Синий ледник",
    "image": "/images/p/realme-gt-7t/siniy-lednik.webp"
   },
   {
    "name": "Обсидиан",
    "image": "/images/p/realme-gt-7t/obsidian.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.8″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2800",
   "Процессор": "Mediatek Dimensity 8400 Max",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 16мм, 112˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.5, 21мм, 1/2.74″, 0.8µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "7000 мАч",
   "Максимальная мощность зарядки": "120 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.8″ · Mediatek Dimensity 8400 Max · 50 Мп",
  "inStock": true,
  "description": "Realme GT 7T: экран 6.8″ AMOLED, 120 Гц, процессор Mediatek Dimensity 8400 Max. Основная камера 50 МП, аккумулятор 7000 мАч, защита IP68/IP69."
 },
 {
  "id": "realme-gt-7t-512-gb",
  "name": "Realme GT 7T 512 ГБ",
  "model": "Realme GT 7T",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "realme-gt-7t",
  "brand": "Realme",
  "category": "Смартфоны",
  "price": 42690,
  "image": "/images/p/realme-gt-7t/siniy-lednik.webp",
  "colors": [
   {
    "name": "Синий ледник",
    "image": "/images/p/realme-gt-7t/siniy-lednik.webp"
   },
   {
    "name": "Обсидиан",
    "image": "/images/p/realme-gt-7t/obsidian.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.8″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2800",
   "Процессор": "Mediatek Dimensity 8400 Max",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24мм, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 16мм, 112˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "32 МП, f/2.5, 21мм, 1/2.74″, 0.8µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "7000 мАч",
   "Максимальная мощность зарядки": "120 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68/IP69"
  },
  "summary": "6.8″ · Mediatek Dimensity 8400 Max · 50 Мп",
  "inStock": true,
  "description": "Realme GT 7T: экран 6.8″ AMOLED, 120 Гц, процессор Mediatek Dimensity 8400 Max. Основная камера 50 МП, аккумулятор 7000 мАч, защита IP68/IP69."
 },
 {
  "id": "galaxy-a27-128-gb",
  "name": "Galaxy A27 128 ГБ",
  "model": "Galaxy A27",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-a27",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 22790,
  "image": "/images/p/galaxy-a27/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a27/chernyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/galaxy-a27/siniy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-a27/rozovyy.webp"
   },
   {
    "name": "Мятный",
    "image": "/images/p/galaxy-a27/myatnyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6,7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Qualcomm",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "50 МП, f/1.8, 27 мм, 1/2.76″, 0.64µm",
   "Сверхширокоугольная камера": "5 МП, f/2.2, 16 мм, 1/5.0″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2, 25 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "5000 мАч",
   "Класс водонепроницаемости": "IP64",
   "Материал корпуса": "Пластик",
   "Вес, г": "200"
  },
  "summary": "6,7″ · Qualcomm · 50 Мп",
  "inStock": true,
  "description": "Galaxy A27: экран 6,7″ Super AMOLED, 120 Гц, процессор Qualcomm. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP64."
 },
 {
  "id": "galaxy-a27-256-gb",
  "name": "Galaxy A27 256 ГБ",
  "model": "Galaxy A27",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-a27",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 26590,
  "image": "/images/p/galaxy-a27/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a27/chernyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/galaxy-a27/siniy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/galaxy-a27/rozovyy.webp"
   },
   {
    "name": "Мятный",
    "image": "/images/p/galaxy-a27/myatnyy.webp",
    "price": 27490
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6,7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Qualcomm",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "50 МП, f/1.8, 27 мм, 1/2.76″, 0.64µm",
   "Сверхширокоугольная камера": "5 МП, f/2.2, 16 мм, 1/5.0″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2, 25 мм, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "5000 мАч",
   "Класс водонепроницаемости": "IP64",
   "Материал корпуса": "Пластик",
   "Вес, г": "200"
  },
  "summary": "6,7″ · Qualcomm · 50 Мп",
  "inStock": true,
  "description": "Galaxy A27: экран 6,7″ Super AMOLED, 120 Гц, процессор Qualcomm. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP64."
 },
 {
  "id": "redmi-note-17-pro-128-gb",
  "name": "Redmi Note 17 Pro 128 ГБ",
  "model": "Redmi Note 17 Pro",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "redmi-note-17-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 25090,
  "image": "/images/p/redmi-note-17-pro/fioletovyy.webp",
  "colors": [
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro/fioletovyy.webp"
   },
   {
    "name": "Оранжевый сатин",
    "image": "/images/p/redmi-note-17-pro/oranzhevyy-satin.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6s Gen 4",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 26мм, 1/2.76″, 0.64µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "16 МП, f/2.4, 1.0µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "8340 мАч",
   "Максимальная мощность зарядки": "67 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6s Gen 4 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6s Gen 4. Основная камера 50 МП, аккумулятор 8340 мАч, защита IP68."
 },
 {
  "id": "redmi-note-17-pro-256-gb",
  "name": "Redmi Note 17 Pro 256 ГБ",
  "model": "Redmi Note 17 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "redmi-note-17-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 31290,
  "image": "/images/p/redmi-note-17-pro/oranzhevyy-satin.webp",
  "colors": [
   {
    "name": "Оранжевый сатин",
    "image": "/images/p/redmi-note-17-pro/oranzhevyy-satin.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro/fioletovyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-note-17-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6s Gen 4",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 26мм, 1/2.76″, 0.64µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "16 МП, f/2.4, 1.0µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "8340 мАч",
   "Максимальная мощность зарядки": "67 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6s Gen 4 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6s Gen 4. Основная камера 50 МП, аккумулятор 8340 мАч, защита IP68."
 },
 {
  "id": "redmi-note-17-pro-512-gb",
  "name": "Redmi Note 17 Pro 512 ГБ",
  "model": "Redmi Note 17 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "redmi-note-17-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 35090,
  "image": "/images/p/redmi-note-17-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/redmi-note-17-pro/chernyy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/redmi-note-17-pro/fioletovyy.webp"
   },
   {
    "name": "Оранжевый сатин",
    "image": "/images/p/redmi-note-17-pro/oranzhevyy-satin.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.83″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1280 x 2772",
   "Процессор": "Qualcomm Snapdragon 6s Gen 4",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 26мм, 1/2.76″, 0.64µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15мм, 120˚, 1/4.0″, 1.12µm",
   "Фронтальная камера": "16 МП, f/2.4, 1.0µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "8340 мАч",
   "Максимальная мощность зарядки": "67 Вт",
   "Беспроводная зарядка": "нет",
   "Класс водонепроницаемости": "IP68"
  },
  "summary": "6.83″ · Qualcomm Snapdragon 6s Gen 4 · 50 Мп",
  "inStock": true,
  "description": "Redmi Note 17 Pro: экран 6.83″ AMOLED, 120 Гц, процессор Qualcomm Snapdragon 6s Gen 4. Основная камера 50 МП, аккумулятор 8340 мАч, защита IP68."
 },
 {
  "id": "galaxy-a37-128-gb",
  "name": "Galaxy A37 128 ГБ",
  "model": "Galaxy A37",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-a37",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 24690,
  "image": "/images/p/galaxy-a37/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/galaxy-a37/chernyy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/galaxy-a37/zelenyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/galaxy-a37/belyy.webp"
   },
   {
    "name": "Лаванда",
    "image": "/images/p/galaxy-a37/lavanda.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6,7″",
   "Тип экрана": "Super AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2340",
   "Система на чипе (SoC)": "Exynos",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "50 МП, f/1.8, 1/1.56″, 1.0µm",
   "Сверхширокоугольная камера": "8МП, f/2.2, 16 мм, 1/4.0″, 1.12µm",
   "Фронтальная камера": "12 МП, f/2.2, 1/3.2″, 1.12µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "5000 мАч",
   "Класс водонепроницаемости": "IP68",
   "Материал корпуса": "Пластик",
   "Вес, г": "196"
  },
  "summary": "6,7″ · Exynos · 50 Мп",
  "inStock": true,
  "description": "Galaxy A37: экран 6,7″ Super AMOLED, 120 Гц, процессор Exynos. Основная камера 50 МП, аккумулятор 5000 мАч, защита IP68."
 },
 {
  "id": "huawei-nova-15-pro-256-gb",
  "name": "Huawei nova 15 Pro 256 ГБ",
  "model": "Huawei nova 15 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "huawei-nova-15-pro",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 32690,
  "image": "/images/p/huawei-nova-15-pro/myatnyy.webp",
  "colors": [
   {
    "name": "Мятный",
    "image": "/images/p/huawei-nova-15-pro/myatnyy.webp"
   },
   {
    "name": "Лавандовый",
    "image": "/images/p/huawei-nova-15-pro/lavandovyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/huawei-nova-15-pro/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-nova-15-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "Экран": "6.84″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2856",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 13 мм, 120˚",
   "Телефото-камера": "12 МП, f/2.4, 69 мм",
   "Фронтальная камера": "50 МП, f/2.0, 1/2.5",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6500 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "нет"
  },
  "summary": "6.84″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei nova 15 Pro: экран 6.84″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6500 мАч."
 },
 {
  "id": "huawei-nova-15-pro-512-gb",
  "name": "Huawei nova 15 Pro 512 ГБ",
  "model": "Huawei nova 15 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "huawei-nova-15-pro",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 36090,
  "image": "/images/p/huawei-nova-15-pro/myatnyy.webp",
  "colors": [
   {
    "name": "Мятный",
    "image": "/images/p/huawei-nova-15-pro/myatnyy.webp"
   },
   {
    "name": "Лавандовый",
    "image": "/images/p/huawei-nova-15-pro/lavandovyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/huawei-nova-15-pro/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-nova-15-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Экран": "6.84″",
   "Тип экрана": "LTPO OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1320 x 2856",
   "Система на чипе (SoC)": "Kirin",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8, 24 мм",
   "Сверхширокоугольная камера": "13 МП, f/2.2, 13 мм, 120˚",
   "Телефото-камера": "12 МП, f/2.4, 69 мм",
   "Фронтальная камера": "50 МП, f/2.0, 1/2.5",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "6500 мАч",
   "Максимальная мощность зарядки": "100 Вт",
   "Беспроводная зарядка": "нет"
  },
  "summary": "6.84″ · Kirin · 50 Мп",
  "inStock": true,
  "description": "Huawei nova 15 Pro: экран 6.84″ LTPO OLED, 120 Гц, процессор Kirin. Основная камера 50 МП, аккумулятор 6500 мАч."
 },
 {
  "id": "oneplus-nord-ce6-128-gb",
  "name": "OnePlus Nord CE6 128 ГБ",
  "model": "OnePlus Nord CE6",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "oneplus-nord-ce6",
  "brand": "OnePlus",
  "category": "Смартфоны",
  "price": 30390,
  "image": "/images/p/oneplus-nord-ce6/chernaya-smola.webp",
  "colors": [
   {
    "name": "Чёрная смола",
    "image": "/images/p/oneplus-nord-ce6/chernaya-smola.webp"
   },
   {
    "name": "Прохладный синий",
    "image": "/images/p/oneplus-nord-ce6/prohladnyy-siniy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6,78″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "1272 x 2772",
   "Процессор": "Qualcomm Snapdragon 7s Gen 4",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 МП, f/1.8, 27мм, 1/2.88″, 0.61µm",
   "Фронтальная камера": "32 МП, f/2.0, 21мм, 1/3.1″, 0.7µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "7500 мАч",
   "Максимальная мощность зарядки": "80 Вт",
   "Класс водонепроницаемости": "IP68/IP69K",
   "Материал корпуса": "Пластик",
   "Вес, г": "208"
  },
  "summary": "6,78″ · Qualcomm Snapdragon 7s Gen 4 · 50 Мп",
  "inStock": true,
  "description": "OnePlus Nord CE6: экран 6,78″ AMOLED, 144 Гц, процессор Qualcomm Snapdragon 7s Gen 4. Основная камера 50 МП, аккумулятор 7500 мАч, защита IP68/IP69K."
 },
 {
  "id": "nothing-phone-4b-128-gb",
  "name": "Nothing Phone (4b) 128 ГБ",
  "model": "Nothing Phone (4b)",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "nothing-phone-4b",
  "brand": "Nothing",
  "category": "Смартфоны",
  "price": 28890,
  "image": "/images/p/nothing-phone-4b/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/nothing-phone-4b/chernyy.webp"
   },
   {
    "name": "Белый",
    "image": "/images/p/nothing-phone-4b/belyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/nothing-phone-4b/siniy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "Экран": "6,77″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1080 x 2344",
   "Система на чипе (SoC)": "Snapdragon",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 MP, f/1.8, 1/2.76″",
   "Сверхширокоугольная камера": "8 МП, f/2.2, 15 мм, 120˚ , 1/4.0″, 1.12µm",
   "Фронтальная камера": "16 MP, f/2.4, 1/3.0″",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "5200 мАч",
   "Максимальная мощность зарядки": "33 Вт",
   "Класс водонепроницаемости": "IP64",
   "Материал корпуса": "Пластик"
  },
  "summary": "6,77″ · Snapdragon",
  "inStock": true,
  "description": "Nothing Phone (4b): экран 6,77″ AMOLED, 120 Гц, процессор Snapdragon. Основная камера 50 MP, аккумулятор 5200 мАч, защита IP64."
 },
 {
  "id": "galaxy-a57-128-gb",
  "name": "Galaxy A57 128 ГБ",
  "model": "Galaxy A57",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "galaxy-a57",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 32690,
  "image": "/images/p/galaxy-a57/awesome-navy.webp",
  "colors": [
   {
    "name": "Awesome Navy",
    "image": "/images/p/galaxy-a57/awesome-navy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "display": "6.7\" Super AMOLED+, 120 Гц",
   "chip": "Exynos 1680",
   "camera": "50 + 12 + 5 МП",
   "battery": "5000 мАч, 45 Вт"
  },
  "summary": "6.7\" Super AMOLED+, 120 Гц · Exynos 1680",
  "inStock": true,
  "description": "Старшая модель среднего класса Galaxy A 2026 года: алюминиевая рамка, защита IP68, быстрая зарядка 45 Вт. Самый ходовой Samsung среднего ценового сегмента."
 },
 {
  "id": "galaxy-a57-256-gb",
  "name": "Galaxy A57 256 ГБ",
  "model": "Galaxy A57",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-a57",
  "brand": "Samsung",
  "category": "Смартфоны",
  "price": 36990,
  "image": "/images/p/galaxy-a57/awesome-navy.webp",
  "colors": [
   {
    "name": "Awesome Navy",
    "image": "/images/p/galaxy-a57/awesome-navy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "6.7\" Super AMOLED+, 120 Гц",
   "chip": "Exynos 1680",
   "camera": "50 + 12 + 5 МП",
   "battery": "5000 мАч, 45 Вт"
  },
  "summary": "6.7\" Super AMOLED+, 120 Гц · Exynos 1680",
  "inStock": true,
  "description": "Старшая модель среднего класса Galaxy A 2026 года: алюминиевая рамка, защита IP68, быстрая зарядка 45 Вт. Самый ходовой Samsung среднего ценового сегмента."
 },
 {
  "id": "xiaomi-17t-pro-256-gb",
  "name": "Xiaomi 17T Pro 256 ГБ",
  "model": "Xiaomi 17T Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-17t-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 58890,
  "image": "/images/p/xiaomi-17t-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17t-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "6.83\" AMOLED 144 Гц",
   "chip": "MediaTek Dimensity 9500",
   "camera": "Leica 50 Мп (Light Fusion 950)",
   "battery": "7000 мА·ч, 100 Вт"
  },
  "summary": "6.83\" AMOLED 144 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Флагман T-серии Xiaomi с крупным экраном 6,83 дюйма и камерами Leica. Стоит заметно дешевле Xiaomi 17 и выделяется батареей 7000 мА·ч."
 },
 {
  "id": "xiaomi-17t-pro-512-gb",
  "name": "Xiaomi 17T Pro 512 ГБ",
  "model": "Xiaomi 17T Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xiaomi-17t-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 62690,
  "image": "/images/p/xiaomi-17t-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/xiaomi-17t-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.83\" AMOLED 144 Гц",
   "chip": "MediaTek Dimensity 9500",
   "camera": "Leica 50 Мп (Light Fusion 950)",
   "battery": "7000 мА·ч, 100 Вт"
  },
  "summary": "6.83\" AMOLED 144 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Флагман T-серии Xiaomi с крупным экраном 6,83 дюйма и камерами Leica. Стоит заметно дешевле Xiaomi 17 и выделяется батареей 7000 мА·ч."
 },
 {
  "id": "poco-f9-ultra-256-gb",
  "name": "POCO F9 Ultra 256 ГБ",
  "model": "POCO F9 Ultra",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "poco-f9-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 67690,
  "image": "/images/p/poco-f9-ultra/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f9-ultra/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "6.9\" AMOLED 185 Гц",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "200 Мп + перископ 50 Мп 5x + ширик 50 Мп",
   "battery": "8050 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.9\" AMOLED 185 Гц · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Старший POCO F текущего поколения на топовом Snapdragon 8 Elite Gen 5. Выделяется экраном 185 Гц и батареей 8050 мА·ч."
 },
 {
  "id": "poco-f9-ultra-512-gb",
  "name": "POCO F9 Ultra 512 ГБ",
  "model": "POCO F9 Ultra",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "poco-f9-ultra",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 75490,
  "image": "/images/p/poco-f9-ultra/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f9-ultra/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.9\" AMOLED 185 Гц",
   "chip": "Snapdragon 8 Elite Gen 5",
   "camera": "200 Мп + перископ 50 Мп 5x + ширик 50 Мп",
   "battery": "8050 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.9\" AMOLED 185 Гц · Snapdragon 8 Elite Gen 5",
  "inStock": true,
  "description": "Старший POCO F текущего поколения на топовом Snapdragon 8 Elite Gen 5. Выделяется экраном 185 Гц и батареей 8050 мА·ч."
 },
 {
  "id": "poco-f9-pro-256-gb",
  "name": "POCO F9 Pro 256 ГБ",
  "model": "POCO F9 Pro",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "poco-f9-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 59890,
  "image": "/images/p/poco-f9-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f9-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "6.59\" AMOLED 185 Гц",
   "chip": "Snapdragon 8 Elite Gen 5 (V)",
   "camera": "200 Мп OIS + теле 2.5x + ширик 8 Мп",
   "battery": "6330 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.59\" AMOLED 185 Гц · Snapdragon 8 Elite Gen 5 (V)",
  "inStock": true,
  "description": "Компактный POCO F на урезанной версии Snapdragon 8 Elite Gen 5. Флагманская производительность за цену ниже Xiaomi 17."
 },
 {
  "id": "poco-f9-pro-512-gb",
  "name": "POCO F9 Pro 512 ГБ",
  "model": "POCO F9 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "poco-f9-pro",
  "brand": "Xiaomi",
  "category": "Смартфоны",
  "price": 64090,
  "image": "/images/p/poco-f9-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/poco-f9-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.59\" AMOLED 185 Гц",
   "chip": "Snapdragon 8 Elite Gen 5 (V)",
   "camera": "200 Мп OIS + теле 2.5x + ширик 8 Мп",
   "battery": "6330 мА·ч, 100 Вт / 50 Вт беспр."
  },
  "summary": "6.59\" AMOLED 185 Гц · Snapdragon 8 Elite Gen 5 (V)",
  "inStock": true,
  "description": "Компактный POCO F на урезанной версии Snapdragon 8 Elite Gen 5. Флагманская производительность за цену ниже Xiaomi 17."
 },
 {
  "id": "huawei-mate-80-pro-512-gb",
  "name": "Huawei Mate 80 Pro 512 ГБ",
  "model": "Huawei Mate 80 Pro",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "huawei-mate-80-pro",
  "brand": "Huawei",
  "category": "Смартфоны",
  "price": 63590,
  "image": "/images/p/huawei-mate-80-pro/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/huawei-mate-80-pro/chernyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "display": "6.75\" OLED",
   "camera": "50 Мп RYYB с переменной диафрагмой + телемакро 48 Мп + ширик 40 Мп",
   "battery": "5620 мА·ч, 100 Вт",
   "os": "EMUI 15"
  },
  "summary": "6.75\" OLED",
  "inStock": true,
  "description": "Флагман Huawei серии Mate на глобальном рынке. Камеры с RYYB-сенсорами и быстрая зарядка 100 Вт."
 },
 {
  "id": "ipad-pro-13-m5-256-gb-wi-fi",
  "name": "iPad Pro 13\" (M5) 256 ГБ · Wi‑Fi",
  "model": "iPad Pro 13\" (M5)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 118690,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp",
    "price": 124390
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-256-gb-wi-fi-plus-cellular",
  "name": "iPad Pro 13\" (M5) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 13\" (M5)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 120590,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp",
    "price": 126290
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-512-gb-wi-fi",
  "name": "iPad Pro 13\" (M5) 512 ГБ · Wi‑Fi",
  "model": "iPad Pro 13\" (M5)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 142490,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp",
    "price": 144390
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-512-gb-wi-fi-plus-cellular",
  "name": "iPad Pro 13\" (M5) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 13\" (M5)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 146290,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-1-tb-wi-fi",
  "name": "iPad Pro 13\" (M5) 1 ТБ · Wi‑Fi",
  "model": "iPad Pro 13\" (M5)",
  "variant": "1 ТБ · Wi‑Fi",
  "storage": "1 ТБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 156690,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-1-tb-wi-fi-plus-cellular",
  "name": "iPad Pro 13\" (M5) 1 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 13\" (M5)",
  "variant": "1 ТБ · Wi‑Fi + Cellular",
  "storage": "1 ТБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 161490,
  "image": "/images/p/ipad-pro-13/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
    "price": 164290
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-2-tb-wi-fi",
  "name": "iPad Pro 13\" (M5) 2 ТБ · Wi‑Fi",
  "model": "iPad Pro 13\" (M5)",
  "variant": "2 ТБ · Wi‑Fi",
  "storage": "2 ТБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 165290,
  "image": "/images/p/ipad-pro-13/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
    "price": 166190
   }
  ],
  "specs": {
   "Память": "2 ТБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-13-m5-2-tb-wi-fi-plus-cellular",
  "name": "iPad Pro 13\" (M5) 2 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 13\" (M5)",
  "variant": "2 ТБ · Wi‑Fi + Cellular",
  "storage": "2 ТБ",
  "family": "ipad-pro-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 171890,
  "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-13/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-13/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "2 ТБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2064 x 2752",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "38,99 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "579",
   "Размеры": "28,16 x 21,55 x 0,51 см"
  },
  "summary": "13″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 13\" (M5): экран 13″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 38,99 вТч."
 },
 {
  "id": "ipad-pro-11-m5-256-gb-wi-fi",
  "name": "iPad Pro 11\" (M5) 256 ГБ · Wi‑Fi",
  "model": "iPad Pro 11\" (M5)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 101590,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 102590
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-256-gb-wi-fi-plus-cellular",
  "name": "iPad Pro 11\" (M5) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 11\" (M5)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 113990,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 115890
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-512-gb-wi-fi",
  "name": "iPad Pro 11\" (M5) 512 ГБ · Wi‑Fi",
  "model": "iPad Pro 11\" (M5)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 125390,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 127290
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-512-gb-wi-fi-plus-cellular",
  "name": "iPad Pro 11\" (M5) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 11\" (M5)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 151990,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-1-tb-wi-fi",
  "name": "iPad Pro 11\" (M5) 1 ТБ · Wi‑Fi",
  "model": "iPad Pro 11\" (M5)",
  "variant": "1 ТБ · Wi‑Fi",
  "storage": "1 ТБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 157690,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 159590
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-1-tb-wi-fi-plus-cellular",
  "name": "iPad Pro 11\" (M5) 1 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 11\" (M5)",
  "variant": "1 ТБ · Wi‑Fi + Cellular",
  "storage": "1 ТБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 162390,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-2-tb-wi-fi",
  "name": "iPad Pro 11\" (M5) 2 ТБ · Wi‑Fi",
  "model": "iPad Pro 11\" (M5)",
  "variant": "2 ТБ · Wi‑Fi",
  "storage": "2 ТБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 166190,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 172890
   }
  ],
  "specs": {
   "Память": "2 ТБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-pro-11-m5-2-tb-wi-fi-plus-cellular",
  "name": "iPad Pro 11\" (M5) 2 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Pro 11\" (M5)",
  "variant": "2 ТБ · Wi‑Fi + Cellular",
  "storage": "2 ТБ",
  "family": "ipad-pro-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 173790,
  "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/ipad-pro-11/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-pro-11/serebristyy.webp",
    "price": 177590
   }
  ],
  "specs": {
   "Память": "2 ТБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Ultra Retina Tandem OLED",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1668 x 2420",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "12 МП, f/1.8",
   "Фронтальная камера": "есть, 12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "31.29 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "444",
   "Размеры": "24,97 x 17,75 x 0,53 см"
  },
  "summary": "11″ · Apple M5 · 12 Мп",
  "inStock": true,
  "description": "iPad Pro 11\" (M5): экран 11″ Ultra Retina Tandem OLED, 120 Гц, процессор Apple M5. Основная камера 12 МП, аккумулятор 31.29 вТч."
 },
 {
  "id": "ipad-air-13-m4-128-gb-wi-fi",
  "name": "iPad Air 13\" (M4) 128 ГБ · Wi‑Fi",
  "model": "iPad Air 13\" (M4)",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 83590,
  "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-128-gb-wi-fi-plus-cellular",
  "name": "iPad Air 13\" (M4) 128 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 13\" (M4)",
  "variant": "128 ГБ · Wi‑Fi + Cellular",
  "storage": "128 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 84490,
  "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
    "price": 87390
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-256-gb-wi-fi",
  "name": "iPad Air 13\" (M4) 256 ГБ · Wi‑Fi",
  "model": "iPad Air 13\" (M4)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 94990,
  "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
    "price": 97790
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp",
    "price": 97790
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp",
    "price": 97790
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-256-gb-wi-fi-plus-cellular",
  "name": "iPad Air 13\" (M4) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 13\" (M4)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 110190,
  "image": "/images/p/ipad-air-13/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp",
    "price": 112090
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
    "price": 113990
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
    "price": 117790
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-512-gb-wi-fi",
  "name": "iPad Air 13\" (M4) 512 ГБ · Wi‑Fi",
  "model": "iPad Air 13\" (M4)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 126290,
  "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-512-gb-wi-fi-plus-cellular",
  "name": "iPad Air 13\" (M4) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 13\" (M4)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 137690,
  "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
    "price": 139590
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-1-tb-wi-fi",
  "name": "iPad Air 13\" (M4) 1 ТБ · Wi‑Fi",
  "model": "iPad Air 13\" (M4)",
  "variant": "1 ТБ · Wi‑Fi",
  "storage": "1 ТБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 140590,
  "image": "/images/p/ipad-air-13/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
    "price": 141490
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp",
    "price": 141490
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp",
    "price": 142490
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-13-m4-1-tb-wi-fi-plus-cellular",
  "name": "iPad Air 13\" (M4) 1 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Air 13\" (M4)",
  "variant": "1 ТБ · Wi‑Fi + Cellular",
  "storage": "1 ТБ",
  "family": "ipad-air-13",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 165290,
  "image": "/images/p/ipad-air-13/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-13/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-13/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-13/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi + Cellular",
   "Экран": "13″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "2048 x 2732",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "36,59 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "616",
   "Размеры": "28,06 x 21,49 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "13″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 13\" (M4): экран 13″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 36,59 вТч."
 },
 {
  "id": "ipad-air-11-m4-128-gb-wi-fi",
  "name": "iPad Air 11\" (M4) 128 ГБ · Wi‑Fi",
  "model": "iPad Air 11\" (M4)",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 64590,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp",
    "price": 65490
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-128-gb-wi-fi-plus-cellular",
  "name": "iPad Air 11\" (M4) 128 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 11\" (M4)",
  "variant": "128 ГБ · Wi‑Fi + Cellular",
  "storage": "128 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 74090,
  "image": "/images/p/ipad-air-11/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
    "price": 77890
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp",
    "price": 77890
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp",
    "price": 77890
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-256-gb-wi-fi",
  "name": "iPad Air 11\" (M4) 256 ГБ · Wi‑Fi",
  "model": "iPad Air 11\" (M4)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 74990,
  "image": "/images/p/ipad-air-11/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp",
    "price": 75990
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
    "price": 76890
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp",
    "price": 76890
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-256-gb-wi-fi-plus-cellular",
  "name": "iPad Air 11\" (M4) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 11\" (M4)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 101590,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-512-gb-wi-fi",
  "name": "iPad Air 11\" (M4) 512 ГБ · Wi‑Fi",
  "model": "iPad Air 11\" (M4)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 108290,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp",
    "price": 112990
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-512-gb-wi-fi-plus-cellular",
  "name": "iPad Air 11\" (M4) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad Air 11\" (M4)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 124390,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp",
    "price": 126290
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-1-tb-wi-fi",
  "name": "iPad Air 11\" (M4) 1 ТБ · Wi‑Fi",
  "model": "iPad Air 11\" (M4)",
  "variant": "1 ТБ · Wi‑Fi",
  "storage": "1 ТБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 128190,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-air-11-m4-1-tb-wi-fi-plus-cellular",
  "name": "iPad Air 11\" (M4) 1 ТБ · Wi‑Fi + Cellular",
  "model": "iPad Air 11\" (M4)",
  "variant": "1 ТБ · Wi‑Fi + Cellular",
  "storage": "1 ТБ",
  "family": "ipad-air-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 149090,
  "image": "/images/p/ipad-air-11/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-air-11/seryy-kosmos.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-air-11/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-air-11/fioletovyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-air-11/siyayuschaya-zvezda.webp",
    "price": 151990
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina IPS LCD",
   "Разрешение экрана": "1640 x 2360",
   "Процессор": "Apple M4",
   "Основная камера": "12 МП, f/1.8, 1/3.0″, 1.22µm",
   "Фронтальная камера": "есть, 12 МП",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "464",
   "Размеры": "24,76 x 17,85 x 0,61 см",
   "Операционная система": "iPadOS 26",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Подключение внешних устройств по USB": "опционально"
  },
  "summary": "11″ · Apple M4 · 12 Мп",
  "inStock": true,
  "description": "iPad Air 11\" (M4): экран 11″ Liquid Retina IPS LCD, процессор Apple M4. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "galaxy-tab-s12-ultra-wi-fi-12-256-gb",
  "name": "Galaxy Tab S12 Ultra Wi-Fi 12/256 ГБ",
  "model": "Galaxy Tab S12 Ultra",
  "variant": "Wi-Fi 12/256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s12-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 130090,
  "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Wi-Fi 12/256 ГБ",
   "display": "14.6\" Dynamic AMOLED 2X, 120 Гц",
   "chip": "MediaTek Dimensity 9500",
   "battery": "11 600 мАч, до 23 ч видео",
   "body": "5.1 мм, IP68, S Pen в комплекте"
  },
  "summary": "14.6\" Dynamic AMOLED 2X, 120 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Самый большой и самый тонкий планшет Samsung, 14,6 дюйма при толщине 5,1 мм. Перо S Pen в комплекте, защита IP68, двойная основная камера."
 },
 {
  "id": "galaxy-tab-s12-ultra-5g-12-256-gb",
  "name": "Galaxy Tab S12 Ultra 5G 12/256 ГБ",
  "model": "Galaxy Tab S12 Ultra",
  "variant": "5G 12/256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s12-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 144390,
  "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "5G 12/256 ГБ",
   "display": "14.6\" Dynamic AMOLED 2X, 120 Гц",
   "chip": "MediaTek Dimensity 9500",
   "battery": "11 600 мАч, до 23 ч видео",
   "body": "5.1 мм, IP68, S Pen в комплекте"
  },
  "summary": "14.6\" Dynamic AMOLED 2X, 120 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Самый большой и самый тонкий планшет Samsung, 14,6 дюйма при толщине 5,1 мм. Перо S Pen в комплекте, защита IP68, двойная основная камера."
 },
 {
  "id": "galaxy-tab-s12-ultra-wi-fi-12-512-gb",
  "name": "Galaxy Tab S12 Ultra Wi-Fi 12/512 ГБ",
  "model": "Galaxy Tab S12 Ultra",
  "variant": "Wi-Fi 12/512 ГБ",
  "storage": "512 ГБ",
  "family": "galaxy-tab-s12-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 151990,
  "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s12-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Wi-Fi 12/512 ГБ",
   "display": "14.6\" Dynamic AMOLED 2X, 120 Гц",
   "chip": "MediaTek Dimensity 9500",
   "battery": "11 600 мАч, до 23 ч видео",
   "body": "5.1 мм, IP68, S Pen в комплекте"
  },
  "summary": "14.6\" Dynamic AMOLED 2X, 120 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Самый большой и самый тонкий планшет Samsung, 14,6 дюйма при толщине 5,1 мм. Перо S Pen в комплекте, защита IP68, двойная основная камера."
 },
 {
  "id": "galaxy-tab-s12-plus-wi-fi-12-256-gb",
  "name": "Galaxy Tab S12+ Wi-Fi 12/256 ГБ",
  "model": "Galaxy Tab S12+",
  "variant": "Wi-Fi 12/256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s12-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 112090,
  "image": "/images/p/galaxy-tab-s12-plus/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s12-plus/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Wi-Fi 12/256 ГБ",
   "display": "12.6\" Dynamic AMOLED 2X, 120 Гц",
   "chip": "MediaTek Dimensity 9500",
   "battery": "до 21 ч видео",
   "body": "IP68, S Pen в комплекте"
  },
  "summary": "12.6\" Dynamic AMOLED 2X, 120 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Планшет 12,6 дюйма из новой серии Tab S12: тот же чип, что у Ultra, перо в комплекте, защита IP68. Меньше и дешевле Ultra, одна основная камера и Wi-Fi 6E."
 },
 {
  "id": "galaxy-tab-s12-plus-5g-12-256-gb",
  "name": "Galaxy Tab S12+ 5G 12/256 ГБ",
  "model": "Galaxy Tab S12+",
  "variant": "5G 12/256 ГБ",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s12-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 125390,
  "image": "/images/p/galaxy-tab-s12-plus/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s12-plus/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "5G 12/256 ГБ",
   "display": "12.6\" Dynamic AMOLED 2X, 120 Гц",
   "chip": "MediaTek Dimensity 9500",
   "battery": "до 21 ч видео",
   "body": "IP68, S Pen в комплекте"
  },
  "summary": "12.6\" Dynamic AMOLED 2X, 120 Гц · MediaTek Dimensity 9500",
  "inStock": true,
  "description": "Планшет 12,6 дюйма из новой серии Tab S12: тот же чип, что у Ultra, перо в комплекте, защита IP68. Меньше и дешевле Ultra, одна основная камера и Wi-Fi 6E."
 },
 {
  "id": "ipad-11-a16-128-gb-wi-fi",
  "name": "iPad 11\" (A16) 128 ГБ · Wi‑Fi",
  "model": "iPad 11\" (A16)",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 40790,
  "image": "/images/p/ipad-11/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp"
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-11-a16-128-gb-wi-fi-plus-cellular",
  "name": "iPad 11\" (A16) 128 ГБ · Wi‑Fi + Cellular",
  "model": "iPad 11\" (A16)",
  "variant": "128 ГБ · Wi‑Fi + Cellular",
  "storage": "128 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 50290,
  "image": "/images/p/ipad-11/siniy.webp",
  "colors": [
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp",
    "price": 53190
   },
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp",
    "price": 53190
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp",
    "price": 53190
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-11-a16-256-gb-wi-fi",
  "name": "iPad 11\" (A16) 256 ГБ · Wi‑Fi",
  "model": "iPad 11\" (A16)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 51290,
  "image": "/images/p/ipad-11/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp",
    "price": 52190
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp",
    "price": 52190
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-11-a16-256-gb-wi-fi-plus-cellular",
  "name": "iPad 11\" (A16) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad 11\" (A16)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 73090,
  "image": "/images/p/ipad-11/rozovyy.webp",
  "colors": [
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp",
    "price": 74090
   },
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp",
    "price": 74090
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp",
    "price": 74090
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-11-a16-512-gb-wi-fi",
  "name": "iPad 11\" (A16) 512 ГБ · Wi‑Fi",
  "model": "iPad 11\" (A16)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 75990,
  "image": "/images/p/ipad-11/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp"
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-11-a16-512-gb-wi-fi-plus-cellular",
  "name": "iPad 11\" (A16) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad 11\" (A16)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-11",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 82590,
  "image": "/images/p/ipad-11/siniy.webp",
  "colors": [
   {
    "name": "Синий",
    "image": "/images/p/ipad-11/siniy.webp"
   },
   {
    "name": "Жёлтый",
    "image": "/images/p/ipad-11/zheltyy.webp"
   },
   {
    "name": "Розовый",
    "image": "/images/p/ipad-11/rozovyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/ipad-11/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "11″",
   "Тип экрана": "Liquid Retina",
   "Разрешение экрана": "2360×1640",
   "Процессор": "Apple A16 Bionic",
   "Основная камера": "12 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "28.93 вТч",
   "Время работы": "до 10 часов",
   "Материал корпуса": "Алюминий",
   "Вес, г": "477",
   "Размеры": "24,86 x 17,95 x 0,7 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (1), Apple Pencil (USB-C)"
  },
  "summary": "11″ · Apple A16 Bionic · 12 Мп",
  "inStock": true,
  "description": "iPad 11\" (A16): экран 11″ Liquid Retina, процессор Apple A16 Bionic. Основная камера 12 МП, аккумулятор 28.93 вТч."
 },
 {
  "id": "ipad-mini-a17-pro-128-gb-wi-fi",
  "name": "iPad mini (A17 Pro) 128 ГБ · Wi‑Fi",
  "model": "iPad mini (A17 Pro)",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 53190,
  "image": "/images/p/ipad-mini/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "ipad-mini-a17-pro-256-gb-wi-fi",
  "name": "iPad mini (A17 Pro) 256 ГБ · Wi‑Fi",
  "model": "iPad mini (A17 Pro)",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 59790,
  "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp",
    "price": 60790
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "ipad-mini-a17-pro-128-gb-wi-fi-plus-cellular",
  "name": "iPad mini (A17 Pro) 128 ГБ · Wi‑Fi + Cellular",
  "model": "iPad mini (A17 Pro)",
  "variant": "128 ГБ · Wi‑Fi + Cellular",
  "storage": "128 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 65490,
  "image": "/images/p/ipad-mini/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp",
    "price": 66490
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp",
    "price": 66490
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp",
    "price": 66490
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi + Cellular",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "ipad-mini-a17-pro-512-gb-wi-fi",
  "name": "iPad mini (A17 Pro) 512 ГБ · Wi‑Fi",
  "model": "iPad mini (A17 Pro)",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 81690,
  "image": "/images/p/ipad-mini/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "ipad-mini-a17-pro-256-gb-wi-fi-plus-cellular",
  "name": "iPad mini (A17 Pro) 256 ГБ · Wi‑Fi + Cellular",
  "model": "iPad mini (A17 Pro)",
  "variant": "256 ГБ · Wi‑Fi + Cellular",
  "storage": "256 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 83590,
  "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp"
   },
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp",
    "price": 85490
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi + Cellular",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "ipad-mini-a17-pro-512-gb-wi-fi-plus-cellular",
  "name": "iPad mini (A17 Pro) 512 ГБ · Wi‑Fi + Cellular",
  "model": "iPad mini (A17 Pro)",
  "variant": "512 ГБ · Wi‑Fi + Cellular",
  "storage": "512 ГБ",
  "family": "ipad-mini",
  "brand": "Apple",
  "category": "Планшеты",
  "price": 100690,
  "image": "/images/p/ipad-mini/seryy-kosmos.webp",
  "colors": [
   {
    "name": "Серый космос",
    "image": "/images/p/ipad-mini/seryy-kosmos.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/ipad-mini/siyayuschaya-zvezda.webp",
    "price": 105390
   },
   {
    "name": "Голубой",
    "image": "/images/p/ipad-mini/goluboy.webp",
    "price": 105390
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/ipad-mini/fioletovyy.webp",
    "price": 105390
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi + Cellular",
   "Экран": "8,3″",
   "Тип экрана": "Retina Multi-Touch с подсветкой LED",
   "Разрешение экрана": "2266×1488",
   "Процессор": "Apple A17 Pro",
   "Фронтальная камера": "12 МП",
   "Ёмкость аккумулятора": "19,3 Вт∙ч",
   "Время работы": "До 10 часов работы в интернете по Wi‑Fi или просмотра видео",
   "Материал корпуса": "Алюминий",
   "Вес, г": "293",
   "Размеры": "19,54 x 13,48 x 0,63 см",
   "Операционная система": "iPadOS 18",
   "Подходящая модель Apple Pencil": "Apple Pencil (USB-C), Apple Pencil Pro",
   "Серия": "iPad mini",
   "Поддержка карт памяти": "нет"
  },
  "summary": "8,3″ · Apple A17 Pro",
  "inStock": true,
  "description": "iPad mini (A17 Pro): экран 8,3″ Retina Multi-Touch с подсветкой LED, процессор Apple A17 Pro. Аккумулятор 19,3 Вт∙ч."
 },
 {
  "id": "galaxy-tab-s11-ultra-256-gb-wi-fi",
  "name": "Galaxy Tab S11 Ultra 256 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 101590,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-ultra-512-gb-wi-fi",
  "name": "Galaxy Tab S11 Ultra 512 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 107290,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-ultra-256-gb-5g",
  "name": "Galaxy Tab S11 Ultra 256 ГБ · 5G",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "256 ГБ · 5G",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 110190,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · 5G",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-ultra-512-gb-5g",
  "name": "Galaxy Tab S11 Ultra 512 ГБ · 5G",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "512 ГБ · 5G",
  "storage": "512 ГБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 125390,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · 5G",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-ultra-1-tb-wi-fi",
  "name": "Galaxy Tab S11 Ultra 1 ТБ · Wi‑Fi",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "1 ТБ · Wi‑Fi",
  "storage": "1 ТБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 129190,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · Wi‑Fi",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-ultra-1-tb-5g",
  "name": "Galaxy Tab S11 Ultra 1 ТБ · 5G",
  "model": "Galaxy Tab S11 Ultra",
  "variant": "1 ТБ · 5G",
  "storage": "1 ТБ",
  "family": "galaxy-tab-s11-ultra",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 152890,
  "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11-ultra/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11-ultra/seryy.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ · 5G",
   "Экран": "14.6″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1848 x 2960",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Сверхширокоугольная камера": "8 МП, f/2.2",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "11600 мАч",
   "Время работы": "23 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "695"
  },
  "summary": "14.6″ · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11 Ultra: экран 14.6″ Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 11600 мАч."
 },
 {
  "id": "galaxy-tab-s11-128-gb-wi-fi",
  "name": "Galaxy Tab S11 128 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S11",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 64590,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s11-256-gb-wi-fi",
  "name": "Galaxy Tab S11 256 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S11",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 73090,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s11-128-gb-5g",
  "name": "Galaxy Tab S11 128 ГБ · 5G",
  "model": "Galaxy Tab S11",
  "variant": "128 ГБ · 5G",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 74090,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · 5G",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s11-512-gb-wi-fi",
  "name": "Galaxy Tab S11 512 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S11",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 83590,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s11-256-gb-5g",
  "name": "Galaxy Tab S11 256 ГБ · 5G",
  "model": "Galaxy Tab S11",
  "variant": "256 ГБ · 5G",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 84490,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · 5G",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s11-512-gb-5g",
  "name": "Galaxy Tab S11 512 ГБ · 5G",
  "model": "Galaxy Tab S11",
  "variant": "512 ГБ · 5G",
  "storage": "512 ГБ",
  "family": "galaxy-tab-s11",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 94990,
  "image": "/images/p/galaxy-tab-s11/serebro.webp",
  "colors": [
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s11/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s11/seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · 5G",
   "Экран": "11.0”",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "MediaTek Dimensity 9400+",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП, f/2.0, 26 мм, 1/3.4″, 1.0µm",
   "Фронтальная камера": "12 МП, f/2.4, 120˚",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "8400 мАч",
   "Время работы": "18 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "469",
   "Размеры": "25,38 x 16,53 x 0,55 см"
  },
  "summary": "11.0” · MediaTek Dimensity 9400+ · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S11: экран 11.0” Dynamic AMOLED 2X, 120 Гц, процессор MediaTek Dimensity 9400+. Основная камера 13 МП, аккумулятор 8400 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-plus-128-gb-wi-fi",
  "name": "Galaxy Tab S10 FE+ 128 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S10 FE+",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s10-fe-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 52190,
  "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe-plus/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe-plus/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "13,1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1800 x 2880",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10090 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "664",
   "Размеры": "30,06 x 19,47 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "13,1″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE+: экран 13,1″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 10090 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-plus-128-gb-5g",
  "name": "Galaxy Tab S10 FE+ 128 ГБ · 5G",
  "model": "Galaxy Tab S10 FE+",
  "variant": "128 ГБ · 5G",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s10-fe-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 60790,
  "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe-plus/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe-plus/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · 5G",
   "Экран": "13,1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1800 x 2880",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10090 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "664",
   "Размеры": "30,06 x 19,47 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "13,1″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE+: экран 13,1″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 10090 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-plus-256-gb-wi-fi",
  "name": "Galaxy Tab S10 FE+ 256 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S10 FE+",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s10-fe-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 63590,
  "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe-plus/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe-plus/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "13,1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1800 x 2880",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10090 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "664",
   "Размеры": "30,06 x 19,47 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "13,1″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE+: экран 13,1″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 10090 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-plus-256-gb-5g",
  "name": "Galaxy Tab S10 FE+ 256 ГБ · 5G",
  "model": "Galaxy Tab S10 FE+",
  "variant": "256 ГБ · 5G",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s10-fe-plus",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 69290,
  "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe-plus/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe-plus/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe-plus/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · 5G",
   "Экран": "13,1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1800 x 2880",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10090 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "664",
   "Размеры": "30,06 x 19,47 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "13,1″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE+: экран 13,1″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 10090 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-128-gb-wi-fi",
  "name": "Galaxy Tab S10 FE 128 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S10 FE",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s10-fe",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 37990,
  "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe/seryy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe/serebro.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "10.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1440 x 2304",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "497",
   "Размеры": "25,43 x 16,58 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "10.9″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE: экран 10.9″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 8000 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-128-gb-5g",
  "name": "Galaxy Tab S10 FE 128 ГБ · 5G",
  "model": "Galaxy Tab S10 FE",
  "variant": "128 ГБ · 5G",
  "storage": "128 ГБ",
  "family": "galaxy-tab-s10-fe",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 48390,
  "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · 5G",
   "Экран": "10.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1440 x 2304",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "497",
   "Размеры": "25,43 x 16,58 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "10.9″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE: экран 10.9″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 8000 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-256-gb-wi-fi",
  "name": "Galaxy Tab S10 FE 256 ГБ · Wi‑Fi",
  "model": "Galaxy Tab S10 FE",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s10-fe",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 56990,
  "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "10.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1440 x 2304",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "497",
   "Размеры": "25,43 x 16,58 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "10.9″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE: экран 10.9″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 8000 мАч."
 },
 {
  "id": "galaxy-tab-s10-fe-256-gb-5g",
  "name": "Galaxy Tab S10 FE 256 ГБ · 5G",
  "model": "Galaxy Tab S10 FE",
  "variant": "256 ГБ · 5G",
  "storage": "256 ГБ",
  "family": "galaxy-tab-s10-fe",
  "brand": "Samsung",
  "category": "Планшеты",
  "price": 65490,
  "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/galaxy-tab-s10-fe/goluboy.webp"
   },
   {
    "name": "Серебро",
    "image": "/images/p/galaxy-tab-s10-fe/serebro.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-tab-s10-fe/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · 5G",
   "Экран": "10.9″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1440 x 2304",
   "Процессор": "Exynos 1580 (4 nm)",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "13 МП",
   "Фронтальная камера": "12 МП",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "497",
   "Размеры": "25,43 x 16,58 x 0,6 см",
   "Операционная система": "Android 15"
  },
  "summary": "10.9″ · Exynos 1580 (4 nm) · 13 Мп",
  "inStock": true,
  "description": "Galaxy Tab S10 FE: экран 10.9″ IPS, 90 Гц, процессор Exynos 1580 (4 nm). Основная камера 13 МП, аккумулятор 8000 мАч."
 },
 {
  "id": "xiaomi-pad-7-128-gb-wi-fi",
  "name": "Xiaomi Pad 7 128 ГБ · Wi‑Fi",
  "model": "Xiaomi Pad 7",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "xiaomi-pad-7",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 30390,
  "image": "/images/p/xiaomi-pad-7/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/xiaomi-pad-7/zelenyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/xiaomi-pad-7/goluboy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-pad-7/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "2136 x 3200",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "13 МП, f/2.2, 1/3.06″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8850 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "500",
   "Размеры": "25,12 x 17,34 x 0,62 см",
   "Операционная система": "Android 15",
   "Подключение к компьютеру по USB": "есть"
  },
  "summary": "11″ · 13 Мп",
  "inStock": true,
  "description": "Xiaomi Pad 7: экран 11″ IPS, 144 Гц. Основная камера 13 МП, аккумулятор 8850 мАч."
 },
 {
  "id": "xiaomi-pad-7-256-gb-wi-fi",
  "name": "Xiaomi Pad 7 256 ГБ · Wi‑Fi",
  "model": "Xiaomi Pad 7",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "xiaomi-pad-7",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 31790,
  "image": "/images/p/xiaomi-pad-7/zelenyy.webp",
  "colors": [
   {
    "name": "Зелёный",
    "image": "/images/p/xiaomi-pad-7/zelenyy.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/xiaomi-pad-7/goluboy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-pad-7/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "2136 x 3200",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "13 МП, f/2.2, 1/3.06″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "8850 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "500",
   "Размеры": "25,12 x 17,34 x 0,62 см",
   "Операционная система": "Android 15",
   "Подключение к компьютеру по USB": "есть"
  },
  "summary": "11″ · 13 Мп",
  "inStock": true,
  "description": "Xiaomi Pad 7: экран 11″ IPS, 144 Гц. Основная камера 13 МП, аккумулятор 8850 мАч."
 },
 {
  "id": "redmi-pad-2-pro-128-gb-wi-fi",
  "name": "Redmi Pad 2 Pro 128 ГБ · Wi‑Fi",
  "model": "Redmi Pad 2 Pro",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "redmi-pad-2-pro",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 26090,
  "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp",
  "colors": [
   {
    "name": "Графитовый серый",
    "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp"
   },
   {
    "name": "Лавандовый фиолетовый",
    "image": "/images/p/redmi-pad-2-pro/lavandovyy-fioletovyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/redmi-pad-2-pro/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "12.1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "Qualcomm SM7635 Snapdragon 7s Gen 4",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "8 МП, f/2.0, 1/4.0″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "12000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "610",
   "Размеры": "27,98 x 18,17 x 0,75 см",
   "Операционная система": "Android 15"
  },
  "summary": "12.1″ · Qualcomm SM7635 Snapdragon 7s Gen 4 · 8 Мп",
  "inStock": true,
  "description": "Redmi Pad 2 Pro: экран 12.1″ IPS, 120 Гц, процессор Qualcomm SM7635 Snapdragon 7s Gen 4. Основная камера 8 МП, аккумулятор 12000 мАч."
 },
 {
  "id": "redmi-pad-2-pro-256-gb-wi-fi",
  "name": "Redmi Pad 2 Pro 256 ГБ · Wi‑Fi",
  "model": "Redmi Pad 2 Pro",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "redmi-pad-2-pro",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 28490,
  "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp",
  "colors": [
   {
    "name": "Графитовый серый",
    "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp"
   },
   {
    "name": "Лавандовый фиолетовый",
    "image": "/images/p/redmi-pad-2-pro/lavandovyy-fioletovyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/redmi-pad-2-pro/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "12.1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "Qualcomm SM7635 Snapdragon 7s Gen 4",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "8 МП, f/2.0, 1/4.0″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "12000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "610",
   "Размеры": "27,98 x 18,17 x 0,75 см",
   "Операционная система": "Android 15"
  },
  "summary": "12.1″ · Qualcomm SM7635 Snapdragon 7s Gen 4 · 8 Мп",
  "inStock": true,
  "description": "Redmi Pad 2 Pro: экран 12.1″ IPS, 120 Гц, процессор Qualcomm SM7635 Snapdragon 7s Gen 4. Основная камера 8 МП, аккумулятор 12000 мАч."
 },
 {
  "id": "redmi-pad-2-pro-128-gb-5g",
  "name": "Redmi Pad 2 Pro 128 ГБ · 5G",
  "model": "Redmi Pad 2 Pro",
  "variant": "128 ГБ · 5G",
  "storage": "128 ГБ",
  "family": "redmi-pad-2-pro",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 28890,
  "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp",
  "colors": [
   {
    "name": "Графитовый серый",
    "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/redmi-pad-2-pro/serebristyy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · 5G",
   "Экран": "12.1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "Qualcomm SM7635 Snapdragon 7s Gen 4",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "8 МП, f/2.0, 1/4.0″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "12000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "610",
   "Размеры": "27,98 x 18,17 x 0,75 см",
   "Операционная система": "Android 15"
  },
  "summary": "12.1″ · Qualcomm SM7635 Snapdragon 7s Gen 4 · 8 Мп",
  "inStock": true,
  "description": "Redmi Pad 2 Pro: экран 12.1″ IPS, 120 Гц, процессор Qualcomm SM7635 Snapdragon 7s Gen 4. Основная камера 8 МП, аккумулятор 12000 мАч."
 },
 {
  "id": "redmi-pad-2-pro-256-gb-5g",
  "name": "Redmi Pad 2 Pro 256 ГБ · 5G",
  "model": "Redmi Pad 2 Pro",
  "variant": "256 ГБ · 5G",
  "storage": "256 ГБ",
  "family": "redmi-pad-2-pro",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 30790,
  "image": "/images/p/redmi-pad-2-pro/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/redmi-pad-2-pro/serebristyy.webp"
   },
   {
    "name": "Графитовый серый",
    "image": "/images/p/redmi-pad-2-pro/grafitovyy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · 5G",
   "Экран": "12.1″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1600 x 2560",
   "Процессор": "Qualcomm SM7635 Snapdragon 7s Gen 4",
   "Объем оперативной памяти": "6 ГБ",
   "Основная камера": "8 МП, f/2.0, 1/4.0″, 1.12µm",
   "Фронтальная камера": "8 МП, f/2.3, 1/4.0″, 1.12µm",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "12000 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "610",
   "Размеры": "27,98 x 18,17 x 0,75 см",
   "Операционная система": "Android 15"
  },
  "summary": "12.1″ · Qualcomm SM7635 Snapdragon 7s Gen 4 · 8 Мп",
  "inStock": true,
  "description": "Redmi Pad 2 Pro: экран 12.1″ IPS, 120 Гц, процессор Qualcomm SM7635 Snapdragon 7s Gen 4. Основная камера 8 МП, аккумулятор 12000 мАч."
 },
 {
  "id": "huawei-matepad-11-5-s-128-gb-wi-fi",
  "name": "Huawei MatePad 11.5\" S 128 ГБ · Wi‑Fi",
  "model": "Huawei MatePad 11.5\" S",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "matepad-11-5-s",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 18990,
  "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp",
  "colors": [
   {
    "name": "Космический серый",
    "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11,5″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2456×1600",
   "Объем оперативной памяти": "8 ГБ",
   "Фронтальная камера": "8 МП, f/2.0",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "10100 мАч",
   "Материал корпуса": "Металл",
   "Вес, г": "510",
   "Размеры": "26,1 x 17,73 x 0,62 см",
   "Операционная система": "HarmonyOS 4.2",
   "Материал": "металл",
   "Поддержка карт памяти": "нет"
  },
  "summary": "11,5″",
  "inStock": true,
  "description": "Huawei MatePad 11.5\" S: экран 11,5″ IPS, 120 Гц. Аккумулятор 10100 мАч."
 },
 {
  "id": "huawei-matepad-11-5-s-256-gb-wi-fi",
  "name": "Huawei MatePad 11.5\" S 256 ГБ · Wi‑Fi",
  "model": "Huawei MatePad 11.5\" S",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "matepad-11-5-s",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 25590,
  "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp",
  "colors": [
   {
    "name": "Космический серый",
    "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp"
   },
   {
    "name": "Зелёный",
    "image": "/images/p/matepad-11-5-s/zelenyy.webp",
    "price": 32290
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "11,5″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2456×1600",
   "Объем оперативной памяти": "8 ГБ",
   "Фронтальная камера": "8 МП, f/2.0",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "10100 мАч",
   "Материал корпуса": "Металл",
   "Вес, г": "510",
   "Размеры": "26,1 x 17,73 x 0,62 см",
   "Операционная система": "HarmonyOS 4.2",
   "Материал": "металл",
   "Поддержка карт памяти": "нет"
  },
  "summary": "11,5″",
  "inStock": true,
  "description": "Huawei MatePad 11.5\" S: экран 11,5″ IPS, 120 Гц. Аккумулятор 10100 мАч."
 },
 {
  "id": "huawei-matepad-11-5-s-512-gb-wi-fi",
  "name": "Huawei MatePad 11.5\" S 512 ГБ · Wi‑Fi",
  "model": "Huawei MatePad 11.5\" S",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "matepad-11-5-s",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 33190,
  "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp",
  "colors": [
   {
    "name": "Космический серый",
    "image": "/images/p/matepad-11-5-s/kosmicheskiy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "11,5″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2456×1600",
   "Объем оперативной памяти": "8 ГБ",
   "Фронтальная камера": "8 МП, f/2.0",
   "Макс. разрешение видео": "1080p",
   "Ёмкость аккумулятора": "10100 мАч",
   "Материал корпуса": "Металл",
   "Вес, г": "510",
   "Размеры": "26,1 x 17,73 x 0,62 см",
   "Операционная система": "HarmonyOS 4.2",
   "Материал": "металл",
   "Поддержка карт памяти": "нет"
  },
  "summary": "11,5″",
  "inStock": true,
  "description": "Huawei MatePad 11.5\" S: экран 11,5″ IPS, 120 Гц. Аккумулятор 10100 мАч."
 },
 {
  "id": "huawei-matepad-pro-max-256-gb-wi-fi",
  "name": "Huawei MatePad Pro Max 256 ГБ · Wi‑Fi",
  "model": "Huawei MatePad Pro Max",
  "variant": "256 ГБ · Wi‑Fi",
  "storage": "256 ГБ",
  "family": "matepad-pro-max",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 88290,
  "image": "/images/p/matepad-pro-max/kosmicheskiy-seryy.webp",
  "colors": [
   {
    "name": "Космический серый",
    "image": "/images/p/matepad-pro-max/kosmicheskiy-seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ · Wi‑Fi",
   "Экран": "13.2″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "3000 x 2000",
   "Процессор": "Kirin T93 Pro",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8",
   "Фронтальная камера": "12 МП, f/2.4",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10400 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "509",
   "Размеры": "28,93 x 19,63 x 0,47 см",
   "Операционная система": "HarmonyOS 4.3"
  },
  "summary": "13.2″ · Kirin T93 Pro · 50 Мп",
  "inStock": true,
  "description": "Huawei MatePad Pro Max: экран 13.2″ OLED, 144 Гц, процессор Kirin T93 Pro. Основная камера 50 МП, аккумулятор 10400 мАч."
 },
 {
  "id": "huawei-matepad-pro-max-512-gb-wi-fi",
  "name": "Huawei MatePad Pro Max 512 ГБ · Wi‑Fi",
  "model": "Huawei MatePad Pro Max",
  "variant": "512 ГБ · Wi‑Fi",
  "storage": "512 ГБ",
  "family": "matepad-pro-max",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 104490,
  "image": "/images/p/matepad-pro-max/goluboy.webp",
  "colors": [
   {
    "name": "Голубой",
    "image": "/images/p/matepad-pro-max/goluboy.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ · Wi‑Fi",
   "Экран": "13.2″",
   "Тип экрана": "OLED",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "3000 x 2000",
   "Процессор": "Kirin T93 Pro",
   "Объем оперативной памяти": "12 ГБ",
   "Основная камера": "50 МП, f/1.8",
   "Фронтальная камера": "12 МП, f/2.4",
   "Макс. разрешение видео": "4K",
   "Ёмкость аккумулятора": "10400 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "509",
   "Размеры": "28,93 x 19,63 x 0,47 см",
   "Операционная система": "HarmonyOS 4.3"
  },
  "summary": "13.2″ · Kirin T93 Pro · 50 Мп",
  "inStock": true,
  "description": "Huawei MatePad Pro Max: экран 13.2″ OLED, 144 Гц, процессор Kirin T93 Pro. Основная камера 50 МП, аккумулятор 10400 мАч."
 },
 {
  "id": "xiaomi-pad-8-pro-128-gb-wi-fi",
  "name": "Xiaomi Pad 8 Pro 128 ГБ · Wi‑Fi",
  "model": "Xiaomi Pad 8 Pro",
  "variant": "128 ГБ · Wi‑Fi",
  "storage": "128 ГБ",
  "family": "xiaomi-pad-8-pro",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 45090,
  "image": "/images/p/xiaomi-pad-8-pro/sosnovyy-les.webp",
  "colors": [
   {
    "name": "Сосновый лес",
    "image": "/images/p/xiaomi-pad-8-pro/sosnovyy-les.webp"
   },
   {
    "name": "Синий",
    "image": "/images/p/xiaomi-pad-8-pro/siniy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-pad-8-pro/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ · Wi‑Fi",
   "Экран": "11,2″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "144 Гц",
   "Разрешение экрана": "2136 x 3200",
   "Процессор": "Qualcomm SM8750-AB Snapdragon 8 Elite",
   "Объем оперативной памяти": "8 ГБ",
   "Основная камера": "50 MP, f/1.8, 1/2.76″, 0.64µm",
   "Фронтальная камера": "32 MP, f/2.2, 19 мм, 1/3.6″, 0.61µm",
   "Макс. разрешение видео": "4К",
   "Ёмкость аккумулятора": "9200 мАч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "485",
   "Размеры": "25,12 x 17,34 x 0,58 см",
   "Операционная система": "Android 16"
  },
  "summary": "11,2″ · Qualcomm SM8750-AB Snapdragon 8 Elite",
  "inStock": true,
  "description": "Xiaomi Pad 8 Pro: экран 11,2″ IPS, 144 Гц, процессор Qualcomm SM8750-AB Snapdragon 8 Elite. Основная камера 50 MP, аккумулятор 9200 мАч."
 },
 {
  "id": "xiaomi-pad-8-128-gb",
  "name": "Xiaomi Pad 8 128 ГБ",
  "model": "Xiaomi Pad 8",
  "variant": "128 ГБ",
  "storage": "128 ГБ",
  "family": "xiaomi-pad-8",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 36490,
  "image": "/images/p/xiaomi-pad-8/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-pad-8/seryy.webp"
   }
  ],
  "specs": {
   "Память": "128 ГБ",
   "display": "11.2\" 3.2K (3200×2136)",
   "chip": "Snapdragon 8s Gen 4",
   "battery": "9200 мА·ч, 45 Вт",
   "weight": "485 г"
  },
  "summary": "11.2\" 3.2K (3200×2136) · Snapdragon 8s Gen 4",
  "inStock": true,
  "description": "Базовый планшет Xiaomi текущего поколения с экраном 11,2 дюйма 3,2K. Производительный Snapdragon 8s Gen 4 при цене ниже Pro-версии."
 },
 {
  "id": "xiaomi-pad-8-256-gb",
  "name": "Xiaomi Pad 8 256 ГБ",
  "model": "Xiaomi Pad 8",
  "variant": "256 ГБ",
  "storage": "256 ГБ",
  "family": "xiaomi-pad-8",
  "brand": "Xiaomi",
  "category": "Планшеты",
  "price": 43390,
  "image": "/images/p/xiaomi-pad-8/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/xiaomi-pad-8/seryy.webp"
   }
  ],
  "specs": {
   "Память": "256 ГБ",
   "display": "11.2\" 3.2K (3200×2136)",
   "chip": "Snapdragon 8s Gen 4",
   "battery": "9200 мА·ч, 45 Вт",
   "weight": "485 г"
  },
  "summary": "11.2\" 3.2K (3200×2136) · Snapdragon 8s Gen 4",
  "inStock": true,
  "description": "Базовый планшет Xiaomi текущего поколения с экраном 11,2 дюйма 3,2K. Производительный Snapdragon 8s Gen 4 при цене ниже Pro-версии."
 },
 {
  "id": "huawei-matepad-pro-13-2-12-256-gb-wi-fi",
  "name": "Huawei MatePad Pro 13.2\" 12/256 ГБ, Wi-Fi",
  "model": "Huawei MatePad Pro 13.2\"",
  "variant": "12/256 ГБ, Wi-Fi",
  "storage": "256 ГБ",
  "family": "matepad-pro-13",
  "brand": "Huawei",
  "category": "Планшеты",
  "price": 67790,
  "image": "/images/p/matepad-pro-13/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/matepad-pro-13/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "12/256 ГБ, Wi-Fi",
   "display": "13,2\" гибкий OLED, версия PaperMatte",
   "chip": "Kirin T92",
   "memory": "12 ГБ + 256/512 ГБ",
   "camera": "13 МП + 8 МП"
  },
  "summary": "13,2\" гибкий OLED, версия PaperMatte · Kirin T92 · 13 Мп",
  "inStock": true,
  "description": "Большой планшет Huawei с OLED-экраном 13,2 дюйма для работы с документами и рисования. Работает с клавиатурой и стилусом и запускает настольную версию WPS Office."
 },
 {
  "id": "macbook-pro-16-m5-pro-18-20-24-gb-1-tb",
  "name": "MacBook Pro 16\" M5 Pro 18/20 · 24 ГБ · 1 ТБ",
  "model": "MacBook Pro 16\"",
  "variant": "M5 Pro 18/20 · 24 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-16",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 251690,
  "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-16/serebristyy.webp",
    "price": 255490
   }
  ],
  "specs": {
   "Конфигурация": "M5 Pro 18/20 · 24 ГБ · 1 ТБ",
   "Экран": "16.2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "3456x2234",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "100 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "2150",
   "Размеры": "35,6 x 24,8 x 1,7 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 16",
   "Количество ядер процессора": "18"
  },
  "summary": "16.2″ · Дисплей Liquid Retina XDR · 120 Гц",
  "inStock": true,
  "description": "MacBook Pro 16\": экран — 16.2″; тип экрана — Дисплей Liquid Retina XDR; частота обновления экрана — 120 Гц."
 },
 {
  "id": "macbook-pro-16-m5-max-18-32-36-gb-2-tb",
  "name": "MacBook Pro 16\" M5 Max 18/32 · 36 ГБ · 2 ТБ",
  "model": "MacBook Pro 16\"",
  "variant": "M5 Max 18/32 · 36 ГБ · 2 ТБ",
  "storage": null,
  "family": "macbook-pro-16",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 311590,
  "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-16/serebristyy.webp",
    "price": 322990
   }
  ],
  "specs": {
   "Конфигурация": "M5 Max 18/32 · 36 ГБ · 2 ТБ",
   "Экран": "16.2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "3456x2234",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "100 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "2150",
   "Размеры": "35,6 x 24,8 x 1,7 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 16",
   "Количество ядер процессора": "18"
  },
  "summary": "16.2″ · Дисплей Liquid Retina XDR · 120 Гц",
  "inStock": true,
  "description": "MacBook Pro 16\": экран — 16.2″; тип экрана — Дисплей Liquid Retina XDR; частота обновления экрана — 120 Гц."
 },
 {
  "id": "macbook-pro-16-m5-pro-18-20-48-gb-1-tb",
  "name": "MacBook Pro 16\" M5 Pro 18/20 · 48 ГБ · 1 ТБ",
  "model": "MacBook Pro 16\"",
  "variant": "M5 Pro 18/20 · 48 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-16",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 311590,
  "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-16/serebristyy.webp",
    "price": 313490
   }
  ],
  "specs": {
   "Конфигурация": "M5 Pro 18/20 · 48 ГБ · 1 ТБ",
   "Экран": "16.2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "3456x2234",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "100 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "2150",
   "Размеры": "35,6 x 24,8 x 1,7 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 16",
   "Количество ядер процессора": "18"
  },
  "summary": "16.2″ · Дисплей Liquid Retina XDR · 120 Гц",
  "inStock": true,
  "description": "MacBook Pro 16\": экран — 16.2″; тип экрана — Дисплей Liquid Retina XDR; частота обновления экрана — 120 Гц."
 },
 {
  "id": "macbook-pro-16-m5-max-18-40-48-gb-2-tb",
  "name": "MacBook Pro 16\" M5 Max 18/40 · 48 ГБ · 2 ТБ",
  "model": "MacBook Pro 16\"",
  "variant": "M5 Max 18/40 · 48 ГБ · 2 ТБ",
  "storage": null,
  "family": "macbook-pro-16",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 391390,
  "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-16/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-16/serebristyy.webp",
    "price": 400890
   }
  ],
  "specs": {
   "Конфигурация": "M5 Max 18/40 · 48 ГБ · 2 ТБ",
   "Экран": "16.2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "3456x2234",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "100 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "2150",
   "Размеры": "35,6 x 24,8 x 1,7 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 16",
   "Количество ядер процессора": "18"
  },
  "summary": "16.2″ · Дисплей Liquid Retina XDR · 120 Гц",
  "inStock": true,
  "description": "MacBook Pro 16\": экран — 16.2″; тип экрана — Дисплей Liquid Retina XDR; частота обновления экрана — 120 Гц."
 },
 {
  "id": "macbook-pro-14-m5-10-10-16-gb-1-tb",
  "name": "MacBook Pro 14\" M5 10/10 · 16 ГБ · 1 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 10/10 · 16 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 172890,
  "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp",
    "price": 181390
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 16 ГБ · 1 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-10-10-16-gb-512-gb",
  "name": "MacBook Pro 14\" M5 10/10 · 16 ГБ · 512 ГБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 10/10 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 172890,
  "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp",
    "price": 186190
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 16 ГБ · 512 ГБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-10-10-24-gb-1-tb",
  "name": "MacBook Pro 14\" M5 10/10 · 24 ГБ · 1 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 10/10 · 24 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 191890,
  "image": "/images/p/macbook-pro-14/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 24 ГБ · 1 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-pro-15-16-24-gb-1-tb",
  "name": "MacBook Pro 14\" M5 Pro 15/16 · 24 ГБ · 1 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 Pro 15/16 · 24 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 216590,
  "image": "/images/p/macbook-pro-14/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp",
    "price": 217490
   }
  ],
  "specs": {
   "Конфигурация": "M5 Pro 15/16 · 24 ГБ · 1 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-10-10-32-gb-1-tb",
  "name": "MacBook Pro 14\" M5 10/10 · 32 ГБ · 1 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 10/10 · 32 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 227990,
  "image": "/images/p/macbook-pro-14/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 32 ГБ · 1 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-pro-15-16-24-gb-2-tb",
  "name": "MacBook Pro 14\" M5 Pro 15/16 · 24 ГБ · 2 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 Pro 15/16 · 24 ГБ · 2 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 232690,
  "image": "/images/p/macbook-pro-14/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp"
   },
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   }
  ],
  "specs": {
   "Конфигурация": "M5 Pro 15/16 · 24 ГБ · 2 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-pro-18-20-24-gb-2-tb",
  "name": "MacBook Pro 14\" M5 Pro 18/20 · 24 ГБ · 2 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 Pro 18/20 · 24 ГБ · 2 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 253590,
  "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp",
    "price": 257390
   }
  ],
  "specs": {
   "Конфигурация": "M5 Pro 18/20 · 24 ГБ · 2 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-pro-14-m5-max-18-32-36-gb-2-tb",
  "name": "MacBook Pro 14\" M5 Max 18/32 · 36 ГБ · 2 ТБ",
  "model": "MacBook Pro 14\"",
  "variant": "M5 Max 18/32 · 36 ГБ · 2 ТБ",
  "storage": null,
  "family": "macbook-pro-14",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 327690,
  "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp",
  "colors": [
   {
    "name": "Чёрный космос",
    "image": "/images/p/macbook-pro-14/chernyy-kosmos.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-pro-14/serebristyy.webp",
    "price": 328690
   }
  ],
  "specs": {
   "Конфигурация": "M5 Max 18/32 · 36 ГБ · 2 ТБ",
   "Экран": "14,2″",
   "Тип экрана": "Дисплей Liquid Retina XDR",
   "Разрешение экрана": "3024×1964",
   "Процессор": "Apple M5 Max",
   "Объем оперативной памяти": "36 ГБ",
   "Ёмкость аккумулятора": "72,4 Вт/ч",
   "Время работы": "22 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1550",
   "Размеры": "1,55 x 31,26 x 22,12 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Pro 14",
   "Количество ядер процессора": "18",
   "Количество графических ядер": "32"
  },
  "summary": "14,2″ · Дисплей Liquid Retina XDR · 3024×1964",
  "inStock": true,
  "description": "MacBook Pro 14\": экран — 14,2″; тип экрана — Дисплей Liquid Retina XDR; разрешение экрана — 3024×1964."
 },
 {
  "id": "macbook-air-15-m5-10-10-16-gb-512-gb",
  "name": "MacBook Air 15\" M5 10/10 · 16 ГБ · 512 ГБ",
  "model": "MacBook Air 15\"",
  "variant": "M5 10/10 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "macbook-air-15",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 129190,
  "image": "/images/p/macbook-air-15/temnaya-noch.webp",
  "colors": [
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-15/temnaya-noch.webp"
   },
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-15/goluboe-nebo.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-15/siyayuschaya-zvezda.webp",
    "price": 132990
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-15/serebristyy.webp",
    "price": 133890
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 16 ГБ · 512 ГБ",
   "Экран": "15,3″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2880 x 1864",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "24 ГБ",
   "Ёмкость аккумулятора": "66,5 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1510",
   "Размеры": "34,04 x 23,76 x 1,15 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 15",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "10"
  },
  "summary": "15,3″ · 2880 x 1864 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 15\": экран — 15,3″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2880 x 1864."
 },
 {
  "id": "macbook-air-15-m5-10-10-16-gb-1-tb",
  "name": "MacBook Air 15\" M5 10/10 · 16 ГБ · 1 ТБ",
  "model": "MacBook Air 15\"",
  "variant": "M5 10/10 · 16 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-air-15",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 160490,
  "image": "/images/p/macbook-air-15/goluboe-nebo.webp",
  "colors": [
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-15/goluboe-nebo.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-15/siyayuschaya-zvezda.webp",
    "price": 161490
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-15/temnaya-noch.webp",
    "price": 161490
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-15/serebristyy.webp",
    "price": 168090
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 16 ГБ · 1 ТБ",
   "Экран": "15,3″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2880 x 1864",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "24 ГБ",
   "Ёмкость аккумулятора": "66,5 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1510",
   "Размеры": "34,04 x 23,76 x 1,15 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 15",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "10"
  },
  "summary": "15,3″ · 2880 x 1864 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 15\": экран — 15,3″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2880 x 1864."
 },
 {
  "id": "macbook-air-15-m5-10-10-24-gb-1-tb",
  "name": "MacBook Air 15\" M5 10/10 · 24 ГБ · 1 ТБ",
  "model": "MacBook Air 15\"",
  "variant": "M5 10/10 · 24 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-air-15",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 180490,
  "image": "/images/p/macbook-air-15/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-15/serebristyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-15/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-15/temnaya-noch.webp"
   },
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-15/goluboe-nebo.webp"
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 24 ГБ · 1 ТБ",
   "Экран": "15,3″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2880 x 1864",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "24 ГБ",
   "Ёмкость аккумулятора": "66,5 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1510",
   "Размеры": "34,04 x 23,76 x 1,15 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 15",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "10"
  },
  "summary": "15,3″ · 2880 x 1864 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 15\": экран — 15,3″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2880 x 1864."
 },
 {
  "id": "macbook-air-13-m5-10-8-16-gb-512-gb",
  "name": "MacBook Air 13\" M5 10/8 · 16 ГБ · 512 ГБ",
  "model": "MacBook Air 13\"",
  "variant": "M5 10/8 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "macbook-air-13",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 112090,
  "image": "/images/p/macbook-air-13/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-13/temnaya-noch.webp"
   },
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-13/goluboe-nebo.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-13/serebristyy.webp",
    "price": 114890
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/8 · 16 ГБ · 512 ГБ",
   "Экран": "13.6″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2560 x 1664",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "52.6 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1240",
   "Размеры": "30,41 x 21,5 x 1,13 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 13",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "8"
  },
  "summary": "13.6″ · 2560 x 1664 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 13\": экран — 13.6″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2560 x 1664."
 },
 {
  "id": "macbook-air-13-m5-10-10-16-gb-1-tb",
  "name": "MacBook Air 13\" M5 10/10 · 16 ГБ · 1 ТБ",
  "model": "MacBook Air 13\"",
  "variant": "M5 10/10 · 16 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-air-13",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 134890,
  "image": "/images/p/macbook-air-13/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-13/temnaya-noch.webp"
   },
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-13/goluboe-nebo.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-13/serebristyy.webp",
    "price": 136790
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 16 ГБ · 1 ТБ",
   "Экран": "13.6″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2560 x 1664",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "52.6 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1240",
   "Размеры": "30,41 x 21,5 x 1,13 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 13",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "8"
  },
  "summary": "13.6″ · 2560 x 1664 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 13\": экран — 13.6″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2560 x 1664."
 },
 {
  "id": "macbook-air-13-m5-10-10-24-gb-1-tb",
  "name": "MacBook Air 13\" M5 10/10 · 24 ГБ · 1 ТБ",
  "model": "MacBook Air 13\"",
  "variant": "M5 10/10 · 24 ГБ · 1 ТБ",
  "storage": null,
  "family": "macbook-air-13",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 153890,
  "image": "/images/p/macbook-air-13/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-air-13/serebristyy.webp"
   },
   {
    "name": "Сияющая звезда",
    "image": "/images/p/macbook-air-13/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубое небо",
    "image": "/images/p/macbook-air-13/goluboe-nebo.webp"
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/macbook-air-13/temnaya-noch.webp"
   }
  ],
  "specs": {
   "Конфигурация": "M5 10/10 · 24 ГБ · 1 ТБ",
   "Экран": "13.6″",
   "Тип экрана": "Retina с подсветкой LED и технологией IPS",
   "Разрешение экрана": "2560 x 1664",
   "Процессор": "Apple M5",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "52.6 Вт/ч",
   "Время работы": "18 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1240",
   "Размеры": "30,41 x 21,5 x 1,13 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Air 13",
   "Количество ядер процессора": "10",
   "Количество графических ядер": "8"
  },
  "summary": "13.6″ · 2560 x 1664 · Apple M5",
  "inStock": true,
  "description": "MacBook Air 13\": экран — 13.6″; тип экрана — Retina с подсветкой LED и технологией IPS; разрешение экрана — 2560 x 1664."
 },
 {
  "id": "macbook-neo-13-a18-pro-6-5-8-gb-256-gb",
  "name": "MacBook Neo 13\" A18 Pro 6/5 · 8 ГБ · 256 ГБ",
  "model": "MacBook Neo 13\"",
  "variant": "A18 Pro 6/5 · 8 ГБ · 256 ГБ",
  "storage": null,
  "family": "macbook-neo",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 64590,
  "image": "/images/p/macbook-neo/indigo.webp",
  "colors": [
   {
    "name": "Индиго",
    "image": "/images/p/macbook-neo/indigo.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-neo/serebristyy.webp",
    "price": 65490
   },
   {
    "name": "Цитрус",
    "image": "/images/p/macbook-neo/citrus.webp",
    "price": 65490
   },
   {
    "name": "Румянец",
    "image": "/images/p/macbook-neo/rumyanec.webp",
    "price": 66490
   }
  ],
  "specs": {
   "Конфигурация": "A18 Pro 6/5 · 8 ГБ · 256 ГБ",
   "Экран": "13″",
   "Тип экрана": "LED",
   "Разрешение экрана": "2408x1506",
   "Процессор": "Apple A18 Pro",
   "Объем оперативной памяти": "8 ГБ",
   "Ёмкость аккумулятора": "36.5 Вт/ч",
   "Время работы": "16 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1230",
   "Размеры": "29.75 x 20.64 x 1.27 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Neo",
   "Количество ядер процессора": "6",
   "Количество графических ядер": "5"
  },
  "summary": "13″ · LED · 2408x1506",
  "inStock": true,
  "description": "MacBook Neo 13\": экран — 13″; тип экрана — LED; разрешение экрана — 2408x1506."
 },
 {
  "id": "macbook-neo-13-a18-pro-6-5-8-gb-512-gb",
  "name": "MacBook Neo 13\" A18 Pro 6/5 · 8 ГБ · 512 ГБ",
  "model": "MacBook Neo 13\"",
  "variant": "A18 Pro 6/5 · 8 ГБ · 512 ГБ",
  "storage": null,
  "family": "macbook-neo",
  "brand": "Apple",
  "category": "Ноутбуки",
  "price": 74090,
  "image": "/images/p/macbook-neo/citrus.webp",
  "colors": [
   {
    "name": "Цитрус",
    "image": "/images/p/macbook-neo/citrus.webp"
   },
   {
    "name": "Индиго",
    "image": "/images/p/macbook-neo/indigo.webp",
    "price": 74990
   },
   {
    "name": "Серебристый",
    "image": "/images/p/macbook-neo/serebristyy.webp",
    "price": 75990
   },
   {
    "name": "Румянец",
    "image": "/images/p/macbook-neo/rumyanec.webp",
    "price": 76890
   }
  ],
  "specs": {
   "Конфигурация": "A18 Pro 6/5 · 8 ГБ · 512 ГБ",
   "Экран": "13″",
   "Тип экрана": "LED",
   "Разрешение экрана": "2408x1506",
   "Процессор": "Apple A18 Pro",
   "Объем оперативной памяти": "8 ГБ",
   "Ёмкость аккумулятора": "36.5 Вт/ч",
   "Время работы": "16 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "1230",
   "Размеры": "29.75 x 20.64 x 1.27 см",
   "Операционная система": "Mac OS",
   "Серия": "MacBook Neo",
   "Количество ядер процессора": "6",
   "Количество графических ядер": "5"
  },
  "summary": "13″ · LED · 2408x1506",
  "inStock": true,
  "description": "MacBook Neo 13\": экран — 13″; тип экрана — LED; разрешение экрана — 2408x1506."
 },
 {
  "id": "galaxy-book6-pro-16-intel-core-ultra-7-356h-16-gb-1-tb",
  "name": "Galaxy Book6 Pro 16\" Intel Core Ultra 7 356H · 16 ГБ · 1 ТБ",
  "model": "Galaxy Book6 Pro 16\"",
  "variant": "Intel Core Ultra 7 356H · 16 ГБ · 1 ТБ",
  "storage": null,
  "family": "galaxy-book6-pro-16",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 243190,
  "image": "/images/p/galaxy-book6-pro-16/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-pro-16/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 7 356H · 16 ГБ · 1 ТБ",
   "Экран": "16″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2880 x 1800",
   "Процессор": "Intel Core Ultra 7 356H",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "78.07 Вт/ч",
   "Время работы": "до 30 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1590",
   "Размеры": "35,69 x 24,8 x 1,19 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "16",
   "Объем кэша L3": "18 МБ"
  },
  "summary": "16″ · Dynamic AMOLED 2X · 120 Гц",
  "inStock": true,
  "description": "Galaxy Book6 Pro 16\": экран — 16″; тип экрана — Dynamic AMOLED 2X; частота обновления экрана — 120 Гц."
 },
 {
  "id": "galaxy-book6-pro-16-intel-core-ultra-7-356h-32-gb-1-tb",
  "name": "Galaxy Book6 Pro 16\" Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
  "model": "Galaxy Book6 Pro 16\"",
  "variant": "Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
  "storage": null,
  "family": "galaxy-book6-pro-16",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 256490,
  "image": "/images/p/galaxy-book6-pro-16/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-pro-16/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
   "Экран": "16″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2880 x 1800",
   "Процессор": "Intel Core Ultra 7 356H",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "78.07 Вт/ч",
   "Время работы": "до 30 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1590",
   "Размеры": "35,69 x 24,8 x 1,19 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "16",
   "Объем кэша L3": "18 МБ"
  },
  "summary": "16″ · Dynamic AMOLED 2X · 120 Гц",
  "inStock": true,
  "description": "Galaxy Book6 Pro 16\": экран — 16″; тип экрана — Dynamic AMOLED 2X; частота обновления экрана — 120 Гц."
 },
 {
  "id": "galaxy-book6-14-intel-core-ultra-5-325-16-gb-512-gb",
  "name": "Galaxy Book6 14\" Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
  "model": "Galaxy Book6 14\"",
  "variant": "Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "galaxy-book6-14",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 115890,
  "image": "/images/p/galaxy-book6-14/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-book6-14/serebristyy.webp"
   },
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-14/seryy.webp",
    "price": 120590
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
   "Экран": "14″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1920 x 1200",
   "Процессор": "Intel Core Ultra 5 325",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "61,2 Вт/ч",
   "Время работы": "до 24 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1430",
   "Размеры": "31,34 x 22,11 x 1,49 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "8",
   "Объем кэша L3": "12 МБ"
  },
  "summary": "14″ · IPS · 60 Гц",
  "inStock": true,
  "description": "Galaxy Book6 14\": экран — 14″; тип экрана — IPS; частота обновления экрана — 60 Гц."
 },
 {
  "id": "galaxy-book6-14-intel-core-ultra-7-355-16-gb-512-gb",
  "name": "Galaxy Book6 14\" Intel Core Ultra 7 355 · 16 ГБ · 512 ГБ",
  "model": "Galaxy Book6 14\"",
  "variant": "Intel Core Ultra 7 355 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "galaxy-book6-14",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 125390,
  "image": "/images/p/galaxy-book6-14/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-14/seryy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/galaxy-book6-14/serebristyy.webp",
    "price": 130090
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 7 355 · 16 ГБ · 512 ГБ",
   "Экран": "14″",
   "Тип экрана": "IPS",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "1920 x 1200",
   "Процессор": "Intel Core Ultra 5 325",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "61,2 Вт/ч",
   "Время работы": "до 24 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1430",
   "Размеры": "31,34 x 22,11 x 1,49 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "8",
   "Объем кэша L3": "12 МБ"
  },
  "summary": "14″ · IPS · 60 Гц",
  "inStock": true,
  "description": "Galaxy Book6 14\": экран — 14″; тип экрана — IPS; частота обновления экрана — 60 Гц."
 },
 {
  "id": "galaxy-book6-pro-14-intel-core-ultra-5-325-16-gb-512-gb",
  "name": "Galaxy Book6 Pro 14\" Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
  "model": "Galaxy Book6 Pro 14\"",
  "variant": "Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
  "storage": null,
  "family": "galaxy-book6-pro-14",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 163390,
  "image": "/images/p/galaxy-book6-pro-14/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-pro-14/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 5 325 · 16 ГБ · 512 ГБ",
   "Экран": "14″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2880 x 1800",
   "Процессор": "Intel Core Ultra 5 325",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "67.18 Вт/ч",
   "Время работы": "до 30 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1240",
   "Размеры": "31,42 x 22,06 x 1,16 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "8",
   "Объем кэша L3": "12 МБ"
  },
  "summary": "14″ · Dynamic AMOLED 2X · 120 Гц",
  "inStock": true,
  "description": "Galaxy Book6 Pro 14\": экран — 14″; тип экрана — Dynamic AMOLED 2X; частота обновления экрана — 120 Гц."
 },
 {
  "id": "galaxy-book6-pro-14-intel-core-ultra-7-356h-32-gb-1-tb",
  "name": "Galaxy Book6 Pro 14\" Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
  "model": "Galaxy Book6 Pro 14\"",
  "variant": "Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
  "storage": null,
  "family": "galaxy-book6-pro-14",
  "brand": "Samsung",
  "category": "Ноутбуки",
  "price": 190890,
  "image": "/images/p/galaxy-book6-pro-14/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/galaxy-book6-pro-14/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Intel Core Ultra 7 356H · 32 ГБ · 1 ТБ",
   "Экран": "14″",
   "Тип экрана": "Dynamic AMOLED 2X",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "2880 x 1800",
   "Процессор": "Intel Core Ultra 5 325",
   "Объем оперативной памяти": "16 ГБ",
   "Ёмкость аккумулятора": "67.18 Вт/ч",
   "Время работы": "до 30 ч",
   "Материал корпуса": "Алюминий",
   "Вес, г": "1240",
   "Размеры": "31,42 x 22,06 x 1,16 см",
   "Операционная система": "Windows 11 Home",
   "Количество ядер процессора": "8",
   "Объем кэша L3": "12 МБ"
  },
  "summary": "14″ · Dynamic AMOLED 2X · 120 Гц",
  "inStock": true,
  "description": "Galaxy Book6 Pro 14\": экран — 14″; тип экрана — Dynamic AMOLED 2X; частота обновления экрана — 120 Гц."
 },
 {
  "id": "asus-zenbook-14-oled-core-ultra-5-225h-16-gb-512-gb-ux3405ca-st1350",
  "name": "ASUS Zenbook 14 OLED Core Ultra 5 225H / 16 ГБ / 512 ГБ (UX3405CA-ST1350)",
  "model": "ASUS Zenbook 14 OLED",
  "variant": "Core Ultra 5 225H / 16 ГБ / 512 ГБ (UX3405CA-ST1350)",
  "storage": null,
  "family": "asus-zenbook-14",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 124390,
  "image": "/images/p/asus-zenbook-14/ponder-blue.webp",
  "colors": [
   {
    "name": "Ponder Blue",
    "image": "/images/p/asus-zenbook-14/ponder-blue.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 5 225H / 16 ГБ / 512 ГБ (UX3405CA-ST1350)",
   "display": "14\" OLED 2880×1800",
   "chip": "Intel Core Ultra 5 225H / Core Ultra 7 255H",
   "graphics": "Intel Arc 130T / 140T (встроенная)",
   "memory": "16 или 32 ГБ"
  },
  "summary": "14\" OLED 2880×1800 · 16 или 32 ГБ",
  "inStock": true,
  "description": "Лёгкий 14-дюймовый ультрабук ASUS с OLED-экраном 2,8K на процессорах Intel Core Ultra серии 200H. Самая ходовая модель Zenbook в российских магазинах: много предложений и предсказуемые цены."
 },
 {
  "id": "asus-zenbook-14-oled-core-ultra-7-255h-16-gb-1-tb-ux3405ca-st1336",
  "name": "ASUS Zenbook 14 OLED Core Ultra 7 255H / 16 ГБ / 1 ТБ (UX3405CA-ST1336)",
  "model": "ASUS Zenbook 14 OLED",
  "variant": "Core Ultra 7 255H / 16 ГБ / 1 ТБ (UX3405CA-ST1336)",
  "storage": null,
  "family": "asus-zenbook-14",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 132290,
  "image": "/images/p/asus-zenbook-14/ponder-blue.webp",
  "colors": [
   {
    "name": "Ponder Blue",
    "image": "/images/p/asus-zenbook-14/ponder-blue.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 7 255H / 16 ГБ / 1 ТБ (UX3405CA-ST1336)",
   "display": "14\" OLED 2880×1800",
   "chip": "Intel Core Ultra 5 225H / Core Ultra 7 255H",
   "graphics": "Intel Arc 130T / 140T (встроенная)",
   "memory": "16 или 32 ГБ"
  },
  "summary": "14\" OLED 2880×1800 · 16 или 32 ГБ",
  "inStock": true,
  "description": "Лёгкий 14-дюймовый ультрабук ASUS с OLED-экраном 2,8K на процессорах Intel Core Ultra серии 200H. Самая ходовая модель Zenbook в российских магазинах: много предложений и предсказуемые цены."
 },
 {
  "id": "asus-zenbook-14-oled-core-ultra-7-255h-32-gb-1-tb-ux3405ca-st1353",
  "name": "ASUS Zenbook 14 OLED Core Ultra 7 255H / 32 ГБ / 1 ТБ (UX3405CA-ST1353)",
  "model": "ASUS Zenbook 14 OLED",
  "variant": "Core Ultra 7 255H / 32 ГБ / 1 ТБ (UX3405CA-ST1353)",
  "storage": null,
  "family": "asus-zenbook-14",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 180690,
  "image": "/images/p/asus-zenbook-14/ponder-blue.webp",
  "colors": [
   {
    "name": "Ponder Blue",
    "image": "/images/p/asus-zenbook-14/ponder-blue.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 7 255H / 32 ГБ / 1 ТБ (UX3405CA-ST1353)",
   "display": "14\" OLED 2880×1800",
   "chip": "Intel Core Ultra 5 225H / Core Ultra 7 255H",
   "graphics": "Intel Arc 130T / 140T (встроенная)",
   "memory": "16 или 32 ГБ"
  },
  "summary": "14\" OLED 2880×1800 · 16 или 32 ГБ",
  "inStock": true,
  "description": "Лёгкий 14-дюймовый ультрабук ASUS с OLED-экраном 2,8K на процессорах Intel Core Ultra серии 200H. Самая ходовая модель Zenbook в российских магазинах: много предложений и предсказуемые цены."
 },
 {
  "id": "asus-rog-zephyrus-g16-2026-core-ultra-9-386h-rtx-5070-32-gb-1-tb-gu606ap-tb081",
  "name": "ASUS ROG Zephyrus G16 (2026) Core Ultra 9 386H / RTX 5070 / 32 ГБ / 1 ТБ (GU606AP-TB081)",
  "model": "ASUS ROG Zephyrus G16 (2026)",
  "variant": "Core Ultra 9 386H / RTX 5070 / 32 ГБ / 1 ТБ (GU606AP-TB081)",
  "storage": null,
  "family": "asus-zephyrus-g16",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 341690,
  "image": "/images/p/asus-zephyrus-g16/platinum-white.webp",
  "colors": [
   {
    "name": "Platinum White",
    "image": "/images/p/asus-zephyrus-g16/platinum-white.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 386H / RTX 5070 / 32 ГБ / 1 ТБ (GU606AP-TB081)",
   "display": "16\" OLED 2560×1600, 240 Гц",
   "chip": "Intel Core Ultra 9 386H",
   "gpu": "GeForce RTX 5070 / 5070 Ti / 5080 Laptop",
   "memory": "32 ГБ LPDDR5X"
  },
  "summary": "16\" OLED 2560×1600, 240 Гц · Intel Core Ultra 9 386H · 32 ГБ LPDDR5X",
  "inStock": true,
  "description": "Тонкий 16-дюймовый игровой ноутбук ROG 2026 года на Intel Core Ultra 9 386H (Panther Lake) с OLED-экраном 240 Гц. Отличается от прошлогоднего GU605 новым процессором; видеокарты — RTX 5070, 5070 Ti или 5080."
 },
 {
  "id": "asus-rog-zephyrus-g16-2026-core-ultra-9-386h-rtx-5070-ti-32-gb-1-tb-gu606ar-tb032",
  "name": "ASUS ROG Zephyrus G16 (2026) Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (GU606AR-TB032)",
  "model": "ASUS ROG Zephyrus G16 (2026)",
  "variant": "Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (GU606AR-TB032)",
  "storage": null,
  "family": "asus-zephyrus-g16",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 382690,
  "image": "/images/p/asus-zephyrus-g16/platinum-white.webp",
  "colors": [
   {
    "name": "Platinum White",
    "image": "/images/p/asus-zephyrus-g16/platinum-white.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (GU606AR-TB032)",
   "display": "16\" OLED 2560×1600, 240 Гц",
   "chip": "Intel Core Ultra 9 386H",
   "gpu": "GeForce RTX 5070 / 5070 Ti / 5080 Laptop",
   "memory": "32 ГБ LPDDR5X"
  },
  "summary": "16\" OLED 2560×1600, 240 Гц · Intel Core Ultra 9 386H · 32 ГБ LPDDR5X",
  "inStock": true,
  "description": "Тонкий 16-дюймовый игровой ноутбук ROG 2026 года на Intel Core Ultra 9 386H (Panther Lake) с OLED-экраном 240 Гц. Отличается от прошлогоднего GU605 новым процессором; видеокарты — RTX 5070, 5070 Ti или 5080."
 },
 {
  "id": "asus-rog-zephyrus-g16-2026-core-ultra-9-386h-rtx-5080-32-gb-1-tb-gu606aw-tb032w",
  "name": "ASUS ROG Zephyrus G16 (2026) Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (GU606AW-TB032W)",
  "model": "ASUS ROG Zephyrus G16 (2026)",
  "variant": "Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (GU606AW-TB032W)",
  "storage": null,
  "family": "asus-zephyrus-g16",
  "brand": "ASUS",
  "category": "Ноутбуки",
  "price": 417490,
  "image": "/images/p/asus-zephyrus-g16/platinum-white.webp",
  "colors": [
   {
    "name": "Platinum White",
    "image": "/images/p/asus-zephyrus-g16/platinum-white.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (GU606AW-TB032W)",
   "display": "16\" OLED 2560×1600, 240 Гц",
   "chip": "Intel Core Ultra 9 386H",
   "gpu": "GeForce RTX 5070 / 5070 Ti / 5080 Laptop",
   "memory": "32 ГБ LPDDR5X"
  },
  "summary": "16\" OLED 2560×1600, 240 Гц · Intel Core Ultra 9 386H · 32 ГБ LPDDR5X",
  "inStock": true,
  "description": "Тонкий 16-дюймовый игровой ноутбук ROG 2026 года на Intel Core Ultra 9 386H (Panther Lake) с OLED-экраном 240 Гц. Отличается от прошлогоднего GU605 новым процессором; видеокарты — RTX 5070, 5070 Ti или 5080."
 },
 {
  "id": "lenovo-thinkpad-x1-carbon-gen-14-core-ultra-7-356h-32-gb-1-tb-2-8k-oled-lte-21v7001rcd",
  "name": "Lenovo ThinkPad X1 Carbon Gen 14 Core Ultra 7 356H / 32 ГБ / 1 ТБ / 2.8K OLED / LTE (21V7001RCD)",
  "model": "Lenovo ThinkPad X1 Carbon Gen 14",
  "variant": "Core Ultra 7 356H / 32 ГБ / 1 ТБ / 2.8K OLED / LTE (21V7001RCD)",
  "storage": null,
  "family": "thinkpad-x1-carbon-14",
  "brand": "Lenovo",
  "category": "Ноутбуки",
  "price": 301090,
  "image": "/images/p/thinkpad-x1-carbon-14/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/thinkpad-x1-carbon-14/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 7 356H / 32 ГБ / 1 ТБ / 2.8K OLED / LTE (21V7001RCD)",
   "display": "14\" OLED 2.8K (2880×1800), 120 Гц",
   "chip": "Intel Core Ultra 7 356H (Core Ultra Series 3)",
   "memory": "32 ГБ LPDDR5X",
   "weight": "от ≈0,98 кг"
  },
  "summary": "32 ГБ LPDDR5X · от ≈0,98 кг",
  "inStock": true,
  "description": "Флагманский бизнес-ультрабук Lenovo 2026 года на платформе Intel Core Ultra Series 3 vPro. Корпус переработан, вес от примерно 0,98 кг, есть версия с LTE."
 },
 {
  "id": "lenovo-legion-pro-7i-gen-10-core-ultra-9-275hx-rtx-5080-32-gb-1-tb",
  "name": "Lenovo Legion Pro 7i Gen 10 Core Ultra 9 275HX / RTX 5080 / 32 ГБ / 1 ТБ",
  "model": "Lenovo Legion Pro 7i Gen 10",
  "variant": "Core Ultra 9 275HX / RTX 5080 / 32 ГБ / 1 ТБ",
  "storage": null,
  "family": "legion-pro-7i",
  "brand": "Lenovo",
  "category": "Ноутбуки",
  "price": 364790,
  "image": "/images/p/legion-pro-7i/eclipse-black.webp",
  "colors": [
   {
    "name": "Eclipse Black",
    "image": "/images/p/legion-pro-7i/eclipse-black.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 275HX / RTX 5080 / 32 ГБ / 1 ТБ",
   "display": "16\" OLED 2560×1600, 240 Гц",
   "chip": "Intel Core Ultra 9 275HX",
   "gpu": "GeForce RTX 5080 / 5090 Laptop",
   "memory": "32–64 ГБ DDR5"
  },
  "summary": "16\" OLED 2560×1600, 240 Гц · Intel Core Ultra 9 275HX · 32–64 ГБ DDR5",
  "inStock": true,
  "description": "Топовый игровой ноутбук Lenovo на Intel Core Ultra 9 275HX с RTX 5080 или 5090 и OLED-экраном 240 Гц. Поколение Gen 10 остаётся текущим для серии Pro 7i: на CES 2026 Lenovo обновила только Legion 7a, 5i и 5a."
 },
 {
  "id": "lenovo-legion-pro-7i-gen-10-core-ultra-9-275hx-rtx-5090-32-gb-1-tb-83f50017us",
  "name": "Lenovo Legion Pro 7i Gen 10 Core Ultra 9 275HX / RTX 5090 / 32 ГБ / 1 ТБ (83F50017US)",
  "model": "Lenovo Legion Pro 7i Gen 10",
  "variant": "Core Ultra 9 275HX / RTX 5090 / 32 ГБ / 1 ТБ (83F50017US)",
  "storage": null,
  "family": "legion-pro-7i",
  "brand": "Lenovo",
  "category": "Ноутбуки",
  "price": 473990,
  "image": "/images/p/legion-pro-7i/eclipse-black.webp",
  "colors": [
   {
    "name": "Eclipse Black",
    "image": "/images/p/legion-pro-7i/eclipse-black.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 275HX / RTX 5090 / 32 ГБ / 1 ТБ (83F50017US)",
   "display": "16\" OLED 2560×1600, 240 Гц",
   "chip": "Intel Core Ultra 9 275HX",
   "gpu": "GeForce RTX 5080 / 5090 Laptop",
   "memory": "32–64 ГБ DDR5"
  },
  "summary": "16\" OLED 2560×1600, 240 Гц · Intel Core Ultra 9 275HX · 32–64 ГБ DDR5",
  "inStock": true,
  "description": "Топовый игровой ноутбук Lenovo на Intel Core Ultra 9 275HX с RTX 5080 или 5090 и OLED-экраном 240 Гц. Поколение Gen 10 остаётся текущим для серии Pro 7i: на CES 2026 Lenovo обновила только Legion 7a, 5i и 5a."
 },
 {
  "id": "dell-xps-14-2026-core-ultra-7-16-gb-512-gb",
  "name": "Dell XPS 14 (2026) Core Ultra 7 / 16 ГБ / 512 ГБ",
  "model": "Dell XPS 14 (2026)",
  "variant": "Core Ultra 7 / 16 ГБ / 512 ГБ",
  "storage": null,
  "family": "dell-xps-14",
  "brand": "Dell",
  "category": "Ноутбуки",
  "price": 200190,
  "image": "/images/p/dell-xps-14/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/dell-xps-14/grafitovyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 7 / 16 ГБ / 512 ГБ",
   "display": "14\" 2K 120 Гц (базово — FHD+)",
   "chip": "Intel Core Ultra 7 355 (Core Ultra Series 3)",
   "memory": "16 ГБ LPDDR5X (до 64 ГБ)",
   "battery": "70 Вт·ч"
  },
  "summary": "16 ГБ LPDDR5X (до 64 ГБ) · 70 Вт·ч",
  "inStock": true,
  "description": "Dell вернула бренд XPS: XPS 14 2026 года — тонкий 14-дюймовый ноутбук на Intel Core Ultra Series 3 (Panther Lake). Ориентирован на работу и автономность, а не на игры."
 },
 {
  "id": "hp-omen-max-16-2026-core-ultra-9-290hx-plus-rtx-5070-ti-32-gb-1-tb-oled-16-ah1023dx",
  "name": "HP OMEN MAX 16 (2026) Core Ultra 9 290HX Plus / RTX 5070 Ti / 32 ГБ / 1 ТБ / OLED (16-ah1023dx)",
  "model": "HP OMEN MAX 16 (2026)",
  "variant": "Core Ultra 9 290HX Plus / RTX 5070 Ti / 32 ГБ / 1 ТБ / OLED (16-ah1023dx)",
  "storage": null,
  "family": "hp-omen-max-16",
  "brand": "HP",
  "category": "Ноутбуки",
  "price": 294490,
  "image": "/images/p/hp-omen-max-16/shadow-black.webp",
  "colors": [
   {
    "name": "Shadow Black",
    "image": "/images/p/hp-omen-max-16/shadow-black.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 290HX Plus / RTX 5070 Ti / 32 ГБ / 1 ТБ / OLED (16-ah1023dx)",
   "display": "16\" OLED 2.5K, 240 Гц",
   "chip": "Intel Core Ultra 9 290HX Plus",
   "gpu": "GeForce RTX 5070 Ti / 5080 / 5090 Laptop",
   "memory": "32 ГБ DDR5"
  },
  "summary": "16\" OLED 2.5K, 240 Гц · 32 ГБ DDR5",
  "inStock": true,
  "description": "Игровой 16-дюймовый ноутбук HP 2026 года, вышедший уже под маркой HyperX OMEN. Процессор — обновлённый Intel Core Ultra 9 290HX Plus, видеокарты до RTX 5090."
 },
 {
  "id": "msi-stealth-16-ai-plus-2026-core-ultra-9-386h-rtx-5070-ti-32-gb-1-tb-b3wh-013ru",
  "name": "MSI Stealth 16 AI+ (2026) Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (B3WH-013RU)",
  "model": "MSI Stealth 16 AI+ (2026)",
  "variant": "Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (B3WH-013RU)",
  "storage": null,
  "family": "msi-stealth-16",
  "brand": "MSI",
  "category": "Ноутбуки",
  "price": 342590,
  "image": "/images/p/msi-stealth-16/core-black.webp",
  "colors": [
   {
    "name": "Core Black",
    "image": "/images/p/msi-stealth-16/core-black.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 386H / RTX 5070 Ti / 32 ГБ / 1 ТБ (B3WH-013RU)",
   "display": "16\" 2560×1600",
   "chip": "Intel Core Ultra 9 386H",
   "gpu": "GeForce RTX 5070 Ti / RTX 5080 Laptop",
   "memory": "32 ГБ"
  },
  "summary": "16\" 2560×1600 · Intel Core Ultra 9 386H · 32 ГБ",
  "inStock": true,
  "description": "Тонкий игровой ноутбук MSI 2026 года на Intel Core Ultra 9 386H (Panther Lake). В РФ продаётся с RTX 5070 Ti или RTX 5080, 32 ГБ памяти и SSD на 1 ТБ."
 },
 {
  "id": "msi-stealth-16-ai-plus-2026-core-ultra-9-386h-rtx-5080-32-gb-1-tb-b3wi-012ru",
  "name": "MSI Stealth 16 AI+ (2026) Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (B3WI-012RU)",
  "model": "MSI Stealth 16 AI+ (2026)",
  "variant": "Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (B3WI-012RU)",
  "storage": null,
  "family": "msi-stealth-16",
  "brand": "MSI",
  "category": "Ноутбуки",
  "price": 383690,
  "image": "/images/p/msi-stealth-16/core-black.webp",
  "colors": [
   {
    "name": "Core Black",
    "image": "/images/p/msi-stealth-16/core-black.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core Ultra 9 386H / RTX 5080 / 32 ГБ / 1 ТБ (B3WI-012RU)",
   "display": "16\" 2560×1600",
   "chip": "Intel Core Ultra 9 386H",
   "gpu": "GeForce RTX 5070 Ti / RTX 5080 Laptop",
   "memory": "32 ГБ"
  },
  "summary": "16\" 2560×1600 · Intel Core Ultra 9 386H · 32 ГБ",
  "inStock": true,
  "description": "Тонкий игровой ноутбук MSI 2026 года на Intel Core Ultra 9 386H (Panther Lake). В РФ продаётся с RTX 5070 Ti или RTX 5080, 32 ГБ памяти и SSD на 1 ТБ."
 },
 {
  "id": "msi-katana-15-hx-core-i5-14450hx-rtx-5060-16-gb-512-gb-fhd-b14wfk-1065xru",
  "name": "MSI Katana 15 HX Core i5-14450HX / RTX 5060 / 16 ГБ / 512 ГБ / FHD (B14WFK-1065XRU)",
  "model": "MSI Katana 15 HX",
  "variant": "Core i5-14450HX / RTX 5060 / 16 ГБ / 512 ГБ / FHD (B14WFK-1065XRU)",
  "storage": null,
  "family": "msi-katana-15",
  "brand": "MSI",
  "category": "Ноутбуки",
  "price": 137790,
  "image": "/images/p/msi-katana-15/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/msi-katana-15/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core i5-14450HX / RTX 5060 / 16 ГБ / 512 ГБ / FHD (B14WFK-1065XRU)",
   "display": "15,6\" (FHD 144 Гц или QHD)",
   "chip": "Intel Core i5-14450HX / i7-14650HX",
   "gpu": "GeForce RTX 5060 / RTX 5070 Laptop",
   "memory": "16 ГБ DDR5"
  },
  "summary": "15,6\" (FHD 144 Гц или QHD) · 16 ГБ DDR5",
  "inStock": true,
  "description": "Недорогой игровой ноутбук MSI с процессорами Intel Core HX 14-го поколения и видеокартами RTX 50-й серии. Одна из самых доступных моделей с RTX 5060 в российских магазинах."
 },
 {
  "id": "msi-katana-15-hx-core-i7-14650hx-rtx-5070-1-tb-qhd-b14wgk-293us",
  "name": "MSI Katana 15 HX Core i7-14650HX / RTX 5070 / 1 ТБ / QHD (B14WGK-293US)",
  "model": "MSI Katana 15 HX",
  "variant": "Core i7-14650HX / RTX 5070 / 1 ТБ / QHD (B14WGK-293US)",
  "storage": null,
  "family": "msi-katana-15",
  "brand": "MSI",
  "category": "Ноутбуки",
  "price": 179490,
  "image": "/images/p/msi-katana-15/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/msi-katana-15/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Core i7-14650HX / RTX 5070 / 1 ТБ / QHD (B14WGK-293US)",
   "display": "15,6\" (FHD 144 Гц или QHD)",
   "chip": "Intel Core i5-14450HX / i7-14650HX",
   "gpu": "GeForce RTX 5060 / RTX 5070 Laptop",
   "memory": "16 ГБ DDR5"
  },
  "summary": "15,6\" (FHD 144 Гц или QHD) · 16 ГБ DDR5",
  "inStock": true,
  "description": "Недорогой игровой ноутбук MSI с процессорами Intel Core HX 14-го поколения и видеокартами RTX 50-й серии. Одна из самых доступных моделей с RTX 5060 в российских магазинах."
 },
 {
  "id": "microsoft-surface-laptop-8-13-8-snapdragon-x2-plus-16-gb-512-gb",
  "name": "Microsoft Surface Laptop 8 13.8\" Snapdragon X2 Plus / 16 ГБ / 512 ГБ",
  "model": "Microsoft Surface Laptop 8 13.8\"",
  "variant": "Snapdragon X2 Plus / 16 ГБ / 512 ГБ",
  "storage": null,
  "family": "surface-laptop-8",
  "brand": "Microsoft",
  "category": "Ноутбуки",
  "price": 141490,
  "image": "/images/p/surface-laptop-8/platinum.webp",
  "colors": [
   {
    "name": "Platinum",
    "image": "/images/p/surface-laptop-8/platinum.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Snapdragon X2 Plus / 16 ГБ / 512 ГБ",
   "display": "13,8\" 2304×1536, 120 Гц, сенсорный",
   "chip": "Snapdragon X2 Plus (10 ядер) / X2 Elite (12 ядер)",
   "memory": "16 ГБ (до 64 ГБ)",
   "storage": "512 ГБ"
  },
  "summary": "16 ГБ (до 64 ГБ) · 512 ГБ",
  "inStock": true,
  "description": "Новое поколение Surface Laptop на процессорах Qualcomm Snapdragon X2 с NPU до 80 TOPS. Выпускается в размерах 13,8\" и 15\"; память теперь до 64 ГБ."
 },
 {
  "id": "microsoft-surface-pro-12-13-snapdragon-x2-plus-16-gb-256-gb-lcd-ep2-66386",
  "name": "Microsoft Surface Pro 12 13\" Snapdragon X2 Plus / 16 ГБ / 256 ГБ / LCD (EP2-66386)",
  "model": "Microsoft Surface Pro 12 13\"",
  "variant": "Snapdragon X2 Plus / 16 ГБ / 256 ГБ / LCD (EP2-66386)",
  "storage": null,
  "family": "surface-pro-12",
  "brand": "Microsoft",
  "category": "Ноутбуки",
  "price": 131990,
  "image": "/images/p/surface-pro-12/platinum.webp",
  "colors": [
   {
    "name": "Platinum",
    "image": "/images/p/surface-pro-12/platinum.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Snapdragon X2 Plus / 16 ГБ / 256 ГБ / LCD (EP2-66386)",
   "display": "13\" 120 Гц (LCD с X2 Plus / OLED с X2 Elite)",
   "chip": "Snapdragon X2 Plus (10 ядер) / X2 Elite (12 ядер)",
   "memory": "16–24 ГБ",
   "storage": "256–512 ГБ"
  },
  "summary": "16–24 ГБ · 256–512 ГБ",
  "inStock": true,
  "description": "Планшет-трансформер Microsoft на Snapdragon X2: с X2 Plus идёт LCD-экран, с X2 Elite — OLED. Клавиатура Flex Keyboard продаётся отдельно."
 },
 {
  "id": "microsoft-surface-pro-12-13-snapdragon-x2-plus-16-gb-512-gb-lcd",
  "name": "Microsoft Surface Pro 12 13\" Snapdragon X2 Plus / 16 ГБ / 512 ГБ / LCD",
  "model": "Microsoft Surface Pro 12 13\"",
  "variant": "Snapdragon X2 Plus / 16 ГБ / 512 ГБ / LCD",
  "storage": null,
  "family": "surface-pro-12",
  "brand": "Microsoft",
  "category": "Ноутбуки",
  "price": 141490,
  "image": "/images/p/surface-pro-12/platinum.webp",
  "colors": [
   {
    "name": "Platinum",
    "image": "/images/p/surface-pro-12/platinum.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Snapdragon X2 Plus / 16 ГБ / 512 ГБ / LCD",
   "display": "13\" 120 Гц (LCD с X2 Plus / OLED с X2 Elite)",
   "chip": "Snapdragon X2 Plus (10 ядер) / X2 Elite (12 ядер)",
   "memory": "16–24 ГБ",
   "storage": "256–512 ГБ"
  },
  "summary": "16–24 ГБ · 256–512 ГБ",
  "inStock": true,
  "description": "Планшет-трансформер Microsoft на Snapdragon X2: с X2 Plus идёт LCD-экран, с X2 Elite — OLED. Клавиатура Flex Keyboard продаётся отдельно."
 },
 {
  "id": "microsoft-surface-pro-12-13-snapdragon-x2-elite-16-gb-512-gb-oled",
  "name": "Microsoft Surface Pro 12 13\" Snapdragon X2 Elite / 16 ГБ / 512 ГБ / OLED",
  "model": "Microsoft Surface Pro 12 13\"",
  "variant": "Snapdragon X2 Elite / 16 ГБ / 512 ГБ / OLED",
  "storage": null,
  "family": "surface-pro-12",
  "brand": "Microsoft",
  "category": "Ноутбуки",
  "price": 179490,
  "image": "/images/p/surface-pro-12/platinum.webp",
  "colors": [
   {
    "name": "Platinum",
    "image": "/images/p/surface-pro-12/platinum.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Snapdragon X2 Elite / 16 ГБ / 512 ГБ / OLED",
   "display": "13\" 120 Гц (LCD с X2 Plus / OLED с X2 Elite)",
   "chip": "Snapdragon X2 Plus (10 ядер) / X2 Elite (12 ядер)",
   "memory": "16–24 ГБ",
   "storage": "256–512 ГБ"
  },
  "summary": "16–24 ГБ · 256–512 ГБ",
  "inStock": true,
  "description": "Планшет-трансформер Microsoft на Snapdragon X2: с X2 Plus идёт LCD-экран, с X2 Elite — OLED. Клавиатура Flex Keyboard продаётся отдельно."
 },
 {
  "id": "airpods-pro-3",
  "name": "AirPods Pro 3",
  "model": "AirPods Pro 3",
  "variant": null,
  "storage": null,
  "family": "airpods-pro-3",
  "brand": "Apple",
  "category": "Наушники",
  "price": 19890,
  "image": "/images/p/airpods-pro-3/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/airpods-pro-3/main.webp"
   }
  ],
  "specs": {
   "Время работы": "8 ч",
   "Беспроводная зарядка": "да",
   "Материал корпуса": "Пластик",
   "Вес одного наушника (грамм)": "5,55",
   "Габариты": "30,9 x 19,2 x 27 мм (каждый наушник)",
   "Размеры зарядного кейса": "47,2 x 60,2 x 21,8 мм",
   "Вес зарядного кейса  (грамм)": "50,8",
   "Тип устройства": "беспроводные TWS-наушники",
   "Тип": "динамические",
   "Тип наушников": "Вставные",
   "Система активного шумоподавления": "есть",
   "Вид": "вставные (затычки)",
   "Частотный диапазон": "20 - 20000 Гц",
   "Поддержка iPhone": "есть"
  },
  "summary": "8 ч · Пластик · 5,55",
  "inStock": true,
  "description": "AirPods Pro 3: время работы — 8 ч; материал корпуса — Пластик; вес одного наушника (грамм) — 5,55."
 },
 {
  "id": "airpods-max-2",
  "name": "AirPods Max 2",
  "model": "AirPods Max 2",
  "variant": null,
  "storage": null,
  "family": "airpods-max-2",
  "brand": "Apple",
  "category": "Наушники",
  "price": 43690,
  "image": "/images/p/airpods-max-2/siyayuschaya-zvezda.webp",
  "colors": [
   {
    "name": "Сияющая звезда",
    "image": "/images/p/airpods-max-2/siyayuschaya-zvezda.webp"
   },
   {
    "name": "Голубой",
    "image": "/images/p/airpods-max-2/goluboy.webp"
   },
   {
    "name": "Фиолетовый",
    "image": "/images/p/airpods-max-2/fioletovyy.webp"
   },
   {
    "name": "Оранжевый",
    "image": "/images/p/airpods-max-2/oranzhevyy.webp"
   },
   {
    "name": "Тёмная ночь",
    "image": "/images/p/airpods-max-2/temnaya-noch.webp",
    "price": 46490
   }
  ],
  "specs": {
   "Время работы": "20 ч",
   "Материал корпуса": "Анодированный алюминий",
   "Вес, г": "386,2",
   "Размеры": "18,73 x 16,86 x 8,34 см",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "динамические",
   "Тип наушников": "полноразмерные",
   "Система активного шумоподавления": "есть",
   "Материал": "алюминий, нержавеющая сталь, текстиль",
   "Тип крепления": "оголовье",
   "Поддержка Bluetooth": "Bluetooth 5.3",
   "Радиус действия беспроводной связи": "10 м",
   "Поддержка Multipoint": "есть, до двух устройств"
  },
  "summary": "20 ч · Анодированный алюминий · 386,2",
  "inStock": true,
  "description": "AirPods Max 2: время работы — 20 ч; материал корпуса — Анодированный алюминий; вес, г — 386,2."
 },
 {
  "id": "airpods-5",
  "name": "AirPods 5",
  "model": "AirPods 5",
  "variant": null,
  "storage": null,
  "family": "airpods-5",
  "brand": "Apple",
  "category": "Наушники",
  "price": 15190,
  "image": "/images/p/airpods-5/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/airpods-5/main.webp"
   }
  ],
  "specs": {
   "Время работы": "4 ч (с шумоподавлением или прозрачным режимом); 6 ч (без шумоподавления)",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик",
   "Вес одного наушника (грамм)": "4,3",
   "Габариты": "30,2 x 18,3 x 18,1 мм (каждый наушник)",
   "Размеры зарядного кейса": "46,2 x 50,1 x 21,2 мм",
   "Вес зарядного кейса  (грамм)": "32,3",
   "Тип устройства": "беспроводные TWS-наушники",
   "Тип": "динамические",
   "Тип наушников": "Вставные",
   "Система активного шумоподавления": "есть",
   "Вид": "вкладыши",
   "Частотный диапазон": "20 - 20000 Гц",
   "Поддержка iPhone": "есть"
  },
  "summary": "Пластик · 4,3 · 46,2 x 50,1 x 21,2 мм",
  "inStock": true,
  "description": "AirPods 5: время работы — 4 ч (с шумоподавлением или прозрачным режимом); 6 ч (без шумоподавления); материал корпуса — Пластик; вес одного наушника (грамм) — 4,3."
 },
 {
  "id": "airpods-5-s-besprovodnym-futlyarom",
  "name": "AirPods 5 с беспроводным футляром",
  "model": "AirPods 5 с беспроводным футляром",
  "variant": null,
  "storage": null,
  "family": "airpods-5-wireless",
  "brand": "Apple",
  "category": "Наушники",
  "price": 17090,
  "image": "/images/p/airpods-5-wireless/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/airpods-5-wireless/main.webp"
   }
  ],
  "specs": {
   "Время работы": "5 ч (с шумоподавлением или прозрачным режимом); 7 ч (без шумоподавления)",
   "Беспроводная зарядка": "да",
   "Материал корпуса": "Пластик",
   "Вес одного наушника (грамм)": "4,3",
   "Габариты": "30,2 x 18,3 x 18,1 мм (каждый наушник)",
   "Размеры зарядного кейса": "46,2 x 50,1 x 21,2 мм",
   "Вес зарядного кейса  (грамм)": "34,7",
   "Тип устройства": "беспроводные TWS-наушники",
   "Тип": "динамические",
   "Тип наушников": "Вставные",
   "Система активного шумоподавления": "есть",
   "Вид": "вкладыши",
   "Частотный диапазон": "20 - 20000 Гц",
   "Поддержка iPhone": "есть"
  },
  "summary": "Пластик · 4,3 · 46,2 x 50,1 x 21,2 мм",
  "inStock": true,
  "description": "AirPods 5 с беспроводным футляром: время работы — 5 ч (с шумоподавлением или прозрачным режимом); 7 ч (без шумоподавления); материал корпуса — Пластик; вес одного наушника (грамм) — 4,3."
 },
 {
  "id": "beats-solo-buds",
  "name": "Beats Solo Buds",
  "model": "Beats Solo Buds",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 8490,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats Solo Buds: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "beats-solo-4",
  "name": "Beats Solo 4",
  "model": "Beats Solo 4",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 16090,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats Solo 4: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "beats-powerbeats-fit",
  "name": "Beats Powerbeats Fit",
  "model": "Beats Powerbeats Fit",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 17490,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats Powerbeats Fit: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "beats-studio-pro",
  "name": "Beats Studio Pro",
  "model": "Beats Studio Pro",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 20390,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats Studio Pro: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "beats-powerbeats-pro-2",
  "name": "Beats Powerbeats Pro 2",
  "model": "Beats Powerbeats Pro 2",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 20390,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats Powerbeats Pro 2: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "beats-360",
  "name": "Beats 360",
  "model": "Beats 360",
  "variant": null,
  "storage": null,
  "family": "beats",
  "brand": "Beats",
  "category": "Наушники",
  "price": 51290,
  "image": "/images/p/beats/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/beats/main.webp"
   }
  ],
  "specs": {
   "Время работы": "32 ч",
   "Беспроводная зарядка": "нет",
   "Материал корпуса": "Пластик, текстиль",
   "Вес, г": "295",
   "Размеры": "16,55 x 8,71 x 19,13 см",
   "Тип устройства": "Bluetooth-наушники с микрофоном",
   "Тип наушников": "Динамические",
   "Система активного шумоподавления": "есть",
   "Вид": "полноразмерные",
   "Частотный диапазон": "20 - 20000 Гц",
   "Тип крепления": "оголовье",
   "Класс защиты": "IPX4",
   "Защита от воды": "да",
   "Поддержка Bluetooth": "Bluetooth 5.3 Class 1"
  },
  "summary": "32 ч · Пластик, текстиль · 295",
  "inStock": true,
  "description": "Beats 360: время работы — 32 ч; материал корпуса — Пластик, текстиль; вес, г — 295."
 },
 {
  "id": "galaxy-buds3-fe",
  "name": "Galaxy Buds3 FE",
  "model": "Galaxy Buds3 FE",
  "variant": null,
  "storage": null,
  "family": "galaxy-buds3-fe",
  "brand": "Samsung",
  "category": "Наушники",
  "price": 7990,
  "image": "/images/p/galaxy-buds3-fe/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-buds3-fe/main.webp"
   }
  ],
  "specs": {
   "Время работы": "8.5 ч",
   "Беспроводная зарядка": "нет",
   "Вес, г": "52",
   "Размеры": "2,11 x 1,8 x 3,38 см",
   "Режим низкой задержки": "да",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Вес одного наушника (грамм)": "5",
   "Размеры зарядного кейса": "5,9 × 4,9 × 2,4 см",
   "Емкость зарядного кейса": "515 мАч",
   "Вес зарядного кейса  (грамм)": "41,8",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "да",
   "Вид": "вставные (внутриканальные)"
  },
  "summary": "8.5 ч · 52 · 2,11 x 1,8 x 3,38 см",
  "inStock": true,
  "description": "Galaxy Buds3 FE: время работы — 8.5 ч; вес, г — 52; размеры — 2,11 x 1,8 x 3,38 см."
 },
 {
  "id": "galaxy-buds4-pro",
  "name": "Galaxy Buds4 Pro",
  "model": "Galaxy Buds4 Pro",
  "variant": null,
  "storage": null,
  "family": "galaxy-buds4-pro",
  "brand": "Samsung",
  "category": "Наушники",
  "price": 15190,
  "image": "/images/p/galaxy-buds4-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-buds4-pro/main.webp"
   }
  ],
  "specs": {
   "Время работы": "6 ч",
   "Беспроводная зарядка": "да",
   "Вес, г": "55",
   "Размеры": "3,1 × 1,9 × 1,8 см",
   "Детские": "нет",
   "Режим низкой задержки": "да",
   "Режим прозрачности": "да",
   "Вес одного наушника (грамм)": "5.1",
   "Размеры зарядного кейса": "5,1 × 5,1 × 2,8 см",
   "Емкость зарядного кейса": "530 мАч",
   "Вес зарядного кейса  (грамм)": "44.3",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "да",
   "Вид": "вставные (внутриканальные)"
  },
  "summary": "6 ч · 55 · 3,1 × 1,9 × 1,8 см",
  "inStock": true,
  "description": "Galaxy Buds4 Pro: время работы — 6 ч; вес, г — 55; размеры — 3,1 × 1,9 × 1,8 см."
 },
 {
  "id": "galaxy-buds4",
  "name": "Galaxy Buds4",
  "model": "Galaxy Buds4",
  "variant": null,
  "storage": null,
  "family": "galaxy-buds4",
  "brand": "Samsung",
  "category": "Наушники",
  "price": 11390,
  "image": "/images/p/galaxy-buds4/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-buds4/main.webp"
   }
  ],
  "specs": {
   "Время работы": "6 ч",
   "Беспроводная зарядка": "да",
   "Вес, г": "54",
   "Размеры": "3 × 1,9 × 1,8 см",
   "Детские": "нет",
   "Режим низкой задержки": "да",
   "Режим прозрачности": "да",
   "Вес одного наушника (грамм)": "4.6",
   "Размеры зарядного кейса": "5,1 × 5,1 × 2,8 см",
   "Емкость зарядного кейса": "515 мАч",
   "Вес зарядного кейса  (грамм)": "45.1",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "да",
   "Вид": "вкладыши"
  },
  "summary": "6 ч · 54 · 3 × 1,9 × 1,8 см",
  "inStock": true,
  "description": "Galaxy Buds4: время работы — 6 ч; вес, г — 54; размеры — 3 × 1,9 × 1,8 см."
 },
 {
  "id": "huawei-freeclip-2",
  "name": "Huawei FreeClip 2",
  "model": "Huawei FreeClip 2",
  "variant": null,
  "storage": null,
  "family": "huawei-freeclip-2",
  "brand": "Huawei",
  "category": "Наушники",
  "price": 13690,
  "image": "/images/p/huawei-freeclip-2/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/huawei-freeclip-2/main.webp"
   }
  ],
  "specs": {
   "Время работы": "9 ч",
   "Беспроводная зарядка": "да",
   "Вес, г": "49",
   "Размеры": "2,5 x 2,6 x 1,9 см",
   "Режим низкой задержки": "да",
   "Детские": "нет",
   "Вес одного наушника (грамм)": "5,1",
   "Размеры зарядного кейса": "5 x 4,9 x 2,5 см",
   "Емкость зарядного кейса": "537 мАч",
   "Вес зарядного кейса  (грамм)": "38",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "нет",
   "Вид": "вкладыши",
   "Поддержка iPhone": "да"
  },
  "summary": "9 ч · 49 · 2,5 x 2,6 x 1,9 см",
  "inStock": true,
  "description": "Huawei FreeClip 2: время работы — 9 ч; вес, г — 49; размеры — 2,5 x 2,6 x 1,9 см."
 },
 {
  "id": "marshall-major-v",
  "name": "Marshall Major V",
  "model": "Marshall Major V",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 6590,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Major V: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-minor-iv",
  "name": "Marshall Minor IV",
  "model": "Marshall Minor IV",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 10390,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Minor IV: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-motif-ii",
  "name": "Marshall Motif II",
  "model": "Marshall Motif II",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 11390,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Motif II: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-willen-ii",
  "name": "Marshall Willen II",
  "model": "Marshall Willen II",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 11390,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Willen II: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-emberton-iii",
  "name": "Marshall Emberton III",
  "model": "Marshall Emberton III",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 14190,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Emberton III: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-monitor-iii",
  "name": "Marshall Monitor III",
  "model": "Marshall Monitor III",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 22290,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Monitor III: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-milton",
  "name": "Marshall Milton",
  "model": "Marshall Milton",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 22790,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Milton: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-stockwell-iii",
  "name": "Marshall Stockwell III",
  "model": "Marshall Stockwell III",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 28490,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Stockwell III: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-middleton-ii",
  "name": "Marshall Middleton II",
  "model": "Marshall Middleton II",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 34190,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Middleton II: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "marshall-kilburn-iii",
  "name": "Marshall Kilburn III",
  "model": "Marshall Kilburn III",
  "variant": null,
  "storage": null,
  "family": "marshall",
  "brand": "Marshall",
  "category": "Наушники",
  "price": 39890,
  "image": "/images/p/marshall/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/marshall/main.webp"
   }
  ],
  "specs": {
   "Время работы": "80 ч",
   "Материал корпуса": "Металл, пластик",
   "Вес, г": "200",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип устройства": "беспроводные наушники",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "есть",
   "Вид": "накладные",
   "Поддержка iPhone": "да",
   "Материал": "эко-кожа",
   "Складная конструкция": "да",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "32 мм"
  },
  "summary": "80 ч · Металл, пластик · 200",
  "inStock": true,
  "description": "Marshall Kilburn III: время работы — 80 ч; материал корпуса — Металл, пластик; вес, г — 200."
 },
 {
  "id": "sony-wf-1000xm6",
  "name": "Sony WF-1000XM6",
  "model": "Sony WF-1000XM6",
  "variant": null,
  "storage": null,
  "family": "sony-wf-1000xm6",
  "brand": "Sony",
  "category": "Наушники",
  "price": 25590,
  "image": "/images/p/sony-wf-1000xm6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-wf-1000xm6/main.webp"
   }
  ],
  "specs": {
   "Время работы": "8 ч",
   "Беспроводная зарядка": "да",
   "Вес, г": "60",
   "Режим низкой задержки": "да",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Вес одного наушника (грамм)": "6,5",
   "Размеры зарядного кейса": "6,1 × 4,1 × 2,6 см",
   "Вес зарядного кейса  (грамм)": "47",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "да",
   "Вид": "вставные (внутриканальные)",
   "Поддержка iPhone": "да",
   "Материал": "пластик"
  },
  "summary": "8 ч · 60 · 6,5",
  "inStock": true,
  "description": "Sony WF-1000XM6: время работы — 8 ч; вес, г — 60; вес одного наушника (грамм) — 6,5."
 },
 {
  "id": "sony-wh-1000xm6",
  "name": "Sony WH-1000XM6",
  "model": "Sony WH-1000XM6",
  "variant": null,
  "storage": null,
  "family": "sony-wh-1000xm6",
  "brand": "Sony",
  "category": "Наушники",
  "price": 29390,
  "image": "/images/p/sony-wh-1000xm6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-wh-1000xm6/main.webp"
   }
  ],
  "specs": {
   "Время работы": "40 ч",
   "Беспроводная зарядка": "нет",
   "Вес, г": "254",
   "Режим низкой задержки": "да",
   "Детские": "нет",
   "Режим прозрачности": "да",
   "Тип": "беспроводные наушники",
   "Система активного шумоподавления": "да",
   "Вид": "накладные",
   "Поддержка iPhone": "есть",
   "Материал": "пластик",
   "Тип крепления": "оголовье",
   "Диаметр мембраны": "30 мм",
   "Тип кабеля": "отсоединяемый"
  },
  "summary": "40 ч · 254 · беспроводные наушники",
  "inStock": true,
  "description": "Sony WH-1000XM6: время работы — 40 ч; вес, г — 254; тип — беспроводные наушники."
 },
 {
  "id": "bose-quietcomfort-ultra-headphones-2-qc-ultra-headphones-2",
  "name": "Bose QuietComfort Ultra Headphones 2 QC Ultra Headphones 2",
  "model": "Bose QuietComfort Ultra Headphones 2",
  "variant": "QC Ultra Headphones 2",
  "storage": null,
  "family": "bose-qc-ultra-headphones-2",
  "brand": "Bose",
  "category": "Наушники",
  "price": 29890,
  "image": "/images/p/bose-qc-ultra-headphones-2/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/bose-qc-ultra-headphones-2/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "QC Ultra Headphones 2",
   "type": "полноразмерные",
   "anc": "шумоподавление + режим Aware",
   "battery": "до 30 ч",
   "audio": "Immersive Audio, проводной режим по USB-C"
  },
  "summary": "полноразмерные · шумоподавление + режим Aware · до 30 ч",
  "inStock": true,
  "description": "Флагманские полноразмерные наушники Bose второго поколения с одним из лучших шумоподавлений на рынке. Звук и музыку можно слушать по USB-C без потерь."
 },
 {
  "id": "bose-quietcomfort-ultra-earbuds-2-qc-ultra-earbuds-2",
  "name": "Bose QuietComfort Ultra Earbuds 2 QC Ultra Earbuds 2",
  "model": "Bose QuietComfort Ultra Earbuds 2",
  "variant": "QC Ultra Earbuds 2",
  "storage": null,
  "family": "bose-qc-ultra-earbuds-2",
  "brand": "Bose",
  "category": "Наушники",
  "price": 25690,
  "image": "/images/p/bose-qc-ultra-earbuds-2/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/bose-qc-ultra-earbuds-2/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "QC Ultra Earbuds 2",
   "type": "TWS-вкладыши",
   "anc": "шумоподавление CustomTune",
   "battery": "до 6 ч + кейс",
   "case": "беспроводная зарядка"
  },
  "summary": "TWS-вкладыши · шумоподавление CustomTune · до 6 ч + кейс",
  "inStock": true,
  "description": "TWS-наушники Bose второго поколения с сильным шумоподавлением и пространственным звуком. Кейс теперь заряжается без провода."
 },
 {
  "id": "apple-watch-ultra-4-49-mm-titan",
  "name": "Apple Watch Ultra 4 49 мм · титан",
  "model": "Apple Watch Ultra 4",
  "variant": "49 мм · титан",
  "storage": null,
  "family": "apple-watch-ultra-4",
  "brand": "Apple",
  "category": "Часы",
  "price": 77890,
  "image": "/images/p/apple-watch-ultra-4/titan-chernogo-cveta-remeshok-ocean-cveta-poluprozrachnyy-chernyy.webp",
  "colors": [
   {
    "name": "титан чёрного цвета, ремешок Ocean цвета «полупрозрачный чёрный»",
    "image": "/images/p/apple-watch-ultra-4/titan-chernogo-cveta-remeshok-ocean-cveta-poluprozrachnyy-chernyy.webp"
   },
   {
    "name": "титан светлого цвета, ремешок Ocean цвета «полупрозрачный серый»",
    "image": "/images/p/apple-watch-ultra-4/titan-svetlogo-cveta-remeshok-ocean-cveta-poluprozrachnyy-seryy.webp",
    "price": 78790
   },
   {
    "name": "титан чёрного цвета, ремешок Trail бордового цвета",
    "image": "/images/p/apple-watch-ultra-4/titan-chernogo-cveta-remeshok-trail-bordovogo-cveta.webp",
    "price": 80690
   },
   {
    "name": "титан чёрного цвета, ремешок Alpine бордового цвета",
    "image": "/images/p/apple-watch-ultra-4/titan-chernogo-cveta-remeshok-alpine-bordovogo-cveta.webp",
    "price": 80690
   },
   {
    "name": "титан светлого цвета, ремешок Alpine цвета «пустыня»",
    "image": "/images/p/apple-watch-ultra-4/titan-svetlogo-cveta-remeshok-alpine-cveta-pustynya.webp",
    "price": 80690
   },
   {
    "name": "титан светлого цвета, ремешок Trail песочного цвета",
    "image": "/images/p/apple-watch-ultra-4/titan-svetlogo-cveta-remeshok-trail-pesochnogo-cveta.webp",
    "price": 81690
   },
   {
    "name": "титан чёрного цвета, миланский сетчатый браслет",
    "image": "/images/p/apple-watch-ultra-4/titan-chernogo-cveta-milanskiy-setchatyy-braslet.webp",
    "price": 99690
   },
   {
    "name": "титан светлого цвета, миланский сетчатый браслет",
    "image": "/images/p/apple-watch-ultra-4/titan-svetlogo-cveta-milanskiy-setchatyy-braslet.webp",
    "price": 99690
   }
  ],
  "specs": {
   "Конфигурация": "49 мм · титан",
   "Экран": "1.98″",
   "Тип экрана": "OLED, сенсорный, с подсветкой",
   "Разрешение экрана": "514 x 422",
   "Процессор": "Apple S11",
   "Время работы": "до 72 часов",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "WR100",
   "Материал корпуса": "Титан",
   "Вес, г": "63",
   "Размеры": "4,9 x 4,4 x 1,2 см",
   "Операционная система": "Watch OS",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "iOS",
   "Установка сторонних приложений": "есть"
  },
  "summary": "1.98″ · 514 x 422 · Apple S11",
  "inStock": true,
  "description": "Apple Watch Ultra 4: экран — 1.98″; тип экрана — OLED, сенсорный, с подсветкой; разрешение экрана — 514 x 422."
 },
 {
  "id": "apple-watch-series-12-42-mm-alyuminiy",
  "name": "Apple Watch Series 12 42 мм · алюминий",
  "model": "Apple Watch Series 12",
  "variant": "42 мм · алюминий",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 38390,
  "image": "/images/p/apple-watch-series-12/alyuminiy-svetlo-zolotistogo-cveta-remeshok-sport-band-pesochnogo-cveta.webp",
  "colors": [
   {
    "name": "алюминий светло-золотистого цвета, ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-series-12/alyuminiy-svetlo-zolotistogo-cveta-remeshok-sport-band-pesochnogo-cveta.webp"
   },
   {
    "name": "алюминий цвета «серый космос», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/alyuminiy-cveta-seryy-kosmos-remeshok-sport-band-cveta-morskoy-siniy.webp",
    "price": 38890
   },
   {
    "name": "алюминий чёрного цвета, ремешок Sport Band чёрного цвета",
    "image": "/images/p/apple-watch-series-12/alyuminiy-chernogo-cveta-remeshok-sport-band-chernogo-cveta.webp",
    "price": 38890
   },
   {
    "name": "алюминий тёмно-бронзового цвета, ремешок Sport Band оливкового цвета",
    "image": "/images/p/apple-watch-series-12/alyuminiy-temno-bronzovogo-cveta-remeshok-sport-band-olivkovogo-cveta.webp",
    "price": 38890
   },
   {
    "name": "алюминий тёмно-бронзового цвета, миланский сетчатый браслет цвета «тёмная бронза»",
    "image": "/images/p/apple-watch-series-12/alyuminiy-temno-bronzovogo-cveta-milanskiy-setchatyy-braslet-cveta-temnaya-bronza.webp",
    "price": 61690
   }
  ],
  "specs": {
   "Конфигурация": "42 мм · алюминий",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-series-12-46-mm-alyuminiy",
  "name": "Apple Watch Series 12 46 мм · алюминий",
  "model": "Apple Watch Series 12",
  "variant": "46 мм · алюминий",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 40790,
  "image": "/images/p/apple-watch-series-12/alyuminiy-cveta-seryy-kosmos-remeshok-sport-band-cveta-morskoy-siniy.webp",
  "colors": [
   {
    "name": "алюминий цвета «серый космос», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/alyuminiy-cveta-seryy-kosmos-remeshok-sport-band-cveta-morskoy-siniy.webp"
   },
   {
    "name": "алюминий тёмно-бронзового цвета, ремешок Sport Band оливкового цвета",
    "image": "/images/p/apple-watch-series-12/alyuminiy-temno-bronzovogo-cveta-remeshok-sport-band-olivkovogo-cveta.webp",
    "price": 41790
   },
   {
    "name": "алюминий светло-золотистого цвета, ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-series-12/alyuminiy-svetlo-zolotistogo-cveta-remeshok-sport-band-pesochnogo-cveta.webp",
    "price": 43690
   },
   {
    "name": "алюминий тёмно-бронзового цвета, миланский сетчатый браслет цвета «тёмная бронза»",
    "image": "/images/p/apple-watch-series-12/alyuminiy-temno-bronzovogo-cveta-milanskiy-setchatyy-braslet-cveta-temnaya-bronza.webp",
    "price": 66490
   }
  ],
  "specs": {
   "Конфигурация": "46 мм · алюминий",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-series-12-42-mm-titan",
  "name": "Apple Watch Series 12 42 мм · титан",
  "model": "Apple Watch Series 12",
  "variant": "42 мм · титан",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 85490,
  "image": "/images/p/apple-watch-series-12/titan-cveta-siyayuschee-zoloto-milanskiy-setchatyy-braslet.webp",
  "colors": [
   {
    "name": "титан цвета «сияющее золото», миланский сетчатый браслет",
    "image": "/images/p/apple-watch-series-12/titan-cveta-siyayuschee-zoloto-milanskiy-setchatyy-braslet.webp"
   },
   {
    "name": "титан светлого цвета, миланский сетчатый браслет",
    "image": "/images/p/apple-watch-series-12/titan-svetlogo-cveta-milanskiy-setchatyy-braslet.webp",
    "price": 87390
   },
   {
    "name": "титан светлого цвета, ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/titan-svetlogo-cveta-remeshok-sport-band-cveta-morskoy-siniy.webp",
    "price": 91190
   },
   {
    "name": "титан цвета «сияющее золото», ремешок Sport Band бордового цвета",
    "image": "/images/p/apple-watch-series-12/titan-cveta-siyayuschee-zoloto-remeshok-sport-band-bordovogo-cveta.webp",
    "price": 92090
   }
  ],
  "specs": {
   "Конфигурация": "42 мм · титан",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-series-12-46-mm-titan",
  "name": "Apple Watch Series 12 46 мм · титан",
  "model": "Apple Watch Series 12",
  "variant": "46 мм · титан",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 93090,
  "image": "/images/p/apple-watch-series-12/titan-svetlogo-cveta-milanskiy-setchatyy-braslet.webp",
  "colors": [
   {
    "name": "титан светлого цвета, миланский сетчатый браслет",
    "image": "/images/p/apple-watch-series-12/titan-svetlogo-cveta-milanskiy-setchatyy-braslet.webp"
   },
   {
    "name": "титан цвета «сияющее золото», миланский сетчатый браслет",
    "image": "/images/p/apple-watch-series-12/titan-cveta-siyayuschee-zoloto-milanskiy-setchatyy-braslet.webp"
   },
   {
    "name": "титан цвета «сияющее золото», ремешок Sport Band бордового цвета",
    "image": "/images/p/apple-watch-series-12/titan-cveta-siyayuschee-zoloto-remeshok-sport-band-bordovogo-cveta.webp",
    "price": 94990
   },
   {
    "name": "титан светлого цвета, ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/titan-svetlogo-cveta-remeshok-sport-band-cveta-morskoy-siniy.webp",
    "price": 94990
   }
  ],
  "specs": {
   "Конфигурация": "46 мм · титан",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-series-12-42-mm-keramika",
  "name": "Apple Watch Series 12 42 мм · керамика",
  "model": "Apple Watch Series 12",
  "variant": "42 мм · керамика",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 119690,
  "image": "/images/p/apple-watch-series-12/keramika-cveta-temno-sinyaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp",
  "colors": [
   {
    "name": "керамика цвета «тёмно-синяя ночь», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/keramika-cveta-temno-sinyaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp"
   },
   {
    "name": "керамика цвета «белый жемчуг», ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-series-12/keramika-cveta-belyy-zhemchug-remeshok-sport-band-pesochnogo-cveta.webp",
    "price": 123490
   }
  ],
  "specs": {
   "Конфигурация": "42 мм · керамика",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-series-12-46-mm-keramika",
  "name": "Apple Watch Series 12 46 мм · керамика",
  "model": "Apple Watch Series 12",
  "variant": "46 мм · керамика",
  "storage": null,
  "family": "apple-watch-series-12",
  "brand": "Apple",
  "category": "Часы",
  "price": 123490,
  "image": "/images/p/apple-watch-series-12/keramika-cveta-temno-sinyaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp",
  "colors": [
   {
    "name": "керамика цвета «тёмно-синяя ночь», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-series-12/keramika-cveta-temno-sinyaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp"
   },
   {
    "name": "керамика цвета «белый жемчуг», ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-series-12/keramika-cveta-belyy-zhemchug-remeshok-sport-band-pesochnogo-cveta.webp",
    "price": 147190
   }
  ],
  "specs": {
   "Конфигурация": "46 мм · керамика",
   "Процессор": "Apple S11",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP6X",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "iOS 27",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S11 · IP6X · Watch OS",
  "inStock": true,
  "description": "Apple Watch Series 12: процессор — Apple S11; класс водонепроницаемости — IP6X; операционная система — Watch OS."
 },
 {
  "id": "galaxy-watch9-40-mm-bluetooth",
  "name": "Galaxy Watch9 40 мм Bluetooth",
  "model": "Galaxy Watch9",
  "variant": "40 мм Bluetooth",
  "storage": null,
  "family": "galaxy-watch9",
  "brand": "Samsung",
  "category": "Часы",
  "price": 25290,
  "image": "/images/p/galaxy-watch9/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-watch9/grafitovyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "40 мм Bluetooth",
   "size": "40 / 44 мм, алюминий",
   "display": "1.47\" AMOLED (44 мм), до 3000 нит",
   "chip": "Snapdragon Wear Elite",
   "battery": "445 мАч (44 мм), IP68"
  },
  "summary": "40 / 44 мм, алюминий · Snapdragon Wear Elite · 445 мАч (44 мм), IP68",
  "inStock": true,
  "description": "Основные смарт-часы Samsung 2026 года на новом чипе Snapdragon Wear Elite. Два размера корпуса, версии с LTE и без."
 },
 {
  "id": "galaxy-watch9-44-mm-bluetooth",
  "name": "Galaxy Watch9 44 мм Bluetooth",
  "model": "Galaxy Watch9",
  "variant": "44 мм Bluetooth",
  "storage": null,
  "family": "galaxy-watch9",
  "brand": "Samsung",
  "category": "Часы",
  "price": 26390,
  "image": "/images/p/galaxy-watch9/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-watch9/grafitovyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "44 мм Bluetooth",
   "size": "40 / 44 мм, алюминий",
   "display": "1.47\" AMOLED (44 мм), до 3000 нит",
   "chip": "Snapdragon Wear Elite",
   "battery": "445 мАч (44 мм), IP68"
  },
  "summary": "40 / 44 мм, алюминий · Snapdragon Wear Elite · 445 мАч (44 мм), IP68",
  "inStock": true,
  "description": "Основные смарт-часы Samsung 2026 года на новом чипе Snapdragon Wear Elite. Два размера корпуса, версии с LTE и без."
 },
 {
  "id": "galaxy-watch9-44-mm-lte",
  "name": "Galaxy Watch9 44 мм LTE",
  "model": "Galaxy Watch9",
  "variant": "44 мм LTE",
  "storage": null,
  "family": "galaxy-watch9",
  "brand": "Samsung",
  "category": "Часы",
  "price": 29390,
  "image": "/images/p/galaxy-watch9/grafitovyy.webp",
  "colors": [
   {
    "name": "Графитовый",
    "image": "/images/p/galaxy-watch9/grafitovyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "44 мм LTE",
   "size": "40 / 44 мм, алюминий",
   "display": "1.47\" AMOLED (44 мм), до 3000 нит",
   "chip": "Snapdragon Wear Elite",
   "battery": "445 мАч (44 мм), IP68"
  },
  "summary": "40 / 44 мм, алюминий · Snapdragon Wear Elite · 445 мАч (44 мм), IP68",
  "inStock": true,
  "description": "Основные смарт-часы Samsung 2026 года на новом чипе Snapdragon Wear Elite. Два размера корпуса, версии с LTE и без."
 },
 {
  "id": "apple-watch-se-3-40-mm-alyuminiy",
  "name": "Apple Watch SE 3 40 мм · алюминий",
  "model": "Apple Watch SE 3",
  "variant": "40 мм · алюминий",
  "storage": null,
  "family": "apple-watch-se-3",
  "brand": "Apple",
  "category": "Часы",
  "price": 19590,
  "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-temnaya-noch.webp",
  "colors": [
   {
    "name": "алюминий цвета «тёмная ночь», ремешок Sport Band цвета «тёмная ночь»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-temnaya-noch.webp"
   },
   {
    "name": "алюминий цвета «сияющая звезда», ремешок Sport Band цвета «сияющая звезда»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-siyayuschaya-zvezda-remeshok-sport-band-cveta-siyayuschaya-zvezda.webp",
    "price": 21790
   },
   {
    "name": "алюминий цвета «сияющая звезда», ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-siyayuschaya-zvezda-remeshok-sport-band-pesochnogo-cveta.webp",
    "price": 23690
   },
   {
    "name": "алюминий цвета «тёмная ночь», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp",
    "price": 25090
   }
  ],
  "specs": {
   "Конфигурация": "40 мм · алюминий",
   "Процессор": "Apple S10",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "WR50",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "17",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S10 · WR50 · Watch OS",
  "inStock": true,
  "description": "Apple Watch SE 3: процессор — Apple S10; класс водонепроницаемости — WR50; операционная система — Watch OS."
 },
 {
  "id": "apple-watch-se-3-44-mm-alyuminiy",
  "name": "Apple Watch SE 3 44 мм · алюминий",
  "model": "Apple Watch SE 3",
  "variant": "44 мм · алюминий",
  "storage": null,
  "family": "apple-watch-se-3",
  "brand": "Apple",
  "category": "Часы",
  "price": 21790,
  "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-temnaya-noch.webp",
  "colors": [
   {
    "name": "алюминий цвета «тёмная ночь», ремешок Sport Band цвета «тёмная ночь»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-temnaya-noch.webp"
   },
   {
    "name": "алюминий цвета «сияющая звезда», ремешок Sport Band цвета «сияющая звезда»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-siyayuschaya-zvezda-remeshok-sport-band-cveta-siyayuschaya-zvezda.webp",
    "price": 25090
   },
   {
    "name": "алюминий цвета «тёмная ночь», ремешок Sport Band цвета «морской синий»",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-temnaya-noch-remeshok-sport-band-cveta-morskoy-siniy.webp",
    "price": 28890
   },
   {
    "name": "алюминий цвета «сияющая звезда», ремешок Sport Band песочного цвета",
    "image": "/images/p/apple-watch-se-3/alyuminiy-cveta-siyayuschaya-zvezda-remeshok-sport-band-pesochnogo-cveta.webp",
    "price": 28890
   }
  ],
  "specs": {
   "Конфигурация": "44 мм · алюминий",
   "Процессор": "Apple S10",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "WR50",
   "Операционная система": "Watch OS",
   "Совместимость с ОС": "iOS",
   "Минимальная поддерживаемая версия iOS": "17",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "Apple S10 · WR50 · Watch OS",
  "inStock": true,
  "description": "Apple Watch SE 3: процессор — Apple S10; класс водонепроницаемости — WR50; операционная система — Watch OS."
 },
 {
  "id": "galaxy-watch8-40-mm",
  "name": "Galaxy Watch8 40 мм",
  "model": "Galaxy Watch8",
  "variant": "40 мм",
  "storage": null,
  "family": "galaxy-watch8",
  "brand": "Samsung",
  "category": "Часы",
  "price": 17490,
  "image": "/images/p/galaxy-watch8/bluetooth-wi-fi.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8/bluetooth-wi-fi.webp"
   }
  ],
  "specs": {
   "Конфигурация": "40 мм",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "galaxy-watch8-44-mm",
  "name": "Galaxy Watch8 44 мм",
  "model": "Galaxy Watch8",
  "variant": "44 мм",
  "storage": null,
  "family": "galaxy-watch8",
  "brand": "Samsung",
  "category": "Часы",
  "price": 18990,
  "image": "/images/p/galaxy-watch8/bluetooth-wi-fi.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8/bluetooth-wi-fi.webp"
   }
  ],
  "specs": {
   "Конфигурация": "44 мм",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "galaxy-watch8-40-mm-lte",
  "name": "Galaxy Watch8 40 мм · LTE",
  "model": "Galaxy Watch8",
  "variant": "40 мм · LTE",
  "storage": null,
  "family": "galaxy-watch8",
  "brand": "Samsung",
  "category": "Часы",
  "price": 21290,
  "image": "/images/p/galaxy-watch8/bluetooth-wi-fi-plus-4g-lte.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8/bluetooth-wi-fi-plus-4g-lte.webp"
   }
  ],
  "specs": {
   "Конфигурация": "40 мм · LTE",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "galaxy-watch8-44-mm-lte",
  "name": "Galaxy Watch8 44 мм · LTE",
  "model": "Galaxy Watch8",
  "variant": "44 мм · LTE",
  "storage": null,
  "family": "galaxy-watch8",
  "brand": "Samsung",
  "category": "Часы",
  "price": 22290,
  "image": "/images/p/galaxy-watch8/bluetooth-wi-fi-plus-4g-lte.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8/bluetooth-wi-fi-plus-4g-lte.webp"
   }
  ],
  "specs": {
   "Конфигурация": "44 мм · LTE",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "galaxy-watch8-classic-46-mm",
  "name": "Galaxy Watch8 Classic 46 мм",
  "model": "Galaxy Watch8 Classic",
  "variant": "46 мм",
  "storage": null,
  "family": "galaxy-watch8-classic",
  "brand": "Samsung",
  "category": "Часы",
  "price": 24190,
  "image": "/images/p/galaxy-watch8-classic/bluetooth-wi-fi.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8-classic/bluetooth-wi-fi.webp"
   }
  ],
  "specs": {
   "Конфигурация": "46 мм",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8 Classic: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "galaxy-watch8-classic-46-mm-lte",
  "name": "Galaxy Watch8 Classic 46 мм · LTE",
  "model": "Galaxy Watch8 Classic",
  "variant": "46 мм · LTE",
  "storage": null,
  "family": "galaxy-watch8-classic",
  "brand": "Samsung",
  "category": "Часы",
  "price": 24690,
  "image": "/images/p/galaxy-watch8-classic/bluetooth-wi-fi-plus-4g-lte.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/galaxy-watch8-classic/bluetooth-wi-fi-plus-4g-lte.webp"
   }
  ],
  "specs": {
   "Конфигурация": "46 мм · LTE",
   "Беспроводная зарядка": "да",
   "Класс водонепроницаемости": "IP68",
   "Операционная система": "Android Wear OS 6",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть"
  },
  "summary": "IP68 · Android Wear OS 6 · Android",
  "inStock": true,
  "description": "Galaxy Watch8 Classic: класс водонепроницаемости — IP68; операционная система — Android Wear OS 6; совместимость с ОС — Android."
 },
 {
  "id": "garmin-fenix-9-pro-43-mm-amoled-inreach",
  "name": "Garmin fenix 9 Pro 43 мм · AMOLED · inReach",
  "model": "Garmin fenix 9 Pro",
  "variant": "43 мм · AMOLED · inReach",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 100690,
  "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-morskaya-rakushka-osenniy-oranzhevyy-s-inreach.webp",
  "colors": [
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «морская ракушка»/«осенний оранжевый» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-morskaya-rakushka-osenniy-oranzhevyy-s-inreach.webp"
   }
  ],
  "specs": {
   "Конфигурация": "43 мм · AMOLED · inReach",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-47-mm-amoled",
  "name": "Garmin fenix 9 Pro 47 мм · AMOLED",
  "model": "Garmin fenix 9 Pro",
  "variant": "47 мм · AMOLED",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 109190,
  "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-bez-inreach.webp",
  "colors": [
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «графитовый/чёрный» (без inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-bez-inreach.webp"
   }
  ],
  "specs": {
   "Конфигурация": "47 мм · AMOLED",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-47-mm-solar-inreach",
  "name": "Garmin fenix 9 Pro 47 мм · Solar · inReach",
  "model": "Garmin fenix 9 Pro",
  "variant": "47 мм · Solar · inReach",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 123490,
  "image": "/images/p/garmin-fenix-9-pro/solar-titan-sapfir-silikonovyy-remeshok-cveta-seraya-galka-serebristo-seryy-s-inreach.webp",
  "colors": [
   {
    "name": "Solar, титан, сапфир, силиконовый ремешок цвета «серая галька»/серебристо-серый (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/solar-titan-sapfir-silikonovyy-remeshok-cveta-seraya-galka-serebristo-seryy-s-inreach.webp"
   }
  ],
  "specs": {
   "Конфигурация": "47 мм · Solar · inReach",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-47-mm-amoled-inreach",
  "name": "Garmin fenix 9 Pro 47 мм · AMOLED · inReach",
  "model": "Garmin fenix 9 Pro",
  "variant": "47 мм · AMOLED · inReach",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 123490,
  "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-osenniy-oranzhevyy-oranzhevaya-iskra-s-inreach.webp",
  "colors": [
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «осенний оранжевый»/«оранжевая искра» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-osenniy-oranzhevyy-oranzhevaya-iskra-s-inreach.webp"
   },
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «графитовый/чёрный» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-s-inreach.webp"
   },
   {
    "name": "AMOLED, титан с DLC, сапфир, силиконовый ремешок цвета чёрный/«серая галька» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-s-dlc-sapfir-silikonovyy-remeshok-cveta-chernyy-seraya-galka-s-inreach.webp"
   },
   {
    "name": "AMOLED, титан, сапфир, кожаный ремешок цвета «грецкий орех», силиконовый ремешок (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-kozhanyy-remeshok-cveta-greckiy-oreh-silikonovyy-remeshok-s-inreach.webp",
    "price": 132990
   }
  ],
  "specs": {
   "Конфигурация": "47 мм · AMOLED · inReach",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-51-mm-solar-inreach",
  "name": "Garmin fenix 9 Pro 51 мм · Solar · inReach",
  "model": "Garmin fenix 9 Pro",
  "variant": "51 мм · Solar · inReach",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 134890,
  "image": "/images/p/garmin-fenix-9-pro/solar-titan-sapfir-silikonovyy-remeshok-cveta-seraya-galka-serebristo-seryy-s-inreach.webp",
  "colors": [
   {
    "name": "Solar, титан, сапфир, силиконовый ремешок цвета «серая галька»/серебристо-серый (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/solar-titan-sapfir-silikonovyy-remeshok-cveta-seraya-galka-serebristo-seryy-s-inreach.webp"
   }
  ],
  "specs": {
   "Конфигурация": "51 мм · Solar · inReach",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-51-mm-amoled",
  "name": "Garmin fenix 9 Pro 51 мм · AMOLED",
  "model": "Garmin fenix 9 Pro",
  "variant": "51 мм · AMOLED",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 134890,
  "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-bez-inreach.webp",
  "colors": [
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «графитовый/чёрный» (без inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-bez-inreach.webp"
   }
  ],
  "specs": {
   "Конфигурация": "51 мм · AMOLED",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-fenix-9-pro-51-mm-amoled-inreach",
  "name": "Garmin fenix 9 Pro 51 мм · AMOLED · inReach",
  "model": "Garmin fenix 9 Pro",
  "variant": "51 мм · AMOLED · inReach",
  "storage": null,
  "family": "garmin-fenix-9-pro",
  "brand": "Garmin",
  "category": "Часы",
  "price": 142490,
  "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-osenniy-oranzhevyy-oranzhevaya-iskra-s-inreach.webp",
  "colors": [
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «осенний оранжевый»/«оранжевая искра» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-osenniy-oranzhevyy-oranzhevaya-iskra-s-inreach.webp"
   },
   {
    "name": "AMOLED, титан, сапфир, силиконовый ремешок цвета «графитовый/чёрный» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-sapfir-silikonovyy-remeshok-cveta-grafitovyy-chernyy-s-inreach.webp"
   },
   {
    "name": "AMOLED, титан с DLC, сапфир, силиконовый ремешок цвета чёрный/«серая галька» (с inReach)",
    "image": "/images/p/garmin-fenix-9-pro/amoled-titan-s-dlc-sapfir-silikonovyy-remeshok-cveta-chernyy-seraya-galka-s-inreach.webp",
    "price": 147190
   }
  ],
  "specs": {
   "Конфигурация": "51 мм · AMOLED · inReach",
   "Класс водонепроницаемости": "10 ATM",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "10 ATM · iOS, Android · цифровой (электронный)",
  "inStock": true,
  "description": "Garmin fenix 9 Pro: класс водонепроницаемости — 10 ATM; совместимость с ОС — iOS, Android; способ отображения времени — цифровой (электронный)."
 },
 {
  "id": "garmin-forerunner-570-47-mm",
  "name": "Garmin Forerunner 570 47 мм",
  "model": "Garmin Forerunner 570",
  "variant": "47 мм",
  "storage": null,
  "family": "garmin-forerunner-570",
  "brand": "Garmin",
  "category": "Часы",
  "price": 40790,
  "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-seryy-biryuzovyy.webp",
  "colors": [
   {
    "name": "силиконовый ремешок цвета «полупрозрачный серый»/бирюзовый",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-seryy-biryuzovyy.webp"
   },
   {
    "name": "силиконовый ремешок цвета «полупрозрачный фиолетовый»/«индиго»",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-fioletovyy-indigo.webp",
    "price": 41790
   },
   {
    "name": "силиконовый ремешок цвета «полупрозрачный чёрный»/чёрный",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-chernyy-chernyy.webp",
    "price": 41790
   }
  ],
  "specs": {
   "Конфигурация": "47 мм",
   "Класс водонепроницаемости": "5 ATM (50 м)",
   "Регулировка ремешка": "есть",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть",
   "Ширина ремешка": "20 мм",
   "Способ отображения времени": "цифровой (электронный)",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть",
   "Офлайн карты": "нет",
   "Открытая местность и спутниковые карты": "да"
  },
  "summary": "5 ATM (50 м) · iOS, Android · 20 мм",
  "inStock": true,
  "description": "Garmin Forerunner 570: класс водонепроницаемости — 5 ATM (50 м); совместимость с ОС — iOS, Android; ширина ремешка — 20 мм."
 },
 {
  "id": "garmin-forerunner-570-42-mm",
  "name": "Garmin Forerunner 570 42 мм",
  "model": "Garmin Forerunner 570",
  "variant": "42 мм",
  "storage": null,
  "family": "garmin-forerunner-570",
  "brand": "Garmin",
  "category": "Часы",
  "price": 41790,
  "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-seryy-dymchato-goluboy.webp",
  "colors": [
   {
    "name": "силиконовый ремешок цвета «полупрозрачный серый»/дымчато-голубой",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-seryy-dymchato-goluboy.webp"
   },
   {
    "name": "силиконовый ремешок цвета «полупрозрачный чёрный»/чёрный",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-chernyy-chernyy.webp"
   },
   {
    "name": "силиконовый ремешок цвета «полупрозрачный костяной»/«манго»",
    "image": "/images/p/garmin-forerunner-570/silikonovyy-remeshok-cveta-poluprozrachnyy-kostyanoy-mango.webp",
    "price": 42690
   }
  ],
  "specs": {
   "Конфигурация": "42 мм",
   "Класс водонепроницаемости": "5 ATM (50 м)",
   "Регулировка ремешка": "есть",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть",
   "Ширина ремешка": "20 мм",
   "Способ отображения времени": "цифровой (электронный)",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть",
   "Офлайн карты": "нет",
   "Открытая местность и спутниковые карты": "да"
  },
  "summary": "5 ATM (50 м) · iOS, Android · 20 мм",
  "inStock": true,
  "description": "Garmin Forerunner 570: класс водонепроницаемости — 5 ATM (50 м); совместимость с ОС — iOS, Android; ширина ремешка — 20 мм."
 },
 {
  "id": "garmin-forerunner-970",
  "name": "Garmin Forerunner 970",
  "model": "Garmin Forerunner 970",
  "variant": null,
  "storage": null,
  "family": "garmin-forerunner-970",
  "brand": "Garmin",
  "category": "Часы",
  "price": 54090,
  "image": "/images/p/garmin-forerunner-970/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/garmin-forerunner-970/main.webp"
   }
  ],
  "specs": {
   "Экран": "1.4”",
   "Разрешение экрана": "454 x 454",
   "Класс водонепроницаемости": "5 ATM (50 м)",
   "Вес, г": "56",
   "Регулировка ремешка": "есть",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Уведомления с просмотром или ответом": "есть",
   "Ширина ремешка": "22 мм",
   "Способ отображения времени": "цифровой (электронный)",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть",
   "Контроль маршрута": "да",
   "Путевая точка и визуальная навигация по маршруту": "да"
  },
  "summary": "1.4” · 454 x 454 · 5 ATM (50 м)",
  "inStock": true,
  "description": "Garmin Forerunner 970: экран — 1.4”; разрешение экрана — 454 x 454; класс водонепроницаемости — 5 ATM (50 м)."
 },
 {
  "id": "garmin-venu-x1",
  "name": "Garmin Venu X1",
  "model": "Garmin Venu X1",
  "variant": null,
  "storage": null,
  "family": "garmin-venu-x1",
  "brand": "Garmin",
  "category": "Часы",
  "price": 56990,
  "image": "/images/p/garmin-venu-x1/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/garmin-venu-x1/main.webp"
   }
  ],
  "specs": {
   "Экран": "2″",
   "Тип экрана": "AMOLED",
   "Разрешение экрана": "448 x 486",
   "Время работы": "До 8 дней",
   "Класс водонепроницаемости": "5 ATM",
   "Материал корпуса": "Армированный волокнами полимер",
   "Вес, г": "34",
   "Размеры": "4,6 x 4,1 x 0,79 мм",
   "Совместимость с ОС": "iOS, Android",
   "Установка сторонних приложений": "есть",
   "Способ отображения времени": "цифровой (электронный)",
   "Тип стекла": "Сапфировое стекло",
   "Влагозащита": "есть",
   "Сменный браслет/ремешок": "есть"
  },
  "summary": "2″ · AMOLED · 448 x 486",
  "inStock": true,
  "description": "Garmin Venu X1: экран — 2″; тип экрана — AMOLED; разрешение экрана — 448 x 486."
 },
 {
  "id": "xiaomi-smart-band-10",
  "name": "Xiaomi Smart Band 10",
  "model": "Xiaomi Smart Band 10",
  "variant": null,
  "storage": null,
  "family": "xiaomi-smart-band-10",
  "brand": "Xiaomi",
  "category": "Часы",
  "price": 3990,
  "image": "/images/p/xiaomi-smart-band-10/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/xiaomi-smart-band-10/main.webp"
   }
  ],
  "specs": {
   "Экран": "1.72″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "212 x 520",
   "Ёмкость аккумулятора": "233 мАч",
   "Класс водонепроницаемости": "5 ATM",
   "Материал корпуса": "Алюминий",
   "Вес, г": "15.95",
   "Размеры": "4,657 × 2,254 × 1,095 см",
   "Тип устройства": "фитнес-браслет",
   "Поддержка платформ": "Android, iOS",
   "Уведомления с просмотром или ответом": "есть",
   "Материал браслета/ремешка": "термополиуретан",
   "Способ отображения времени": "цифровой (электронный)"
  },
  "summary": "1.72″ · AMOLED · 60 Гц",
  "inStock": true,
  "description": "Xiaomi Smart Band 10: экран — 1.72″; тип экрана — AMOLED; частота обновления экрана — 60 Гц."
 },
 {
  "id": "galaxy-ring",
  "name": "Galaxy Ring",
  "model": "Galaxy Ring",
  "variant": null,
  "storage": null,
  "family": "galaxy-ring",
  "brand": "Samsung",
  "category": "Часы",
  "price": 20890,
  "image": "/images/p/galaxy-ring/zolotoy-titan.webp",
  "colors": [
   {
    "name": "Золотой титан",
    "image": "/images/p/galaxy-ring/zolotoy-titan.webp"
   },
   {
    "name": "Чёрный титан",
    "image": "/images/p/galaxy-ring/chernyy-titan.webp"
   },
   {
    "name": "Серебряный титан",
    "image": "/images/p/galaxy-ring/serebryanyy-titan.webp",
    "price": 22790
   }
  ],
  "specs": {
   "Время работы": "До 7 дней",
   "Материал корпуса": "Титан",
   "Вес, г": "От 2,3 до 3,2 (в зависимости от размера)",
   "Поддержка платформ": "Android",
   "Влагозащита": "Да (100 метров)",
   "Беспроводные модули": "Bluetooth",
   "Мобильное приложение": "Wearable",
   "Время зарядки": "80 мин",
   "Мониторинг": "сна, активности, сердечного ритма, температуры тела, кислорода в крови (только во сне)"
  },
  "summary": "До 7 дней · Титан · Android",
  "inStock": true,
  "description": "Galaxy Ring: время работы — До 7 дней; материал корпуса — Титан; вес, г — От 2,3 до 3,2 (в зависимости от размера)."
 },
 {
  "id": "oura-ring-5",
  "name": "Oura Ring 5",
  "model": "Oura Ring 5",
  "variant": null,
  "storage": null,
  "family": "oura-ring-5",
  "brand": "Oura",
  "category": "Часы",
  "price": 63590,
  "image": "/images/p/oura-ring-5/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/oura-ring-5/chernyy.webp"
   },
   {
    "name": "Серебристый",
    "image": "/images/p/oura-ring-5/serebristyy.webp"
   },
   {
    "name": "Золотой",
    "image": "/images/p/oura-ring-5/zolotoy.webp",
    "price": 72190
   },
   {
    "name": "Насыщенный розовый",
    "image": "/images/p/oura-ring-5/nasyschennyy-rozovyy.webp",
    "price": 72190
   },
   {
    "name": "Брашированное серебро",
    "image": "/images/p/oura-ring-5/brashirovannoe-serebro.webp",
    "price": 72190
   },
   {
    "name": "Матовый чёрный",
    "image": "/images/p/oura-ring-5/matovyy-chernyy.webp",
    "price": 72190
   }
  ],
  "specs": {
   "Время работы": "До 9 дней",
   "Материал корпуса": "Неаллергенный титан на внутренней и внешней поверхностях кольца",
   "Поддержка платформ": "Android, iOS",
   "Влагозащита": "Да (100 метров)",
   "Беспроводные модули": "Bluetooth",
   "Мобильное приложение": "Oura App",
   "Время зарядки": "10-80 минут",
   "Мониторинг": "сна, кислорода в крови, активности, стресса, сердечного ритма, овуляции"
  },
  "summary": "До 9 дней · Android, iOS · Да (100 метров)",
  "inStock": true,
  "description": "Oura Ring 5: время работы — До 9 дней; материал корпуса — Неаллергенный титан на внутренней и внешней поверхностях кольца; поддержка платформ — Android, iOS."
 },
 {
  "id": "huawei-watch-gt-6-41-mm",
  "name": "Huawei Watch GT 6 41 мм",
  "model": "Huawei Watch GT 6",
  "variant": "41 мм",
  "storage": null,
  "family": "huawei-watch-gt-6",
  "brand": "Huawei",
  "category": "Часы",
  "price": 17490,
  "image": "/images/p/huawei-watch-gt-6/brown-kozhanyy-remeshok-versiya-global.webp",
  "colors": [
   {
    "name": "Brown, кожаный ремешок (версия Global)",
    "image": "/images/p/huawei-watch-gt-6/brown-kozhanyy-remeshok-versiya-global.webp"
   },
   {
    "name": "Gold, миланский сетчатый браслет (версия Global)",
    "image": "/images/p/huawei-watch-gt-6/gold-milanskiy-setchatyy-braslet-versiya-global.webp",
    "price": 19890
   }
  ],
  "specs": {
   "Конфигурация": "41 мм",
   "Класс водонепроницаемости": "5 ATM",
   "Операционная система": "HarmonyOS 6.0",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android 9.0 и выше, iOS 13.0 и выше",
   "Материал браслета/ремешка": "кожа",
   "Способ отображения времени": "цифровой (электронный)"
  },
  "summary": "5 ATM · HarmonyOS 6.0 · кожа",
  "inStock": true,
  "description": "Huawei Watch GT 6: класс водонепроницаемости — 5 ATM; операционная система — HarmonyOS 6.0; совместимость с ОС — Android 9.0 и выше, iOS 13.0 и выше."
 },
 {
  "id": "huawei-watch-gt-6-46-mm",
  "name": "Huawei Watch GT 6 46 мм",
  "model": "Huawei Watch GT 6",
  "variant": "46 мм",
  "storage": null,
  "family": "huawei-watch-gt-6",
  "brand": "Huawei",
  "category": "Часы",
  "price": 17490,
  "image": "/images/p/huawei-watch-gt-6/green-pletenyy-braslet-versiya-global.webp",
  "colors": [
   {
    "name": "Green, плетёный браслет (версия Global)",
    "image": "/images/p/huawei-watch-gt-6/green-pletenyy-braslet-versiya-global.webp"
   },
   {
    "name": "Black, ремешок из фторэластомера (версия Global)",
    "image": "/images/p/huawei-watch-gt-6/black-remeshok-iz-ftorelastomera-versiya-global.webp"
   },
   {
    "name": "Grey, кожаный ремешок (версия Global)",
    "image": "/images/p/huawei-watch-gt-6/grey-kozhanyy-remeshok-versiya-global.webp"
   }
  ],
  "specs": {
   "Конфигурация": "46 мм",
   "Класс водонепроницаемости": "5 ATM",
   "Операционная система": "HarmonyOS 6.0",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android 9.0 и выше, iOS 13.0 и выше",
   "Материал браслета/ремешка": "кожа",
   "Способ отображения времени": "цифровой (электронный)"
  },
  "summary": "5 ATM · HarmonyOS 6.0 · кожа",
  "inStock": true,
  "description": "Huawei Watch GT 6: класс водонепроницаемости — 5 ATM; операционная система — HarmonyOS 6.0; совместимость с ОС — Android 9.0 и выше, iOS 13.0 и выше."
 },
 {
  "id": "huawei-watch-gt-6-pro",
  "name": "Huawei Watch GT 6 Pro",
  "model": "Huawei Watch GT 6 Pro",
  "variant": null,
  "storage": null,
  "family": "huawei-watch-gt-6-pro",
  "brand": "Huawei",
  "category": "Часы",
  "price": 20390,
  "image": "/images/p/huawei-watch-gt-6-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/huawei-watch-gt-6-pro/main.webp"
   }
  ],
  "specs": {
   "Экран": "1,47″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "466 x 466",
   "Время работы": "до 21 дня",
   "Класс водонепроницаемости": "5 ATM",
   "Материал корпуса": "Титан",
   "Вес, г": "54,7",
   "Размеры": "4,56 × 4,56 × 1,12 см",
   "Операционная система": "HarmonyOS 6.0",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android 9.0 и выше, iOS 13.0 и выше",
   "Материал браслета/ремешка": "Фторэластомер",
   "Способ отображения времени": "цифровой (электронный)"
  },
  "summary": "1,47″ · AMOLED · 60 Гц",
  "inStock": true,
  "description": "Huawei Watch GT 6 Pro: экран — 1,47″; тип экрана — AMOLED; частота обновления экрана — 60 Гц."
 },
 {
  "id": "huawei-watch-fit-5",
  "name": "Huawei Watch Fit 5",
  "model": "Huawei Watch Fit 5",
  "variant": null,
  "storage": null,
  "family": "huawei-watch-fit-5",
  "brand": "Huawei",
  "category": "Часы",
  "price": 11790,
  "image": "/images/p/huawei-watch-fit-5/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/huawei-watch-fit-5/main.webp"
   }
  ],
  "specs": {
   "Экран": "1,82″",
   "Тип экрана": "AMOLED",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "480 × 408",
   "Время работы": "до 10 дней",
   "Класс водонепроницаемости": "5 ATM",
   "Материал корпуса": "Алюминий",
   "Вес, г": "27",
   "Размеры": "4,29 × 3,82 × 0,95 мм",
   "Операционная система": "Harmony OS 6.1.0",
   "Бесконтактная оплата": "да",
   "Совместимость с ОС": "Android 9.0 и выше, iOS 13.0 и выше",
   "Материал браслета/ремешка": "Фторэластомер",
   "Способ отображения времени": "цифровой (электронный)"
  },
  "summary": "1,82″ · AMOLED · 60 Гц",
  "inStock": true,
  "description": "Huawei Watch Fit 5: экран — 1,82″; тип экрана — AMOLED; частота обновления экрана — 60 Гц."
 },
 {
  "id": "galaxy-watch-ultra2-47-mm-lte",
  "name": "Galaxy Watch Ultra2 47 мм LTE",
  "model": "Galaxy Watch Ultra2",
  "variant": "47 мм LTE",
  "storage": null,
  "family": "galaxy-watch-ultra2",
  "brand": "Samsung",
  "category": "Часы",
  "price": 42690,
  "image": "/images/p/galaxy-watch-ultra2/titanium-gray.webp",
  "colors": [
   {
    "name": "Titanium Gray",
    "image": "/images/p/galaxy-watch-ultra2/titanium-gray.webp"
   }
  ],
  "specs": {
   "Конфигурация": "47 мм LTE",
   "size": "47 мм, титан",
   "display": "1.5\" AMOLED, до 5000 нит",
   "chip": "Snapdragon Wear Elite",
   "battery": "800 мАч, до 100 ч"
  },
  "summary": "47 мм, титан · 1.5\" AMOLED, до 5000 нит · Snapdragon Wear Elite",
  "inStock": true,
  "description": "Защищённые смарт-часы Samsung для спорта и походов: титановый корпус 47 мм, LTE в каждой версии. Самый яркий экран и самая большая батарея среди Galaxy Watch."
 },
 {
  "id": "playstation-5-pro",
  "name": "PlayStation 5 Pro",
  "model": "PlayStation 5 Pro",
  "variant": null,
  "storage": null,
  "family": "ps5-pro",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 132990,
  "image": "/images/p/ps5-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/ps5-pro/main.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Пластик",
   "Вес, г": "3400",
   "Размеры": "35,8 x 21,6 x 10,4 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Графический процессор": "AMD Custom RDNA3",
   "Оперативная память": "16 ГБ",
   "Встроенный накопитель": "2 ТБ SSD",
   "Коммуникации": "Wi-FI 802.11 a/b/g/n/ac (5)/ax (6)/be (7), Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть",
   "Оптический привод": "приобретается отдельно",
   "Версия HDMI": "2.1"
  },
  "summary": "Пластик · 3400 · 35,8 x 21,6 x 10,4 см",
  "inStock": true,
  "description": "PlayStation 5 Pro: материал корпуса — Пластик; вес, г — 3400; размеры — 35,8 x 21,6 x 10,4 см."
 },
 {
  "id": "nintendo-switch-2",
  "name": "Nintendo Switch 2",
  "model": "Nintendo Switch 2",
  "variant": null,
  "storage": null,
  "family": "switch-2",
  "brand": "Nintendo",
  "category": "Игровые консоли",
  "price": 52190,
  "image": "/images/p/switch-2/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/switch-2/main.webp"
   }
  ],
  "specs": {
   "Экран": "7.9″",
   "Тип экрана": "IPS",
   "Разрешение экрана": "1920x1080",
   "Ёмкость аккумулятора": "5220 мАч",
   "Время работы": "6.5 ч",
   "Вес, г": "450",
   "Размеры": "27,1 x 11,4 x 1,39 см",
   "Поддержка карт памяти": "есть, micro SD Express",
   "Разъемы": "USB Type-C х2 шт., jack 3.5 мм, проприетарный разъем х2 шт."
  },
  "summary": "7.9″ · IPS · 1920x1080",
  "inStock": true,
  "description": "Nintendo Switch 2: экран — 7.9″; тип экрана — IPS; разрешение экрана — 1920x1080."
 },
 {
  "id": "dualsense-edge",
  "name": "DualSense Edge",
  "model": "DualSense Edge",
  "variant": null,
  "storage": null,
  "family": "dualsense-edge",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 19390,
  "image": "/images/p/dualsense-edge/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/dualsense-edge/main.webp"
   }
  ],
  "specs": {
   "Ёмкость аккумулятора": "1050 мАч",
   "Время работы": "до 10 ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "325",
   "Размеры": "16 x 10,6 x 6,6 см",
   "Поддержка XInput": "нет",
   "Рекомендовано": "Sony PlayStation 5 (все версии), iPhone, iPad, Apple TV, SteamDeck, Android-смартфоны",
   "Тип контроллера": "Беспроводной геймпад",
   "Виброотдача": "Есть",
   "Акселерометр": "есть",
   "Гироскоп": "есть",
   "Разъем для стереогарнитуры": "есть",
   "Пиктограммы кнопок": "Sony PlayStation",
   "Сменные элементы управления": "да"
  },
  "summary": "1050 мАч · до 10 ч · Пластик",
  "inStock": true,
  "description": "DualSense Edge: ёмкость аккумулятора — 1050 мАч; время работы — до 10 ч; материал корпуса — Пластик."
 },
 {
  "id": "playstation-5-slim-digital-edition-825-gb",
  "name": "PlayStation 5 Slim Digital Edition 825 ГБ",
  "model": "PlayStation 5 Slim Digital Edition",
  "variant": "825 ГБ",
  "storage": "825 ГБ",
  "family": "ps5-slim-digital",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 68390,
  "image": "/images/p/ps5-slim-digital/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/ps5-slim-digital/main.webp"
   }
  ],
  "specs": {
   "Память": "825 ГБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "2600",
   "Размеры": "35,8 x 21,6 x 8 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Графический процессор": "AMD Custom RDNA2",
   "Оперативная память": "16 ГБ",
   "Встроенный накопитель": "1 ТБ SSD",
   "Коммуникации": "Wi-FI 802.11 a/b/g/n/ac/ax, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть",
   "Оптический привод": "приобретается отдельно",
   "Версия HDMI": "2.1"
  },
  "summary": "Пластик · 2600 · 35,8 x 21,6 x 8 см",
  "inStock": true,
  "description": "PlayStation 5 Slim Digital Edition: материал корпуса — Пластик; вес, г — 2600; размеры — 35,8 x 21,6 x 8 см."
 },
 {
  "id": "playstation-5-slim-digital-edition-1-tb",
  "name": "PlayStation 5 Slim Digital Edition 1 ТБ",
  "model": "PlayStation 5 Slim Digital Edition",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "ps5-slim-digital",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 71190,
  "image": "/images/p/ps5-slim-digital/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/ps5-slim-digital/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "2600",
   "Размеры": "35,8 x 21,6 x 8 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Графический процессор": "AMD Custom RDNA2",
   "Оперативная память": "16 ГБ",
   "Встроенный накопитель": "1 ТБ SSD",
   "Коммуникации": "Wi-FI 802.11 a/b/g/n/ac/ax, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть",
   "Оптический привод": "приобретается отдельно",
   "Версия HDMI": "2.1"
  },
  "summary": "Пластик · 2600 · 35,8 x 21,6 x 8 см",
  "inStock": true,
  "description": "PlayStation 5 Slim Digital Edition: материал корпуса — Пластик; вес, г — 2600; размеры — 35,8 x 21,6 x 8 см."
 },
 {
  "id": "playstation-5-slim-1-tb",
  "name": "PlayStation 5 Slim 1 ТБ",
  "model": "PlayStation 5 Slim",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "ps5-slim",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 74090,
  "image": "/images/p/ps5-slim/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/ps5-slim/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "3200",
   "Размеры": "35,8 x 21,6 x 9,6 см",
   "Тип процессора": "8-ядерный AMD",
   "Графический процессор": "AMD Custom RDNA2",
   "Оперативная память": "16 ГБ",
   "Встроенный накопитель": "1 ТБ SSD",
   "Коммуникации": "Wi-FI 802.11 a/b/g/n/ac/ax, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть",
   "Оптический привод": "есть",
   "Версия HDMI": "2.1",
   "Скорость Ethernet": "10/100/1000 Мбит/с"
  },
  "summary": "Пластик · 3200 · 35,8 x 21,6 x 9,6 см",
  "inStock": true,
  "description": "PlayStation 5 Slim: материал корпуса — Пластик; вес, г — 3200; размеры — 35,8 x 21,6 x 9,6 см."
 },
 {
  "id": "xbox-series-x-1-tb",
  "name": "Xbox Series X 1 ТБ",
  "model": "Xbox Series X",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "xbox-series-x",
  "brand": "Microsoft",
  "category": "Игровые консоли",
  "price": 79790,
  "image": "/images/p/xbox-series-x/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/xbox-series-x/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "4500",
   "Размеры": "15,1 x 15,1 x 30,1 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Производительность системы при вычислениях с плавающей точкой": "12 терафлоп",
   "Графический процессор": "AMD Custom RDNA2",
   "Жесткий диск": "есть, 2048 ГБ SSD",
   "Оперативная память": "16384 Мб, GDDR6",
   "Поддерживаемые форматы": "WMA, MP3, JPEG",
   "Коммуникации": "Wi-Fi, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть"
  },
  "summary": "Пластик · 4500 · 15,1 x 15,1 x 30,1 см",
  "inStock": true,
  "description": "Xbox Series X: материал корпуса — Пластик; вес, г — 4500; размеры — 15,1 x 15,1 x 30,1 см."
 },
 {
  "id": "xbox-series-x-2-tb",
  "name": "Xbox Series X 2 ТБ",
  "model": "Xbox Series X",
  "variant": "2 ТБ",
  "storage": "2 ТБ",
  "family": "xbox-series-x",
  "brand": "Microsoft",
  "category": "Игровые консоли",
  "price": 110190,
  "image": "/images/p/xbox-series-x/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/xbox-series-x/main.webp"
   }
  ],
  "specs": {
   "Память": "2 ТБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "4500",
   "Размеры": "15,1 x 15,1 x 30,1 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Производительность системы при вычислениях с плавающей точкой": "12 терафлоп",
   "Графический процессор": "AMD Custom RDNA2",
   "Жесткий диск": "есть, 2048 ГБ SSD",
   "Оперативная память": "16384 Мб, GDDR6",
   "Поддерживаемые форматы": "WMA, MP3, JPEG",
   "Коммуникации": "Wi-Fi, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Поддержка 4K UHD": "есть"
  },
  "summary": "Пластик · 4500 · 15,1 x 15,1 x 30,1 см",
  "inStock": true,
  "description": "Xbox Series X: материал корпуса — Пластик; вес, г — 4500; размеры — 15,1 x 15,1 x 30,1 см."
 },
 {
  "id": "xbox-series-s-512-gb",
  "name": "Xbox Series S 512 ГБ",
  "model": "Xbox Series S",
  "variant": "512 ГБ",
  "storage": "512 ГБ",
  "family": "xbox-series-s",
  "brand": "Microsoft",
  "category": "Игровые консоли",
  "price": 50290,
  "image": "/images/p/xbox-series-s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/xbox-series-s/main.webp"
   }
  ],
  "specs": {
   "Память": "512 ГБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "2000",
   "Размеры": "6,5 x 15 x 27,5 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Производительность системы при вычислениях с плавающей точкой": "4 терафлоп",
   "Графический процессор": "AMD Custom RDNA2",
   "Жесткий диск": "есть, 1024 Гб SSD",
   "Оперативная память": "10240 Мб, GDDR6",
   "Поддерживаемые форматы": "WMA, MP3, JPEG",
   "Коммуникации": "Wi-Fi, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Разъемы": "HDMI, USB"
  },
  "summary": "Пластик · 2000 · 6,5 x 15 x 27,5 см",
  "inStock": true,
  "description": "Xbox Series S: материал корпуса — Пластик; вес, г — 2000; размеры — 6,5 x 15 x 27,5 см."
 },
 {
  "id": "xbox-series-s-1-tb",
  "name": "Xbox Series S 1 ТБ",
  "model": "Xbox Series S",
  "variant": "1 ТБ",
  "storage": "1 ТБ",
  "family": "xbox-series-s",
  "brand": "Microsoft",
  "category": "Игровые консоли",
  "price": 52190,
  "image": "/images/p/xbox-series-s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/xbox-series-s/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ",
   "Материал корпуса": "Пластик",
   "Вес, г": "2000",
   "Размеры": "6,5 x 15 x 27,5 см",
   "Поддержка 3D": "есть",
   "Тип процессора": "8-ядерный AMD",
   "Производительность системы при вычислениях с плавающей точкой": "4 терафлоп",
   "Графический процессор": "AMD Custom RDNA2",
   "Жесткий диск": "есть, 1024 Гб SSD",
   "Оперативная память": "10240 Мб, GDDR6",
   "Поддерживаемые форматы": "WMA, MP3, JPEG",
   "Коммуникации": "Wi-Fi, Ethernet",
   "Поддержка HD (High Definition)": "есть",
   "Проигрывание видео": "есть",
   "Разъемы": "HDMI, USB"
  },
  "summary": "Пластик · 2000 · 6,5 x 15 x 27,5 см",
  "inStock": true,
  "description": "Xbox Series S: материал корпуса — Пластик; вес, г — 2000; размеры — 6,5 x 15 x 27,5 см."
 },
 {
  "id": "nintendo-switch-oled",
  "name": "Nintendo Switch OLED",
  "model": "Nintendo Switch OLED",
  "variant": null,
  "storage": null,
  "family": "switch-oled",
  "brand": "Nintendo",
  "category": "Игровые консоли",
  "price": 30390,
  "image": "/images/p/switch-oled/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/switch-oled/main.webp"
   }
  ],
  "specs": {
   "Экран": "7″",
   "Разрешение экрана": "1280x720",
   "Время работы": "9 ч",
   "Вес, г": "320",
   "Размеры": "24,2 x 10,2 x 1,4 см",
   "Поддержка карт памяти": "microSD, microSDHC и microSDXC.",
   "Встроенная память": "64 ГБ",
   "Модули беспроводной связи": "Wi‑Fi, Bluetooth",
   "Разъемы USB-C": "2",
   "Встроенный динамик": "стереодинамики",
   "Тип носителя для игр": "Nintendo Switch Game Cards",
   "Аккумулятор": "Li-Ion",
   "Датчики": "Акселерометр, гироскоп, яркости"
  },
  "summary": "7″ · 1280x720 · 9 ч",
  "inStock": true,
  "description": "Nintendo Switch OLED: экран — 7″; разрешение экрана — 1280x720; время работы — 9 ч."
 },
 {
  "id": "nintendo-switch-lite",
  "name": "Nintendo Switch Lite",
  "model": "Nintendo Switch Lite",
  "variant": null,
  "storage": null,
  "family": "switch-lite",
  "brand": "Nintendo",
  "category": "Игровые консоли",
  "price": 18490,
  "image": "/images/p/switch-lite/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/switch-lite/main.webp"
   }
  ],
  "specs": {
   "Экран": "5.5″",
   "Разрешение экрана": "1280x720",
   "Процессор": "NVIDIA Tegra",
   "Ёмкость аккумулятора": "3570 мАч",
   "Вес, г": "275",
   "Размеры": "20,8 x 9,1 x 1,4 см",
   "Поддержка карт памяти": "microSD, microSDHC и microSDXC.",
   "Встроенная память": "32 ГБ",
   "Модули беспроводной связи": "Wi‑Fi, Bluetooth",
   "Разъемы USB-C": "1",
   "Встроенный динамик": "стереодинамики",
   "Тип носителя для игр": "Nintendo Switch Game Cards",
   "Аккумулятор": "Li-Ion",
   "Датчики": "Акселерометр, гироскоп, яркости"
  },
  "summary": "5.5″ · 1280x720 · NVIDIA Tegra",
  "inStock": true,
  "description": "Nintendo Switch Lite: экран — 5.5″; разрешение экрана — 1280x720; процессор — NVIDIA Tegra."
 },
 {
  "id": "steam-deck-oled",
  "name": "Steam Deck OLED",
  "model": "Steam Deck OLED",
  "variant": null,
  "storage": null,
  "family": "steam-deck",
  "brand": "Valve",
  "category": "Игровые консоли",
  "price": 81690,
  "image": "/images/p/steam-deck/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/steam-deck/main.webp"
   }
  ],
  "specs": {
   "Экран": "7.4″",
   "Тип экрана": "цветной OLED, сенсорный",
   "Частота обновления экрана": "90 Гц",
   "Разрешение экрана": "1280x800",
   "Процессор": "AMD Zen 2, 4ядра, 8 потоков, 2,4–3,5 ГГц (до 448 гигафлопс FP32)",
   "Ёмкость аккумулятора": "50 Вт/ч",
   "Время работы": "от 3 до 12 часов игры",
   "Материал корпуса": "Пластик",
   "Вес, г": "640",
   "Размеры": "29,8 x 11,7 x 4,9 см",
   "Подключение к телевизору/монитору": "есть",
   "Виброотдача": "Есть",
   "Количество ядер процессора": "4",
   "Техпроцесс": "6 нм"
  },
  "summary": "7.4″ · цветной OLED, сенсорный · 90 Гц",
  "inStock": true,
  "description": "Steam Deck OLED: экран — 7.4″; тип экрана — цветной OLED, сенсорный; частота обновления экрана — 90 Гц."
 },
 {
  "id": "asus-rog-xbox-ally-512-gb",
  "name": "ASUS ROG XBOX Ally 512 ГБ",
  "model": "ASUS ROG XBOX Ally 512 ГБ",
  "variant": null,
  "storage": null,
  "family": "rog-ally",
  "brand": "ASUS",
  "category": "Игровые консоли",
  "price": 56990,
  "image": "/images/p/rog-ally/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/rog-ally/main.webp"
   }
  ],
  "specs": {
   "Экран": "7″",
   "Тип экрана": "цветной IPS, сенсорный",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1920 x 1080",
   "Ёмкость аккумулятора": "80 Вт·ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "715",
   "Размеры": "29,0 x 12,1 x 2,75 ~ 5,09 см",
   "Операционная система": "Windows 11 Home",
   "Подключение к телевизору/монитору": "есть",
   "Виброотдача": "Есть",
   "Количество ядер процессора": "8",
   "Графический процессор": "AMD Radeon Graphics",
   "Поддержка карт памяти": "1x UHS-II microSD кардридер (поддержка SD, SDXC и SDHC)"
  },
  "summary": "7″ · цветной IPS, сенсорный · 120 Гц",
  "inStock": true,
  "description": "ASUS ROG XBOX Ally 512 ГБ: экран — 7″; тип экрана — цветной IPS, сенсорный; частота обновления экрана — 120 Гц."
 },
 {
  "id": "asus-rog-xbox-ally-x-1-tb",
  "name": "ASUS ROG XBOX Ally X 1 ТБ",
  "model": "ASUS ROG XBOX Ally X 1 ТБ",
  "variant": null,
  "storage": null,
  "family": "rog-ally",
  "brand": "ASUS",
  "category": "Игровые консоли",
  "price": 129190,
  "image": "/images/p/rog-ally/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/rog-ally/main.webp"
   }
  ],
  "specs": {
   "Экран": "7″",
   "Тип экрана": "цветной IPS, сенсорный",
   "Частота обновления экрана": "120 Гц",
   "Разрешение экрана": "1920 x 1080",
   "Ёмкость аккумулятора": "80 Вт·ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "715",
   "Размеры": "29,0 x 12,1 x 2,75 ~ 5,09 см",
   "Операционная система": "Windows 11 Home",
   "Подключение к телевизору/монитору": "есть",
   "Виброотдача": "Есть",
   "Количество ядер процессора": "8",
   "Графический процессор": "AMD Radeon Graphics",
   "Поддержка карт памяти": "1x UHS-II microSD кардридер (поддержка SD, SDXC и SDHC)"
  },
  "summary": "7″ · цветной IPS, сенсорный · 120 Гц",
  "inStock": true,
  "description": "ASUS ROG XBOX Ally X 1 ТБ: экран — 7″; тип экрана — цветной IPS, сенсорный; частота обновления экрана — 120 Гц."
 },
 {
  "id": "dualsense",
  "name": "DualSense",
  "model": "DualSense",
  "variant": null,
  "storage": null,
  "family": "dualsense",
  "brand": "Sony",
  "category": "Игровые консоли",
  "price": 7090,
  "image": "/images/p/dualsense/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/dualsense/main.webp"
   }
  ],
  "specs": {
   "Ёмкость аккумулятора": "1560 мАч",
   "Время работы": "до 12 ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "280",
   "Размеры": "16 x 10,6 x 6,6 см",
   "Поддержка XInput": "нет",
   "Рекомендовано": "Sony PlayStation 5 (все версии), iPhone, iPad, Apple TV, SteamDeck, Android-смартфоны",
   "Тип контроллера": "Беспроводной геймпад",
   "Виброотдача": "Есть",
   "Акселерометр": "есть",
   "Гироскоп": "есть",
   "Разъем для стереогарнитуры": "есть",
   "Сменные элементы управления": "нет",
   "Пиктограммы кнопок": "Sony PlayStation"
  },
  "summary": "1560 мАч · до 12 ч · Пластик",
  "inStock": true,
  "description": "DualSense: ёмкость аккумулятора — 1560 мАч; время работы — до 12 ч; материал корпуса — Пластик."
 },
 {
  "id": "dji-mini-5-pro-bazovyy-pult-dji-rc-n3",
  "name": "DJI Mini 5 Pro Базовый (пульт DJI RC-N3)",
  "model": "DJI Mini 5 Pro",
  "variant": "Базовый (пульт DJI RC-N3)",
  "storage": null,
  "family": "dji-mini-5-pro",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 72890,
  "image": "/images/p/dji-mini-5-pro/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-mini-5-pro/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Базовый (пульт DJI RC-N3)",
   "camera": "1\" CMOS 50 Мп",
   "video": "4K/120 fps HDR",
   "weight": "до 249 г",
   "sensing": "всенаправленный обход препятствий + LiDAR"
  },
  "summary": "1\" CMOS 50 Мп · 4K/120 fps HDR · до 249 г",
  "inStock": true,
  "description": "Компактный дрон до 249 г с однодюймовой камерой и поворотом подвеса на 225° для вертикальной съёмки. Главный кандидат на замену Mini 4 Pro."
 },
 {
  "id": "dji-mini-5-pro-fly-more-combo-dji-rc-2",
  "name": "DJI Mini 5 Pro Fly More Combo (DJI RC 2)",
  "model": "DJI Mini 5 Pro",
  "variant": "Fly More Combo (DJI RC 2)",
  "storage": null,
  "family": "dji-mini-5-pro",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 89990,
  "image": "/images/p/dji-mini-5-pro/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-mini-5-pro/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo (DJI RC 2)",
   "camera": "1\" CMOS 50 Мп",
   "video": "4K/120 fps HDR",
   "weight": "до 249 г",
   "sensing": "всенаправленный обход препятствий + LiDAR"
  },
  "summary": "1\" CMOS 50 Мп · 4K/120 fps HDR · до 249 г",
  "inStock": true,
  "description": "Компактный дрон до 249 г с однодюймовой камерой и поворотом подвеса на 225° для вертикальной съёмки. Главный кандидат на замену Mini 4 Pro."
 },
 {
  "id": "dji-mini-5-pro-fly-more-combo-plus-dji-rc-2",
  "name": "DJI Mini 5 Pro Fly More Combo Plus (DJI RC 2)",
  "model": "DJI Mini 5 Pro",
  "variant": "Fly More Combo Plus (DJI RC 2)",
  "storage": null,
  "family": "dji-mini-5-pro",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 97590,
  "image": "/images/p/dji-mini-5-pro/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-mini-5-pro/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo Plus (DJI RC 2)",
   "camera": "1\" CMOS 50 Мп",
   "video": "4K/120 fps HDR",
   "weight": "до 249 г",
   "sensing": "всенаправленный обход препятствий + LiDAR"
  },
  "summary": "1\" CMOS 50 Мп · 4K/120 fps HDR · до 249 г",
  "inStock": true,
  "description": "Компактный дрон до 249 г с однодюймовой камерой и поворотом подвеса на 225° для вертикальной съёмки. Главный кандидат на замену Mini 4 Pro."
 },
 {
  "id": "dji-osmo-action-6-standard-combo",
  "name": "DJI Osmo Action 6 Standard Combo",
  "model": "DJI Osmo Action 6",
  "variant": "Standard Combo",
  "storage": null,
  "family": "osmo-action-6",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 36990,
  "image": "/images/p/osmo-action-6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-action-6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Combo",
   "Ёмкость аккумулятора": "1950 мАч",
   "Время работы": "240 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "149",
   "Размеры": "7,28 x 4,72 x 3,31 см",
   "Диапазон температур зарядки": "+5...+40°C",
   "Частота кадров при макс. разрешении": "30",
   "Рабочая температура": "-20...+45° C",
   "Влагонепроницаемый корпус": "есть, до 20 метров",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "есть, MicroSD (до 1 ТБ)",
   "Объем памяти": "64 ГБ",
   "Интерфейсы": "Wi-Fi, Bluetooth"
  },
  "summary": "1950 мАч · 240 мин · Пластик",
  "inStock": true,
  "description": "DJI Osmo Action 6: ёмкость аккумулятора — 1950 мАч; время работы — 240 мин; материал корпуса — Пластик."
 },
 {
  "id": "dji-osmo-action-6-adventure-combo",
  "name": "DJI Osmo Action 6 Adventure Combo",
  "model": "DJI Osmo Action 6",
  "variant": "Adventure Combo",
  "storage": null,
  "family": "osmo-action-6",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 43690,
  "image": "/images/p/osmo-action-6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-action-6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Adventure Combo",
   "Ёмкость аккумулятора": "1950 мАч",
   "Время работы": "240 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "149",
   "Размеры": "7,28 x 4,72 x 3,31 см",
   "Диапазон температур зарядки": "+5...+40°C",
   "Частота кадров при макс. разрешении": "30",
   "Рабочая температура": "-20...+45° C",
   "Влагонепроницаемый корпус": "есть, до 20 метров",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "есть, MicroSD (до 1 ТБ)",
   "Объем памяти": "64 ГБ",
   "Интерфейсы": "Wi-Fi, Bluetooth"
  },
  "summary": "1950 мАч · 240 мин · Пластик",
  "inStock": true,
  "description": "DJI Osmo Action 6: ёмкость аккумулятора — 1950 мАч; время работы — 240 мин; материал корпуса — Пластик."
 },
 {
  "id": "insta360-x6-standard-bundle",
  "name": "Insta360 X6 Standard Bundle",
  "model": "Insta360 X6",
  "variant": "Standard Bundle",
  "storage": null,
  "family": "insta360-x6",
  "brand": "Insta360",
  "category": "Камеры и дроны",
  "price": 55090,
  "image": "/images/p/insta360-x6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/insta360-x6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Bundle",
   "Процессор": "Qualcomm",
   "Ёмкость аккумулятора": "2600 мАч",
   "Время работы": "140 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "196",
   "Размеры": "Без объектива: 10×5×2,64 см; С объективом: 10×5×4 см",
   "Частота кадров при макс. разрешении": "100",
   "Гироскоп": "есть",
   "Рабочая температура": "-20°С…+40°С",
   "Влагонепроницаемый корпус": "да, до 20 м",
   "Слот для карты памяти": "да",
   "Поддержка карт памяти": "есть, microSD",
   "Макс. скорость передачи данных": "450 Мб/с (по кабелю)",
   "Объем памяти": "64 ГБ (доступно 47 ГБ)"
  },
  "summary": "Qualcomm · 2600 мАч · 140 мин",
  "inStock": true,
  "description": "Insta360 X6: процессор — Qualcomm; ёмкость аккумулятора — 2600 мАч; время работы — 140 мин."
 },
 {
  "id": "insta360-x6-essentials-bundle",
  "name": "Insta360 X6 Essentials Bundle",
  "model": "Insta360 X6",
  "variant": "Essentials Bundle",
  "storage": null,
  "family": "insta360-x6",
  "brand": "Insta360",
  "category": "Камеры и дроны",
  "price": 63590,
  "image": "/images/p/insta360-x6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/insta360-x6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Essentials Bundle",
   "Процессор": "Qualcomm",
   "Ёмкость аккумулятора": "2600 мАч",
   "Время работы": "140 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "196",
   "Размеры": "Без объектива: 10×5×2,64 см; С объективом: 10×5×4 см",
   "Частота кадров при макс. разрешении": "100",
   "Гироскоп": "есть",
   "Рабочая температура": "-20°С…+40°С",
   "Влагонепроницаемый корпус": "да, до 20 м",
   "Слот для карты памяти": "да",
   "Поддержка карт памяти": "есть, microSD",
   "Макс. скорость передачи данных": "450 Мб/с (по кабелю)",
   "Объем памяти": "64 ГБ (доступно 47 ГБ)"
  },
  "summary": "Qualcomm · 2600 мАч · 140 мин",
  "inStock": true,
  "description": "Insta360 X6: процессор — Qualcomm; ёмкость аккумулятора — 2600 мАч; время работы — 140 мин."
 },
 {
  "id": "insta360-x6-motorcycle-multiview-bundle",
  "name": "Insta360 X6 Motorcycle Multiview Bundle",
  "model": "Insta360 X6",
  "variant": "Motorcycle Multiview Bundle",
  "storage": null,
  "family": "insta360-x6",
  "brand": "Insta360",
  "category": "Камеры и дроны",
  "price": 68390,
  "image": "/images/p/insta360-x6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/insta360-x6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Motorcycle Multiview Bundle",
   "Процессор": "Qualcomm",
   "Ёмкость аккумулятора": "2600 мАч",
   "Время работы": "140 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "196",
   "Размеры": "Без объектива: 10×5×2,64 см; С объективом: 10×5×4 см",
   "Частота кадров при макс. разрешении": "100",
   "Гироскоп": "есть",
   "Рабочая температура": "-20°С…+40°С",
   "Влагонепроницаемый корпус": "да, до 20 м",
   "Слот для карты памяти": "да",
   "Поддержка карт памяти": "есть, microSD",
   "Макс. скорость передачи данных": "450 Мб/с (по кабелю)",
   "Объем памяти": "64 ГБ (доступно 47 ГБ)"
  },
  "summary": "Qualcomm · 2600 мАч · 140 мин",
  "inStock": true,
  "description": "Insta360 X6: процессор — Qualcomm; ёмкость аккумулятора — 2600 мАч; время работы — 140 мин."
 },
 {
  "id": "dji-osmo-360-standard-combo",
  "name": "DJI Osmo 360 Standard Combo",
  "model": "DJI Osmo 360",
  "variant": "Standard Combo",
  "storage": null,
  "family": "osmo-360",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 31290,
  "image": "/images/p/osmo-360/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-360/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Combo",
   "Разрешение экрана": "314×556",
   "Ёмкость аккумулятора": "1950 мАч",
   "Материал корпуса": "Пластик",
   "Вес, г": "183",
   "Размеры": "6,1 x 3,63 x 8,1 см",
   "Диапазон температур зарядки": "+5...+40°C",
   "Частота кадров при макс. разрешении": "60",
   "Гироскоп": "есть",
   "Рабочая температура": "-20...+45° C",
   "Влагонепроницаемый корпус": "да, до 10 метров",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "есть, MicroSD (до 1 ТБ)",
   "Встроенная память": "128 ГБ"
  },
  "summary": "360° · 8K 60 к/с · 128 ГБ · до 10 м",
  "inStock": true,
  "description": "Камера 360° с двумя объективами: видео 8K до 60 кадров/с, 4K до 120 кадров/с. Встроенная память 128 ГБ и слот microSD, корпус защищён от воды до 10 м, вес 183 г."
 },
 {
  "id": "dji-osmo-360-adventure-combo",
  "name": "DJI Osmo 360 Adventure Combo",
  "model": "DJI Osmo 360",
  "variant": "Adventure Combo",
  "storage": null,
  "family": "osmo-360",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 38890,
  "image": "/images/p/osmo-360/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-360/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Adventure Combo",
   "Разрешение экрана": "314×556",
   "Ёмкость аккумулятора": "1950 мАч",
   "Материал корпуса": "Пластик",
   "Вес, г": "183",
   "Размеры": "6,1 x 3,63 x 8,1 см",
   "Диапазон температур зарядки": "+5...+40°C",
   "Частота кадров при макс. разрешении": "60",
   "Гироскоп": "есть",
   "Рабочая температура": "-20...+45° C",
   "Влагонепроницаемый корпус": "да, до 10 метров",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "есть, MicroSD (до 1 ТБ)",
   "Встроенная память": "128 ГБ"
  },
  "summary": "360° · 8K 60 к/с · 128 ГБ · до 10 м",
  "inStock": true,
  "description": "Камера 360° с двумя объективами: видео 8K до 60 кадров/с, 4K до 120 кадров/с. Встроенная память 128 ГБ и слот microSD, корпус защищён от воды до 10 м, вес 183 г."
 },
 {
  "id": "dji-osmo-mobile-8-standard-combo",
  "name": "DJI Osmo Mobile 8 Standard Combo",
  "model": "DJI Osmo Mobile 8",
  "variant": "Standard Combo",
  "storage": null,
  "family": "osmo-mobile-8",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 11390,
  "image": "/images/p/osmo-mobile-8/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-mobile-8/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Combo",
   "Экран": "1,4″",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "240 × 240",
   "Ёмкость аккумулятора": "3350 мАч",
   "Время работы": "10 ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "29",
   "Контролируемый диапазон углов вращения": "Поворот: 360°; Крен: от -52° до 256°; Наклон: от -37° до 55°",
   "Освещённость": "40 lux",
   "GFSK": "2 мбит/с (многофункциональный модуль)",
   "Габариты": "В разложенном виде: 291×110×101 мм; В сложенном виде: 196×105×38 мм",
   "Диапазон температур зарядки": "от +5° до +40°С",
   "Размер совместимого мобильного устройства": "Вес: 170-300 гр; Толщина: 6,9-11 мм; Ширина: 67-84 мм",
   "Макс. угловая скорость": "90 °/с"
  },
  "summary": "1,4″ · 60 Гц · 240 × 240",
  "inStock": true,
  "description": "DJI Osmo Mobile 8: экран — 1,4″; частота обновления экрана — 60 Гц; разрешение экрана — 240 × 240."
 },
 {
  "id": "dji-osmo-mobile-8-advanced-tracking-combo",
  "name": "DJI Osmo Mobile 8 Advanced Tracking Combo",
  "model": "DJI Osmo Mobile 8",
  "variant": "Advanced Tracking Combo",
  "storage": null,
  "family": "osmo-mobile-8",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 12790,
  "image": "/images/p/osmo-mobile-8/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-mobile-8/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Advanced Tracking Combo",
   "Экран": "1,4″",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "240 × 240",
   "Ёмкость аккумулятора": "3350 мАч",
   "Время работы": "10 ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "29",
   "Контролируемый диапазон углов вращения": "Поворот: 360°; Крен: от -52° до 256°; Наклон: от -37° до 55°",
   "Освещённость": "40 lux",
   "GFSK": "2 мбит/с (многофункциональный модуль)",
   "Габариты": "В разложенном виде: 291×110×101 мм; В сложенном виде: 196×105×38 мм",
   "Диапазон температур зарядки": "от +5° до +40°С",
   "Размер совместимого мобильного устройства": "Вес: 170-300 гр; Толщина: 6,9-11 мм; Ширина: 67-84 мм",
   "Макс. угловая скорость": "90 °/с"
  },
  "summary": "1,4″ · 60 Гц · 240 × 240",
  "inStock": true,
  "description": "DJI Osmo Mobile 8: экран — 1,4″; частота обновления экрана — 60 Гц; разрешение экрана — 240 × 240."
 },
 {
  "id": "dji-osmo-mobile-8-creator-combo",
  "name": "DJI Osmo Mobile 8 Creator Combo",
  "model": "DJI Osmo Mobile 8",
  "variant": "Creator Combo",
  "storage": null,
  "family": "osmo-mobile-8",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 20890,
  "image": "/images/p/osmo-mobile-8/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-mobile-8/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Creator Combo",
   "Экран": "1,4″",
   "Частота обновления экрана": "60 Гц",
   "Разрешение экрана": "240 × 240",
   "Ёмкость аккумулятора": "3350 мАч",
   "Время работы": "10 ч",
   "Материал корпуса": "Пластик",
   "Вес, г": "29",
   "Контролируемый диапазон углов вращения": "Поворот: 360°; Крен: от -52° до 256°; Наклон: от -37° до 55°",
   "Освещённость": "40 lux",
   "GFSK": "2 мбит/с (многофункциональный модуль)",
   "Габариты": "В разложенном виде: 291×110×101 мм; В сложенном виде: 196×105×38 мм",
   "Диапазон температур зарядки": "от +5° до +40°С",
   "Размер совместимого мобильного устройства": "Вес: 170-300 гр; Толщина: 6,9-11 мм; Ширина: 67-84 мм",
   "Макс. угловая скорость": "90 °/с"
  },
  "summary": "1,4″ · 60 Гц · 240 × 240",
  "inStock": true,
  "description": "DJI Osmo Mobile 8: экран — 1,4″; частота обновления экрана — 60 Гц; разрешение экрана — 240 × 240."
 },
 {
  "id": "dji-osmo-pocket-4p-standard-combo",
  "name": "DJI Osmo Pocket 4P Standard Combo",
  "model": "DJI Osmo Pocket 4P",
  "variant": "Standard Combo",
  "storage": null,
  "family": "osmo-pocket-4p",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 56990,
  "image": "/images/p/osmo-pocket-4p/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-pocket-4p/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Combo",
   "Ёмкость аккумулятора": "1545 мАч",
   "Время работы": "210 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "230",
   "Размеры": "15,95 × 6,33 × 3,35 см",
   "Диапазон температур зарядки": "от +5° до +45°C",
   "Рабочая температура": "от 0° до +40°C",
   "Влагонепроницаемый корпус": "Нет",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "microSD до 1 ТБ",
   "Интерфейсы": "Wi-Fi, Bluetooth",
   "Поддержка Wi-Fi": "802.11 a/b/g/n/ac/ax",
   "Поддержка Bluetooth": "Bluetooth 5.4"
  },
  "summary": "1545 мАч · 210 мин · Пластик",
  "inStock": true,
  "description": "DJI Osmo Pocket 4P: ёмкость аккумулятора — 1545 мАч; время работы — 210 мин; материал корпуса — Пластик."
 },
 {
  "id": "dji-osmo-pocket-4p-vlog-combo",
  "name": "DJI Osmo Pocket 4P Vlog Combo",
  "model": "DJI Osmo Pocket 4P",
  "variant": "Vlog Combo",
  "storage": null,
  "family": "osmo-pocket-4p",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 67390,
  "image": "/images/p/osmo-pocket-4p/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/osmo-pocket-4p/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Vlog Combo",
   "Ёмкость аккумулятора": "1545 мАч",
   "Время работы": "210 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "230",
   "Размеры": "15,95 × 6,33 × 3,35 см",
   "Диапазон температур зарядки": "от +5° до +45°C",
   "Рабочая температура": "от 0° до +40°C",
   "Влагонепроницаемый корпус": "Нет",
   "Слот для карты памяти": "да",
   "Поддержка файловых систем": "exFAT",
   "Поддержка карт памяти": "microSD до 1 ТБ",
   "Интерфейсы": "Wi-Fi, Bluetooth",
   "Поддержка Wi-Fi": "802.11 a/b/g/n/ac/ax",
   "Поддержка Bluetooth": "Bluetooth 5.4"
  },
  "summary": "1545 мАч · 210 мин · Пластик",
  "inStock": true,
  "description": "DJI Osmo Pocket 4P: ёмкость аккумулятора — 1545 мАч; время работы — 210 мин; материал корпуса — Пластик."
 },
 {
  "id": "dji-air-3s-fly-more-combo-rc-n3",
  "name": "DJI Air 3S Fly More Combo (RC-N3)",
  "model": "DJI Air 3S",
  "variant": "Fly More Combo (RC-N3)",
  "storage": null,
  "family": "dji-air-3s",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 122890,
  "image": "/images/p/dji-air-3s/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-air-3s/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo (RC-N3)",
   "camera": "1\" 50 Мп (широкая) + 1/1.3\" 70 мм (теле)",
   "video": "4K/60 HDR",
   "flight": "до 45 мин",
   "sensing": "всенаправленный + LiDAR"
  },
  "summary": "4K/60 HDR · до 45 мин · всенаправленный + LiDAR",
  "inStock": true,
  "description": "Дрон среднего класса с двумя камерами: широкой однодюймовой и телеобъективом 70 мм. Air 4 на сайте DJI нет, поэтому Air 3S остаётся текущей моделью."
 },
 {
  "id": "dji-air-3s-fly-more-combo-dji-rc-2",
  "name": "DJI Air 3S Fly More Combo (DJI RC 2)",
  "model": "DJI Air 3S",
  "variant": "Fly More Combo (DJI RC 2)",
  "storage": null,
  "family": "dji-air-3s",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 135790,
  "image": "/images/p/dji-air-3s/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-air-3s/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo (DJI RC 2)",
   "camera": "1\" 50 Мп (широкая) + 1/1.3\" 70 мм (теле)",
   "video": "4K/60 HDR",
   "flight": "до 45 мин",
   "sensing": "всенаправленный + LiDAR"
  },
  "summary": "4K/60 HDR · до 45 мин · всенаправленный + LiDAR",
  "inStock": true,
  "description": "Дрон среднего класса с двумя камерами: широкой однодюймовой и телеобъективом 70 мм. Air 4 на сайте DJI нет, поэтому Air 3S остаётся текущей моделью."
 },
 {
  "id": "dji-avata-360-s-pultom-dji-rc-2",
  "name": "DJI Avata 360 С пультом DJI RC 2",
  "model": "DJI Avata 360",
  "variant": "С пультом DJI RC 2",
  "storage": null,
  "family": "dji-avata-360",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 64990,
  "image": "/images/p/dji-avata-360/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-avata-360/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "С пультом DJI RC 2",
   "camera": "360°, сенсоры эквивалент 1\"",
   "video": "8K/60 fps HDR (360°)",
   "type": "FPV/360-дрон с защитой винтов"
  },
  "summary": "360°, сенсоры эквивалент 1\" · 8K/60 fps HDR (360°)",
  "inStock": true,
  "description": "Новый FPV-дрон с камерой 360°: снимает всё вокруг, а кадр выбирается уже после полёта. Сменил Avata 2 в роли главного FPV-дрона DJI."
 },
 {
  "id": "dji-avata-360-fly-more-combo-dji-rc-2",
  "name": "DJI Avata 360 Fly More Combo (DJI RC 2)",
  "model": "DJI Avata 360",
  "variant": "Fly More Combo (DJI RC 2)",
  "storage": null,
  "family": "dji-avata-360",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 74090,
  "image": "/images/p/dji-avata-360/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-avata-360/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo (DJI RC 2)",
   "camera": "360°, сенсоры эквивалент 1\"",
   "video": "8K/60 fps HDR (360°)",
   "type": "FPV/360-дрон с защитой винтов"
  },
  "summary": "360°, сенсоры эквивалент 1\" · 8K/60 fps HDR (360°)",
  "inStock": true,
  "description": "Новый FPV-дрон с камерой 360°: снимает всё вокруг, а кадр выбирается уже после полёта. Сменил Avata 2 в роли главного FPV-дрона DJI."
 },
 {
  "id": "dji-neo-2-bez-pulta",
  "name": "DJI Neo 2 Без пульта",
  "model": "DJI Neo 2",
  "variant": "Без пульта",
  "storage": null,
  "family": "dji-neo-2",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 27890,
  "image": "/images/p/dji-neo-2/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-neo-2/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Без пульта",
   "camera": "4K",
   "weight": "около 150 г",
   "control": "с ладони, жестами, со смартфона или пульта",
   "sensing": "всенаправленный обход препятствий"
  },
  "summary": "4K · около 150 г",
  "inStock": true,
  "description": "Самый маленький дрон DJI для селфи и съёмки «следуй за мной»: взлетает с ладони, управляется жестами и со смартфона. Подходит как недорогой первый дрон."
 },
 {
  "id": "dji-neo-2-fly-more-combo",
  "name": "DJI Neo 2 Fly More Combo",
  "model": "DJI Neo 2",
  "variant": "Fly More Combo",
  "storage": null,
  "family": "dji-neo-2",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 38390,
  "image": "/images/p/dji-neo-2/seryy.webp",
  "colors": [
   {
    "name": "Серый",
    "image": "/images/p/dji-neo-2/seryy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Fly More Combo",
   "camera": "4K",
   "weight": "около 150 г",
   "control": "с ладони, жестами, со смартфона или пульта",
   "sensing": "всенаправленный обход препятствий"
  },
  "summary": "4K · около 150 г",
  "inStock": true,
  "description": "Самый маленький дрон DJI для селфи и съёмки «следуй за мной»: взлетает с ладони, управляется жестами и со смартфона. Подходит как недорогой первый дрон."
 },
 {
  "id": "dji-osmo-pocket-4-standard-combo",
  "name": "DJI Osmo Pocket 4 Standard Combo",
  "model": "DJI Osmo Pocket 4",
  "variant": "Standard Combo",
  "storage": null,
  "family": "osmo-pocket-4",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 38890,
  "image": "/images/p/osmo-pocket-4/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/osmo-pocket-4/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Standard Combo",
   "sensor": "1\" CMOS",
   "video": "4K/240 fps, 10-bit D-Log, 14 стопов",
   "zoom": "2× без потерь",
   "stabilization": "3-осевой подвес"
  },
  "summary": "1\" CMOS · 2× без потерь · 3-осевой подвес",
  "inStock": true,
  "description": "Карманная камера на стабилизаторе с однодюймовой матрицей для влогов и путешествий. По сравнению с Pocket 3 снимает до 240 к/с и получила двукратный зум."
 },
 {
  "id": "dji-osmo-pocket-4-creator-combo",
  "name": "DJI Osmo Pocket 4 Creator Combo",
  "model": "DJI Osmo Pocket 4",
  "variant": "Creator Combo",
  "storage": null,
  "family": "osmo-pocket-4",
  "brand": "DJI",
  "category": "Камеры и дроны",
  "price": 47490,
  "image": "/images/p/osmo-pocket-4/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/osmo-pocket-4/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Creator Combo",
   "sensor": "1\" CMOS",
   "video": "4K/240 fps, 10-bit D-Log, 14 стопов",
   "zoom": "2× без потерь",
   "stabilization": "3-осевой подвес"
  },
  "summary": "1\" CMOS · 2× без потерь · 3-осевой подвес",
  "inStock": true,
  "description": "Карманная камера на стабилизаторе с однодюймовой матрицей для влогов и путешествий. По сравнению с Pocket 3 снимает до 240 к/с и получила двукратный зум."
 },
 {
  "id": "gopro-hero13-black-kamera-black-edition",
  "name": "GoPro HERO13 Black Камера (Black Edition)",
  "model": "GoPro HERO13 Black",
  "variant": "Камера (Black Edition)",
  "storage": null,
  "family": "gopro-hero13",
  "brand": "GoPro",
  "category": "Камеры и дроны",
  "price": 35190,
  "image": "/images/p/gopro-hero13/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/gopro-hero13/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Камера (Black Edition)",
   "sensor": "1/1.9\" 27 Мп",
   "video": "5.3K/60, 4K/120",
   "battery": "Enduro 1900 мА·ч",
   "mounts": "магнитное крепление, сменные линзы HB-серии"
  },
  "summary": "1/1.9\" 27 Мп · 5.3K/60, 4K/120 · Enduro 1900 мА·ч",
  "inStock": true,
  "description": "Текущая экшн-камера линейки HERO: водозащита до 10 м без бокса, поддержка сменных линз. Новее HERO у GoPro пока нет."
 },
 {
  "id": "gopro-hero13-black-creator-edition",
  "name": "GoPro HERO13 Black Creator Edition",
  "model": "GoPro HERO13 Black",
  "variant": "Creator Edition",
  "storage": null,
  "family": "gopro-hero13",
  "brand": "GoPro",
  "category": "Камеры и дроны",
  "price": 53290,
  "image": "/images/p/gopro-hero13/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/gopro-hero13/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Creator Edition",
   "sensor": "1/1.9\" 27 Мп",
   "video": "5.3K/60, 4K/120",
   "battery": "Enduro 1900 мА·ч",
   "mounts": "магнитное крепление, сменные линзы HB-серии"
  },
  "summary": "1/1.9\" 27 Мп · 5.3K/60, 4K/120 · Enduro 1900 мА·ч",
  "inStock": true,
  "description": "Текущая экшн-камера линейки HERO: водозащита до 10 м без бокса, поддержка сменных линз. Новее HERO у GoPro пока нет."
 },
 {
  "id": "dyson-airwrap-co-anda-2x",
  "name": "Dyson Airwrap Co-anda 2x",
  "model": "Dyson Airwrap Co-anda 2x",
  "variant": null,
  "storage": null,
  "family": "dyson-airwrap-coanda-2x",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 43690,
  "image": "/images/p/dyson-airwrap-coanda-2x/ceramic-apricot-topaz.webp",
  "colors": [
   {
    "name": "Ceramic Apricot/Topaz",
    "image": "/images/p/dyson-airwrap-coanda-2x/ceramic-apricot-topaz.webp"
   },
   {
    "name": "Jasper Plum",
    "image": "/images/p/dyson-airwrap-coanda-2x/jasper-plum.webp",
    "price": 44590
   },
   {
    "name": "Ceramic Pink/Rose Gold",
    "image": "/images/p/dyson-airwrap-coanda-2x/ceramic-pink-rose-gold.webp",
    "price": 44590
   },
   {
    "name": "Amber Silk",
    "image": "/images/p/dyson-airwrap-coanda-2x/amber-silk.webp",
    "price": 50290
   },
   {
    "name": "Red Velvet/Gold",
    "image": "/images/p/dyson-airwrap-coanda-2x/red-velvet-gold.webp",
    "price": 63590
   }
  ],
  "specs": {
   "Вес, г": "581",
   "Размеры": "26,2 x 4,4 x 3,8 см",
   "Год релиза": "2026",
   "Тип волос": "волнистые, прямые",
   "Максимальный воздушный поток": "13,5 л/с",
   "Скорость вращения двигателя (об/мин)": "150000",
   "Мощность": "1700 Вт",
   "Серия": "HS09",
   "Индикация": "включения",
   "Мобильное приложение": "MyDyson",
   "Количество температурных режимов": "3",
   "Количество режимов": "3",
   "Функции": "ионизация, подача холодного воздуха, автоматическое вращение насадки"
  },
  "summary": "581 · 26,2 x 4,4 x 3,8 см · 2026",
  "inStock": true,
  "description": "Dyson Airwrap Co-anda 2x: вес, г — 581; размеры — 26,2 x 4,4 x 3,8 см; год релиза — 2026."
 },
 {
  "id": "dyson-airwrap-i-d",
  "name": "Dyson Airwrap i.d.",
  "model": "Dyson Airwrap i.d.",
  "variant": null,
  "storage": null,
  "family": "dyson-airwrap-id",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 36090,
  "image": "/images/p/dyson-airwrap-id/ceramic-apricot-topaz.webp",
  "colors": [
   {
    "name": "Ceramic Apricot/Topaz",
    "image": "/images/p/dyson-airwrap-id/ceramic-apricot-topaz.webp"
   },
   {
    "name": "Ceramic Patina/Topaz Orange",
    "image": "/images/p/dyson-airwrap-id/ceramic-patina-topaz-orange.webp",
    "price": 36990
   },
   {
    "name": "Red Velvet/Gold",
    "image": "/images/p/dyson-airwrap-id/red-velvet-gold.webp",
    "price": 36990
   },
   {
    "name": "Prussian Blue/Rich Copper",
    "image": "/images/p/dyson-airwrap-id/prussian-blue-rich-copper.webp",
    "price": 38890
   },
   {
    "name": "Ceramic Pink/Rose Gold",
    "image": "/images/p/dyson-airwrap-id/ceramic-pink-rose-gold.webp",
    "price": 38890
   },
   {
    "name": "Jasper Plum",
    "image": "/images/p/dyson-airwrap-id/jasper-plum.webp",
    "price": 41790
   },
   {
    "name": "Vinca Blue/Topaz Orange",
    "image": "/images/p/dyson-airwrap-id/vinca-blue-topaz-orange.webp",
    "price": 41790
   },
   {
    "name": "Amber Silk",
    "image": "/images/p/dyson-airwrap-id/amber-silk.webp",
    "price": 41790
   },
   {
    "name": "Kanzan Pink",
    "image": "/images/p/dyson-airwrap-id/kanzan-pink.webp",
    "price": 49390
   }
  ],
  "specs": {
   "Вес, г": "611",
   "Размеры": "27,2 x 4,1 x 4,8 см",
   "Год релиза": "2026",
   "Тип волос": "волнистые, прямые",
   "Максимальный воздушный поток": "13,5 л/с",
   "Скорость вращения двигателя (об/мин)": "110000",
   "Мощность": "1300 Вт",
   "Серия": "HS08",
   "Индикация": "включения",
   "Мобильное приложение": "MyDyson",
   "Количество температурных режимов": "3",
   "Количество режимов": "3",
   "Функции": "ионизация, подача холодного воздуха, автоматическое вращение насадки"
  },
  "summary": "611 · 27,2 x 4,1 x 4,8 см · 2026",
  "inStock": true,
  "description": "Dyson Airwrap i.d.: вес, г — 611; размеры — 27,2 x 4,1 x 4,8 см; год релиза — 2026."
 },
 {
  "id": "dyson-supersonic-r",
  "name": "Dyson Supersonic r",
  "model": "Dyson Supersonic r",
  "variant": null,
  "storage": null,
  "family": "dyson-supersonic-r",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 32290,
  "image": "/images/p/dyson-supersonic-r/ceramic-pink-rose-gold.webp",
  "colors": [
   {
    "name": "Ceramic Pink/Rose Gold",
    "image": "/images/p/dyson-supersonic-r/ceramic-pink-rose-gold.webp"
   },
   {
    "name": "Ceramic Apricot/Topaz",
    "image": "/images/p/dyson-supersonic-r/ceramic-apricot-topaz.webp",
    "price": 33190
   },
   {
    "name": "Vinca Blue/Topaz Orange",
    "image": "/images/p/dyson-supersonic-r/vinca-blue-topaz-orange.webp",
    "price": 35090
   },
   {
    "name": "Red Velvet/Gold",
    "image": "/images/p/dyson-supersonic-r/red-velvet-gold.webp",
    "price": 36090
   },
   {
    "name": "Jasper Plum",
    "image": "/images/p/dyson-supersonic-r/jasper-plum.webp",
    "price": 36990
   },
   {
    "name": "Kanzan Pink",
    "image": "/images/p/dyson-supersonic-r/kanzan-pink.webp",
    "price": 38890
   }
  ],
  "specs": {
   "Год релиза": "2025",
   "Тип волос": "прямые, волнистые",
   "Серия": "HD17"
  },
  "summary": "2025 · прямые, волнистые · HD17",
  "inStock": true,
  "description": "Dyson Supersonic r: год релиза — 2025; тип волос — прямые, волнистые; серия — HD17."
 },
 {
  "id": "dyson-supersonic-nural",
  "name": "Dyson Supersonic Nural",
  "model": "Dyson Supersonic Nural",
  "variant": null,
  "storage": null,
  "family": "dyson-supersonic-nural",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 27490,
  "image": "/images/p/dyson-supersonic-nural/prussian-blue-rich-copper.webp",
  "colors": [
   {
    "name": "Prussian Blue/Rich Copper",
    "image": "/images/p/dyson-supersonic-nural/prussian-blue-rich-copper.webp"
   },
   {
    "name": "Ceramic Pink/Rose Gold",
    "image": "/images/p/dyson-supersonic-nural/ceramic-pink-rose-gold.webp"
   },
   {
    "name": "Ceramic Apricot/Topaz",
    "image": "/images/p/dyson-supersonic-nural/ceramic-apricot-topaz.webp",
    "price": 36990
   },
   {
    "name": "Jasper Plum",
    "image": "/images/p/dyson-supersonic-nural/jasper-plum.webp",
    "price": 39890
   },
   {
    "name": "Ceramic Patina/Topaz Orange",
    "image": "/images/p/dyson-supersonic-nural/ceramic-patina-topaz-orange.webp",
    "price": 40790
   },
   {
    "name": "Strawberry Bronze/Blush Pink",
    "image": "/images/p/dyson-supersonic-nural/strawberry-bronze-blush-pink.webp",
    "price": 42690
   },
   {
    "name": "Red Velvet/Gold",
    "image": "/images/p/dyson-supersonic-nural/red-velvet-gold.webp",
    "price": 43690
   },
   {
    "name": "Vinca Blue/Topaz Orange",
    "image": "/images/p/dyson-supersonic-nural/vinca-blue-topaz-orange.webp",
    "price": 45590
   },
   {
    "name": "Amber Silk",
    "image": "/images/p/dyson-supersonic-nural/amber-silk.webp",
    "price": 48390
   }
  ],
  "specs": {
   "Вес, г": "697",
   "Размеры": "9,7 х 24,5 х 7,8 см",
   "Год релиза": "2025",
   "Тип волос": "прямые, волнистые",
   "Мощность": "1600 Вт",
   "Серия": "HD16",
   "Максимальная температура нагрева": "100 °С",
   "Длина шнура": "1.8 м",
   "Мобильное приложение": "Нет",
   "Защита от перегрева": "есть",
   "Холодный воздух": "есть",
   "Количество режимов": "4 режима нагрева, 3 режима интенсивности воздушного потока",
   "Функции": "ионизация, независимая регулировка нагрева и воздушного потока",
   "Количество насадок": "5"
  },
  "summary": "697 · 9,7 х 24,5 х 7,8 см · 2025",
  "inStock": true,
  "description": "Dyson Supersonic Nural: вес, г — 697; размеры — 9,7 х 24,5 х 7,8 см; год релиза — 2025."
 },
 {
  "id": "dyson-airstrait",
  "name": "Dyson Airstrait",
  "model": "Dyson Airstrait",
  "variant": null,
  "storage": null,
  "family": "dyson-airstrait",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 27490,
  "image": "/images/p/dyson-airstrait/prussian-blue-rich-copper.webp",
  "colors": [
   {
    "name": "Prussian Blue/Rich Copper",
    "image": "/images/p/dyson-airstrait/prussian-blue-rich-copper.webp"
   },
   {
    "name": "Ceramic Pink/Rose Gold",
    "image": "/images/p/dyson-airstrait/ceramic-pink-rose-gold.webp",
    "price": 29390
   },
   {
    "name": "Ceramic Apricot/Topaz",
    "image": "/images/p/dyson-airstrait/ceramic-apricot-topaz.webp",
    "price": 34190
   },
   {
    "name": "Amber Silk",
    "image": "/images/p/dyson-airstrait/amber-silk.webp",
    "price": 35090
   },
   {
    "name": "Nickel/Copper",
    "image": "/images/p/dyson-airstrait/nickel-copper.webp",
    "price": 36090
   },
   {
    "name": "Onyx Black/Gold",
    "image": "/images/p/dyson-airstrait/onyx-black-gold.webp",
    "price": 41790
   },
   {
    "name": "Red Velvet/Gold",
    "image": "/images/p/dyson-airstrait/red-velvet-gold.webp",
    "price": 43690
   },
   {
    "name": "Strawberry Bronze/Blush Pink",
    "image": "/images/p/dyson-airstrait/strawberry-bronze-blush-pink.webp",
    "price": 45590
   }
  ],
  "specs": {
   "Тип экрана": "LCD",
   "Вес, г": "910",
   "Размеры": "33 x 6 x 4.1 см",
   "Год релиза": "2023",
   "Материал пластин": "керамика",
   "Мощность": "1600 Вт",
   "Серия": "HT01",
   "Максимальная температура нагрева": "140 °C",
   "Индикация": "включения, готовности к работе",
   "Мобильное приложение": "Нет",
   "Количество режимов": "3"
  },
  "summary": "LCD · 910 · 33 x 6 x 4.1 см",
  "inStock": true,
  "description": "Dyson Airstrait: тип экрана — LCD; вес, г — 910; размеры — 33 x 6 x 4.1 см."
 },
 {
  "id": "dyson-v16-piston-animal",
  "name": "Dyson V16 Piston Animal",
  "model": "Dyson V16 Piston Animal",
  "variant": null,
  "storage": null,
  "family": "dyson-v16",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 65490,
  "image": "/images/p/dyson-v16/copper-black.webp",
  "colors": [
   {
    "name": "Copper/Black",
    "image": "/images/p/dyson-v16/copper-black.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "ABS пластик, поликарбонат",
   "Вес, г": "3400",
   "Размеры": "129,8 x 25,9 x 25 см",
   "Мощность всасывания Вт": "315",
   "Отсоединяемый ручной пылесос": "да",
   "Серия": "V16",
   "Индикация": "зарядки аккумулятора, перегрева, разрядки аккумулятора, режима работы, степени зарядки",
   "Беспроводные модули": "Bluetooth",
   "Мобильное приложение": "MyDyson",
   "ЖК-экран": "есть",
   "Подсветка зоны уборки": "да",
   "Уборка": "сухая",
   "Пылесборник": "1,3 л",
   "Время работы (минуты)": "70"
  },
  "summary": "ABS пластик, поликарбонат · 3400 · 129,8 x 25,9 x 25 см",
  "inStock": true,
  "description": "Dyson V16 Piston Animal: материал корпуса — ABS пластик, поликарбонат; вес, г — 3400; размеры — 129,8 x 25,9 x 25 см."
 },
 {
  "id": "dyson-v15-detect",
  "name": "Dyson V15 Detect",
  "model": "Dyson V15 Detect",
  "variant": null,
  "storage": null,
  "family": "dyson-v15",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 55990,
  "image": "/images/p/dyson-v15/yellow-nickel.webp",
  "colors": [
   {
    "name": "Yellow/Nickel",
    "image": "/images/p/dyson-v15/yellow-nickel.webp"
   }
  ],
  "specs": {
   "Вес, г": "3008",
   "Размеры": "126,4 x 25.2 x 25 см",
   "Мощность всасывания Вт": "240",
   "Отсоединяемый ручной пылесос": "да",
   "Уровень шума": "89 дБ",
   "Серия": "V15",
   "Фильтр": "HEPA",
   "Мобильное приложение": "MyDyson",
   "Подсветка зоны уборки": "да",
   "Уборка": "сухая",
   "Пылесборник": "0.76 л",
   "Количество режимов": "3",
   "Время работы (минуты)": "60",
   "Аккумуляторный": "да"
  },
  "summary": "3008 · 126,4 x 25.2 x 25 см · 240",
  "inStock": true,
  "description": "Dyson V15 Detect: вес, г — 3008; размеры — 126,4 x 25.2 x 25 см; мощность всасывания Вт — 240."
 },
 {
  "id": "dyson-pencilvac",
  "name": "Dyson PencilVac",
  "model": "Dyson PencilVac",
  "variant": null,
  "storage": null,
  "family": "dyson-pencilvac",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 40790,
  "image": "/images/p/dyson-pencilvac/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/dyson-pencilvac/chernyy.webp"
   }
  ],
  "specs": {
   "Вес, г": "1800",
   "Размеры": "116 x 22.6 x 3.8 см",
   "Мощность всасывания Вт": "55",
   "Отсоединяемый ручной пылесос": "нет",
   "Серия": "Pencilvac",
   "Мобильное приложение": "MyDyson",
   "Подсветка зоны уборки": "да",
   "Уборка": "сухая",
   "Пылесборник": "0,08 Л",
   "Время работы (минуты)": "25"
  },
  "summary": "1800 · 116 x 22.6 x 3.8 см · 55",
  "inStock": true,
  "description": "Dyson PencilVac: вес, г — 1800; размеры — 116 x 22.6 x 3.8 см; мощность всасывания Вт — 55."
 },
 {
  "id": "dyson-tp11-purifier-cool-pc1-de-nox",
  "name": "Dyson TP11 Purifier Cool PC1 De-NOx",
  "model": "Dyson TP11 Purifier Cool PC1 De-NOx",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 38890,
  "image": "/images/p/dyson-purifier/white-white.webp",
  "colors": [
   {
    "name": "White/White",
    "image": "/images/p/dyson-purifier/white-white.webp"
   },
   {
    "name": "Black/Nikel",
    "image": "/images/p/dyson-purifier/black-nikel.webp",
    "price": 41790
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson TP11 Purifier Cool PC1 De-NOx: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-tp10",
  "name": "Dyson TP10",
  "model": "Dyson TP10",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 39890,
  "image": "/images/p/dyson-purifier/white-white.webp",
  "colors": [
   {
    "name": "White/White",
    "image": "/images/p/dyson-purifier/white-white.webp"
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson TP10: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-tp12-purifier-cool-pc2-de-nox",
  "name": "Dyson TP12 Purifier Cool PC2 De-NOx",
  "model": "Dyson TP12 Purifier Cool PC2 De-NOx",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 45590,
  "image": "/images/p/dyson-purifier/white-gold.webp",
  "colors": [
   {
    "name": "White/Gold",
    "image": "/images/p/dyson-purifier/white-gold.webp"
   },
   {
    "name": "Nickel/Gold",
    "image": "/images/p/dyson-purifier/nickel-gold.webp",
    "price": 48390
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson TP12 Purifier Cool PC2 De-NOx: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-hp11-purifier-hot-plus-cool",
  "name": "Dyson HP11 Purifier Hot + Cool",
  "model": "Dyson HP11 Purifier Hot + Cool",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 64590,
  "image": "/images/p/dyson-purifier/white-white.webp",
  "colors": [
   {
    "name": "White/White",
    "image": "/images/p/dyson-purifier/white-white.webp"
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson HP11 Purifier Hot + Cool: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-bp03-purifier-big-plus-quiet-formaldehyde",
  "name": "Dyson BP03 Purifier Big+Quiet Formaldehyde",
  "model": "Dyson BP03 Purifier Big+Quiet Formaldehyde",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 81690,
  "image": "/images/p/dyson-purifier/nickel-blue.webp",
  "colors": [
   {
    "name": "Nickel/Blue",
    "image": "/images/p/dyson-purifier/nickel-blue.webp"
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson BP03 Purifier Big+Quiet Formaldehyde: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-bp04-purifier-big-plus-quiet-formaldehyde",
  "name": "Dyson BP04 Purifier Big + Quiet Formaldehyde",
  "model": "Dyson BP04 Purifier Big + Quiet Formaldehyde",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 86390,
  "image": "/images/p/dyson-purifier/prussian-blue-gold.webp",
  "colors": [
   {
    "name": "Prussian Blue/Gold",
    "image": "/images/p/dyson-purifier/prussian-blue-gold.webp"
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson BP04 Purifier Big + Quiet Formaldehyde: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dyson-bp06-hepa-big-and-quiet-formaldehyde",
  "name": "Dyson BP06 HEPA Big and Quiet Formaldehyde",
  "model": "Dyson BP06 HEPA Big and Quiet Formaldehyde",
  "variant": null,
  "storage": null,
  "family": "dyson-purifier",
  "brand": "Dyson",
  "category": "Для дома",
  "price": 91190,
  "image": "/images/p/dyson-purifier/white-silver.webp",
  "colors": [
   {
    "name": "White/Silver",
    "image": "/images/p/dyson-purifier/white-silver.webp"
   }
  ],
  "specs": {
   "Экран": "Есть",
   "Материал корпуса": "Пластик",
   "Вес, г": "4850",
   "Количество скоростей": "10",
   "Уровень шума": "61.5 дБ",
   "Серия": "TP12",
   "Установка": "Напольный",
   "Пульт ДУ": "есть",
   "Индикация": "есть",
   "Источник питания": "От сети"
  },
  "summary": "Пластик · 4850 · 10",
  "inStock": true,
  "description": "Dyson BP06 HEPA Big and Quiet Formaldehyde: материал корпуса — Пластик; вес, г — 4850; количество скоростей — 10."
 },
 {
  "id": "dreame-l50s-pro-ultra",
  "name": "Dreame L50s Pro Ultra",
  "model": "Dreame L50s Pro Ultra",
  "variant": null,
  "storage": null,
  "family": "dreame-l50s",
  "brand": "Dreame",
  "category": "Для дома",
  "price": 69290,
  "image": "/images/p/dreame-l50s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/dreame-l50s/main.webp"
   }
  ],
  "specs": {
   "Ёмкость аккумулятора": "5200 мАч",
   "Время работы": "170 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "4040",
   "Размеры": "35×35×10,4 см",
   "Давление": "30000 Па",
   "Мощность всасывания Вт": "75",
   "Навигация": "LiDAR",
   "Тип контейнера": "для пыли",
   "Уровень шума": "75 дБ",
   "Боковая щетка": "есть",
   "Мягкий бампер": "есть",
   "Мобильное приложение": "Dreamehome",
   "Емкость бака для воды/моющего средства": "0,08 л"
  },
  "summary": "5200 мАч · 170 мин · Пластик",
  "inStock": true,
  "description": "Dreame L50s Pro Ultra: ёмкость аккумулятора — 5200 мАч; время работы — 170 мин; материал корпуса — Пластик."
 },
 {
  "id": "dreame-z40-aqua-cycle-pro",
  "name": "Dreame Z40 Aqua Cycle Pro",
  "model": "Dreame Z40 Aqua Cycle Pro",
  "variant": null,
  "storage": null,
  "family": "dreame-z40",
  "brand": "Dreame",
  "category": "Для дома",
  "price": 52190,
  "image": "/images/p/dreame-z40/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/dreame-z40/main.webp"
   }
  ],
  "specs": {
   "Ёмкость аккумулятора": "2850 мАч",
   "Время работы": "90 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "1500",
   "Размеры": "128,8х32х32 см",
   "Дисплей": "да",
   "Мощность всасывания Вт": "150",
   "Давление": "30000 Па",
   "Отсоединяемый ручной пылесос": "да",
   "Уровень шума": "84 дБ",
   "Тип фильтра": "предварительной очистки, циклонный, НЕРА-фильтр",
   "Мобильное приложение": "Нет",
   "Подсветка зоны уборки": "да",
   "Уборка": "сухая и влажная"
  },
  "summary": "2850 мАч · 90 мин · Пластик",
  "inStock": true,
  "description": "Dreame Z40 Aqua Cycle Pro: ёмкость аккумулятора — 2850 мАч; время работы — 90 мин; материал корпуса — Пластик."
 },
 {
  "id": "dreame-x60-ultra-complete",
  "name": "Dreame X60 Ultra Complete",
  "model": "Dreame X60 Ultra Complete",
  "variant": null,
  "storage": null,
  "family": "dreame-x60",
  "brand": "Dreame",
  "category": "Для дома",
  "price": 114890,
  "image": "/images/p/dreame-x60/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/dreame-x60/main.webp"
   }
  ],
  "specs": {
   "Ёмкость аккумулятора": "6400 мАч",
   "Время работы": "165 мин",
   "Материал корпуса": "Пластик",
   "Вес, г": "4700",
   "Размеры": "35х35х7,95 см",
   "Давление": "35000 Па",
   "Мощность всасывания Вт": "75",
   "Навигация": "LiDAR, оптическая навигация",
   "Тип контейнера": "для пыли",
   "Уровень шума": "70 Дб",
   "Боковая щетка": "есть",
   "Мягкий бампер": "есть",
   "Мобильное приложение": "Dreamehome",
   "Емкость бака для воды/моющего средства": "0,08 л"
  },
  "summary": "6400 мАч · 165 мин · Пластик",
  "inStock": true,
  "description": "Dreame X60 Ultra Complete: ёмкость аккумулятора — 6400 мАч; время работы — 165 мин; материал корпуса — Пластик."
 },
 {
  "id": "ochistitel-vozduha-xiaomi-smart-air-purifier-6-eu-global-bhr08mzeu-ac-m25-sc",
  "name": "Очиститель воздуха Xiaomi Smart Air Purifier 6 EU / Global (BHR08MZEU, AC-M25-SC)",
  "model": "Очиститель воздуха Xiaomi Smart Air Purifier 6",
  "variant": "EU / Global (BHR08MZEU, AC-M25-SC)",
  "storage": null,
  "family": "xiaomi-air-purifier-6",
  "brand": "Xiaomi",
  "category": "Для дома",
  "price": 19490,
  "image": "/images/p/xiaomi-air-purifier-6/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/xiaomi-air-purifier-6/belyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "EU / Global (BHR08MZEU, AC-M25-SC)",
   "cadr": "443 м³/ч по частицам",
   "area": "до 50 м²",
   "sensors": "PM1, PM2.5, пыль, температура, влажность",
   "filter": "пятислойный, с активированным углём; УФ-подсветка"
  },
  "summary": "443 м³/ч по частицам · до 50 м²",
  "inStock": true,
  "description": "Умный очиститель воздуха Xiaomi для комнаты до 50 м² с пятью датчиками качества воздуха и управлением со смартфона. Угольный слой убирает запахи и формальдегид, фильтр задерживает пыльцу и шерсть животных."
 },
 {
  "id": "nastolnaya-lampa-xiaomi-led-desk-lamp-2-global-bhr9186gl-mjtd06yl",
  "name": "Настольная лампа Xiaomi LED Desk Lamp 2 Global (BHR9186GL / MJTD06YL)",
  "model": "Настольная лампа Xiaomi LED Desk Lamp 2",
  "variant": "Global (BHR9186GL / MJTD06YL)",
  "storage": null,
  "family": "xiaomi-desk-lamp-2",
  "brand": "Xiaomi",
  "category": "Для дома",
  "price": 5390,
  "image": "/images/p/xiaomi-desk-lamp-2/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/xiaomi-desk-lamp-2/belyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Global (BHR9186GL / MJTD06YL)",
   "head": "горизонтальная 60 см, свет вперёд, 112 светодиодов",
   "cri": "Ra95",
   "color_temp": "2700–5100 K",
   "smart": "поддержка Google Assistant и Alexa (по данным mi.com)"
  },
  "summary": "Ra95 · 2700–5100 K",
  "inStock": true,
  "description": "Настольная лампа Xiaomi с широкой горизонтальной головой: освещает весь стол и нависает над ноутбуком. Яркость и температура света меняются сенсорным слайдером, есть управление голосовыми ассистентами."
 },
 {
  "id": "samsung-oled-s95h-65-qe65s95h",
  "name": "Samsung OLED S95H 65\" (QE65S95H)",
  "model": "Samsung OLED S95H",
  "variant": "65\" (QE65S95H)",
  "storage": null,
  "family": "samsung-s95h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 246990,
  "image": "/images/p/samsung-s95h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-s95h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (QE65S95H)",
   "panel": "OLED, Glare Free (подтверждено UL)",
   "resolution": "4K",
   "processor": "NQ4 AI Gen3",
   "refresh": "100 Гц, VRR до 165 Гц"
  },
  "summary": "4K · NQ4 AI Gen3 · 100 Гц, VRR до 165 Гц",
  "inStock": true,
  "description": "Флагманский OLED-телевизор Samsung 2026 года с новым дизайном FloatLayer и антибликовым экраном Glare Free. Есть размеры 55, 65, 77 и 83 дюйма."
 },
 {
  "id": "samsung-oled-s95h-77-qe77s95h",
  "name": "Samsung OLED S95H 77\" (QE77S95H)",
  "model": "Samsung OLED S95H",
  "variant": "77\" (QE77S95H)",
  "storage": null,
  "family": "samsung-s95h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 367290,
  "image": "/images/p/samsung-s95h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-s95h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "77\" (QE77S95H)",
   "panel": "OLED, Glare Free (подтверждено UL)",
   "resolution": "4K",
   "processor": "NQ4 AI Gen3",
   "refresh": "100 Гц, VRR до 165 Гц"
  },
  "summary": "4K · NQ4 AI Gen3 · 100 Гц, VRR до 165 Гц",
  "inStock": true,
  "description": "Флагманский OLED-телевизор Samsung 2026 года с новым дизайном FloatLayer и антибликовым экраном Glare Free. Есть размеры 55, 65, 77 и 83 дюйма."
 },
 {
  "id": "lg-oled-evo-g6-55-oled55g6rla",
  "name": "LG OLED evo G6 55\" (OLED55G6RLA)",
  "model": "LG OLED evo G6",
  "variant": "55\" (OLED55G6RLA)",
  "storage": null,
  "family": "lg-g6",
  "brand": "LG",
  "category": "Телевизоры",
  "price": 151890,
  "image": "/images/p/lg-g6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/lg-g6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (OLED55G6RLA)",
   "panel": "OLED evo, Brightness Booster Ultra",
   "resolution": "4K",
   "processor": "α11 AI Processor Gen3",
   "refresh": "до 165 Гц; покрытие Reflection Free Premium"
  },
  "summary": "4K · α11 AI Processor Gen3",
  "inStock": true,
  "description": "Флагманская OLED-серия LG 2026 года: ярче C6 и с антибликовым покрытием Reflection Free Premium. Рассчитана на крепление к стене вплотную."
 },
 {
  "id": "lg-oled-evo-g6-65-oled65g6rla",
  "name": "LG OLED evo G6 65\" (OLED65G6RLA)",
  "model": "LG OLED evo G6",
  "variant": "65\" (OLED65G6RLA)",
  "storage": null,
  "family": "lg-g6",
  "brand": "LG",
  "category": "Телевизоры",
  "price": 206090,
  "image": "/images/p/lg-g6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/lg-g6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (OLED65G6RLA)",
   "panel": "OLED evo, Brightness Booster Ultra",
   "resolution": "4K",
   "processor": "α11 AI Processor Gen3",
   "refresh": "до 165 Гц; покрытие Reflection Free Premium"
  },
  "summary": "4K · α11 AI Processor Gen3",
  "inStock": true,
  "description": "Флагманская OLED-серия LG 2026 года: ярче C6 и с антибликовым покрытием Reflection Free Premium. Рассчитана на крепление к стене вплотную."
 },
 {
  "id": "samsung-neo-qled-qn80h-55-qe55qn80h",
  "name": "Samsung Neo QLED QN80H 55\" (QE55QN80H)",
  "model": "Samsung Neo QLED QN80H",
  "variant": "55\" (QE55QN80H)",
  "storage": null,
  "family": "samsung-qn80h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 92890,
  "image": "/images/p/samsung-qn80h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-qn80h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (QE55QN80H)",
   "panel": "Neo QLED (Quantum Mini LED), VA",
   "resolution": "4K",
   "processor": "NQ4 AI Gen2",
   "refresh": "до 144 Гц"
  },
  "summary": "4K · NQ4 AI Gen2 · до 144 Гц",
  "inStock": true,
  "description": "Mini LED-телевизор Samsung 2026 года — верхняя модель 4K Neo QLED в новой линейке. Над ним Samsung поставила уже телевизоры Micro RGB."
 },
 {
  "id": "samsung-neo-qled-qn80h-65-qe65qn80h",
  "name": "Samsung Neo QLED QN80H 65\" (QE65QN80H)",
  "model": "Samsung Neo QLED QN80H",
  "variant": "65\" (QE65QN80H)",
  "storage": null,
  "family": "samsung-qn80h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 112590,
  "image": "/images/p/samsung-qn80h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-qn80h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (QE65QN80H)",
   "panel": "Neo QLED (Quantum Mini LED), VA",
   "resolution": "4K",
   "processor": "NQ4 AI Gen2",
   "refresh": "до 144 Гц"
  },
  "summary": "4K · NQ4 AI Gen2 · до 144 Гц",
  "inStock": true,
  "description": "Mini LED-телевизор Samsung 2026 года — верхняя модель 4K Neo QLED в новой линейке. Над ним Samsung поставила уже телевизоры Micro RGB."
 },
 {
  "id": "samsung-oled-s90h-55-qe55s90h",
  "name": "Samsung OLED S90H 55\" (QE55S90H)",
  "model": "Samsung OLED S90H",
  "variant": "55\" (QE55S90H)",
  "storage": null,
  "family": "samsung-s90h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 139190,
  "image": "/images/p/samsung-s90h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-s90h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (QE55S90H)",
   "panel": "OLED, Glare Free",
   "resolution": "4K",
   "processor": "NQ4 AI Gen3",
   "refresh": "до 165 Гц (Motion Xcelerator)"
  },
  "summary": "OLED, Glare Free · 4K · NQ4 AI Gen3",
  "inStock": true,
  "description": "Средний OLED-телевизор Samsung 2026 года; в этом поколении получил антибликовое покрытие Glare Free. Выпускается в размерах от 42 до 83 дюймов."
 },
 {
  "id": "samsung-oled-s90h-65-qe65s90h",
  "name": "Samsung OLED S90H 65\" (QE65S90H)",
  "model": "Samsung OLED S90H",
  "variant": "65\" (QE65S90H)",
  "storage": null,
  "family": "samsung-s90h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 189990,
  "image": "/images/p/samsung-s90h/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-s90h/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (QE65S90H)",
   "panel": "OLED, Glare Free",
   "resolution": "4K",
   "processor": "NQ4 AI Gen3",
   "refresh": "до 165 Гц (Motion Xcelerator)"
  },
  "summary": "OLED, Glare Free · 4K · NQ4 AI Gen3",
  "inStock": true,
  "description": "Средний OLED-телевизор Samsung 2026 года; в этом поколении получил антибликовое покрытие Glare Free. Выпускается в размерах от 42 до 83 дюймов."
 },
 {
  "id": "lg-oled-evo-c6-55-oled55c6rla",
  "name": "LG OLED evo C6 55\" (OLED55C6RLA)",
  "model": "LG OLED evo C6",
  "variant": "55\" (OLED55C6RLA)",
  "storage": null,
  "family": "lg-c6",
  "brand": "LG",
  "category": "Телевизоры",
  "price": 115890,
  "image": "/images/p/lg-c6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/lg-c6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (OLED55C6RLA)",
   "panel": "OLED evo",
   "resolution": "4K",
   "processor": "α11 AI Processor Gen3",
   "refresh": "до 165 Гц"
  },
  "summary": "OLED evo · 4K · α11 AI Processor Gen3",
  "inStock": true,
  "description": "Самая популярная OLED-серия LG, поколение 2026 года, с процессором α11 AI Gen3 и частотой до 165 Гц для ПК и консолей. Главный конкурент Samsung S90H."
 },
 {
  "id": "lg-oled-evo-c6-65-oled65c6rla",
  "name": "LG OLED evo C6 65\" (OLED65C6RLA)",
  "model": "LG OLED evo C6",
  "variant": "65\" (OLED65C6RLA)",
  "storage": null,
  "family": "lg-c6",
  "brand": "LG",
  "category": "Телевизоры",
  "price": 154790,
  "image": "/images/p/lg-c6/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/lg-c6/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (OLED65C6RLA)",
   "panel": "OLED evo",
   "resolution": "4K",
   "processor": "α11 AI Processor Gen3",
   "refresh": "до 165 Гц"
  },
  "summary": "OLED evo · 4K · α11 AI Processor Gen3",
  "inStock": true,
  "description": "Самая популярная OLED-серия LG, поколение 2026 года, с процессором α11 AI Gen3 и частотой до 165 Гц для ПК и консолей. Главный конкурент Samsung S90H."
 },
 {
  "id": "sony-bravia-7-ii-55-k-55xr75m2",
  "name": "Sony BRAVIA 7 II 55\" (K-55XR75M2)",
  "model": "Sony BRAVIA 7 II",
  "variant": "55\" (K-55XR75M2)",
  "storage": null,
  "family": "sony-bravia-7-ii",
  "brand": "Sony",
  "category": "Телевизоры",
  "price": 180490,
  "image": "/images/p/sony-bravia-7-ii/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-bravia-7-ii/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (K-55XR75M2)",
   "panel": "True RGB: подсветка из RGB-светодиодов (RGB LED)",
   "resolution": "4K",
   "processor": "XR Processor с AI",
   "os": "Google TV"
  },
  "summary": "4K · XR Processor с AI · Google TV",
  "inStock": true,
  "description": "Новый телевизор Sony 2026 года с подсветкой True RGB: красные, зелёные и синие светодиоды управляются по отдельности. Заменяет BRAVIA 7 2024 года, размеры от 50 до 98 дюймов."
 },
 {
  "id": "sony-bravia-7-ii-65-k-65xr75m2",
  "name": "Sony BRAVIA 7 II 65\" (K-65XR75M2)",
  "model": "Sony BRAVIA 7 II",
  "variant": "65\" (K-65XR75M2)",
  "storage": null,
  "family": "sony-bravia-7-ii",
  "brand": "Sony",
  "category": "Телевизоры",
  "price": 201390,
  "image": "/images/p/sony-bravia-7-ii/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-bravia-7-ii/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (K-65XR75M2)",
   "panel": "True RGB: подсветка из RGB-светодиодов (RGB LED)",
   "resolution": "4K",
   "processor": "XR Processor с AI",
   "os": "Google TV"
  },
  "summary": "4K · XR Processor с AI · Google TV",
  "inStock": true,
  "description": "Новый телевизор Sony 2026 года с подсветкой True RGB: красные, зелёные и синие светодиоды управляются по отдельности. Заменяет BRAVIA 7 2024 года, размеры от 50 до 98 дюймов."
 },
 {
  "id": "sony-bravia-8-ii-55-k-55xr80m2-k-55xr8m2",
  "name": "Sony BRAVIA 8 II 55\" (K-55XR80M2 / K-55XR8M2)",
  "model": "Sony BRAVIA 8 II",
  "variant": "55\" (K-55XR80M2 / K-55XR8M2)",
  "storage": null,
  "family": "sony-bravia-8-ii",
  "brand": "Sony",
  "category": "Телевизоры",
  "price": 187790,
  "image": "/images/p/sony-bravia-8-ii/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-bravia-8-ii/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (K-55XR80M2 / K-55XR8M2)",
   "panel": "QD-OLED",
   "resolution": "4K",
   "processor": "XR Processor",
   "os": "Google TV"
  },
  "summary": "QD-OLED · 4K · XR Processor",
  "inStock": true,
  "description": "OLED-флагман Sony на панели QD-OLED; в 2026 году он остаётся основной OLED-моделью Sony. Выпускается в размерах 55 и 65 дюймов."
 },
 {
  "id": "sony-bravia-8-ii-65-k-65xr80m2-k-65xr8m2",
  "name": "Sony BRAVIA 8 II 65\" (K-65XR80M2 / K-65XR8M2)",
  "model": "Sony BRAVIA 8 II",
  "variant": "65\" (K-65XR80M2 / K-65XR8M2)",
  "storage": null,
  "family": "sony-bravia-8-ii",
  "brand": "Sony",
  "category": "Телевизоры",
  "price": 239290,
  "image": "/images/p/sony-bravia-8-ii/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/sony-bravia-8-ii/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (K-65XR80M2 / K-65XR8M2)",
   "panel": "QD-OLED",
   "resolution": "4K",
   "processor": "XR Processor",
   "os": "Google TV"
  },
  "summary": "QD-OLED · 4K · XR Processor",
  "inStock": true,
  "description": "OLED-флагман Sony на панели QD-OLED; в 2026 году он остаётся основной OLED-моделью Sony. Выпускается в размерах 55 и 65 дюймов."
 },
 {
  "id": "tcl-c8l-mini-led-55-55c8l",
  "name": "TCL C8L Mini LED 55\" (55C8L)",
  "model": "TCL C8L Mini LED",
  "variant": "55\" (55C8L)",
  "storage": null,
  "family": "tcl-c8l",
  "brand": "TCL",
  "category": "Телевизоры",
  "price": 85190,
  "image": "/images/p/tcl-c8l/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/tcl-c8l/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (55C8L)",
   "panel": "SQD Mini LED (QLED), HVA",
   "resolution": "4K",
   "brightness": "до 6000 нит (у 65\" — 5000)",
   "refresh": "144 Гц, игровой режим 288 Гц VRR"
  },
  "summary": "SQD Mini LED (QLED), HVA · 4K · до 6000 нит (у 65\" — 5000)",
  "inStock": true,
  "description": "Mini LED-телевизор TCL 2026 года на новой технологии SQD (Super Quantum Dot) с частотой 144 Гц. TCL официально продаёт его в России, в 55\" стоит более простая матрица HVA 2.0."
 },
 {
  "id": "tcl-c8l-mini-led-65-65c8l",
  "name": "TCL C8L Mini LED 65\" (65C8L)",
  "model": "TCL C8L Mini LED",
  "variant": "65\" (65C8L)",
  "storage": null,
  "family": "tcl-c8l",
  "brand": "TCL",
  "category": "Телевизоры",
  "price": 131090,
  "image": "/images/p/tcl-c8l/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/tcl-c8l/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (65C8L)",
   "panel": "SQD Mini LED (QLED), HVA",
   "resolution": "4K",
   "brightness": "до 6000 нит (у 65\" — 5000)",
   "refresh": "144 Гц, игровой режим 288 Гц VRR"
  },
  "summary": "SQD Mini LED (QLED), HVA · 4K · до 6000 нит (у 65\" — 5000)",
  "inStock": true,
  "description": "Mini LED-телевизор TCL 2026 года на новой технологии SQD (Super Quantum Dot) с частотой 144 Гц. TCL официально продаёт его в России, в 55\" стоит более простая матрица HVA 2.0."
 },
 {
  "id": "tcl-c7l-mini-led-55-55c7l",
  "name": "TCL C7L Mini LED 55\" (55C7L)",
  "model": "TCL C7L Mini LED",
  "variant": "55\" (55C7L)",
  "storage": null,
  "family": "tcl-c7l",
  "brand": "TCL",
  "category": "Телевизоры",
  "price": 72090,
  "image": "/images/p/tcl-c7l/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/tcl-c7l/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (55C7L)",
   "panel": "SQD Mini LED (QLED), HVA",
   "resolution": "4K",
   "sizes": "55–98\"",
   "os": "Google TV"
  },
  "summary": "SQD Mini LED (QLED), HVA · 4K · 55–98\"",
  "inStock": true,
  "description": "Более доступная серия TCL 2026 года, тоже на SQD Mini LED. Дешевле C8L на 14–35 тыс. ₽ при той же диагонали."
 },
 {
  "id": "tcl-c7l-mini-led-65-65c7l",
  "name": "TCL C7L Mini LED 65\" (65C7L)",
  "model": "TCL C7L Mini LED",
  "variant": "65\" (65C7L)",
  "storage": null,
  "family": "tcl-c7l",
  "brand": "TCL",
  "category": "Телевизоры",
  "price": 97590,
  "image": "/images/p/tcl-c7l/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/tcl-c7l/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (65C7L)",
   "panel": "SQD Mini LED (QLED), HVA",
   "resolution": "4K",
   "sizes": "55–98\"",
   "os": "Google TV"
  },
  "summary": "SQD Mini LED (QLED), HVA · 4K · 55–98\"",
  "inStock": true,
  "description": "Более доступная серия TCL 2026 года, тоже на SQD Mini LED. Дешевле C8L на 14–35 тыс. ₽ при той же диагонали."
 },
 {
  "id": "hisense-u7s-mini-led-55-55u7s",
  "name": "Hisense U7S Mini LED 55\" (55U7S)",
  "model": "Hisense U7S Mini LED",
  "variant": "55\" (55U7S)",
  "storage": null,
  "family": "hisense-u7s",
  "brand": "Hisense",
  "category": "Телевизоры",
  "price": 51290,
  "image": "/images/p/hisense-u7s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/hisense-u7s/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (55U7S)",
   "panel": "Mini LED (Hi-QLED)",
   "resolution": "4K",
   "brightness": "1400 нит",
   "refresh": "игровой режим 144 Гц"
  },
  "summary": "Mini LED (Hi-QLED) · 4K · 1400 нит",
  "inStock": true,
  "description": "Массовый Mini LED-телевизор Hisense 2026 года (индекс S означает 2026 год). Hisense продаёт его в России официально, это один из самых доступных Mini LED на 55–65 дюймов."
 },
 {
  "id": "hisense-u7s-mini-led-65-65u7s",
  "name": "Hisense U7S Mini LED 65\" (65U7S)",
  "model": "Hisense U7S Mini LED",
  "variant": "65\" (65U7S)",
  "storage": null,
  "family": "hisense-u7s",
  "brand": "Hisense",
  "category": "Телевизоры",
  "price": 77290,
  "image": "/images/p/hisense-u7s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/hisense-u7s/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (65U7S)",
   "panel": "Mini LED (Hi-QLED)",
   "resolution": "4K",
   "brightness": "1400 нит",
   "refresh": "игровой режим 144 Гц"
  },
  "summary": "Mini LED (Hi-QLED) · 4K · 1400 нит",
  "inStock": true,
  "description": "Массовый Mini LED-телевизор Hisense 2026 года (индекс S означает 2026 год). Hisense продаёт его в России официально, это один из самых доступных Mini LED на 55–65 дюймов."
 },
 {
  "id": "hisense-ur8s-rgb-mini-led-55-55ur8s",
  "name": "Hisense UR8S RGB Mini LED 55\" (55UR8S)",
  "model": "Hisense UR8S RGB Mini LED",
  "variant": "55\" (55UR8S)",
  "storage": null,
  "family": "hisense-ur8s",
  "brand": "Hisense",
  "category": "Телевизоры",
  "price": 73990,
  "image": "/images/p/hisense-ur8s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/hisense-ur8s/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "55\" (55UR8S)",
   "panel": "RGB Mini LED",
   "resolution": "4K",
   "brightness": "3500 нит",
   "refresh": "игровой режим 180 Гц"
  },
  "summary": "RGB Mini LED · 4K · 3500 нит",
  "inStock": true,
  "description": "Телевизор Hisense 2026 года с подсветкой RGB Mini LED и процессором Hi-View AI Engine RGB. Ступень ниже флагмана UR9S, размеры от 55 до 100 дюймов."
 },
 {
  "id": "hisense-ur8s-rgb-mini-led-65-65ur8s",
  "name": "Hisense UR8S RGB Mini LED 65\" (65UR8S)",
  "model": "Hisense UR8S RGB Mini LED",
  "variant": "65\" (65UR8S)",
  "storage": null,
  "family": "hisense-ur8s",
  "brand": "Hisense",
  "category": "Телевизоры",
  "price": 99190,
  "image": "/images/p/hisense-ur8s/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/hisense-ur8s/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "65\" (65UR8S)",
   "panel": "RGB Mini LED",
   "resolution": "4K",
   "brightness": "3500 нит",
   "refresh": "игровой режим 180 Гц"
  },
  "summary": "RGB Mini LED · 4K · 3500 нит",
  "inStock": true,
  "description": "Телевизор Hisense 2026 года с подсветкой RGB Mini LED и процессором Hi-View AI Engine RGB. Ступень ниже флагмана UR9S, размеры от 55 до 100 дюймов."
 },
 {
  "id": "saundbar-samsung-hw-q990h-hw-q930h-9-1-4",
  "name": "Саундбар Samsung HW-Q990H HW-Q930H (9.1.4)",
  "model": "Саундбар Samsung HW-Q990H",
  "variant": "HW-Q930H (9.1.4)",
  "storage": null,
  "family": "samsung-hw-q990h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 69990,
  "image": "/images/p/samsung-hw-q990h/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/samsung-hw-q990h/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "HW-Q930H (9.1.4)",
   "channels": "11.1.4",
   "set": "саундбар + сабвуфер + 2 тыловые колонки",
   "audio": "Dolby Atmos, DTS:X",
   "features": "Q-Symphony с ТВ Samsung"
  },
  "summary": "11.1.4 · Dolby Atmos, DTS:X · Q-Symphony с ТВ Samsung",
  "inStock": true,
  "description": "Флагманский саундбар Samsung 2026 года — полный комплект для домашнего кино с тыловыми колонками и сабвуфером. Сменил прошлогодний HW-Q990F."
 },
 {
  "id": "saundbar-samsung-hw-q990h-hw-q990h-11-1-4",
  "name": "Саундбар Samsung HW-Q990H HW-Q990H (11.1.4)",
  "model": "Саундбар Samsung HW-Q990H",
  "variant": "HW-Q990H (11.1.4)",
  "storage": null,
  "family": "samsung-hw-q990h",
  "brand": "Samsung",
  "category": "Телевизоры",
  "price": 93390,
  "image": "/images/p/samsung-hw-q990h/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/samsung-hw-q990h/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "HW-Q990H (11.1.4)",
   "channels": "11.1.4",
   "set": "саундбар + сабвуфер + 2 тыловые колонки",
   "audio": "Dolby Atmos, DTS:X",
   "features": "Q-Symphony с ТВ Samsung"
  },
  "summary": "11.1.4 · Dolby Atmos, DTS:X · Q-Symphony с ТВ Samsung",
  "inStock": true,
  "description": "Флагманский саундбар Samsung 2026 года — полный комплект для домашнего кино с тыловыми колонками и сабвуфером. Сменил прошлогодний HW-Q990F."
 },
 {
  "id": "airtag-2-go-pokoleniya-1-sht",
  "name": "AirTag (2-го поколения) 1 шт.",
  "model": "AirTag (2-го поколения)",
  "variant": "1 шт.",
  "storage": null,
  "family": "airtag-2",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 3790,
  "image": "/images/p/airtag-2/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/airtag-2/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "1 шт.",
   "Вес, г": "11",
   "Размеры": "3,19 x 3,19 x 0,8 см",
   "Рекомендовано": "iPhone (iOS 26 или новее), iPad (iPadOS 26 или новее)",
   "Класс защиты": "IP67",
   "Защита от воды": "да",
   "Интерфейсы": "Bluetooth, NFC",
   "Динамик": "есть",
   "Источник питания": "Батарейка CR2032",
   "Датчики": "акселерометр"
  },
  "summary": "11 · 3,19 x 3,19 x 0,8 см · IP67",
  "inStock": true,
  "description": "AirTag (2-го поколения): вес, г — 11; размеры — 3,19 x 3,19 x 0,8 см; рекомендовано — iPhone (iOS 26 или новее), iPad (iPadOS 26 или новее)."
 },
 {
  "id": "airtag-2-go-pokoleniya-4-sht",
  "name": "AirTag (2-го поколения) 4 шт.",
  "model": "AirTag (2-го поколения)",
  "variant": "4 шт.",
  "storage": null,
  "family": "airtag-2",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 9890,
  "image": "/images/p/airtag-2/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/airtag-2/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "4 шт.",
   "Вес, г": "11",
   "Размеры": "3,19 x 3,19 x 0,8 см",
   "Рекомендовано": "iPhone (iOS 26 или новее), iPad (iPadOS 26 или новее)",
   "Класс защиты": "IP67",
   "Защита от воды": "да",
   "Интерфейсы": "Bluetooth, NFC",
   "Динамик": "есть",
   "Источник питания": "Батарейка CR2032",
   "Датчики": "акселерометр"
  },
  "summary": "11 · 3,19 x 3,19 x 0,8 см · IP67",
  "inStock": true,
  "description": "AirTag (2-го поколения): вес, г — 11; размеры — 3,19 x 3,19 x 0,8 см; рекомендовано — iPhone (iOS 26 или новее), iPad (iPadOS 26 или новее)."
 },
 {
  "id": "zaryadnoe-ustroystvo-magsafe-qi2-2-1-m",
  "name": "Зарядное устройство MagSafe (Qi2.2) 1 м",
  "model": "Зарядное устройство MagSafe (Qi2.2)",
  "variant": "1 м",
  "storage": null,
  "family": "magsafe-charger",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 5690,
  "image": "/images/p/magsafe-charger/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/magsafe-charger/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "1 м",
   "Материал корпуса": "Алюминий, пластик",
   "Поддержка MagSafe": "да",
   "Рекомендовано": "для iPhone c поддержкой MagSafe, AirPods с поддержкой беспроводной зарядки",
   "Суммарная мощность (Вт)": "25",
   "Одновременная зарядка нескольких устройств": "нет",
   "Длина провода (см)": "200",
   "Защита от перегрева": "есть",
   "Защита от перепада напряжения": "есть",
   "Защита от перегрузки": "есть",
   "Защита от короткого замыкания": "есть",
   "Защита от перенапряжения": "есть",
   "Выходные параметры Qi": "5W/7.5W/15W/25W",
   "Разъемы": "встроенный кабель USB-C",
   "Параметры входа": "20 Вт (для выходной мощности до 15 Вт); 30 Вт (для выходной мощности до 25 Вт)"
  },
  "summary": "Алюминий, пластик · 25 · 200",
  "inStock": true,
  "description": "Зарядное устройство MagSafe (Qi2.2): материал корпуса — Алюминий, пластик; рекомендовано — для iPhone c поддержкой MagSafe, AirPods с поддержкой беспроводной зарядки; суммарная мощность (Вт) — 25."
 },
 {
  "id": "zaryadnoe-ustroystvo-magsafe-qi2-2-2-m",
  "name": "Зарядное устройство MagSafe (Qi2.2) 2 м",
  "model": "Зарядное устройство MagSafe (Qi2.2)",
  "variant": "2 м",
  "storage": null,
  "family": "magsafe-charger",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 6090,
  "image": "/images/p/magsafe-charger/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/magsafe-charger/main.webp"
   }
  ],
  "specs": {
   "Конфигурация": "2 м",
   "Материал корпуса": "Алюминий, пластик",
   "Поддержка MagSafe": "да",
   "Рекомендовано": "для iPhone c поддержкой MagSafe, AirPods с поддержкой беспроводной зарядки",
   "Суммарная мощность (Вт)": "25",
   "Одновременная зарядка нескольких устройств": "нет",
   "Длина провода (см)": "200",
   "Защита от перегрева": "есть",
   "Защита от перепада напряжения": "есть",
   "Защита от перегрузки": "есть",
   "Защита от короткого замыкания": "есть",
   "Защита от перенапряжения": "есть",
   "Выходные параметры Qi": "5W/7.5W/15W/25W",
   "Разъемы": "встроенный кабель USB-C",
   "Параметры входа": "20 Вт (для выходной мощности до 15 Вт); 30 Вт (для выходной мощности до 25 Вт)"
  },
  "summary": "Алюминий, пластик · 25 · 200",
  "inStock": true,
  "description": "Зарядное устройство MagSafe (Qi2.2): материал корпуса — Алюминий, пластик; рекомендовано — для iPhone c поддержкой MagSafe, AirPods с поддержкой беспроводной зарядки; суммарная мощность (Вт) — 25."
 },
 {
  "id": "apple-moschnostyu-35-vt-2-usb-c",
  "name": "Apple мощностью 35 Вт (2 USB-C)",
  "model": "Apple мощностью 35 Вт (2 USB-C)",
  "variant": null,
  "storage": null,
  "family": "apple-35w",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 7090,
  "image": "/images/p/apple-35w/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/apple-35w/main.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Пластик",
   "Кабель в комплекте": "нет",
   "Количество портов": "2",
   "Тип вилки": "встроенная US",
   "Поддержка быстрой зарядки": "да",
   "Суммарная мощность (Вт)": "35",
   "Одновременная зарядка нескольких устройств": "да",
   "Защита от перегрева": "есть",
   "Защита от перепада напряжения": "есть",
   "Защита от перегрузки": "есть",
   "Защита от короткого замыкания": "есть",
   "Защита от перенапряжения": "есть",
   "Тип портов": "USB‑C",
   "Разъемы": "2 x USB-C"
  },
  "summary": "Пластик · 2 · встроенная US",
  "inStock": true,
  "description": "Apple мощностью 35 Вт (2 USB-C): материал корпуса — Пластик; количество портов — 2; тип вилки — встроенная US."
 },
 {
  "id": "apple-compact-moschnostyu-35-vt-2-usb-c",
  "name": "Apple Compact мощностью 35 Вт (2 USB-C)",
  "model": "Apple Compact мощностью 35 Вт (2 USB-C)",
  "variant": null,
  "storage": null,
  "family": "apple-35w",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 7590,
  "image": "/images/p/apple-35w/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/apple-35w/main.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Пластик",
   "Кабель в комплекте": "нет",
   "Количество портов": "2",
   "Тип вилки": "встроенная US",
   "Поддержка быстрой зарядки": "да",
   "Суммарная мощность (Вт)": "35",
   "Одновременная зарядка нескольких устройств": "да",
   "Защита от перегрева": "есть",
   "Защита от перепада напряжения": "есть",
   "Защита от перегрузки": "есть",
   "Защита от короткого замыкания": "есть",
   "Защита от перенапряжения": "есть",
   "Тип портов": "USB‑C",
   "Разъемы": "2 x USB-C"
  },
  "summary": "Пластик · 2 · встроенная US",
  "inStock": true,
  "description": "Apple Compact мощностью 35 Вт (2 USB-C): материал корпуса — Пластик; количество портов — 2; тип вилки — встроенная US."
 },
 {
  "id": "setevoe-zaryadnoe-ustroystvo-apple-20-vt-usb-c",
  "name": "Сетевое зарядное устройство Apple 20 Вт (USB-C)",
  "model": "Сетевое зарядное устройство Apple 20 Вт (USB-C)",
  "variant": null,
  "storage": null,
  "family": "apple-20w",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 2790,
  "image": "/images/p/apple-20w/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/apple-20w/main.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Пластик",
   "Кабель в комплекте": "нет",
   "Количество портов": "1",
   "Тип вилки": "встроенная EU",
   "Поддержка быстрой зарядки": "да",
   "Рекомендовано": "Все модели iPhone, iPad, AirPods и Apple Watch",
   "Суммарная мощность (Вт)": "20",
   "Одновременная зарядка нескольких устройств": "нет",
   "Защита от перегрева": "есть",
   "Защита от перепада напряжения": "есть",
   "Защита от перегрузки": "есть",
   "Защита от короткого замыкания": "есть",
   "Защита от перенапряжения": "есть",
   "Тип портов": "USB‑C"
  },
  "summary": "Пластик · 1 · встроенная EU",
  "inStock": true,
  "description": "Сетевое зарядное устройство Apple 20 Вт (USB-C): материал корпуса — Пластик; количество портов — 1; тип вилки — встроенная EU."
 },
 {
  "id": "apple-magic-keyboard-s-touch-id-usb-c",
  "name": "Apple Magic Keyboard с Touch ID (USB-C)",
  "model": "Apple Magic Keyboard с Touch ID (USB-C)",
  "variant": null,
  "storage": null,
  "family": "magic-keyboard-touch-id",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 17090,
  "image": "/images/p/magic-keyboard-touch-id/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/magic-keyboard-touch-id/belyy.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Алюминий",
   "Вес, г": "369",
   "Размеры": "41,87 x 11,49 x 1,09 cм",
   "Рекомендовано": "Компьютеры Mac c процессором Apple silicon (M1 и новее) и macOS 15.1 или новее",
   "Регулировка наклона": "Нет",
   "Подключение": "Bluetooth, USB-C",
   "Подсветка клавиш": "Нет",
   "Разъем питания": "USB-C",
   "Дополнительно": "Сканер отпечатка пальца"
  },
  "summary": "Алюминий · 369 · 41,87 x 11,49 x 1,09 cм",
  "inStock": true,
  "description": "Apple Magic Keyboard с Touch ID (USB-C): материал корпуса — Алюминий; вес, г — 369; размеры — 41,87 x 11,49 x 1,09 cм."
 },
 {
  "id": "apple-magic-keyboard-s-touch-id-i-cifrovoy-panelyu-usb-c",
  "name": "Apple Magic Keyboard с Touch ID и цифровой панелью (USB-C)",
  "model": "Apple Magic Keyboard с Touch ID и цифровой панелью (USB-C)",
  "variant": null,
  "storage": null,
  "family": "magic-keyboard-touch-id",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 17990,
  "image": "/images/p/magic-keyboard-touch-id/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/magic-keyboard-touch-id/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/magic-keyboard-touch-id/chernyy.webp",
    "price": 20890
   }
  ],
  "specs": {
   "Материал корпуса": "Алюминий",
   "Вес, г": "369",
   "Размеры": "41,87 x 11,49 x 1,09 cм",
   "Рекомендовано": "Компьютеры Mac c процессором Apple silicon (M1 и новее) и macOS 15.1 или новее",
   "Регулировка наклона": "Нет",
   "Подключение": "Bluetooth, USB-C",
   "Подсветка клавиш": "Нет",
   "Разъем питания": "USB-C",
   "Дополнительно": "Сканер отпечатка пальца"
  },
  "summary": "Алюминий · 369 · 41,87 x 11,49 x 1,09 cм",
  "inStock": true,
  "description": "Apple Magic Keyboard с Touch ID и цифровой панелью (USB-C): материал корпуса — Алюминий; вес, г — 369; размеры — 41,87 x 11,49 x 1,09 cм."
 },
 {
  "id": "magic-mouse-usb-c-usb-c",
  "name": "Magic Mouse (USB-C) USB-C",
  "model": "Magic Mouse (USB-C)",
  "variant": "USB-C",
  "storage": null,
  "family": "magic-mouse",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 8490,
  "image": "/images/p/magic-mouse/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/magic-mouse/belyy.webp"
   },
   {
    "name": "Чёрный",
    "image": "/images/p/magic-mouse/chernyy.webp",
    "price": 10390
   }
  ],
  "specs": {
   "Конфигурация": "USB-C",
   "Время работы": "до 45 дней",
   "Материал корпуса": "Алюминий, стекло",
   "Вес, г": "99",
   "Размеры": "11,35 x 2,16 x 5,71 см",
   "Рекомендовано": "Mac с macOS 15.1 или новее; iPad с iPad OS 18.1 или новее",
   "Тип": "Мышь",
   "Количество кнопок": "1 (с определением правой и левой стороны)",
   "Дополнительные кнопки": "нет",
   "Программируемые кнопки": "нет",
   "Подключение": "Bluetooth",
   "Питание": "Встроенный аккумулятор",
   "Разъем питания": "USB-C",
   "Время зарядки": "2 ч",
   "Дополнительно": "Поддержка жестов"
  },
  "summary": "до 45 дней · Алюминий, стекло · 99",
  "inStock": true,
  "description": "Magic Mouse (USB-C): время работы — до 45 дней; материал корпуса — Алюминий, стекло; вес, г — 99."
 },
 {
  "id": "apple-pencil-pro",
  "name": "Apple Pencil Pro",
  "model": "Apple Pencil Pro",
  "variant": null,
  "storage": null,
  "family": "apple-pencil-pro",
  "brand": "Apple",
  "category": "Аксессуары",
  "price": 12290,
  "image": "/images/p/apple-pencil-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/apple-pencil-pro/main.webp"
   }
  ],
  "specs": {
   "Материал корпуса": "Пластик",
   "Вес, г": "19,15",
   "Размеры": "16,6 x 0,89 x 0,89 см",
   "Сменный наконечник": "да",
   "Тип наконечника": "острый",
   "Совместимость с ОС": "iPad OS",
   "Тип устройства": "Стилус",
   "Поддержка платформ": "iPadOS",
   "Тип": "активный стилус",
   "Подключение": "Bluetooth",
   "Тип элементов питания": "встроенный",
   "Питание": "аккумулятор",
   "Функция беспроводной зарядки": "магнитная зарядка от iPad"
  },
  "summary": "Пластик · 19,15 · 16,6 x 0,89 x 0,89 см",
  "inStock": true,
  "description": "Apple Pencil Pro: материал корпуса — Пластик; вес, г — 19,15; размеры — 16,6 x 0,89 x 0,89 см."
 },
 {
  "id": "monitor-lg-ultragear-27gx790a-27",
  "name": "Монитор LG UltraGear 27GX790A 27\"",
  "model": "Монитор LG UltraGear 27GX790A",
  "variant": "27\"",
  "storage": null,
  "family": "lg-27gx790a",
  "brand": "LG",
  "category": "Аксессуары",
  "price": 87390,
  "image": "/images/p/lg-27gx790a/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/lg-27gx790a/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "27\"",
   "display": "27\" OLED 2560×1440",
   "refresh": "480 Гц",
   "response": "0,03 мс",
   "brightness": "275 кд/м² (типовая)"
  },
  "summary": "27\" OLED 2560×1440 · 480 Гц · 0,03 мс",
  "inStock": true,
  "description": "Игровой OLED-монитор LG на 27 дюймов с разрешением QHD и частотой 480 Гц. Подходит для соревновательных игр, где важна скорость."
 },
 {
  "id": "monitor-samsung-odyssey-oled-g6-27",
  "name": "Монитор Samsung Odyssey OLED G6 27\"",
  "model": "Монитор Samsung Odyssey OLED G6",
  "variant": "27\"",
  "storage": null,
  "family": "samsung-odyssey-g6",
  "brand": "Samsung",
  "category": "Аксессуары",
  "price": 74590,
  "image": "/images/p/samsung-odyssey-g6/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/samsung-odyssey-g6/serebristyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "27\"",
   "display": "27\" QD-OLED 2560×1440",
   "refresh": "500 Гц",
   "response": "0,03 мс",
   "hdr": "VESA DisplayHDR True Black 500, Glare Free"
  },
  "summary": "27\" QD-OLED 2560×1440 · 500 Гц · 0,03 мс",
  "inStock": true,
  "description": "27-дюймовый игровой монитор Samsung на QD-OLED с частотой 500 Гц: Samsung называет его первым в мире OLED-монитором на 500 Гц. Матовое антибликовое покрытие."
 },
 {
  "id": "monitor-dell-ultrasharp-27-4k-u2725qe-27",
  "name": "Монитор Dell UltraSharp 27 4K U2725QE 27\"",
  "model": "Монитор Dell UltraSharp 27 4K U2725QE",
  "variant": "27\"",
  "storage": null,
  "family": "dell-u2725qe",
  "brand": "Dell",
  "category": "Аксессуары",
  "price": 73290,
  "image": "/images/p/dell-u2725qe/serebristyy.webp",
  "colors": [
   {
    "name": "Серебристый",
    "image": "/images/p/dell-u2725qe/serebristyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "27\"",
   "display": "27\" IPS 3840×2160",
   "refresh": "120 Гц",
   "brightness": "450 кд/м²",
   "use": "для работы и дизайна"
  },
  "summary": "27\" IPS 3840×2160 · 120 Гц · 450 кд/м²",
  "inStock": true,
  "description": "Рабочий 4K-монитор Dell серии UltraSharp с IPS-матрицей и частотой 120 Гц. Подходит для офиса, дизайна и работы с документами."
 },
 {
  "id": "anker-prime-power-bank-prime-20k-220-vt-a110b",
  "name": "Anker Prime Power Bank Prime 20K, 220 Вт (A110B)",
  "model": "Anker Prime Power Bank",
  "variant": "Prime 20K, 220 Вт (A110B)",
  "storage": null,
  "family": "anker-prime-power-bank",
  "brand": "Anker",
  "category": "Аксессуары",
  "price": 12990,
  "image": "/images/p/anker-prime-power-bank/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/anker-prime-power-bank/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Prime 20K, 220 Вт (A110B)",
   "capacity": "26 250 мА·ч",
   "power": "до 300 Вт суммарно, до 140 Вт на порт",
   "ports": "2× USB-C + USB-A",
   "display": "цветной экран, управление в приложении"
  },
  "summary": "26 250 мА·ч · 2× USB-C + USB-A",
  "inStock": true,
  "description": "Мощный внешний аккумулятор Anker, который заряжает ноутбук и телефон одновременно. Можно взять в самолёт (менее 100 Вт·ч)."
 },
 {
  "id": "anker-prime-power-bank-26k-300-vt-a110a",
  "name": "Anker Prime Power Bank 26K, 300 Вт (A110A)",
  "model": "Anker Prime Power Bank",
  "variant": "26K, 300 Вт (A110A)",
  "storage": null,
  "family": "anker-prime-power-bank",
  "brand": "Anker",
  "category": "Аксессуары",
  "price": 19390,
  "image": "/images/p/anker-prime-power-bank/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/anker-prime-power-bank/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "26K, 300 Вт (A110A)",
   "capacity": "26 250 мА·ч",
   "power": "до 300 Вт суммарно, до 140 Вт на порт",
   "ports": "2× USB-C + USB-A",
   "display": "цветной экран, управление в приложении"
  },
  "summary": "26 250 мА·ч · 2× USB-C + USB-A",
  "inStock": true,
  "description": "Мощный внешний аккумулятор Anker, который заряжает ноутбук и телефон одновременно. Можно взять в самолёт (менее 100 Вт·ч)."
 },
 {
  "id": "anker-nano-charger-45-vt-smart-display",
  "name": "Anker Nano Charger 45 Вт Smart Display",
  "model": "Anker Nano Charger",
  "variant": "45 Вт Smart Display",
  "storage": null,
  "family": "anker-nano-charger",
  "brand": "Anker",
  "category": "Аксессуары",
  "price": 2990,
  "image": "/images/p/anker-nano-charger/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/anker-nano-charger/belyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "45 Вт Smart Display",
   "power": "45 Вт",
   "port": "1× USB-C",
   "display": "экран с мощностью и температурой",
   "plug": "складная вилка"
  },
  "summary": "45 Вт · 1× USB-C · складная вилка",
  "inStock": true,
  "description": "Компактная зарядка Anker на 45 Вт с маленьким экраном: показывает, с какой мощностью идёт зарядка. Хватает для быстрой зарядки iPhone, Samsung и планшета."
 },
 {
  "id": "anker-nano-charger-nano-70-vt-2c1a-a121a",
  "name": "Anker Nano Charger Nano 70 Вт, 2C1A (A121A)",
  "model": "Anker Nano Charger",
  "variant": "Nano 70 Вт, 2C1A (A121A)",
  "storage": null,
  "family": "anker-nano-charger",
  "brand": "Anker",
  "category": "Аксессуары",
  "price": 3690,
  "image": "/images/p/anker-nano-charger/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/anker-nano-charger/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Nano 70 Вт, 2C1A (A121A)",
   "power": "45 Вт",
   "port": "1× USB-C",
   "display": "экран с мощностью и температурой",
   "plug": "складная вилка"
  },
  "summary": "45 Вт · 1× USB-C · складная вилка",
  "inStock": true,
  "description": "Компактная зарядка Anker на 45 Вт с маленьким экраном: показывает, с какой мощностью идёт зарядка. Хватает для быстрой зарядки iPhone, Samsung и планшета."
 },
 {
  "id": "ssd-samsung-990-evo-plus-1-tb-mz-v9s1t0bw",
  "name": "SSD Samsung 990 EVO Plus 1 ТБ (MZ-V9S1T0BW)",
  "model": "SSD Samsung 990 EVO Plus",
  "variant": "1 ТБ (MZ-V9S1T0BW)",
  "storage": "1 ТБ",
  "family": "samsung-990-evo-plus",
  "brand": "Samsung",
  "category": "Аксессуары",
  "price": 22990,
  "image": "/images/p/samsung-990-evo-plus/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-990-evo-plus/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ (MZ-V9S1T0BW)",
   "interface": "PCIe 4.0 x4 / 5.0 x2, NVMe",
   "speed": "до 7 250 МБ/с",
   "form": "M.2 2280",
   "capacity": "1 / 2 / 4 ТБ"
  },
  "summary": "PCIe 4.0 x4 / 5.0 x2, NVMe · до 7 250 МБ/с · M.2 2280",
  "inStock": true,
  "description": "Самый ходовой SSD Samsung для ПК, ноутбука и PS5: быстрый, без радиатора, со средней ценой. Сменил 970 EVO Plus и 980."
 },
 {
  "id": "ssd-samsung-990-evo-plus-2-tb-mz-v9s2t0bw",
  "name": "SSD Samsung 990 EVO Plus 2 ТБ (MZ-V9S2T0BW)",
  "model": "SSD Samsung 990 EVO Plus",
  "variant": "2 ТБ (MZ-V9S2T0BW)",
  "storage": "2 ТБ",
  "family": "samsung-990-evo-plus",
  "brand": "Samsung",
  "category": "Аксессуары",
  "price": 33190,
  "image": "/images/p/samsung-990-evo-plus/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-990-evo-plus/main.webp"
   }
  ],
  "specs": {
   "Память": "2 ТБ (MZ-V9S2T0BW)",
   "interface": "PCIe 4.0 x4 / 5.0 x2, NVMe",
   "speed": "до 7 250 МБ/с",
   "form": "M.2 2280",
   "capacity": "1 / 2 / 4 ТБ"
  },
  "summary": "PCIe 4.0 x4 / 5.0 x2, NVMe · до 7 250 МБ/с · M.2 2280",
  "inStock": true,
  "description": "Самый ходовой SSD Samsung для ПК, ноутбука и PS5: быстрый, без радиатора, со средней ценой. Сменил 970 EVO Plus и 980."
 },
 {
  "id": "ssd-samsung-9100-pro-1-tb-mz-vap1t0bw",
  "name": "SSD Samsung 9100 PRO 1 ТБ (MZ-VAP1T0BW)",
  "model": "SSD Samsung 9100 PRO",
  "variant": "1 ТБ (MZ-VAP1T0BW)",
  "storage": "1 ТБ",
  "family": "samsung-9100-pro",
  "brand": "Samsung",
  "category": "Аксессуары",
  "price": 25190,
  "image": "/images/p/samsung-9100-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-9100-pro/main.webp"
   }
  ],
  "specs": {
   "Память": "1 ТБ (MZ-VAP1T0BW)",
   "interface": "PCIe 5.0 x4, NVMe",
   "speed": "до 14 700 МБ/с",
   "form": "M.2 2280 (есть версия с радиатором)",
   "capacity": "1 / 2 / 4 / 8 ТБ"
  },
  "summary": "PCIe 5.0 x4, NVMe · до 14 700 МБ/с · 1 / 2 / 4 / 8 ТБ",
  "inStock": true,
  "description": "Флагманский SSD Samsung на PCIe 5.0, почти вдвое быстрее 990 PRO. Для мощных игровых ПК и работы с видео."
 },
 {
  "id": "ssd-samsung-9100-pro-2-tb-mz-vap2t0bw",
  "name": "SSD Samsung 9100 PRO 2 ТБ (MZ-VAP2T0BW)",
  "model": "SSD Samsung 9100 PRO",
  "variant": "2 ТБ (MZ-VAP2T0BW)",
  "storage": "2 ТБ",
  "family": "samsung-9100-pro",
  "brand": "Samsung",
  "category": "Аксессуары",
  "price": 47090,
  "image": "/images/p/samsung-9100-pro/main.webp",
  "colors": [
   {
    "name": "",
    "image": "/images/p/samsung-9100-pro/main.webp"
   }
  ],
  "specs": {
   "Память": "2 ТБ (MZ-VAP2T0BW)",
   "interface": "PCIe 5.0 x4, NVMe",
   "speed": "до 14 700 МБ/с",
   "form": "M.2 2280 (есть версия с радиатором)",
   "capacity": "1 / 2 / 4 / 8 ТБ"
  },
  "summary": "PCIe 5.0 x4, NVMe · до 14 700 МБ/с · 1 / 2 / 4 / 8 ТБ",
  "inStock": true,
  "description": "Флагманский SSD Samsung на PCIe 5.0, почти вдвое быстрее 990 PRO. Для мощных игровых ПК и работы с видео."
 },
 {
  "id": "router-tp-link-archer-be550-wi-fi-7-archer-be550",
  "name": "Роутер TP-Link Archer BE550 (Wi-Fi 7) Archer BE550",
  "model": "Роутер TP-Link Archer BE550 (Wi-Fi 7)",
  "variant": "Archer BE550",
  "storage": null,
  "family": "tp-link-be550",
  "brand": "TP-Link",
  "category": "Аксессуары",
  "price": 21190,
  "image": "/images/p/tp-link-be550/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/tp-link-be550/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "Archer BE550",
   "wifi": "Wi-Fi 7, BE9300, три диапазона",
   "ports": "5× 2,5 Гбит/с",
   "usb": "USB 3.0",
   "mesh": "EasyMesh"
  },
  "summary": "5× 2,5 Гбит/с · USB 3.0 · EasyMesh",
  "inStock": true,
  "description": "Домашний роутер Wi-Fi 7 средней цены со всеми портами на 2,5 Гбит/с. Подходит для гигабитного интернета и большой квартиры."
 },
 {
  "id": "router-asus-rt-be58u-wi-fi-7-rt-be58u",
  "name": "Роутер ASUS RT-BE58U (Wi-Fi 7) RT-BE58U",
  "model": "Роутер ASUS RT-BE58U (Wi-Fi 7)",
  "variant": "RT-BE58U",
  "storage": null,
  "family": "asus-rt-be58u",
  "brand": "ASUS",
  "category": "Аксессуары",
  "price": 10590,
  "image": "/images/p/asus-rt-be58u/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/asus-rt-be58u/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "RT-BE58U",
   "wifi": "Wi-Fi 7, BE3600, два диапазона",
   "ports": "WAN/LAN 2,5 Гбит/с + 3× 1 Гбит/с",
   "mesh": "AiMesh",
   "usb": "USB 3.0"
  },
  "summary": "AiMesh · USB 3.0",
  "inStock": true,
  "description": "Доступный роутер ASUS с Wi-Fi 7 и поддержкой AiMesh: можно объединить с другими роутерами ASUS в одну сеть. Хороший вариант для обычной квартиры."
 },
 {
  "id": "klaviatura-keychron-k8-max-k8-max-rgb-hot-swap",
  "name": "Клавиатура Keychron K8 Max K8 Max, RGB, hot-swap",
  "model": "Клавиатура Keychron K8 Max",
  "variant": "K8 Max, RGB, hot-swap",
  "storage": null,
  "family": "keychron-k8-max",
  "brand": "Keychron",
  "category": "Аксессуары",
  "price": 14490,
  "image": "/images/p/keychron-k8-max/chernyy.webp",
  "colors": [
   {
    "name": "Чёрный",
    "image": "/images/p/keychron-k8-max/chernyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "K8 Max, RGB, hot-swap",
   "layout": "TKL, 87 клавиш",
   "connection": "2,4 ГГц, Bluetooth 5.1, USB-C",
   "switches": "Gateron / Keychron, hot-swap",
   "backlight": "RGB, алюминиевая рамка"
  },
  "summary": "TKL, 87 клавиш · Gateron / Keychron, hot-swap · RGB, алюминиевая рамка",
  "inStock": true,
  "description": "Механическая клавиатура без цифрового блока: работает по проводу, Bluetooth и радиоканалу, переключатели меняются без пайки. Есть раскладка для Mac и Windows."
 },
 {
  "id": "chehol-spigen-ultra-hybrid-magfit-dlya-iphone-18-pro-max-iphone-18-pro-max-17-pro-max",
  "name": "Чехол Spigen Ultra Hybrid MagFit для iPhone 18 Pro Max iPhone 18 Pro Max / 17 Pro Max",
  "model": "Чехол Spigen Ultra Hybrid MagFit для iPhone 18 Pro Max",
  "variant": "iPhone 18 Pro Max / 17 Pro Max",
  "storage": null,
  "family": "spigen-ultra-hybrid-18pm",
  "brand": "Spigen",
  "category": "Аксессуары",
  "price": 3290,
  "image": "/images/p/spigen-ultra-hybrid-18pm/clear-white.webp",
  "colors": [
   {
    "name": "Clear White",
    "image": "/images/p/spigen-ultra-hybrid-18pm/clear-white.webp"
   }
  ],
  "specs": {
   "Конфигурация": "iPhone 18 Pro Max / 17 Pro Max",
   "compatibility": "iPhone 18 Pro Max и iPhone 17 Pro Max (одна модель чехла, артикулы совпадают)",
   "type": "прозрачный, жёсткая спинка + мягкий бампер",
   "magsafe": "встроенное магнитное кольцо MagFit"
  },
  "summary": "",
  "inStock": true,
  "description": "Самый популярный прозрачный чехол Spigen: не скрывает цвет iPhone и держит MagSafe-аксессуары встроенным магнитом. Есть петли для ремешка внизу."
 },
 {
  "id": "podstavka-zaryadka-belkin-ultracharge-2-v-1-qi2-25-vt-wiz039-eu",
  "name": "Подставка-зарядка Belkin UltraCharge 2-в-1 Qi2 25 Вт WIZ039, EU",
  "model": "Подставка-зарядка Belkin UltraCharge 2-в-1 Qi2 25 Вт",
  "variant": "WIZ039, EU",
  "storage": null,
  "family": "belkin-ultracharge",
  "brand": "Belkin",
  "category": "Аксессуары",
  "price": 8490,
  "image": "/images/p/belkin-ultracharge/belyy.webp",
  "colors": [
   {
    "name": "Белый",
    "image": "/images/p/belkin-ultracharge/belyy.webp"
   }
  ],
  "specs": {
   "Конфигурация": "WIZ039, EU",
   "type": "складная магнитная подставка с зарядкой для iPhone + площадка для AirPods",
   "power": "до 25 Вт (Qi2.2)",
   "modes": "телефон можно ставить вертикально и горизонтально",
   "compatibility": "iPhone с MagSafe"
  },
  "summary": "до 25 Вт (Qi2.2) · iPhone с MagSafe",
  "inStock": true,
  "description": "Компактная складная подставка Belkin: магнитом держит iPhone на нужном угле и заряжает его вместе с наушниками. Подходит и для стола, и для поездок."
 }
]
