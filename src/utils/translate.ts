/* ── Translation maps (перенесено из CatalogPage для переиспользования в SEO-слое) ── */

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
  'Titanium Black': 'Чёрный титан', 'Titanium Gray': 'Серый титан', 'Gray Titanium': 'Серый титан',
  'Blueblack': 'Чёрно-синий', 'Obsidian': 'Обсидиан', 'Midnight Blue': 'Тёмно-синий', 'Piano Black': 'Чёрный глянцевый',
}

/** Сначала длинные названия: «Space Gray» раньше «Gray», иначе выходит «Space Серый» */
const colorRuByLength = Object.entries(colorRu).sort((a, b) => b[0].length - a[0].length)

const specKeyRu: Record<string, string> = {
  storage: 'Память', color: 'Цвет', display: 'Дисплей', chip: 'Процессор',
  ram: 'ОЗУ', battery: 'Батарея', camera: 'Камера', weight: 'Вес',
  connectivity: 'Связь', os: 'ОС', type: 'Тип', driver: 'Драйвер',
  anc: 'Шумоподавление', bluetooth: 'Bluetooth', waterproof: 'Водозащита',
  gps: 'GPS', health: 'Здоровье', size: 'Размер', resolution: 'Разрешение',
  brightness: 'Яркость', speakers: 'Динамики', ports: 'Порты',
  sensor: 'Сенсор', video: 'Видео', stabilization: 'Стабилизация',
  lens: 'Объектив', megapixels: 'Мегапиксели', max_flight_time: 'Время полёта',
  range: 'Дальность', power: 'Мощность', features: 'Функции',
  noisecancellation: 'Шумоподавление', spatial: 'Пространственный звук',
  charging: 'Зарядка', connector: 'Разъём', material: 'Материал',
  capacity: 'Ёмкость', speed: 'Скорость', interface: 'Интерфейс',
  refresh: 'Обновление', panel: 'Матрица', gpu: 'Видеокарта',
  keyboard: 'Клавиатура', cellular: 'Сотовая связь',
  band: 'Ремешок', cpu: 'Процессор', coverage: 'Площадь покрытия', standard: 'Стандарт',
  heat: 'Нагрев', vr: 'VR', transparency: 'Режим прозрачности', switches: 'Переключатели',
  response: 'Отклик', model: 'Модель', length: 'Длина', gamepass: 'Game Pass', dolby: 'Dolby',
  codec: 'Кодек', channels: 'Каналы', backlight: 'Подсветка', weight_capacity: 'Нагрузка',
  water_resistant: 'Влагозащита', vibration: 'Вибрация', technology: 'Технология',
  straightening: 'Выпрямление', steaming: 'Отпариватель', rotation: 'Поворот', protection: 'Защита',
  programmable: 'Программируемые клавиши', nodes: 'Модули', mouse: 'Мышь', motor: 'Мотор',
  macro_keys: 'Макроклавиши', ips: 'IPS', ion: 'Ионизация', impedance: 'Сопротивление',
  frequency: 'Частотный диапазон', formula: 'Формат', filter: 'Фильтр',
  energy_efficient: 'Энергоэффективность', duration: 'Время работы', digital: 'Цифровое управление',
  curvature: 'Изгиб', count: 'Количество', colors: 'Цвета', color_temp: 'Цветовая температура',
  color_accuracy: 'Цветопередача', brewing_system: 'Система заваривания', bagless: 'Без мешка',
  attachments: 'Насадки', app_control: 'Управление из приложения', ai: 'ИИ-функции',
  adjustable: 'Регулировка',
}

/* Значения характеристик: слова и единицы измерения — по-русски */
const specWordRu: Record<string, string> = {
  'Yes': 'Да', 'No': 'Нет', 'Metal': 'Металл', 'Polycarbonate': 'Поликарбонат', 'Premium': 'Премиальный',
  'Wired': 'Проводное', 'Wireless': 'Беспроводное', 'Cordless': 'Беспроводной', 'Automatic': 'Автоматический',
  'Adjustable': 'Регулируемый', 'Active': 'Активное', 'Intelligent': 'Интеллектуальное',
  'Oscillating': 'С поворотом', 'Heavy-duty': 'Усиленный', 'Over-ear': 'Полноразмерные',
  'Full Frame': 'Полнокадровый', 'FPV Drone': 'FPV-дрон', 'Haptic Feedback': 'Тактильная отдача',
  'Enhanced GPU': 'Улучшенный графический процессор', 'Sport Band': 'Спортивный ремешок',
  'Trail Band': 'Ремешок Trail', 'All-in-1': 'Всё в одном', 'Advanced swivel steering': 'Поворотная щётка',
  'Front-loader compatible': 'Для машин с фронтальной загрузкой', 'Nickel': 'Никель',
  'USB-C to Lightning': 'USB-C — Lightning', 'USB-C to USB-C': 'USB-C — USB-C',
}

