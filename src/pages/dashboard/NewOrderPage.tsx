import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Copy, Search, X, Lock } from 'lucide-react'
import { PageBar, RoundLink, StickyBar } from '../../components/app/ui'
import ProductIcon from '../../components/app/ProductIcon'
import { QRCodeSVG } from 'qrcode.react'
import { products, type Product } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { createOrder } from '../../data/mock'
import { formatPercent, formatPrice, formatReward, rewardFor, rewardPercentAt } from '../../utils/calculate'
import { formatPhone, isValidEmail, phoneError } from '../../utils/validate'
import { copyText, selectText } from '../../utils/clipboard'
import { reachGoal } from '../../lib/metrika'
import type { Order } from '../../types'

type Step = 1 | 2 | 3 | 4

const fieldCls =
  'w-full h-[52px] px-4 rounded-2xl border bg-white lg:bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base lg:text-sm lg:h-12 lg:rounded-xl'
const labelCls = 'block text-sm font-semibold mb-2 ml-1 text-text-secondary'
const errCls = 'text-red-600 text-[13px] mt-1.5 ml-1'
const hintCls = 'text-[13px] leading-snug text-text-muted mt-1.5 ml-1'
/* Блок шага: на телефоне без рамки на фоне кабинета, на компьютере — карточка */
const stepBox = 'lg:bg-white lg:rounded-[20px] lg:border lg:border-border lg:p-6'
const STEP_LABELS = ['Товар', 'Покупатель', 'Проверка']

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
      <label htmlFor="catalog-search" className={labelCls}>Товар из каталога</label>
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          id="catalog-search"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className={`${fieldCls} border-border pl-12 pr-12`}
          placeholder="Название или бренд"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setOpen(false) }}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer p-0"
            aria-label="Очистить"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-border rounded-2xl shadow-xl max-h-[60vh] lg:max-h-72 overflow-y-auto overscroll-contain">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={!p.inStock}
              onClick={() => { onPick(p); setOpen(false) }}
              className="w-full flex items-center gap-3 px-3.5 min-h-[60px] py-2 text-left hover:bg-bg-section transition-colors bg-transparent border-none cursor-pointer border-b border-border last:border-b-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <span className="w-10 h-10 rounded-xl bg-bg-light grid place-items-center text-text-secondary shrink-0">
                <ProductIcon productId={p.id} size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] lg:text-sm font-medium text-text-primary truncate">{p.name}</div>
                <div className="text-[13px] lg:text-xs text-text-muted truncate">{p.brand} · {p.category}{!p.inStock && ' · недоступен'}</div>
              </div>
              <span className="text-[15px] lg:text-sm font-semibold text-primary shrink-0 whitespace-nowrap">{formatPrice(p.price)}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-border rounded-2xl shadow-xl p-4 text-center text-sm text-text-muted">
          В каталоге такого товара нет.{' '}
          <Link to="/dashboard/chat" className="text-primary font-medium no-underline hover:underline">Напишите менеджеру</Link>
        </div>
      )}
    </div>
  )
}

type BuyerErrors = Partial<Record<'name' | 'phone' | 'email', string>>

