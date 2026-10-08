import { getProductImage } from '../utils/productImages'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, ArrowDown, ChevronDown, User, BadgeCheck, Store } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { faqData } from '../data/faq'
import { products } from '../data/products'
import { formatPrice } from '../utils/calculate'
import { reachGoal } from '../lib/metrika'
import {
  IconSmartphone,
  IconApple, IconLaptop, IconHeadphones, IconWatch, IconGamepad, IconCamera, IconPlug,
} from '../components/icons'

/** Схема «кто продаёт, кто платит, кто выдаёт»: участники сверху вниз, под стрелкой — что переходит к следующему */
const scheme: { icon: LucideIcon; role: string; desc: string; flow?: string }[] = [
  {
    icon: User,
    role: 'Покупатель',
    desc: 'Оформляет заказ в вашем пункте выдачи',
    flow: 'Платит ТехЭйджент через СБП — по ссылке или QR-коду',
  },
  {
    icon: BadgeCheck,
    role: 'ОсОО\u00A0«ТехЭйджент» — продавец',
    desc: 'Продаёт товар покупателю по оферте купли-продажи и отвечает за него: гарантия, обмен, возврат',
    flow: 'Доставляет товар в ваш пункт за свой счёт — не позднее 14\u00A0дней с даты оплаты',
  },
  {
    icon: Store,
    role: 'Ваш пункт выдачи — агент продавца',
    desc: 'Выдаёт товар покупателю под акт приёма-передачи. Деньги покупателя вы не принимаете',
  },
]

const steps = [
  { title: 'Заявка и проверка', desc: 'Оставьте заявку: ИНН, ОГРН или ОГРНИП, адрес пункта выдачи, банковские реквизиты. ТехЭйджент проверит данные и пришлёт доступ в кабинет' },
  { title: 'Заказ покупателя', desc: 'Выберите товар в каталоге и оформите заказ на покупателя в личном кабинете. Цена — из каталога' },
  { title: 'Оплата продавцу', desc: 'Отправьте покупателю ссылку или QR-код — он оплатит заказ ТехЭйджент через СБП' },
  { title: 'Выдача в точке', desc: 'Товар приходит к вам — сообщите покупателю. При выдаче проверьте, что заказ оплачен, сверьте данные покупателя и загрузите подписанный акт приёма-передачи' },
]

/** Минимальная цена среди товаров, доступных к заказу: цифра на плитке всегда из каталога */
function fromPrice(cat: string, brands: string[], exclude?: RegExp): string {
  const prices = products
    .filter((p) => p.inStock && p.category === cat && brands.includes(p.brand) && !(exclude && exclude.test(p.name)))
    .map((p) => p.price)
  return prices.length ? `от ${formatPrice(Math.min(...prices))}` : ''
}

const q = (cat: string, brand: string) => `/catalog?cat=${encodeURIComponent(cat)}&brand=${encodeURIComponent(brand)}`

