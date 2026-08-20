import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Shield, Check, Phone, ChevronDown } from 'lucide-react'
import { mockOrders, mockUsers, saveOrders } from '../data/mock'
import { formatPrice, formatDateTime } from '../utils/calculate'

const PAYMENT_NOTICE = `УВЕДОМЛЕНИЕ ОБ УСЛОВИЯХ ПРИЁМА ОПЛАТЫ
через платформу techagent.pro

Оплачивая заказ через данную страницу, вы подтверждаете, что ознакомлены и согласны со следующим:

1. Продавцом товара, который вы приобретаете, является партнёр платформы TechAgent (далее — «Партнёр»), у которого вы делаете покупку. Именно Партнёр является стороной сделки купли-продажи товара с вами.

2. TechAgent выступает техническим агентом Партнёра: принимает оплату по поручению Партнёра и организует закупку товара за рубежом в интересах Партнёра.

3. TechAgent не является продавцом товара, не устанавливает его цену и не несёт ответственности за качество, комплектность, соответствие заявленным характеристикам, сроки и условия доставки товара.

4. По всем вопросам, связанным с товаром — гарантией, обменом, возвратом, качеством, комплектацией, кассовым чеком, — вы обращаетесь непосредственно к Партнёру, у которого приобрели товар.

5. Оплата, произведённая вами через данную страницу, засчитывается в счёт расчётов по вашей сделке с Партнёром.

6. Обработка ваших персональных данных, указанных при оплате, осуществляется в соответствии с Политикой обработки персональных данных, размещённой на сайте techagent.pro.

Продолжая оплату, вы подтверждаете согласие с условиями настоящего уведомления.`

export default function PaymentPage() {
  const { paymentId } = useParams()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)

  const order = mockOrders.find((o) => o.paymentId === paymentId)

  if (!order) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="card-glass p-8 text-center max-w-md w-full mx-4">
          <p className="text-text-muted">Заказ не найден или ссылка устарела</p>
        </div>
      </div>
    )
  }

  const seller = mockUsers.find((u) => u.id === order.userId)
  const amountToPay = order.isTradeIn ? (order.clientPayment || 0) : order.totalCost
  const alreadyPaid = order.paymentStatus === 'PAID'

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      order.paymentStatus = 'PAID'
      order.paidAt = new Date().toISOString()
      order.status = 'PAID'
      saveOrders()
      setPaying(false)
      setPaid(true)
    }, 2000)
  }

  if (alreadyPaid || paid) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white py-12 px-4">
        <div className="card-glass p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Оплата успешна!</h1>
          <p className="text-text-muted mb-6">Спасибо за оплату</p>

          <div className="bg-bg-light border border-border rounded-lg p-4 space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-text-muted">Сумма</span>
              <span className="font-bold text-text-primary">{formatPrice(amountToPay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Дата</span>
              <span className="text-text-secondary">{formatDateTime(order.paidAt || new Date().toISOString())}</span>
            </div>
          </div>

          <div className="bg-bg-light border border-border rounded-lg p-4 text-sm text-left">
            <p className="text-text-muted mb-1">Ваш товар будет готов к выдаче через 5-7 дней.</p>
            <p className="text-text-muted mb-2">Забрать можно в магазине:</p>
            <p className="font-medium text-text-primary">{seller?.companyName}</p>
            {seller?.phone && (
              <p className="flex items-center gap-1 text-text-muted mt-1">
                <Phone size={14} />
                {seller.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-12 px-4">
      <div className="card-glass p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Оплата заказа</h1>
          <p className="text-text-muted text-sm">{order.orderNumber}</p>
        </div>

        <div className="bg-bg-light border border-border rounded-lg p-5 mb-6">
          <p className="font-bold text-text-primary mb-3">{order.productName}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Товар</span>
              <span className="text-text-primary">{formatPrice(order.productCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Услуга выкупа</span>
              <span className="text-text-primary">{formatPrice(order.commission)}</span>
            </div>
            {order.isTradeIn && (
              <div className="flex justify-between">
                <span className="text-text-muted">Trade-in ({order.oldProduct})</span>
                <span className="text-emerald-400">-{formatPrice(order.oldValue || 0)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
              <span className="text-text-primary">К оплате</span>
              <span className="text-primary">{formatPrice(amountToPay)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-text-muted mb-2">Магазин:</p>
          <p className="font-medium text-sm text-text-primary">{seller?.companyName}</p>
          {seller?.phone && (
            <p className="text-text-muted text-sm flex items-center gap-1 mt-0.5">
              <Phone size={14} />
              {seller.phone}
            </p>
          )}
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <p className="text-sm font-medium text-text-primary mb-3">Способ оплаты:</p>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/10 cursor-pointer">
            <input type="radio" checked readOnly className="accent-primary" />
            <span className="font-medium text-sm text-text-primary">СБП (Система быстрых платежей)</span>
          </label>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setNoticeOpen(v => !v)}
            className="w-full flex items-center justify-between gap-2 text-left bg-transparent border-none cursor-pointer p-0 mb-2"
          >
            <span className="text-xs font-medium text-text-muted">Уведомление об условиях приёма оплаты</span>
            <ChevronDown size={14} className={`text-text-muted transition-transform flex-shrink-0 ${noticeOpen ? 'rotate-180' : ''}`} />
          </button>
          {noticeOpen && (
            <div className="bg-bg-light border border-border rounded-lg p-3 mb-3 max-h-48 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-xs text-text-secondary leading-relaxed break-words overflow-wrap-anywhere">
                {PAYMENT_NOTICE}
              </pre>
            </div>
          )}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="accent-primary mt-0.5 flex-shrink-0"
            />
            <span className="text-xs text-text-muted leading-relaxed">
              Я ознакомлен(а) и согласен(на) с{' '}
              <Link to="/legal/payment" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Условиями оплаты и возврата
              </Link>{' '}
              и{' '}
              <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Политикой конфиденциальности
              </Link>. Продавцом товара является Партнёр, указанный выше; TechAgent принимает оплату как технический агент по его поручению.
            </span>
          </label>
        </div>

        <button
          onClick={handlePay}
          disabled={paying || !agreed}
          className="w-full bg-success hover:bg-success-dark text-white py-4 rounded-xl font-bold text-lg transition-colors border-none cursor-pointer disabled:opacity-50"
        >
          {paying ? 'Обработка...' : `Оплатить ${formatPrice(amountToPay)}`}
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-4 text-text-muted text-xs">
          <Shield size={14} />
          Безопасная оплата
        </div>
      </div>
    </div>
  )
}
