import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { faqData } from '../data/faq'
import { products } from '../data/products'
import { formatPrice } from '../utils/calculate'
import { reachGoal } from '../lib/metrika'
import {
  IconUserPlus, IconClipboardEdit, IconCreditCard, IconPackageCheck,
  IconCoins, IconSmartphone, IconFileCheck, IconTruck,
  IconApple, IconLaptop, IconHeadphones, IconWatch, IconGamepad, IconCamera, IconPlug,
} from '../components/icons'

const features = [
  { icon: <IconFileCheck size={32} />, bg: 'bg-primary/8', title: 'Продавец — ОсОО\u00A0«ТехЭйджент»', desc: 'Покупает товар у поставщика по контракту и инвойсу и продаёт его покупателю по оферте купли-продажи. Вы — агент продавца и пункт выдачи' },
  { icon: <IconCoins size={32} />, bg: 'bg-primary/8', title: 'Оплата напрямую продавцу', desc: 'Покупатель платит ТехЭйджент через СБП по ссылке или QR-коду. Вы деньги покупателя не принимаете' },
  { icon: <IconTruck size={32} />, bg: 'bg-primary/8', title: 'Выдача — в вашей точке', desc: 'ТехЭйджент доставляет товар в ваш пункт выдачи за свой счёт — ориентировочно 5–7\u00A0рабочих дней с момента выкупа у поставщика. Вы выдаёте его покупателю под акт приёма-передачи' },
]

const steps = [
  { icon: <IconUserPlus size={28} />, title: 'Анкета и проверка', desc: 'Заполните анкету: ИНН, ОГРН или ОГРНИП, адрес пункта выдачи, банковские реквизиты. ТехЭйджент проверит данные до первого заказа' },
  { icon: <IconClipboardEdit size={28} />, title: 'Заказ покупателя', desc: 'Выберите товар в каталоге и оформите заказ на покупателя в личном кабинете. Цена — из каталога' },
  { icon: <IconCreditCard size={28} />, title: 'Оплата продавцу', desc: 'Отправьте покупателю ссылку или QR-код — он оплатит заказ ТехЭйджент через СБП' },
  { icon: <IconPackageCheck size={28} />, title: 'Выдача в точке', desc: 'Товар приходит к вам — сообщите покупателю. При выдаче проверьте, что заказ оплачен, сверьте данные покупателя и загрузите подписанный акт приёма-передачи' },
]

/** Минимальная цена среди товаров, доступных к заказу: цифра на плитке всегда из каталога */
function fromPrice(cat: string, brands: string[]): string {
  const prices = products.filter((p) => p.inStock && p.category === cat && brands.includes(p.brand)).map((p) => p.price)
  return prices.length ? `от ${formatPrice(Math.min(...prices))}` : ''
}

const q = (cat: string, brand: string) => `/catalog?cat=${encodeURIComponent(cat)}&brand=${encodeURIComponent(brand)}`

