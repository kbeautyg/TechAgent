import { Link, useParams, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { getProductImage, withVersion, PRODUCT_IMAGE_SIZE } from '../utils/productImages'
import { translateSpecKey, translateSpecValue, translateProductName } from '../utils/translate'
import { getCategoryByName } from '../seo/categories'
import PurchaseTerms from '../components/catalog/PurchaseTerms'
import StockFlag from '../components/catalog/StockFlag'
import { ShoppingCart, Check, Minus, Plus, Truck, CreditCard, RotateCcw } from 'lucide-react'
import { SDEK_DELIVERY_PRICE } from '../seo/site'
import { formatPrice, priceFor, hasColorPrices } from '../utils/calculate'
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
    </div>
  )
}

const fmt = (n: number) => n.toLocaleString('ru-RU')

/** Главное из условий — под кнопкой покупки, тремя строками; всё остальное — в разделе «Условия покупки» ниже */
const deliveryPrice = SDEK_DELIVERY_PRICE === null ? 'стоимость сообщим' : SDEK_DELIVERY_PRICE === 0 ? 'бесплатно' : formatPrice(SDEK_DELIVERY_PRICE)
const BUY_FACTS = [
  { icon: Truck, title: `Доставка СДЭК — ${deliveryPrice}`, text: 'В пункт выдачи или постамат, не позднее 14 дней с оплаты' },
  { icon: CreditCard, title: 'Оплата через СБП', text: 'Ссылку на оплату пришлём после проверки наличия' },
  { icon: RotateCcw, title: 'Возврат и гарантия', text: 'Исправный — 7 дней, с недостатком — 15 дней, гарантия 14 дней' },
]

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
  // Пришли из другой конфигурации в цвете, которого здесь нет — говорим об этом, а не меняем цвет молча
  const missingColor = asked && colorName && asked !== colorName ? asked : null
  // «Память» — только когда конфигурации отличаются одним объёмом; иначе («M5 · 16 ГБ · 1 ТБ», «128 ГБ · 5G») — «Конфигурация»
  const variantLabel = siblings.every(v => /^\d+\s?(ГБ|ТБ)$/.test(v.variant || '')) ? 'Память' : 'Конфигурация'
  // Цена — выбранного цвета: у разных цветов одной модели она бывает разной
  const price = priceFor(product, colorName)
  const diff = (other: number) => other === price ? 'та же цена' : `${other > price ? '+' : '−'}${fmt(Math.abs(other - price))} ₽`
  const image = withVersion(color?.image || '') || getProductImage(product.id)
  // Если у всех цветов одно фото, миниатюры в выборе цвета не нужны
  const colorThumbs = new Set(product.colors.map(c => c.image)).size > 1
  const colorPriced = hasColorPrices(product)
  const pickColor = (name: string) => {
    const next = new URLSearchParams(params)
    if (name === product.colors[0]?.name) next.delete('color'); else next.set('color', name)
    setParams(next, { replace: true, preventScrollReset: true })
  }
  /** Ссылка на конфигурацию в выбранном цвете; если у неё такого цвета нет, там покажем подсказку */
  // Если здесь выбранного цвета не было, дальше ищем всё ещё его, а не подставленный
  const wantedColor = missingColor ?? colorName
  const variantHref = (p: Product) => `/catalog/${p.id}${wantedColor && p.colors[0]?.name !== wantedColor ? `?color=${encodeURIComponent(wantedColor)}` : ''}`

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
            {product.inStock && <StockFlag variant="page" />}
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
              <span className="pp-price-current">{fmt(price)}</span>
              <span className="pp-price-currency">₽</span>
            </div>
          </div>

          {/* Конфигурации: ссылки на соседние карточки модели, цена меняется вместе с выбором */}
          {siblings.length > 1 && (
            <div className="pp-variants">
              <div className="pp-variant-label">{variantLabel}</div>
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
                    {v.id !== product.id && <small>{diff(priceFor(v, wantedColor))}</small>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Цвет: меняет фото, а если цвета стоят по-разному — и цену */}
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
                    <span className="pp-color-chip-label">
                      <span>{c.name}</span>
                      {colorPriced && c.name !== colorName && <small>{diff(priceFor(product, c.name))}</small>}
                    </span>
                  </button>
                ))}
              </div>
              {missingColor && <p className="pp-variant-note">Цвета «{missingColor}» в {product.variant ?? 'этой конфигурации'} нет — показан {colorName}</p>}
            </div>
          )}
          {product.colors.length === 1 && missingColor && (
            <p className="pp-variant-note pp-variant-note-solo">Цвета «{missingColor}» в {product.variant ?? 'этой конфигурации'} нет — есть только {colorName}</p>
          )}

          <BuyBox product={product} color={colorName} />

          <ul className="pp-facts">
            {BUY_FACTS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="pp-fact-icon"><Icon size={18} /></span>
                <span><b>{title}</b>{text}</span>
              </li>
            ))}
            <li className="pp-facts-more"><a href="#usloviya">Все условия покупки</a></li>
          </ul>

          {/* Для партнёров: заказ покупателю в своём пункте выдачи. Отдельный блок с красной чертой — другой путь покупки */}
          <div className="pp-partner">
            <p className="pp-partner-title">Вы партнёр TechAgent?</p>
            <p className="pp-partner-text">Оформите этот товар для покупателя в своём кабинете — он получит его в вашем пункте выдачи.</p>
            <div className="pp-partner-btns">
              <Link to={`/dashboard/orders/new?product=${product.id}${colorName ? `&color=${encodeURIComponent(colorName)}` : ''}`} className="pp-partner-main">Оформить в кабинете партнёра</Link>
              <Link to="/register" className="pp-partner-alt">Стать партнёром</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="pp-specs-section">
        <h2 className="pp-specs-title">Характеристики</h2>
        <dl className="pp-spec-rows">
          {specs.map(([label, value]) => (
            <div key={label} className="pp-spec-row">
              <dt>{translateSpecKey(label)}</dt>
              <dd>{translateSpecValue(label, value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Условия покупки — по темам; сюда ведёт «Все условия покупки» под кнопкой */}
      <section id="usloviya" className="pp-terms-section" aria-labelledby="pp-terms-title">
        <h2 id="pp-terms-title" className="pp-specs-title">Условия покупки</h2>
        <PurchaseTerms />
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
                  {p.inStock ? <StockFlag /> : <span className="cbadge cbadge-out">Недоступен</span>}
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
                    <div className="pcard-price">{hasColorPrices(p) && <small className="pcard-from">от </small>}{fmt(p.price)} <span>₽</span></div>
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
