import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart, setCartQty, removeFromCart, cartTotal, MAX_QTY } from '../utils/cart'
import { formatPrice } from '../utils/calculate'
import { translateProductName, translateSpecValue } from '../utils/translate'
import ProductThumb from '../components/catalog/ProductThumb'
import CartSummary from '../components/catalog/CartSummary'
import { PageBar, StickyBar } from '../components/app/ui'
import { useIsDesktop } from '../components/app/useIsDesktop'

/** Корзина покупателя: товары, количество, итог и переход к оформлению */
export default function CartPage() {
  const items = useCart()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()

  if (!items.length) {
    return (
      <div className="cart-root">
        <PageBar back="/catalog" backLabel="В каталог" title="Корзина" />
        <div className="cart-empty">
          <ShoppingBag size={44} strokeWidth={1.5} className="text-text-light" />
          <h2 className="h-sans text-[20px] font-bold text-text-primary m-0">В корзине пока пусто</h2>
          <p className="text-text-muted text-[15px] m-0">Выберите технику в каталоге — оформить заказ можно прямо на сайте.</p>
          <Link to="/catalog" className="app-btn app-btn-primary max-w-[320px] mt-2">
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  const total = cartTotal(items)
  const toCheckout = () => navigate('/checkout')

  return (
    <div className="cart-root">
      <PageBar back="/catalog" backLabel="В каталог" title="Корзина" />

      <div className="cart-layout">
        <ul className="cart-list" aria-label="Товары в корзине">
          {items.map(({ product, qty }) => {
            const specs = Object.entries(product.specs).slice(0, 2).map(([k, v]) => translateSpecValue(k, v)).join(' · ')
            return (
              <li key={product.id} className="cart-line">
                <Link to={`/catalog/${product.id}`} className="no-underline" aria-label={translateProductName(product.name)}>
                  <ProductThumb product={product} size={isDesktop ? 96 : 76} />
                </Link>
                <div className="cart-line-mid">
                  <Link to={`/catalog/${product.id}`} className="cart-line-name">
                    {translateProductName(product.name)}
                  </Link>
                  {specs && <div className="cart-line-specs">{specs}</div>}
                  <div className="cart-line-bottom">
                    <div className="cart-qty" role="group" aria-label="Количество">
                      {/* На телефоне «минус» на последней штуке убирает товар; на компьютере для этого есть отдельная кнопка */}
                      <button
                        type="button"
                        onClick={() => setCartQty(product.id, qty - 1)}
                        disabled={isDesktop && qty === 1}
                        aria-label={qty === 1 ? 'Убрать из корзины' : 'Меньше'}
                      >
                        {qty === 1 && !isDesktop ? <Trash2 size={17} /> : <Minus size={18} />}
                      </button>
                      <span aria-live="polite">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setCartQty(product.id, qty + 1)}
                        disabled={qty >= MAX_QTY}
                        aria-label="Больше"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="cart-line-price">
                      {formatPrice(product.price * qty)}
                      {qty > 1 && <small>{formatPrice(product.price)} за&nbsp;шт.</small>}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-line-remove"
                  onClick={() => removeFromCart(product.id)}
                  aria-label="Удалить из корзины"
                  title="Удалить"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            )
          })}
        </ul>

        <aside className="cart-aside">
          <CartSummary items={items}>
            <button type="button" onClick={toCheckout} className="app-btn app-btn-primary mt-5 max-lg:hidden">
              Перейти к оформлению <ArrowRight size={18} />
            </button>
          </CartSummary>
          <Link to="/catalog" className="cart-continue">Продолжить покупки</Link>
        </aside>
      </div>

      <StickyBar>
        <button type="button" onClick={toCheckout} className="app-btn app-btn-primary">
          Оформить · {formatPrice(total)}
        </button>
      </StickyBar>
    </div>
  )
}
