import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, ChevronDown, Star } from 'lucide-react'
import { formatPrice } from '../utils/calculate'
import {
  IconUserPlus, IconClipboardEdit, IconCreditCard, IconPackageCheck,
  IconCoins, IconBox, IconSmartphone, IconFileCheck, IconTruck,
  IconDiamond, IconUnlock, IconGlobe, IconZap, IconUser,
  IconApple, IconLaptop, IconHeadphones, IconWatch, IconGamepad, IconCamera, IconPlug,
} from '../components/icons'

const features = [
  { icon: <IconCoins size={32} />, bg: 'bg-primary/8', title: 'Комиссия 2–3%', desc: 'Прозрачная ставка без скрытых платежей. Вы всегда знаете итоговую стоимость заранее' },
  { icon: <IconTruck size={32} />, bg: 'bg-primary/8', title: 'Доставка 5–7 дней', desc: 'Быстрая логистика через проверенных партнёров. Отслеживание на каждом этапе' },
  { icon: <IconFileCheck size={32} />, bg: 'bg-primary/8', title: 'Легальная схема', desc: 'Полностью белая агентская модель. Партнёр = импортёр. Все документы предоставляем' },
]

const steps = [
  { icon: <IconUserPlus size={28} />, title: 'Регистрация', desc: 'Создайте аккаунт партнёра за 2 минуты. Нужен только ИНН' },
  { icon: <IconClipboardEdit size={28} />, title: 'Создание заказа', desc: 'Укажите товар — система рассчитает итог с комиссией от 2 до 3%' },
  { icon: <IconCreditCard size={28} />, title: 'Оплата клиентом', desc: 'Отправьте ссылку покупателю — он оплачивает через СБП' },
  { icon: <IconPackageCheck size={28} />, title: 'Получение товара', desc: 'Мы выкупаем товар, передаём карго. Вы получаете и отдаёте' },
]

const standardFeatures = [
  { icon: <IconCoins size={22} />, title: 'Комиссия 2–3%', sub: 'Без скрытых доплат' },
  { icon: <IconBox size={22} />, title: 'До 50 заказов в месяц', sub: 'Без лимита по сумме' },
  { icon: <IconSmartphone size={22} />, title: 'Apple, Samsung, Xiaomi', sub: 'Все популярные бренды' },
  { icon: <IconFileCheck size={22} />, title: 'Без заявок', sub: 'Регистрация за 2 минуты' },
  { icon: <IconTruck size={22} />, title: 'Доставка 5–7 дней', sub: 'Через проверенные карго' },
]

const proFeatures = [
  { icon: <IconDiamond size={22} />, title: 'Комиссия от 2.5%', sub: 'Снижение при объёмах' },
  { icon: <IconUnlock size={22} />, title: 'Без лимита заказов', sub: 'Сколько угодно в месяц' },
  { icon: <IconGlobe size={22} />, title: 'Расширенный каталог', sub: 'Dyson, Sony, DJI и другие' },
  { icon: <IconZap size={22} />, title: 'Приоритетная доставка', sub: '3–5 дней вместо 5–7' },
  { icon: <IconUser size={22} />, title: 'Персональный менеджер', sub: 'На связи в рабочее время' },
]

const categories = [
  { icon: <IconApple size={22} />, name: 'Apple iPhone', price: 'от 60 000 ₽', cat: 'Смартфоны', brand: 'Apple' },
  { icon: <IconLaptop size={22} />, name: 'MacBook Air / Pro', price: 'от 100 000 ₽', cat: 'Ноутбуки', brand: 'Apple' },
  { icon: <IconSmartphone size={22} />, name: 'Samsung Galaxy', price: 'от 40 000 ₽', cat: 'Смартфоны', brand: 'Samsung' },
  { icon: <IconHeadphones size={22} />, name: 'AirPods / Beats', price: 'от 15 000 ₽', cat: 'Наушники', brand: '' },
  { icon: <IconWatch size={22} />, name: 'Apple Watch', price: 'от 35 000 ₽', cat: 'Часы', brand: 'Apple' },
  { icon: <IconSmartphone size={22} />, name: 'Xiaomi / Redmi', price: 'от 15 000 ₽', cat: 'Смартфоны', brand: 'Xiaomi' },
  { icon: <IconGamepad size={22} />, name: 'PlayStation / Xbox', price: 'от 45 000 ₽', cat: 'Игровые консоли', brand: '' },
  { icon: <IconCamera size={22} />, name: 'DJI / GoPro', price: 'от 30 000 ₽', cat: 'Камеры', brand: '' },
  { icon: <IconPlug size={22} />, name: 'Dyson', price: 'от 25 000 ₽', cat: 'Бытовая техника', brand: 'Dyson' },
]

