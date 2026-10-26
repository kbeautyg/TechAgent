import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Shield, Phone, ChevronDown, MapPin, CircleCheck } from 'lucide-react'
import { mockOrders, mockUsers, updateOrder, DEMO_MODE } from '../data/mock'
import { mockDocuments } from '../data/documents'
import { formatPrice, formatDateTime, formatDate } from '../utils/calculate'
import { useDataRevision } from '../utils/store'
import { LEGAL_NAME, DELIVERY_TERM, SUPPORT_EMAIL } from '../seo/site'
import { api, apiErrorText, ApiError } from '../lib/api'

const SELLER = {
  name: LEGAL_NAME,
  inn: 'ИНН 9909766511, КПП 771387001',
}

const PAYMENT_TERMS = mockDocuments.find(d => d.type === 'PAYMENT')?.content ?? ''

/** «5–7 рабочих дней» не разрывается по тире */
function NoBreakTerm({ text }: { text: string }) {
  const parts = text.split(/(\d+–\d+\u00A0рабочих дней)/)
  return <>{parts.map((p, i) => (i % 2 ? <span key={i} className="whitespace-nowrap">{p}</span> : p))}</>
}

/** Вопросы по заказу — покупателю */
const questions = (
  <p className="text-text-muted text-sm mt-3">
    Вопросы по заказу —{' '}
    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary no-underline hover:underline">{SUPPORT_EMAIL}</a>
  </p>
)

/** Заказ на странице оплаты (/api/pay/<token>): без данных покупателя — ссылку могут переслать */
interface PayView {
  number: string
  status: 'NEW' | 'AWAITING_PAYMENT' | 'PAID' | 'SHIPPED' | 'READY' | 'RECEIVED' | 'CANCELLED'
  items: { name: string; price: number; qty: number }[]
  total: number
  point: { companyName: string; address: string; phone: string } | null
  consentAt: string | null
  /** Ссылка банка: есть, когда ТехЭйджент подтвердил наличие и покупатель отметил согласия */
  paymentUrl: string
  paidAt: string | null
  issuedAt: string | null
  cancelReason: string
}

const shell = (children: React.ReactNode) => (
  <div className="min-h-[80vh] flex items-center justify-center bg-white py-6 sm:py-12 px-4">
    <div className="card-glass p-5 sm:p-8 max-w-md w-full">{children}</div>
  </div>
)

/**
 * Боевой сайт: заказ, оформленный партнёром. Покупатель отмечает согласие с офертой купли-продажи и на обработку
 * персональных данных (сервер запоминает время), затем переходит к оплате СБП по ссылке банка.
 * Ссылку банка ставит ТехЭйджент, когда подтвердит наличие, — до этого страница так и говорит
 */
