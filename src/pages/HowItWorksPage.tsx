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
    phase: 'Анкета',
    icon: <IconUserPlus size={24} />,
    title: 'Партнёр заполняет анкету',
    desc: 'Наименование, ИНН, ОГРН или ОГРНИП, адрес точки, контакты и банковские реквизиты для выплаты вознаграждения. Принимаете агентский договор-оферту.',
    details: ['Заполняет анкету', 'Принимает агентский договор-оферту', 'Ждёт проверки ТехЭйджент'],
    color: 'bg-primary',
  },
  {
    id: 'check',
    phase: 'Проверка',
    icon: <IconFileCheck size={24} />,
    title: 'ТехЭйджент проверяет данные',
    desc: 'До первого заказа ТехЭйджент проверяет анкету и при необходимости запрашивает документы. После подтверждения в кабинете открывается оформление заказов.',
    details: ['Проверка анкеты', 'Запрос документов при необходимости', 'Подтверждение — можно оформлять заказы'],
    color: 'bg-primary',
  },
  {
    id: 'buyer',
    phase: 'Покупатель',
    icon: <IconSmartphone size={24} />,
    title: 'Покупатель выбирает товар',
    desc: 'Покупатель приходит в вашу точку и выбирает товар из каталога TechAgent. Вы объясняете условия: продавец — ОсОО «ТехЭйджент», цена — из каталога, оплата — через СБП продавцу.',
    details: ['Выбирает товар в каталоге', 'Узнаёт цену и условия покупки', 'Знает, что продавец — ТехЭйджент'],
    color: 'bg-primary',
  },
  {
    id: 'order',
    phase: 'Заказ',
    icon: <IconClipboardEdit size={24} />,
    title: 'Партнёр оформляет заказ',
    desc: 'Выбираете товар в каталоге кабинета и вносите данные покупателя. Система формирует ссылку и QR-код на оплату.',
    details: ['Товар из каталога, цена из каталога', 'Данные покупателя', 'Ссылка и QR-код на оплату'],
    color: 'bg-primary',
  },
  {
    id: 'payment',
    phase: 'Оплата',
    icon: <IconCreditCard size={24} />,
    title: 'Покупатель платит продавцу',
    desc: 'Покупатель открывает страницу оплаты, принимает оферту купли-продажи и платит через СБП напрямую ОсОО «ТехЭйджент». Партнёр деньги не принимает.',
    details: ['Принимает оферту купли-продажи', 'Оплачивает через СБП', 'Получает подтверждение оплаты'],
    color: 'bg-accent',
  },
  {
    id: 'purchase',
    phase: 'Выкуп',
    icon: <IconCoins size={24} />,
    title: 'ТехЭйджент выкупает товар',
    desc: 'ТехЭйджент покупает товар у поставщика по контракту поставки и инвойсу и становится его собственником.',
    details: ['Контракт поставки', 'Инвойс поставщика', 'Товар — в собственности ТехЭйджент'],
    color: 'bg-primary',
  },
  {
    id: 'delivery',
    phase: 'Доставка',
    icon: <IconTruck size={24} />,
    title: 'Товар едет в вашу точку',
    desc: 'ТехЭйджент доставляет товар в пункт выдачи за свой счёт — ориентировочно 5–7 рабочих дней с момента выкупа. Вы принимаете товар и отмечаете приёмку в кабинете.',
    details: ['Доставка за счёт ТехЭйджент', 'Приёмка в точке', 'Отметка в кабинете'],
    color: 'bg-primary',
  },
  {
    id: 'issue',
    phase: 'Выдача',
    icon: <IconPackageCheck size={24} />,
    title: 'Партнёр выдаёт товар',
    desc: 'Проверяете, что заказ оплачен, сверяете данные покупателя и печатаете акт приёма-передачи. Покупатель проверяет товар и подписывает акт, вы загружаете его в кабинет.',
    details: ['Статус «Оплачен» и сверка данных', 'Акт приёма-передачи в двух экземплярах', 'Скан акта в кабинете — заказ выдан'],
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
          <h1 className="text-[40px] sm:text-[48px] font-extrabold mb-4 text-text-primary tracking-tight leading-[1.08]">
            Как это работает
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            От анкеты партнёра до выдачи товара покупателю
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
                    <div className="text-[12px] text-primary font-semibold uppercase tracking-wider mb-0.5 font-mono">
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
                <div className="text-[11px] uppercase tracking-wider font-semibold mb-4 font-mono" style={{ color: '#8FA9FF' }}>Обзор процесса</div>
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

              {/* Documents card */}
              <div className="bg-bg-section rounded-3xl p-6 border border-border">
                <h3 className="text-[15px] font-bold text-text-primary mb-3">Документы по заказу</h3>
                <div className="flex flex-col gap-2.5 text-[13px]">
                  {[
                    ['Оферта купли-продажи', 'покупатель и ТехЭйджент'],
                    ['Контракт поставки и инвойс', 'ТехЭйджент и поставщик'],
                    ['Акт приёма-передачи', 'при выдаче товара'],
                    ['Отчёт агента и акт', 'партнёр и ТехЭйджент'],
                  ].map(([doc, who]) => (
                    <div key={doc} className="flex justify-between gap-3">
                      <span className="font-semibold text-text-primary">{doc}</span>
                      <span className="text-text-muted text-right">{who}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key points */}
          <div className="mt-10 bg-bg-hero rounded-3xl p-8 sm:p-10">
            <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-5">Ключевые моменты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Продавец — ОсОО «ТехЭйджент»', sub: 'Собственник товара до выдачи покупателю' },
                { label: 'Партнёр — агент и пункт выдачи', sub: 'Денег покупателя не принимает' },
                { label: 'Оплата — через СБП', sub: 'Напрямую продавцу' },
                { label: 'Вознаграждение партнёру', sub: 'Платит ТехЭйджент за выданные заказы' },
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
              Стать партнёром <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
