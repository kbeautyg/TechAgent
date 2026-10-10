import type { ReactNode } from 'react'
import { cartCount, cartDelivery, cartGoodsTotal, type CartItem } from '../../utils/cart'
import { formatPrice } from '../../utils/calculate'
import { pluralRu, DELIVERY_TERM } from '../../seo/site'

/** Итог заказа: товары, доставка в пункт СДЭК, к оплате. Один и тот же блок в корзине и при оформлении */
export default function CartSummary({ items, children, delivery: forced }: { items: CartItem[]; children?: ReactNode; delivery?: number }) {
  const count = cartCount(items)
  // 0 — выбран пункт партнёра: доставка входит в цену
  const delivery = forced ?? cartDelivery(items)
  const partner = forced === 0
  return (
    <div className="cart-summary">
      <div className="cart-sum-row">
        <span>
          Товары, {count}&nbsp;{pluralRu(count, ['штука', 'штуки', 'штук'])}
        </span>
        <span className="text-text-primary font-semibold whitespace-nowrap">{formatPrice(cartGoodsTotal(items))}</span>
      </div>
      <div className="cart-sum-row">
        <span>{partner ? <>Доставка в&nbsp;пункт партнёра</> : <>Доставка в&nbsp;пункт СДЭК</>}</span>
        <span className="text-text-primary font-semibold whitespace-nowrap">
          {delivery === null ? 'уточним' : partner ? 'входит в цену' : delivery === 0 ? 'бесплатно' : formatPrice(delivery)}
        </span>
      </div>
      <div className="cart-sum-total">
        <span>
          Итого
          {delivery === null && <small className="block text-[12.5px] font-medium text-text-muted tracking-normal">без доставки — её сумму сообщим при подтверждении</small>}
        </span>
        <span className="whitespace-nowrap">{formatPrice(cartGoodsTotal(items) + (delivery ?? 0))}</span>
      </div>
      <p className="cart-sum-note">
        Пункт выдачи выберете на карте на следующем шаге. Продавец — ООО&nbsp;«ТехЭйджент», оплата через СБП, срок доставки — {DELIVERY_TERM}.
      </p>
      {children}
    </div>
  )
}