function translateUnits(value: string): string {
  return value
    .replace(/^(\d+(?:\.\d+)?)(\+?)\s*sq\.ft$/i, (_, n: string, plus: string) => `${Math.round(Number(n) * 0.0929)}${plus} м²`)
    .replace(/(\d)\s*L\/day\b/g, '$1 л/сутки')
    .replace(/(\d)\+?\s*days?\b/g, (m) => m.replace(/\s*days?/, ' дн.'))
    .replace(/(\d)\s*year\b/g, '$1 год')
    .replace(/(\d)\s*capsules\b/g, '$1 капсул')
    .replace(/(\d)\s*min\b/g, '$1 мин')
    .replace(/(\d)h\b/g, '$1 ч')
    .replace(/(\d)\s*Ohm\b/g, '$1 Ом')
    .replace(/(\d)\s*kHz\b/g, '$1 кГц')
    .replace(/(\d)\s*Hz\b/g, '$1 Гц')
    .replace(/(\d)\s*MP\b/g, '$1 Мп')
    .replace(/(\d)\s*mAh\b/g, '$1 мА·ч')
    .replace(/(\d)\s*W\b/g, '$1 Вт')
    .replace(/(\d)\s*ms\b/g, '$1 мс')
    .replace(/(\d)\s*mm\b/g, '$1 мм')
    .replace(/(\d)\s*g\b/g, '$1 г')
    .replace(/(\d)\s*m\b/g, '$1 м')
    .replace(/(\d)\s*L\b/g, '$1 л')
    .replace(/(\d),(\d{3})\s*rpm\b/g, '$1 $2 об/мин')
    .replace(/(\d)\s*rpm\b/g, '$1 об/мин')
    .replace(/(\d)\s*Mbps\b/g, '$1 Мбит/с')
    .replace(/(\d)\s*MB\/s\b/g, '$1 МБ/с')
    .replace(/\bx(\d)\b/g, '× $1')
}

export function translateColor(color: string): string {
  if (colorRu[color]) return colorRu[color]
  // Try to find partial match
  for (const [en, ru] of colorRuByLength) {
    if (color.includes(en)) return ru
  }
  return color
}

export function translateSpecKey(key: string): string {
  return specKeyRu[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

/* ── Storage translation map ── */
const storageRu: Record<string, string> = {
  '128GB': '128 ГБ', '256GB': '256 ГБ', '512GB': '512 ГБ', '1TB': '1 ТБ', '2TB': '2 ТБ',
  '64GB': '64 ГБ', '32GB': '32 ГБ', '16GB': '16 ГБ', '8GB': '8 ГБ', '4GB': '4 ГБ',
}

export function translateStorage(value: string): string {
  if (storageRu[value]) return storageRu[value]
  return value.replace(/(\d+)\s*TB/gi, '$1 ТБ').replace(/(\d+)\s*GB/gi, '$1 ГБ').replace(/(\d+)\s*MB/gi, '$1 МБ')
}

export function translateSpecValue(key: string, value: string): string {
  if (key === 'color') return specWordRu[value] ?? translateColor(value)
  if (key === 'storage' || key === 'ram') return translateStorage(value)
  if (specWordRu[value]) return specWordRu[value]
  return translateUnits(value)
}

export function translateProductName(name: string): string {
  let result = name
  // Translate storage
  for (const [en, ru] of Object.entries(storageRu)) {
    result = result.replace(new RegExp(`\\b${en}\\b`, 'g'), ru)
  }
  // Translate color at end of name
  for (const [en, ru] of colorRuByLength) {
    if (result.endsWith(en)) {
      result = result.slice(0, -en.length) + ru
      break
    }
    // Check with space before color
    if (result.includes(` ${en}`)) {
      result = result.replace(` ${en}`, ` ${ru}`)
    }
  }
  return result
}