const categories = [
  { icon: <IconApple size={22} />, name: 'Apple iPhone', price: fromPrice('Смартфоны', ['Apple']), to: q('Смартфоны', 'Apple') },
  { icon: <IconLaptop size={22} />, name: 'MacBook Air / Pro', price: fromPrice('Ноутбуки', ['Apple']), to: q('Ноутбуки', 'Apple') },
  { icon: <IconSmartphone size={22} />, name: 'Samsung Galaxy', price: fromPrice('Смартфоны', ['Samsung']), to: q('Смартфоны', 'Samsung') },
  { icon: <IconHeadphones size={22} />, name: 'AirPods', price: fromPrice('Наушники', ['Apple']), to: q('Наушники', 'Apple') },
  { icon: <IconWatch size={22} />, name: 'Apple Watch', price: fromPrice('Часы', ['Apple']), to: q('Часы', 'Apple') },
  { icon: <IconSmartphone size={22} />, name: 'Xiaomi / Redmi', price: fromPrice('Смартфоны', ['Xiaomi']), to: q('Смартфоны', 'Xiaomi') },
  { icon: <IconGamepad size={22} />, name: 'PlayStation / Xbox', price: fromPrice('Игровые консоли', ['Sony', 'Microsoft']), to: '/catalog/igrovye-konsoli' },
  { icon: <IconCamera size={22} />, name: 'DJI / GoPro', price: fromPrice('Камеры и дроны', ['DJI', 'GoPro']), to: '/catalog/kamery-i-drony' },
  { icon: <IconPlug size={22} />, name: 'Dyson', price: fromPrice('Для дома', ['Dyson']), to: q('Для дома', 'Dyson') },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-3xl mx-auto">
      {faqData.map((item, i) => (
        <div key={i} className="border-b border-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer gap-4"
          >
            <span className="font-semibold text-[15px] text-text-primary">{item.q}</span>
            <span className={`text-text-muted shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}>
              <ChevronDown size={16} />
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
      <section className="bg-bg-hero rounded-b-3xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left — text + buttons */}
            <div className="flex-1 hero-mobile-full text-center lg:text-left">
              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.08] tracking-tight text-text-primary mb-4 sm:mb-5">
                Станьте пунктом выдачи электроники TechAgent
              </h1>
              <p className="text-[15px] sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Оформляйте заказы покупателей и&nbsp;выдавайте товар в&nbsp;своей точке. Продаёт товар ОсОО&nbsp;«ТехЭйджент», покупатель платит продавцу напрямую через СБП, а&nbsp;вам ТехЭйджент платит вознаграждение
              </p>

              {/* PHONE mockup — MOBILE ONLY, before buttons */}
              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200/60">
                  {/* Mini header */}
                  <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-gray-50">
                    <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <span className="text-[12px] font-bold"><span className="text-red-600">Tech</span><span className="text-primary">Agent</span></span>
                    <span className="ml-auto text-[10px] text-gray-400">Пример кабинета</span>
                  </div>
                  {/* Stats */}
                  <div className="p-3 grid grid-cols-3 gap-2">
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Заказов</div>
                      <div className="text-[18px] font-extrabold text-gray-800 leading-none mt-0.5">12</div>
                    </div>
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">В пункте выдачи</div>
                      <div className="text-[18px] font-extrabold text-gray-800 leading-none mt-0.5">3</div>
                    </div>
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Выдано</div>
                      <div className="text-[18px] font-extrabold text-primary leading-none mt-0.5">8</div>
                    </div>
                  </div>
                  {/* Orders */}
                  <div className="px-3 pb-3">
                    {[
                      { item: 'iPhone 16 Pro Max', sum: '199 900 ₽', status: 'В пути', sColor: 'text-blue-600' },
                      { item: 'MacBook Air 13" M3', sum: '99 900 ₽', status: 'Прибыл в пункт выдачи', sColor: 'text-green-600' },
                    ].map((o, i) => (
                      <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[12px] font-bold text-gray-300">{o.item[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-semibold text-gray-800 truncate">{o.item}</div>
                          <div className="text-[10px] text-gray-400">{o.sum}</div>
                        </div>
                        <span className={`text-[9px] font-bold ${o.sColor}`}>{o.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold no-underline">
                  Стать партнёром
                </Link>
                <a href="#how" className="btn-blue inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold no-underline rounded-[0.875rem]">
                  Как это работает
                </a>
              </div>
            </div>

            {/* Right: LAPTOP mockup — DESKTOP ONLY */}
            <div className="hidden lg:flex flex-1 justify-center self-center">
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

        {/* ===== FEATURES ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="features">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-16">
            Кто продаёт, кто платит, кто выдаёт
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-bg-section rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform">
                <div className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">{f.title}</h3>
                <p className="text-[14px] text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="how">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-16">
            Как это работает
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {steps.map((s, i) => (
              <div key={i} className="bg-bg-section rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center relative">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 text-white text-lg font-extrabold">
                  {i + 1}
                </div>
                <h3 className="text-[15px] sm:text-base font-bold text-text-primary mb-2 tracking-tight">{s.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <span className="hidden lg:block absolute right-[-16px] top-1/2 -translate-y-1/2 text-border text-xl z-10">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== REWARD ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="reward">
          <div className="bg-bg-dark rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white tracking-tight leading-tight mb-4">
                Вознаграждение партнёра
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed mb-6">
                ТехЭйджент платит вознаграждение за каждый выданный заказ — процент от цены товара. Размер сообщаем после проверки анкеты, он виден в личном кабинете.
              </p>
              <ul className="flex flex-col gap-3 pl-0 list-none m-0">
                {[
                  'Начисляется после выдачи товара покупателю и загрузки подписанного акта приёма-передачи.',
                  'По итогам месяца в кабинете формируются отчёт агента и акт.',
                  'Выплата — на банковский счёт из анкеты в течение 7 дней после принятия отчёта агента и акта.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-[14px] text-white/60 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== BUYERS ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="buyers">
          <div className="bg-bg-section rounded-3xl p-8 sm:p-12">
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-text-primary mb-4">
              Покупателям
            </h2>
            <p className="text-[15px] text-text-secondary leading-relaxed max-w-3xl mb-6">
              Товар продаёт ОсОО&nbsp;«ТехЭйджент». Заказ оформляется в пункте выдачи партнёра TechAgent, оплата — через СБП
              напрямую продавцу, товар выдаётся в том же пункте. Деньги за товар в пункте выдачи не принимают.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/catalog" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold no-underline">
                Каталог и цены <ArrowRight size={14} />
              </Link>
              <Link to="/legal/sale-offer" className="inline-flex items-center justify-center px-6 py-3 rounded-[0.875rem] text-[14px] font-semibold no-underline border border-border text-text-primary hover:border-primary hover:text-primary transition-colors">
                Условия покупки
              </Link>
            </div>
          </div>
        </div>

        {/* ===== CATEGORIES ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="categories">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Популярные категории товаров
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-12 text-[16px]">
            Цена окончательная: доставка до пункта выдачи входит в&nbsp;цену
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((c) => (
              <Link key={c.name} to={c.to} className="flex items-center gap-3.5 py-4 px-5 rounded-2xl hover:-translate-y-0.5 transition-all cursor-pointer no-underline group bg-bg-section">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:shadow-md transition-shadow bg-white text-text-primary">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-text-primary">{c.name}</div>
                  <div className="text-[12px] text-text-muted">{c.price}</div>
                </div>
                <ArrowRight size={14} className="text-text-light group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="faq">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-16">
            Отвечаем на&nbsp;вопросы
          </h2>
          <FAQ />
        </div>

        {/* ===== CTA ===== */}
        <div className="pt-14 sm:pt-24 pb-4">
          <div className="bg-primary rounded-3xl py-12 sm:py-16 px-6 sm:px-8 text-center text-white">
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight mb-3">Станьте партнёром TechAgent</h2>
            <p className="text-white/60 text-[15px] mb-8">Заполните анкету — после проверки сможете оформлять заказы</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary rounded-2xl text-[15px] font-semibold no-underline hover:bg-white/90 transition-colors">
                Заполнить анкету <ArrowRight size={16} />
              </Link>
              <a href="https://t.me/techagent_support" target="_blank" rel="noopener noreferrer" onClick={() => reachGoal('support_click')} className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-[15px] font-semibold no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg" style={{ background: '#0f172a', color: '#fff' }}>
                Написать в поддержку
              </a>
            </div>
          </div>
        </div>

        {/* spacer before footer */}
        <div className="h-24" />
      </div>
    </div>
  )
}
