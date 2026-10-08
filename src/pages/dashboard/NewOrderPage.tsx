import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Copy, Search, X, Lock } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { products, type Product } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { mockOrders, getNextOrderNumber, saveOrders } from '../../data/mock'
import { formatPrice, formatReward, rewardFor, rewardPercentAt } from '../../utils/calculate'
import { reachGoal } from '../../lib/metrika'
import type { Order } from '../../types'

type Step = 1 | 2 | 3 | 4

const fieldCls =
  'w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm'

/** Поиск по каталогу ТехЭйджент. Товар можно только выбрать — цену задаёт каталог */
function CatalogPicker({ onPick }: { onPick: (p: Product) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      : products
    return list.slice(0, 30)
  }, [query])

  return (
    <div ref={ref} className="relative">
      <label htmlFor="catalog-search" className="block text-sm font-medium mb-1.5 text-text-secondary">Товар из каталога</label>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          id="catalog-search"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className={`${fieldCls} pl-10 pr-10`}
          placeholder="Название или бренд"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer p-0"
            aria-label="Очистить"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={!p.inStock}
              onClick={() => { onPick(p); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg-section transition-colors bg-transparent border-none cursor-pointer border-b border-border last:border-b-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <span className="text-xl shrink-0">{p.image}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">{p.name}</div>
                <div className="text-xs text-text-muted">{p.brand} · {p.category}{!p.inStock && ' · недоступен'}</div>
              </div>
              <span className="text-sm font-semibold text-primary shrink-0">{formatPrice(p.price)}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-xl p-4 text-center text-sm text-text-muted">
          В каталоге такого товара нет.{' '}
          <Link to="/dashboard/chat" className="text-primary font-medium no-underline hover:underline">Напишите менеджеру</Link>
        </div>
      )}
    </div>
  )
}

