import { Smartphone, Laptop, Tablet, Headphones, Watch, Tv, Gamepad2, Camera, House, Cable } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { products } from '../data/products'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Смартфоны': Smartphone,
  'Ноутбуки': Laptop,
  'Планшеты': Tablet,
  'Наушники': Headphones,
  'Часы': Watch,
  'Телевизоры': Tv,
  'Игровые консоли': Gamepad2,
  'Камеры и дроны': Camera,
  'Для дома': House,
  'Аксессуары': Cable,
}

/** Иконка товара по категории — у заказа нет фото, а категория у товара есть */
export function productIcon(productId: string | undefined): LucideIcon {
  const category = products.find((p) => p.id === productId)?.category
  return (category && CATEGORY_ICONS[category]) || Smartphone
}