const categories = [
  { icon: <IconApple size={24} />, name: 'Apple iPhone', price: fromPrice('Смартфоны', ['Apple']), to: q('Смартфоны', 'Apple') },
  { icon: <IconLaptop size={24} />, name: 'MacBook Air / Pro', price: fromPrice('Ноутбуки', ['Apple']), to: q('Ноутбуки', 'Apple') },
  { icon: <IconSmartphone size={24} />, name: 'Samsung Galaxy', price: fromPrice('Смартфоны', ['Samsung']), to: q('Смартфоны', 'Samsung') },
  { icon: <IconHeadphones size={24} />, name: 'AirPods', price: fromPrice('Наушники', ['Apple']), to: q('Наушники', 'Apple') },
  { icon: <IconWatch size={24} />, name: 'Apple Watch', price: fromPrice('Часы', ['Apple']), to: q('Часы', 'Apple') },
  { icon: <IconSmartphone size={24} />, name: 'Xiaomi / Redmi', price: fromPrice('Смартфоны', ['Xiaomi']), to: q('Смартфоны', 'Xiaomi') },
  { icon: <IconGamepad size={24} />, name: 'PlayStation / Xbox', price: fromPrice('Игровые консоли', ['Sony', 'Microsoft'], /controller|dualsense/i), to: '/catalog/igrovye-konsoli' },
  { icon: <IconCamera size={24} />, name: 'DJI / GoPro', price: fromPrice('Камеры и дроны', ['DJI', 'GoPro']), to: '/catalog/kamery-i-drony' },
  { icon: <IconPlug size={24} />, name: 'Dyson', price: fromPrice('Для дома', ['Dyson']), to: q('Для дома', 'Dyson') },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-3xl mx-auto">
      {faqData.map((item, i) => (
        <div key={i} className="border-b border-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between min-h-[60px] py-4 text-left bg-transparent border-none cursor-pointer gap-4"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-base leading-snug text-text-primary">{item.q}</span>
            <span className={`text-text-muted shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}>
              <ChevronDown size={20} />
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: open === i ? '480px' : '0px', opacity: open === i ? 1 : 0 }}
          >
            <p className="pb-5 text-text-secondary text-[15px] leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {

  return (
    <div className="bg-white">

      {/* ===== HERO BANNER ===== */}
      <section className="bg-gradient-to-b from-white to-bg-hero lg:bg-none lg:bg-bg-hero rounded-b-[28px] lg:rounded-b-3xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-16 lg:pt-24 pb-10 sm:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left — text + buttons */}
            <div className="flex-1 w-full text-left sm:text-center lg:text-left">
              <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] [text-wrap:balance] font-extrabold leading-[1.1] tracking-tight text-text-primary mb-4 sm:mb-5">
                Станьте пунктом выдачи электроники TechAgent
              </h1>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 max-w-xl sm:mx-auto lg:mx-0">
                Оформляйте заказы покупателей и&nbsp;выдавайте товар в&nbsp;своей точке. Продаёт товар ОсОО&nbsp;«ТехЭйджент», покупатель платит продавцу напрямую через СБП, а&nbsp;вам ТехЭйджент платит вознаграждение
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-8 min-h-[54px] text-base font-semibold no-underline">
                  Стать партнёром
                </Link>
                <a href="#how" className="btn-blue inline-flex items-center justify-center gap-2 px-8 min-h-[54px] text-base font-semibold no-underline rounded-[0.875rem]">
                  Как это работает
                </a>
              </div>

              {/* Кабинет на телефоне — кусок настоящего экрана в натуральную величину, а не уменьшенная картинка */}
              <div className="lg:hidden mt-8 max-w-md sm:mx-auto text-left" aria-hidden="true">
                <div className="rounded-[28px] bg-bg-light border border-border p-3 shadow-[0_20px_50px_rgba(27,68,245,0.12)]">
                  <div className="flex items-center justify-between px-2 pt-1 pb-3">
                    <span className="text-[15px] font-bold text-text-primary">Кабинет партнёра</span>
                    <span className="text-[13px] text-text-muted">пример</span>
                  </div>
                  <div className="app-hero">
                    <div className="app-hero-label">Начислено вознаграждения</div>
                    <div className="app-hero-sum">12 490 ₽</div>
                    <p className="app-hero-note">начисляется после выдачи товара и подписанного акта</p>
                  </div>
                  <div className="app-list mt-3">
                    {[
                      { item: 'iPhone 16 Pro Max', img: getProductImage('iph16promax', '', 'Смартфоны'), sub: 'Едет в ваш пункт', sum: '199 900 ₽', status: 'В пути', color: 'text-amber-700' },
                      { item: 'MacBook Air 13" M3', img: getProductImage('macbookairm3256', '', 'Ноутбуки'), sub: 'Ждёт покупателя', sum: '99 900 ₽', status: 'В пункте', color: 'text-violet-700' },
                    ].map((o) => (
                      <div key={o.item} className="app-row">
                        <img src={o.img} alt="" width={44} height={44} loading="lazy" className="w-11 h-11 rounded-[14px] bg-white object-contain shrink-0" />
                        <span className="app-row-mid">
                          <span className="app-row-title">{o.item}</span>
                          <span className="app-row-sub">{o.sub}</span>
                        </span>
                        <span className="app-row-right">
                          <span className="app-row-sum">{o.sum}</span>
                          <span className={`app-row-status ${o.color}`}>{o.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: LAPTOP mockup — DESKTOP ONLY */}
            <div className="hidden lg:flex flex-1 justify-center self-center" aria-hidden="true">
              <div className="w-full max-w-[540px]">
                {/* Laptop screen — same border-radius as buttons (0.875rem = 14px) */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-3 px-3 py-1 bg-white rounded-md text-[10px] text-gray-400 font-mono border border-gray-100">
                      techagent.pro/dashboard
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium">Пример кабинета</span>
                  </div>
                  {/* Dashboard with sidebar */}
                  <div className="flex" style={{ height: 360 }}>
                    {/* Mini sidebar */}
                    <div className="w-[130px] bg-white border-r border-gray-100 p-3 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-4">
                        <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <span className="text-[10px] font-bold"><span className="text-red-600">Tech</span><span className="text-primary">Agent</span></span>
                      </div>
                      {[
                        { label: 'Обзор', active: true },
                        { label: 'Заказы', active: false },
                        { label: 'Новый заказ', active: false },
                        { label: 'Чат', active: false },
                        { label: 'Профиль', active: false },
                        { label: 'Документы', active: false },
                      ].map((nav, i) => (
                        <div key={i} className={`text-[10px] px-2 py-1.5 rounded-lg mb-0.5 ${nav.active ? 'bg-primary/8 text-primary font-bold' : 'text-gray-400'}`}>
                          {nav.label}
                        </div>
                      ))}
                      <div className="mt-auto flex items-center gap-1.5 px-1 pt-2 border-t border-gray-50">
                        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">Д</div>
                        <div>
                          <div className="text-[8px] font-semibold text-gray-700">Демо-партнёр</div>
                          <div className="text-[7px] text-gray-400">пункт выдачи</div>
                        </div>
                      </div>
                    </div>
                    {/* Main content */}
                    <div className="flex-1 p-4 overflow-hidden bg-[#FAFBFC]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[13px] font-bold text-gray-800">Обзор</div>
                        <div className="text-[9px] text-gray-400 px-2 py-1 bg-white rounded-md border border-gray-100">Февраль 2026</div>
                      </div>
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-white rounded-xl p-2 border border-gray-100">
                          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Заказов</div>
                          <div className="text-[18px] font-extrabold text-gray-800 leading-none">12</div>
                        </div>
                        <div className="bg-white rounded-xl p-2 border border-gray-100">
                          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">В пункте выдачи</div>
                          <div className="text-[18px] font-extrabold text-gray-800 leading-none">3</div>
                        </div>
                        <div className="bg-white rounded-xl p-2 border border-gray-100">
                          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Выдано</div>
                          <div className="text-[18px] font-extrabold text-primary leading-none">8</div>
                        </div>
                      </div>
                      {/* Orders table */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-50">
                          <span className="text-[10px] font-bold text-gray-700">Последние заказы</span>
                          <span className="text-[9px] text-primary font-bold">Все →</span>
                        </div>
                        {[
                          { id: '#1847', item: 'iPhone 16 Pro Max', sum: '199 900 ₽', status: 'В пути', color: 'text-blue-600 bg-blue-50' },
                          { id: '#1846', item: 'Galaxy S25 Ultra', sum: '149 900 ₽', status: 'Оплачен', color: 'text-amber-600 bg-amber-50' },
                          { id: '#1845', item: 'MacBook Air 13" M3', sum: '99 900 ₽', status: 'Прибыл в пункт выдачи', color: 'text-green-600 bg-green-50' },
                          { id: '#1844', item: 'AirPods Pro 2', sum: '29 900 ₽', status: 'Выдан покупателю', color: 'text-green-600 bg-green-50' },
                        ].map((o, i) => (
                          <div key={i} className="flex items-center px-3 py-1.5 border-b border-gray-50/80 last:border-0">
                            <span className="text-[10px] font-mono text-gray-400 w-[40px]">{o.id}</span>
                            <span className="text-[10px] text-gray-700 font-semibold flex-1">{o.item}</span>
                            <span className="text-[10px] font-bold text-gray-800 w-[68px] text-right">{o.sum}</span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ml-2 ${o.color}`}>{o.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop base/hinge */}
                <div className="mx-auto w-[70%] h-[5px] bg-gradient-to-b from-[#D1D5DB] to-[#9CA3AF] rounded-b-lg" />
                <div className="mx-auto w-[90%] h-[3px] bg-gradient-to-b from-[#9CA3AF] to-[#D1D5DB] rounded-b-xl" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== КТО ПРОДАЁТ, КТО ПЛАТИТ, КТО ВЫДАЁТ — схема ===== */}
        <div className="pt-12 sm:pt-24 pb-4" id="features">
          <h2 className="text-[26px] sm:text-[40px] [text-wrap:balance] font-extrabold tracking-tight leading-tight text-left sm:text-center text-text-primary mb-7 sm:mb-14">
            Кто продаёт, кто платит, кто выдаёт
          </h2>

          <ol className="list-none p-0 m-0 max-w-2xl mx-auto">
            {scheme.map((n, i) => (
              <li key={n.role} className="flex gap-4 sm:gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <span className="w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                    <n.icon size={28} strokeWidth={1.9} />
                  </span>
                  {i < scheme.length - 1 && <span className="w-0.5 flex-1 bg-primary/20 my-2 rounded-full" />}
                </div>
                <div className={`min-w-0 pt-1.5 ${i < scheme.length - 1 ? 'pb-7' : ''}`}>
                  <h3 className="h-sans text-[18px] sm:text-[20px] font-bold leading-snug text-text-primary tracking-tight">{n.role}</h3>
                  <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed mt-1">{n.desc}</p>
                  {n.flow && (
                    <p className="mt-3 flex items-start gap-2 rounded-2xl bg-primary/[0.06] px-3.5 py-2.5 text-[14px] sm:text-[15px] font-semibold leading-snug text-primary">
                      <ArrowDown size={18} className="shrink-0 mt-px" />
                      {n.flow}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div className="pt-12 sm:pt-24 pb-4 scroll-mt-20" id="how">
          <h2 className="text-[26px] sm:text-[40px] [text-wrap:balance] font-extrabold tracking-tight leading-tight text-left sm:text-center text-text-primary mb-6 sm:mb-14">
            Как это работает
          </h2>

          {/* Шаги: крупный приглушённый номер сбоку, заголовок и текст рядом */}
          <ol className="list-none p-0 m-0 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-6 sm:gap-y-9 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 sm:gap-6">
                <span className="font-display text-[40px] sm:text-[52px] font-extrabold leading-none text-primary/25 w-9 sm:w-12 shrink-0 text-center">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="h-sans text-[18px] sm:text-[20px] font-bold leading-snug text-text-primary tracking-tight">{s.title}</h3>
                  <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ===== REWARD ===== */}
        <div className="pt-12 sm:pt-24 pb-4" id="reward">
          <div className="bg-bg-dark rounded-[28px] sm:rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-[26px] sm:text-[36px] font-extrabold text-white tracking-tight leading-tight mb-4">
                Вознаграждение партнёра
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                ТехЭйджент платит вознаграждение за каждый выданный заказ — процент от цены товара. Размер сообщаем после проверки заявки, он виден в личном кабинете.
              </p>
              <ul className="flex flex-col gap-3 pl-0 list-none m-0">
                {[
                  'Начисляется после выдачи товара покупателю и загрузки подписанного акта приёма-передачи.',
                  'По итогам месяца в кабинете формируются отчёт агента и акт.',
                  'Выплата — на банковский счёт из анкеты в течение 7 дней после принятия отчёта агента и акта.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/15 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-[15px] text-white/80 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== BUYERS ===== */}
        <div className="pt-12 sm:pt-24 pb-4" id="buyers">
          <div className="bg-bg-section rounded-[28px] sm:rounded-3xl p-6 sm:p-12">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight text-text-primary mb-4">
              Покупателям
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-6">
              Товар продаёт ОсОО&nbsp;«ТехЭйджент». Заказ оформляется в пункте выдачи партнёра TechAgent, оплата — через СБП
              напрямую продавцу, товар выдаётся в том же пункте. Деньги за товар в пункте выдачи не принимают.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/catalog" className="btn-primary inline-flex items-center justify-center gap-2 px-6 min-h-[52px] text-base font-semibold no-underline">
                Каталог и цены <ArrowRight size={18} />
              </Link>
              <Link to="/legal/sale-offer" className="inline-flex items-center justify-center px-6 min-h-[52px] rounded-[0.875rem] text-base font-semibold no-underline border border-border bg-white text-text-primary hover:border-primary hover:text-primary transition-colors">
                Условия покупки
              </Link>
            </div>
          </div>
        </div>

        {/* ===== CATEGORIES ===== */}
        <div className="pt-12 sm:pt-24 pb-4" id="categories">
          <h2 className="text-[26px] sm:text-[40px] [text-wrap:balance] font-extrabold tracking-tight leading-tight text-left sm:text-center text-text-primary mb-3">
            Популярные категории товаров
          </h2>
          <p className="text-text-secondary text-left sm:text-center max-w-xl sm:mx-auto mb-6 sm:mb-12 text-base leading-relaxed">
            Цена окончательная: доставка до пункта выдачи входит в&nbsp;цену
          </p>

          {/* На телефоне — одним списком, как в приложении; шире — плитками */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 max-sm:bg-bg-section max-sm:rounded-[24px] max-sm:overflow-hidden">
            {categories.map((c) => (
              <Link key={c.name} to={c.to} className="flex items-center gap-3.5 min-h-[72px] py-3 px-4 sm:px-5 sm:rounded-2xl hover:-translate-y-0.5 transition-all cursor-pointer no-underline group sm:bg-bg-section max-sm:border-b max-sm:border-border max-sm:last:border-b-0">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-sm shrink-0 group-hover:shadow-md transition-shadow bg-white text-text-primary">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold leading-snug text-text-primary">{c.name}</div>
                  <div className="text-[14px] text-text-muted mt-0.5">{c.price}</div>
                </div>
                <ArrowRight size={18} className="text-text-light group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="pt-12 sm:pt-24 pb-4" id="faq">
          <h2 className="text-[26px] sm:text-[40px] [text-wrap:balance] font-extrabold tracking-tight leading-tight text-left sm:text-center text-text-primary mb-4 sm:mb-16">
            Отвечаем на&nbsp;вопросы
          </h2>
          <FAQ />
        </div>

        {/* ===== CTA ===== */}
        <div className="pt-12 sm:pt-24 pb-4">
          <div className="bg-primary rounded-[28px] sm:rounded-3xl py-10 sm:py-16 px-6 sm:px-8 text-left sm:text-center text-white">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight mb-3">Станьте партнёром TechAgent</h2>
            <p className="text-white/80 text-base leading-relaxed mb-7 sm:mb-8">Оставьте заявку — после проверки ТехЭйджент откроет вам доступ в кабинет</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 min-h-[54px] bg-white text-text-primary rounded-2xl text-base font-semibold no-underline hover:bg-white/90 transition-colors">
                Оставить заявку <ArrowRight size={16} />
              </Link>
              <a href="https://t.me/techagent_support_bot" target="_blank" rel="noopener noreferrer" onClick={() => reachGoal('support_click')} className="inline-flex items-center justify-center px-8 min-h-[54px] rounded-2xl text-base font-semibold no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg" style={{ background: '#0f172a', color: '#fff' }}>
                Написать в поддержку
              </a>
            </div>
          </div>
        </div>

        {/* spacer before footer */}
        <div className="h-12 sm:h-24" />
      </div>
    </div>
  )
}
