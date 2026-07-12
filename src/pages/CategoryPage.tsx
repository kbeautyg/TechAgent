import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { getProductImage, PRODUCT_IMAGE_SIZE } from '../utils/productImages'
import { translateProductName, translateSpecValue } from '../utils/translate'
import { categoryLandings, type CategoryLanding } from '../seo/categories'

const fmt = (n: number) => n.toLocaleString('ru-RU')

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

interface Props {
  landing: CategoryLanding
}

/** Категорийная посадочная /catalog/{slug}: уникальный текст + полная сетка товаров категории */
export default function CategoryPage({ landing }: Props) {
  const items = products.filter(p => p.category === landing.category)
  const inStockCount = items.filter(p => p.inStock).length
  const minPrice = items.length ? Math.min(...items.map(p => p.price)) : 0
  const brands = [...new Set(items.map(p => p.brand))]
  const otherCategories = categoryLandings.filter(c => c.slug !== landing.slug)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Breadcrumb */}
        <nav className="pp-breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          <Link to="/catalog">Каталог</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          <span className="pp-bc-current">{landing.category}</span>
        </nav>

        {/* Header */}
        <header className="mt-6 mb-8 max-w-3xl">
          <h1 className="text-[30px] sm:text-[38px] font-extrabold tracking-tight text-text-primary mb-4 leading-[1.1]">
            {landing.h1}
          </h1>
          {landing.intro.map((p, i) => (
            <p key={i} className="text-[15px] text-text-secondary leading-relaxed mb-3">{p}</p>
          ))}
          <div className="flex flex-wrap gap-2.5 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-section text-[12.5px] font-semibold text-text-secondary">
              {items.length} моделей
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-section text-[12.5px] font-semibold text-text-secondary">
              {inStockCount} в наличии
            </span>
            {minPrice > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-section text-[12.5px] font-semibold text-text-secondary">
                от {fmt(minPrice)} ₽
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/8 text-[12.5px] font-semibold text-primary">
              Комиссия 3%
            </span>
          </div>
        </header>

        {/* Brand quick filters → каталог с фильтрами */}
        {brands.length > 1 && (
          <nav aria-label="Бренды категории" className="flex flex-wrap gap-2 mb-8">
            {brands.map(b => (
              <Link
                key={b}
                to={`/catalog?cat=${encodeURIComponent(landing.category)}&brand=${encodeURIComponent(b)}`}
                className="px-3.5 py-1.5 rounded-full border border-border bg-white text-[12.5px] font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors no-underline"
              >
                {b}
              </Link>
            ))}
            <Link
              to={`/catalog?cat=${encodeURIComponent(landing.category)}`}
              className="px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[12.5px] font-semibold text-primary hover:bg-primary/10 transition-colors no-underline"
            >
              Все фильтры →
            </Link>
          </nav>
        )}

        {/* Products grid */}
        <div className="products-grid">
          {items.map((p, i) => {
            const imgUrl = getProductImage(p.id, p.name, p.category)
            return (
              <div key={p.id} className="product-card-wrap" style={{ animationDelay: `${Math.min(i, 12) * 0.03}s` }}>
                <Link to={`/catalog/${p.id}`} className="product-card">
                  <div className="product-img">
                    <div className={`product-img-bg ${brandBgClass[p.brand] || 'cbg-default'}`} />
                    {p.inStock ? <span className="cbadge cbadge-stock">В наличии</span> : <span className="cbadge cbadge-out">Нет в наличии</span>}
                    <img src={imgUrl} alt={translateProductName(p.name)}
                      width={PRODUCT_IMAGE_SIZE} height={PRODUCT_IMAGE_SIZE}
                      className="product-real-img" loading={i < 4 ? 'eager' : 'lazy'} />
                  </div>
                  <div className="pcard-info">
                    <div className="pcard-brand">{p.brand}</div>
                    <div className="pcard-name">{translateProductName(p.name)}</div>
                    <div className="pcard-specs">
                      {Object.entries(p.specs).slice(0, 3).map(([k, v]) => translateSpecValue(k, v)).join(' · ')}
                    </div>
                    <div className="pcard-bottom">
                      <div className="pcard-price">{fmt(p.price)} <span>₽</span></div>
                      <span className="pcard-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* SEO text */}
        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-extrabold tracking-tight text-text-primary mb-4">
            {landing.category}: закупка по агентской схеме
          </h2>
          {landing.seoText.map((p, i) => (
            <p key={i} className="text-[14.5px] text-text-secondary leading-relaxed mb-3">{p}</p>
          ))}
          <p className="text-[14.5px] text-text-secondary leading-relaxed">
            Как проходит заказ и какие документы вы получаете — на странице{' '}
            <Link to="/how-it-works" className="text-primary font-semibold">«Как это работает»</Link>. Итоговую сумму с комиссией удобно посчитать в{' '}
            <Link to="/calculator" className="text-primary font-semibold">калькуляторе</Link>.
          </p>
        </section>

        {/* Other categories */}
        <section className="mt-12">
          <h2 className="text-[18px] font-extrabold tracking-tight text-text-primary mb-4">Другие категории</h2>
          <nav aria-label="Другие категории" className="flex flex-wrap gap-2">
            {otherCategories.map(c => (
              <Link
                key={c.slug}
                to={`/catalog/${c.slug}`}
                className="px-3.5 py-1.5 rounded-full border border-border bg-white text-[12.5px] font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors no-underline"
              >
                {c.category}
              </Link>
            ))}
          </nav>
        </section>

        {/* CTA */}
        <div className="mt-14 bg-primary rounded-3xl py-12 px-6 sm:px-8 text-center text-white">
          <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight mb-3">
            Нужна позиция, которой нет в каталоге?
          </h2>
          <p className="text-white/60 text-[15px] mb-7 max-w-xl mx-auto">
            Зарегистрируйтесь и напишите менеджеру — найдём и привезём под заказ с той же комиссией 3%
          </p>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary rounded-2xl text-[15px] font-semibold no-underline hover:bg-white/90 transition-colors">
            Стать партнёром <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
