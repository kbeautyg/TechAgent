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
  
  { id: 'iph15pm256w', name: 'iPhone 15 Pro Max 256GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'Флагман Apple с чипом A17 Pro и титановым корпусом White Titanium. Камера 48 Мп с оптическим зумом 5x, USB-C с Thunderbolt, дисплей 6.7" Super Retina XDR ProMotion 120 Гц. Запись видео ProRes и пространственное видео для Apple Vision Pro.' },
  { id: 'iph15pm256n', name: 'iPhone 15 Pro Max 256GB Natural Titanium', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '256GB', color: 'Natural Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro Max в утончённом цвете Natural Titanium. Процессор A17 Pro обеспечивает молниеносную работу и консольный уровень графики. Камера 48 Мп с перископным телевиком 5x, Action Button, Always-On дисплей 6.7" ProMotion 120 Гц.' },
  
  { id: 'iph15pm512w', name: 'iPhone 15 Pro Max 512GB White Titanium', brand: 'Apple', category: 'Смартфоны', price: 179900, image: '📱', specs: { storage: '512GB', color: 'White Titanium', display: '6.7"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro Max 512 ГБ — идеальный объём для фото и видео. Чип A17 Pro с аппаратным рейтрейсингом, запись ProRes 4K 60fps прямо на устройство, камера 48 Мп, титановый корпус, дисплей 6.7" Super Retina XDR.' },
  
  { id: 'iph15p256b', name: 'iPhone 15 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'Компактный флагман Apple с чипом A17 Pro в корпусе из титана. Дисплей 6.1" Super Retina XDR ProMotion 120 Гц, камера 48 Мп с тройным модулем, Action Button для быстрого доступа к функциям. USB-C, спутниковая связь SOS, Ceramic Shield.' },
  { id: 'iph15p512b', name: 'iPhone 15 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: true, description: 'iPhone 15 Pro 512 ГБ — просторное хранилище для ProRes-видео и RAW-снимков. Чип A17 Pro, камера 48 Мп с 3x оптическим зумом, Always-On дисплей 6.1" ProMotion 120 Гц, титановый корпус, USB-C Thunderbolt.' },
  { id: 'iph15p1tb', name: 'iPhone 15 Pro 1TB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '1TB', color: 'Black', display: '6.1"', chip: 'A17 Pro' }, inStock: false, description: 'Максимальная конфигурация iPhone 15 Pro с 1 ТБ — для профессионалов видеосъёмки и фотографии. Запись ProRes 4K 60fps без ограничений, чип A17 Pro, камера 48 Мп, Always-On дисплей 6.1", титан, Action Button.' },

  // iPhone 14 Series
  { id: 'iph14pm256b', name: 'iPhone 14 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'Мощный iPhone 14 Pro Max с революционным Dynamic Island и чипом A16 Bionic. Первая 48 Мп камера в iPhone, Always-On дисплей 6.7" ProMotion 120 Гц с яркостью 2000 нит. Система безопасности Crash Detection и спутниковая связь SOS.' },
  { id: 'iph14pm512b', name: 'iPhone 14 Pro Max 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro Max 512 ГБ — расширенное хранилище для видеографов. Чип A16 Bionic, съёмка ProRes и кинематографический режим 4K. Dynamic Island, камера 48 Мп с сенсором-shift OIS, Always-On дисплей 6.7" Super Retina XDR.' },
  { id: 'iph14p256b', name: 'iPhone 14 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro с чипом A16 Bionic и компактным дисплеем 6.1" ProMotion 120 Гц. Dynamic Island заменил чёлку интерактивным элементом. Камера 48 Мп с Photonic Engine, Always-On экран, Crash Detection, спутниковая связь SOS.' },
  { id: 'iph14p512b', name: 'iPhone 14 Pro 512GB Black', brand: 'Apple', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.1"', chip: 'A16 Bionic' }, inStock: true, description: 'iPhone 14 Pro 512 ГБ — расширенное хранилище для фото ProRAW и видео ProRes. Чип A16 Bionic с 5-ядерным GPU, камера 48 Мп с 2x кропом для портретов, Dynamic Island, дисплей 6.1" ProMotion, Always-On.' },

  // iPhone 13 Series
  
  
  
  { id: 'iph12pm256b', name: 'iPhone 12 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A14 Bionic' }, inStock: true, description: 'iPhone 12 Pro Max с чипом A14 Bionic — первый iPhone с поддержкой 5G и Ceramic Shield. Система Pro-камер с LiDAR для ночного портрета и AR. Дисплей 6.7" Super Retina XDR, магниты MagSafe, запись Dolby Vision HDR.' },
  { id: 'iph12p256b', name: 'iPhone 12 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A14 Bionic' }, inStock: true, description: 'Компактный iPhone 12 Pro с чипом A14 Bionic и дисплеем 6.1" Super Retina XDR. Тройная камера Pro с LiDAR-сканером для дополненной реальности, поддержка 5G, MagSafe, защита Ceramic Shield, съёмка Dolby Vision HDR.' },

  // Samsung Galaxy S25 Series
  { id: 'sgts25u256b', name: 'Samsung Galaxy S25 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Samsung Galaxy S25 Ultra — флагман с Snapdragon 8 Elite и камерой 200 Мп. Встроенный S Pen, Galaxy AI для умного перевода и обработки фото, дисплей 6.9" Dynamic AMOLED 2X 120 Гц, титановая рамка, защита IP68.' },
  { id: 'sgts25u512b', name: 'Samsung Galaxy S25 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 Ultra 512 ГБ для профессиональных задач. Snapdragon 8 Elite с ускорителем NPU, камера 200 Мп с 10x зумом, S Pen с AI-функциями, Galaxy AI для суммаризации и перевода, дисплей 6.9" QHD+ 120 Гц.' },
  { id: 'sgts25u256t', name: 'Samsung Galaxy S25 Ultra 256GB Titanium', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Titanium', display: '6.9"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 Ultra в премиальном цвете Titanium. Процессор Snapdragon 8 Elite, S Pen, камера 200 Мп с ИИ-обработкой и 10x оптическим зумом. Galaxy AI, дисплей 6.9" Dynamic AMOLED, защита Gorilla Armor, IP68.' },
  { id: 'sgts25p256b', name: 'Samsung Galaxy S25+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Samsung Galaxy S25+ с Snapdragon 8 Elite и просторным дисплеем 6.7" Dynamic AMOLED 2X. Galaxy AI для умных функций в реальном времени, камера 50 Мп с OIS, быстрая зарядка 45W, беспроводная зарядка, защита IP68.' },
  { id: 'sgts25p512b', name: 'Samsung Galaxy S25+ 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25+ 512 ГБ — расширенное хранилище для фото и видео. Snapdragon 8 Elite, Galaxy AI с функциями суммаризации и перевода, дисплей 6.7" Dynamic AMOLED QHD+ 120 Гц, камера 50 Мп, батарея 4900 мАч.' },
  { id: 'sgts25256b', name: 'Samsung Galaxy S25 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Компактный Samsung Galaxy S25 с дисплеем 6.2" Dynamic AMOLED 2X 120 Гц. Snapdragon 8 Elite обеспечивает топовую производительность, Galaxy AI, камера 50 Мп с улучшенным ночным режимом, 7 лет обновлений.' },
  { id: 'sgts25512b', name: 'Samsung Galaxy S25 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Galaxy S25 512 ГБ — компактный флагман с большим хранилищем для коллекции фото и видео. Snapdragon 8 Elite, Galaxy AI, дисплей 6.2" Dynamic AMOLED 120 Гц, камера 50 Мп, быстрая зарядка 25W, IP68.' },

  // Samsung Galaxy S24 Series
  { id: 'sgts24u256b', name: 'Samsung Galaxy S24 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Samsung Galaxy S24 Ultra с Snapdragon 8 Gen 3 и титановым корпусом. Камера 200 Мп с 5x оптическим зумом, встроенный S Pen, Galaxy AI для перевода звонков в реальном времени, дисплей 6.8" QHD+ Dynamic AMOLED 120 Гц.' },
  { id: 'sgts24u512b', name: 'Samsung Galaxy S24 Ultra 512GB Black', brand: 'Samsung', category: 'Смартфоны', price: 159900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Galaxy S24 Ultra 512 ГБ — максимальный объём памяти для контента. Snapdragon 8 Gen 3, S Pen, камера 200 Мп с AI-обработкой, Galaxy AI для суммаризации и генерации, дисплей 6.8" QHD+, титановая рамка, IP68.' },
  { id: 'sgts24p256b', name: 'Samsung Galaxy S24+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Samsung Galaxy S24+ с Snapdragon 8 Gen 3 и улучшенной камерой 50 Мп. Galaxy AI для перевода звонков и суммаризации, дисплей 6.7" Dynamic AMOLED QHD+ 120 Гц, быстрая зарядка 45W, беспроводная зарядка.' },
  { id: 'sgts24256b', name: 'Samsung Galaxy S24 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.2"', chip: 'Snapdragon 8 Gen 3' }, inStock: true, description: 'Samsung Galaxy S24 с Snapdragon 8 Gen 3 — компактный флагман с Galaxy AI. Дисплей 6.2" Dynamic AMOLED FHD+ 120 Гц, камера 50 Мп с ИИ-обработкой, 7 лет обновлений Android, защита IP68, Gorilla Armor.' },

  // Samsung Galaxy S23 Series
  { id: 'sgts23u256b', name: 'Samsung Galaxy S23 Ultra 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Samsung Galaxy S23 Ultra — премиальный флагман с камерой 200 Мп и Snapdragon 8 Gen 2. Встроенный S Pen, дисплей 6.8" Dynamic AMOLED QHD+ 120 Гц, батарея 5000 мАч, запись 8K видео, защита IP68.' },
  { id: 'sgts23p256b', name: 'Samsung Galaxy S23+ 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.6"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Samsung Galaxy S23+ с Snapdragon 8 Gen 2 и камерой 50 Мп с улучшенным ночным режимом. Дисплей 6.6" Dynamic AMOLED FHD+ 120 Гц, батарея 4700 мАч, быстрая зарядка 45W, защита IP68.' },
  { id: 'sgts23256b', name: 'Samsung Galaxy S23 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Samsung Galaxy S23 с Snapdragon 8 Gen 2 — стабильный компактный флагман. Дисплей 6.1" Dynamic AMOLED FHD+ 120 Гц, камера 50 Мп с OIS, батарея 3900 мАч, защита IP68, 4 года обновлений.' },

  // Samsung Galaxy Z Fold
  { id: 'sgzfold6256', name: 'Samsung Galaxy Z Fold 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 259900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Складной Samsung Galaxy Z Fold 6 с гибким 7.6" Dynamic AMOLED дисплеем и внешним экраном 6.3". Snapdragon 8 Gen 3, Galaxy AI, режим MultiWindow для мультизадачности, FlexMode для видеозвонков, S Pen совместим, IP48.' },
  { id: 'sgzfold5256', name: 'Samsung Galaxy Z Fold 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '7.6" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Samsung Galaxy Z Fold 5 с гибким 7.6" экраном AMOLED 120 Гц. Snapdragon 8 Gen 2, компактнее предшественника благодаря Flex Hinge, FlexMode для камеры и видеозвонков, MultiWindow, внешний экран 6.2" HD+.' },

  // Samsung Galaxy Z Flip
  { id: 'sgzflip6256', name: 'Samsung Galaxy Z Flip 6 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Компактный складной Galaxy Z Flip 6 с увеличенным внешним FlexWindow 3.4" для виджетов и уведомлений. Snapdragon 8 Gen 3, Galaxy AI, камера 50 Мп с OIS, батарея 4000 мАч, защита IP48, стильный дизайн.' },
  { id: 'sgzflip5256', name: 'Samsung Galaxy Z Flip 5 256GB Black', brand: 'Samsung', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7" Foldable', chip: 'Snapdragon 8 Gen 2 for Galaxy' }, inStock: true, description: 'Samsung Galaxy Z Flip 5 с большим внешним экраном 3.4" для быстрого доступа к приложениям. Snapdragon 8 Gen 2, стильный складной дизайн, камера 12 Мп с OIS, режим FlexCam для необычных ракурсов, IPX8.' },

  // Xiaomi 14 Series
  { id: 'xm14ult512b', name: 'Xiaomi 14 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 109900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Xiaomi 14 Ultra с камерой Leica Summilux и сенсором 1" Sony LYT-900. AMOLED дисплей 120 Гц 2K, Snapdragon 8 Gen 3, быстрая зарядка 120W за 24 минуты, батарея 5000 мАч, запись 8K видео.' },
  { id: 'xm14512b', name: 'Xiaomi 14 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Xiaomi 14 с Snapdragon 8 Gen 3 Leading и камерой Leica Summilux. Компактный корпус, AMOLED дисплей 1.5K 120 Гц, зарядка 120W за 19 минут, батарея 4610 мАч, защита IP68, Dolby Vision.' },

  // Xiaomi 13 Series
  { id: 'xm13ult512b', name: 'Xiaomi 13 Ultra 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.73"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Xiaomi 13 Ultra с камерой Leica и главным сенсором 1" для профессиональной фотографии. AMOLED дисплей 2K 120 Гц, Snapdragon 8 Gen 2, зарядка 90W, батарея 5000 мАч, IP68, 8K видео.' },
  { id: 'xm13512b', name: 'Xiaomi 13 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 69900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.36"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Xiaomi 13 с Snapdragon 8 Gen 2 и камерой Leica в компактном корпусе. AMOLED дисплей 6.36" FHD+ 120 Гц, быстрая зарядка 67W, батарея 4500 мАч, защита IP68, запись Dolby Vision HDR.' },

  // Xiaomi Redmi Note Series
  { id: 'xmrn14p256b', name: 'Xiaomi Redmi Note 14 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Xiaomi Redmi Note 14 Pro 256 ГБ — хит среднего сегмента со Snapdragon 7s Gen 2. Камера 200 Мп с OIS, AMOLED дисплей 120 Гц с яркостью 1800 нит, зарядка 120W за 19 минут, стерео-динамики Dolby Atmos, IP54.' },
  { id: 'xmrn14p512b', name: 'Xiaomi Redmi Note 14 Pro 512GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7s Gen 2' }, inStock: true, description: 'Redmi Note 14 Pro 512 ГБ — максимум памяти в среднем сегменте по выгодной цене. Snapdragon 7s Gen 2, камера 200 Мп, AMOLED 120 Гц, сверхбыстрая зарядка 120W, NFC, ИК-порт, Dolby Atmos, стеклянный корпус.' },
  { id: 'xmrn13p256b', name: 'Xiaomi Redmi Note 13 Pro 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Xiaomi Redmi Note 13 Pro с Snapdragon 7 Gen 2 и камерой 200 Мп с OIS. AMOLED дисплей 120 Гц с яркостью 1800 нит, зарядка 67W, IP54, стереодинамики, Gorilla Glass 5, NFC.' },
  { id: 'xmrn13256b', name: 'Xiaomi Redmi Note 13 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 24900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 685' }, inStock: true, description: 'Xiaomi Redmi Note 13 — бюджетный смартфон с AMOLED дисплеем 120 Гц и Snapdragon 685. Камера 108 Мп, зарядка 33W, батарея 5000 мАч на 2 дня, NFC для оплаты, ИК-порт, тонкий корпус.' },

  // Xiaomi Poco Series
  { id: 'xmpf6256b', name: 'Xiaomi Poco F6 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 44900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 8s Gen 3' }, inStock: true, description: 'Xiaomi Poco F6 с Snapdragon 8s Gen 3 — флагманская мощность по доступной цене. AMOLED дисплей 120 Гц 1.5K, зарядка 90W за 25 минут, камера 50 Мп с OIS, стереодинамики Dolby Atmos, IP64.' },
  { id: 'xmpf5256b', name: 'Xiaomi Poco F5 256GB Black', brand: 'Xiaomi', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.67"', chip: 'Snapdragon 7 Gen 2' }, inStock: true, description: 'Xiaomi Poco F5 с Snapdragon 7+ Gen 2 и отличным соотношением цена-качество. AMOLED дисплей 120 Гц 1.5K, батарея 5000 мАч, зарядка 67W за 45 минут, камера 64 Мп с OIS, NFC, ИК-порт.' },

  // Xiaomi Pad Series
  { id: 'xmpadp12s256b', name: 'Xiaomi Pad Pro 12 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 64900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '12.8" OLED', chip: 'Snapdragon 8 Gen 1 Leading' }, inStock: true, description: 'Планшет Xiaomi Pad Pro 12.8" с OLED дисплеем 2.8K 144 Гц и Snapdragon 8 Gen 2. Четыре динамика Dolby Atmos, быстрая зарядка 120W, стилус в комплекте, идеален для творчества и мультимедиа.' },
  { id: 'xmpad7256b', name: 'Xiaomi Pad 7 256GB Black', brand: 'Xiaomi', category: 'Планшеты', price: 39900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '11.5" LCD', chip: 'MediaTek Kompanio 1300T' }, inStock: true, description: 'Планшет Xiaomi Pad 7 с дисплеем 11.5" IPS 144 Гц и Snapdragon 7s Gen 3. Четыре динамика Dolby Atmos, батарея 8850 мАч, зарядка 45W, стилус опционально, хорош для видео и заметок.' },

  // MacBook Air M3
  { id: 'macbookairm3256', name: 'MacBook Air 13" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" на чипе Apple M3 с 8-ядерным CPU и 10-ядерным GPU. Дисплей Liquid Retina с True Tone, MagSafe зарядка, до 18 часов автономной работы. Тонкий корпус 11.3 мм, вес 1.24 кг, камера 1080p.' },
  { id: 'macbookairm3512', name: 'MacBook Air 13" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 119900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" M3 512 ГБ — оптимальная конфигурация для работы и творчества. 8-ядерный GPU для обработки фото и видео, Liquid Retina дисплей, MagSafe, до 18 часов батареи, тихая работа без вентилятора.' },
  { id: 'macbookairm315256', name: 'MacBook Air 15" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 124900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'MacBook Air 15" с чипом M3 и большим дисплеем 15.3" Liquid Retina для комфортной работы. Шестиканальный звук, до 18 часов автономности, вес 1.51 кг, MagSafe, два порта Thunderbolt, камера 1080p FaceTime.' },
  { id: 'macbookairm315512', name: 'MacBook Air 15" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 144900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '15.3" Retina' }, inStock: true, description: 'MacBook Air 15" M3 512 ГБ — большой экран 15.3" с запасом хранилища для проектов и медиатеки. Чип M3 с 10-ядерным GPU, тихая безвентиляторная конструкция, MagSafe, до 18 часов батареи, вес 1.51 кг.' },

  // MacBook Air M2
  { id: 'macbookairm2256', name: 'MacBook Air 13" M2 256GB', brand: 'Apple', category: 'Ноутбуки', price: 89900, image: '💻', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" на чипе Apple M2 с обновлённым тонким дизайном. Дисплей 13.6" Liquid Retina, MagSafe зарядка, камера 1080p FaceTime, до 18 часов автономной работы, тихий безвентиляторный корпус весом 1.24 кг.' },
  { id: 'macbookairm2512', name: 'MacBook Air 13" M2 512GB', brand: 'Apple', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '13.3" Retina' }, inStock: true, description: 'MacBook Air 13" M2 512 ГБ — оптимальная конфигурация с просторным хранилищем. Чип M2 с 8-ядерным GPU, Liquid Retina дисплей 13.6", MagSafe, до 18 часов работы, два Thunderbolt порта, безвентиляторный.' },

  // MacBook Pro 14"
  { id: 'macbookpro14m3256', name: 'MacBook Pro 14" M3 256GB', brand: 'Apple', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '256GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" на базовом чипе M3 — отличный старт для профессиональных задач. Дисплей Liquid Retina XDR с ProMotion 120 Гц и яркостью 1600 нит, 8 ГБ unified memory, Thunderbolt 3, MagSafe, до 17 часов.' },
  { id: 'macbookpro14m3512', name: 'MacBook Pro 14" M3 512GB', brand: 'Apple', category: 'Ноутбуки', price: 169900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3', ram: '8GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" M3 512 ГБ с дисплеем Liquid Retina XDR и ProMotion 120 Гц. 8-ядерный CPU и 10-ядерный GPU для монтажа и дизайна, MagSafe, HDMI, SD-слот, камера 1080p, до 17 часов батареи.' },
  { id: 'macbookpro14m3pro512', name: 'MacBook Pro 14" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" с чипом M3 Pro и 18 ГБ unified memory для серьёзных рабочих нагрузок. 12-ядерный CPU, 18-ядерный GPU, дисплей Liquid Retina XDR ProMotion, три Thunderbolt 4, HDMI 2.1, до 17 часов.' },
  { id: 'macbookpro14m3max512', name: 'MacBook Pro 14" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '14.2" Retina' }, inStock: true, description: 'MacBook Pro 14" с топовым чипом M3 Max и 36 ГБ unified memory. До 16-ядерного CPU и 40-ядерного GPU для 3D-рендеринга и научных вычислений. Liquid Retina XDR ProMotion, Thunderbolt 4, до 17 часов.' },

  // MacBook Pro 16"
  { id: 'macbookpro16m3pro512', name: 'MacBook Pro 16" M3 Pro 512GB', brand: 'Apple', category: 'Ноутбуки', price: 229900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Pro', ram: '18GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" с чипом M3 Pro и большим экраном Liquid Retina XDR 16.2". 18 ГБ unified memory, 12-ядерный CPU, шестиканальный звук с пространственным аудио, до 22 часов работы, MagSafe 3.' },
  { id: 'macbookpro16m3max512', name: 'MacBook Pro 16" M3 Max 512GB', brand: 'Apple', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '512GB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" с чипом M3 Max — максимальная мощность для профессионалов. 36 ГБ unified memory, до 40-ядерного GPU, дисплей 16.2" Liquid Retina XDR, до 22 часов батареи, шестиканальный звук.' },
  { id: 'macbookpro16m3max1tb', name: 'MacBook Pro 16" M3 Max 1TB', brand: 'Apple', category: 'Ноутбуки', price: 299900, image: '💻', specs: { storage: '1TB', chip: 'Apple M3 Max', ram: '36GB', display: '16" Retina' }, inStock: true, description: 'MacBook Pro 16" M3 Max 1 ТБ — топовая конфигурация для видеомонтажа и 3D. 36 ГБ unified memory, до 16-ядерного CPU, Liquid Retina XDR 16.2" ProMotion, Thunderbolt 4, HDMI 2.1, до 22 часов.' },

  // iPad Pro 11"
  { id: 'ipadpro11256', name: 'iPad Pro 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 109900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Pro 11" с чипом Apple M4 и дисплеем Liquid Retina XDR с ProMotion 120 Гц. Поддержка Apple Pencil Pro, Face ID, камера 12 Мп с LiDAR, Thunderbolt, Wi-Fi 6E, компактный и мощный.' },
  
  
  { id: 'ipadpro13256', name: 'iPad Pro 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 139900, image: '📱', specs: { storage: '256GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'iPad Pro 13" с чипом M4 и огромным дисплеем Liquid Retina XDR для профессионалов. Apple Pencil Pro, Face ID, камера 12 Мп с LiDAR, Thunderbolt/USB 4, поддержка Stage Manager и внешних мониторов.' },
  { id: 'ipadpro13512', name: 'iPad Pro 13" 512GB', brand: 'Apple', category: 'Планшеты', price: 159900, image: '📱', specs: { storage: '512GB', chip: 'Apple M4', ram: '16GB', display: '13" Liquid Retina' }, inStock: true, description: 'iPad Pro 13" M4 512 ГБ — просторное хранилище для дизайнеров и видеоредакторов. Дисплей Liquid Retina XDR 13", Apple Pencil Pro, Face ID, LiDAR, Thunderbolt, Wi-Fi 6E, до 10 часов работы.' },

  // iPad Air
  { id: 'ipadair11256', name: 'iPad Air 11" 256GB', brand: 'Apple', category: 'Планшеты', price: 79900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Air 11" с чипом Apple M2 и поддержкой Apple Pencil Pro с тактильной отдачей. Дисплей Liquid Retina с True Tone и P3, Touch ID, камера Центр сцены 12 Мп, Wi-Fi 6E, USB-C, совместим с Magic Keyboard.' },
  { id: 'ipadair11512', name: 'iPad Air 11" 512GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '512GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Air 11" 512 ГБ — просторное хранилище для творчества и работы. Чип M2 с 8-ядерным GPU, дисплей Liquid Retina 11", Apple Pencil Pro, USB-C 10 Гбит/с, камера 12 Мп, совместим с Magic Keyboard.' },
  { id: 'ipadair13256', name: 'iPad Air 13" 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '13" Liquid Retina' }, inStock: true, description: 'iPad Air 13" с большим дисплеем 13" Liquid Retina и чипом M2 для комфортной работы и творчества. Apple Pencil Pro, четыре динамика с пространственным звуком, USB-C, камера Центр сцены, Touch ID.' },

  // iPad Mini
  { id: 'ipadmini128', name: 'iPad Mini 128GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '128GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'Компактный iPad Mini 128 ГБ с мощным чипом A17 Pro и дисплеем 8.3" Liquid Retina. Apple Pencil USB-C, USB-C порт, Wi-Fi 6E, камера 12 Мп Центр сцены, вес 293 г — помещается в карман или сумку.' },
  { id: 'ipadmini256', name: 'iPad Mini 256GB', brand: 'Apple', category: 'Планшеты', price: 59900, image: '📱', specs: { storage: '256GB', chip: 'Apple A17 Pro', ram: '8GB', display: '7.69" Liquid Retina' }, inStock: true, description: 'iPad Mini 256 ГБ — больше памяти в карманном формате для книг, заметок и приложений. Чип A17 Pro с Neural Engine, дисплей 8.3" Liquid Retina P3, Apple Pencil USB-C, Wi-Fi 6E, 5G опционально.' },

  // iPad (regular)
  { id: 'ipad64', name: 'iPad 64GB', brand: 'Apple', category: 'Планшеты', price: 34900, image: '📱', specs: { storage: '64GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'iPad 10 поколения 64 ГБ с чипом A14 Bionic — доступный вход в экосистему Apple. Дисплей 10.9" Liquid Retina, USB-C, камера 12 Мп Центр сцены для видеозвонков, Touch ID, совместим с Apple Pencil.' },
  { id: 'ipad256', name: 'iPad 256GB', brand: 'Apple', category: 'Планшеты', price: 49900, image: '📱', specs: { storage: '256GB', chip: 'Apple A14 Bionic', ram: '4GB', display: '10.9" Liquid Retina' }, inStock: true, description: 'iPad 10 поколения 256 ГБ — больше места для приложений, фото и видео. Чип A14 Bionic, дисплей 10.9" Liquid Retina, USB-C, камера 12 Мп, Touch ID, совместим с Apple Pencil и Magic Keyboard Folio.' },

  // AirPods 2
  { id: 'airpods2', name: 'AirPods 2', brand: 'Apple', category: 'Наушники', price: 12900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'Apple AirPods 2 с чипом H1 для мгновенного подключения к устройствам Apple. До 5 часов непрерывного прослушивания, голосовая активация «Привет, Siri», оптическое определение уха, Bluetooth 5.0.' },
  { id: 'airpods2c', name: 'AirPods 2 with Charging Case', brand: 'Apple', category: 'Наушники', price: 14900, image: '🎧', specs: { type: 'TWS', battery: '5h', charging: '24h', color: 'White' }, inStock: true, description: 'AirPods 2 с беспроводным зарядным кейсом Qi для удобной зарядки без проводов. Чип H1, до 24 часов суммарного прослушивания с кейсом, мгновенное переключение между устройствами Apple, голосовая Siri.' },

  // AirPods 3
  { id: 'airpods3', name: 'AirPods 3', brand: 'Apple', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'AirPods 3 с пространственным звуком Dolby Atmos и адаптивной эквализацией. Защита IPX4 от пота и воды, MagSafe кейс, до 6 часов прослушивания, скин-сенсор для точного определения ношения.' },
  { id: 'airpods3c', name: 'AirPods 3 with Charging Case', brand: 'Apple', category: 'Наушники', price: 21900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Yes' }, inStock: true, description: 'AirPods 3 с кейсом Lightning — пространственный звук с отслеживанием головы и адаптивная эквализация. До 30 часов с кейсом, защита IPX4, скин-сенсор, Force Sensor для управления воспроизведением.' },

  // AirPods Pro
  { id: 'airpodspro', name: 'AirPods Pro', brand: 'Apple', category: 'Наушники', price: 24900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes' }, inStock: true, description: 'AirPods Pro с активным шумоподавлением ANC и режимом прозрачности для контроля окружения. Адаптивный звук, сменные силиконовые вкладыши трёх размеров, IPX4, до 6 часов прослушивания, MagSafe кейс.' },
  { id: 'airpodspro2', name: 'AirPods Pro 2', brand: 'Apple', category: 'Наушники', price: 29900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '30h', color: 'White', anc: 'Active', transparency: 'Yes', spatial: 'Yes' }, inStock: true, description: 'AirPods Pro 2 с чипом H2 — лучшее шумоподавление от Apple с адаптивной прозрачностью. Персонализированный пространственный звук, USB-C кейс с динамиком для поиска, до 6 часов, IPX4, сенсорное управление.' },

  // AirPods Max
  { id: 'airpodsmax', name: 'AirPods Max', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Silver', spatial: 'Yes', anc: 'Active' }, inStock: true, description: 'AirPods Max Silver с чипом H1 и премиальным активным шумоподавлением. Алюминиевые амбушюры с сетчатыми подушками, Digital Crown для управления, пространственный звук Dolby Atmos, до 20 часов работы.' },
  { id: 'airpodsmaxb', name: 'AirPods Max Blue', brand: 'Apple', category: 'Наушники', price: 74900, image: '🎧', specs: { type: 'Over-ear', battery: '20h', charging: '1h', color: 'Blue', spatial: 'Yes', anc: 'Active' }, inStock: false, description: 'AirPods Max в стильном синем цвете с алюминиевыми чашками и сетчатыми амбушюрами. Чип H1, активное шумоподавление, Digital Crown, пространственный звук с отслеживанием головы, до 20 часов работы.' },

  // Apple Watch Series 9
  { id: 'aw9s41m', name: 'Apple Watch Series 9 41mm Midnight', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch Series 9 41 мм с чипом S9 и новой функцией Double Tap для управления одной рукой. Дисплей Retina Always-On 2000 нит, точный GPS, SpO2, ЭКГ, мониторинг сна, waterproof 50 м.' },
  { id: 'aw9s45m', name: 'Apple Watch Series 9 45mm Midnight', brand: 'Apple', category: 'Часы', price: 39900, image: '⌚', specs: { size: '45mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch Series 9 45 мм с увеличенным экраном для комфортного чтения. Чип S9, Double Tap, точный GPS, датчик SpO2, ЭКГ, мониторинг сна и температуры, Crash Detection, waterproof 50 м.' },
  { id: 'aw9s41g', name: 'Apple Watch Series 9 41mm Gold', brand: 'Apple', category: 'Часы', price: 34900, image: '⌚', specs: { size: '41mm', display: 'Retina', color: 'Gold', band: 'Sport Band' }, inStock: true, description: 'Apple Watch Series 9 41 мм в золотом корпусе — стильный аксессуар на каждый день. Чип S9, Always-On дисплей Retina, Double Tap, SpO2, ЭКГ, мониторинг здоровья, защита от воды WR50.' },

  // Apple Watch Ultra 2
  { id: 'awu2gps', name: 'Apple Watch Ultra 2 GPS Titanium', brand: 'Apple', category: 'Часы', price: 84900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', gps: 'Yes' }, inStock: true, description: 'Apple Watch Ultra 2 GPS с титановым корпусом 49 мм и самым ярким дисплеем Watch 3000 нит. Чип S9, точный двухчастотный GPS L1/L5, глубиномер до 40 метров, сирена 86 дБ, до 36 часов работы.' },
  { id: 'awu2cel', name: 'Apple Watch Ultra 2 Cellular Titanium', brand: 'Apple', category: 'Часы', price: 99900, image: '⌚', specs: { size: '49mm', display: 'Retina', color: 'Titanium', band: 'Trail Band', cellular: 'Yes' }, inStock: true, description: 'Apple Watch Ultra 2 Cellular — автономные звонки, сообщения и стриминг без iPhone. Титановый корпус 49 мм, GPS L1/L5, сирена 86 дБ, глубиномер 40 м, ночной режим Wayfinder, до 36 часов.' },

  // Apple Watch SE
  { id: 'awse2', name: 'Apple Watch SE 2 40mm Midnight', brand: 'Apple', category: 'Часы', price: 19900, image: '⌚', specs: { size: '40mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch SE 2 40 мм — доступный вход в экосистему Apple Watch. Чип S8, обнаружение ДТП и падений, фитнес-трекер с кольцами активности, мониторинг пульса, уведомления о нерегулярном ритме, Family Setup.' },
  { id: 'awse2s', name: 'Apple Watch SE 2 44mm Midnight', brand: 'Apple', category: 'Часы', price: 22900, image: '⌚', specs: { size: '44mm', display: 'Retina', color: 'Midnight', band: 'Sport Band' }, inStock: true, description: 'Apple Watch SE 2 44 мм с увеличенным экраном для комфортного чтения. Чип S8, мониторинг сна и пульса, обнаружение ДТП, фитнес-трекинг с кольцами активности, уведомления о здоровье, waterproof 50 м.' },

  // Samsung Galaxy Watch
  { id: 'sgw6cl', name: 'Samsung Galaxy Watch 6 Classic Silver', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Silver', band: 'Sport Band' }, inStock: true, description: 'Samsung Galaxy Watch 6 Classic в серебристом цвете с фирменным вращающимся безелем. AMOLED дисплей 1.47" Super, BIA-датчик состава тела, мониторинг сна и храпа, Wear OS, sapphire crystal, IP68.' },
  { id: 'sgw6clb', name: 'Samsung Galaxy Watch 6 Classic Black', brand: 'Samsung', category: 'Часы', price: 29900, image: '⌚', specs: { size: '43mm', display: 'AMOLED', color: 'Black', band: 'Sport Band' }, inStock: true, description: 'Galaxy Watch 6 Classic Black — стильные часы с вращающимся безелем для удобной навигации. AMOLED дисплей, мониторинг сна, стресса и состава тела, ЭКГ, измерение давления, Wear OS, до 40 часов.' },
  { id: 'sgw7', name: 'Samsung Galaxy Watch 7 Gold', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Gold', band: 'Sport Band', ai: 'Yes' }, inStock: true, description: 'Samsung Galaxy Watch 7 с датчиком BIA для измерения состава тела и мониторингом сна. Wear OS, AMOLED дисплей, безель для навигации, ЭКГ, измерение давления, GPS, до 40 часов работы, IP68.' },

  // Samsung Galaxy Buds
  
  { id: 'sgbuds3p', name: 'Samsung Galaxy Buds3 Pro Silver', brand: 'Samsung', category: 'Наушники', price: 19900, image: '🎧', specs: { type: 'TWS', battery: '6h', charging: '26h', color: 'Silver', anc: 'Active', ips: 'IPX7' }, inStock: true, description: 'Samsung Galaxy Buds3 Pro TWS с интеллектуальным ANC и звуком 360 Audio. Hi-Fi кодек SSC, адаптивное шумоподавление, IP57, до 7 часов прослушивания, кейс с беспроводной зарядкой, режим прозрачности.' },

  // Sony WH-1000XM5
  { id: 'sonywh1000xm5b', name: 'Sony WH-1000XM5 Black', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Black', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Sony WH-1000XM5 Black — флагманские наушники с лучшим в классе ANC из 8 микрофонов. LDAC для Hi-Res Audio, 30 часов работы, Speak-to-Chat, мультиточечное подключение к 2 устройствам, складные.' },
  { id: 'sonywh1000xm5s', name: 'Sony WH-1000XM5 Silver', brand: 'Sony', category: 'Наушники', price: 44900, image: '🎧', specs: { type: 'Over-ear', battery: '30h', color: 'Silver', anc: 'Premium', codec: 'LDAC' }, inStock: true, description: 'Sony WH-1000XM5 в серебристом корпусе. Автокалибровка ANC по 8 микрофонам, Speak-to-Chat для автопаузы, мультиточечное подключение, LDAC Hi-Res, 30 часов батареи, быстрая зарядка 3 мин = 3 часа.' },

  // Sony WF-1000XM5
  
  
  
  { id: 'sonya7rb', name: 'Sony Alpha 7R V Black', brand: 'Sony', category: 'Камеры и дроны', price: 419900, image: '📷', specs: { sensor: 'Full Frame', megapixels: '61MP', video: '8K 24p', display: 'Fixed 3.2"' }, inStock: false, description: 'Беззеркальная камера Sony Alpha A7R с полнокадровым сенсором 61 Мп для профессиональной фотографии. Быстрый гибридный автофокус с ИИ, видео 4K 60fps, 5-осевая стабилизация, корпус из магния.' },
  
  
  
  
  
  
  
  { id: 'djimini4b', name: 'DJI Mini 4 Pro Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 59900, image: '🚁', specs: { weight: '249g', max_flight_time: '34min', video: '4K 60p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'DJI Mini 4 Pro весом 249 г — компактный дрон с камерой 48 Мп и записью 4K HDR. Обнаружение препятствий на 360°, ActiveTrack 5.0, до 34 минут полёта, передача до 20 км, вертикальная съёмка.' },
  { id: 'djiair3', name: 'DJI Air 3 Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 99900, image: '🚁', specs: { weight: '907g', max_flight_time: '46min', video: '4K 60p', sensor: 'Dual 4/3 CMOS' }, inStock: true, description: 'Дрон DJI Air 3 с двумя камерами — широкоугольной и телевиком 3x для разнообразной съёмки. До 46 минут полёта, обнаружение препятствий на 360°, ActiveTrack 5.0, видео 4K HDR, передача до 20 км.' },
  { id: 'djimavic3', name: 'DJI Mavic 3 Classic Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 189900, image: '🚁', specs: { weight: '895g', max_flight_time: '46min', video: '4K 120p', sensor: '4/3 CMOS' }, inStock: true, description: 'DJI Mavic 3 Classic с камерой Hasselblad и сенсором 4/3 CMOS для профессиональной аэросъёмки. До 46 минут полёта, 5.1K видео, дальность 15 км, обнаружение препятствий на 360°, Hyperlapse, QuickShots.' },
  { id: 'djiavata', name: 'DJI Avata 2 Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 159900, image: '🚁', specs: { weight: '410g', max_flight_time: '23min', video: '1080p 120p', type: 'FPV Drone' }, inStock: true, description: 'DJI Avata 2 — FPV-дрон для захватывающих иммерсивных полётов от первого лица. Управление движением головы через DJI Goggles 3, до 23 минут в воздухе, камера 4K 100fps, защита пропеллеров.' },

  // DJI Osmo
  
  { id: 'ps5be', name: 'PlayStation 5 Console Bundle', brand: 'Sony', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', vr: 'PSVR2' }, inStock: true, description: 'PlayStation 5 с дисководом Blu-ray для физических и цифровых игр. SSD 825 ГБ для мгновенной загрузки, 4K 120fps, рейтрейсинг, тактильный контроллер DualSense с адаптивными триггерами, 3D-звук Tempest.' },
  { id: 'ps5de', name: 'PlayStation 5 Digital Edition', brand: 'Sony', category: 'Игровые консоли', price: 44900, image: '🎮', specs: { storage: '825GB', cpu: 'Custom Zen 2 8-core', gpu: '10.28 TFLOPS', digital: 'Yes' }, inStock: true, description: 'PlayStation 5 Digital Edition без дисковода — только цифровые игры за меньшую цену. Те же SSD 825 ГБ, 4K 120fps, рейтрейсинг, DualSense с адаптивными триггерами, 3D-звук Tempest, тихая работа.' },
  { id: 'ps5pro', name: 'PlayStation 5 Pro', brand: 'Sony', category: 'Игровые консоли', price: 79900, image: '🎮', specs: { storage: '2TB', cpu: 'Custom Zen 2 8-core', gpu: 'Enhanced GPU', vr: 'PSVR2' }, inStock: false, description: 'PlayStation 5 Pro с улучшенным GPU и поддержкой 8K разрешения для лучшей графики. SSD 1 ТБ, рейтрейсинг нового поколения, обратная совместимость с PS4, DualSense контроллер, Wi-Fi 7, 4K 120fps.' },

  // Xbox Series X
  { id: 'xboxsx', name: 'Xbox Series X', brand: 'Microsoft', category: 'Игровые консоли', price: 59900, image: '🎮', specs: { storage: '1TB', cpu: 'Custom Zen 2 8-core', gpu: '12 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Microsoft Xbox Series X — самая мощная консоль с 12 терафлопс GPU. SSD 1 ТБ, 4K 120fps, рейтрейсинг, обратная совместимость с 4 поколениями Xbox, Quick Resume для мгновенного переключения между играми.' },
  { id: 'xboxss', name: 'Xbox Series S', brand: 'Microsoft', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { storage: '512GB', cpu: 'Custom Zen 2 8-core', gpu: '4 TFLOPS', gamepass: 'Yes' }, inStock: true, description: 'Xbox Series S — компактная цифровая консоль для доступного некстген-гейминга. SSD 512 ГБ, 1440p 120fps, рейтрейсинг, Xbox Game Pass с сотнями игр по подписке, Quick Resume, Dolby Atmos.' },

  // Nintendo Switch
  { id: 'switcholed', name: 'Nintendo Switch OLED White', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'White' }, inStock: true, description: 'Nintendo Switch OLED White с ярким 7" OLED экраном и насыщенными цветами. Док-станция с LAN-портом, улучшенные стерео-динамики, 64 ГБ памяти, широкая регулируемая подставка, три режима игры.' },
  { id: 'switcholedred', name: 'Nintendo Switch OLED Red', brand: 'Nintendo', category: 'Игровые консоли', price: 34900, image: '🎮', specs: { display: '7" OLED', storage: '64GB', battery: '13h', color: 'Red' }, inStock: true, description: 'Nintendo Switch OLED в классическом красно-синем варианте Joy-Con. 7" OLED дисплей с насыщенными цветами, док-станция с LAN-портом, 64 ГБ памяти, улучшенные динамики, три режима игры.' },
  
  
  
  
  
  { id: 'dysonairwrapc', name: 'Dyson Airwrap Complete', brand: 'Dyson', category: 'Для дома', price: 59900, image: '💈', specs: { heat: 'Intelligent', rotation: 'Oscillating', battery: 'Cordless', attachments: '6' }, inStock: true, description: 'Мультистайлер Dyson Airwrap Complete с 6 насадками для завивки, сушки и выпрямления. Технология Coanda для укладки воздушным потоком без экстремального нагрева, 3 режима температуры, умный контроль.' },

  // Dyson Supersonic
  { id: 'dysonsupersonicb', name: 'Dyson Supersonic Black', brand: 'Dyson', category: 'Для дома', price: 34900, image: '💈', specs: { heat: 'Intelligent', motor: 'Digital V9', speed: '110,000rpm', color: 'Black' }, inStock: true, description: 'Фен Dyson Supersonic с цифровым мотором V9 и 4 сменными магнитными насадками. Intelligent Heat Control измеряет температуру 40 раз/сек, 110 000 об/мин, 3 скорости, 4 режима нагрева, ионизация.' },

  // Dyson Purifier
  
  { id: 'sgtvqn65b', name: 'Samsung QN85 65" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 84900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN85 65" с Neo QLED и технологией Mini LED для превосходного контраста. 4K 120 Гц, Dolby Atmos, Gaming Hub с поддержкой облачного гейминга, Object Tracking Sound+, антибликовое покрытие.' },
  { id: 'sgtvqn75b', name: 'Samsung QN85 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 124900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN85 75" Neo QLED — большой экран с Mini LED подсветкой для кинематографичной картинки. 4K 120 Гц, HDR10+ Adaptive, Gaming Hub, Object Tracking Sound+, SmartThings, антибликовое покрытие.' },
  { id: 'sgtvqn85b', name: 'Samsung QN85 85" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: false, description: 'Samsung QN85 85" Neo QLED — огромный экран с Mini LED для домашнего кинотеатра. 4K 120 Гц, антибликовое покрытие, HDR10+ Adaptive, Dolby Atmos, Gaming Hub, SmartThings, Object Tracking Sound+.' },

  // LG TV
  
  { id: 'lgtvoledc', name: 'LG OLED65 65" 4K', brand: 'LG', category: 'Телевизоры', price: 119900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'LG OLED65 C-серии с процессором α9 Gen6 AI — идеальный чёрный цвет и бесконечная контрастность. Dolby Vision IQ и Dolby Atmos, 120 Гц, 4 порта HDMI 2.1 для PS5 и Xbox, NVIDIA G-Sync, FreeSync.' },
  { id: 'lgtvoled75', name: 'LG OLED75 75" 4K', brand: 'LG', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'OLED', refresh: '120Hz' }, inStock: true, description: 'LG OLED 75" с технологией OLED EX для повышенной яркости и точности цвета. Потрясающая картинка с Dolby Vision, NVIDIA G-Sync и FreeSync для плавного гейминга, α9 Gen6 AI процессор, webOS.' },

  // More Xiaomi Mi Band
  { id: 'xiamibanda8', name: 'Xiaomi Mi Band 8', brand: 'Xiaomi', category: 'Часы', price: 4990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '16 days', waterproof: '5ATM' }, inStock: true, description: 'Фитнес-браслет Xiaomi Smart Band 8 с AMOLED дисплеем 1.62" и яркостью 600 нит. До 16 дней работы без подзарядки, 150+ режимов тренировок, мониторинг SpO2 и пульса 24/7, водозащита 5 ATM.' },
  { id: 'xiamibanda7', name: 'Xiaomi Mi Band 7', brand: 'Xiaomi', category: 'Часы', price: 3990, image: '⌚', specs: { display: '1.62" AMOLED', battery: '14 days', waterproof: '5ATM' }, inStock: true, description: 'Фитнес-браслет Xiaomi Mi Band 7 с AMOLED дисплеем 1.62" — улучшенный экран на 25% больше. SpO2, мониторинг сна и стресса, до 14 дней работы, 120+ режимов тренировок, водозащита 5 ATM.' },

  // Samsung Galaxy Tab
  { id: 'sgtabs10256', name: 'Samsung Galaxy Tab S10 256GB', brand: 'Samsung', category: 'Планшеты', price: 69900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 3 Leading', storage: '256GB' }, inStock: true, description: 'Samsung Galaxy Tab S10 с AMOLED дисплеем 11" 120 Гц и стилусом S Pen в комплекте. MediaTek Dimensity 9300+, режим DeX, Galaxy AI для заметок и перевода, четыре динамика AKG, защита IP68.' },
  { id: 'sgtabs9ultra', name: 'Samsung Galaxy Tab S9 Ultra 256GB', brand: 'Samsung', category: 'Планшеты', price: 99900, image: '📱', specs: { size: '14.6"', resolution: '2K', chip: 'Snapdragon 8 Gen 2', storage: '256GB' }, inStock: true, description: 'Флагманский планшет Samsung Galaxy Tab S9 Ultra с огромным экраном 14.6" Dynamic AMOLED 2X 120 Гц. Snapdragon 8 Gen 2, S Pen в комплекте, защита IP68, DeX режим, камера 13 Мп, до 14 часов работы.' },
  { id: 'sgtabs8', name: 'Samsung Galaxy Tab S8 128GB', brand: 'Samsung', category: 'Планшеты', price: 49900, image: '📱', specs: { size: '11"', resolution: '2K', chip: 'Snapdragon 8 Gen 1', storage: '128GB' }, inStock: true, description: 'Планшет Samsung Galaxy Tab S8 с дисплеем 11" TFT 120 Гц и чипом Snapdragon 8 Gen 1. S Pen в комплекте с низкой задержкой, DeX для десктопного режима, камера 13 Мп, батарея 8000 мАч, зарядка 45W.' },

  // More AirPods variants
  
  
  { id: 'sgbudslive', name: 'Samsung Galaxy Buds Live Black', brand: 'Samsung', category: 'Наушники', price: 10900, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '29h', color: 'Black', anc: 'Active' }, inStock: true, description: 'Samsung Galaxy Buds Live с фирменным дизайном-фасолинкой открытого типа. Активное шумоподавление, звук AKG с 12 мм динамиками, до 6 часов музыки, Qi беспроводная зарядка кейса, IPX2.' },

  // More Sony headphones
  { id: 'sonywh900nb', name: 'Sony WH-900N Black', brand: 'Sony', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '35h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Sony WH-900N — лёгкие накладные наушники с ANC и кодеком LDAC для Hi-Res звука. До 35 часов работы, быстрая зарядка 10 мин = 4.5 часа, Adaptive Sound Control, мультиточечное Bluetooth 5.0.' },

  // Sennheiser Momentum
  
  { id: 'bosequc45', name: 'Bose QuietComfort 45 Black', brand: 'Bose', category: 'Наушники', price: 34900, image: '🎧', specs: { type: 'Over-ear', battery: '24h', color: 'Black', anc: 'Yes' }, inStock: true, description: 'Bose QuietComfort 45 с фирменным CustomTune шумоподавлением под форму уха. До 24 часов работы, Aware Mode для прозрачности, мультиточечное Bluetooth, комфортные амбушюры с пеной, USB-C зарядка.' },

  // More Galaxy Watch models
  { id: 'sgw6sm', name: 'Samsung Galaxy Watch 6 Silver', brand: 'Samsung', category: 'Часы', price: 24900, image: '⌚', specs: { size: '40mm', display: 'AMOLED', color: 'Silver' }, inStock: true, description: 'Samsung Galaxy Watch 6 Silver — лёгкие и компактные умные часы для повседневной носки. AMOLED дисплей, сапфировое стекло, до 40 часов работы, мониторинг сна и здоровья, фитнес-трекинг, Wear OS.' },
  { id: 'sgw5pro', name: 'Samsung Galaxy Watch 5 Pro Titanium', brand: 'Samsung', category: 'Часы', price: 34900, image: '⌚', specs: { size: '45mm', display: 'AMOLED', color: 'Titanium' }, inStock: true, description: 'Samsung Galaxy Watch 5 Pro из титана — для активного образа жизни и походов. GPS-навигация по маршруту, батарея 590 мАч на 80 часов, дисплей 1.4" Super AMOLED, сапфировое стекло, BIA-датчик.' },

  // Garmin Smartwatches
  { id: 'garminepix', name: 'Garmin Epix Gen 2 Titanium', brand: 'Garmin', category: 'Часы', price: 59900, image: '⌚', specs: { display: '1.3" AMOLED', battery: '12 days', size: '47mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Премиальные GPS-часы Garmin Epix Gen 2 с ярким AMOLED дисплеем 1.3". Титановый корпус, до 16 дней работы, мультиспортивные режимы, пульсоксиметр, топографические карты, Garmin Pay, мониторинг HRV.' },
  { id: 'garminfe965', name: 'Garmin Fenix 7X Titanium', brand: 'Garmin', category: 'Часы', price: 79900, image: '⌚', specs: { display: '1.4" AMOLED', battery: '21 days', size: '55mm', gps: 'Multi-GNSS' }, inStock: true, description: 'Мультиспортивные GPS-часы Garmin Fenix 7X из титана для экстремальных условий. Солнечная зарядка Power Glass продлевает автономность до 37 дней, TOPO-карты, ClimbPro, мониторинг здоровья и тренировок.' },

  // OnePlus Phones
  { id: 'oneplus12256', name: 'OnePlus 12 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Флагман OnePlus 12 с Snapdragon 8 Gen 3 и тройной камерой Hasselblad. AMOLED дисплей 2K 120 Гц ProXDR с яркостью 4500 нит, зарядка 100W SUPERVOOC за 26 минут, батарея 5400 мАч, Dolby Vision, 16 ГБ RAM.' },
  { id: 'oneplus12512', name: 'OnePlus 12 512GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'OnePlus 12 512 ГБ — максимум памяти для флагмана. Snapdragon 8 Gen 3, камера Hasselblad с 64 Мп телевиком, AMOLED 2K 120 Гц, батарея 5400 мАч с зарядкой 100W за 26 минут, 16 ГБ RAM, Dolby Vision.' },
  { id: 'oneplus11256', name: 'OnePlus 11 256GB Black', brand: 'OnePlus', category: 'Смартфоны', price: 59900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'OnePlus 11 с Snapdragon 8 Gen 2 и камерой Hasselblad с калибровкой цвета. Дисплей AMOLED 2K 120 Гц LTPO3, быстрая зарядка 100W SUPERVOOC, Dolby Vision, 16 ГБ RAM, батарея 5000 мАч, стерео-динамики.' },

  // Google Pixel Phones
  { id: 'pixel9pro256', name: 'Google Pixel 9 Pro 256GB Black', brand: 'Google', category: 'Смартфоны', price: 119900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro с чипом Tensor G4 и эксклюзивными ИИ-функциями. Камера 50 Мп с Super Res Zoom и Magic Eraser, 7 лет обновлений Android. Дисплей 6.3" LTPO OLED 120 Гц, Titan M2 чип безопасности.' },
  { id: 'pixel9pro512', name: 'Google Pixel 9 Pro 512GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.3"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro 512 ГБ для энтузиастов мобильной фотографии. Tensor G4 с AI-обработкой, Super Res Zoom 30x, Night Sight, Magic Eraser, Magic Editor. Дисплей 6.3" OLED 120 Гц, 7 лет обновлений.' },
  { id: 'pixel9promax256', name: 'Google Pixel 9 Pro Max 256GB Black', brand: 'Google', category: 'Смартфоны', price: 139900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.8"', chip: 'Google Tensor G4' }, inStock: true, description: 'Google Pixel 9 Pro Max с большим 6.7" OLED экраном 120 Гц и Tensor G4. Лучшая камера Pixel 50 Мп с ИИ-улучшениями, батарея 5000 мАч на весь день, Magic Eraser, Best Take, 7 лет обновлений Android.' },

  // Motorola Razr Foldable
  { id: 'motorola_razr_2024', name: 'Motorola Razr 50 Ultra 512GB', brand: 'Motorola', category: 'Смартфоны', price: 129900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.9" Foldable', chip: 'Snapdragon 8s Gen 3 Leading' }, inStock: true, description: 'Складной Motorola Razr 50 Ultra с самым большим внешним экраном 4" pOLED среди флипов. Snapdragon 8s Gen 3, камера 50 Мп с AI-улучшениями, основной дисплей 6.9" AMOLED 165 Гц, зарядка 45W, IPX8.' },

  // Huawei P70
  { id: 'huaweip70pro512', name: 'Huawei P70 Pro 512GB Black', brand: 'Huawei', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.8"', chip: 'Kirin 9010' }, inStock: false, description: 'Флагман Huawei P70 Pro с профессиональной камерой XMAGE и матрицей 1" для исключительных фото. Быстрая зарядка 100W, стильный дизайн с кожаной вставкой, OLED дисплей 120 Гц, спутниковая связь.' },

  // Nothing Phone
  { id: 'nothing2a256', name: 'Nothing Phone 2a 256GB Black', brand: 'Nothing', category: 'Смартфоны', price: 34900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'MediaTek Dimensity 7200 Pro' }, inStock: true, description: 'Nothing Phone 2a с уникальным LED-дизайном Glyph Interface на задней панели. MediaTek Dimensity 7200 Pro, AMOLED дисплей 120 Гц с яркостью 1100 нит, камера 50 Мп с OIS, батарея 5000 мАч, зарядка 45W.' },

  // ASUS ROG Phone
  { id: 'asurog9pro512', name: 'ASUS ROG Phone 9 Pro 512GB', brand: 'ASUS', category: 'Смартфоны', price: 149900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78" 240Hz', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Игровой ASUS ROG Phone 9 Pro с Snapdragon 8 Elite — максимальная мощность для мобильного гейминга. Экран AMOLED 185 Гц, AirTrigger 7 для тактильного управления, RGB-подсветка, охлаждение AeroActive.' },

  // Lenovo ThinkPad
  { id: 'lenox1carbonm4', name: 'Lenovo ThinkPad X1 Carbon 14 M4', brand: 'Lenovo', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Ультрабук Lenovo ThinkPad X1 Carbon Gen 12 с Intel Core Ultra и ИИ-ускорителем. Вес всего 1.08 кг, дисплей 14" 2.8K OLED, до 15 часов работы, клавиатура ThinkPad, сканер отпечатков, Wi-Fi 7, MIL-STD-810H.' },
  { id: 'lenovox1carbonm3', name: 'Lenovo ThinkPad X1 Carbon 14 M3', brand: 'Lenovo', category: 'Ноутбуки', price: 99900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '14" 2.8K' }, inStock: true, description: 'Бизнес-ноутбук Lenovo ThinkPad X1 Carbon с дисплеем 14" 2.8K OLED. Лёгкий углеволоконный корпус 1.12 кг, до 15 часов автономности, военная прочность MIL-STD-810H, клавиатура с подсветкой, TrackPoint.' },

  // Dell XPS
  { id: 'dellxps13', name: 'Dell XPS 13 9340', brand: 'Dell', category: 'Ноутбуки', price: 109900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 7', ram: '32GB', display: '13.4" OLED' }, inStock: true, description: 'Компактный ноутбук Dell XPS 13 с безрамочным InfinityEdge дисплеем 13.4" OLED. Intel Core Ultra, вес 1.17 кг, цельный алюминиевый корпус, Thunderbolt 4, до 12 часов работы, быстрая зарядка ExpressCharge.' },
  { id: 'dellxps15', name: 'Dell XPS 15 9540', brand: 'Dell', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 9', ram: '32GB', display: '15.6" OLED' }, inStock: true, description: 'Dell XPS 15 с безрамочным InfinityEdge дисплеем 15.6" OLED 3.5K. Intel Core i7, RTX 4050, алюминиевый корпус, Thunderbolt 4, до 13 часов работы, клавиатура с подсветкой, сканер отпечатков.' },

  // ASUS VivoBook
  { id: 'asusvivobook15', name: 'ASUS VivoBook 15 OLED', brand: 'ASUS', category: 'Ноутбуки', price: 69900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 7', ram: '16GB', display: '15.6" OLED' }, inStock: true, description: 'ASUS VivoBook 15 — доступный ноутбук для учёбы и повседневных задач. Дисплей 15.6" IPS Full HD, лёгкий корпус, комфортная клавиатура ErgoLift, хорошая батарея на 8 часов, webcam с шторкой.' },

  // HP Pavilion
  { id: 'hppaviliondm15', name: 'HP Pavilion 15 dm0021dx', brand: 'HP', category: 'Ноутбуки', price: 59900, image: '💻', specs: { storage: '512GB', chip: 'AMD Ryzen 5', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'Ноутбук HP Pavilion 15 для повседневных задач — учёба, работа и развлечения. Дисплей 15.6" IPS Full HD, комфортная клавиатура, мощный аккумулятор для работы вне розетки, Webcam с шторкой приватности.' },

  // MSI GE76 Gaming
  { id: 'msige76', name: 'MSI GE76 Raider RTX 4070', brand: 'MSI', category: 'Ноутбуки', price: 199900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 165Hz' }, inStock: true, description: 'Игровой ноутбук MSI GE76 Raider с видеокартой RTX 4070 для требовательных игр. Дисплей 17.3" IPS 240 Гц для плавного геймплея, мощная система охлаждения Cooler Boost 5, SteelSeries клавиатура с RGB.' },

  // ROG Zephyrus G16
  { id: 'roggm16', name: 'ASUS ROG Zephyrus G16 RTX 4090', brand: 'ASUS', category: 'Ноутбуки', price: 249900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: false, description: 'Игровой ноутбук ASUS ROG Zephyrus G16 с RTX 4090 в ультратонком корпусе. Дисплей 16" OLED 240 Гц с Nebula HDR, до 100W GPU, AniMe Matrix LED на крышке, клавиатура с N-key rollover, Dolby Atmos.' },

  // Razer Blade
  { id: 'razorblade16', name: 'Razer Blade 16 RTX 4090', brand: 'Razer', category: 'Ноутбуки', price: 289900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '16" 240Hz' }, inStock: true, description: 'Премиальный игровой ноутбук Razer Blade 16 с RTX 4090 и алюминиевым unibody корпусом. Mini-LED дисплей 16" 240 Гц с локальным затемнением, Razer Chroma RGB клавиатура, THX Spatial Audio, Vapor Chamber.' },

  // iPad Pro with M2
  { id: 'ipadprom211256', name: 'iPad Pro 11" M2 256GB', brand: 'Apple', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Apple M2', ram: '8GB', display: '11" Liquid Retina' }, inStock: true, description: 'iPad Pro 11" с чипом M2 предыдущего поколения и дисплеем Liquid Retina XDR ProMotion. Apple Pencil 2, Face ID, камера 12 Мп с LiDAR, Thunderbolt, Wi-Fi 6E, компактный и мощный для творчества.' },

  // Samsung Galaxy Tab A
  { id: 'sgtaba13256', name: 'Samsung Galaxy Tab A13 256GB', brand: 'Samsung', category: 'Планшеты', price: 24900, image: '📱', specs: { size: '10.5"', resolution: 'WXGA+', chip: 'MediaTek Helio G99', storage: '256GB' }, inStock: true, description: 'Бюджетный планшет Samsung Galaxy Tab A13 с дисплеем 10.4" для учёбы и развлечений. Хорошая автономность, Dolby Atmos звук, подходит для чтения, видеозвонков и базовых задач, лёгкий и компактный.' },

  // Microsoft Surface Pro
  { id: 'surfacepro10', name: 'Microsoft Surface Pro 10 256GB', brand: 'Microsoft', category: 'Планшеты', price: 99900, image: '📱', specs: { storage: '256GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '13" PixelSense' }, inStock: true, description: 'Microsoft Surface Pro 10 — планшет-трансформер с Intel Core Ultra и Windows 11 Pro. Kickstand и Type Cover для работы как ноутбук, дисплей 13" PixelSense 120 Гц, Thunderbolt 4, стилус Surface Pen.' },

  // Microsoft Surface Laptop Studio
  { id: 'surfacelaptopstudio', name: 'Microsoft Surface Laptop Studio RTX 4090', brand: 'Microsoft', category: 'Ноутбуки', price: 269900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-12', ram: '32GB', gpu: 'RTX 4090', display: '15" 120Hz' }, inStock: true, description: 'Microsoft Surface Laptop Studio с гибким дисплеем 14.4" 120 Гц и RTX 4060. Три режима работы — ноутбук, сцена, студия. Surface Pen, Thunderbolt 4, для креативных профессионалов и разработчиков.' },

  // USB-C Hubs and Accessories
  { id: 'ankerusb', name: 'Anker 7-in-1 USB-C Hub Silver', brand: 'Anker', category: 'Аксессуары', price: 4990, image: '🔌', specs: { ports: '7-in-1', power: '100W', color: 'Silver' }, inStock: true, description: 'USB-C хаб Anker 7-в-1: HDMI 4K 60 Гц, два USB-A 3.0, SD и microSD слоты, Ethernet 1 Гбит, Power Delivery 100W для зарядки ноутбука. Компактный алюминиевый корпус, plug-and-play.' },
  
  { id: 'appleusbclight', name: 'Apple USB-C to Lightning Cable 1m', brand: 'Apple', category: 'Аксессуары', price: 1990, image: '🔌', specs: { length: '1m', connector: 'USB-C to Lightning', color: 'White' }, inStock: true, description: 'Оригинальный кабель Apple USB-C на Lightning длиной 1 метр для быстрой зарядки и синхронизации. Сертификация MFi, совместим с iPhone, iPad, AirPods, поддержка передачи данных USB 2.0.' },
  { id: 'appleusbcc', name: 'Apple USB-C Charge Cable 2m', brand: 'Apple', category: 'Аксессуары', price: 2990, image: '🔌', specs: { length: '2m', connector: 'USB-C to USB-C', color: 'White' }, inStock: true, description: 'Оригинальный кабель Apple USB-C 2 метра для зарядки MacBook, iPad Pro и других устройств. Поддержка Power Delivery до 100W, передача данных USB 2.0, прочный плетёный дизайн.' },

  // Phone Cases
  { id: 'otterbox15pm', name: 'OtterBox Defender iPhone 15 Pro Max Black', brand: 'OtterBox', category: 'Аксессуары', price: 4990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'Polycarbonate', color: 'Black', protection: 'Heavy-duty' }, inStock: true, description: 'OtterBox Defender для iPhone 15 Pro Max — прочный чехол с многослойной защитой от ударов, падений и царапин. Включает зажим на ремень, встроенная защита экрана, порт-крышки от пыли, MIL-STD-810G.' },
  { id: 'spigeniphone15pm', name: 'Spigen Tough Armor iPhone 15 Pro Max Black', brand: 'Spigen', category: 'Аксессуары', price: 1990, image: '📱', specs: { model: 'iPhone 15 Pro Max', material: 'TPU', color: 'Black' }, inStock: true, description: 'Spigen Tough Armor для iPhone 15 Pro Max — двухслойная защита с технологией Air Cushion на углах. Встроенная подставка kickstand, совместим с MagSafe, военный стандарт защиты MIL-STD-810G.' },

  // Screen Protectors
  
  
  
  
  { id: 'ankerasync', name: 'Anker PowerWave Pad 15W Black', brand: 'Anker', category: 'Аксессуары', price: 2990, image: '🔌', specs: { power: '15W', color: 'Black', standard: 'Qi' }, inStock: true, description: 'Беспроводная зарядка Anker PowerWave 15W с технологией Qi для iPhone и Android. Быстрая зарядка, LED-индикатор, защита от перегрева и перезаряда, совместима с чехлами до 5 мм, компактный дизайн.' },

  // Portable Power Banks
  { id: 'ankerpower20000', name: 'Anker PowerCore 20000 Black', brand: 'Anker', category: 'Аксессуары', price: 3990, image: '🔋', specs: { capacity: '20000mAh', ports: '2 USB-A', color: 'Black' }, inStock: true, description: 'Портативный аккумулятор Anker PowerCore 20000 мАч — до 5 зарядок смартфона. Два порта USB-A, PowerIQ для оптимальной скорости зарядки, LED-индикатор заряда, компактный размер для путешествий.' },
  { id: 'applepower20', name: 'Apple MagSafe Battery Pack White', brand: 'Apple', category: 'Аксессуары', price: 4990, image: '🔋', specs: { capacity: '2460mAh', power: '7.5W', color: 'White' }, inStock: true, description: 'MagSafe Battery Pack от Apple для iPhone — магнитное крепление с беспроводной зарядкой до 15W. Автоматическая оптимизация заряда батареи, USB-C для обратной зарядки, компактный и лёгкий дизайн.' },

  // Laptop Stands
  
  
  
  
  
  
  
  { id: 'samsungevob1tb', name: 'Samsung 870 EVO 1TB 2.5" SSD', brand: 'Samsung', category: 'Аксессуары', price: 6990, image: '💾', specs: { capacity: '1TB', interface: 'SATA 2.5"', speed: '560MB/s' }, inStock: true, description: 'SSD Samsung 870 EVO 1 ТБ формата 2.5" SATA III для апгрейда ноутбука или ПК. Скорость чтения до 560 МБ/с, надёжная TLC NAND V-NAND, ресурс 600 TBW, шифрование AES-256, 5 лет гарантии.' },
  
  
  { id: 'sgtvq70d', name: 'Samsung Q70D 55" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 64900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung Q70D QLED 55" с квантовыми точками для ярких и точных цветов. 4K 120 Гц для плавного изображения и гейминга, Tizen OS, HDR10+, Object Tracking Sound Lite, Gaming Hub, Wi-Fi 6.' },
  { id: 'hisenseqledu7g', name: 'Hisense U7G 55" QLED 4K', brand: 'Hisense', category: 'Телевизоры', price: 44900, image: '📺', specs: { size: '55"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Hisense U7G 55" QLED с Full Array Local Dimming для глубокого контраста. 4K 120 Гц для гейминга, Dolby Vision и Dolby Atmos, Game Mode Pro с ALLM и VRR, VIDAA Smart TV, голосовое управление.' },
  { id: 'tcl98c645', name: 'TCL 98C645 98" 4K Mini-LED', brand: 'TCL', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '98"', resolution: '4K', panel: 'Mini-LED', refresh: '60Hz' }, inStock: false, description: 'Огромный 98" телевизор TCL с Mini-LED подсветкой — впечатляющий размер для домашнего кинотеатра. 4K разрешение, HDR10+, Dolby Vision, Google TV с тысячами приложений, Bluetooth для наушников.' },

  // Sony Televisions
  { id: 'sonykx80', name: 'Sony K-85XR80 85" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 399900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: false, description: 'Sony K-85XR80 85" с Mini-LED подсветкой и мощным процессором XR для кинематографичной картинки. Dolby Vision, Dolby Atmos, BRAVIA XR, Acoustic Multi-Audio для объёмного звука, Google TV.' },
  { id: 'sonybravia', name: 'Sony BRAVIA 7 65" 4K Mini-LED', brand: 'Sony', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '65"', resolution: '4K', panel: 'Mini-LED', refresh: '120Hz' }, inStock: true, description: 'Sony BRAVIA 7 65" с Mini-LED и процессором XR для естественного изображения. Acoustic Multi-Audio с динамиками в рамке, Dolby Vision и Dolby Atmos, Google TV, Apple AirPlay 2, HDMI 2.1.' },

  // Ring Lights
  
  
  
  
  
  
  
  
  
  
  { id: 'beyerdt880', name: 'Beyerdynamic DT 880 Pro Studio Headphones', brand: 'Beyerdynamic', category: 'Наушники', price: 11990, image: '🎧', specs: { type: 'Wired', impedance: '250 Ohm', frequency: '5Hz-35kHz' }, inStock: true, description: 'Beyerdynamic DT 880 Premium 250 Ом — полуоткрытые мониторные наушники для студийной работы. Точное и детальное звучание, мягкие велюровые амбушюры, съёмный кабель, металлическая конструкция.' },


  // DJI Mini 3 Pro
  { id: 'djimini3pro', name: 'DJI Mini 3 Pro Fly More Combo', brand: 'DJI', category: 'Камеры и дроны', price: 44900, image: '🚁', specs: { weight: '249g', max_flight_time: '38min', video: '4K 30p', sensor: '1/1.3" CMOS' }, inStock: true, description: 'DJI Mini 3 Pro весом всего 249 г — не требует регистрации в большинстве стран. Камера 48 Мп с 4K 30fps, отслеживание объектов ActiveTrack 4.0, до 38 минут полёта, обход препятствий, вертикальная съёмка.' },

  // GoPro
  { id: 'gopohero12', name: 'GoPro Hero 12 Black Bundle', brand: 'GoPro', category: 'Камеры и дроны', price: 39900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 6.0' }, inStock: true, description: 'Экшн-камера GoPro Hero 12 Black с записью 5.3K 60fps и улучшенной стабилизацией HyperSmooth 6.0. Водонепроницаемость до 10 м, Bluetooth и Wi-Fi, HDR фото, крепление на магните, батарея на 25% дольше.' },
  { id: 'goprohero11', name: 'GoPro Hero 11 Black Bundle', brand: 'GoPro', category: 'Камеры и дроны', price: 29900, image: '📷', specs: { video: '5.3K 60p', sensor: '27MP', waterproof: '10m', stabilization: 'HyperSmooth 5.0' }, inStock: true, description: 'Экшн-камера GoPro Hero 11 Black с большим сенсором 27 Мп для качественных фото и 5.3K видео. HyperSmooth 5.0 стабилизация, водозащита до 10 м, HyperView для широкого угла, замедленная съёмка 240fps.' },

  // Insta360
  
  
  
  
  
  
  
  { id: 'dysonsupersonics', name: 'Dyson Supersonic Styling Iron Nickel', brand: 'Dyson', category: 'Для дома', price: 44900, image: '💈', specs: { heat: 'Intelligent', straightening: 'Yes', color: 'Nickel' }, inStock: true, description: 'Выпрямитель волос Dyson Corrale с гибкими пластинами и технологией Intelligent Heat Control. Беспроводной режим до 30 минут, 3 температуры 165-210°C, менее повреждений чем обычные утюжки, магнитная зарядка.' },

  // More Samsung Products
  { id: 'sgtv85', name: 'Samsung S95C 85" OLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 599900, image: '📺', specs: { size: '85"', resolution: '4K', panel: 'OLED', refresh: '144Hz' }, inStock: false, description: 'Samsung S95D 85" с панелью QD-OLED для идеального чёрного и ярких цветов. 144 Гц для гейминга, HDR10+ Adaptive, Gaming Hub, Dolby Atmos, антибликовое покрытие, NQ4 AI Gen2 процессор.' },
  { id: 'sgtvq90d', name: 'Samsung QN90D 75" QLED 4K', brand: 'Samsung', category: 'Телевизоры', price: 179900, image: '📺', specs: { size: '75"', resolution: '4K', panel: 'QLED', refresh: '120Hz' }, inStock: true, description: 'Samsung QN90D 75" с Neo QLED и Anti-Reflection покрытием для яркого изображения даже при свете. 4K 144 Гц для гейминга, яркость 2000 нит, Dolby Atmos, Gaming Hub, NQ4 AI Gen2 процессор.' },

  // Additional iPhones & Older Models
  { id: 'iph16pro', name: 'iPhone 16 Pro 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 169900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18 Pro' }, inStock: true, description: 'iPhone 16 Pro с чипом A18 Pro нового поколения и кнопкой Camera Control для управления съёмкой. Титановый корпус, камера 48 Мп с улучшенным зумом, USB-C, запись пространственного видео, дисплей 6.3" ProMotion 120 Гц.' },
  { id: 'iph16promax', name: 'iPhone 16 Pro Max 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 199900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.7"', chip: 'A18 Pro' }, inStock: true, description: 'iPhone 16 Pro Max с самым большим экраном 6.9" Super Retina XDR. Чип A18 Pro, съёмка 4K 120fps, до 33 часов воспроизведения видео. Кнопка Camera Control, титановый корпус, камера 48 Мп, пространственное видео.' },
  { id: 'iph16256', name: 'iPhone 16 256GB Black', brand: 'Apple', category: 'Смартфоны', price: 99900, image: '📱', specs: { storage: '256GB', color: 'Black', display: '6.1"', chip: 'A18' }, inStock: true, description: 'iPhone 16 с чипом A18 и кнопкой Action Button для персонализации. Камера 48 Мп с Photonic Engine, Dynamic Island, дисплей 6.1" Super Retina XDR, USB-C. Поддержка Apple Intelligence, спутниковая связь SOS, Ceramic Shield.' },

  // Oppo Smartphones
  { id: 'oppofind6pro', name: 'Oppo Find X6 Pro 512GB Black', brand: 'Oppo', category: 'Смартфоны', price: 89900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.82"', chip: 'Snapdragon 8 Gen 2' }, inStock: true, description: 'Oppo Find X6 Pro с системой камер Hasselblad и главным сенсором 1" Sony IMX989. Snapdragon 8 Gen 2, зарядка 100W SUPERVOOC, дисплей 6.82" AMOLED 2K 120 Гц, батарея 5000 мАч, Dolby Vision, IP68.' },

  // Vivo Smartphones
  { id: 'vivox100ultra', name: 'Vivo X100 Ultra 512GB Black', brand: 'Vivo', category: 'Смартфоны', price: 84900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Elite' }, inStock: true, description: 'Vivo X100 Ultra с телеобъективом ZEISS 200 Мп и перископной оптикой для невероятного зума. MediaTek Dimensity 9300, батарея 5500 мАч, зарядка 100W, AMOLED дисплей 2K 120 Гц, запись 8K видео.' },

  // ZTE Axon
  { id: 'ztaxon70ultra', name: 'ZTE Axon 70 Ultra 512GB Black', brand: 'ZTE', category: 'Смартфоны', price: 49900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'ZTE Axon 70 Ultra с инновационной подэкранной камерой для полностью безрамочного дисплея. Snapdragon 8 Gen 3, AMOLED 144 Гц 2K, тройная камера 64 Мп, быстрая зарядка 80W, ультратонкий дизайн.' },

  // Realme
  { id: 'realme12pro', name: 'Realme 12 Pro 512GB Black', brand: 'Realme', category: 'Смартфоны', price: 39900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.7"', chip: 'Snapdragon 7 Gen 3 Leading' }, inStock: true, description: 'Realme 12 Pro с телеобъективом-перископом 64 Мп и OIS для 3x зума — редкость в среднем сегменте. Snapdragon 7s Gen 2, AMOLED дисплей 120 Гц, зарядка 67W SUPERVOOC, дизайн в стиле швейцарских часов.' },

  // Honor Magic
  { id: 'honormagic6pro', name: 'Honor Magic 6 Pro 512GB Black', brand: 'Honor', category: 'Смартфоны', price: 79900, image: '📱', specs: { storage: '512GB', color: 'Black', display: '6.78"', chip: 'Snapdragon 8 Gen 3 Leading' }, inStock: true, description: 'Honor Magic 6 Pro с продвинутыми ИИ-функциями и камерой 50 Мп с большим сенсором. Snapdragon 8 Gen 3, батарея 5600 мАч на 2 дня, дисплей AMOLED 2K 120 Гц, защита IP68, магниевая рамка.' },

  // TCL Tablet
  { id: 'tcltab12pro', name: 'TCL Tab Pro Gen 2 12.9" 256GB', brand: 'TCL', category: 'Планшеты', price: 19900, image: '📱', specs: { size: '12.9"', resolution: '1600x2560', chip: 'MediaTek Dimensity 9100', storage: '256GB' }, inStock: true, description: 'Планшет TCL Tab Pro Gen 2 с большим дисплеем 12.9" и стилусом в комплекте. Хорошее соотношение цена-качество для большого экрана, стерео-динамики, подходит для просмотра фильмов и работы с документами.' },

  // Lenovo Tablet
  { id: 'lenovotabp12', name: 'Lenovo Tab P12 11.5" 128GB', brand: 'Lenovo', category: 'Планшеты', price: 14990, image: '📱', specs: { size: '11.5"', resolution: '2000x1200', chip: 'MediaTek Kompanio 1300T', storage: '128GB' }, inStock: true, description: 'Lenovo Tab P12 с дисплеем 11.5" 2K для работы и развлечений. Четыре динамика Dolby Atmos, батарея 10000 мАч на весь день, стилус в комплекте, подходит для заметок, чтения и потокового видео.' },

  // Amazon Tablet
  
  { id: 'huaweimatepadt11', name: 'Huawei MatePad T11 128GB', brand: 'Huawei', category: 'Планшеты', price: 9990, image: '📱', specs: { size: '10.95"', resolution: '1920x1200', chip: 'MediaTek Helio G99', storage: '128GB' }, inStock: true, description: 'Планшет Huawei MatePad T11 для повседневных задач — веб-серфинг, чтение и видео. Дисплей 10.1" IPS, лёгкий и компактный корпус, долгая автономность, детский режим с родительским контролем.' },

  // MSI Laptop
  { id: 'msistealth16ai', name: 'MSI Stealth 16 AI Studio RTX 5090', brand: 'MSI', category: 'Ноутбуки', price: 379900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core Ultra 9', ram: '32GB', gpu: 'RTX 5090', display: '16" 2.5K 144Hz' }, inStock: false, description: 'MSI Stealth 16 AI Studio с новейшей RTX 5090 — мощность для создателей контента. Дисплей 16" 4K Mini-LED 120 Гц, ультратихая система охлаждения, алюминиевый корпус 19.9 мм, Thunderbolt 5.' },

  // Gigabyte
  { id: 'gigaaeroq17', name: 'Gigabyte AERO 17 RTX 4090', brand: 'Gigabyte', category: 'Ноутбуки', price: 279900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i9-13', ram: '32GB', gpu: 'RTX 4090', display: '17" 4K OLED' }, inStock: true, description: 'Gigabyte AERO 17 для профессиональных создателей контента с RTX 4090. Дисплей 17.3" 4K Mini-LED с калибровкой X-Rite Pantone, 100% DCI-P3, Intel Core i9, до 8 часов работы, Thunderbolt 4.' },

  // ASUS ProBook
  { id: 'asusprobook15', name: 'ASUS ProBook 15 Core i7', brand: 'ASUS', category: 'Ноутбуки', price: 79900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core i7-13', ram: '16GB', display: '15.6" IPS' }, inStock: true, description: 'ASUS ProArt Studiobook 15 для творческих профессионалов — дизайнеров, видеоредакторов и 3D-художников. OLED дисплей 15.6" 4K с калибровкой Calman, RTX 4070, Thunderbolt 4, ProArt Creator Hub.' },

  // Clevo
  { id: 'clevop775', name: 'Clevo P775 17" RTX 4070', brand: 'Clevo', category: 'Ноутбуки', price: 149900, image: '💻', specs: { storage: '1TB', chip: 'Intel Core i7-13', ram: '32GB', gpu: 'RTX 4070', display: '17.3" 144Hz' }, inStock: true, description: 'Мощный ноутбук Clevo P775 17" с RTX 4070 и десктопным процессором для максимальной производительности. Возможность апгрейда RAM и SSD, система охлаждения с медными теплотрубками, дисплей FHD 144 Гц.' },

  // Framework Modular
  { id: 'frameworklaptop', name: 'Framework Laptop 16 Core Ultra', brand: 'Framework', category: 'Ноутбуки', price: 129900, image: '💻', specs: { storage: '512GB', chip: 'Intel Core Ultra 5', ram: '16GB', display: '16" 2.8K' }, inStock: true, description: 'Framework Laptop 16 — модульный ноутбук с заменяемыми компонентами и экологичным подходом. Intel Core Ultra, порты выбираете сами из модулей, апгрейд GPU, ОЗУ и SSD. Дисплей 16" 2560x1600, ремонтопригодный.' },

  // Pixelbook-like Chromebooks
  { id: 'pixelbookgo', name: 'Google Pixelbook Go 128GB Clearly White', brand: 'Google', category: 'Ноутбуки', price: 49900, image: '💻', specs: { storage: '128GB', chip: 'Intel Core m3', display: '13.3" 2K', os: 'Chrome OS' }, inStock: false, description: 'Google Pixelbook Go с Chrome OS — лёгкий хромбук весом всего 1 кг для веб-задач и учёбы. Тихая клавиатура Hush Keys, до 12 часов работы, дисплей 13.3" Full HD touch, быстрая зарядка, корпус из магния.' },

  // Gaming Monitors
  { id: 'acer272x', name: 'Acer Predator XB272 27" 360Hz', brand: 'Acer', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1080p', refresh: '360Hz', response: '0.5ms' }, inStock: true, description: 'Игровой монитор Acer Predator XB272 27" с невероятной частотой 360 Гц для киберспорта. IPS панель, время отклика 0.3 мс, NVIDIA G-Sync, 100% sRGB, регулировка высоты и наклона, VESA крепление.' },
  { id: 'asus27pro', name: 'ASUS ProArt PA278QV 27" 100% sRGB', brand: 'ASUS', category: 'Телевизоры', price: 34900, image: '📺', specs: { size: '27"', resolution: '1440p', color_accuracy: '99.9% sRGB', response: '5ms' }, inStock: true, description: 'Профессиональный монитор ASUS ProArt PA278QV 27" с заводской калибровкой ΔE<2. IPS панель, 100% sRGB и Rec. 709, WQHD 2560x1440, Calman Verified, ProArt Palette для настройки, VESA крепление.' },

  // Ultrawide Monitors
  { id: 'lgultrawide38', name: 'LG UltraWide 38" Curved Monitor', brand: 'LG', category: 'Телевизоры', price: 99900, image: '📺', specs: { size: '38"', resolution: '3840x1600', refresh: '144Hz', curvature: '1440R' }, inStock: true, description: 'LG UltraWide 38" Curved 21:9 — идеальный монитор для продуктивной работы и мультитаскинга. IPS Nano панель WQHD+, USB-C 94W для зарядки ноутбука, HDR10, FreeSync, 2 порта Thunderbolt 3.' },

  // Budget Phone Accessories
  
  { id: 'genericphonestand', name: 'Generic Metal Phone Stand', brand: 'Generic', category: 'Аксессуары', price: 590, image: '📱', specs: { material: 'Metal', adjustable: 'Yes', weight_capacity: '500g' }, inStock: true, description: 'Универсальная металлическая подставка для смартфона с регулируемым углом наклона. Прочная алюминиевая конструкция, силиконовые накладки для защиты устройства, совместима со смартфонами любых размеров.' },

  // Keychains & Small Accessories
  { id: 'appleairtagsingle', name: 'Apple AirTag Single', brand: 'Apple', category: 'Аксессуары', price: 3990, image: '🔖', specs: { technology: 'Ultra Wideband', water_resistant: 'Yes', battery: '1 year' }, inStock: true, description: 'Apple AirTag с технологией Ultra Wideband для точного определения местоположения вещей через Find My. Сменная батарея CR2032 на год, водозащита IP67, персонализация гравировкой, компактный и лёгкий.' },
  
  
  
  
  
  
  { id: 'samsungq990b', name: 'Samsung HW-Q990B Soundbar 11.1.4ch', brand: 'Samsung', category: 'Наушники', price: 99900, image: '🔊', specs: { channels: '11.1.4', power: '656W', dolby: 'Atmos' }, inStock: true, description: 'Саундбар Samsung HW-Q990B 11.1.4 с поддержкой Dolby Atmos и DTS:X для объёмного 3D-звука. Беспроводной сабвуфер и тыловые колонки, Q-Symphony с ТВ Samsung, SpaceFit Sound, Wi-Fi и Bluetooth.' },
  { id: 'jblbar1000pro', name: 'JBL Bar 1000 Pro 3.1.2ch Soundbar', brand: 'JBL', category: 'Наушники', price: 49900, image: '🔊', specs: { channels: '3.1.2', power: '880W', dolby: 'Atmos' }, inStock: true, description: 'Саундбар JBL Bar 1000 7.1.4 с Dolby Atmos и DTS:X для кинотеатрального звука дома. Отделяемые беспроводные тыловые колонки, встроенный 10" сабвуфер, калибровка PureVoice, HDMI eARC, 880W.' },

  // Budget Headphones
  { id: 'jbltunebuds', name: 'JBL Tune Buds True Wireless Earbuds', brand: 'JBL', category: 'Наушники', price: 6990, image: '🎧', specs: { type: 'TWS', battery: '8h', charging: '24h', anc: 'Yes' }, inStock: true, description: 'JBL Tune Buds TWS с Active Noise Cancelling и фирменным глубоким басом JBL Pure Bass. До 8 часов музыки, быстрая зарядка, IPX4, сенсорное управление, мультиточечное подключение, приложение JBL.' },
  
  
  { id: 'applemag', name: 'Apple Magic Keyboard + Mouse Bundle Space Gray', brand: 'Apple', category: 'Аксессуары', price: 12990, image: '⌨️', specs: { keyboard: 'Wireless', mouse: 'Magic Mouse 2', color: 'Space Gray' }, inStock: true, description: 'Комплект Apple Magic Keyboard и Magic Mouse в Space Gray — беспроводное Bluetooth подключение с мгновенным сопряжением. Rechargeable через Lightning, низкий профиль клавиатуры, Multi-Touch мышь.' },

  // Mechanical Keyboards
  { id: 'daskeyboard', name: 'Das Keyboard 5Q RGB Mechanical Keyboard', brand: 'Das Keyboard', category: 'Аксессуары', price: 19900, image: '⌨️', specs: { switches: 'Cherry MX', backlight: 'RGB', programmable: 'Yes' }, inStock: true, description: 'Механическая клавиатура Das Keyboard 5Q с переключателями Cherry MX Brown. RGB-подсветка каждой клавиши с Q-программированием, алюминиевая верхняя панель, USB-хаб, подставка для рук.' },
  { id: 'corsairrk', name: 'Corsair K95 RGB Platinum XT Mechanical', brand: 'Corsair', category: 'Аксессуары', price: 24900, image: '⌨️', specs: { switches: 'Cherry MX Speed', backlight: 'RGB', macro_keys: '6' }, inStock: true, description: 'Corsair K95 RGB Platinum XT — игровая механическая клавиатура с Cherry MX Speed для быстрых реакций. 6 макро-клавиш, iCUE RGB подсветка, алюминиевая рама, магнитная подставка для запястий.' },

  // Gaming Mice
  
  
  
  
  { id: 'xiaomilamp', name: 'Xiaomi Mi Desk Lamp Pro Smart', brand: 'Xiaomi', category: 'Для дома', price: 4990, image: '💡', specs: { color_temp: '2700-6500K', brightness: 'Adjustable', app_control: 'Yes' }, inStock: true, description: 'Умная настольная лампа Xiaomi с управлением через Mi Home и голосовыми ассистентами. Диапазон цветовой температуры 2700-6500K, яркость 520 лм, антимерцание для глаз, режим чтения и ночной свет.' },

  // Air Purifiers
  
  { id: 'sharpi3000', name: 'Sharp KC-G50EW Air Purifier', brand: 'Sharp', category: 'Для дома', price: 19900, image: '🌬️', specs: { coverage: '350 sq.ft', filter: 'HEPA', ion: 'Yes' }, inStock: true, description: 'Очиститель воздуха Sharp с плазмакластерной ионизацией Plasmacluster 25000. HEPA-фильтр 99.97%, встроенный увлажнитель, датчик пыли и запахов, для помещений до 38 м², тихий ночной режим.' },

  // Humidifiers
  
  { id: 'medbottle', name: 'MedBottle Smart Humidifier 2.5L', brand: 'MedBottle', category: 'Для дома', price: 6990, image: '💧', specs: { capacity: '2.5L', coverage: '250 sq.ft', duration: '50h' }, inStock: true, description: 'Умный увлажнитель воздуха MedBottle 2.5 л с контролем влажности и тихой работой до 28 дБ. До 50 часов непрерывной работы, автоотключение при пустом баке, ароматерапия, ночная подсветка.' },

  // Dehumidifiers
  { id: 'arellapro', name: 'Arella Pro 30L Dehumidifier', brand: 'Arella', category: 'Для дома', price: 24900, image: '💧', specs: { capacity: '30L/day', coverage: '100 sq.ft', energy_efficient: 'Yes' }, inStock: true, description: 'Осушитель воздуха Arella Pro производительностью 30 л/сутки для борьбы с влажностью. Для помещений до 100 м², автоматический режим с гигростатом, бак 6 л с автоотключением, низкий уровень шума.' },

  // Coffee Makers
  { id: 'nespresso', name: 'Nespresso Vertuo Plus Coffee Machine Piano Black', brand: 'Nespresso', category: 'Для дома', price: 12990, image: '☕', specs: { capacity: '1.2L', brewing_system: 'Vertuo', colors: '5' }, inStock: true, description: 'Капсульная кофемашина Nespresso Vertuo Plus с технологией Centrifusion для идеального кофе. 5 размеров чашки от эспрессо до кружки, автоопределение капсул, быстрый нагрев 20 секунд, бак 1.7 л.' },
  { id: 'dysonmashup', name: 'Nespresso DeLonghi Lattissima Black', brand: 'DeLonghi', category: 'Для дома', price: 9990, image: '☕', specs: { capacity: '1L', steaming: 'Automatic', color: 'Black' }, inStock: true, description: 'Кофемашина DeLonghi Lattissima с автоматическим капучинатором и системой Nespresso. Компактный дизайн, одно касание для латте, капучино и эспрессо, съёмный контейнер для молока, быстрый нагрев.' },

  // Vacuum Cleaners (Dyson alternatives)
  { id: 'sharkuv', name: 'Shark Navigator NV752 Upright Vacuum', brand: 'Shark', category: 'Для дома', price: 14990, image: '🧹', specs: { power: 'Advanced swivel steering', bagless: 'Yes', capacity: '0.98L' }, inStock: true, description: 'Вертикальный пылесос Shark Navigator NV752 с технологией Swivel Steering для маневрирования. Безмешковый с HEPA-фильтром, Anti-Allergen Complete Seal, Lift-Away для уборки лестниц, LED-подсветка.' },

  // Washing Machine Accessories
  { id: 'lg_detergent', name: 'LG Washer Detergent Capsule 200 Count', brand: 'LG', category: 'Для дома', price: 4990, image: '🧴', specs: { count: '200 capsules', formula: 'All-in-1', type: 'Front-loader compatible' }, inStock: true, description: 'Капсулы для стирки LG 200 штук — формула All-in-1 с кондиционером и пятновыводителем. Совместимы с фронтальными и вертикальными стиральными машинами, растворяются в холодной воде, гипоаллергенные.' },

  // More Gaming related
  { id: 'ps5controller', name: 'PlayStation 5 DualSense Controller White', brand: 'Sony', category: 'Игровые консоли', price: 8990, image: '🎮', specs: { connectivity: 'Wireless', vibration: 'Haptic Feedback', color: 'White' }, inStock: true, description: 'Беспроводной контроллер DualSense для PlayStation 5 с революционной тактильной обратной связью и адаптивными триггерами. Встроенный микрофон, датчик движения, USB-C, до 12 часов работы.' },
  { id: 'xboxcontroller', name: 'Xbox Series X|S Wireless Controller Black', brand: 'Microsoft', category: 'Игровые консоли', price: 7990, image: '🎮', specs: { connectivity: 'Wireless', battery: 'AA x2', color: 'Black' }, inStock: true, description: 'Беспроводной контроллер Xbox Series с текстурными рукоятками и улучшенной крестовиной. Bluetooth для ПК, USB-C, кнопка Share, совместим с Xbox Series X|S, Xbox One и Windows, до 40 часов.' },

  // Nintendo Pro Controller
  
  
  
  { id: 'wifiax200', name: 'TP-Link AX3000 WiFi 6 Router', brand: 'TP-Link', category: 'Аксессуары', price: 9990, image: '📡', specs: { standard: 'WiFi 6 (802.11ax)', speed: '3000 Mbps', coverage: '3000 sq.ft' }, inStock: true, description: 'Wi-Fi 6 роутер TP-Link AX3000 с двумя диапазонами для быстрого интернета. Скорость до 3000 Мбит/с, покрытие до 200 м², OFDMA и MU-MIMO для множества устройств, 4 гигабитных LAN-порта, USB 3.0.' },
  { id: 'meshwifi', name: 'ASUS AiMesh WiFi 6 System 3-Pack', brand: 'ASUS', category: 'Аксессуары', price: 19990, image: '📡', specs: { standard: 'WiFi 6', coverage: '5000+ sq.ft', nodes: '3' }, inStock: true, description: 'Mesh-система ASUS AiMesh Wi-Fi 6 из 3 модулей для бесшовного покрытия всего дома. До 5000+ кв.фт, автопереключение между узлами, AiProtection от угроз, родительский контроль, управление через приложение.' },

  // USB Flash Drives
  
  
  
  
  
  
  
  { id: 'tizenphone', name: 'Samsung Galaxy Watch 4 Classic 42mm', brand: 'Samsung', category: 'Часы', price: 19990, image: '⌚', specs: { display: 'AMOLED 1.4"', os: 'Wear OS 3', battery: '2+ days' }, inStock: true, description: 'Samsung Galaxy Watch 4 Classic с вращающимся безелем и Wear OS. BIA-датчик состава тела, ЭКГ, измерение давления, мониторинг сна с определением храпа, Google Assistant, Google Maps, Google Pay.' }
];
