/** Russian translations for English product spec keys/values from src/data/products.ts. */

const colorRu: Record<string, string> = {
  'Black': 'Чёрный', 'White': 'Белый', 'Blue': 'Синий', 'Red': 'Красный',
  'Green': 'Зелёный', 'Purple': 'Фиолетовый', 'Gold': 'Золотой', 'Silver': 'Серебристый',
  'Gray': 'Серый', 'Grey': 'Серый', 'Pink': 'Розовый', 'Orange': 'Оранжевый',
  'Yellow': 'Жёлтый', 'Coral': 'Коралловый', 'Cream': 'Кремовый', 'Lavender': 'Лавандовый',
  'Mint': 'Мятный', 'Midnight': 'Тёмная ночь', 'Starlight': 'Сияющая звезда',
  'Natural Titanium': 'Натуральный титан', 'White Titanium': 'Белый титан',
  'Blue Titanium': 'Синий титан', 'Black Titanium': 'Чёрный титан',
  'Titanium': 'Титан', 'Graphite': 'Графит', 'Space Gray': 'Серый космос',
  'Space Black': 'Чёрный космос', 'Phantom Black': 'Фантомный чёрный',
  'Ice Blue': 'Ледяной синий', 'Sand': 'Песочный', 'Burgundy': 'Бордовый',
  'Deep Purple': 'Глубокий фиолетовый', 'Alpine Green': 'Альпийский зелёный',
  'Sierra Blue': 'Небесно-голубой',
}
const specKeyRu: Record<string, string> = {
  storage: 'Память', color: 'Цвет', display: 'Дисплей', chip: 'Процессор',
  ram: 'ОЗУ', battery: 'Батарея', camera: 'Камера', weight: 'Вес',
  connectivity: 'Связь', os: 'ОС', type: 'Тип', driver: 'Драйвер',
  anc: 'Шумоподавление', bluetooth: 'Bluetooth', waterproof: 'Водозащита',
  gps: 'GPS', health: 'Здоровье', size: 'Размер', resolution: 'Разрешение',
  brightness: 'Яркость', speakers: 'Динамики', ports: 'Порты',
  sensor: 'Сенсор', video: 'Видео', stabilization: 'Стабилизация',
  lens: 'Объектив', megapixels: 'Мегапиксели', max_flight_time: 'Полёт',
  range: 'Дальность', power: 'Мощность', features: 'Функции',
  noisecancellation: 'Шумоподавление', spatial: 'Пространственный звук',
  charging: 'Зарядка', connector: 'Разъём', material: 'Материал',
  capacity: 'Ёмкость', speed: 'Скорость', interface: 'Интерфейс',
  refresh: 'Обновление', panel: 'Матрица', gpu: 'Видеокарта',
  keyboard: 'Клавиатура', cellular: 'Сотовая связь',
}

export function translateColor(color: string): string {
  if (colorRu[color]) return colorRu[color]
  for (const [en, ru] of Object.entries(colorRu)) {
    if (color.includes(en)) return ru
  }
  return color
}
export function translateSpecKey(key: string): string {
  return specKeyRu[key] || key.charAt(0).toUpperCase() + key.slice(1)
}
const storageRu: Record<string, string> = {
  '128GB': '128 ГБ', '256GB': '256 ГБ', '512GB': '512 ГБ', '1TB': '1 ТБ', '2TB': '2 ТБ',
  '64GB': '64 ГБ', '32GB': '32 ГБ', '16GB': '16 ГБ', '8GB': '8 ГБ', '4GB': '4 ГБ',
}
export function translateStorage(value: string): string {
  if (storageRu[value]) return storageRu[value]
  return value.replace(/(\d+)\s*TB/gi, '$1 ТБ').replace(/(\d+)\s*GB/gi, '$1 ГБ').replace(/(\d+)\s*MB/gi, '$1 МБ')
}
export function translateSpecValue(key: string, value: string): string {
  if (key === 'color') return translateColor(value)
  if (key === 'storage' || key === 'ram') return translateStorage(value)
  return value
}
