import { createElement } from 'react'
import type { LucideProps } from 'lucide-react'
import { productIcon } from '../../utils/productIcon'

/** Иконка товара по его категории (у заказа нет фото, а категория у товара есть) */
export default function ProductIcon({ productId, ...props }: { productId: string | undefined } & LucideProps) {
  return createElement(productIcon(productId), props)
}
