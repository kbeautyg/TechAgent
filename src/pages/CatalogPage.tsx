import { Link, useSearchParams } from 'react-router-dom'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { products } from '../data/products'
import { getProductImage, PRODUCT_IMAGE_SIZE } from '../utils/productImages'
import { translateColor, translateStorage, translateSpecValue, translateProductName } from '../utils/translate'
import { categoryLandings } from '../seo/categories'
import { pluralRu } from '../seo/site'

const fmt = (n: number) => n.toLocaleString('ru-RU')

/* ── SVG Icons (inline, as designer used) ── */
const ico = {
  all: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  smartphone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  laptop: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/></svg>,
  tablet: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  headphones: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
  watch: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 01-2 1.82H9.83a2 2 0 01-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 012 1.82l.35 3.83"/></svg>,
  accessory: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  console: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M6 12h.01"/><path d="M16 10v4m-2-2h4"/></svg>,
  cameraDrone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  homeAppliance: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a6.5 6.5 0 000 13h5a6.5 6.5 0 000-13z"/><path d="M3 20v-2a4 4 0 014-4h10a4 4 0 014 4v2"/></svg>,
  smartHome: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M12 18a3 3 0 100-6 3 3 0 000 6z"/></svg>,
  eTransport: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  tv: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  arrow: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  chevL: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>,
  chevR: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  filter: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  category: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
}

const catIconMap: Record<string, keyof typeof ico> = {
  'Все': 'all', 'Смартфоны': 'smartphone', 'Ноутбуки': 'laptop', 'Планшеты': 'tablet',
  'Наушники': 'headphones', 'Часы': 'watch', 'Аксессуары': 'accessory',
  'Игровые консоли': 'console', 'Камеры и дроны': 'cameraDrone', 'Для дома': 'homeAppliance',
  'Телевизоры': 'tv', 'Умный дом': 'smartHome', 'Электротранспорт': 'eTransport',
}

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

const topBrands = ['Apple', 'Samsung', 'Xiaomi', 'Sony', 'DJI', 'Dyson', 'JBL', 'Beats', 'Nintendo']
const PER_PAGE = 20

/* ── Gather unique filter values from products ── */
function getFilterOptions() {
  const storages = new Set<string>()
  const colors = new Set<string>()
  const displays = new Set<string>()
  const chips = new Set<string>()

  products.forEach(p => {
    if (p.specs.storage) storages.add(p.specs.storage)
    if (p.specs.color) colors.add(p.specs.color)
    if (p.specs.display) displays.add(p.specs.display)
    if (p.specs.chip) chips.add(p.specs.chip)
  })

  // Sort storages by size
  const sortedStorages = [...storages].sort((a, b) => {
    const toMB = (s: string) => s.includes('TB') ? parseFloat(s) * 1024 * 1024 : parseFloat(s) * (s.includes('GB') ? 1024 : 1)
    return toMB(a) - toMB(b)
  })

  return {
    storages: sortedStorages,
    colors: [...colors].sort(),
    displays: [...displays].sort((a, b) => parseFloat(a) - parseFloat(b)),
    chips: [...chips].sort(),
  }
}

/* ── Price range helper ── */
const priceRanges = [
  { label: 'До 30 000 ₽', min: 0, max: 30000 },
  { label: '30 000 — 60 000 ₽', min: 30000, max: 60000 },
  { label: '60 000 — 100 000 ₽', min: 60000, max: 100000 },
  { label: '100 000 — 150 000 ₽', min: 100000, max: 150000 },
  { label: 'От 150 000 ₽', min: 150000, max: Infinity },
]

/* ── Состояние каталога живёт в URL: фильтры и страницы шарятся ссылкой и видны краулеру ── */
interface CatalogState {
  q: string
  cat: string
  brands: string[]
  sort: string
  stockOnly: boolean
  storages: string[]
  colors: string[]
  priceRange: number | null
  page: number
}

