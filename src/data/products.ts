export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  specs: Record<string, string>;
  inStock: boolean;
  description: string;
}

export const products: Product[] = [
  // iPhone 15 Series
  
  { id: 'iph15pm256w', name: 'iPhone 15 Pro Max 256GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'Флагман Apple с чипом A17 Pro и титановым корпусом White Titanium. Камера 48 Мп с 5x зумом, USB-C, дисплей 6.7".' },
  { id: 'iph15pm256n', name: 'iPhone 15 Pro Max 256GB Natural Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'Natural Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro Max в цвете Natural Titanium. Чип A17 Pro, камера 48 Мп с оптическим зумом 5x, дисплей 6.7" ProMotion.' },
  
  { id: 'iph15pm512w', name: 'iPhone 15 Pro Max 512GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 179900, image: '📱', specs: { storage: '512GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro Max 512 ГБ для фото и видео. Чип A17 Pro, ProRes видео, камера 48 Мп, титановый корпус.' },
  
  { id: 'iph15p256b', name: 'iPhone 15 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'Компактный флагман Apple с чипом A17 Pro и дисплеем 6.1". Камера 48 Мп, Action Button, титановый корпус.' },
  { id: 'iph15p512b', name: 'iPhone 15 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro 512 ГБ — больше места для ProRes видео. Чип A17 Pro, камера 48 Мп, Always-On дисплей.' },
  { id: 'iph15p1tb', name: 'iPhone 15 Pro 1TB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '1TB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: false, description: 'Максимальная версия iPhone 15 Pro с 1 ТБ хранилища. Для профессиональной фото- и видеосъёмки в ProRes.' },

  // iPhone 14 Series
  { id: 'iph14pm256b', name: 'iPhone 14 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный iPhone 14 Pro Max с чипом A16 Bionic и Dynamic Island. Камера 48 Мп, Always-On дисплей 6.7".' },
  { id: 'iph14pm512b', name: 'iPhone 14 Pro Max 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro Max 512 ГБ с чипом A16 Bionic. Идеален для съёмки ProRes видео и хранения медиа.' },
  { id: 'iph14p256b', name: 'iPhone 14 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro с чипом A16 Bionic и дисплеем 6.1". Dynamic Island, камера 48 Мп, Always-On экран.' },
  { id: 'iph14p512b', name: 'iPhone 14 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro 512 ГБ — расширенное хранилище для фото и видео. Чип A16 Bionic, камера 48 Мп.' },

  // iPhone 13 Series
  
  
  
  { id: 'iph12pm256b', name: 'iPhone 12 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A14 Bionic' }, inStock: true, description: 'iPhone 12 Pro Max с чипом A14 Bionic и системой Pro-камер. Дисплей 6.7", поддержка 5G, Ceramic Shield.' },
  { id: 'iph12p256b', name: 'iPhone 12 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A14 Bionic' }, inStock: true, description: 'Компактный iPhone 12 Pro с чипом A14 Bionic и дисплеем 6.1". Тройная камера Pro, LiDAR сканер.' },

  // Samsung Galaxy S25 Series
  { id: 'sgts25u256b', name: 'Samsung Galaxy S25 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Samsung Galaxy S25 Ultra с Snapdragon 8 Elite и камерой 200 Мп. S Pen, Galaxy AI, дисплей 6.9" AMOLED.' },
  { id: 'sgts25u512b', name: 'Samsung Galaxy S25 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 Ultra 512 ГБ для профессионалов. Snapdragon 8 Elite, камера 200 Мп, S Pen, Galaxy AI.' },
  { id: 'sgts25u256t', name: 'Samsung Galaxy S25 Ultra 256GB Titanium', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Titanium', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 Ultra в премиальном цвете Titanium. Snapdragon 8 Elite, S Pen, камера 200 Мп с ИИ-обработкой.' },
  { id: 'sgts25p256b', name: 'Samsung Galaxy S25+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Samsung Galaxy S25+ с Snapdragon 8 Elite и дисплеем 6.7". Galaxy AI, камера 50 Мп, зарядка 45W.' },
  { id: 'sgts25p512b', name: 'Samsung Galaxy S25+ 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25+ 512 ГБ — больше места для контента. Snapdragon 8 Elite, Galaxy AI, экран 6.7" Dynamic AMOLED.' },
  { id: 'sgts25256b', name: 'Samsung Galaxy S25 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Компактный Samsung Galaxy S25 с дисплеем 6.2". Snapdragon 8 Elite, Galaxy AI, отличная камера 50 Мп.' },
  { id: 'sgts25512b', name: 'Samsung Galaxy S25 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 512 ГБ — компактный флагман с большим хранилищем. Snapdragon 8 Elite, Galaxy AI.' },

  // Samsung Galaxy S24 Series
  { id: 'sgts24u256b', name: 'Samsung Galaxy S24 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Samsung Galaxy S24 Ultra с Snapdragon 8 Gen 3 и камерой 200 Мп. S Pen, Galaxy AI, титановый корпус.' },
  { id: 'sgts24u512b', name: 'Samsung Galaxy S24 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Galaxy S24 Ultra 512 ГБ с максимальным объёмом памяти. Snapdragon 8 Gen 3, S Pen, камера 200 Мп.' },
  { id: 'sgts24p256b', name: 'Samsung Galaxy S24+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Флагман Samsung с Snapdragon 8 Gen 3 и улучшенной камерой. Galaxy AI функции, быстрая зарядка 45W.' },
  { id: 'sgts24256b', name: 'Samsung Galaxy S24 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Производительный смартфон Samsung с Snapdragon 8 Gen 3. Galaxy AI функции, отличная база для большинства пользователей.' },

  // Samsung Galaxy S23 Series
  { id: 'sgts23u256b', name: 'Samsung Galaxy S23 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Премиальный флагман Samsung с Snapdragon 8 Gen 2 и мощной камерой 200 Мп. S Pen и функции Galaxy AI.' },
  { id: 'sgts23p256b', name: 'Samsung Galaxy S23+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.6"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Смартфон Samsung с Snapdragon 8 Gen 2, отличной камерой и поддержкой S Pen. Надежный выбор для требовательных пользователей.' },
  { id: 'sgts23256b', name: 'Samsung Galaxy S23 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Стабильный смартфон Samsung с Snapdragon 8 Gen 2 и хорошей камерой. Отличное соотношение цены и производительности.' },

  // Samsung Galaxy Z Fold
  { id: 'sgzfold6256', name: 'Samsung Galaxy Z Fold 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 259900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Складной Samsung Z Fold 6 с гибким 7.6" дисплеем. Snapdragon 8 Gen 3, Galaxy AI, MultiWindow.' },
  { id: 'sgzfold5256', name: 'Samsung Galaxy Z Fold 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Samsung Galaxy Z Fold 5 с гибким 7.6" экраном. Snapdragon 8 Gen 2, FlexMode, компактнее предшественника.' },

  // Samsung Galaxy Z Flip
  { id: 'sgzflip6256', name: 'Samsung Galaxy Z Flip 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Компактный складной Galaxy Z Flip 6 с внешним FlexWindow 3.4". Snapdragon 8 Gen 3, Galaxy AI.' },
  { id: 'sgzflip5256', name: 'Samsung Galaxy Z Flip 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Samsung Galaxy Z Flip 5 с большим внешним экраном 3.4". Snapdragon 8 Gen 2, стильный складной дизайн.' },

  // Xiaomi 14 Series
  { id: 'xm14ult512b', name: 'Xiaomi 14 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Смартфон Xiaomi с камерой Leica и AMOLED дисплеем 120 Гц. Быстрая зарядка 120W, отличное соотношение цена/качество.' },
  { id: 'xm14512b', name: 'Xiaomi 14 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Производительный смартфон Xiaomi с Snapdragon 8 Gen 3 Leading. Камера Leica и быстрая зарядка.' },

  // Xiaomi 13 Series
  { id: 'xm13ult512b', name: 'Xiaomi 13 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Флагманский смартфон Xiaomi с камерой Leica. AMOLED дисплей 120 Гц, мощный процессор Snapdragon 8 Gen 2.' },
  { id: 'xm13512b', name: 'Xiaomi 13 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 8 Gen 2 и AMOLED дисплеем. Хороший выбор для любителей производительности.' },

  // Xiaomi Redmi Note Series
  { id: 'xmrn14p256b', name: 'Xiaomi Redmi Note 14 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Xiaomi Redmi Note 14 Pro 256 ГБ со Snapdragon 7s Gen 2. AMOLED 120 Гц, зарядка 120W, камера 200 Мп.' },
  { id: 'xmrn14p512b', name: 'Xiaomi Redmi Note 14 Pro 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Redmi Note 14 Pro 512 ГБ — максимум памяти в среднем сегменте. Snapdragon 7s Gen 2, зарядка 120W.' },
  { id: 'xmrn13p256b', name: 'Xiaomi Redmi Note 13 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 7 Gen 2 и AMOLED экраном. Быстрая зарядка, хорошая цена.' },
  { id: 'xmrn13256b', name: 'Xiaomi Redmi Note 13 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 24900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 685' }, inStock: true, description: 'Бюджетный смартфон Xiaomi с хорошим AMOLED дисплеем и процессором Snapdragon 685.' },

  // Xiaomi Poco Series
  { id: 'xmpf6256b', name: 'Xiaomi Poco F6 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 8s Gen 3' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 8s Gen 3 по доступной цене. Отличная производительность и быстрая зарядка.' },
  { id: 'xmpf5256b', name: 'Xiaomi Poco F5 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi Poco с Snapdragon 7 Gen 2 и хорошей батареей. Отличное соотношение цены и производительности.' },

  // Xiaomi Pad Series
  { id: 'xmpadp12s256b', name: 'Xiaomi Pad Pro 12 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 64900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '12.8" OLED', chip: 'Snapdragon 8 Gen 1 Leading' }, inStock: true, description: 'Планшет Xiaomi с OLED дисплеем 12.8" и мощным процессором. Идеален для работы и развлечений.' },
  { id: 'xmpad7256b', name: 'Xiaomi Pad 7 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '11.5" LCD', chip: 'MediaTek Kompanio 1300T' }, inStock: true, description: 'Планшет Xiaomi с дисплеем 11.5" и мощным процессором. Хороший выбор для работы и контента.' },

  // MacBook Air M3
  { id: 'macbookairm3256', name: 'MacBook Air 13" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" на чипе M3 с дисплеем Liquid Retina. 8-ядерный GPU, MagSafe, 18 часов работы.' },
  { id: 'macbookairm3512', name: 'MacBook Air 13" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 119900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" M3 512 ГБ — больше места для проектов. 8-ядерный GPU, Liquid Retina, MagSafe.' },
  { id: 'macbookairm315256', name: 'MacBook Air 15" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 124900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'MacBook Air 15" с чипом M3 и большим дисплеем Liquid Retina. Идеален для работы и мультимедиа.' },
  { id: 'macbookairm315512', name: 'MacBook Air 15" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 144900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'MacBook Air 15" M3 512 ГБ — большой экран с запасом хранилища. Тонкий, лёгкий, 18 часов батареи.' },

  // MacBook Air M2
  { id: 'macbookairm2256', name: 'MacBook Air 13" M2 256GB', brand: 'Apple', category: 'Ноутбуки', price: 89900, image: '💻', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" на чипе M2 с дисплеем Liquid Retina. Тонкий корпус, MagSafe, отличная автономность.' },
  { id: 'macbookairm2512', name: 'MacBook Air 13" M2 512GB', brand: 'Apple', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" M2 512 ГБ — оптимальная конфигурация. Чип M2, Liquid Retina дисплей, 18 часов работы.' },

  // MacBook Pro 14"
  { id: 'macbookpro14m3256', name: 'MacBook Pro 14" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" на базовом чипе M3. Liquid Retina XDR, ProMotion 120 Гц, отличный старт для про-задач.' },
  { id: 'macbookpro14m3512', name: 'MacBook Pro 14" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 169900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" M3 512 ГБ с Liquid Retina XDR дисплеем. 8-ядерный CPU, 10-ядерный GPU.' },
  { id: 'macbookpro14m3pro512', name: 'MacBook Pro 14" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" с чипом M3 Pro и 18 ГБ RAM. 12-ядерный CPU, ProMotion, до 18 часов батареи.' },
  { id: 'macbookpro14m3max512', name: 'MacBook Pro 14" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" с топовым чипом M3 Max и 36 ГБ RAM. До 14-ядерного CPU, до 30-ядерного GPU.' },

  // MacBook Pro 16"
  { id: 'macbookpro16m3pro512', name: 'MacBook Pro 16" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 229900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" с чипом M3 Pro и экраном Liquid Retina XDR. 18 ГБ RAM, до 22 часов батареи.' },
  { id: 'macbookpro16m3max512', name: 'MacBook Pro 16" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" с чипом M3 Max и 36 ГБ RAM. Максимальная мощность для видеомонтажа и 3D.' },
  { id: 'macbookpro16m3max1tb', name: 'MacBook Pro 16" M3 Max 1TB', brand: 'Apple', category: 'Ноутбуки', price: 299900, image: '💻', specs: { storage: '1TB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" M3 Max 1 ТБ — топовая конфигурация. 36 ГБ RAM, Liquid Retina XDR, до 22 часов.' },

  // iPad Pro 11"
  { id: 'ipadpro11256', name: 'iPad Pro 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 109900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с мощным процессором и дисплеем Liquid Retina XDR 11". Компактный и мощный.' },
  
  
  { id: 'ipadpro13256', name: 'iPad Pro 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 139900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'Большой планшет Apple с чипом M4 и дисплеем 13" Liquid Retina XDR. Поддержка Apple Pencil Pro и Magic Keyboard.' },
  { id: 'ipadpro13512', name: 'iPad Pro 13" 512GB', brand: 'Apple', category: 'Планшеты', price: 159900, image: '📱', specs: { storage: '512GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'Планшет Apple с чипом M4, дисплеем 13" и хранилищем 512 ГБ. Идеален для дизайнеров и видеомонтажа.' },

  // iPad Air
  { id: 'ipadair11256', name: 'iPad Air 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 79900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Air 11" с чипом M2 и поддержкой Apple Pencil Pro. Liquid Retina, Touch ID, центр сцены.' },
  { id: 'ipadair11512', name: 'iPad Air 11" 512GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Air 11" 512 ГБ — больше места для приложений и проектов. Чип M2, Liquid Retina, USB-C.' },
  { id: 'ipadair13256', name: 'iPad Air 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13" Liquid Retina' }, inStock: true, description: 'iPad Air 13" с большим дисплеем Liquid Retina и чипом M2. Идеален для творчества и мультитаскинга.' },

  // iPad Mini
  { id: 'ipadmini128', name: 'iPad Mini 128GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '128GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'Компактный iPad Mini 128 ГБ с чипом A17 Pro. Дисплей 8.3" Liquid Retina, Apple Pencil, USB-C.' },
  { id: 'ipadmini256', name: 'iPad Mini 256GB', brand: 'Apple', category: 'Планшеты', price: 59900, image: '📱', specs: { storage: '256GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'iPad Mini 256 ГБ — больше памяти в карманном формате. Чип A17 Pro, дисплей 8.3", Wi-Fi 6E.' },

  // iPad (regular)
  { id: 'ipad64', name: 'iPad 64GB', brand: 'Apple', category: 'Планшеты', price: 34900, image: '📱', specs: { storage: '64GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'Базовый iPad 64 ГБ с чипом A14 Bionic. Дисплей 10.9" Liquid Retina, USB-C, доступная цена.' },
  { id: 'ipad256', name: 'iPad 256GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '256GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'iPad 256 ГБ с чипом A14 Bionic и дисплеем 10.9". Больше памяти для приложений, фото и видео.' },

  // AirPods 2
  { id: 'airpods2', name: 'AirPods 2', brand: 'Apple', category: 'Наушники', price: 12900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'AirPods 2 с чипом H1 и быстрым подключением. До 5 часов прослушивания, «Привет, Siri» голосом.' },
  { id: 'airpods2c', name: 'AirPods 2 with Charging Case', brand: 'Apple', category: 'Наушники', price: 14900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'AirPods 2 с беспроводным зарядным кейсом. Чип H1, до 24 часов с кейсом, Qi зарядка.' },

  // AirPods 3
  { id: 'airpods3', name: 'AirPods 3', brand: 'Apple', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'AirPods 3 с пространственным звуком и Adaptive EQ. Защита IPX4, MagSafe кейс, до 6 часов.' },
  { id: 'airpods3c', name: 'AirPods 3 with Charging Case', brand: 'Apple', category: 'Наушники', price: 21900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'AirPods 3 с зарядным кейсом Lightning. Пространственный звук, Adaptive EQ, до 30 часов с кейсом.' },

  // AirPods Pro
  { id: 'airpodspro', name: 'AirPods Pro', brand: 'Apple', category: 'Наушники', price: 24900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes' }, inStock: true, description: 'AirPods Pro с активным шумоподавлением и режимом прозрачности. Адаптивный звук, до 6 часов.' },
  { id: 'airpodspro2', name: 'AirPods Pro 2', brand: 'Apple', category: 'Наушники', price: 29900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes', spatial: 'Yes' }, inStock: true, description: 'AirPods Pro 2 с чипом H2 — лучшее ANC от Apple. Адаптивная прозрачность, USB-C кейс, до 6 часов.' },

  // AirPods Max
  { id: 'airpodsmax', name: 'AirPods Max', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Silver', spatial: 'Yes', anc: 'Active' }, inStock: true, description: 'AirPods Max в серебре с чипом H1 и ANC. Алюминиевые чашки, пространственный звук, до 20 часов.' },
  { id: 'airpodsmaxb', name: 'AirPods Max Blue', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Blue', spatial: 'Yes', anc: 'Active' }, inStock: false, description: 'AirPods Max в синем цвете. Чип H1, активное шумоподавление, Digital Crown, память на 20 часов.' },

  // Apple Watch Series 9
  { id: 'aw9s41m', name: 'Apple Watch Series 9 41mm Midnight', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Умные часы Apple с дисплеем Retina, чипом S9 и функцией Double Tap. Мониторинг здоровья 24/7.' },
  { id: 'aw9s45m', name: 'Apple Watch Series 9 45mm Midnight', brand: 'Apple', category: 'Часы', price: 39900, image: '⌚', specs: { size: '45mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Умные часы Apple Watch 9 с увеличенным 45 мм экраном. Точный GPS, датчик SpO2, мониторинг сна.' },
  { id: 'aw9s41g', name: 'Apple Watch Series 9 41mm Gold', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Gold', band: 'Sport Band' }, inStock: true, description: 'Умные часы Apple в золотом корпусе 41 мм. Чип S9, Always-On дисплей, защита от воды IP6X.' },

  // Apple Watch Ultra 2
  { id: 'awu2gps', name: 'Apple Watch Ultra 2 GPS Titanium', brand: 'Apple', category: 'Часы', price: 84900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', gps: 'Yes' }, inStock: true, description: 'Apple Watch Ultra 2 GPS с титановым корпусом 49 мм. Чип S9, точный GPS L1/L5, глубиномер до 40 м.' },
  { id: 'awu2cel', name: 'Apple Watch Ultra 2 Cellular Titanium', brand: 'Apple', category: 'Часы', price: 99900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', cellular: 'Yes' }, inStock: true, description: 'Apple Watch Ultra 2 Cellular — автономные звонки без iPhone. Титан, GPS L1/L5, сирена 86 дБ.' },

  // Apple Watch SE
  { id: 'awse2', name: 'Apple Watch SE 2 40mm Midnight', brand: 'Apple', category: 'Часы', price: 19900, image: '⌚', specs: { size: '40mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch SE 2 40 мм — доступный вход в экосистему Apple. Чип S8, обнаружение ДТП, фитнес-трекер.' },
  { id: 'awse2s', name: 'Apple Watch SE 2 44mm Midnight', brand: 'Apple', category: 'Часы', price: 22900, image: '⌚', specs: { size: '44mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch SE 2 44 мм с увеличенным экраном. Чип S8, мониторинг сна, уведомления о здоровье.' },

  // Samsung Galaxy Watch
  { id: 'sgw6cl', name: 'Samsung Galaxy Watch 6 Classic Silver', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Silver', band: 'Sport Band' }, inStock: true, description: 'Samsung Galaxy Watch 6 Classic Silver с вращающимся безелем. AMOLED 1.47", BIA-датчик, Wear OS.' },
  { id: 'sgw6clb', name: 'Samsung Galaxy Watch 6 Classic Black', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Black', band: 'Sport Band' }, inStock: true, description: 'Galaxy Watch 6 Classic Black — стильные часы с безелем. AMOLED дисплей, мониторинг сна и стресса.' },
  { id: 'sgw7', name: 'Samsung Galaxy Watch 7 Gold', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Gold', band: 'Sport Band', ai: 'Yes' }, inStock: true, description: 'Умные часы Samsung с датчиком BIA и мониторингом сна. Wear OS, безель для навигации.' },

  // Samsung Galaxy Buds
  
  { id: 'sgbuds3p', name: 'Samsung Galaxy Buds3 Pro Silver', brand: 'Samsung', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '26h', color: 'Silver', anc: 'Active', ips: 'IPX7' }, inStock: true, description: 'TWS-наушники Samsung с интеллектуальным ANC и звуком 360 Audio. Поддержка Hi-Fi 24 бит.' },

  // Sony WH-1000XM5
  { id: 'sonywh1000xm5b', name: 'Sony WH-1000XM5 Black', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Black', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Флагманские наушники Sony с лучшим в классе шумоподавлением. 30 часов работы, LDAC кодек.' },
  { id: 'sonywh1000xm5s', name: 'Sony WH-1000XM5 Silver', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Silver', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Sony WH-1000XM5 в серебре. Автокалибровка ANC, Speak-to-Chat, мультиточечное подключение.' },

  // Sony WF-1000XM5
  
  
  
  { id: 'sonya7rb', name: 'Sony Alpha 7R V Black', brand: 'Sony', category: 'Камеры и дроны', price: 419900, image: '📷', specs: { sensor: 'Full Frame', megapixels: '61MP', video: '8K 24p', display: 'Fixed 3.2"' }, inStock: false, description: 'Беззеркальная камера Sony с полнокадровым сенсором. Быстрый автофокус, видео 4K 120fps.' },
  
  
  
  
  
  
  
  { id: 'djimini4b', name: 'DJI Mini 4 Pro Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 59900, image: '🚁', specs: { weight: '249g', max_flight_time: '34min', video: '4K 60p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'Компактный дрон DJI с хорошей камерой и обнаружением препятствий. До 34 минут полёта.' },
  { id: 'djiair3', name: 'DJI Air 3 Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 99900, image: '🚁', specs: { weight: '907g', max_flight_time: '46min', video: '4K 60p', sensor: 'Dual 4/3 CMOS' }, inStock: true, description: 'Дрон DJI Air 3 с двумя камерами и зумом 3x. До 46 минут полёта, обнаружение препятствий во всех направлениях.' },
  { id: 'djimavic3', name: 'DJI Mavic 3 Classic Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 189900, image: '🚁', specs: { weight: '895g', max_flight_time: '46min', video: '4K 120p', sensor: '4/3 CMOS' }, inStock: true, description: 'DJI Mavic 3 Classic с камерой Hasselblad 4/3 CMOS. До 46 минут полёта, съёмка 5.1K, дальность 15 км.' },
  { id: 'djiavata', name: 'DJI Avata 2 Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 159900, image: '🚁', specs: { weight: '410g', max_flight_time: '23min', video: '1080p 120p', type: 'FPV Drone' }, inStock: true, description: 'DJI Avata 2 — FPV-дрон для иммерсивных полётов. Управление движением головы, до 23 минут в воздухе.' },

  // DJI Osmo
  
  { id: 'ps5be', name: 'PlayStation 5 Console Bundle', brand: 'Sony', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', vr: 'PSVR2' }, inStock: true, description: 'Игровая консоль PlayStation 5 с дисководом Blu-ray. SSD 825 ГБ, 4K 120fps, тактильный контроллер DualSense.' },
  { id: 'ps5de', name: 'PlayStation 5 Digital Edition', brand: 'Sony', category: 'Игровые консоли', price: 44900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', digital: 'Yes' }, inStock: true, description: 'Цифровая версия PlayStation 5 без дисковода. Те же характеристики за меньшую цену, SSD 825 ГБ.' },
  { id: 'ps5pro', name: 'PlayStation 5 Pro', brand: 'Sony', category: 'Игровые консоли', price: 79900, image: '🎮', specs: { storage: '2TB', cpu: 'Custom Zen 2 8-core', gpu: 'Enhanced GPU', vr: 'PSVR2' }, inStock: false, description: 'PlayStation 5 Pro с улучшенным GPU и поддержкой 8K. Быстрый SSD, обратная совместимость с PS4.' },

  // Xbox Series X
  { id: 'xboxsx', name: 'Xbox Series X', brand: 'Microsoft', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '1TB', cpu: 'Custom Zen 2 8-core', gpu: '12 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Игровая консоль Microsoft Xbox Series X. 12 терафлопс, SSD 1 ТБ, 4K 120fps, обратная совместимость.' },
  { id: 'xboxss', name: 'Xbox Series S', brand: 'Microsoft', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { storage: '512GB', cpu: 'Custom Zen 2 8-core', gpu: '4 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Компактная игровая консоль Xbox Series S. Цифровая, 512 ГБ SSD, 1440p 120fps, Game Pass.' },

  // Nintendo Switch
  { id: 'switcholed', name: 'Nintendo Switch OLED White', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'White' }, inStock: true, description: 'Nintendo Switch OLED White с 7" OLED экраном. Док-станция, улучшенные динамики, 64 ГБ памяти.' },
  { id: 'switcholedred', name: 'Nintendo Switch OLED Red', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'Red' }, inStock: true, description: 'Nintendo Switch OLED в красно-синем варианте. 7" OLED дисплей, широкая подставка, LAN-порт в доке.' },
  
  
  
  
  
  { id: 'dysonairwrapc', name: 'Dyson Airwrap Complete', brand: 'Dyson', category: 'Для дома', price: 59900, image: '💈', specs: { heat: 'Intelligent', rotation: 'Oscillating', battery: 'Cordless', attachments: '6' }, inStock: true, description: 'Мультистайлер Dyson Airwrap Complete с 6 насадками. Технология Coanda, бережная укладка без нагрева.' },

  // Dyson Supersonic
  { id: 'dysonsupersonicb', name: 'Dyson Supersonic Black', brand: 'Dyson', category: 'Для дома', price: 34900, image: '💈', specs: { heat: 'Intelligent', motor: 'Digital V9', speed: '110,000rpm', color: 'Black' }, inStock: true, description: 'Фен Dyson Supersonic с цифровым мотором V9 и 4 насадками. Intelligent Heat Control, 110 000 об/мин.' },

  // Dyson Purifier
  
  { id: 'sgtvqn65b', name: 'Samsung QN85 65" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 84900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN85 65" с Neo QLED и Mini LED подсветкой. 4K 120 Гц, Dolby Atmos, Gaming Hub.' },
  { id: 'sgtvqn75b', name: 'Samsung QN85 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 124900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN85 75" Neo QLED 4K с технологией Mini LED. Глубокий контраст, HDR10+, Gaming Hub.' },
  { id: 'sgtvqn85b', name: 'Samsung QN85 85" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: false, description: 'Samsung QN85 85" Neo QLED — огромный экран с Mini LED. 4K 120 Гц, антибликовое покрытие.' },

  // LG TV
  
  { id: 'lgtvoledc', name: 'LG OLED65 65" 4K', brand: 'LG', category: 'Телевизоры', price: 119900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'LG OLED65 C-серии с процессором α9 Gen6. Идеальный чёрный цвет, Dolby Vision IQ, 120 Гц.' },
  { id: 'lgtvoled75', name: 'LG OLED75 75" 4K', brand: 'LG', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'LG OLED 75" с OLED EX технологией. Потрясающая картинка, Dolby Vision, NVIDIA G-Sync.' },

  // More Xiaomi Mi Band
  { id: 'xiamibanda8', name: 'Xiaomi Mi Band 8', brand: 'Xiaomi', category: 'Часы', price: 4990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '16 days', waterproof: '5ATM' }, inStock: true, description: 'Фитнес-браслет Xiaomi Mi Band 8 с AMOLED экраном. До 16 дней работы, 150+ режимов тренировок.' },
  { id: 'xiamibanda7', name: 'Xiaomi Mi Band 7', brand: 'Xiaomi', category: 'Часы', price: 3990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '14 days', waterproof: '5ATM' }, inStock: true, description: 'Фитнес-браслет Xiaomi Mi Band 7 с AMOLED экраном 1.62". SpO2, мониторинг сна, 14 дней работы.' },

  // Samsung Galaxy Tab
  { id: 'sgtabs10256', name: 'Samsung Galaxy Tab S10 256GB', brand: 'Samsung', category: 'Планшеты', price: 69900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 3 Leading', storage: '256GB' }, inStock: true, description: 'Планшет Samsung с AMOLED дисплеем 11" и стилусом S Pen. Хороший выбор для работы и развлечений.' },
  { id: 'sgtabs9ultra', name: 'Samsung Galaxy Tab S9 Ultra 256GB', brand: 'Samsung', category: 'Планшеты', price: 99900, image: '📱', specs: { size: '14.6"', resolution: '2K', chip: 'Snapdragon 8 Gen 2', storage: '256GB' }, inStock: true, description: 'Флагманский планшет Samsung Tab S9 Ultra с экраном 14.6" и S Pen. Snapdragon 8 Gen 2, IP68.' },
  { id: 'sgtabs8', name: 'Samsung Galaxy Tab S8 128GB', brand: 'Samsung', category: 'Планшеты', price: 49900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 1', storage: '128GB' }, inStock: true, description: 'Планшет Samsung Galaxy Tab S8 с дисплеем 11" и чипом Snapdragon 8 Gen 1. S Pen в комплекте.' },

  // More AirPods variants
  
  
  { id: 'sgbudslive', name: 'Samsung Galaxy Buds Live Black', brand: 'Samsung', category: 'Наушники', price: 10900, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '29h', color: 'Black', anc: 'Active' }, inStock: true, description: 'Наушники Samsung открытого типа с фирменным дизайном. ANC, звук AKG, до 6 часов работы.' },

  // More Sony headphones
  { id: 'sonywh900nb', name: 'Sony WH-900N Black', brand: 'Sony', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '35h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Накладные наушники Sony с шумоподавлением и LDAC. Лёгкие, до 35 часов, быстрая зарядка.' },

  // Sennheiser Momentum
  
  { id: 'bosequc45', name: 'Bose QuietComfort 45 Black', brand: 'Bose', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '24h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Наушники Bose с CustomTune шумоподавлением. 24 часа работы, Aware Mode, мультиточечное подключение.' },

  // More Galaxy Watch models
  { id: 'sgw6sm', name: 'Samsung Galaxy Watch 6 Silver', brand: 'Samsung', category: 'Часы', price: 24900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Silver' }, inStock: true, description: 'Samsung Galaxy Watch 6 Silver — лёгкие и компактные. AMOLED, сапфировое стекло, до 40 часов.' },
  { id: 'sgw5pro', name: 'Samsung Galaxy Watch 5 Pro Titanium', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '45mm', display: 'AMOLED', color: 'Titanium' }, inStock: true, description: 'Умные часы Samsung Galaxy Watch 5 Pro из титана. GPS-навигация, батарея 590 мАч на 80 часов.' },

  // Garmin Smartwatches
  { id: 'garminepix', name: 'Garmin Epix Gen 2 Titanium', brand: 'Garmin', category: 'Часы', price: 59900, image: '⌚', specs: { display: '1.3" AMOLED', battery: '12 days', size: '47mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Премиальные GPS-часы Garmin Epix Gen 2 с AMOLED экраном. Титановый корпус, до 16 дней работы.' },
  { id: 'garminfe965', name: 'Garmin Fenix 7X Titanium', brand: 'Garmin', category: 'Часы', price: 79900, image: '⌚', specs: { display: '1.4" AMOLED', battery: '21 days', size: '55mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Мультиспортивные GPS-часы Garmin Fenix 7X из титана. Солнечная зарядка, до 37 дней работы.' },

  // OnePlus Phones
  { id: 'oneplus12256', name: 'OnePlus 12 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Флагман OnePlus 12 с Snapdragon 8 Gen 3 и камерой Hasselblad. AMOLED 120 Гц, зарядка 100W.' },
  { id: 'oneplus12512', name: 'OnePlus 12 512GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'OnePlus 12 512 ГБ с Snapdragon 8 Gen 3. Камера Hasselblad, AMOLED 2K, батарея 5400 мАч.' },
  { id: 'oneplus11256', name: 'OnePlus 11 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 59900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'OnePlus 11 с Snapdragon 8 Gen 2 и камерой Hasselblad. AMOLED 120 Гц, быстрая зарядка 100W.' },

  // Google Pixel Phones
  { id: 'pixel9pro256', name: 'Google Pixel 9 Pro 256GB Black', brand: 'Google', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro с чипом Tensor G4 и ИИ-функциями. Камера 50 Мп, 7 лет обновлений Android.' },
  { id: 'pixel9pro512', name: 'Google Pixel 9 Pro 512GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro 512 ГБ для фото и видео. Tensor G4, Super Res Zoom, Magic Eraser.' },
  { id: 'pixel9promax256', name: 'Google Pixel 9 Pro Max 256GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro Max с большим 6.7" экраном. Tensor G4, батарея 5000 мАч, лучшая камера Pixel.' },

  // Motorola Razr Foldable
  { id: 'motorola_razr_2024', name: 'Motorola Razr 50 Ultra 512GB', brand: 'Motorola', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9" Foldable', chip: 'Snapdragon 8s Gen 3 Leading' }, inStock: true, description: 'Складной смартфон Motorola Razr 50 Ultra с большим внешним экраном 4". Snapdragon 8s Gen 3.' },

  // Huawei P70
  { id: 'huaweip70pro512', name: 'Huawei P70 Pro 512GB Black', brand: 'Huawei', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Kirin 9010' }, inStock: false, description: 'Флагман Huawei P70 Pro с камерой XMAGE и матрицей 1". Быстрая зарядка 100W, стильный дизайн.' },

  // Nothing Phone
  { id: 'nothing2a256', name: 'Nothing Phone 2a 256GB Black', brand: 'Nothing', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'MediaTek Dimensity 7200 Pro' }, inStock: true, description: 'Смартфон Nothing Phone 2a с уникальным LED-дизайном Glyph. MediaTek Dimensity 7200, AMOLED 120 Гц.' },

  // ASUS ROG Phone
  { id: 'asurog9pro512', name: 'ASUS ROG Phone 9 Pro 512GB', brand: 'ASUS', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78" 240Hz', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Игровой смартфон ASUS ROG Phone 9 Pro с Snapdragon 8 Elite. Экран 185 Гц, AirTrigger, RGB-подсветка.' },

  // Lenovo ThinkPad
  { id: 'lenox1carbonm4', name: 'Lenovo ThinkPad X1 Carbon 14 M4', brand: 'Lenovo', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Ультрабук Lenovo ThinkPad X1 Carbon Gen 12 с Intel Core Ultra. Вес 1.08 кг, до 15 часов работы.' },
  { id: 'lenovox1carbonm3', name: 'Lenovo ThinkPad X1 Carbon 14 M3', brand: 'Lenovo', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Бизнес-ноутбук Lenovo ThinkPad X1 Carbon с дисплеем 14" 2.8K. Лёгкий, прочный, долгая батарея.' },

  // Dell XPS
  { id: 'dellxps13', name: 'Dell XPS 13 9340', brand: 'Dell', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 7', ram: '32GB', display: '13.4" OLED' }, inStock: true, description: 'Компактный ноутбук Dell XPS 13 с безрамочным InfinityEdge дисплеем. Intel Core Ultra, вес 1.17 кг.' },
  { id: 'dellxps15', name: 'Dell XPS 15 9540', brand: 'Dell', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 9', ram: '32GB', display: '15.6" OLED' }, inStock: true, description: 'Премиальный ноутбук Dell XPS 15 с InfinityEdge дисплеем. Компактный корпус, мощная начинка.' },

  // ASUS VivoBook
  { id: 'asusvivobook15', name: 'ASUS VivoBook 15 OLED', brand: 'ASUS', category: 'Ноутбуки', price: 69900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 7', ram: '16GB', display: '15.6" OLED' }, inStock: true, description: 'Доступный ноутбук ASUS VivoBook 15 для учёбы и работы. Лёгкий, хорошая батарея, IPS дисплей.' },

  // HP Pavilion
  { id: 'hppaviliondm15', name: 'HP Pavilion 15 dm0021dx', brand: 'HP', category: 'Ноутбуки', price: 59900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 5', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'Ноутбук HP Pavilion 15 для дома и офиса. Надёжный, хороший дисплей IPS, доступная цена.' },

  // MSI GE76 Gaming
  { id: 'msige76', name: 'MSI GE76 Raider RTX 4070', brand: 'MSI', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 165Hz' }, inStock: true, description: 'Игровой ноутбук MSI GE76 Raider с RTX 4070. 17.3" дисплей 240 Гц, мощное охлаждение.' },

  // ROG Zephyrus G16
  { id: 'roggm16', name: 'ASUS ROG Zephyrus G16 RTX 4090', brand: 'ASUS', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: false, description: 'Игровой ноутбук ASUS ROG Zephyrus G16 с RTX 4090. OLED 240 Гц, ультратонкий корпус.' },

  // Razer Blade
  { id: 'razorblade16', name: 'Razer Blade 16 RTX 4090', brand: 'Razer', category: 'Ноутбуки', price: 289900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: true, description: 'Премиальный игровой ноутбук Razer Blade 16 с RTX 4090. Mini-LED 240 Гц, алюминиевый корпус.' },

  // iPad Pro with M2
  { id: 'ipadprom211256', name: 'iPad Pro 11" M2 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с чипом M2 и дисплеем Liquid Retina XDR 11". Компактный и мощный.' },

  // Samsung Galaxy Tab A
  { id: 'sgtaba13256', name: 'Samsung Galaxy Tab A13 256GB', brand: 'Samsung', category: 'Планшеты', price: 24900, image: '📱', specs: { size: '10.5"', resolution: 'WXGA+', chip: 'MediaTek Helio G99', storage: '256GB' }, inStock: true, description: 'Бюджетный планшет Samsung Galaxy Tab A13 с дисплеем 10.4". Для учёбы, чтения и мультимедиа.' },

  // Microsoft Surface Pro
  { id: 'surfacepro10', name: 'Microsoft Surface Pro 10 256GB', brand: 'Microsoft', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '13" PixelSense' }, inStock: true, description: 'Планшет-трансформер Microsoft Surface Pro 10 с Intel Core Ultra. Kickstand, Windows 11.' },

  // Microsoft Surface Laptop Studio
  { id: 'surfacelaptopstudio', name: 'Microsoft Surface Laptop Studio RTX 4090', brand: 'Microsoft', category: 'Ноутбуки', price: 269900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-12', ram: '32GB', gpu: 'RTX 4090', display: '15" 120Hz' }, inStock: true, description: 'Ноутбук Microsoft Surface Laptop Studio с гибким дисплеем и RTX 4090. Для креативных профессионалов.' },

  // USB-C Hubs and Accessories
  { id: 'ankerusb', name: 'Anker 7-in-1 USB-C Hub Silver', brand: 'Anker', category: 'Аксессуары', price: 4990, image: '🔌', specs: { ports: '7-in-1', power: '100W', color: 'Silver' }, inStock: true, description: 'USB-C хаб Anker 7-в-1: HDMI 4K, USB-A, SD-карта, Ethernet. Power Delivery 100W.' },
  
  { id: 'appleusbclight', name: 'Apple USB-C to Lightning Cable 1m', brand: 'Apple', category: 'Аксессуары', price: 1990, image: '🔌', specs: { length: '1m', connector: 'USB-C to Lightning', color: 'White' }, inStock: true, description: 'Оригинальный кабель Apple USB-C на Lightning длиной 1 метр. Быстрая зарядка и синхронизация.' },
  { id: 'appleusbcc', name: 'Apple USB-C Charge Cable 2m', brand: 'Apple', category: 'Аксессуары', price: 2990, image: '🔌', specs: { length: '2m', connector: 'USB-C to USB-C', color: 'White' }, inStock: true, description: 'Оригинальный кабель Apple USB-C 2 метра. Подходит для зарядки MacBook и iPad.' },

  // Phone Cases
  { id: 'otterbox15pm', name: 'OtterBox Defender iPhone 15 Pro Max Black', brand: 'OtterBox', category: 'Аксессуары', price: 4990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'Polycarbonate', color: 'Black', protection: 'Heavy-duty' }, inStock: true, description: 'Прочный чехол OtterBox Defender для iPhone 15 Pro Max. Многослойная защита от ударов и падений.' },
  { id: 'spigeniphone15pm', name: 'Spigen Tough Armor iPhone 15 Pro Max Black', brand: 'Spigen', category: 'Аксессуары', price: 1990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'TPU', color: 'Black' }, inStock: true, description: 'Защитный чехол Spigen Tough Armor для iPhone 15 Pro Max. Двухслойная защита, встроенная подставка.' },

  // Screen Protectors
  
  
  
  
  { id: 'ankerasync', name: 'Anker PowerWave Pad 15W Black', brand: 'Anker', category: 'Аксессуары', price: 2990, image: '🔌', specs: { power: '15W', color: 'Black', standard: 'Qi' }, inStock: true, description: 'Беспроводная зарядка Anker PowerWave 15W с технологией Qi. Быстрая зарядка для iPhone и Samsung.' },

  // Portable Power Banks
  { id: 'ankerpower20000', name: 'Anker PowerCore 20000 Black', brand: 'Anker', category: 'Аксессуары', price: 3990, image: '🔋', specs: { capacity: '20000mAh', ports: '2 USB-A', color: 'Black' }, inStock: true, description: 'Портативный аккумулятор Anker на 20000 мАч. Два порта USB-A, индикатор заряда, быстрая зарядка.' },
  { id: 'applepower20', name: 'Apple MagSafe Battery Pack White', brand: 'Apple', category: 'Аксессуары', price: 4990, image: '🔋', specs: { capacity: '2460mAh', power: '7.5W', color: 'White' }, inStock: true, description: 'MagSafe аккумулятор Apple для iPhone. Магнитное крепление, беспроводная зарядка 7.5W.' },

  // Laptop Stands
  
  
  
  
  
  
  
  { id: 'samsungevob1tb', name: 'Samsung 870 EVO 1TB 2.5" SSD', brand: 'Samsung', category: 'Накопители', price: 6990, image: '💾', specs: { capacity: '1TB', interface: 'SATA 2.5"', speed: '560MB/s' }, inStock: true, description: 'SSD Samsung 870 EVO 1 ТБ формата 2.5". Скорость чтения до 560 МБ/с, надёжная TLC память.' },
  
  
  { id: 'sgtvq70d', name: 'Samsung Q70D 55" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 64900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung Q70D QLED 55" с квантовыми точками и 4K 120 Гц. Tizen OS, HDR10+, игровой режим.' },
  { id: 'hisenseqledu7g', name: 'Hisense U7G 55" QLED 4K', brand: 'Hisense', category: 'Телевизоры', price: 44900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Hisense U7G 55" QLED с Full Array Local Dimming. 4K 120 Гц, Dolby Vision, Game Mode Pro.' },
  { id: 'tcl98c645', name: 'TCL 98C645 98" 4K Mini-LED', brand: 'TCL', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '98"', resolution: '4K', panel: 'Mini-LED', refresh: '60Hz' }, inStock: false, description: 'Огромный 98" телевизор TCL с Mini-LED подсветкой. 4K, HDR10+, Google TV, впечатляющий размер.' },

  // Sony Televisions
  { id: 'sonykx80', name: 'Sony K-85XR80 85" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 399900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: false, description: 'Sony K-85XR80 85" с Mini-LED подсветкой и процессором XR. Dolby Vision, BRAVIA XR, для кино.' },
  { id: 'sonybravia', name: 'Sony BRAVIA 7 65" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: true, description: 'Sony BRAVIA 7 65" с Mini-LED и XR Processor. Acoustic Multi-Audio, Dolby Vision, Google TV.' },

  // Ring Lights
  
  
  
  
  
  
  
  
  
  
  { id: 'beyerdt880', name: 'Beyerdynamic DT 880 Pro Studio Headphones', brand: 'Beyerdynamic', category: 'Наушники', price: 11990, image: '🎧', specs: { type: 'Wired', impedance: '250 Ohm', frequency: '5Hz-35kHz' }, inStock: true, description: 'Полуоткрытые мониторные наушники Beyerdynamic 250 Ом. Точное и детальное звучание для студии.' },


  // DJI Mini 3 Pro
  { id: 'djimini3pro', name: 'DJI Mini 3 Pro Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 44900, image: '🚁', specs: { weight: '249g', max_flight_time: '38min', video: '4K 30p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'DJI Mini 3 Pro весом всего 249 г — не требует регистрации. 4K 30fps, отслеживание объектов, до 38 минут.' },

  // GoPro
  { id: 'gopohero12', name: 'GoPro Hero 12 Black Bundle', brand: 'GoPro', category: 'Камеры и дроны', price: 39900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 6.0' }, inStock: true, description: 'Экшн-камера GoPro Hero 12 с записью 5.3K 60fps. HyperSmooth 6.0, водонепроницаемая до 10 м.' },
  { id: 'goprohero11', name: 'GoPro Hero 11 Black Bundle', brand: 'GoPro', category: 'Камеры и дроны', price: 29900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 5.0' }, inStock: true, description: 'Экшн-камера GoPro Hero 11 с сенсором 27 Мп. 5.3K видео, HyperSmooth 5.0, защита до 10 м.' },

  // Insta360
  
  
  
  
  
  
  
  { id: 'dysonsupersonics', name: 'Dyson Supersonic Styling Iron Nickel', brand: 'Dyson', category: 'Для дома', price: 44900, image: '💈', specs: { heat: 'Intelligent', straightening: 'Yes', color: 'Nickel' }, inStock: true, description: 'Стайлер Dyson для выпрямления волос с технологией Intelligent Heat Control. Бережная укладка.' },

  // More Samsung Products
  { id: 'sgtv85', name: 'Samsung S95C 85" OLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'OLED', refresh: '144Hz' }, inStock: false, description: 'Огромный 85" OLED от Samsung с панелью QD-OLED. 144 Гц, HDR10+, Gaming Hub для геймеров.' },
  { id: 'sgtvq90d', name: 'Samsung QN90D 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN90D 75" с Neo QLED и Anti-Reflection покрытием. 4K 144 Гц, яркость 2000 нит.' },

  // Additional iPhones & Older Models
  { id: 'iph16pro', name: 'iPhone 16 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18 Pro' }, inStock: true, description: 'iPhone 16 Pro с чипом A18 Pro и кнопкой Camera Control. Титановый корпус, камера 48 Мп, USB-C.' },
  { id: 'iph16promax', name: 'iPhone 16 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A18 Pro' }, inStock: true, description: 'iPhone 16 Pro Max с самым большим экраном 6.9". Чип A18 Pro, видео 4K 120fps, до 33 часов работы.' },
  { id: 'iph16256', name: 'iPhone 16 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18' }, inStock: true, description: 'iPhone 16 с чипом A18 и кнопкой Action Button. Камера 48 Мп, Dynamic Island, USB-C.' },

  // Oppo Smartphones
  { id: 'oppofind6pro', name: 'Oppo Find X6 Pro 512GB Black', brand: 'Oppo', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Oppo Find X6 Pro с камерой Hasselblad и матрицей 1". Snapdragon 8 Gen 2, зарядка 100W.' },

  // Vivo Smartphones
  { id: 'vivox100ultra', name: 'Vivo X100 Ultra 512GB Black', brand: 'Vivo', category: 'Смартфоны', price: 84900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Vivo X100 Ultra с телеобъективом ZEISS 200 Мп. Dimensity 9300, батарея 5500 мАч.' },

  // ZTE Axon
  { id: 'ztaxon70ultra', name: 'ZTE Axon 70 Ultra 512GB Black', brand: 'ZTE', category: 'Смартфоны', price: 49900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'ZTE Axon 70 Ultra с подэкранной камерой. Snapdragon 8 Gen 3, AMOLED 144 Гц.' },

  // Realme
  { id: 'realme12pro', name: 'Realme 12 Pro 512GB Black', brand: 'Realme', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 7 Gen 3 Leading' }, inStock: true, description: 'Realme 12 Pro с телеобъективом-перископом и OIS. Snapdragon 7s Gen 2, AMOLED 120 Гц.' },

  // Honor Magic
  { id: 'honormagic6pro', name: 'Honor Magic 6 Pro 512GB Black', brand: 'Honor', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Honor Magic 6 Pro с ИИ-функциями и камерой 50 Мп. Snapdragon 8 Gen 3, батарея 5600 мАч.' },

  // TCL Tablet
  { id: 'tcltab12pro', name: 'TCL Tab Pro Gen 2 12.9" 256GB', brand: 'TCL', category: 'Планшеты', price: 19900, image: '📱', specs: { size: '12.9"', resolution: '1600x2560', chip: 'MediaTek Dimensity 9100', storage: '256GB' }, inStock: true, description: 'Планшет TCL Tab Pro Gen 2 с дисплеем 12.9" и стилусом. Хорошая цена для большого экрана.' },

  // Lenovo Tablet
  { id: 'lenovotabp12', name: 'Lenovo Tab P12 11.5" 128GB', brand: 'Lenovo', category: 'Планшеты', price: 14990, image: '📱', specs: { size: '11.5"', resolution: '2000x1200', chip: 'MediaTek Kompanio 1300T', storage: '128GB' }, inStock: true, description: 'Планшет Lenovo Tab P12 с дисплеем 11.5" 2K. Dolby Atmos, батарея 10000 мАч, стилус в комплекте.' },

  // Amazon Tablet
  
  { id: 'huaweimatepadt11', name: 'Huawei MatePad T11 128GB', brand: 'Huawei', category: 'Планшеты', price: 9990, image: '📱', specs: { size: '10.95"', resolution: '1920x1200', chip: 'MediaTek Helio G99', storage: '128GB' }, inStock: true, description: 'Планшет Huawei MatePad T11 для повседневных задач. Дисплей 10.1", лёгкий и компактный.' },

  // MSI Laptop
  { id: 'msistealth16ai', name: 'MSI Stealth 16 AI Studio RTX 5090', brand: 'MSI', category: 'Ноутбуки', price: 379900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core Ultra 9', ram: '32GB', gpu: 'RTX 5090', display: '16" 2.5K 144Hz' }, inStock: false, description: 'Игровой ноутбук MSI Stealth 16 AI Studio с RTX 5090. 4K Mini-LED, тихая система охлаждения.' },

  // Gigabyte
  { id: 'gigaaeroq17', name: 'Gigabyte AERO 17 RTX 4090', brand: 'Gigabyte', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '17" 4K OLED' }, inStock: true, description: 'Ноутбук Gigabyte AERO 17 для создателей контента с RTX 4090. 4K дисплей, калибровка X-Rite.' },

  // ASUS ProBook
  { id: 'asusprobook15', name: 'ASUS ProBook 15 Core i7', brand: 'ASUS', category: 'Ноутбуки', price: 79900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'Ноутбук ASUS ProArt для творческих профессионалов. OLED дисплей, мощный процессор, калибровка цвета.' },

  // Clevo
  { id: 'clevop775', name: 'Clevo P775 17" RTX 4070', brand: 'Clevo', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i7-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 144Hz' }, inStock: true, description: 'Мощный ноутбук Clevo P775 17" с RTX 4070. Десктопный процессор, апгрейд компонентов.' },

  // Framework Modular
  { id: 'frameworklaptop', name: 'Framework Laptop 16 Core Ultra', brand: 'Framework', category: 'Ноутбуки', price: 129900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '16" 2.8K' }, inStock: true, description: 'Модульный ноутбук Framework 16 с заменяемыми компонентами. Intel Core Ultra, экологичный дизайн.' },

  // Pixelbook-like Chromebooks
  { id: 'pixelbookgo', name: 'Google Pixelbook Go 128GB Clearly White', brand: 'Google', category: 'Ноутбуки', price: 49900, image: '💻', specs: { storage: '128GB', chip: 'Intel Core m3', display: '13.3" 2K', os: 'Chrome OS' }, inStock: false, description: 'Лёгкий хромбук Google Pixelbook Go с Chrome OS. Тихая клавиатура, 12 часов работы, вес 1 кг.' },

  // Gaming Monitors
  { id: 'acer272x', name: 'Acer Predator XB272 27" 360Hz', brand: 'Acer', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1080p', refresh: '360Hz', response: '0.5ms' }, inStock: true, description: 'Игровой монитор Acer Predator XB272 27" с частотой 360 Гц. IPS, 0.3 мс, NVIDIA G-Sync.' },
  { id: 'asus27pro', name: 'ASUS ProArt PA278QV 27" 100% sRGB', brand: 'ASUS', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1440p', color_accuracy: '99.9% sRGB', response: '5ms' }, inStock: true, description: 'Профессиональный монитор ASUS ProArt PA278QV 27" с 100% sRGB. IPS, калибровка для дизайнеров.' },

  // Ultrawide Monitors
  { id: 'lgultrawide38', name: 'LG UltraWide 38" Curved Monitor', brand: 'LG', category: 'Телевизоры', price: 99900, image: '📺', specs: { size: '38"', resolution: '3840x1600', refresh: '144Hz', curvature: '1440R' }, inStock: true, description: 'Ультраширокий монитор LG 38" Curved 21:9. IPS Nano, USB-C 94W, для продуктивной работы.' },

  // Budget Phone Accessories
  
  { id: 'genericphonestand', name: 'Generic Metal Phone Stand', brand: 'Generic', category: 'Аксессуары', price: 590, image: '📱', specs: { material: 'Metal', adjustable: 'Yes', weight_capacity: '500g' }, inStock: true, description: 'Универсальная металлическая подставка для смартфона. Регулируемый угол наклона, прочная конструкция.' },

  // Keychains & Small Accessories
  { id: 'appleairtagsingle', name: 'Apple AirTag Single', brand: 'Apple', category: 'Аксессуары', price: 3990, image: '🔖', specs: { technology: 'Ultra Wideband', water_resistant: 'Yes', battery: '1 year' }, inStock: true, description: 'Трекер Apple AirTag с технологией Ultra Wideband. Точное определение местоположения, батарея на год.' },
  
  
  
  
  
  
  { id: 'samsungq990b', name: 'Samsung HW-Q990B Soundbar 11.1.4ch', brand: 'Samsung', category: 'Наушники', price: 99900, image: '🔊', specs: { channels: '11.1.4', power: '656W', dolby: 'Atmos' }, inStock: true, description: 'Саундбар Samsung Q990B 11.1.4 с поддержкой Dolby Atmos и DTS:X. Беспроводной сабвуфер и тыловые колонки.' },
  { id: 'jblbar1000pro', name: 'JBL Bar 1000 Pro 3.1.2ch Soundbar', brand: 'JBL', category: 'Наушники', price: 49900, image: '🔊', specs: { channels: '3.1.2', power: '880W', dolby: 'Atmos' }, inStock: true, description: 'Саундбар JBL 7.1.4 с Dolby Atmos и DTS:X. Отделяемые колонки, встроенный сабвуфер.' },

  // Budget Headphones
  { id: 'jbltunebuds', name: 'JBL Tune Buds True Wireless Earbuds', brand: 'JBL', category: 'Наушники', price: 6990, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '24h', anc: 'Yes' }, inStock: true, description: 'TWS-наушники JBL с Active Noise Cancelling и глубоким басом. До 8 часов, быстрая зарядка.' },
  
  
  { id: 'applemag', name: 'Apple Magic Keyboard + Mouse Bundle Space Gray', brand: 'Apple', category: 'Периферия', price: 12990, image: '⌨️', specs: { keyboard: 'Wireless', mouse: 'Magic Mouse 2', color: 'Space Gray' }, inStock: true, description: 'Комплект Apple Magic Keyboard и Magic Mouse в Space Gray. Беспроводное подключение, зарядка через Lightning.' },

  // Mechanical Keyboards
  { id: 'daskeyboard', name: 'Das Keyboard 5Q RGB Mechanical Keyboard', brand: 'Das Keyboard', category: 'Периферия', price: 19900, image: '⌨️', specs: { switches: 'Cherry MX', backlight: 'RGB', programmable: 'Yes' }, inStock: true, description: 'Механическая клавиатура Das Keyboard 5Q с переключателями Cherry MX. RGB-подсветка, программируемые клавиши.' },
  { id: 'corsairrk', name: 'Corsair K95 RGB Platinum XT Mechanical', brand: 'Corsair', category: 'Аксессуары', price: 24900, image: '⌨️', specs: { switches: 'Cherry MX Speed', backlight: 'RGB', macro_keys: '6' }, inStock: true, description: 'Игровая механическая клавиатура Corsair K95 RGB Platinum XT. Cherry MX Speed, 6 макро-клавиш.' },

  // Gaming Mice
  
  
  
  
  { id: 'xiaomilamp', name: 'Xiaomi Mi Desk Lamp Pro Smart', brand: 'Xiaomi', category: 'Для дома', price: 4990, image: '💡', specs: { color_temp: '2700-6500K', brightness: 'Adjustable', app_control: 'Yes' }, inStock: true, description: 'Умная настольная лампа Xiaomi с управлением через Mi Home. Диапазон 2700-6500K, плавная регулировка.' },

  // Air Purifiers
  
  { id: 'sharpi3000', name: 'Sharp KC-G50EW Air Purifier', brand: 'Sharp', category: 'Для дома', price: 19900, image: '🌬️', specs: { coverage: '350 sq.ft', filter: 'HEPA', ion: 'Yes' }, inStock: true, description: 'Очиститель воздуха Sharp с плазмакластерной ионизацией. HEPA-фильтр, увлажнение, тихая работа.' },

  // Humidifiers
  
  { id: 'medbottle', name: 'MedBottle Smart Humidifier 2.5L', brand: 'MedBottle', category: 'Для дома', price: 6990, image: '💧', specs: { capacity: '2.5L', coverage: '250 sq.ft', duration: '50h' }, inStock: true, description: 'Умный увлажнитель MedBottle 2.5 л с контролем влажности. До 50 часов работы, тихий режим.' },

  // Dehumidifiers
  { id: 'arellapro', name: 'Arella Pro 30L Dehumidifier', brand: 'Arella', category: 'Для дома', price: 24900, image: '💧', specs: { capacity: '30L/day', coverage: '100 sq.ft', energy_efficient: 'Yes' }, inStock: true, description: 'Осушитель воздуха Arella Pro производительностью 30 л/сутки. Для помещений до 100 м², энергоэффективный.' },

  // Coffee Makers
  { id: 'nespresso', name: 'Nespresso Vertuo Plus Coffee Machine Piano Black', brand: 'Nespresso', category: 'Для дома', price: 12990, image: '☕', specs: { capacity: '1.2L', brewing_system: 'Vertuo', colors: '5' }, inStock: true, description: 'Капсульная кофемашина Nespresso Vertuo Plus. Технология Centrifusion, 5 размеров чашки, бак 1.2 л.' },
  { id: 'dysonmashup', name: 'Nespresso DeLonghi Lattissima Black', brand: 'DeLonghi', category: 'Для дома', price: 9990, image: '☕', specs: { capacity: '1L', steaming: 'Automatic', color: 'Black' }, inStock: true, description: 'Капсульная кофемашина DeLonghi Lattissima с автоматическим капучинатором. Компактная, ёмкость 1 л.' },

  // Vacuum Cleaners (Dyson alternatives)
  { id: 'sharkuv', name: 'Shark Navigator NV752 Upright Vacuum', brand: 'Shark', category: 'Для дома', price: 14990, image: '🧹', specs: { power: 'Advanced swivel steering', bagless: 'Yes', capacity: '0.98L' }, inStock: true, description: 'Вертикальный пылесос Shark Navigator NV752 с технологией Swivel Steering. Безмешковый, HEPA-фильтр.' },

  // Washing Machine Accessories
  { id: 'lg_detergent', name: 'LG Washer Detergent Capsule 200 Count', brand: 'LG', category: 'Для дома', price: 4990, image: '🧴', specs: { count: '200 capsules', formula: 'All-in-1', type: 'Front-loader compatible' }, inStock: true, description: 'Капсулы для стирки LG, 200 штук. Формула All-in-1, совместимы с фронтальными стиральными машинами.' },

  // More Gaming related
  { id: 'ps5controller', name: 'PlayStation 5 DualSense Controller White', brand: 'Sony', category: 'Игровые консоли', price: 8990, image: '🎮', specs: { connectivity: 'Wireless', vibration: 'Haptic Feedback', color: 'White' }, inStock: true, description: 'Беспроводной контроллер PlayStation 5 DualSense с тактильной обратной связью и адаптивными триггерами.' },
  { id: 'xboxcontroller', name: 'Xbox Series X|S Wireless Controller Black', brand: 'Microsoft', category: 'Игровые консоли', price: 7990, image: '🎮', specs: { connectivity: 'Wireless', battery: 'AA x2', color: 'Black' }, inStock: true, description: 'Беспроводной контроллер Xbox Series с текстурными рукоятками. Bluetooth, USB-C, до 40 часов работы.' },

  // Nintendo Pro Controller
  
  
  
  { id: 'wifiax200', name: 'TP-Link AX3000 WiFi 6 Router', brand: 'TP-Link', category: 'Сетевое оборудование', price: 9990, image: '📡', specs: { standard: 'WiFi 6 (802.11ax)', speed: '3000 Mbps', coverage: '3000 sq.ft' }, inStock: true, description: 'Wi-Fi 6 роутер TP-Link AX3000 с двумя диапазонами. Скорость до 3000 Мбит/с, покрытие 3000 кв.фт.' },
  { id: 'meshwifi', name: 'ASUS AiMesh WiFi 6 System 3-Pack', brand: 'ASUS', category: 'Сетевое оборудование', price: 19990, image: '📡', specs: { standard: 'WiFi 6', coverage: '5000+ sq.ft', nodes: '3' }, inStock: true, description: 'Mesh-система ASUS AiMesh Wi-Fi 6 из 3 модулей. Покрытие 5000+ кв.фт, бесшовный роуминг.' },

  // USB Flash Drives
  
  
  
  
  
  
  
  { id: 'tizenphone', name: 'Samsung Galaxy Watch 4 Classic 42mm', brand: 'Samsung', category: 'Часы', price: 19990, image: '⌚', specs: { display: 'AMOLED 1.4"', os: 'Wear OS 3', battery: '2+ days' }, inStock: true, description: 'Умные часы Samsung Galaxy Watch 4 Classic с вращающимся безелем. BIA-датчик, ЭКГ, Wear OS.' }
];