const reviews = [
  { name: 'Алексей Петров', company: 'Партнёр Петров А.С.', city: 'Москва', text: 'Работаем с TechAgent уже полгода. Создал заказ, скинул ссылку клиенту, через неделю товар на точке.', rating: 5 },
  { name: 'Ирина Соколова', company: 'Партнёр Соколова И.М.', city: 'Санкт-Петербург', text: 'Раньше ждали по 3 недели, а тут 5-7 дней и товар у меня. QR-код для оплаты — очень удобно.', rating: 5 },
  { name: 'Дмитрий Козлов', company: 'Партнёр Козлов Д.В.', city: 'Казань', text: 'Trade-in функция отлично работает. Документы формируются автоматически. Рекомендую.', rating: 5 },
  { name: 'Мария Волкова', company: 'Партнёр Волкова М.А.', city: 'Новосибирск', text: 'Отличный сервис для тех, кто хочет предложить клиентам низкие цены на электронику.', rating: 4 },
]

const faqData = [
  { q: 'Как работает агентская модель?', a: 'Мы выступаем агентом — не продавцом и не импортёром. Партнёр создаёт заказ в личном кабинете, конечный покупатель оплачивает по ссылке. Мы выкупаем товар за рубежом и передаём через карго. Партнёр является импортёром, получает товар и отдаёт клиенту.' },
  { q: 'Какова комиссия?', a: 'Комиссия — от 2 до 3% от стоимости товара. Никаких скрытых доплат, минимальных сумм или дополнительных сборов.' },
  { q: 'Сколько занимает доставка?', a: 'Стандартная доставка — 5–7 рабочих дней с момента выкупа товара. Для клиентов тарифа Pro — 3–5 дней с приоритетной обработкой.' },
  { q: 'Какие документы нужны для регистрации?', a: 'Только ИНН и контактные данные. Регистрация занимает 2 минуты. Не нужно подавать заявку или ждать одобрения.' },
  { q: 'Это кредит?', a: 'Нет, это не кредит. TechAgent — агентская услуга по закупке товара. Клиент оплачивает полную стоимость сразу по ссылке (через СБП или картой).' },
  { q: 'Как происходит оплата?', a: 'Партнёр создаёт заказ в личном кабинете, система генерирует уникальную платёжную ссылку. Покупатель оплачивает через СБП или банковской картой.' },
  { q: 'Есть ли минимальная сумма заказа?', a: 'Нет минимальной суммы. Комиссия от 2 до 3% от стоимости товара — неважно, заказываете вы аксессуар за 5 000 ₽ или MacBook Pro за 250 000 ₽.' },
  { q: 'Поддерживается ли Trade-in?', a: 'Да, мы поддерживаем Trade-in. Партнёр может учесть стоимость старого устройства клиента при создании заказа.' },
]