export default function NewOrderPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const linkRef = useRef<HTMLParagraphElement>(null)

  const [product, setProduct] = useState<Product | null>(null)
  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerErrors, setBuyerErrors] = useState<BuyerErrors>({})
  /* Оферта, п. 5.1: заказ — только по просьбе покупателя, продавец и условия покупки названы до оформления */
  const [buyerInformed, setBuyerInformed] = useState(false)

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null)

  if (!user) return null

  if (user.partnerStatus !== 'VERIFIED') {
    return (
      <div className="max-w-2xl mx-auto">
        <PageBar back="/dashboard" backLabel="На главную" title="Новый заказ" />
        <div className="app-group p-5 lg:p-6 flex items-start gap-3">
          <Lock size={20} className="text-text-muted shrink-0 mt-0.5" />
          <p className="text-[15px] lg:text-sm leading-relaxed text-text-secondary">
            Оформлять заказы можно после того, как ТехЭйджент подтвердит анкету.{' '}
            <Link to="/dashboard/profile" className="text-primary font-medium no-underline hover:underline">Данные анкеты</Link>
          </p>
        </div>
      </div>
    )
  }

  const canGoStep3 = buyerName.trim() !== '' && buyerPhone.trim() !== ''
  /* Процент, действующий сегодня: изменение размера применяется к заказам через 14 дней (оферта, п. 7.1) */
  const percent = rewardPercentAt(user)

  /** Смена шага — с началом страницы: на телефоне следующий шаг иначе оказывается ниже экрана */
  const goTo = (s: Step) => {
    setStep(s)
    window.scrollTo(0, 0)
  }

  const clearBuyerError = (k: keyof BuyerErrors) => {
    if (!buyerErrors[k]) return
    setBuyerErrors((prev) => {
      const next = { ...prev }
      delete next[k]
      return next
    })
  }

  /* Телефон и email покупателя — по тем же правилам, что в анкете партнёра; email необязателен */
  const toCheck = () => {
    const errs: BuyerErrors = {}
    if (!buyerName.trim()) errs.name = 'Укажите ФИО покупателя'
    const pe = phoneError(buyerPhone)
    if (pe) errs.phone = pe
    if (buyerEmail.trim() && !isValidEmail(buyerEmail)) errs.email = 'Введите корректный email'
    setBuyerErrors(errs)
    if (Object.keys(errs).length > 0) return
    setBuyerPhone(formatPhone(buyerPhone))
    goTo(3)
  }

  const handleCreate = () => {
    if (!product || !buyerInformed) return
    const now = new Date().toISOString()
    const paymentId = 'pay_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    // Номер выдаётся по свежим данным — две вкладки не получат одинаковый
    const newOrder = createOrder({
      id: crypto.randomUUID(),
      userId: user.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      partnerReward: rewardFor(product.price, percent),
      rewardPercent: percent,
      buyerName: buyerName.trim(),
      buyerPhone: formatPhone(buyerPhone),
      buyerEmail: buyerEmail.trim() || undefined,
      paymentId,
      paymentLink: `/pay/${paymentId}`,
      paymentStatus: 'PENDING',
      status: 'CREATED',
      createdAt: now,
      updatedAt: now,
    })
    reachGoal('order_created', { price: newOrder.price })
    setCreatedOrder(newOrder)
    goTo(4)
  }

  const paymentUrl = createdOrder ? `${window.location.origin}/pay/${createdOrder.paymentId}` : ''

  /* «Скопировано» — только если буфер действительно принял ссылку; иначе ссылка выделяется для ручного копирования */
  const handleCopy = async () => {
    if (await copyText(paymentUrl)) {
      setCopyFailed(false)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setCopied(false)
      setCopyFailed(true)
      selectText(linkRef.current)
    }
  }

  const reset = () => {
    goTo(1)
    setProduct(null)
    setBuyerName('')
    setBuyerPhone('')
    setBuyerEmail('')
    setBuyerErrors({})
    setBuyerInformed(false)
    setCreatedOrder(null)
    setCopied(false)
    setCopyFailed(false)
  }

  const nextBtn = 'hidden lg:flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer disabled:opacity-50 disabled:shadow-none'
  const backBtn = 'hidden lg:flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium bg-transparent border-none cursor-pointer'
  const kvRow = 'flex justify-between gap-4 leading-snug'

  return (
    <div className="max-w-2xl mx-auto">
      {step < 4 && (
        <>
          <PageBar
            back="/dashboard"
            onBack={step > 1 ? () => goTo((step - 1) as Step) : undefined}
            backLabel={step > 1 ? 'Предыдущий шаг' : 'На главную'}
            title="Новый заказ"
            right={
              <RoundLink to="/dashboard" label="Закрыть">
                <X size={22} />
              </RoundLink>
            }
          />
          {/* Шаги подписаны словами, пройденные закрашены */}
          <div className="app-steps mb-5 lg:mb-6" aria-label={`Шаг ${step} из 3: ${STEP_LABELS[step - 1]}`}>
            {STEP_LABELS.map((label, i) => (
              <div key={label} className={i + 1 < step ? 'done' : i + 1 === step ? 'now' : ''}>{label}</div>
            ))}
          </div>
        </>
      )}

      {/* Шаг 1: товар из каталога */}
      {step === 1 && (
        <div className={stepBox}>
          {product ? (
            <div className="app-group p-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-bg-light grid place-items-center text-text-secondary shrink-0">
                  <ProductIcon productId={product.id} size={24} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px] leading-snug text-text-primary">{product.name}</p>
                  <p className="text-[13px] text-text-muted mt-0.5">{product.brand} · {product.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProduct(null)}
                  className="text-[15px] text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline shrink-0 min-h-[44px] px-1"
                >
                  Изменить
                </button>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between gap-4 text-[15px] lg:text-sm">
                <span className="text-text-secondary">Цена для покупателя</span>
                <span className="font-bold text-text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
              </div>
            </div>
          ) : (
            <CatalogPicker onPick={setProduct} />
          )}
          <p className={`${hintCls} mt-3`}>
            Цену товара устанавливает ТехЭйджент, в заказе она не меняется.
            Нужного товара нет в каталоге?{' '}
            <Link to="/dashboard/chat" className="text-primary font-medium no-underline hover:underline">Напишите менеджеру</Link>
          </p>
          <div className="hidden lg:flex justify-end mt-6">
            <button onClick={() => goTo(2)} disabled={!product} className={nextBtn}>
              Далее <ArrowRight size={16} />
            </button>
          </div>
          <StickyBar>
            <button onClick={() => goTo(2)} disabled={!product} className="app-btn app-btn-primary">Далее</button>
          </StickyBar>
        </div>
      )}

      {/* Шаг 2: покупатель */}
      {step === 2 && (
        <div className={stepBox}>
          {product && (
            <div className="app-group px-4 py-3 mb-5 flex items-center gap-3">
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-[15px] lg:text-sm leading-snug text-text-primary truncate">{product.name}</span>
                <span className="block text-[13px] text-text-muted">{formatPrice(product.price)}</span>
              </span>
              <button type="button" onClick={() => goTo(1)} className="text-[15px] lg:text-sm text-primary font-semibold bg-transparent border-none cursor-pointer min-h-[44px] px-1 shrink-0">
                Сменить
              </button>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="buyer-name" className={labelCls}>ФИО покупателя</label>
              <input
                id="buyer-name"
                type="text"
                value={buyerName}
                onChange={(e) => { setBuyerName(e.target.value); clearBuyerError('name') }}
                className={`${fieldCls} ${buyerErrors.name ? 'border-red-500/50' : 'border-border'}`}
                placeholder="Фамилия Имя Отчество"
                autoComplete="off"
                autoCapitalize="words"
                aria-invalid={buyerErrors.name ? true : undefined}
              />
              {buyerErrors.name && <p className={errCls}>{buyerErrors.name}</p>}
              <p className={hintCls}>Товар выдаётся только этому человеку — ФИО сверяется при выдаче.</p>
            </div>
            <div>
              <label htmlFor="buyer-phone" className={labelCls}>Телефон</label>
              <input
                id="buyer-phone"
                type="tel"
                inputMode="tel"
                value={buyerPhone}
                onChange={(e) => { setBuyerPhone(e.target.value); clearBuyerError('phone') }}
                onBlur={() => setBuyerPhone((v) => formatPhone(v))}
                className={`${fieldCls} ${buyerErrors.phone ? 'border-red-500/50' : 'border-border'}`}
                placeholder="+7 900 000-00-00"
                autoComplete="off"
                aria-invalid={buyerErrors.phone ? true : undefined}
              />
              {buyerErrors.phone && <p className={errCls}>{buyerErrors.phone}</p>}
            </div>
            <div>
              <label htmlFor="buyer-email" className={labelCls}>
                Email <span className="text-text-muted font-normal">(необязательно)</span>
              </label>
              <input
                id="buyer-email"
                type="email"
                inputMode="email"
                value={buyerEmail}
                onChange={(e) => { setBuyerEmail(e.target.value); clearBuyerError('email') }}
                className={`${fieldCls} ${buyerErrors.email ? 'border-red-500/50' : 'border-border'}`}
                placeholder="email@example.com"
                autoComplete="off"
                autoCapitalize="none"
                aria-invalid={buyerErrors.email ? true : undefined}
              />
              {buyerErrors.email && <p className={errCls}>{buyerErrors.email}</p>}
            </div>
          </div>
          <div className="hidden lg:flex justify-between mt-6">
            <button onClick={() => goTo(1)} className={backBtn}>
              <ArrowLeft size={16} /> Назад
            </button>
            <button onClick={toCheck} disabled={!canGoStep3} className={nextBtn}>
              Далее <ArrowRight size={16} />
            </button>
          </div>
          <StickyBar>
            <button onClick={toCheck} disabled={!canGoStep3} className="app-btn app-btn-primary">Далее</button>
          </StickyBar>
        </div>
      )}

      {/* Шаг 3: проверка */}
      {step === 3 && product && (
        <div className={stepBox}>
          <div className="space-y-3 lg:space-y-4">
            <div className="app-group p-4 space-y-2.5 text-[15px] lg:text-sm">
              <div className={kvRow}>
                <span className="text-text-secondary">Товар</span>
                <span className="font-medium text-text-primary text-right">{product.name}</span>
              </div>
              <div className={`border-t border-border pt-2.5 ${kvRow} font-bold`}>
                <span className="text-text-primary">Цена для покупателя — к оплате ТехЭйджент</span>
                <span className="text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
              </div>
              <div className={kvRow}>
                <span className="text-text-secondary">
                  Ваше вознаграждение{percent ? ` (${formatPercent(percent)})` : ''}
                </span>
                <span className="text-text-primary whitespace-nowrap">{formatReward(rewardFor(product.price, percent))}</span>
              </div>
              <p className="text-[13px] lg:text-xs leading-snug text-text-muted">Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.</p>
            </div>

            <div className="app-group p-4 space-y-2.5 text-[15px] lg:text-sm">
              <div className={kvRow}>
                <span className="text-text-secondary">Покупатель</span>
                <span className="text-text-primary text-right">{buyerName}</span>
              </div>
              <div className={kvRow}>
                <span className="text-text-secondary">Телефон</span>
                <span className="text-text-primary whitespace-nowrap">{buyerPhone}</span>
              </div>
              {buyerEmail && (
                <div className={kvRow}>
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary text-right break-all">{buyerEmail}</span>
                </div>
              )}
            </div>
          </div>
          <label className="flex items-start gap-3 mt-5 cursor-pointer text-[15px] lg:text-sm leading-relaxed text-text-primary">
            <input
              type="checkbox"
              checked={buyerInformed}
              onChange={(e) => setBuyerInformed(e.target.checked)}
              className="accent-primary mt-1 shrink-0 w-5 h-5"
            />
            <span>
              Покупатель просил оформить заказ и знает, что продавец — ООО&nbsp;«ТехЭйджент», а условия покупки — в{' '}
              <Link to="/legal/sale-offer" target="_blank" className="text-primary no-underline hover:underline">оферте купли-продажи</Link>
            </span>
          </label>
          <div className="hidden lg:flex justify-between mt-6">
            <button onClick={() => goTo(2)} className={backBtn}>
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
          <StickyBar>
            <button onClick={handleCreate} disabled={!buyerInformed} className="app-btn app-btn-success">
              <Check size={20} /> Создать заказ
            </button>
          </StickyBar>
        </div>
      )}

      {/* Заказ создан: ссылка и QR для оплаты покупателем */}
      {step === 4 && createdOrder && (
        <div className={`${stepBox} text-center pt-4 lg:pt-6`}>
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-text-primary leading-tight">Заказ {createdOrder.orderNumber} создан</h1>
          <p className="text-[15px] lg:text-base leading-relaxed text-text-secondary mb-5">Отправьте покупателю ссылку на оплату или покажите QR-код</p>

          <p className="text-lg font-bold mb-4 text-text-primary">
            К оплате: <span className="text-primary whitespace-nowrap">{formatPrice(createdOrder.price)}</span>
          </p>

          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-2xl p-4 border border-border">
              <QRCodeSVG value={paymentUrl} size={180} />
            </div>
          </div>

          <div className="bg-white lg:bg-bg-light border border-border lg:border-0 rounded-2xl p-4 mb-4">
            <p ref={linkRef} className="text-sm font-medium break-all text-text-primary">{paymentUrl}</p>
          </div>

          <div className="mb-5">
            <button
              onClick={handleCopy}
              className="app-btn app-btn-primary lg:inline-flex lg:w-auto lg:min-h-[44px] lg:text-sm lg:rounded-lg lg:px-6"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Скопировано' : 'Копировать ссылку'}
            </button>
            {copyFailed && <p className="text-sm text-text-secondary mt-2" role="status">Скопируйте ссылку вручную</p>}
          </div>

          <div className="text-left rounded-2xl border border-amber-300 bg-amber-50 p-4 mb-5 text-sm leading-relaxed text-amber-900 space-y-1.5">
            <p>
              Оплату принимает только ТехЭйджент — по этой ссылке или QR-коду через СБП. Перед оплатой покупатель отмечает
              согласие с{' '}
              <Link to="/legal/sale-offer" target="_blank" className="text-amber-900 underline">офертой купли-продажи</Link>.
            </p>
            <p className="font-semibold">Принимать деньги от покупателя наличными или на свои реквизиты нельзя.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-center">
            <button
              onClick={() => navigate(`/dashboard/orders/${createdOrder.id}`)}
              className="min-h-[52px] lg:min-h-[44px] px-4 lg:px-6 rounded-2xl lg:rounded-lg border border-border text-[15px] lg:text-sm font-semibold hover:bg-bg-light transition-colors bg-white text-text-primary cursor-pointer"
            >
              Открыть заказ
            </button>
            <button
              onClick={reset}
              className="min-h-[52px] lg:min-h-[44px] px-4 lg:px-6 rounded-2xl lg:rounded-lg bg-primary/10 text-primary text-[15px] lg:text-sm font-semibold transition-colors border-none cursor-pointer hover:bg-primary/15"
            >
              Новый заказ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
