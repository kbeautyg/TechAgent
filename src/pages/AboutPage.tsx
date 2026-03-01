import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  IconFileCheck, IconCoins, IconTruck,
  IconSmartphone, IconGlobe, IconBolt,
} from '../components/icons'

const stats = [
  { value: '200+', label: 'Активных партнёров' },
  { value: '2–3%', label: 'Комиссия' },
  { value: '5–7', label: 'Дней доставка' },
  { value: '24/7', label: 'Поддержка' },
]

const advantages = [
  { icon: <IconCoins size={24} />, title: 'Прозрачная комиссия', desc: 'От 2 до 3% от стоимости товара. Никаких скрытых сборов, минимальных сумм или доплат.' },
  { icon: <IconTruck size={24} />, title: 'Быстрая логистика', desc: 'Доставка 5–7 рабочих дней через проверенных карго-партнёров. Отслеживание на каждом этапе.' },
  { icon: <IconFileCheck size={24} />, title: 'Полный документооборот', desc: 'Автоматическое формирование всех документов. Инвойсы, акты, чеки — всё в личном кабинете.' },
  { icon: <IconSmartphone size={24} />, title: 'Удобный личный кабинет', desc: 'Создание заказов, генерация платёжных ссылок, отслеживание статусов — всё в одном месте.' },
  { icon: <IconGlobe size={24} />, title: 'Широкий каталог', desc: 'Apple, Samsung, Xiaomi, Dyson, Sony, DJI и другие топовые бренды. Всё, что нужно вашим клиентам.' },
  { icon: <IconBolt size={24} />, title: 'Мгновенная оплата', desc: 'Генерация QR-кодов и ссылок для оплаты через СБП. Клиент оплачивает за минуту.' },
]

const roles = [
  {
    title: 'TechAgent',
    role: 'Агент по закупке',
    desc: 'Выкупаем товар у зарубежного поставщика по поручению партнёра. Мы НЕ продавец, НЕ импортёр, НЕ перевозчик.',
    color: 'bg-primary',
    items: ['Находим поставщика', 'Выкупаем товар', 'Передаём карго-компании партнёра'],
  },
  {
    title: 'Партнёр',
    role: 'Импортёр товара',
    desc: 'Является импортёром по закону. Создаёт заказы, отправляет ссылку на оплату клиенту, получает товар.',
    color: 'bg-accent',
    items: ['Создаёт заказ в ЛК', 'Передаёт ссылку клиенту', 'Получает и отдаёт товар'],
  },
  {
    title: 'Покупатель',
    role: 'Конечный клиент',
    desc: 'Приходит в магазин партнёра, выбирает устройство, оплачивает по ссылке и получает товар через 5–7 дней.',
    color: 'bg-primary',
    items: ['Выбирает товар', 'Оплачивает по ссылке', 'Получает от партнёра'],
  },
]

const legalData = [
  { label: 'Тип договора', value: 'Агентский договор (глава 52 ГК РФ)' },
  { label: 'Комиссия агента', value: 'От 2 до 3% от стоимости товара' },
  { label: 'Роль партнёра', value: 'Принципал и импортёр товара' },
  { label: 'Таможня', value: 'Оформляется карго от имени партнёра' },
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute top-[-100px] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            О платформе
          </div>
          <h1 className="text-[40px] sm:text-[48px] font-extrabold mb-5 text-text-primary tracking-tight leading-[1.08]">
            TechAgent — агентская закупка электроники
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            B2B-платформа, которая помогает индивидуальным предпринимателям закупать электронику за&nbsp;рубежом по&nbsp;выгодным ценам. Прозрачно, легально и&nbsp;быстро.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="bg-bg-section rounded-3xl p-6 sm:p-8 text-center">
              <div className="text-[32px] sm:text-[40px] font-extrabold text-primary tracking-tight leading-none mb-2">{s.value}</div>
              <div className="text-[13px] text-text-muted font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ===== WHAT IS TECHAGENT ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Что такое TechAgent?
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16 text-[16px] leading-relaxed">
            Платформа для партнёров с розничными точками электроники. Мы берём на себя закупку за рубежом — вы получаете товар по лучшей цене с минимальной комиссией.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((a, i) => (
              <div key={i} className="bg-bg-section rounded-3xl p-7 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                  {a.icon}
                </div>
                <h3 className="text-[15px] font-bold text-text-primary mb-2 tracking-tight">{a.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== HOW THE MODEL WORKS ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Как устроена модель
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Три участника — каждый со своей ролью
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="bg-bg-section rounded-3xl p-8 relative overflow-hidden">
                <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center text-white text-sm font-extrabold mb-5`}>
                  {i + 1}
                </div>
                <h3 className="text-xl font-extrabold text-text-primary tracking-tight mb-1">{r.title}</h3>
                <div className="text-[13px] text-primary font-semibold mb-3">{r.role}</div>
                <p className="text-[13px] text-text-muted leading-relaxed mb-5">{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-border">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[13px] text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== LEGAL + IMPORTANT ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Юридическая основа
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Полностью белая схема по законодательству РФ
          </p>

          <div className="bg-bg-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Important notice */}
            <div className="relative z-10 mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round" /><path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">Важно знать</h3>
                  <p className="text-[13px] text-white/40">О юридической модели и ответственности</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {[
                  { label: 'Роль TechAgent', value: 'Агент по закупке, НЕ продавец и НЕ импортёр' },
                  { label: 'Роль партнёра', value: 'Выступает принципалом и импортёром товара' },
                  { label: 'Таможенное оформление', value: 'Карго-компанией от имени партнёра' },
                  { label: 'Юридическая основа', value: 'Схема соответствует главе 52 ГК РФ' },
                ].map((item, i) => (
                  <div key={i} className="py-3.5">
                    <div className="text-[11px] text-white/40 uppercase tracking-wider font-medium mb-1">{item.label}</div>
                    <div className="text-[14px] font-medium text-white/80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal data */}
            <div className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {legalData.map((item, i) => (
                  <div key={i} className="py-3.5">
                    <div className="text-[11px] text-white/40 uppercase tracking-wider font-medium mb-1">{item.label}</div>
                    <div className="text-[14px] font-medium text-white/80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="mb-20">
          <div className="bg-primary rounded-3xl py-16 px-8 text-center text-white">
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight mb-3">Начните зарабатывать с TechAgent</h2>
            <p className="text-white/60 text-[15px] mb-8 max-w-xl mx-auto">Зарегистрируйтесь за 2 минуты, создайте первый заказ и&nbsp;предложите клиентам лучшие цены на электронику</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary rounded-2xl text-[15px] font-semibold no-underline hover:bg-white/90 transition-colors">
                Стать партнёром <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-[15px] font-semibold no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-bg-dark text-white">
                Как это работает
              </Link>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
