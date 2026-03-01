import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  IconUserPlus, IconClipboardEdit, IconCreditCard, IconPackageCheck,
  IconSmartphone, IconFileCheck, IconTruck, IconCoins,
} from '../components/icons'

const phases = [
  {
    id: 'register',
    phase: 'Подготовка',
    icon: <IconUserPlus size={24} />,
    title: 'Партнёр регистрируется',
    desc: 'Создаёте аккаунт за 2 минуты — нужен только ИНН. Подписываете оферту онлайн и получаете доступ к личному кабинету.',
    details: ['Заполняет форму', 'Подписывает оферту онлайн', 'Получает доступ к ЛК'],
    color: 'bg-primary',
  },
  {
    id: 'client',
    phase: 'Клиент',
    icon: <IconSmartphone size={24} />,
    title: 'Клиент в магазине партнёра',
    desc: 'Покупатель выбирает устройство. Вы называете цену с комиссией 2–3% — клиент соглашается.',
    details: ['Хочет купить устройство', 'Партнёр называет цену с комиссией 2–3%', 'Клиент соглашается'],
    color: 'bg-primary',
  },
  {
    id: 'order',
    phase: 'Заказ',
    icon: <IconClipboardEdit size={24} />,
    title: 'Партнёр создаёт заказ в ЛК',
    desc: 'Указываете товар и стоимость — система автоматически рассчитывает комиссию и формирует платёжную ссылку.',
    details: ['Указывает товар и стоимость', 'Система рассчитывает комиссию', 'Вводит данные клиента'],
    color: 'bg-primary',
  },
  {
    id: 'link',
    phase: 'Ссылка',
    icon: <IconFileCheck size={24} />,
    title: 'Система генерирует ссылку',
    desc: 'Уникальная платёжная ссылка + QR-код. Отправьте клиенту через мессенджер — он оплатит за минуту.',
    details: ['Уникальная ссылка на оплату', 'QR-код для удобства', 'Отправка через мессенджер'],
    color: 'bg-primary',
  },
  {
    id: 'payment',
    phase: 'Оплата',
    icon: <IconCreditCard size={24} />,
    title: 'Клиент оплачивает',
    desc: 'Клиент переходит по ссылке, оплачивает через СБП или картой. Мгновенное подтверждение.',
    details: ['Переходит по ссылке', 'Оплачивает через СБП', 'Получает подтверждение'],
    color: 'bg-accent',
  },
  {
    id: 'purchase',
    phase: 'Выкуп',
    icon: <IconCoins size={24} />,
    title: 'Мы выкупаем товар',
    desc: 'Находим лучшего поставщика, выкупаем товар и получаем инвойс. Всё автоматизировано.',
    details: ['Находим поставщика', 'Выкупаем товар', 'Получаем инвойс'],
    color: 'bg-primary',
  },
  {
    id: 'cargo',
    phase: 'Карго',
    icon: <IconTruck size={24} />,
    title: 'Передаём карго партнёру',
    desc: 'Товар + инвойс передаём карго-компании. Карго оформляет таможню от имени партнёра. Партнёр = импортёр.',
    details: ['Товар + инвойс карго-компании партнёра', 'Карго оформляет таможню от имени партнёра', 'Партнёр = импортер'],
    color: 'bg-primary',
  },
  {
    id: 'delivery',
    phase: 'Доставка',
    icon: <IconPackageCheck size={24} />,
    title: 'Партнёр получает товар',
    desc: 'Товар доставляется на точку за 5–7 дней. Партнёр отдаёт клиенту и выбивает чек — заказ завершён.',
    details: ['Товар доставляется на точку', 'Партнёр отдает клиенту', 'Выбивает чек — заказ завершен'],
    color: 'bg-accent',
  },
]