function ServerPaymentPage({ token }: { token: string }) {
  const [order, setOrder] = useState<PayView | null>(null)
  const [missing, setMissing] = useState(false)
  const [agreedOffer, setAgreedOffer] = useState(false)
  const [agreedPd, setAgreedPd] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const load = () =>
    api<{ order: PayView }>(`/pay/${encodeURIComponent(token)}`)
      .then((r) => setOrder(r.order))
      .catch((e) => (e instanceof ApiError && e.status === 404 ? setMissing(true) : setError(apiErrorText(e))))
  useEffect(() => {
    void load()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  if (missing) return shell(<div className="text-center"><p className="text-text-muted">Заказ не найден или ссылка устарела</p>{questions}</div>)
  if (!order) return shell(<p className="text-center text-text-muted" aria-busy="true">{error || 'Загружаем заказ…'}</p>)

  const name = order.items.map((i) => (i.qty > 1 ? `${i.name} × ${i.qty}` : i.name)).join(', ')
  const pointBlock = order.point && (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-sm text-text-primary">{order.point.companyName}</p>
      <p className="text-text-muted text-sm flex items-start gap-1"><MapPin size={14} className="mt-0.5 flex-shrink-0" />{order.point.address}</p>
      {order.point.phone && <p className="text-text-muted text-sm flex items-center gap-1"><Phone size={14} />{order.point.phone}</p>}
    </div>
  )

  if (order.status === 'CANCELLED') {
    return shell(
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Заказ {order.number}</h1>
        <p className="text-text-secondary">Заказ отменён, оплата невозможна.</p>
        {order.cancelReason && <p className="text-text-muted text-sm mt-2">Причина: {order.cancelReason}</p>}
        {questions}
      </div>,
    )
  }

  if (order.paidAt && !['NEW', 'AWAITING_PAYMENT'].includes(order.status)) {
    return shell(
      <>
        <div className="text-center">
          <CircleCheck size={52} strokeWidth={1.6} className="text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text-primary mb-6">Оплата получена</h1>
        </div>
        <div className="bg-bg-light border border-border rounded-lg p-4 space-y-2 text-sm mb-4">
          <div className="flex justify-between gap-4"><span className="text-text-muted">Заказ</span><span className="text-text-primary">{order.number}</span></div>
          <div className="flex justify-between gap-4"><span className="text-text-muted">Товар</span><span className="text-text-primary text-right">{name}</span></div>
          <div className="flex justify-between gap-4"><span className="text-text-muted">Сумма</span><span className="font-bold text-text-primary">{formatPrice(order.total)}</span></div>
          <div className="flex justify-between gap-4"><span className="text-text-muted">Дата</span><span className="text-text-secondary">{formatDateTime(order.paidAt)}</span></div>
          <div className="flex justify-between gap-4"><span className="text-text-muted">Продавец</span><span className="text-text-secondary">{SELLER.name}</span></div>
        </div>
        <div className="bg-bg-light border border-border rounded-lg p-4 text-sm">
          {order.issuedAt ? (
            <p className="text-text-primary font-medium mb-2">Товар выдан {formatDate(order.issuedAt)}</p>
          ) : (
            <p className="text-text-muted mb-2">
              {order.status === 'READY'
                ? 'Товар ждёт вас в пункте выдачи, он хранится там 5\u00A0дней.'
                : <>Товар будет доставлен в пункт выдачи не позднее <span className="whitespace-nowrap">14&nbsp;дней</span> с даты оплаты. Когда он прибудет, пункт выдачи сообщит вам; товар хранится там 5&nbsp;дней.</>}
              {' '}При получении назовите номер заказа и возьмите документ, удостоверяющий личность: пункт выдачи может попросить его, чтобы сверить данные с заказом.
            </p>
          )}
          {pointBlock}
        </div>
      </>,
    )
  }

  /** Согласия → сервер; если ссылка банка уже есть — сразу к оплате */
  const confirm = async () => {
    if (!agreedOffer || !agreedPd || sending) return
    setSending(true)
    setError('')
    try {
      const r = await api<{ order: PayView }>(`/pay/${encodeURIComponent(token)}/consent`, { offer: true, pd: true })
      setOrder(r.order)
      if (r.order.paymentUrl) window.location.href = r.order.paymentUrl
    } catch (e) {
      setError(apiErrorText(e))
    } finally {
      setSending(false)
    }
  }

  return shell(
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Оплата заказа</h1>
        <p className="text-text-muted text-sm">{order.number}</p>
      </div>

      <div className="bg-bg-light border border-border rounded-lg p-5 mb-6">
        <p className="font-bold text-text-primary mb-3">{name}</p>
        <div className="border-t border-border pt-3 flex justify-between items-baseline font-bold text-lg">
          <span className="text-text-primary">К оплате</span>
          <span className="text-primary">{formatPrice(order.total)}</span>
        </div>
        <p className="text-xs text-text-muted mt-2">
          Цена окончательная, доставка до пункта выдачи входит в цену. Срок доставки — <NoBreakTerm text={DELIVERY_TERM} />.
        </p>
      </div>

      <div className="mb-5">
        <p className="text-sm text-text-muted mb-1">Продавец</p>
        <p className="font-medium text-sm text-text-primary">{SELLER.name}</p>
        <p className="text-text-muted text-xs mt-0.5">{SELLER.inn}</p>
        <p className="text-text-muted text-xs">
          Адрес и полные реквизиты — в{' '}
          <Link to="/legal/sale-offer" target="_blank" className="text-primary no-underline hover:underline">оферте купли-продажи</Link>
        </p>
      </div>

      {pointBlock && (
        <div className="mb-6">
          <p className="text-sm text-text-muted mb-1">Пункт выдачи — агент продавца</p>
          {pointBlock}
        </div>
      )}

      <div className="border-t border-border pt-6 mb-5">
        <p className="text-sm font-medium text-text-primary mb-1">Оплата через СБП</p>
        <p className="text-xs text-text-muted">Деньги получает только ТехЭйджент. Не передавайте деньги за товар в пункте выдачи.</p>
      </div>

      {order.consentAt ? (
        order.paymentUrl ? (
          <a href={order.paymentUrl} className="w-full block text-center bg-success hover:bg-success-dark text-white py-4 rounded-xl font-bold text-lg no-underline">
            Оплатить {formatPrice(order.total)}
          </a>
        ) : (
          <div className="rounded-xl bg-bg-light border border-border p-4 text-sm leading-relaxed text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Согласие отмечено {formatDateTime(order.consentAt)}</p>
            <p>ТехЭйджент проверяет наличие товара. Когда проверит, на этой странице появится кнопка оплаты, а если вы оставили email — придёт письмо со ссылкой.</p>
            <button type="button" onClick={() => void load()} className="mt-3 text-primary font-semibold bg-transparent border-none cursor-pointer p-0">Обновить страницу</button>
          </div>
        )
      ) : (
        <>
          <div className="mb-4">
            <button type="button" onClick={() => setTermsOpen((v) => !v)} className="w-full flex items-center justify-between gap-2 text-left bg-transparent border-none cursor-pointer p-0 mb-2">
              <span className="text-xs font-medium text-text-muted">Условия оплаты и возврата</span>
              <ChevronDown size={14} className={`text-text-muted transition-transform flex-shrink-0 ${termsOpen ? 'rotate-180' : ''}`} />
            </button>
            {termsOpen && (
              <div className="bg-bg-light border border-border rounded-lg p-3 mb-3 max-h-48 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-xs text-text-secondary leading-relaxed break-words">{PAYMENT_TERMS}</pre>
              </div>
            )}
            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={agreedOffer} onChange={(e) => setAgreedOffer(e.target.checked)} className="accent-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs text-text-muted leading-relaxed">
                  Принимаю условия{' '}
                  <Link to="/legal/sale-offer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">публичной оферты купли-продажи</Link>{' '}
                  {SELLER.name}
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={agreedPd} onChange={(e) => setAgreedPd(e.target.checked)} className="accent-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs text-text-muted leading-relaxed">
                  Даю согласие на обработку персональных данных на условиях{' '}
                  <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Политики конфиденциальности</Link>
                </span>
              </label>
            </div>
          </div>
          <button
            onClick={confirm}
            disabled={sending || !agreedOffer || !agreedPd}
            className="w-full bg-success hover:bg-success-dark text-white py-4 rounded-xl font-bold text-lg transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Сохраняем…' : order.status === 'AWAITING_PAYMENT' ? `Перейти к оплате ${formatPrice(order.total)}` : 'Подтвердить согласие'}
          </button>
        </>
      )}
      {error && <p className="text-sm text-red-600 text-center mt-3" role="alert">{error}</p>}
      {questions}
    </>,
  )
}

export default function PaymentPage() {
  const { paymentId = '' } = useParams()
  // Боевой сайт: заказы партнёров — на сервере
  if (!DEMO_MODE) return <ServerPaymentPage token={paymentId} />
  return <DemoPaymentPage paymentId={paymentId} />
}

function DemoPaymentPage({ paymentId }: { paymentId: string }) {
  // Статус могли изменить в другой вкладке (кабинет, админка) — страница перерисуется
  useDataRevision()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  /* Две отдельные отметки: согласие на обработку персональных данных — отдельно от оферты */
  const [agreedOffer, setAgreedOffer] = useState(false)
  const [agreedPd, setAgreedPd] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  const order = mockOrders.find((o) => o.paymentId === paymentId)

  if (!order) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="card-glass p-5 sm:p-8 text-center max-w-md w-full mx-4">
          <p className="text-text-muted">Заказ не найден или ссылка устарела</p>
          {questions}
        </div>
      </div>
    )
  }

  const point = mockUsers.find((u) => u.id === order.userId)
  const alreadyPaid = order.paymentStatus === 'PAID'

  /* Банка пока нет: имитация оплаты — только в демо-режиме. В боевой сборке статус «Оплачен»
   * ставит ТехЭйджент в админке по факту поступления денег («Оплата поступила») */
  const handlePay = () => {
    if (!DEMO_MODE || !agreedOffer || !agreedPd) return
    setPaying(true)
    const orderId = order.id
    setTimeout(() => {
      const now = new Date().toISOString()
      // Оплата проходит, только если заказ всё ещё ждёт оплаты: его могли отменить, пока шла оплата
      const updated = updateOrder(
        orderId,
        { saleOfferAcceptedAt: now, pdConsentAt: now, paymentStatus: 'PAID', paidAt: now, status: 'PAID' },
        (o) => o.status === 'CREATED' && o.paymentStatus !== 'PAID',
      )
      setPaying(false)
      if (updated) setPaid(true)
      window.scrollTo(0, 0)
    }, 2000)
  }

  const pointBlock = (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-sm text-text-primary">{point?.companyName}</p>
      {point?.pointAddress && (
        <p className="text-text-muted text-sm flex items-start gap-1">
          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
          {point.pointAddress}
        </p>
      )}
      {point?.phone && (
        <p className="text-text-muted text-sm flex items-center gap-1">
          <Phone size={14} />
          {point.phone}
        </p>
      )}
    </div>
  )

  if (order.status === 'CANCELLED') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white py-6 sm:py-12 px-4">
        <div className="card-glass p-5 sm:p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Заказ {order.orderNumber}</h1>
          <p className="text-text-secondary">Заказ отменён, оплата невозможна.</p>
          {order.refundedAt && (
            <p className="text-text-muted text-sm mt-3">Возврат оплаты оформлен {formatDate(order.refundedAt)}.</p>
          )}
          {questions}
        </div>
      </div>
    )
  }

  if (alreadyPaid || paid) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white py-6 sm:py-12 px-4">
        <div className="card-glass p-5 sm:p-8 max-w-md w-full">
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <CircleCheck size={52} strokeWidth={1.6} className="text-success" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-6">Оплата получена</h1>
          </div>

          <div className="bg-bg-light border border-border rounded-lg p-4 space-y-2 text-sm mb-4">
            <div className="flex justify-between gap-4">
              <span className="text-text-muted">Заказ</span>
              <span className="text-text-primary">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-muted">Товар</span>
              <span className="text-text-primary text-right">{order.productName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-muted">Сумма</span>
              <span className="font-bold text-text-primary">{formatPrice(order.price)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-muted">Дата</span>
              <span className="text-text-secondary">{formatDateTime(order.paidAt || new Date().toISOString())}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-muted">Продавец</span>
              <span className="text-text-secondary">{SELLER.name}</span>
            </div>
          </div>

          <div className="bg-bg-light border border-border rounded-lg p-4 text-sm">
            {order.returnedAt ? (
              <p className="text-text-primary font-medium mb-2">
                Оформлен возврат денег {formatDate(order.refundedAt ?? order.returnedAt)}
              </p>
            ) : order.status === 'ISSUED' && order.issuedAt ? (
              <p className="text-text-primary font-medium mb-2">Товар выдан {formatDate(order.issuedAt)}</p>
            ) : (
              <p className="text-text-muted mb-2">
                Товар будет доставлен в пункт выдачи не позднее{' '}
                <span className="whitespace-nowrap">14&nbsp;дней</span> с даты оплаты. Когда он
                прибудет, пункт выдачи сообщит вам; товар хранится там 5&nbsp;дней. При получении назовите номер заказа и
                возьмите документ, удостоверяющий личность: пункт выдачи может попросить его, чтобы сверить данные с заказом.
              </p>
            )}
            {pointBlock}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-6 sm:py-12 px-4">
      <div className="card-glass p-5 sm:p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Оплата заказа</h1>
          <p className="text-text-muted text-sm">{order.orderNumber}</p>
        </div>

        <div className="bg-bg-light border border-border rounded-lg p-5 mb-6">
          <p className="font-bold text-text-primary mb-3">{order.productName}</p>
          <div className="border-t border-border pt-3 flex justify-between items-baseline font-bold text-lg">
            <span className="text-text-primary">К оплате</span>
            <span className="text-primary">{formatPrice(order.price)}</span>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Цена окончательная, доставка до пункта выдачи входит в цену. Срок доставки — <NoBreakTerm text={DELIVERY_TERM} />.
          </p>
        </div>

        <div className="mb-5">
          <p className="text-sm text-text-muted mb-1">Продавец</p>
          <p className="font-medium text-sm text-text-primary">{SELLER.name}</p>
          <p className="text-text-muted text-xs mt-0.5">{SELLER.inn}</p>
          {/* Адрес продавца покупатель видит в оферте, которую принимает перед оплатой (ст. 9 ЗоЗПП) */}
          <p className="text-text-muted text-xs">
            Адрес и полные реквизиты — в{' '}
            <Link to="/legal/sale-offer" target="_blank" className="text-primary no-underline hover:underline">оферте купли-продажи</Link>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-text-muted mb-1">Пункт выдачи — агент продавца</p>
          {pointBlock}
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <p className="text-sm font-medium text-text-primary mb-3">Способ оплаты</p>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/10 cursor-pointer">
            <input type="radio" checked readOnly className="accent-primary" />
            <span className="font-medium text-sm text-text-primary">СБП (Система быстрых платежей)</span>
          </label>
          <p className="text-xs text-text-muted mt-2">
            Не передавайте деньги за товар в пункте выдачи.
          </p>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setTermsOpen(v => !v)}
            className="w-full flex items-center justify-between gap-2 text-left bg-transparent border-none cursor-pointer p-0 mb-2"
          >
            <span className="text-xs font-medium text-text-muted">Условия оплаты и возврата</span>
            <ChevronDown size={14} className={`text-text-muted transition-transform flex-shrink-0 ${termsOpen ? 'rotate-180' : ''}`} />
          </button>
          {termsOpen && (
            <div className="bg-bg-light border border-border rounded-lg p-3 mb-3 max-h-48 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-xs text-text-secondary leading-relaxed break-words overflow-wrap-anywhere">
                {PAYMENT_TERMS}
              </pre>
            </div>
          )}
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedOffer}
                onChange={e => setAgreedOffer(e.target.checked)}
                className="accent-primary mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-text-muted leading-relaxed">
                Принимаю условия{' '}
                <Link to="/legal/sale-offer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  публичной оферты купли-продажи
                </Link>{' '}
                {SELLER.name}
              </span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedPd}
                onChange={e => setAgreedPd(e.target.checked)}
                className="accent-primary mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-text-muted leading-relaxed">
                Даю согласие на обработку персональных данных на условиях{' '}
                <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Политики конфиденциальности
                </Link>
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={!DEMO_MODE || paying || !agreedOffer || !agreedPd}
          className="w-full bg-success hover:bg-success-dark text-white py-4 rounded-xl font-bold text-lg transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paying ? 'Обработка…' : `Оплатить ${formatPrice(order.price)}`}
        </button>
        {!DEMO_MODE && (
          <p className="text-sm text-text-secondary text-center mt-3">
            Оплата через СБП станет доступна после подключения банка.
          </p>
        )}

        {DEMO_MODE && (
          <div className="flex items-center justify-center gap-1.5 mt-4 text-text-muted text-xs">
            <Shield size={14} />
            Оплата через СБП в приложении вашего банка
          </div>
        )}
      </div>
    </div>
  )
}
