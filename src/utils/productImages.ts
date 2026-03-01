/**
 * Product image and styling utilities
 * Uses local SVG images organized by category folders
 * Images located in /public/images/{category}/{productId}.svg
 */

// Category mapping (Russian -> folder name)
const categoryFolders: Record<string, string> = {
  'Смартфоны': 'smartphones',
  'Ноутбуки': 'laptops',
  'Планшеты': 'tablets',
  'Наушники': 'headphones',
  'Часы': 'watches',
  'Камеры': 'cameras',
  'Игровые консоли': 'consoles',
  'Бытовая техника': 'appliances',
  'Телевизоры': 'tvs',
  'Аксессуары': 'accessories',
  'Аксcessуары': 'accessories',
};

/**
 * Get local product image path based on product ID and category
 * Returns path to SVG in /images/{category}/{id}.svg
 */
export function getProductImage(productId: string, _productName: string = '', category: string = ''): string {
  const folder = categoryFolders[category] || '';
  if (folder) {
    return `/images/${folder}/${productId}.svg`;
  }
  // Fallback: try all folders (shouldn't happen if category is passed)
  return `/images/smartphones/${productId}.svg`;
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
    'Камеры': '📷',
    'Бытовая техника': '🏠',
    'Телевизоры': '📺',
    'Дроны': '🚁',
    'Фотоаппараты': '📷',

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
