import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { getProductImage } from '../utils/productImages'
import { translateSpecKey, translateSpecValue, translateColor, translateProductName, translateStorage } from './CatalogPage'

const fmt = (n: number) => n.toLocaleString('ru-RU')

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id)
  const [activeThumb, setActiveThumb] = useState(0)
  const navigate = useNavigate()

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
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const bgClass = brandBgClass[product.brand] || 'cbg-default'

  // Find sibling products (same model line, different storage/color)
  const getModelBase = (name: string) => {
    // Remove storage (256GB, 512GB, 1TB) and color from name to get base model
    return name.replace(/\s+\d+[GT]B/i, '').replace(/\s+(Black|White|Blue|Red|Green|Purple|Gold|Silver|Gray|Grey|Pink|Natural|Titanium|Midnight|Starlight|Graphite|Sierra|Alpine|Deep|Space|Phantom|Cream|Lavender|Mint|Burgundy|Orange|Yellow|Coral|Ice|Sand|Lime).*/i, '').trim()
  }

  const modelBase = getModelBase(product.name)
  const siblings = products.filter(p => {
    const pBase = getModelBase(p.name)
    return pBase === modelBase && p.category === product.category && p.brand === product.brand
  })

  // Get unique storage options from siblings
  const storageOptions = [...new Set(siblings.filter(s => s.specs.storage).map(s => s.specs.storage))].sort((a, b) => {
    const toMB = (s: string) => s.includes('TB') ? parseFloat(s) * 1024 * 1024 : parseFloat(s) * (s.includes('GB') ? 1024 : 1)
    return toMB(a) - toMB(b)
  })

  // Get unique color options from siblings
  const colorOptions = [...new Set(siblings.filter(s => s.specs.color).map(s => s.specs.color))]

  return (
    <div className="pp-root">
      {/* Breadcrumb */}
      <nav className="pp-breadcrumb">
        <Link to="/catalog">Каталог</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <Link to="/catalog">{product.category}</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <Link to="/catalog">{product.brand}</Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span className="pp-bc-current">{translateProductName(product.name)}</span>
      </nav>

      {/* Hero */}
      <section className="pp-hero">
        {/* Gallery */}
        <div className="pp-gallery">
          <div className="pp-gallery-main">
            <div className={`pp-gallery-bg ${bgClass}`} />
            {product.inStock && <span className="pp-gbadge pp-gbadge-stock">В наличии</span>}
            {!product.inStock && <span className="pp-gbadge pp-gbadge-out">Нет в наличии</span>}
            {getProductImage(product.id, product.name, product.category) ? (
              <img src={getProductImage(product.id, product.name, product.category)} alt={product.name} className="pp-gallery-img" />
            ) : (
              <div className="pp-gallery-shape">
                <span className="pp-gallery-letter">{product.brand[0]}</span>
              </div>
            )}
          </div>
          <div className="pp-thumbs">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`pp-thumb${activeThumb === i ? ' active' : ''}`} onClick={() => setActiveThumb(i)}>
                <div className={`pp-thumb-bg pp-thumb-bg-${i + 1} ${bgClass}`}>
                  <span className="pp-thumb-letter">{product.brand[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pp-info">
          {/* Badges */}
          <div className="pp-badges">
            {product.inStock && <span className="pp-badge pp-badge-stock">В наличии</span>}
            <span className="pp-badge pp-badge-orig">100% оригинал</span>
          </div>

          <div className="pp-brand-label">{product.brand}</div>
          <h1 className="pp-title">{translateProductName(product.name)}</h1>
          <p className="pp-subtitle">
            {Object.entries(product.specs).map(([k, v]) => translateSpecValue(k, v)).join(', ')}
          </p>
          {product.description && (
            <p className="pp-description">{product.description}</p>
          )}

          {/* Price */}
          <div className="pp-price-block">
            <div className="pp-price-row">
              <span className="pp-price-current">{fmt(product.price)}</span>
              <span className="pp-price-currency">₽</span>
            </div>
            <div className="pp-price-note">Комиссия 2–3% · Доставка 5–7 дней</div>
          </div>

          {/* Variants */}
          {storageOptions.length > 1 && (
            <div className="pp-variants">
              <div className="pp-variant-label">Память</div>
              <div className="pp-variant-chips">
                {storageOptions.map(v => {
                  const isActive = product.specs.storage === v
                  const target = siblings.find(s => s.specs.storage === v && (product.specs.color ? s.specs.color === product.specs.color : true))
                  return (
                    <div key={v} className={`pp-variant-chip${isActive ? ' active' : ''}`}
                      onClick={() => { if (target && !isActive) navigate(`/catalog/${target.id}`) }}
                      style={{ cursor: isActive ? 'default' : 'pointer' }}
                    >{translateStorage(v)}</div>
                  )
                })}
              </div>
            </div>
          )}

          {colorOptions.length > 1 && (
            <div className="pp-variants">
              <div className="pp-variant-label">Цвет — {translateColor(product.specs.color)}</div>
              <div className="pp-variant-chips">
                {colorOptions.map(v => {
                  const isActive = product.specs.color === v
                  const target = siblings.find(s => s.specs.color === v && (product.specs.storage ? s.specs.storage === product.specs.storage : true))
                  return (
                    <div key={v} className={`pp-variant-chip${isActive ? ' active' : ''}`}
                      onClick={() => { if (target && !isActive) navigate(`/catalog/${target.id}`) }}
                      style={{ cursor: isActive ? 'default' : 'pointer' }}
                    >{translateColor(v)}</div>
                  )
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pp-cta-group">
            <Link to="/dashboard/chat" className="pp-cta-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Связаться с менеджером
            </Link>
            <Link to="/register" className="pp-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6m3-3h-6"/>
              </svg>
              Зарегистрироваться
            </Link>
          </div>

          {/* Guarantees */}
          <div className="pp-guarantees">
            <div className="pp-guarantee">
              <div className="pp-guarantee-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="pp-guarantee-text">Гарантия оригинальности</div>
            </div>
            <div className="pp-guarantee">
              <div className="pp-guarantee-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div className="pp-guarantee-text">Доставка 5–7 дней</div>
            </div>
            <div className="pp-guarantee">
              <div className="pp-guarantee-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div className="pp-guarantee-text">Комиссия от 2%</div>
            </div>
            <div className="pp-guarantee">
              <div className="pp-guarantee-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <div className="pp-guarantee-text">Персональный менеджер</div>
            </div>
          </div>
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

      {/* Description dark block */}
      <section className="pp-desc-section">
        <div className="pp-desc-card">
          <h3>Почему {translateProductName(product.name)}</h3>
          <p>
            Оригинальный {product.brand} {translateProductName(product.name)} с полной гарантией и сертификацией. Закажите через TechAgent —
            комиссия всего 2–3%, доставка 5–7 рабочих дней. Все документы предоставляем.
          </p>
          <div className="pp-desc-features">
            {specs.slice(0, 3).map(([label, value]) => (
              <div key={label} className="pp-desc-feat">
                <div className="pp-desc-feat-val">{translateSpecValue(label, value)}</div>
                <div className="pp-desc-feat-label">{translateSpecKey(label)}</div>
              </div>
            ))}
          </div>
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
                  {p.inStock ? <span className="cbadge cbadge-stock">В наличии</span> : <span className="cbadge cbadge-out">Нет в наличии</span>}
                  {relImg ? (
                    <img src={relImg} alt={p.name} className="product-real-img" loading="lazy" />
                  ) : (
                    <div className="product-shape"><div className="product-shape-letter">{p.brand[0]}</div></div>
                  )}
                </div>
                <div className="pcard-info">
                  <div className="pcard-brand">{p.brand}</div>
                  <div className="pcard-name">{translateProductName(p.name)}</div>
                  <div className="pcard-specs">{Object.entries(p.specs).slice(0, 3).map(([k, v]) => translateSpecValue(k, v)).join(' · ')}</div>
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
