import { Link, useSearchParams } from 'react-router-dom'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { products } from '../data/products'
import { getProductImage } from '../utils/productImages'

const fmt = (n: number) => n.toLocaleString('ru-RU')

/* ── Translation maps ── */
const colorRu: Record<string, string> = {
  'Black': 'Чёрный', 'White': 'Белый', 'Blue': 'Синий', 'Red': 'Красный',
  'Green': 'Зелёный', 'Purple': 'Фиолетовый', 'Gold': 'Золотой', 'Silver': 'Серебристый',
  'Gray': 'Серый', 'Grey': 'Серый', 'Pink': 'Розовый', 'Orange': 'Оранжевый',
  'Yellow': 'Жёлтый', 'Coral': 'Коралловый', 'Cream': 'Кремовый', 'Lavender': 'Лавандовый',
  'Mint': 'Мятный', 'Midnight': 'Тёмная ночь', 'Starlight': 'Сияющая звезда',
  'Natural Titanium': 'Натуральный титан', 'White Titanium': 'Белый титан',
  'Blue Titanium': 'Синий титан', 'Black Titanium': 'Чёрный титан',
  'Titanium': 'Титан', 'Graphite': 'Графит', 'Space Gray': 'Серый космос',
  'Space Black': 'Чёрный космос', 'Phantom Black': 'Фантомный чёрный',
  'Ice Blue': 'Ледяной синий', 'Sand': 'Песочный', 'Burgundy': 'Бордовый',
  'Deep Purple': 'Глубокий фиолетовый', 'Alpine Green': 'Альпийский зелёный',
  'Sierra Blue': 'Небесно-голубой',
}
const specKeyRu: Record<string, string> = {
  storage: 'Память', color: 'Цвет', display: 'Дисплей', chip: 'Процессор',
  ram: 'ОЗУ', battery: 'Батарея', camera: 'Камера', weight: 'Вес',
  connectivity: 'Связь', os: 'ОС', type: 'Тип', driver: 'Драйвер',
  anc: 'Шумоподавление', bluetooth: 'Bluetooth', waterproof: 'Водозащита',
  gps: 'GPS', health: 'Здоровье', size: 'Размер', resolution: 'Разрешение',
  brightness: 'Яркость', speakers: 'Динамики', ports: 'Порты',
  sensor: 'Сенсор', video: 'Видео', stabilization: 'Стабилизация',
  lens: 'Объектив', megapixels: 'Мегапиксели', max_flight_time: 'Полёт',
  range: 'Дальность', power: 'Мощность', features: 'Функции',
  noisecancellation: 'Шумоподавление', spatial: 'Пространственный звук',
  charging: 'Зарядка', connector: 'Разъём', material: 'Материал',
  capacity: 'Ёмкость', speed: 'Скорость', interface: 'Интерфейс',
  refresh: 'Обновление', panel: 'Матрица', gpu: 'Видеокарта',
  keyboard: 'Клавиатура', cellular: 'Сотовая связь',
}

export function translateColor(color: string): string {
  if (colorRu[color]) return colorRu[color]
  // Try to find partial match
  for (const [en, ru] of Object.entries(colorRu)) {
    if (color.includes(en)) return ru
  }
  return color
}