export default function HowItWorksPage() {
  const [active, setActive] = useState(0)
  const step = phases[active]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute top-[-80px] right-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            8 шагов
          </div>
          <h1 className="text-[40px] sm:text-[48px] font-extrabold mb-4 text-text-primary tracking-tight leading-[1.08]">
            Как это работает
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Полный процесс от регистрации до получения товара — всё прозрачно и&nbsp;понятно
          </p>
        </div>
      </section>

      {/* Interactive Stepper */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center gap-0">
              {phases.map((p, i) => (
                <div key={p.id} className="flex-1 flex items-center">
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full group flex flex-col items-center cursor-pointer bg-transparent border-none p-0 transition-all duration-300`}
                  >
                    {/* Dot + line */}
                    <div className="w-full flex items-center mb-3">
                      {i > 0 && (
                        <div className={`flex-1 h-[2px] transition-colors duration-300 ${i <= active ? 'bg-primary' : 'bg-border'}`} />
                      )}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold transition-all duration-300 ${
                        i === active
                          ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                          : i < active
                            ? 'bg-primary text-white'
                            : 'bg-bg-section text-text-muted border border-border'
                      }`}>
                        {i + 1}
                      </div>
                      {i < phases.length - 1 && (
                        <div className={`flex-1 h-[2px] transition-colors duration-300 ${i < active ? 'bg-primary' : 'bg-border'}`} />
                      )}
                    </div>
                    {/* Label — hidden on small screens */}
                    <span className={`hidden sm:block text-[11px] font-medium transition-colors duration-300 ${
                      i === active ? 'text-primary' : 'text-text-muted'
                    }`}>
                      {p.phase}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Content panel */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: details */}
            <div className="lg:col-span-3">
              <div className="bg-bg-section rounded-3xl p-8 sm:p-10 min-h-[240px] sm:min-h-[320px]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border text-primary">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-[12px] text-text-muted font-semibold uppercase tracking-wider mb-0.5">
                      Шаг {active + 1} из {phases.length}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
                  {step.desc}
                </p>

                <div className="flex flex-col gap-3">
                  {step.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-border">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[14px] text-text-secondary">{d}</span>
                    </div>
                  ))}
                </div>

                {/* Nav buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setActive(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                      active === 0
                        ? 'border-border text-text-light bg-bg-section cursor-not-allowed'
                        : 'border-border text-text-primary bg-white hover:border-primary hover:text-primary'
                    }`}
                  >
                    ← Назад
                  </button>
                  <button
                    onClick={() => setActive(Math.min(phases.length - 1, active + 1))}
                    disabled={active === phases.length - 1}
                    className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                      active === phases.length - 1
                        ? 'border-border text-text-light bg-bg-section cursor-not-allowed'
                        : 'border-primary text-white bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    Далее →
                  </button>
                </div>
              </div>
            </div>

            {/* Right: side cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Mini overview */}
              <div className="bg-bg-dark rounded-3xl p-6 text-white flex-1">
                <div className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-4">Обзор процесса</div>
                <div className="flex flex-col gap-2">
                  {phases.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border-none cursor-pointer ${
                        i === active
                          ? 'bg-white/[0.1]'
                          : 'bg-transparent hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        i <= active ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
                      }`}>
                        {i < active ? '✓' : i + 1}
                      </div>
                      <span className={`text-[12px] font-medium ${i === active ? 'text-white' : 'text-white/50'}`}>
                        {p.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trade-in card */}
              <div className="bg-bg-section rounded-3xl p-6 border border-border">
                <h3 className="text-[15px] font-bold text-text-primary mb-3">Trade-in (обмен)</h3>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Новое устройство</span>
                    <span className="font-semibold text-text-primary">77 250 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Старое (Trade-in)</span>
                    <span className="font-semibold text-accent">−40 000 ₽</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold text-text-primary">Доплата клиента</span>
                    <span className="font-extrabold text-primary">37 250 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key points */}
          <div className="mt-10 bg-bg-hero rounded-3xl p-8 sm:p-10">
            <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-5">Ключевые моменты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Мы = Агент по закупке', sub: 'НЕ продавец, НЕ импортер' },
                { label: 'Партнёр = Импортер товара', sub: 'Полностью легальная схема' },
                { label: 'Комиссия — от 2 до 3%', sub: 'Без скрытых платежей' },
                { label: 'Глава 52 ГК РФ', sub: 'Агентский договор' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-text-primary mb-1">{item.label}</div>
                    <div className="text-[12px] text-text-muted">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-[16px] font-bold no-underline"
            >
              Зарегистрироваться <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
