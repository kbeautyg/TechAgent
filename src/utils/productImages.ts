/**
 * Product image and styling utilities
 * Uses local WebP images organized by category folders
 * Images located in /public/images/{category}/{productId}.webp
 * Generated via OpenAI DALL-E API (generate_images.py), converted by scripts/assets/convert-webp.mjs
 */

/** Интринсик-размер карточных изображений (файлы 500×500 после convert-webp.mjs) — для width/height у <img> */
export const PRODUCT_IMAGE_SIZE = 500

/**
 * Фото не соответствуют товару (другая модель, бренд или цвет) либо это чужие рекламные карточки магазинов
 * с надписями. Проверено глазами 08.10.2026. Пока нет правильных фото, вместо них показывается заглушка
 * (фон бренда и буква). Когда фото заменят в public/images/…, убрать id из списка.
 */
const IMAGE_MISMATCH = new Set<string>([
  'iph12pm256b', 'iph12p256b', 'sgts25u256b', 'sgts25u512b', 'sgts25u256t', 'sgts25p256b', 'sgts25p512b', 'sgts25256b',
  'sgts25512b', 'sgts24p256b', 'sgts24256b', 'sgts23u256b', 'sgzflip6256', 'sgzflip5256', 'xmpf5256b', 'macbookpro14m3pro512',
  'macbookpro16m3max512', 'macbookpro16m3max1tb', 'ipadpro13256', 'ipadpro13512', 'airpods2', 'airpods2c', 'airpods3', 'airpods3c',
  'sgw7', 'sonywh1000xm5s', 'sonya7rb', 'djimini4b', 'djiair3', 'djiavata', 'ps5pro', 'xboxss',
  'switcholedred', 'lgtvoled75', 'xiamibanda8', 'sgbudslive', 'bosequc45', 'sgw5pro', 'pixel9pro256', 'pixel9pro512',
  'pixel9promax256', 'motorola_razr_2024', 'huaweip70pro512', 'nothing2a256', 'asurog9pro512', 'hppaviliondm15', 'razorblade16', 'surfacepro10',
  'ankerusb', 'otterbox15pm', 'spigeniphone15pm', 'ankerasync', 'ankerpower20000', 'applepower20', 'hisenseqledu7g', 'sonykx80',
  'sonybravia', 'djimini3pro', 'iph16pro', 'iph16promax', 'iph16256', 'oppofind6pro', 'ztaxon70ultra', 'realme12pro',
  'tcltab12pro', 'clevop775', 'pixelbookgo', 'asus27pro', 'lgultrawide38', 'samsungq990b', 'jblbar1000pro',
  'applemag', 'corsairrk', 'xiaomilamp', 'medbottle', 'sharpi3000', 'arellapro', 'nespresso', 'sharkuv',
 
])

// Category mapping (Russian -> folder name)
const categoryFolders: Record<string, string> = {
  'Смартфоны': 'smartphones',
  'Ноутбуки': 'laptops',
  'Планшеты': 'tablets',
  'Наушники': 'headphones',
  'Часы': 'watches',
  'Камеры и дроны': 'cameras',
  'Игровые консоли': 'consoles',
  'Для дома': 'appliances',
  'Телевизоры': 'tvs',
  'Аксессуары': 'accessories',
  'Умный дом': 'appliances',
  'Электротранспорт': 'accessories',
};

/**
 * Get local product image path based on product ID and category
 * Returns path to WebP in /images/{category}/{id}.webp
 */
export function getProductImage(productId: string, _productName: string = '', category: string = ''): string {
  if (IMAGE_MISMATCH.has(productId)) return '';
  const folder = categoryFolders[category] || '';
  if (folder) {
    return `/images/${folder}/${productId}.webp`;
  }
  return `/images/smartphones/${productId}.webp`;
}

/**
 * Get a gradient background CSS class name for a product based on brand
 * Returns class names matching the existing CSS (cbg-*)
 */
export function getProductGradient(brand: string): string {
  const gradients: Record<string, string> = {
    'Apple': 'cbg-apple',
    'Samsung': 'cbg-samsung',
    'Xiaomi': 'cbg-xiaomi',
    'Redmi': 'cbg-xiaomi',
    'Sony': 'cbg-sony',
    'DJI': 'cbg-dji',
    'Dyson': 'cbg-dyson',
    'JBL': 'cbg-jbl',
    'Beats': 'cbg-beats',
    'Nintendo': 'cbg-nintendo',
    'Microsoft': 'cbg-default',
    'LG': 'cbg-default',
    'Google': 'cbg-google',
    'Huawei': 'cbg-default',
    'OnePlus': 'cbg-default',
    'Motorola': 'cbg-default',
  };
  return gradients[brand] || 'cbg-default';
}

/**
 * Get an emoji representation for a product category
 * Useful for fallback display when image is not available
 */
export function getProductEmoji(category: string): string {
  const emojis: Record<string, string> = {
    // Russian categories
    'Смартфоны': '📱',
    'Ноутбуки': '💻',
    'Планшеты': '📱',
    'Наушники': '🎧',
    'Часы': '⌚',
    'Аксессуары': '🔌',
    'Игровые консоли': '🎮',
    'Камеры и дроны': '📸',
    'Для дома': '🏡',
    'Умный дом': '💡',
    'Электротранспорт': '🛴',
    'Телевизоры': '📺',

    // English categories (fallback)
    'Smartphones': '📱',
    'Laptops': '💻',
    'Tablets': '📱',
    'Headphones': '🎧',
    'Smartwatch': '⌚',
    'Accessories': '🔌',
    'Gaming': '🎮',
    'Cameras': '📷',
    'Appliances': '🏠',
    'TVs': '📺',
    'Drones': '🚁',
  };
  return emojis[category] || '📦';
}

/**
 * Get the official brand color for a product
 * Returns hex color codes for brand identity
 */
export function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    'Apple': '#000000',
    'Samsung': '#1428A0',
    'Xiaomi': '#FF6900',
    'Sony': '#000000',
    'DJI': '#333333',
    'Dyson': '#6B21A8',
    'JBL': '#FF6600',
    'Beats': '#E4002B',
    'Nintendo': '#E4000F',
    'Microsoft': '#00A4EF',
    'LG': '#A50034',
    'Google': '#4285F4',
    'Huawei': '#FF0000',
    'OnePlus': '#F50514',
    'Motorola': '#00684E',
  };
  return colors[brand] || '#6B7280';
}