export function translateSpecKey(key: string): string {
  return specKeyRu[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

/* ── Storage translation map ── */
const storageRu: Record<string, string> = {
  '128GB': '128 ГБ', '256GB': '256 ГБ', '512GB': '512 ГБ', '1TB': '1 ТБ', '2TB': '2 ТБ',
  '64GB': '64 ГБ', '32GB': '32 ГБ', '16GB': '16 ГБ', '8GB': '8 ГБ', '4GB': '4 ГБ',
}

export function translateStorage(value: string): string {
  if (storageRu[value]) return storageRu[value]
  return value.replace(/(\d+)\s*TB/gi, '$1 ТБ').replace(/(\d+)\s*GB/gi, '$1 ГБ').replace(/(\d+)\s*MB/gi, '$1 МБ')
}

export function translateSpecValue(key: string, value: string): string {
  if (key === 'color') return translateColor(value)
  if (key === 'storage' || key === 'ram') return translateStorage(value)
  return value
}

export function translateProductName(name: string): string {
  let result = name
  // Translate storage
  for (const [en, ru] of Object.entries(storageRu)) {
    result = result.replace(new RegExp(`\\b${en}\\b`, 'g'), ru)
  }
  // Translate color at end of name
  for (const [en, ru] of Object.entries(colorRu)) {
    if (result.endsWith(en)) {
      result = result.slice(0, -en.length) + ru
      break
    }
    // Check with space before color
    if (result.includes(` ${en}`)) {
      result = result.replace(` ${en}`, ` ${ru}`)
    }
  }
  return result
}

/* ── SVG Icons (inline, as designer used) ── */
const ico = {
  all: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  smartphone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  laptop: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/></svg>,
  tablet: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  headphones: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
  watch: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 01-2 1.82H9.83a2 2 0 01-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 012 1.82l.35 3.83"/></svg>,
  accessory: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="6" height="10" rx="1"/><path d="M8 10h4a4 4 0 010 8H8"/><rect x="16" y="9" width="6" height="6" rx="1"/><path d="M5 7V5m0 14v2"/></svg>,
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

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState(searchParams.get('cat') || 'Все')
  const [brand, setBrand] = useState<string[]>(searchParams.get('brand') ? [searchParams.get('brand')!] : [])
  const [sort, setSort] = useState('default')
  const [stockOnly, setStockOnly] = useState(true)
  const [page, setPage] = useState(1)

  // Filter states
  const [selStorage, setSelStorage] = useState<string[]>([])
  const [selColor, setSelColor] = useState<string[]>([])
  const [selPriceRange, setSelPriceRange] = useState<number | null>(null)

  // Mobile popup states
  const [showCatPopup, setShowCatPopup] = useState(false)
  const [showFilterPopup, setShowFilterPopup] = useState(false)

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

  const toggleBrand = (b: string) => {
    setBrand(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
    setPage(1)
  }
  const toggleStorage = (s: string) => {
    setSelStorage(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
    setPage(1)
  }
  const toggleColor = (c: string) => {
    setSelColor(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
    setPage(1)
  }

  const resetFilters = useCallback(() => {
    setBrand([])
    setSelStorage([])
    setSelColor([])
    setSelPriceRange(null)
    setStockOnly(true)
    setPage(1)
  }, [])

  const resetAll = useCallback(() => {
    setSearch('')
    setCat('Все')
    resetFilters()
  }, [resetFilters])

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
        <div key={c} className={`cat-item${cat === c ? ' active' : ''}`} onClick={() => { setCat(c); setPage(1); setShowCatPopup(false) }}>
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
          {selPriceRange !== null && <span className="filter-clear" onClick={() => { setSelPriceRange(null); setPage(1) }}>Сбросить</span>}
        </div>
        <div className="filter-checks">
          {priceRanges.map((pr, i) => (
            <label key={i} className={`filter-check-item${selPriceRange === i ? ' active' : ''}`} onClick={() => { setSelPriceRange(selPriceRange === i ? null : i); setPage(1) }}>
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
          {brand.length > 0 && <span className="filter-clear" onClick={() => { setBrand([]); setPage(1) }}>Сбросить</span>}
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
            {selStorage.length > 0 && <span className="filter-clear" onClick={() => { setSelStorage([]); setPage(1) }}>Сбросить</span>}
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
            {selColor.length > 0 && <span className="filter-clear" onClick={() => { setSelColor([]); setPage(1) }}>Сбросить</span>}
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
          <div className={`ctoggle${stockOnly ? ' on' : ''}`} onClick={() => { setStockOnly(!stockOnly); setPage(1) }} />
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
              onClick={() => setShowCatPopup(true)}
            >
              {ico.category}
              <span>Категории</span>
              {cat !== 'Все' && <span className="mob-btn-badge">1</span>}
            </button>
            <button
              className={`catalog-mob-btn${activeFiltersCount > 0 ? ' has-active' : ''}`}
              onClick={() => setShowFilterPopup(true)}
            >
              {ico.filter}
              <span>Фильтры</span>
              {activeFiltersCount > 0 && <span className="mob-btn-badge">{activeFiltersCount}</span>}
            </button>
          </div>

          <div className="catalog-search-wrap">
            <span className="csearch-icon">{ico.search}</span>
            <input className="csearch-input" type="text" placeholder={`Поиск по ${products.length}+ товарам...`} value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            {search && <button className="csearch-clear" onClick={() => setSearch('')}>✕</button>}
          </div>

          <div className="products-topbar">
            <div className="products-count">Найдено <strong>{filtered.length}</strong> товаров</div>
            <div className="products-sort-wrap">
              <span className="sort-label">Сортировка:</span>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
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
                        <img src={imgUrl} alt={p.name}
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
            <div className="cpagination">
              <button className="cpage-btn arrow" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{ico.chevL}</button>
              {pageNums().map((n, i) =>
                n === 'dots' ? <span key={`d${i}`} className="cpage-dots">…</span> : (
                  <button key={n} className={`cpage-btn${page === n ? ' active' : ''}`} onClick={() => { setPage(n as number); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>{n}</button>
                )
              )}
              <button className="cpage-btn arrow" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>{ico.chevR}</button>
            </div>
          )}
        </div>
      </main>

      {/* ═══ Mobile Category Popup (Bottom Sheet) ═══ */}
      {showCatPopup && (
        <div className="catalog-popup-overlay" onClick={() => setShowCatPopup(false)}>
          <div className="catalog-popup-sheet" onClick={e => e.stopPropagation()}>
            <div className="popup-sheet-handle" />
            <div className="popup-sheet-header">
              <h3>Категории</h3>
              <button className="popup-close-btn" onClick={() => setShowCatPopup(false)}>{ico.close}</button>
            </div>
            <div className="popup-sheet-body">
              <CategoriesContent />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Mobile Filters Popup (Bottom Sheet) ═══ */}
      {showFilterPopup && (
        <div className="catalog-popup-overlay" onClick={() => setShowFilterPopup(false)}>
          <div className="catalog-popup-sheet catalog-popup-sheet-tall" onClick={e => e.stopPropagation()}>
            <div className="popup-sheet-handle" />
            <div className="popup-sheet-header">
              <h3>Фильтры</h3>
              <div className="popup-header-actions">
                {activeFiltersCount > 0 && (
                  <button className="popup-reset-btn" onClick={resetFilters}>Сбросить всё</button>
                )}
                <button className="popup-close-btn" onClick={() => setShowFilterPopup(false)}>{ico.close}</button>
              </div>
            </div>
            <div className="popup-sheet-body">
              <FiltersContent onApply={() => setShowFilterPopup(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
