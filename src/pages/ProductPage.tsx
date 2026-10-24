import { Link, useParams, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { getProductImage, withVersion, PRODUCT_IMAGE_SIZE } from '../utils/productImages'
import { translateSpecKey, translateSpecValue, translateProductName } from '../utils/translate'
import { getCategoryByName } from '../seo/categories'
import PurchaseTerms from '../components/catalog/PurchaseTerms'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
import { useCart, addToCart, setCartQty, findLine, MAX_QTY } from '../utils/cart'
import type { Product } from '../data/products'

/** Покупка на сайте: «В корзину», а когда товар уже там — количество и переход к оформлению */
function BuyBox({ product, color }: { product: Product; color?: string }) {
  const line = findLine(useCart(), product.id, color)
  if (!product.inStock) {
    return (
      <div className="pp-buy">
        <button type="button" disabled className="app-btn app-btn-primary">Сейчас недоступен для заказа</button>
      </div>
    )
  }
  if (!line) {
    return (
      <div className="pp-buy">
        <button type="button" onClick={() => addToCart(product.id, color)} className="app-btn app-btn-primary">
          <ShoppingCart size={20} /> В корзину
        </button>
        <p className="pp-buy-note">Доставка в пункт СДЭК или постамат, оплата через СБП</p>
      </div>
    )
  }
  return (
    <div className="pp-buy">
      <div className="pp-buy-row">
        <div className="cart-qty cart-qty-lg" role="group" aria-label="Количество в корзине">
          <button type="button" onClick={() => setCartQty(product.id, color, line.qty - 1)} aria-label="Меньше">
            <Minus size={18} />
          </button>
          <span aria-live="polite">{line.qty}</span>
          <button type="button" onClick={() => setCartQty(product.id, color, line.qty + 1)} disabled={line.qty >= MAX_QTY} aria-label="Больше">
            <Plus size={18} />
          </button>
        </div>
        <Link to="/cart" className="app-btn app-btn-primary flex-1 whitespace-nowrap" aria-label="Товар в корзине — перейти к оформлению">
          <Check size={20} className="flex-none" /> Оформить
        </Link>
      </div>
      <p className="pp-buy-note">Доставка в пункт СДЭК или постамат, оплата через СБП</p>
    </div>
  )
}

const fmt = (n: number) => n.toLocaleString('ru-RU')

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id)
  const [params, setParams] = useSearchParams()

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="text-[64px] opacity-10 mb-6">?</div>
        <h1 className="text-2xl sm:text-[32px] font-extrabold mb-3">Товар не найден</h1>
        <p className="text-text-muted text-[15px] mb-6">К сожалению, товара с таким ID не существует</p>
        <Link to="/catalog" className="pp-cta-primary inline-flex w-auto px-8 py-3.5">
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  const specs = Object.entries(product.specs)
  const related = products.filter(p => p.category === product.category && p.family !== product.family)
    .filter((p, i, arr) => arr.findIndex(x => x.family === p.family) === i).slice(0, 4)
  const bgClass = brandBgClass[product.brand] || 'cbg-default'
  const categoryLanding = getCategoryByName(product.category)
  const categoryHref = categoryLanding ? `/catalog/${categoryLanding.slug}` : `/catalog?cat=${encodeURIComponent(product.category)}`

  // Конфигурации модели (память, размер, комплектация) — соседние карточки той же модели, по возрастанию цены
  const siblings = products.filter(p => p.family === product.family && p.variant).sort((a, b) => a.price - b.price)
  // Цвет — внутри карточки: ?color= в адресе, чтобы ссылкой можно было поделиться
  const asked = params.get('color')
  const color = product.colors.find(c => c.name === asked) ?? product.colors[0]
  const colorName = color?.name || undefined
  const image = withVersion(color?.image || '') || getProductImage(product.id)
  // У часов Apple одно фото на все цвета — тогда миниатюры в выборе цвета не нужны
  const colorThumbs = new Set(product.colors.map(c => c.image)).size > 1
  const pickColor = (name: string) => {
    const next = new URLSearchParams(params)
    if (name === product.colors[0]?.name) next.delete('color'); else next.set('color', name)
    setParams(next, { replace: true, preventScrollReset: true })
  }
  /** Ссылка на конфигурацию в том же цвете, если он у неё есть */
  const variantHref = (p: Product) => `/catalog/${p.id}${colorName && p.colors.some(c => c.name === colorName) && p.colors[0]?.name !== colorName ? `?color=${encodeURIComponent(colorName)}` : ''}`

  return (
    <div className="pp-root">
      {/* Breadcrumb */}
      <nav className="pp-breadcrumb" aria-label="Хлебные крошки">
        <Link to="/catalog">Каталог</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <Link to={categoryHref}>{product.category}</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <Link to={`/catalog?brand=${encodeURIComponent(product.brand)}`}>{product.brand}</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span className="pp-bc-current">{translateProductName(product.name)}</span>
      </nav>

      {/* Hero */}
      <section className="pp-hero">
        {/* Gallery */}
        <div className="pp-gallery">
          <div className="pp-gallery-main">
            <div className={`pp-gallery-bg ${bgClass}`} />
            {product.inStock && <span className="pp-gbadge pp-gbadge-stock">Доступен к заказу</span>}
            {!product.inStock && <span className="pp-gbadge pp-gbadge-out">Недоступен</span>}
            {image ? (
              <img key={image} src={image} alt={`${translateProductName(product.name)}${colorName && product.colors.length > 1 ? `, ${colorName}` : ''}`}
                width={PRODUCT_IMAGE_SIZE} height={PRODUCT_IMAGE_SIZE}
                loading="eager" fetchPriority="high" className="pp-gallery-img" />
            ) : (
              <div className="pp-gallery-shape">
                <span className="pp-gallery-letter">{product.brand[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="pp-info">
          <h1 className="pp-title">{translateProductName(product.name)}</h1>
          {product.description && (
            <p className="pp-description">{product.description}</p>
          )}

          {/* Price */}
          <div className="pp-price-block">
            <div className="pp-price-row">
              <span className="pp-price-current">{fmt(product.price)}</span>
              <span className="pp-price-currency">₽</span>
            </div>
          </div>

          {/* Конфигурации: ссылки на соседние карточки модели, цена меняется вместе с выбором */}
          {siblings.length > 1 && (
            <div className="pp-variants">
              <div className="pp-variant-label">{/\d\s?(ГБ|ТБ)/.test(product.variant || '') ? 'Память' : 'Вариант'}</div>
              <div className="pp-variant-chips">
                {siblings.map(v => (
                  <Link
                    key={v.id}
                    to={variantHref(v)}
                    replace
                    preventScrollReset
                    aria-current={v.id === product.id ? 'page' : undefined}
                    className={`pp-variant-chip${v.id === product.id ? ' active' : ''}`}
                  >
                    <span>{v.variant}</span>
                    {v.id !== product.id && <small>{v.price > product.price ? '+' : '−'}{fmt(Math.abs(v.price - product.price))} ₽</small>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Цвет: меняет фото, цена та же */}
          {product.colors.length > 1 && (
            <div className="pp-variants">
              <div className="pp-variant-label">Цвет — {colorName}</div>
              <div className="pp-variant-chips">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => pickColor(c.name)}
                    aria-pressed={c.name === colorName}
                    className={`pp-variant-chip pp-color-chip${colorThumbs ? '' : ' pp-color-chip-text'}${c.name === colorName ? ' active' : ''}`}
                  >
                    {colorThumbs && c.image && <img src={withVersion(c.image)} alt="" width={28} height={28} loading="lazy" />}
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <BuyBox product={product} color={colorName} />

          {/* Для партнёров: заказ покупателю в своём пункте выдачи. Отдельный блок с красной чертой — другой путь покупки */}
          <div className="pp-partner">
            <p className="pp-partner-title">Вы партнёр TechAgent?</p>
            <p className="pp-partner-text">Оформите этот товар для покупателя в своём кабинете — он получит его в вашем пункте выдачи.</p>
            <div className="pp-partner-btns">
              <Link to="/dashboard/orders/new" className="pp-partner-main">Оформить в кабинете партнёра</Link>
              <Link to="/register" className="pp-partner-alt">Стать партнёром</Link>
            </div>
          </div>

          {/* Условия покупки */}
          <section className="mb-8" aria-labelledby="pp-terms-title">
            <h2 id="pp-terms-title" className="text-[17px] font-extrabold tracking-tight text-text-primary mb-3">Как купить</h2>
            <PurchaseTerms />
          </section>

        </div>
      </section>

      {/* Specs */}
      <section className="pp-specs-section">
        <h2 className="pp-specs-title">Характеристики</h2>
        <div className="pp-specs-grid">
          {specs.map(([label, value]) => (
            <div key={label} className="pp-spec-card">
              <div className="pp-spec-label">{translateSpecKey(label)}</div>
              <div className="pp-spec-value">{translateSpecValue(label, value)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pp-related-section">
          <div className="pp-related-header">
            <h2 className="pp-specs-title">Похожие товары</h2>
            <Link to="/catalog" className="pp-related-link">
              Все товары
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="pp-related-grid">
            {related.map(p => {
              const relImg = getProductImage(p.id, p.name, p.category)
              return (
              <Link to={`/catalog/${p.id}`} key={p.id} className="product-card">
                <div className="product-img">
                  <div className={`product-img-bg ${brandBgClass[p.brand] || 'cbg-default'}`} />
                  {p.inStock ? <span className="cbadge cbadge-stock">Доступен к заказу</span> : <span className="cbadge cbadge-out">Недоступен</span>}
                  {relImg ? (
                    <img src={relImg} alt={translateProductName(p.name)} width={PRODUCT_IMAGE_SIZE} height={PRODUCT_IMAGE_SIZE} className="product-real-img" loading="lazy" />
                  ) : (
                    <div className="product-shape"><div className="product-shape-letter">{p.brand[0]}</div></div>
                  )}
                </div>
                <div className="pcard-info">
                  <div className="pcard-brand">{p.brand}</div>
                  <div className="pcard-name">{translateProductName(p.name)}</div>
                  <div className="pcard-specs">{p.summary}</div>
                  <div className="pcard-bottom">
                    <div className="pcard-price">{fmt(p.price)} <span>₽</span></div>
                    <span className="pcard-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
