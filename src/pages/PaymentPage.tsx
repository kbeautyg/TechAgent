import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shield, Check, Phone } from 'lucide-react'
import { mockOrders, mockUsers, saveOrders } from '../data/mock'
import { formatPrice, formatDateTime } from '../utils/calculate'

export default function PaymentPage() {
  const { paymentId } = useParams()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

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

        <button
          onClick={handlePay}
          disabled={paying}
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
