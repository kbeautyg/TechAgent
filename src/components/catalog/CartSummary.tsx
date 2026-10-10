import type { ReactNode } from 'react'
import { cartCount, cartDelivery, cartGoodsTotal, cartTotal, type CartItem } from '../../utils/cart'
import { formatPrice } from '../../utils/calculate'
import { pluralRu, DELIVERY_TERM } from '../../seo/site'

/** Итог заказа: товары, доставка в пункт СДЭК, к оплате. Один и тот же блок в корзине и при оформлении */
export default function CartSummary({ items, children }: { items: CartItem[]; children?: ReactNode }) {
  const count = cartCount(items)
  const delivery = cartDelivery(items)
  return (
    <div className="cart-summary">
      <div className="cart-sum-row">
        <span>
          Товары, {count}&nbsp;{pluralRu(count, ['штука', 'штуки', 'штук'])}
        </span>
        <span className="text-text-primary font-semibold whitespace-nowrap">{formatPrice(cartGoodsTotal(items))}</span>
      </div>
      <div className="cart-sum-row">
        <span>Доставка в&nbsp;пункт СДЭК</span>
        <span className="text-text-primary font-semibold whitespace-nowrap">
          {delivery === null ? 'уточним' : delivery === 0 ? 'бесплатно' : formatPrice(delivery)}
        </span>
      </div>
      <div className="cart-sum-total">
        <span>
          Итого
          {delivery === null && <small className="block text-[12.5px] font-medium text-text-muted tracking-normal">без доставки — её сумму сообщим при подтверждении</small>}
        </span>
        <span className="whitespace-nowrap">{formatPrice(cartTotal(items))}</span>
      </div>
      <p className="cart-sum-note">
        Продавец — ООО&nbsp;«ТехЭйджент». Оплата через СБП. Срок доставки — {DELIVERY_TERM}.
      </p>
      {children}
    </div>
  )
}
