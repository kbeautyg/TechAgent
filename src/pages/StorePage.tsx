import { Link, useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { ArrowRight, Search, ShoppingCart, Check, LayoutGrid } from 'lucide-react'
import { products, type Product } from '../data/products'
import { getProductImage, PRODUCT_IMAGE_SIZE } from '../utils/productImages'
import { translateProductName, translateSpecValue } from '../utils/translate'
import { categoryLandings } from '../seo/categories'
import { pluralRu, LEGAL_NAME, SDEK_DELIVERY_PRICE, DELIVERY_TERM } from '../seo/site'
import { useCart, addToCart } from '../utils/cart'
import { hasColorPrices } from '../utils/calculate'

const fmt = (n: number) => n.toLocaleString('ru-RU')
const byId = (id: string) => products.find((p) => p.id === id)
const pick = (ids: string[]) => ids.map(byId).filter((p): p is Product => !!p && p.inStock)

const brandBgClass: Record<string, string> = {
  Apple: 'cbg-apple', Samsung: 'cbg-samsung', Xiaomi: 'cbg-xiaomi',
  Sony: 'cbg-sony', DJI: 'cbg-dji', Dyson: 'cbg-dyson',
  JBL: 'cbg-jbl', Beats: 'cbg-beats', Nintendo: 'cbg-nintendo',
}

const img = (p: Product) => getProductImage(p.id, p.name, p.category)
const specLine = (p: Product, n = 3) =>
  Object.entries(p.specs).slice(0, n).map(([k, v]) => translateSpecValue(k, v)).join(' · ')

/* Витрина: товары в начале страницы. Всё — из каталога, цены тоже */
const HERO_MAIN = 'iphone-18-pro-max-256-gb'
const HERO_SIDE = ['iphone-duo-256-gb', 'galaxy-s26-ultra-256-gb']

/** Плитка категории: фото — первый товар из списка, который есть в каталоге */
const CATEGORY_PHOTO: Record<string, string> = {
  'Смартфоны': 'iphone-18-pro-256-gb', 'Ноутбуки': 'macbook-air-13-m5-10-8-16-gb-512-gb', 'Планшеты': 'ipad-pro-11-m5-256-gb-wi-fi',
  'Наушники': 'airpods-max-2', 'Часы': 'apple-watch-ultra-4-49-mm-titan', 'Игровые консоли': 'playstation-5-pro',
  'Камеры и дроны': 'dji-mini-5-pro-fly-more-combo-dji-rc-2', 'Для дома': 'dyson-airwrap-co-anda-2x',
  'Телевизоры': 'samsung-oled-s95h-65-qe65s95h', 'Аксессуары': 'airtag-2-go-pokoleniya-1-sht',
}

const categories = categoryLandings.map((c) => {
  const items = products.filter((p) => p.category === c.category && p.inStock)
  const photo = pick([CATEGORY_PHOTO[c.category] ?? ''])[0] ?? items[0]
  return {
    slug: c.slug,
    name: c.category,
    count: items.length,
    from: items.length ? Math.min(...items.map((p) => p.price)) : 0,
    photo,
  }
}).filter((c) => c.count > 0)

/** Полки с товарами: сначала выбранные вручную, потом остальные из тех же категорий — по цене */
function shelf(ids: string[], cats: string[], limit = 10): Product[] {
  const first = pick(ids)
  const taken = new Set(first.map((p) => p.family))
  // Остальные — по одной самой доступной конфигурации на модель
  const rest: Product[] = []
  for (const p of products.filter((p) => p.inStock && cats.includes(p.category)).sort((a, b) => a.price - b.price)) {
    if (taken.has(p.family)) continue
    taken.add(p.family)
    rest.push(p)
  }
  return [...first, ...rest.sort((a, b) => b.price - a.price)].slice(0, limit)
}

const shelves = [
  {
    title: 'Смартфоны',
    to: '/catalog/smartfony',
    items: shelf(['iphone-18-pro-256-gb', 'iphone-air-256-gb', 'iphone-17-256-gb', 'galaxy-s26-ultra-256-gb', 'galaxy-z-fold8-256-gb', 'pixel-11-pro-256-gb', 'galaxy-s26-256-gb', 'iphone-17e-256-gb'], ['Смартфоны']),
  },
  {
    title: 'Ноутбуки и планшеты',
    to: '/catalog/noutbuki',
    items: shelf(['macbook-air-13-m5-10-8-16-gb-512-gb', 'ipad-pro-11-m5-256-gb-wi-fi', 'macbook-neo-13-a18-pro-6-5-8-gb-256-gb', 'ipad-air-11-m4-128-gb-wi-fi', 'galaxy-tab-s11-128-gb-wi-fi', 'macbook-pro-14-m5-10-10-16-gb-512-gb'], ['Ноутбуки', 'Планшеты']),
  },
  {
    title: 'Наушники и часы',
    to: '/catalog/naushniki',
    items: shelf(['airpods-pro-3', 'apple-watch-series-12-42-mm-alyuminiy', 'airpods-max-2', 'sony-wh-1000xm6', 'apple-watch-ultra-4-49-mm-titan', 'galaxy-buds4-pro', 'galaxy-watch8-44-mm'], ['Наушники', 'Часы']),
  },
  {
    title: 'Игры, дроны и техника для дома',
    to: '/catalog/igrovye-konsoli',
    items: shelf(['playstation-5-pro', 'nintendo-switch-2', 'dyson-airwrap-co-anda-2x', 'dji-osmo-action-6-standard-combo', 'dyson-supersonic-nural', 'playstation-5-slim-1-tb', 'dji-osmo-pocket-4p-standard-combo'], ['Игровые консоли', 'Камеры и дроны', 'Для дома']),
  },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Sony', 'DJI', 'Dyson', 'Nintendo', 'JBL']
  .filter((b) => products.some((p) => p.brand === b && p.inStock))

const deliveryPrice = SDEK_DELIVERY_PRICE != null ? `${fmt(SDEK_DELIVERY_PRICE)} ₽` : 'по тарифу'

const steps = [
  {
    title: 'Корзина и пункт выдачи',
    desc: `Положите товар в корзину и выберите на карте пункт СДЭК или постамат. Доставка — ${deliveryPrice}.`,
  },
  {
    title: 'Оплата через СБП',
    desc: `Платите продавцу — ${LEGAL_NAME} — в приложении своего банка. Цена в каталоге окончательная.`,
  },
  {
    title: 'Получение',
    desc: `Товар приходит в пункт ${DELIVERY_TERM}. Этапы заказа видны в кабинете покупателя — ссылка на него в каждом письме.`,
  },
  {
    title: 'Если не подошло',
    desc: 'Товар надлежащего качества можно вернуть в течение 7 дней после получения, сохранив его вид и свойства.',
  },
]

/** «В корзину» на карточке: после нажатия — «В корзине» со ссылкой */
function CartButton({ product, dark = false }: { product: Product; dark?: boolean }) {
  const inCart = useCart().some((i) => i.product.id === product.id)
  if (inCart) {
    return (
      <Link
        to="/cart"
        className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold no-underline transition-colors ${
          dark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-accent/10 text-accent-dark hover:bg-accent/15'
        }`}
      >
        <Check size={18} /> В корзине
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); addToCart(product.id) }}
      className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-colors ${
        dark ? 'bg-white text-text-primary hover:bg-white/90' : 'bg-primary text-white hover:bg-primary-dark'
      }`}
    >
      <ShoppingCart size={18} /> В корзину
    </button>
  )
}

function ProductPhoto({ product, className = '' }: { product: Product; className?: string }) {
  const src = img(product)
  return src ? (
    <img
      src={src}
      alt={translateProductName(product.name)}
      width={PRODUCT_IMAGE_SIZE}
      height={PRODUCT_IMAGE_SIZE}
      className={`object-contain mix-blend-multiply ${className}`}
      loading="lazy"
    />
  ) : (
    <span className={`grid place-items-center font-display font-bold text-text-muted/50 text-5xl ${className}`}>{product.brand[0]}</span>
  )
}

/** Карточка на полке: фото, название, цена, «В корзину» */
function ShelfCard({ product }: { product: Product }) {
  return (
    <div className="store-shelf-card">
      <Link to={`/catalog/${product.id}`} className="block no-underline">
        <div className={`relative aspect-square rounded-2xl overflow-hidden ${brandBgClass[product.brand] || 'cbg-default'}`}>
          <ProductPhoto product={product} className="absolute inset-0 w-full h-full p-[10%]" />
        </div>
        <div className="mt-3 text-[12px] font-semibold text-text-muted uppercase tracking-wide">{product.brand}</div>
        <div className="mt-1 text-[15px] font-semibold leading-snug text-text-primary line-clamp-2 min-h-[2.75em]">
          {translateProductName(product.name)}
        </div>
      </Link>
      <div className="mt-2 text-lg font-bold text-text-primary whitespace-nowrap">{hasColorPrices(product) && 'от '}{fmt(product.price)}&nbsp;₽</div>
      <div className="mt-3 grid">
        <CartButton product={product} />
      </div>
    </div>
  )
}

function Shelf({ title, to, items }: { title: string; to: string; items: Product[] }) {
  return (
    <section className="mt-14 sm:mt-16">
      <div className="flex items-end justify-between gap-4 mb-5">
        <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight text-text-primary">{title}</h2>
        <Link to={to} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary no-underline whitespace-nowrap">
          Все <ArrowRight size={17} />
        </Link>
      </div>
      <div className="store-shelf">
        {items.map((p) => <ShelfCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}

function SearchBar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const s = q.trim()
    navigate(s ? `/catalog?q=${encodeURIComponent(s)}` : '/catalog')
  }
  return (
    <div className="flex gap-2 sm:gap-3">
      <Link
        to="/catalog"
        className="hidden sm:inline-flex items-center gap-2 h-[52px] px-5 rounded-2xl bg-primary text-white font-semibold text-[15px] no-underline hover:bg-primary-dark transition-colors"
      >
        <LayoutGrid size={19} /> Каталог
      </Link>
      <form onSubmit={submit} className="flex-1 flex items-center h-[52px] rounded-2xl border-2 border-primary/80 bg-white pl-4 pr-1.5 transition-shadow focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(27,68,245,0.12)]">
        <Search size={19} className="text-text-muted shrink-0" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="iPhone 18, AirPods, PlayStation…"
          aria-label="Поиск по каталогу"
          className="store-search-input flex-1 min-w-0 h-full bg-transparent border-none outline-none px-3 text-[16px] text-text-primary placeholder:text-text-muted"
        />
        <button type="submit" className="h-10 px-4 sm:px-5 rounded-xl bg-text-primary text-white text-sm font-semibold border-none cursor-pointer hover:bg-black">
          Найти
        </button>
      </form>
    </div>
  )
}

export default function StorePage() {
  const main = byId(HERO_MAIN)
  const side = pick(HERO_SIDE)
  const total = products.filter((p) => p.inStock).length

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-16">
        <SearchBar />

        {/* ===== Витрина: главный товар и два поменьше ===== */}
        <section className="mt-5 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {main && (
            <Link
              to={`/catalog/${main.id}`}
              className="store-hero-main group relative lg:col-span-2 lg:row-span-2 rounded-3xl overflow-hidden no-underline sm:min-h-[460px] flex flex-col sm:flex-row"
            >
              <div className="relative z-10 p-7 sm:p-10 flex flex-col sm:w-[50%]">
                <div className="text-[13px] font-semibold text-text-muted uppercase tracking-wide">{main.brand}</div>
                <h1 className="mt-2 text-[34px] sm:text-[46px] font-extrabold leading-[1.05] tracking-tight text-text-primary">
                  {translateProductName(main.name).replace(/\s+\d+\s?(ГБ|ТБ).*$/, '')}
                </h1>
                <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{specLine(main, 4)}</p>
                <div className="mt-auto pt-5 sm:pt-8">
                  <div className="text-[30px] sm:text-[34px] font-bold text-text-primary">{hasColorPrices(main) && 'от '}{fmt(main.price)}&nbsp;₽</div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <CartButton product={main} />
                    <span className="inline-flex items-center gap-1.5 h-11 px-4 text-sm font-semibold text-primary">
                      Подробнее <ArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 h-[190px] -mt-2 sm:mt-0 sm:h-auto sm:flex-1">
                <ProductPhoto product={main} className="absolute inset-0 w-full h-full p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
            </Link>
          )}
          {side.map((p) => (
            <Link
              key={p.id}
              to={`/catalog/${p.id}`}
              className={`relative rounded-3xl overflow-hidden no-underline min-h-[150px] sm:min-h-[200px] flex ${brandBgClass[p.brand] || 'cbg-default'}`}
            >
              <div className="relative z-10 p-6 flex flex-col w-[58%]">
                <div className="text-[12px] font-semibold text-text-muted uppercase tracking-wide">{p.brand}</div>
                <div className="mt-1 text-[19px] font-bold leading-tight text-text-primary">{translateProductName(p.name)}</div>
                <div className="mt-auto pt-4 text-[20px] font-bold text-text-primary">{hasColorPrices(p) && 'от '}{fmt(p.price)}&nbsp;₽</div>
              </div>
              <ProductPhoto product={p} className="absolute right-0 top-0 h-full w-[52%] p-4" />
            </Link>
          ))}
        </section>

        {/* ===== Категории ===== */}
        <section className="mt-14 sm:mt-16">
          <div className="flex items-end justify-between gap-4 mb-5">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight text-text-primary">Категории</h2>
            <Link to="/catalog" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary no-underline whitespace-nowrap">
              {total} {pluralRu(total, ['товар', 'товара', 'товаров'])} <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/catalog/${c.slug}`}
                className="group relative rounded-2xl bg-bg-light hover:bg-bg-hero transition-colors overflow-hidden no-underline h-[84px] sm:h-auto sm:aspect-square p-3 sm:p-4 flex flex-col"
              >
                <div className="relative z-10 w-[55%] sm:w-auto text-[14px] sm:text-[16px] font-bold text-text-primary leading-tight">{c.name}</div>
                <div className="hidden sm:block mt-1 text-[13px] text-text-muted">от {fmt(c.from)}&nbsp;₽</div>
                {c.photo && (
                  <ProductPhoto
                    product={c.photo}
                    className="absolute right-0 bottom-0 w-[46%] h-full sm:w-[86%] sm:h-[72%] p-1.5 sm:p-1 transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </Link>
            ))}
          </div>
        </section>

        {shelves.slice(0, 2).map((s) => <Shelf key={s.title} {...s} />)}

        {/* ===== Как купить ===== */}
        <section className="mt-16 sm:mt-20 rounded-3xl bg-bg-light px-6 sm:px-10 py-10 sm:py-12">
          <h2 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight text-text-primary max-w-2xl">
            Как купить на&nbsp;<span className="text-brand-red">Tech</span><span className="text-primary">Agent</span>
          </h2>
          <ol className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 list-none p-0 m-0">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="font-display text-[44px] leading-none font-bold text-primary/20 w-9 shrink-0">{i + 1}</span>
                <div>
                  <div className="text-[18px] font-bold text-text-primary">{s.title}</div>
                  <p className="mt-1.5 text-[15px] text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            <Link to="/legal/sale-offer" className="text-primary font-semibold no-underline">Оферта купли-продажи</Link>
            <Link to="/legal/payment" className="text-primary font-semibold no-underline">Оплата и возврат</Link>
          </div>
        </section>

        {shelves.slice(2).map((s) => <Shelf key={s.title} {...s} />)}

        {/* ===== Бренды ===== */}
        <section className="mt-16 sm:mt-20">
          <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight text-text-primary mb-5">Бренды</h2>
          <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-3">
            {brands.map((b) => (
              <Link
                key={b}
                to={`/catalog?brand=${encodeURIComponent(b)}`}
                className="font-display text-[26px] sm:text-[34px] font-bold tracking-tight text-text-light hover:text-text-primary transition-colors no-underline"
              >
                {b}
              </Link>
            ))}
          </div>
        </section>

        {/* ===== Партнёрам ===== */}
        <section className="mt-16 sm:mt-20 rounded-3xl bg-bg-dark px-6 sm:px-10 py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex-1">
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight text-white leading-tight">
              Есть магазин или точка? Станьте пунктом выдачи <span className="text-red-400">Tech</span><span className="text-primary-light">Agent</span>
            </h2>
            <p className="mt-3 text-[15px] text-text-dark-secondary leading-relaxed max-w-2xl">
              Оформляйте заказы покупателей в личном кабинете и выдавайте товар в своей точке. Продаёт {LEGAL_NAME}, вам — вознаграждение за каждый выданный заказ.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/partners" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-text-primary font-semibold text-[15px] no-underline hover:bg-white/90">
              Условия для партнёров
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 text-white font-semibold text-[15px] no-underline hover:bg-white/20">
              Оставить заявку
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
