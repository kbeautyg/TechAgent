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
  
  { id: 'iph15pm256w', name: 'iPhone 15 Pro Max 256GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  { id: 'iph15pm256n', name: 'iPhone 15 Pro Max 256GB Natural Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'Natural Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  
  { id: 'iph15pm512w', name: 'iPhone 15 Pro Max 512GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 179900, image: '📱', specs: { storage: '512GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  
  { id: 'iph15p256b', name: 'iPhone 15 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  { id: 'iph15p512b', name: 'iPhone 15 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  { id: 'iph15p1tb', name: 'iPhone 15 Pro 1TB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '1TB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: false, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },

  // iPhone 14 Series
  { id: 'iph14pm256b', name: 'iPhone 14 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный смартфон Apple с чипом A16 Bionic, титановым корпусом и системой камер Pro. Отличное соотношение цены и качества для профессиональной фотографии.' },
  { id: 'iph14pm512b', name: 'iPhone 14 Pro Max 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный смартфон Apple с чипом A16 Bionic, титановым корпусом и системой камер Pro. Отличное соотношение цены и качества для профессиональной фотографии.' },
  { id: 'iph14p256b', name: 'iPhone 14 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный смартфон Apple с чипом A16 Bionic, титановым корпусом и системой камер Pro. Отличное соотношение цены и качества для профессиональной фотографии.' },
  { id: 'iph14p512b', name: 'iPhone 14 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный смартфон Apple с чипом A16 Bionic, титановым корпусом и системой камер Pro. Отличное соотношение цены и качества для профессиональной фотографии.' },

  // iPhone 13 Series
  
  
  
  { id: 'iph12pm256b', name: 'iPhone 12 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A14 Bionic' }, inStock: true, description: 'Надежный смартфон Apple с чипом A14 Bionic, поддержкой 5G и системой Pro-камер. Стильный дизайн с плоскими краями.' },
  { id: 'iph12p256b', name: 'iPhone 12 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A14 Bionic' }, inStock: true, description: 'Надежный смартфон Apple с чипом A14 Bionic, поддержкой 5G и системой Pro-камер. Стильный дизайн с плоскими краями.' },

  // Samsung Galaxy S25 Series
  { id: 'sgts25u256b', name: 'Samsung Galaxy S25 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Премиальный смартфон Samsung с процессором Snapdragon 8 Elite и ИИ-функциями Galaxy AI. Стилус S Pen в комплекте, камера 200 Мп.' },
  { id: 'sgts25u512b', name: 'Samsung Galaxy S25 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Премиальный смартфон Samsung с процессором Snapdragon 8 Elite и ИИ-функциями Galaxy AI. Стилус S Pen в комплекте, камера 200 Мп.' },
  { id: 'sgts25u256t', name: 'Samsung Galaxy S25 Ultra 256GB Titanium', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Titanium', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Премиальный смартфон Samsung с процессором Snapdragon 8 Elite и ИИ-функциями Galaxy AI. Стилус S Pen в комплекте, камера 200 Мп.' },
  { id: 'sgts25p256b', name: 'Samsung Galaxy S25+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Флагманский смартфон Samsung с Snapdragon 8 Elite и функциями Galaxy AI. Мощная производительность и отличная камера.' },
  { id: 'sgts25p512b', name: 'Samsung Galaxy S25+ 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Флагманский смартфон Samsung с Snapdragon 8 Elite и функциями Galaxy AI. Мощная производительность и отличная камера.' },
  { id: 'sgts25256b', name: 'Samsung Galaxy S25 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Универсальный смартфон Samsung с процессором Snapdragon 8 Elite и Galaxy AI. Хорошее соотношение цены и производительности.' },
  { id: 'sgts25512b', name: 'Samsung Galaxy S25 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Универсальный смартфон Samsung с процессором Snapdragon 8 Elite и Galaxy AI. Хорошее соотношение цены и производительности.' },

  // Samsung Galaxy S24 Series
  { id: 'sgts24u256b', name: 'Samsung Galaxy S24 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Премиальный смартфон Samsung с Snapdragon 8 Gen 3 и функциями Galaxy AI. S Pen, камера 200 Мп, идеален для профессионалов.' },
  { id: 'sgts24u512b', name: 'Samsung Galaxy S24 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Премиальный смартфон Samsung с Snapdragon 8 Gen 3 и функциями Galaxy AI. S Pen, камера 200 Мп, идеален для профессионалов.' },
  { id: 'sgts24p256b', name: 'Samsung Galaxy S24+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Флагман Samsung с Snapdragon 8 Gen 3 и улучшенной камерой. Galaxy AI функции, быстрая зарядка 45W.' },
  { id: 'sgts24256b', name: 'Samsung Galaxy S24 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Производительный смартфон Samsung с Snapdragon 8 Gen 3. Galaxy AI функции, отличная база для большинства пользователей.' },

  // Samsung Galaxy S23 Series
  { id: 'sgts23u256b', name: 'Samsung Galaxy S23 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Премиальный флагман Samsung с Snapdragon 8 Gen 2 и мощной камерой 200 Мп. S Pen и функции Galaxy AI.' },
  { id: 'sgts23p256b', name: 'Samsung Galaxy S23+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.6"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Смартфон Samsung с Snapdragon 8 Gen 2, отличной камерой и поддержкой S Pen. Надежный выбор для требовательных пользователей.' },
  { id: 'sgts23256b', name: 'Samsung Galaxy S23 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Стабильный смартфон Samsung с Snapdragon 8 Gen 2 и хорошей камерой. Отличное соотношение цены и производительности.' },

  // Samsung Galaxy Z Fold
  { id: 'sgzfold6256', name: 'Samsung Galaxy Z Fold 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 259900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Складной смартфон Samsung с гибким 7.6" дисплеем. Мощность флагмана в уникальном форм-факторе.' },
  { id: 'sgzfold5256', name: 'Samsung Galaxy Z Fold 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Складной смартфон Samsung с гибким 7.6" дисплеем. Мощность флагмана в уникальном форм-факторе.' },

  // Samsung Galaxy Z Flip
  { id: 'sgzflip6256', name: 'Samsung Galaxy Z Flip 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Компактный складной смартфон Samsung с внешним экраном FlexWindow. Стильный дизайн и флагманская производительность.' },
  { id: 'sgzflip5256', name: 'Samsung Galaxy Z Flip 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Компактный складной смартфон Samsung с внешним экраном FlexWindow. Стильный дизайн и флагманская производительность.' },

  // Xiaomi 14 Series
  { id: 'xm14ult512b', name: 'Xiaomi 14 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Смартфон Xiaomi с камерой Leica и AMOLED дисплеем 120 Гц. Быстрая зарядка 120W, отличное соотношение цена/качество.' },
  { id: 'xm14512b', name: 'Xiaomi 14 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Производительный смартфон Xiaomi с Snapdragon 8 Gen 3 Leading. Камера Leica и быстрая зарядка.' },

  // Xiaomi 13 Series
  { id: 'xm13ult512b', name: 'Xiaomi 13 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Флагманский смартфон Xiaomi с камерой Leica. AMOLED дисплей 120 Гц, мощный процессор Snapdragon 8 Gen 2.' },
  { id: 'xm13512b', name: 'Xiaomi 13 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 8 Gen 2 и AMOLED дисплеем. Хороший выбор для любителей производительности.' },

  // Xiaomi Redmi Note Series
  { id: 'xmrn14p256b', name: 'Xiaomi Redmi Note 14 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Смартфон среднего класса Xiaomi с Snapdragon 7s Gen 2 и AMOLED дисплеем 120 Гц. Быстрая зарядка 120W.' },
  { id: 'xmrn14p512b', name: 'Xiaomi Redmi Note 14 Pro 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Смартфон среднего класса Xiaomi с Snapdragon 7s Gen 2 и AMOLED дисплеем 120 Гц. Быстрая зарядка 120W.' },
  { id: 'xmrn13p256b', name: 'Xiaomi Redmi Note 13 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 7 Gen 2 и AMOLED экраном. Быстрая зарядка, хорошая цена.' },
  { id: 'xmrn13256b', name: 'Xiaomi Redmi Note 13 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 24900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 685' }, inStock: true, description: 'Бюджетный смартфон Xiaomi с хорошим AMOLED дисплеем и процессором Snapdragon 685.' },

  // Xiaomi Poco Series
  { id: 'xmpf6256b', name: 'Xiaomi Poco F6 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 8s Gen 3' }, inStock: true, description: 'Смартфон Xiaomi с Snapdragon 8s Gen 3 по доступной цене. Отличная производительность и быстрая зарядка.' },
  { id: 'xmpf5256b', name: 'Xiaomi Poco F5 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Смартфон Xiaomi Poco с Snapdragon 7 Gen 2 и хорошей батареей. Отличное соотношение цены и производительности.' },

  // Xiaomi Pad Series
  { id: 'xmpadp12s256b', name: 'Xiaomi Pad Pro 12 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 64900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '12.8" OLED', chip: 'Snapdragon 8 Gen 1 Leading' }, inStock: true, description: 'Планшет Xiaomi с OLED дисплеем 12.8" и мощным процессором. Идеален для работы и развлечений.' },
  { id: 'xmpad7256b', name: 'Xiaomi Pad 7 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '11.5" LCD', chip: 'MediaTek Kompanio 1300T' }, inStock: true, description: 'Планшет Xiaomi с дисплеем 11.5" и мощным процессором. Хороший выбор для работы и контента.' },

  // MacBook Air M3
  { id: 'macbookairm3256', name: 'MacBook Air 13" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'Компактный ноутбук Apple на чипе M3 с дисплеем 13.3" Retina. Мощность и портативность.' },
  { id: 'macbookairm3512', name: 'MacBook Air 13" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 119900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'Компактный ноутбук Apple на чипе M3 с дисплеем 13.3" Retina. Мощность и портативность.' },
  { id: 'macbookairm315256', name: 'MacBook Air 15" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 124900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'Мощный ноутбук Apple на чипе M3 с дисплеем 15" Retina. Отличный выбор для работы и творчества.' },
  { id: 'macbookairm315512', name: 'MacBook Air 15" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 144900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'Мощный ноутбук Apple на чипе M3 с дисплеем 15" Retina. Отличный выбор для работы и творчества.' },

  // MacBook Air M2
  { id: 'macbookairm2256', name: 'MacBook Air 13" M2 256GB', brand: 'Apple', category: 'Ноутбуки', price: 89900, image: '💻', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'Ноутбук Apple на чипе M2 с дисплеем 13.3" Retina. Идеален для работы и творчества.' },
  { id: 'macbookairm2512', name: 'MacBook Air 13" M2 512GB', brand: 'Apple', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'Ноутбук Apple на чипе M2 с дисплеем 13.3" Retina. Идеален для работы и творчества.' },

  // MacBook Pro 14"
  { id: 'macbookpro14m3256', name: 'MacBook Pro 14" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'Профессиональный ноутбук Apple на чипе M3 Pro с Liquid Retina XDR дисплеем. До 18 часов работы от батареи.' },
  { id: 'macbookpro14m3512', name: 'MacBook Pro 14" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 169900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'Профессиональный ноутбук Apple на чипе M3 Pro с Liquid Retina XDR дисплеем. До 18 часов работы от батареи.' },
  { id: 'macbookpro14m3pro512', name: 'MacBook Pro 14" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '14.2" Retina' }, inStock: true, description: 'Профессиональный ноутбук Apple на чипе M3 Pro с Liquid Retina XDR дисплеем. До 18 часов работы от батареи.' },
  { id: 'macbookpro14m3max512', name: 'MacBook Pro 14" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '14.2" Retina' }, inStock: true, description: 'Профессиональный ноутбук Apple на чипе M3 Pro с Liquid Retina XDR дисплеем. До 18 часов работы от батареи.' },

  // MacBook Pro 16"
  { id: 'macbookpro16m3pro512', name: 'MacBook Pro 16" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 229900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '16" Retina' }, inStock: true, description: 'Мощный ноутбук Apple на чипе M3 Max с дисплеем Liquid Retina XDR. Производительность для требовательных задач.' },
  { id: 'macbookpro16m3max512', name: 'MacBook Pro 16" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'Мощный ноутбук Apple на чипе M3 Max с дисплеем Liquid Retina XDR. Производительность для требовательных задач.' },
  { id: 'macbookpro16m3max1tb', name: 'MacBook Pro 16" M3 Max 1TB', brand: 'Apple', category: 'Ноутбуки', price: 299900, image: '💻', specs: { storage: '1TB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'Мощный ноутбук Apple на чипе M3 Max с дисплеем Liquid Retina XDR. Производительность для требовательных задач.' },

  // iPad Pro 11"
  { id: 'ipadpro11256', name: 'iPad Pro 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 109900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с мощным процессором и дисплеем Liquid Retina XDR 11". Компактный и мощный.' },
  
  
  { id: 'ipadpro13256', name: 'iPad Pro 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 139900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'ipadpro13512', name: 'iPad Pro 13" 512GB', brand: 'Apple', category: 'Планшеты', price: 159900, image: '📱', specs: { storage: '512GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // iPad Air
  { id: 'ipadair11256', name: 'iPad Air 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 79900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с хорошим дисплеем и мощным процессором. Поддержка Apple Pencil, идеален для работы.' },
  { id: 'ipadair11512', name: 'iPad Air 11" 512GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с хорошим дисплеем и мощным процессором. Поддержка Apple Pencil, идеален для работы.' },
  { id: 'ipadair13256', name: 'iPad Air 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13" Liquid Retina' }, inStock: true, description: 'Планшет Apple с хорошим дисплеем и мощным процессором. Поддержка Apple Pencil, идеален для работы.' },

  // iPad Mini
  { id: 'ipadmini128', name: 'iPad Mini 128GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '128GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'Компактный планшет Apple с хорошей производительностью. Идеален для тех, кто ценит портативность.' },
  { id: 'ipadmini256', name: 'iPad Mini 256GB', brand: 'Apple', category: 'Планшеты', price: 59900, image: '📱', specs: { storage: '256GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'Компактный планшет Apple с хорошей производительностью. Идеален для тех, кто ценит портативность.' },

  // iPad (regular)
  { id: 'ipad64', name: 'iPad 64GB', brand: 'Apple', category: 'Планшеты', price: 34900, image: '📱', specs: { storage: '64GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'Планшет Apple с хорошим дисплеем и производительностью. Отличное соотношение цены и возможностей.' },
  { id: 'ipad256', name: 'iPad 256GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '256GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'Планшет Apple с хорошим дисплеем и производительностью. Отличное соотношение цены и возможностей.' },

  // AirPods 2
  { id: 'airpods2', name: 'AirPods 2', brand: 'Apple', category: 'Наушники', price: 12900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'Беспроводные наушники Apple с хорошим звуком и быстрым подключением. До 6 часов прослушивания, удобные для использования.' },
  { id: 'airpods2c', name: 'AirPods 2 with Charging Case', brand: 'Apple', category: 'Наушники', price: 14900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'Беспроводные наушники Apple с хорошим звуком и быстрым подключением. До 6 часов прослушивания, удобные для использования.' },

  // AirPods 3
  { id: 'airpods3', name: 'AirPods 3', brand: 'Apple', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'Беспроводные наушники Apple с хорошим звуком и быстрым подключением. До 6 часов прослушивания, удобные для использования.' },
  { id: 'airpods3c', name: 'AirPods 3 with Charging Case', brand: 'Apple', category: 'Наушники', price: 21900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'Беспроводные наушники Apple с хорошим звуком и быстрым подключением. До 6 часов прослушивания, удобные для использования.' },

  // AirPods Pro
  { id: 'airpodspro', name: 'AirPods Pro', brand: 'Apple', category: 'Наушники', price: 24900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes' }, inStock: true, description: 'Беспроводные наушники Apple с активным шумоподавлением и адаптивным звуком. До 6 часов прослушивания, зарядный чехол с USB-C.' },
  { id: 'airpodspro2', name: 'AirPods Pro 2', brand: 'Apple', category: 'Наушники', price: 29900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes', spatial: 'Yes' }, inStock: true, description: 'Беспроводные наушники Apple с активным шумоподавлением и адаптивным звуком. До 6 часов прослушивания, зарядный чехол с USB-C.' },

  // AirPods Max
  { id: 'airpodsmax', name: 'AirPods Max', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Silver', spatial: 'Yes', anc: 'Active' }, inStock: true, description: 'Над-ушные наушники Apple с чипом H2 и активным шумоподавлением. До 20 часов работы, поддержка пространственного звука.' },
  { id: 'airpodsmaxb', name: 'AirPods Max Blue', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Blue', spatial: 'Yes', anc: 'Active' }, inStock: false, description: 'Над-ушные наушники Apple с чипом H2 и активным шумоподавлением. До 20 часов работы, поддержка пространственного звука.' },

  // Apple Watch Series 9
  { id: 'aw9s41m', name: 'Apple Watch Series 9 41mm Midnight', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'aw9s45m', name: 'Apple Watch Series 9 45mm Midnight', brand: 'Apple', category: 'Часы', price: 39900, image: '⌚', specs: { size: '45mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'aw9s41g', name: 'Apple Watch Series 9 41mm Gold', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Gold', band: 'Sport Band' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Apple Watch Ultra 2
  { id: 'awu2gps', name: 'Apple Watch Ultra 2 GPS Titanium', brand: 'Apple', category: 'Часы', price: 84900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', gps: 'Yes' }, inStock: true, description: 'Спортивные умные часы Apple для экстремальных условий. Прочный корпус из титана, длительная батарея.' },
  { id: 'awu2cel', name: 'Apple Watch Ultra 2 Cellular Titanium', brand: 'Apple', category: 'Часы', price: 99900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', cellular: 'Yes' }, inStock: true, description: 'Спортивные умные часы Apple для экстремальных условий. Прочный корпус из титана, длительная батарея.' },

  // Apple Watch SE
  { id: 'awse2', name: 'Apple Watch SE 2 40mm Midnight', brand: 'Apple', category: 'Часы', price: 19900, image: '⌚', specs: { size: '40mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Доступные умные часы Apple с основными функциями здоровья. Хорошее соотношение цены и возможностей.' },
  { id: 'awse2s', name: 'Apple Watch SE 2 44mm Midnight', brand: 'Apple', category: 'Часы', price: 22900, image: '⌚', specs: { size: '44mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Доступные умные часы Apple с основными функциями здоровья. Хорошее соотношение цены и возможностей.' },

  // Samsung Galaxy Watch
  { id: 'sgw6cl', name: 'Samsung Galaxy Watch 6 Classic Silver', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Silver', band: 'Sport Band' }, inStock: true, description: 'Умные часы Samsung с AMOLED дисплеем и Wear OS. Мониторинг здоровья, хорошая батарея.' },
  { id: 'sgw6clb', name: 'Samsung Galaxy Watch 6 Classic Black', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Black', band: 'Sport Band' }, inStock: true, description: 'Умные часы Samsung с AMOLED дисплеем и Wear OS. Мониторинг здоровья, хорошая батарея.' },
  { id: 'sgw7', name: 'Samsung Galaxy Watch 7 Gold', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Gold', band: 'Sport Band', ai: 'Yes' }, inStock: true, description: 'Умные часы Samsung с датчиком BIA и мониторингом сна. Wear OS, безель для навигации.' },

  // Samsung Galaxy Buds
  
  { id: 'sgbuds3p', name: 'Samsung Galaxy Buds3 Pro Silver', brand: 'Samsung', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '26h', color: 'Silver', anc: 'Active', ips: 'IPX7' }, inStock: true, description: 'Беспроводные наушники Samsung с ANC и звуком AKG. До 8 часов прослушивания, IPX7.' },
  { id: 'sgbuds2pro', name: 'Samsung Galaxy Buds2 Pro Phantom Silver', brand: 'Samsung', category: 'Наушники', price: 14900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '29h', color: 'Silver', anc: 'Active' }, inStock: true, description: 'Беспроводные наушники Samsung с хорошей изоляцией и звуком. Удобны для повседневного использования.' },

  // Sony WH-1000XM5
  { id: 'sonywh1000xm5b', name: 'Sony WH-1000XM5 Black', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Black', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Премиальные наушники Sony с лучшим в классе шумоподавлением. 30 часов автономности, LDAC кодек.' },
  { id: 'sonywh1000xm5s', name: 'Sony WH-1000XM5 Silver', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Silver', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Премиальные наушники Sony с лучшим в классе шумоподавлением. 30 часов автономности, LDAC кодек.' },

  // Sony WF-1000XM5
  
  
  
  { id: 'sonya7rb', name: 'Sony Alpha 7R V Black', brand: 'Sony', category: 'Камеры', price: 419900, image: '📷', specs: { sensor: 'Full Frame', megapixels: '61MP', video: '8K 24p', display: 'Fixed 3.2"' }, inStock: false, description: 'Беззеркальная камера Sony с полнокадровым сенсором. Быстрый автофокус, видео 4K 120fps.' },
  
  
  
  
  
  
  
  { id: 'djimini4b', name: 'DJI Mini 4 Pro Fly More Combo', brand: 'DJI', category: 'Камеры', price: 59900, image: '🚁', specs: { weight: '249g', max_flight_time: '34min', video: '4K 60p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'Компактный дрон DJI с хорошей камерой и обнаружением препятствий. До 34 минут полёта.' },
  { id: 'djiair3', name: 'DJI Air 3 Fly More Combo', brand: 'DJI', category: 'Камеры', price: 99900, image: '🚁', specs: { weight: '907g', max_flight_time: '46min', video: '4K 60p', sensor: 'Dual 4/3 CMOS' }, inStock: true, description: 'Дрон DJI с камерой Hasselblad и системой обнаружения препятствий. До 46 минут полёта, видео 5.1K.' },
  { id: 'djimavic3', name: 'DJI Mavic 3 Classic Fly More Combo', brand: 'DJI', category: 'Камеры', price: 189900, image: '🚁', specs: { weight: '895g', max_flight_time: '46min', video: '4K 120p', sensor: '4/3 CMOS' }, inStock: true, description: 'Дрон DJI с камерой Hasselblad и системой обнаружения препятствий. До 46 минут полёта, видео 5.1K.' },
  { id: 'djiavata', name: 'DJI Avata 2 Fly More Combo', brand: 'DJI', category: 'Камеры', price: 159900, image: '🚁', specs: { weight: '410g', max_flight_time: '23min', video: '1080p 120p', type: 'FPV Drone' }, inStock: true, description: 'Дрон DJI с камерой Hasselblad и системой обнаружения препятствий. До 46 минут полёта, видео 5.1K.' },

  // DJI Osmo
  
  { id: 'ps5be', name: 'PlayStation 5 Console Bundle', brand: 'Sony', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', vr: 'PSVR2' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'ps5de', name: 'PlayStation 5 Digital Edition', brand: 'Sony', category: 'Игровые консоли', price: 44900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', digital: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'ps5pro', name: 'PlayStation 5 Pro', brand: 'Sony', category: 'Игровые консоли', price: 79900, image: '🎮', specs: { storage: '2TB', cpu: 'Custom Zen 2 8-core', gpu: 'Enhanced GPU', vr: 'PSVR2' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Xbox Series X
  { id: 'xboxsx', name: 'Xbox Series X', brand: 'Microsoft', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '1TB', cpu: 'Custom Zen 2 8-core', gpu: '12 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'xboxss', name: 'Xbox Series S', brand: 'Microsoft', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { storage: '512GB', cpu: 'Custom Zen 2 8-core', gpu: '4 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Nintendo Switch
  { id: 'switcholed', name: 'Nintendo Switch OLED White', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'White' }, inStock: true, description: 'Игровая консоль Nintendo с OLED дисплеем 7" для игр дома и в дороге. Библиотека эксклюзивных игр, до 9 часов автономности.' },
  { id: 'switcholedred', name: 'Nintendo Switch OLED Red', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'Red' }, inStock: true, description: 'Игровая консоль Nintendo с OLED дисплеем 7" для игр дома и в дороге. Библиотека эксклюзивных игр, до 9 часов автономности.' },
  
  
  
  
  
  { id: 'dysonairwrapc', name: 'Dyson Airwrap Complete', brand: 'Dyson', category: 'Бытовая техника', price: 59900, image: '💈', specs: { heat: 'Intelligent', rotation: 'Oscillating', battery: 'Cordless', attachments: '6' }, inStock: true, description: 'Премиальная бытовая техника Dyson с инновационной технологией. Мощное всасывание, HEPA фильтрация.' },

  // Dyson Supersonic
  { id: 'dysonsupersonicb', name: 'Dyson Supersonic Black', brand: 'Dyson', category: 'Бытовая техника', price: 34900, image: '💈', specs: { heat: 'Intelligent', motor: 'Digital V9', speed: '110,000rpm', color: 'Black' }, inStock: true, description: 'Премиальная бытовая техника Dyson с инновационной технологией. Мощное всасывание, HEPA фильтрация.' },

  // Dyson Purifier
  
  { id: 'sgtvqn65b', name: 'Samsung QN85 65" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 84900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'sgtvqn75b', name: 'Samsung QN85 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 124900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'sgtvqn85b', name: 'Samsung QN85 85" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // LG TV
  
  { id: 'lgtvoledc', name: 'LG OLED65 65" 4K', brand: 'LG', category: 'Телевизоры', price: 119900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'lgtvoled75', name: 'LG OLED75 75" 4K', brand: 'LG', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // More Xiaomi Mi Band
  { id: 'xiamibanda8', name: 'Xiaomi Mi Band 8', brand: 'Xiaomi', category: 'Часы', price: 4990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '16 days', waterproof: '5ATM' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'xiamibanda7', name: 'Xiaomi Mi Band 7', brand: 'Xiaomi', category: 'Часы', price: 3990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '14 days', waterproof: '5ATM' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Samsung Galaxy Tab
  { id: 'sgtabs10256', name: 'Samsung Galaxy Tab S10 256GB', brand: 'Samsung', category: 'Планшеты', price: 69900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 3 Leading', storage: '256GB' }, inStock: true, description: 'Планшет Samsung с AMOLED дисплеем 11" и стилусом S Pen. Хороший выбор для работы и развлечений.' },
  { id: 'sgtabs9ultra', name: 'Samsung Galaxy Tab S9 Ultra 256GB', brand: 'Samsung', category: 'Планшеты', price: 99900, image: '📱', specs: { size: '14.6"', resolution: '2K', chip: 'Snapdragon 8 Gen 2', storage: '256GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'sgtabs8', name: 'Samsung Galaxy Tab S8 128GB', brand: 'Samsung', category: 'Планшеты', price: 49900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 1', storage: '128GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // More AirPods variants
  
  
  { id: 'sgbudslive', name: 'Samsung Galaxy Buds Live Black', brand: 'Samsung', category: 'Наушники', price: 10900, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '29h', color: 'Black', anc: 'Active' }, inStock: true, description: 'Беспроводные наушники Samsung с хорошей изоляцией и звуком. Удобны для повседневного использования.' },

  // More Sony headphones
  { id: 'sonywh900nb', name: 'Sony WH-900N Black', brand: 'Sony', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '35h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Наушники Sony с качественным звуком и шумоподавлением. Удобны для длительного использования.' },

  // Sennheiser Momentum
  
  { id: 'bosequc45', name: 'Bose QuietComfort 45 Black', brand: 'Bose', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '24h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // More Galaxy Watch models
  { id: 'sgw6sm', name: 'Samsung Galaxy Watch 6 Silver', brand: 'Samsung', category: 'Часы', price: 24900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Silver' }, inStock: true, description: 'Умные часы Samsung с AMOLED дисплеем и Wear OS. Мониторинг здоровья, хорошая батарея.' },
  { id: 'sgw5pro', name: 'Samsung Galaxy Watch 5 Pro Titanium', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '45mm', display: 'AMOLED', color: 'Titanium' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Garmin Smartwatches
  { id: 'garminepix', name: 'Garmin Epix Gen 2 Titanium', brand: 'Garmin', category: 'Часы', price: 59900, image: '⌚', specs: { display: '1.3" AMOLED', battery: '12 days', size: '47mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'garminfe965', name: 'Garmin Fenix 7X Titanium', brand: 'Garmin', category: 'Часы', price: 79900, image: '⌚', specs: { display: '1.4" AMOLED', battery: '21 days', size: '55mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // OnePlus Phones
  { id: 'oneplus12256', name: 'OnePlus 12 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'oneplus12512', name: 'OnePlus 12 512GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'oneplus11256', name: 'OnePlus 11 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 59900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Google Pixel Phones
  { id: 'pixel9pro256', name: 'Google Pixel 9 Pro 256GB Black', brand: 'Google', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'pixel9pro512', name: 'Google Pixel 9 Pro 512GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'pixel9promax256', name: 'Google Pixel 9 Pro Max 256GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Google Tensor G4' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Motorola Razr Foldable
  { id: 'motorola_razr_2024', name: 'Motorola Razr 50 Ultra 512GB', brand: 'Motorola', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9" Foldable', chip: 'Snapdragon 8s Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Huawei P70
  { id: 'huaweip70pro512', name: 'Huawei P70 Pro 512GB Black', brand: 'Huawei', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Kirin 9010' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Nothing Phone
  { id: 'nothing2a256', name: 'Nothing Phone 2a 256GB Black', brand: 'Nothing', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'MediaTek Dimensity 7200 Pro' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // ASUS ROG Phone
  { id: 'asurog9pro512', name: 'ASUS ROG Phone 9 Pro 512GB', brand: 'ASUS', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78" 240Hz', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Lenovo ThinkPad
  { id: 'lenox1carbonm4', name: 'Lenovo ThinkPad X1 Carbon 14 M4', brand: 'Lenovo', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'lenovox1carbonm3', name: 'Lenovo ThinkPad X1 Carbon 14 M3', brand: 'Lenovo', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Dell XPS
  { id: 'dellxps13', name: 'Dell XPS 13 9340', brand: 'Dell', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 7', ram: '32GB', display: '13.4" OLED' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'dellxps15', name: 'Dell XPS 15 9540', brand: 'Dell', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 9', ram: '32GB', display: '15.6" OLED' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // ASUS VivoBook
  { id: 'asusvivobook15', name: 'ASUS VivoBook 15 OLED', brand: 'ASUS', category: 'Ноутбуки', price: 69900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 7', ram: '16GB', display: '15.6" OLED' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // HP Pavilion
  { id: 'hppaviliondm15', name: 'HP Pavilion 15 dm0021dx', brand: 'HP', category: 'Ноутбуки', price: 59900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 5', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // MSI GE76 Gaming
  { id: 'msige76', name: 'MSI GE76 Raider RTX 4070', brand: 'MSI', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 165Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // ROG Zephyrus G16
  { id: 'roggm16', name: 'ASUS ROG Zephyrus G16 RTX 4090', brand: 'ASUS', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Razer Blade
  { id: 'razorblade16', name: 'Razer Blade 16 RTX 4090', brand: 'Razer', category: 'Ноутбуки', price: 289900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // iPad Pro with M2
  { id: 'ipadprom211256', name: 'iPad Pro 11" M2 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'Планшет Apple с чипом M2 и дисплеем Liquid Retina XDR 11". Компактный и мощный.' },

  // Samsung Galaxy Tab A
  { id: 'sgtaba13256', name: 'Samsung Galaxy Tab A13 256GB', brand: 'Samsung', category: 'Планшеты', price: 24900, image: '📱', specs: { size: '10.5"', resolution: 'WXGA+', chip: 'MediaTek Helio G99', storage: '256GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Microsoft Surface Pro
  { id: 'surfacepro10', name: 'Microsoft Surface Pro 10 256GB', brand: 'Microsoft', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '13" PixelSense' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Microsoft Surface Laptop Studio
  { id: 'surfacelaptopstudio', name: 'Microsoft Surface Laptop Studio RTX 4090', brand: 'Microsoft', category: 'Ноутбуки', price: 269900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-12', ram: '32GB', gpu: 'RTX 4090', display: '15" 120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // USB-C Hubs and Accessories
  { id: 'ankerusb', name: 'Anker 7-in-1 USB-C Hub Silver', brand: 'Anker', category: 'Аксессуары', price: 4990, image: '🔌', specs: { ports: '7-in-1', power: '100W', color: 'Silver' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  
  { id: 'appleusbclight', name: 'Apple USB-C to Lightning Cable 1m', brand: 'Apple', category: 'Аксессуары', price: 1990, image: '🔌', specs: { length: '1m', connector: 'USB-C to Lightning', color: 'White' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'appleusbcc', name: 'Apple USB-C Charge Cable 2m', brand: 'Apple', category: 'Аксессуары', price: 2990, image: '🔌', specs: { length: '2m', connector: 'USB-C to USB-C', color: 'White' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Phone Cases
  { id: 'otterbox15pm', name: 'OtterBox Defender iPhone 15 Pro Max Black', brand: 'OtterBox', category: 'Аксессуары', price: 4990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'Polycarbonate', color: 'Black', protection: 'Heavy-duty' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },
  { id: 'spigeniphone15pm', name: 'Spigen Tough Armor iPhone 15 Pro Max Black', brand: 'Spigen', category: 'Аксессуары', price: 1990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'TPU', color: 'Black' }, inStock: true, description: 'Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой 48 Мп. Идеальный выбор для тех, кто ценит максимальную производительность.' },

  // Screen Protectors
  
  
  
  
  { id: 'ankerasync', name: 'Anker PowerWave Pad 15W Black', brand: 'Anker', category: 'Аксессуары', price: 2990, image: '🔌', specs: { power: '15W', color: 'Black', standard: 'Qi' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Portable Power Banks
  { id: 'ankerpower20000', name: 'Anker PowerCore 20000 Black', brand: 'Anker', category: 'Аксессуары', price: 3990, image: '🔋', specs: { capacity: '20000mAh', ports: '2 USB-A', color: 'Black' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'applepower20', name: 'Apple MagSafe Battery Pack White', brand: 'Apple', category: 'Аксессуары', price: 4990, image: '🔋', specs: { capacity: '2460mAh', power: '7.5W', color: 'White' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Laptop Stands
  
  
  
  
  
  
  
  { id: 'samsungevob1tb', name: 'Samsung 870 EVO 1TB 2.5" SSD', brand: 'Samsung', category: 'Аксессуары', price: 6990, image: '💾', specs: { capacity: '1TB', interface: 'SATA 2.5"', speed: '560MB/s' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  
  
  { id: 'sgtvq70d', name: 'Samsung Q70D 55" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 64900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'hisenseqledu7g', name: 'Hisense U7G 55" QLED 4K', brand: 'Hisense', category: 'Телевизоры', price: 44900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'tcl98c645', name: 'TCL 98C645 98" 4K Mini-LED', brand: 'TCL', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '98"', resolution: '4K', panel: 'Mini-LED', refresh: '60Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Sony Televisions
  { id: 'sonykx80', name: 'Sony K-85XR80 85" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 399900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'sonybravia', name: 'Sony BRAVIA 7 65" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Ring Lights
  
  
  
  
  
  
  
  
  
  
  { id: 'beyerdt880', name: 'Beyerdynamic DT 880 Pro Studio Headphones', brand: 'Beyerdynamic', category: 'Наушники', price: 11990, image: '🎧', specs: { type: 'Wired', impedance: '250 Ohm', frequency: '5Hz-35kHz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Gaming Headsets
  { id: 'steelseries7', name: 'SteelSeries Arctis 7P+ Wireless Black', brand: 'SteelSeries', category: 'Наушники', price: 12990, image: '🎧', specs: { type: 'Wireless', battery: '24h', platform: 'Multi-platform' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'logitusg733', name: 'Logitech G733 Wireless Gaming Headset Black', brand: 'Logitech', category: 'Наушники', price: 9990, image: '🎧', specs: { type: 'Wireless', battery: '29h', color: 'Black' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // DJI Mini 3 Pro
  { id: 'djimini3pro', name: 'DJI Mini 3 Pro Fly More Combo', brand: 'DJI', category: 'Камеры', price: 44900, image: '🚁', specs: { weight: '249g', max_flight_time: '38min', video: '4K 30p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'Дрон DJI с камерой Hasselblad и системой обнаружения препятствий. До 46 минут полёта, видео 5.1K.' },

  // GoPro
  { id: 'gopohero12', name: 'GoPro Hero 12 Black Bundle', brand: 'GoPro', category: 'Камеры', price: 39900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 6.0' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'goprohero11', name: 'GoPro Hero 11 Black Bundle', brand: 'GoPro', category: 'Камеры', price: 29900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 5.0' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Insta360
  
  
  
  
  
  
  
  { id: 'dysonsupersonics', name: 'Dyson Supersonic Styling Iron Nickel', brand: 'Dyson', category: 'Бытовая техника', price: 44900, image: '💈', specs: { heat: 'Intelligent', straightening: 'Yes', color: 'Nickel' }, inStock: true, description: 'Премиальная бытовая техника Dyson с инновационной технологией. Мощное всасывание, HEPA фильтрация.' },

  // More Samsung Products
  { id: 'sgtv85', name: 'Samsung S95C 85" OLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'OLED', refresh: '144Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'sgtvq90d', name: 'Samsung QN90D 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Additional iPhones & Older Models
  { id: 'iph16pro', name: 'iPhone 16 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18 Pro' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'iph16promax', name: 'iPhone 16 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A18 Pro' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'iph16256', name: 'iPhone 16 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Oppo Smartphones
  { id: 'oppofind6pro', name: 'Oppo Find X6 Pro 512GB Black', brand: 'Oppo', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Vivo Smartphones
  { id: 'vivox100ultra', name: 'Vivo X100 Ultra 512GB Black', brand: 'Vivo', category: 'Смартфоны', price: 84900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // ZTE Axon
  { id: 'ztaxon70ultra', name: 'ZTE Axon 70 Ultra 512GB Black', brand: 'ZTE', category: 'Смартфоны', price: 49900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Realme
  { id: 'realme12pro', name: 'Realme 12 Pro 512GB Black', brand: 'Realme', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 7 Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Honor Magic
  { id: 'honormagic6pro', name: 'Honor Magic 6 Pro 512GB Black', brand: 'Honor', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // TCL Tablet
  { id: 'tcltab12pro', name: 'TCL Tab Pro Gen 2 12.9" 256GB', brand: 'TCL', category: 'Планшеты', price: 19900, image: '📱', specs: { size: '12.9"', resolution: '1600x2560', chip: 'MediaTek Dimensity 9100', storage: '256GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Lenovo Tablet
  { id: 'lenovotabp12', name: 'Lenovo Tab P12 11.5" 128GB', brand: 'Lenovo', category: 'Планшеты', price: 14990, image: '📱', specs: { size: '11.5"', resolution: '2000x1200', chip: 'MediaTek Kompanio 1300T', storage: '128GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Amazon Tablet
  
  { id: 'huaweimatepadt11', name: 'Huawei MatePad T11 128GB', brand: 'Huawei', category: 'Планшеты', price: 9990, image: '📱', specs: { size: '10.95"', resolution: '1920x1200', chip: 'MediaTek Helio G99', storage: '128GB' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // MSI Laptop
  { id: 'msistealth16ai', name: 'MSI Stealth 16 AI Studio RTX 5090', brand: 'MSI', category: 'Ноутбуки', price: 379900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core Ultra 9', ram: '32GB', gpu: 'RTX 5090', display: '16" 2.5K 144Hz' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Gigabyte
  { id: 'gigaaeroq17', name: 'Gigabyte AERO 17 RTX 4090', brand: 'Gigabyte', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '17" 4K OLED' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // ASUS ProBook
  { id: 'asusprobook15', name: 'ASUS ProBook 15 Core i7', brand: 'ASUS', category: 'Ноутбуки', price: 79900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Clevo
  { id: 'clevop775', name: 'Clevo P775 17" RTX 4070', brand: 'Clevo', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i7-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 144Hz' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Framework Modular
  { id: 'frameworklaptop', name: 'Framework Laptop 16 Core Ultra', brand: 'Framework', category: 'Ноутбуки', price: 129900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '16" 2.8K' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Pixelbook-like Chromebooks
  { id: 'pixelbookgo', name: 'Google Pixelbook Go 128GB Clearly White', brand: 'Google', category: 'Ноутбуки', price: 49900, image: '💻', specs: { storage: '128GB', chip: 'Intel Core m3', display: '13.3" 2K', os: 'Chrome OS' }, inStock: false, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Gaming Monitors
  { id: 'acer272x', name: 'Acer Predator XB272 27" 360Hz', brand: 'Acer', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1080p', refresh: '360Hz', response: '0.5ms' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'asus27pro', name: 'ASUS ProArt PA278QV 27" 100% sRGB', brand: 'ASUS', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1440p', color_accuracy: '99.9% sRGB', response: '5ms' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Ultrawide Monitors
  { id: 'lgultrawide38', name: 'LG UltraWide 38" Curved Monitor', brand: 'LG', category: 'Телевизоры', price: 99900, image: '📺', specs: { size: '38"', resolution: '3840x1600', refresh: '144Hz', curvature: '1440R' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Budget Phone Accessories
  
  { id: 'genericphonestand', name: 'Generic Metal Phone Stand', brand: 'Generic', category: 'Аксессуары', price: 590, image: '📱', specs: { material: 'Metal', adjustable: 'Yes', weight_capacity: '500g' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Keychains & Small Accessories
  { id: 'appleairtagsingle', name: 'Apple AirTag Single', brand: 'Apple', category: 'Аксессуары', price: 3990, image: '🔖', specs: { technology: 'Ultra Wideband', water_resistant: 'Yes', battery: '1 year' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  
  
  
  
  
  
  { id: 'samsungq990b', name: 'Samsung HW-Q990B Soundbar 11.1.4ch', brand: 'Samsung', category: 'Наушники', price: 99900, image: '🔊', specs: { channels: '11.1.4', power: '656W', dolby: 'Atmos' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'jblbar1000pro', name: 'JBL Bar 1000 Pro 3.1.2ch Soundbar', brand: 'JBL', category: 'Наушники', price: 49900, image: '🔊', specs: { channels: '3.1.2', power: '880W', dolby: 'Atmos' }, inStock: true, description: 'Портативная акустика JBL с мощным басом и защитой IP67. До 24 часов работы, PartyBoost.' },

  // Budget Headphones
  { id: 'jbltunebuds', name: 'JBL Tune Buds True Wireless Earbuds', brand: 'JBL', category: 'Наушники', price: 6990, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '24h', anc: 'Yes' }, inStock: true, description: 'Портативная акустика JBL с мощным басом и защитой IP67. До 24 часов работы, PartyBoost.' },
  
  
  { id: 'applemag', name: 'Apple Magic Keyboard + Mouse Bundle Space Gray', brand: 'Apple', category: 'Аксессуары', price: 12990, image: '⌨️', specs: { keyboard: 'Wireless', mouse: 'Magic Mouse 2', color: 'Space Gray' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Mechanical Keyboards
  { id: 'daskeyboard', name: 'Das Keyboard 5Q RGB Mechanical Keyboard', brand: 'Das Keyboard', category: 'Аксессуары', price: 19900, image: '⌨️', specs: { switches: 'Cherry MX', backlight: 'RGB', programmable: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'corsairrk', name: 'Corsair K95 RGB Platinum XT Mechanical', brand: 'Corsair', category: 'Аксессуары', price: 24900, image: '⌨️', specs: { switches: 'Cherry MX Speed', backlight: 'RGB', macro_keys: '6' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Gaming Mice
  { id: 'logicommo', name: 'Logitech G Pro X 2 Lightspeed Gaming Mouse', brand: 'Logitech', category: 'Аксcessуары', price: 7990, image: '🖱️', specs: { dpi: '32000', buttons: '6', weight: '57g' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  
  
  
  
  { id: 'xiaomilamp', name: 'Xiaomi Mi Desk Lamp Pro Smart', brand: 'Xiaomi', category: 'Бытовая техника', price: 4990, image: '💡', specs: { color_temp: '2700-6500K', brightness: 'Adjustable', app_control: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Air Purifiers
  
  { id: 'sharpi3000', name: 'Sharp KC-G50EW Air Purifier', brand: 'Sharp', category: 'Бытовая техника', price: 19900, image: '🌬️', specs: { coverage: '350 sq.ft', filter: 'HEPA', ion: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Humidifiers
  
  { id: 'medbottle', name: 'MedBottle Smart Humidifier 2.5L', brand: 'MedBottle', category: 'Бытовая техника', price: 6990, image: '💧', specs: { capacity: '2.5L', coverage: '250 sq.ft', duration: '50h' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Dehumidifiers
  { id: 'arellapro', name: 'Arella Pro 30L Dehumidifier', brand: 'Arella', category: 'Бытовая техника', price: 24900, image: '💧', specs: { capacity: '30L/day', coverage: '100 sq.ft', energy_efficient: 'Yes' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Coffee Makers
  { id: 'nespresso', name: 'Nespresso Vertuo Plus Coffee Machine Piano Black', brand: 'Nespresso', category: 'Бытовая техника', price: 12990, image: '☕', specs: { capacity: '1.2L', brewing_system: 'Vertuo', colors: '5' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'dysonmashup', name: 'Nespresso DeLonghi Lattissima Black', brand: 'DeLonghi', category: 'Бытовая техника', price: 9990, image: '☕', specs: { capacity: '1L', steaming: 'Automatic', color: 'Black' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Vacuum Cleaners (Dyson alternatives)
  { id: 'sharkuv', name: 'Shark Navigator NV752 Upright Vacuum', brand: 'Shark', category: 'Бытовая техника', price: 14990, image: '🧹', specs: { power: 'Advanced swivel steering', bagless: 'Yes', capacity: '0.98L' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Washing Machine Accessories
  { id: 'lg_detergent', name: 'LG Washer Detergent Capsule 200 Count', brand: 'LG', category: 'Бытовая техника', price: 4990, image: '🧴', specs: { count: '200 capsules', formula: 'All-in-1', type: 'Front-loader compatible' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // More Gaming related
  { id: 'ps5controller', name: 'PlayStation 5 DualSense Controller White', brand: 'Sony', category: 'Игровые консоли', price: 8990, image: '🎮', specs: { connectivity: 'Wireless', vibration: 'Haptic Feedback', color: 'White' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'xboxcontroller', name: 'Xbox Series X|S Wireless Controller Black', brand: 'Microsoft', category: 'Игровые консоли', price: 7990, image: '🎮', specs: { connectivity: 'Wireless', battery: 'AA x2', color: 'Black' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // Nintendo Pro Controller
  
  
  
  { id: 'wifiax200', name: 'TP-Link AX3000 WiFi 6 Router', brand: 'TP-Link', category: 'Аксессуары', price: 9990, image: '📡', specs: { standard: 'WiFi 6 (802.11ax)', speed: '3000 Mbps', coverage: '3000 sq.ft' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },
  { id: 'meshwifi', name: 'ASUS AiMesh WiFi 6 System 3-Pack', brand: 'ASUS', category: 'Аксессуары', price: 19990, image: '📡', specs: { standard: 'WiFi 6', coverage: '5000+ sq.ft', nodes: '3' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' },

  // USB Flash Drives
  
  
  
  
  
  
  
  { id: 'tizenphone', name: 'Samsung Galaxy Watch 4 Classic 42mm', brand: 'Samsung', category: 'Часы', price: 19990, image: '⌚', specs: { display: 'AMOLED 1.4"', os: 'Wear OS 3', battery: '2+ days' }, inStock: true, description: 'Качественное устройство с хорошей производительностью и надежностью. Отличный выбор для вашего использования.' }
];
