import type { Product } from '../../data/products'
import { getProductImage } from '../../utils/productImages'
import { translateProductName } from '../../utils/translate'

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

/** Квадратная миниатюра товара для корзины и оформления: фото на фоне бренда или первая буква бренда */
export default function ProductThumb({ product, size }: { product: Product; size: number }) {
  const img = getProductImage(product.id, product.name, product.category)
  return (
    <div
      className={`relative flex-none overflow-hidden rounded-2xl ${brandBgClass[product.brand] || 'cbg-default'}`}
      style={{ width: size, height: size }}
    >
      {img ? (
        <img
          src={img}
          alt={translateProductName(product.name)}
          width={size}
          height={size}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-[12%]"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center font-display font-bold text-text-muted/50" style={{ fontSize: size * 0.4 }}>
          {product.brand[0]}
        </span>
      )}
    </div>
  )
}
