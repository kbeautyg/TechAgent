/**
 * Фото и оформление товаров. Фото каталога лежат в /public/images/p/<семейство>/<цвет>.webp —
 * их готовит docs/catalog-2026-10/process_images.mjs (квадрат 900×900 на белом фоне).
 */

import { products } from '../data/products'

/** Размер обработанных фото каталога (квадрат, белый фон) — для width/height у <img> */
export const PRODUCT_IMAGE_SIZE = 900

/** Версия фото: меняется при замене файлов — иначе браузеры и кэш прокладки (30 дней) покажут старые картинки */
const IMAGE_VERSION = '20261025'

const byId = new Map(products.map((p) => [p.id, p]))

/** Фото с версией для сброса кэша */
export function withVersion(path: string): string {
  return path ? `${path}?v=${IMAGE_VERSION}` : ''
}

/**
 * Фото товара по id: фото первого цвета (или указанного цвета).
 * Для товаров, которых больше нет в каталоге (старые заказы), — пустая строка, вместо фото рисуется буква бренда.
 */
export function getProductImage(productId: string, _productName: string = '', _category: string = '', color?: string): string {
  const p = byId.get(productId)
  if (!p) return ''
  const img = (color && p.colors.find((c) => c.name === color)?.image) || p.image
  return withVersion(img)
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
