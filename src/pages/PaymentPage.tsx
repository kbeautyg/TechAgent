import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Shield, Phone, ChevronDown, MapPin, CircleCheck } from 'lucide-react'
import { mockOrders, mockUsers, updateOrder, DEMO_MODE } from '../data/mock'
import { mockDocuments } from '../data/documents'
import { formatPrice, formatDateTime, formatDate } from '../utils/calculate'
import { useDataRevision } from '../utils/store'
import { LEGAL_NAME, DELIVERY_TERM, SUPPORT_EMAIL } from '../seo/site'

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

export default function PaymentPage() {
  const { paymentId } = useParams()
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
            Деньги поступают напрямую {SELLER.name}. Не передавайте деньги за товар в пункте выдачи.
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