export default function NewOrderPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [copied, setCopied] = useState(false)

  const [product, setProduct] = useState<Product | null>(null)
  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  /* Оферта, п. 5.1: заказ — только по просьбе покупателя, продавец и условия покупки названы до оформления */
  const [buyerInformed, setBuyerInformed] = useState(false)

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null)

  if (!user) return null

  if (user.partnerStatus !== 'VERIFIED') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-text-primary">Новый заказ</h1>
        <div className="card p-6 flex items-start gap-3">
          <Lock size={20} className="text-text-muted shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p>
              <Link to="/dashboard/profile" className="text-primary font-medium no-underline hover:underline">Данные анкеты</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const canGoStep3 = buyerName.trim() !== '' && buyerPhone.trim() !== ''
  /* Процент, действующий сегодня: изменение размера применяется к заказам через 14 дней (оферта, п. 7.1) */
  const percent = rewardPercentAt(user)

  const handleCreate = () => {
    if (!product || !buyerInformed) return
    const now = new Date().toISOString()
    const paymentId = 'pay_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    const newOrder: Order = {
      id: crypto.randomUUID(),
      orderNumber: getNextOrderNumber(),
      userId: user.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      partnerReward: rewardFor(product.price, percent),
      rewardPercent: percent,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      buyerEmail: buyerEmail.trim() || undefined,
      paymentId,
      paymentLink: `/pay/${paymentId}`,
      paymentStatus: 'PENDING',
      status: 'CREATED',
      createdAt: now,
      updatedAt: now,
    }
    mockOrders.unshift(newOrder)
    saveOrders()
    reachGoal('order_created', { price: newOrder.price })
    setCreatedOrder(newOrder)
    setStep(4)
  }

  const paymentUrl = createdOrder ? `${window.location.origin}/pay/${createdOrder.paymentId}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setStep(1)
    setProduct(null)
    setBuyerName('')
    setBuyerPhone('')
    setBuyerEmail('')
    setBuyerInformed(false)
    setCreatedOrder(null)
  }

  const nextBtn = 'flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer disabled:opacity-50 disabled:shadow-none'
  const backBtn = 'flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium bg-transparent border-none cursor-pointer'

  return (
    <div className="max-w-2xl mx-auto">
      {step < 4 && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3 text-text-primary">Новый заказ</h1>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    s < step ? 'bg-success text-white' : s === step ? 'bg-primary text-white' : 'bg-bg-light text-text-muted'
                  }`}
                >
                  {s < step ? <Check size={14} /> : s}
                </div>
                {s < 3 && <div className={`w-8 h-0.5 ${s < step ? 'bg-success' : 'bg-bg-light'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Шаг 1: товар из каталога */}
      {step === 1 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Товар</h2>
          {product ? (
            <div className="card-soft rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{product.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary">{product.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{product.brand} · {product.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProduct(null)}
                  className="text-sm text-primary font-medium bg-transparent border-none cursor-pointer hover:underline shrink-0"
                >
                  Изменить
                </button>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between text-sm">
                <span className="text-text-secondary">Цена для покупателя</span>
                <span className="font-bold text-text-primary">{formatPrice(product.price)}</span>
              </div>
            </div>
          ) : (
            <CatalogPicker onPick={setProduct} />
          )}
          <p className="text-xs text-text-muted mt-3">
            Цену товара устанавливает ТехЭйджент, в заказе она не меняется.
            Нужного товара нет в каталоге?{' '}
            <Link to="/dashboard/chat" className="text-primary font-medium no-underline hover:underline">Напишите менеджеру</Link>
          </p>
          <div className="flex justify-end mt-6">
            <button onClick={() => setStep(2)} disabled={!product} className={nextBtn}>
              Далее <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Шаг 2: покупатель */}
      {step === 2 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Покупатель</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="buyer-name" className="block text-sm font-medium mb-1.5 text-text-secondary">ФИО покупателя</label>
              <input
                id="buyer-name"
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className={fieldCls}
                placeholder="Фамилия Имя Отчество"
                autoComplete="off"
              />
              <p className="text-xs text-text-muted mt-1">Товар выдаётся только этому человеку — ФИО сверяется при выдаче.</p>
            </div>
            <div>
              <label htmlFor="buyer-phone" className="block text-sm font-medium mb-1.5 text-text-secondary">Телефон</label>
              <input
                id="buyer-phone"
                type="tel"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className={fieldCls}
                placeholder="+7"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="buyer-email" className="block text-sm font-medium mb-1.5 text-text-secondary">
                Email <span className="text-text-muted">(необязательно)</span>
              </label>
              <input
                id="buyer-email"
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className={fieldCls}
                placeholder="email@example.com"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className={backBtn}>
              <ArrowLeft size={16} /> Назад
            </button>
            <button onClick={() => setStep(3)} disabled={!canGoStep3} className={nextBtn}>
              Далее <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Шаг 3: проверка */}
      {step === 3 && product && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Проверка заказа</h2>
          <div className="space-y-4">
            <div className="card-soft rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Товар</span>
                <span className="font-medium text-text-primary text-right">{product.name}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between gap-4 font-bold">
                <span className="text-text-primary">Цена для покупателя — к оплате ТехЭйджент</span>
                <span className="text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">
                  Ваше вознаграждение{percent ? ` (${percent}%)` : ''}
                </span>
                <span className="text-text-primary whitespace-nowrap">{formatReward(rewardFor(product.price, percent))}</span>
              </div>
              <p className="text-xs text-text-muted">Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.</p>
            </div>

            <div className="card-soft rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Покупатель</span>
                <span className="text-text-primary text-right">{buyerName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Телефон</span>
                <span className="text-text-primary">{buyerPhone}</span>
              </div>
              {buyerEmail && (
                <div className="flex justify-between gap-4">
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary">{buyerEmail}</span>
                </div>
              )}
            </div>
          </div>
          <label className="flex items-start gap-2.5 mt-5 cursor-pointer text-sm text-text-primary">
            <input
              type="checkbox"
              checked={buyerInformed}
              onChange={(e) => setBuyerInformed(e.target.checked)}
              className="accent-primary mt-0.5 shrink-0"
            />
            <span>
              Покупатель просил оформить заказ и знает, что продавец — ОсОО&nbsp;«ТехЭйджент», а условия покупки — в{' '}
              <Link to="/legal/sale-offer" target="_blank" className="text-primary no-underline hover:underline">оферте купли-продажи</Link>
            </span>
          </label>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className={backBtn}>
              <ArrowLeft size={16} /> Назад
            </button>
            <button
              onClick={handleCreate}
              disabled={!buyerInformed}
              className="flex items-center gap-1 bg-success hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={16} /> Создать заказ
            </button>
          </div>
        </div>
      )}

      {/* Заказ создан: ссылка и QR для оплаты покупателем */}
      {step === 4 && createdOrder && (
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-1 text-text-primary">Заказ {createdOrder.orderNumber} создан</h2>
          <p className="text-text-secondary mb-6">Отправьте покупателю ссылку на оплату или покажите QR-код</p>

          <p className="text-lg font-bold mb-4 text-text-primary">
            К оплате: <span className="text-primary">{formatPrice(createdOrder.price)}</span>
          </p>

          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-xl p-4 border border-border">
              <QRCodeSVG value={paymentUrl} size={160} />
            </div>
          </div>

          <div className="card-soft rounded-lg p-4 mb-4">
            <p className="text-sm font-medium break-all text-text-primary">{paymentUrl}</p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer mb-6"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Скопировано' : 'Копировать ссылку'}
          </button>

          <div className="text-left rounded-lg border border-amber-300 bg-amber-50 p-4 mb-6 text-sm text-amber-900 space-y-1">
            <p>
              Оплату принимает только ТехЭйджент — по этой ссылке или QR-коду через СБП. Перед оплатой покупатель принимает{' '}
              <Link to="/legal/sale-offer" target="_blank" className="text-amber-900 underline">оферту купли-продажи</Link>.
            </p>
            <p className="font-semibold">Принимать деньги от покупателя наличными или на свои реквизиты нельзя.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(`/dashboard/orders/${createdOrder.id}`)}
              className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-bg-light transition-colors bg-transparent text-text-primary cursor-pointer"
            >
              Открыть заказ
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 border-none cursor-pointer"
            >
              Новый заказ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
