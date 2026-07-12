import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../utils/calculate'
import { reachGoal } from '../lib/metrika'

const EXAMPLES = [
  { label: 'AirPods Pro 2', price: 24990 },
  { label: 'iPhone 15 Pro Max', price: 159900 },
  { label: 'MacBook Air M3', price: 129900 },
  { label: 'PlayStation 5', price: 55900 },
]

/** Отдельная индексируемая страница калькулятора */
export default function CalculatorPage() {
  const [cost, setCost] = useState('75000')
  const [touched, setTouched] = useState(false)
  const costNum = parseInt(cost) || 0
  const commission = Math.round(costNum * 0.03)
  const total = costNum + commission

  const handleChange = (value: string) => {
    setCost(value)
    if (!touched) {
      setTouched(true)
      reachGoal('calc_used')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">

        {/* Breadcrumb */}
        <nav className="pp-breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          <span className="pp-bc-current">Калькулятор</span>
        </nav>

        <header className="mt-8 mb-10 max-w-2xl">
          <h1 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-text-primary mb-4 leading-[1.1]">
            Калькулятор агентской закупки
          </h1>
          <p className="text-[15.5px] text-text-secondary leading-relaxed">
            Введите стоимость товара — покажем полный расчёт: цена закупки, комиссия агента 3% и итог к оплате.
            Эта же сумма зафиксируется в платёжной ссылке для вашего покупателя — без скрытых сборов.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Калькулятор */}
          <div className="bg-bg-dark rounded-3xl p-7 sm:p-9 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <label htmlFor="calc-cost" className="text-[12px] text-white/40 mb-2 block">Стоимость товара, ₽</label>
              <input
                id="calc-cost"
                type="number"
                inputMode="numeric"
                value={cost}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-2xl font-bold outline-none focus:border-primary transition-colors mb-4"
                placeholder="75000"
              />

              <div className="flex flex-wrap gap-2 mb-6">
                {EXAMPLES.map(ex => (
                  <button
                    key={ex.label}
                    onClick={() => handleChange(String(ex.price))}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px] text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">Товар</span>
                  <span className="text-[15px] font-semibold text-white">{formatPrice(costNum)}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">Комиссия 3%</span>
                  <span className="text-[15px] font-semibold text-white">{formatPrice(commission)}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-[13px] text-white/50">Итого к оплате</span>
                  <span className="font-display text-2xl font-extrabold text-primary-light">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Пояснение */}
          <div className="flex flex-col gap-4">
            <div className="bg-bg-section rounded-3xl p-7">
              <h2 className="text-[17px] font-extrabold tracking-tight text-text-primary mb-3">Из чего складывается сумма</h2>
              <ul className="flex flex-col gap-2.5 pl-0 list-none m-0">
                {[
                  'Стоимость товара — закупочная цена у зарубежного поставщика.',
                  'Комиссия агента — 3% от стоимости. Это единственная плата за сервис.',
                  'Доставка через карго рассчитывается отдельно по тарифам перевозчика и оплачивается при получении.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-[14px] text-text-secondary leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-section rounded-3xl p-7">
              <h2 className="text-[17px] font-extrabold tracking-tight text-text-primary mb-3">Что дальше</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
                Понравился расчёт? Создайте заказ в личном кабинете — система сгенерирует платёжную ссылку
                с этой суммой для вашего покупателя. Товар приедет за 5–7 рабочих дней.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold no-underline">
                  Стать партнёром <ArrowRight size={14} />
                </Link>
                <Link to="/catalog" className="inline-flex items-center justify-center px-6 py-3 rounded-[0.875rem] text-[14px] font-semibold no-underline border border-border text-text-primary hover:border-primary hover:text-primary transition-colors">
                  Открыть каталог
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