const tabLabels = ['Популярное', 'Смартфоны', 'Ноутбуки', 'Наушники', 'Планшеты', 'Часы', 'Аксессуары']

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
            style={{ maxHeight: open === i ? '200px' : '0px', opacity: open === i ? 1 : 0 }}
          >
            <p className="pb-5 text-text-secondary text-[15px] leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatNum(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default function HomePage() {
  const [calcCost, setCalcCost] = useState('75000')
  const [activeTab, setActiveTab] = useState(0)
  const costNum = parseInt(calcCost) || 0
  const commission = Math.round(costNum * 0.03)
  const total = costNum + commission

  return (
    <div className="bg-white">

      {/* ===== HERO BANNER ===== */}
      <section className="bg-bg-hero rounded-b-3xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left — text + buttons */}
            <div className="flex-1 hero-mobile-full text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                Уже работает для 200+ партнёров
              </div>
              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.08] tracking-tight text-text-primary mb-4 sm:mb-5">
                Агентская закупка электроники для&nbsp;бизнеса
              </h1>
              <p className="text-[15px] sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Закупаем технику Apple, Samsung, Xiaomi и&nbsp;другие бренды для розничных магазинов. Комиссия всего&nbsp;2–3%&nbsp;— прозрачно и&nbsp;легально
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
                    <span className="ml-auto text-[10px] text-gray-400">Личный кабинет</span>
                  </div>
                  {/* Stats */}
                  <div className="p-3 grid grid-cols-3 gap-2">
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Заказов</div>
                      <div className="text-[18px] font-extrabold text-gray-800 leading-none mt-0.5">24</div>
                    </div>
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Оборот</div>
                      <div className="text-[18px] font-extrabold text-gray-800 leading-none mt-0.5">1.8M</div>
                    </div>
                    <div className="bg-bg-section rounded-xl p-2.5">
                      <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">Ставка</div>
                      <div className="text-[18px] font-extrabold text-primary leading-none mt-0.5">2.5%</div>
                    </div>
                  </div>
                  {/* Orders */}
                  <div className="px-3 pb-3">
                    {[
                      { item: 'iPhone 16 Pro Max', sum: '169 900 ₽', status: 'В пути', sColor: 'text-blue-600' },
                      { item: 'MacBook Air M4', sum: '139 900 ₽', status: 'Доставлен', sColor: 'text-green-600' },
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
                  Начать работу
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
                      techagent.ru/dashboard
                    </div>
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
                        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">ДК</div>
                        <div>
                          <div className="text-[8px] font-semibold text-gray-700">Партнёр Кутуков</div>
                          <div className="text-[7px] text-gray-400">demo@techagent.ru</div>
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
                          <div className="text-[18px] font-extrabold text-gray-800 leading-none">24</div>
                          <div className="text-[8px] text-accent font-semibold mt-0.5">+12%</div>
                        </div>
                        <div className="bg-white rounded-xl p-2 border border-gray-100">
                          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Оборот</div>
                          <div className="text-[18px] font-extrabold text-gray-800 leading-none">1.8M</div>
                          <div className="text-[8px] text-accent font-semibold mt-0.5">+8%</div>
                        </div>
                        <div className="bg-white rounded-xl p-2 border border-gray-100">
                          <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Комиссия</div>
                          <div className="text-[18px] font-extrabold text-primary leading-none">2.5%</div>
                          <div className="text-[8px] text-gray-400 font-medium mt-0.5">фикс.</div>
                        </div>
                      </div>
                      {/* Orders table */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-50">
                          <span className="text-[10px] font-bold text-gray-700">Последние заказы</span>
                          <span className="text-[9px] text-primary font-bold">Все →</span>
                        </div>
                        {[
                          { id: '#1847', item: 'iPhone 16 Pro Max', sum: '169 900 ₽', status: 'В пути', color: 'text-blue-600 bg-blue-50' },
                          { id: '#1846', item: 'Galaxy S25 Ultra', sum: '149 900 ₽', status: 'Оплачен', color: 'text-amber-600 bg-amber-50' },
                          { id: '#1845', item: 'MacBook Air M4', sum: '139 900 ₽', status: 'Доставлен', color: 'text-green-600 bg-green-50' },
                          { id: '#1844', item: 'AirPods Pro 2', sum: '24 990 ₽', status: 'Доставлен', color: 'text-green-600 bg-green-50' },
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
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Всё для вашего бизнеса
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Прозрачная комиссия, легальная схема и&nbsp;быстрая доставка
          </p>

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
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Как это работает
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Четыре простых шага от заказа до товара на вашей полке
          </p>

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

        {/* ===== CALCULATOR ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="calc">
          <div className="bg-bg-dark rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-1 relative z-10">
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white tracking-tight leading-tight mb-3">
                Рассчитайте стоимость за&nbsp;секунду
              </h2>
              <p className="text-white/50 text-[15px] mb-8 leading-relaxed">
                Введите цену товара — мы покажем итоговую сумму с&nbsp;комиссией. Просто, как дважды два
              </p>

              {/* Timeline */}
              <div className="flex gap-2">
                {[
                  { label: 'Сегодня', val: formatNum(total) + ' ₽', active: true },
                  { label: 'Выкуп', val: formatNum(costNum) + ' ₽', active: false },
                  { label: '5–7 дней', val: 'Доставка', active: false },
                  { label: 'Готово', val: 'Товар у вас', active: false, green: true },
                ].map((t, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className={`h-1 rounded-full mb-2 ${t.active ? 'bg-primary-light' : t.green ? 'bg-accent' : 'bg-white/10'}`} />
                    <div className="text-[10px] text-white/35 mb-0.5">{t.label}</div>
                    <div className="text-[13px] font-semibold text-white">{t.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator widget */}
            <div className="lg:w-[400px] bg-white/[0.06] border border-white/10 rounded-2xl p-7 relative z-10">
              <label className="text-[12px] text-white/40 mb-2 block">Стоимость товара</label>
              <input
                type="number"
                value={calcCost}
                onChange={(e) => setCalcCost(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-2xl font-bold outline-none focus:border-primary transition-colors mb-6"
                placeholder="75000"
              />

              <div className="flex flex-col gap-3">
                <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">Товар</span>
                  <span className="text-[15px] font-semibold text-white">{formatPrice(costNum)}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">Комиссия 2–3%</span>
                  <span className="text-[15px] font-semibold text-white">{formatPrice(commission)}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-[13px] text-white/50">Итого к оплате</span>
                  <span className="text-2xl font-extrabold text-primary-light">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PROMO CARDS ===== */}
        <div className="pt-14 sm:pt-24 pb-4" id="plans">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Выберите формат работы
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Два варианта сотрудничества — для старта и&nbsp;для объёмов
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Standard */}
            <div className="bg-bg-hero rounded-3xl p-8 sm:p-10">
              <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-semibold bg-primary/10 text-primary border border-primary/20 mb-5">
                Для старта
              </span>
              <h3 className="text-2xl font-extrabold text-text-primary tracking-tight mb-2">Стандарт</h3>
              <p className="text-[14px] text-text-muted mb-6">Для партнёров с небольшим потоком заказов</p>

              <div className="flex flex-col gap-4 mb-8">
                {standardFeatures.map((f, i) => (
                  <div key={i} className={`flex items-center gap-3 ${i < standardFeatures.length - 1 ? 'pb-4 border-b border-black/[0.05]' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-text-primary">{f.title}</div>
                      <div className="text-[12px] text-text-muted">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register" className="btn-primary w-full inline-flex items-center justify-center py-4 text-[15px] font-semibold no-underline rounded-2xl">
                Начать работу
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-bg-dark rounded-3xl p-8 sm:p-10 text-white">
              <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-semibold bg-white/10 text-white/80 border border-white/15 mb-5">
                Для объёмов
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight mb-2">Pro</h3>
              <p className="text-[14px] text-white/40 mb-6">Для крупных партнёров с высоким оборотом</p>

              <div className="flex flex-col gap-4 mb-8">
                {proFeatures.map((f, i) => (
                  <div key={i} className={`flex items-center gap-3 ${i < proFeatures.length - 1 ? 'pb-4 border-b border-white/[0.06]' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold">{f.title}</div>
                      <div className="text-[12px] text-white/40">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register" className="btn-blue w-full inline-flex items-center justify-center py-4 text-[15px] font-semibold no-underline rounded-2xl">
                Подключить Pro
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
            Работаем со всеми топовыми брендами электроники
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabLabels.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-full text-[13px] font-medium border transition-all cursor-pointer ${
                  activeTab === i
                    ? 'bg-text-primary border-text-primary text-white'
                    : 'bg-white border-border text-text-secondary hover:border-text-muted'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((c, i) => {
              const isMatch = activeTab === 0 || c.cat === tabLabels[activeTab]
              const params = new URLSearchParams()
              if (c.cat) params.set('cat', c.cat)
              if (c.brand) params.set('brand', c.brand)
              return (
              <Link key={i} to={`/catalog?${params.toString()}`} className={`flex items-center gap-3.5 py-4 px-5 rounded-2xl hover:-translate-y-0.5 transition-all cursor-pointer no-underline group ${isMatch ? 'bg-bg-section' : 'bg-bg-section/40 opacity-40'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:shadow-md transition-shadow ${isMatch ? 'bg-white text-text-primary' : 'bg-white/60 text-text-muted'}`}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-[14px] font-semibold ${isMatch ? 'text-text-primary' : 'text-text-muted'}`}>{c.name}</div>
                  <div className="text-[12px] text-text-muted">{c.price}</div>
                </div>
                <ArrowRight size={14} className="text-text-light group-hover:text-primary transition-colors shrink-0" />
              </Link>
              )
            })}
          </div>
        </div>

        {/* ===== REVIEWS ===== */}
        <div className="pt-14 sm:pt-24 pb-4">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Отзывы партнёров
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Что говорят партнёры, которые работают с&nbsp;нами
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="card-glass p-7">
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={14} className={si < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-text-secondary text-[14px] leading-relaxed mb-6">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-[13px] text-text-primary">{r.name}</p>
                    <p className="text-text-muted text-[12px]">{r.company}, {r.city}</p>
                  </div>
                </div>
              </div>
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
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight mb-3">Готовы начать?</h2>
            <p className="text-white/60 text-[15px] mb-8">Зарегистрируйтесь за 2 минуты и создайте первый заказ уже сегодня</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary rounded-2xl text-[15px] font-semibold no-underline hover:bg-white/90 transition-colors">
                Зарегистрироваться <ArrowRight size={16} />
              </Link>
              <a href="https://t.me/techagent_support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-[15px] font-semibold no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg" style={{ background: '#0f172a', color: '#fff' }}>
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