function readState(params: URLSearchParams): CatalogState {
  const priceRaw = params.get('price')
  const priceIdx = priceRaw === null ? NaN : parseInt(priceRaw, 10)
  return {
    q: params.get('q') ?? '',
    cat: params.get('cat') ?? 'Все',
    brands: params.getAll('brand'),
    sort: params.get('sort') ?? 'default',
    stockOnly: params.get('stock') !== 'all',
    storages: params.getAll('storage'),
    colors: params.getAll('color'),
    priceRange: Number.isInteger(priceIdx) && priceIdx >= 0 && priceIdx < priceRanges.length ? priceIdx : null,
    page: Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1),
  }
}

function writeState(state: CatalogState): URLSearchParams {
  const params = new URLSearchParams()
  if (state.q) params.set('q', state.q)
  if (state.cat !== 'Все') params.set('cat', state.cat)
  state.brands.forEach(b => params.append('brand', b))
  if (state.sort !== 'default') params.set('sort', state.sort)
  if (!state.stockOnly) params.set('stock', 'all')
  state.storages.forEach(s => params.append('storage', s))
  state.colors.forEach(c => params.append('color', c))
  if (state.priceRange !== null) params.set('price', String(state.priceRange))
  if (state.page > 1) params.set('page', String(state.page))
  return params
}

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const state = useMemo(() => readState(searchParams), [searchParams])
  const { q: search, cat, brands: brand, sort, stockOnly, storages: selStorage, colors: selColor, priceRange: selPriceRange, page } = state

  /* Патч состояния → URL. Любое изменение фильтра сбрасывает страницу */
  const patchState = useCallback((patch: Partial<CatalogState>, opts?: { replace?: boolean }) => {
    setSearchParams(prev => {
      const next = { ...readState(prev), ...('page' in patch ? {} : { page: 1 }), ...patch }
      return writeState(next)
    }, { replace: opts?.replace ?? false, preventScrollReset: true })
  }, [setSearchParams])

  /* Локальные UI-состояния мобильных шторок (не влияют на выдачу) */
  const [popup, setPopup] = useState<'cats' | 'filters' | null>(null)
  const showCatPopup = popup === 'cats'
  const showFilterPopup = popup === 'filters'

  const filterOpts = useMemo(() => getFilterOptions(), [])
  const categories = useMemo(() => ['Все', ...Array.from(new Set(products.map(p => p.category)))], [])
  const catCounts = useMemo(() => {
    const m: Record<string, number> = { 'Все': products.length }
    products.forEach(p => { m[p.category] = (m[p.category] || 0) + 1 })
    return m
  }, [])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (brand.length > 0) count += brand.length
    if (selStorage.length > 0) count += selStorage.length
    if (selColor.length > 0) count += selColor.length
    if (selPriceRange !== null) count++
    if (!stockOnly) count++
    return count
  }, [brand, selStorage, selColor, selPriceRange, stockOnly])

  const filtered = useMemo(() => {
    let r = products.filter(p => {
      const q = search.toLowerCase()
      const mS = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || Object.values(p.specs).some(v => v.toLowerCase().includes(q))
      const mC = cat === 'Все' || p.category === cat
      const mB = brand.length === 0 || brand.includes(p.brand)
      const mK = !stockOnly || p.inStock
      const mSt = selStorage.length === 0 || selStorage.includes(p.specs.storage || '')
      const mCl = selColor.length === 0 || selColor.includes(p.specs.color || '')
      const mPr = selPriceRange === null || (p.price >= priceRanges[selPriceRange].min && p.price < priceRanges[selPriceRange].max)
      return mS && mC && mB && mK && mSt && mCl && mPr
    })
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price)
    return r
  }, [search, cat, brand, sort, stockOnly, selStorage, selColor, selPriceRange])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  /* Ссылка на страницу пагинации с сохранением всех фильтров */
  const pageHref = useCallback((n: number) => {
    const params = writeState({ ...state, page: n })
    const qs = params.toString()
    return qs ? `/catalog?${qs}` : '/catalog'
  }, [state])

  const toggleBrand = (b: string) => patchState({ brands: brand.includes(b) ? brand.filter(x => x !== b) : [...brand, b] })
  const toggleStorage = (s: string) => patchState({ storages: selStorage.includes(s) ? selStorage.filter(x => x !== s) : [...selStorage, s] })
  const toggleColor = (c: string) => patchState({ colors: selColor.includes(c) ? selColor.filter(x => x !== c) : [...selColor, c] })

  const resetFilters = useCallback(() => {
    patchState({ brands: [], storages: [], colors: [], priceRange: null, stockOnly: true })
  }, [patchState])

  const resetAll = useCallback(() => {
    patchState({ q: '', cat: 'Все', brands: [], storages: [], colors: [], priceRange: null, stockOnly: true })
  }, [patchState])

  // Lock body scroll when popup is open
  useEffect(() => {
    if (showCatPopup || showFilterPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showCatPopup, showFilterPopup])

  const pageNums = (): (number | 'dots')[] => {
    const p: (number | 'dots')[] = []
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) p.push(i) }
    else {
      p.push(1)
      if (page > 3) p.push('dots')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) p.push(i)
      if (page < totalPages - 2) p.push('dots')
      p.push(totalPages)
    }
    return p
  }

  /* ── Sidebar content (reused in desktop and mobile popup) ── */
  const CategoriesContent = () => (
    <div className="cat-list">
      {categories.map(c => (
        <div key={c} className={`cat-item${cat === c ? ' active' : ''}`} onClick={() => { patchState({ cat: c }); setPopup(null) }}>
          <span className="cat-icon-wrap">{ico[catIconMap[c] || 'all']}</span>
          {c === 'Бытовая техника' ? 'Быт. техника' : c}
          <span className="cat-count">{catCounts[c] || 0}</span>
        </div>
      ))}
    </div>
  )

  const FiltersContent = ({ onApply }: { onApply?: () => void }) => (
    <>
      {/* Price range */}
      <div className="filter-section">
        <div className="filter-title">
          Цена
          {selPriceRange !== null && <span className="filter-clear" onClick={() => patchState({ priceRange: null })}>Сбросить</span>}
        </div>
        <div className="filter-checks">
          {priceRanges.map((pr, i) => (
            <label key={i} className={`filter-check-item${selPriceRange === i ? ' active' : ''}`} onClick={() => patchState({ priceRange: selPriceRange === i ? null : i })}>
              <span className={`filter-checkbox${selPriceRange === i ? ' checked' : ''}`}>
                {selPriceRange === i && ico.check}
              </span>
              {pr.label}
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="filter-section">
        <div className="filter-title">
          Бренд
          {brand.length > 0 && <span className="filter-clear" onClick={() => patchState({ brands: [] })}>Сбросить</span>}
        </div>
        <div className="brand-chips">
          {topBrands.map(b => (
            <div key={b} className={`brand-chip${brand.includes(b) ? ' active' : ''}`} onClick={() => toggleBrand(b)}>{b}</div>
          ))}
        </div>
      </div>

      {/* Storage */}
      {filterOpts.storages.length > 0 && (
        <div className="filter-section">
          <div className="filter-title">
            Память
            {selStorage.length > 0 && <span className="filter-clear" onClick={() => patchState({ storages: [] })}>Сбросить</span>}
          </div>
          <div className="brand-chips">
            {filterOpts.storages.map(s => (
              <div key={s} className={`brand-chip${selStorage.includes(s) ? ' active' : ''}`} onClick={() => toggleStorage(s)}>{translateStorage(s)}</div>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {filterOpts.colors.length > 0 && (
        <div className="filter-section">
          <div className="filter-title">
            Цвет
            {selColor.length > 0 && <span className="filter-clear" onClick={() => patchState({ colors: [] })}>Сбросить</span>}
          </div>
          <div className="filter-checks filter-checks-cols">
            {filterOpts.colors.slice(0, 12).map(c => (
              <label key={c} className={`filter-check-item${selColor.includes(c) ? ' active' : ''}`} onClick={() => toggleColor(c)}>
                <span className={`filter-checkbox${selColor.includes(c) ? ' checked' : ''}`}>
                  {selColor.includes(c) && ico.check}
                </span>
                {translateColor(c)}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* In stock toggle */}
      <div className="filter-section">
        <div className="toggle-row">
          <span className="toggle-label">Только в наличии</span>
          <div className={`ctoggle${stockOnly ? ' on' : ''}`} onClick={() => patchState({ stockOnly: !stockOnly })} />
        </div>
      </div>

      {/* Apply button (mobile only) */}
      {onApply && (
        <button className="filter-apply-btn" onClick={onApply}>
          Показать {filtered.length} товаров
        </button>
      )}
    </>
  )

  return (
    <div className="catalog-root">
      {/* ── SEO-шапка каталога ── */}
      <header className="catalog-header max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-1">
        <h1 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight text-text-primary mb-2">
          Каталог электроники для бизнеса
        </h1>
        <p className="text-[14px] text-text-muted max-w-2xl mb-4">
          {products.length} {pluralRu(products.length, ['товар', 'товара', 'товаров'])} под заказ по агентской схеме: комиссия 3%, доставка 5–7 дней. Цены указаны без комиссии.
        </p>
        <nav aria-label="Категории каталога" className="flex flex-wrap gap-2 pb-2">
          {categoryLandings.map(c => (
            <Link
              key={c.slug}
              to={`/catalog/${c.slug}`}
              className="px-3.5 py-1.5 rounded-full border border-border bg-white text-[12.5px] font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors no-underline"
            >
              {c.category}
            </Link>
          ))}
        </nav>
      </header>

      <main className="catalog-main">
        {/* ── Sidebar (desktop only) ── */}
        <aside className="catalog-sidebar">
          <div className="filter-section">
            <div className="filter-title">Категории</div>
            <CategoriesContent />
          </div>
          <div className="sidebar-divider" />
          <FiltersContent />
        </aside>

        {/* ── Products ── */}
        <div className="products-area">
          {/* ── Mobile: Two buttons (Categories + Filters) ── */}
          <div className="catalog-mobile-btns lg:hidden">
            <button
              className={`catalog-mob-btn${cat !== 'Все' ? ' has-active' : ''}`}
              onClick={() => setPopup('cats')}
            >
              {ico.category}
              <span>Категории</span>
              {cat !== 'Все' && <span className="mob-btn-badge">1</span>}
            </button>
            <button
              className={`catalog-mob-btn${activeFiltersCount > 0 ? ' has-active' : ''}`}
              onClick={() => setPopup('filters')}
            >
              {ico.filter}
              <span>Фильтры</span>
              {activeFiltersCount > 0 && <span className="mob-btn-badge">{activeFiltersCount}</span>}
            </button>
          </div>

          <div className="catalog-search-wrap">
            <span className="csearch-icon">{ico.search}</span>
            <input className="csearch-input" type="text" placeholder={`Поиск по ${products.length}+ товарам...`} value={search} onChange={e => patchState({ q: e.target.value }, { replace: true })} />
            {search && <button className="csearch-clear" onClick={() => patchState({ q: '' }, { replace: true })}>✕</button>}
          </div>

          <div className="products-topbar">
            <div className="products-count">Найдено <strong>{filtered.length}</strong> товаров</div>
            <div className="products-sort-wrap">
              <span className="sort-label">Сортировка:</span>
              <select className="sort-select" value={sort} onChange={e => patchState({ sort: e.target.value })}>
                <option value="default">По популярности</option>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
              </select>
            </div>
          </div>

          {shown.length > 0 ? (
            <div className="products-grid">
              {shown.map((p, i) => {
                const imgUrl = getProductImage(p.id, p.name, p.category)
                return (
                <div key={p.id} className="product-card-wrap" style={{ animationDelay: `${i * 0.03}s` }}>
                  <Link to={`/catalog/${p.id}`} className="product-card">
                    <div className="product-img">
                      <div className={`product-img-bg ${brandBgClass[p.brand] || 'cbg-default'}`} />
                      {p.inStock ? <span className="cbadge cbadge-stock">В наличии</span> : <span className="cbadge cbadge-out">Нет в наличии</span>}
                      {imgUrl ? (
                        <img src={imgUrl} alt={translateProductName(p.name)}
                          width={PRODUCT_IMAGE_SIZE} height={PRODUCT_IMAGE_SIZE}
                          className="product-real-img"
                          loading="lazy" />
                      ) : (
                        <div className="product-shape"><div className="product-shape-letter">{p.brand[0]}</div></div>
                      )}
                    </div>
                    <div className="pcard-info">
                      <div className="pcard-brand">{p.brand}</div>
                      <div className="pcard-name">{translateProductName(p.name)}</div>
                      <div className="pcard-specs">
                        {Object.entries(p.specs).slice(0, 3).map(([k, v]) => translateSpecValue(k, v)).join(' · ')}
                      </div>
                      <div className="pcard-bottom">
                        <div className="pcard-price">{fmt(p.price)} <span>₽</span></div>
                        <span className="pcard-btn">{ico.arrow}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                )
              })}
            </div>
          ) : (
            <div className="catalog-empty">
              <div className="catalog-empty-icon">{ico.search}</div>
              <h3>Ничего не нашлось</h3>
              <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
              <button className="catalog-reset-btn" onClick={resetAll}>Сбросить фильтры</button>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="cpagination" aria-label="Страницы каталога">
              <Link
                to={pageHref(Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={`cpage-btn arrow${page === 1 ? ' disabled pointer-events-none opacity-40' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >{ico.chevL}</Link>
              {pageNums().map((n, i) =>
                n === 'dots' ? <span key={`d${i}`} className="cpage-dots">…</span> : (
                  <Link
                    key={n}
                    to={pageHref(n as number)}
                    className={`cpage-btn${page === n ? ' active' : ''}`}
                    aria-current={page === n ? 'page' : undefined}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >{n}</Link>
                )
              )}
              <Link
                to={pageHref(Math.min(totalPages, page + 1))}
                aria-disabled={page === totalPages}
                className={`cpage-btn arrow${page === totalPages ? ' disabled pointer-events-none opacity-40' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >{ico.chevR}</Link>
            </nav>
          )}
        </div>
      </main>

      {/* ═══ Mobile Category Popup (Bottom Sheet) ═══ */}
      {showCatPopup && (
        <div className="catalog-popup-overlay" onClick={() => setPopup(null)}>
          <div className="catalog-popup-sheet" onClick={e => e.stopPropagation()}>
            <div className="popup-sheet-handle" />
            <div className="popup-sheet-header">
              <h3>Категории</h3>
              <button className="popup-close-btn" onClick={() => setPopup(null)}>{ico.close}</button>
            </div>
            <div className="popup-sheet-body">
              <CategoriesContent />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Mobile Filters Popup (Bottom Sheet) ═══ */}
      {showFilterPopup && (
        <div className="catalog-popup-overlay" onClick={() => setPopup(null)}>
          <div className="catalog-popup-sheet catalog-popup-sheet-tall" onClick={e => e.stopPropagation()}>
            <div className="popup-sheet-handle" />
            <div className="popup-sheet-header">
              <h3>Фильтры</h3>
              <div className="popup-header-actions">
                {activeFiltersCount > 0 && (
                  <button className="popup-reset-btn" onClick={resetFilters}>Сбросить всё</button>
                )}
                <button className="popup-close-btn" onClick={() => setPopup(null)}>{ico.close}</button>
              </div>
            </div>
            <div className="popup-sheet-body">
              <FiltersContent onApply={() => setPopup(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
