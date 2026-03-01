import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDateTime } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STEPS } from '../../utils/status'
import { PAYMENT_STATUS_LABELS } from '../../utils/status'

export default function OrderDetailPage() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted mb-4">Заказ не найден</p>
        <Link to="/dashboard/orders" className="text-primary font-medium no-underline">
          Вернуться к списку
        </Link>
      </div>
    )
  }

  const currentStepIndex = ORDER_STEPS.indexOf(order.status)
  const paymentUrl = `${window.location.origin}/pay/${order.paymentId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Link
        to="/dashboard/orders"
        className="inline-flex items-center gap-1 text-text-secondary hover:text-primary text-sm mb-4 no-underline"
      >
        <ArrowLeft size={16} />
        Назад к списку
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Заказ {order.orderNumber}</h1>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
          {ORDER_STATUS_LABELS[order.status]}
        </span>
        {order.isTradeIn && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium">
            Trade-in
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 flex items-center gap-2 text-text-primary">Товар</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Название</span>
                <span className="font-medium text-text-primary">{order.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Стоимость</span>
                <span className="text-text-primary">{formatPrice(order.productCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Комиссия (3%)</span>
                <span className="text-text-primary">{formatPrice(order.commission)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span className="text-text-primary">Итого</span>
                <span className="text-primary">{formatPrice(order.totalCost)}</span>
              </div>
            </div>

            {order.isTradeIn && (
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h3 className="font-bold text-sm mb-2 text-text-primary">Trade-in</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Старое устройство</span>
                    <span className="text-text-primary">{order.oldProduct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Оценка</span>
                    <span className="text-text-primary">{formatPrice(order.oldValue || 0)}</span>
                  </div>
                  <div className="border-t border-amber-500/20 pt-2 flex justify-between font-bold">
                    <span className="text-text-primary">Доплата клиента</span>
                    <span className="text-text-primary">{formatPrice(order.clientPayment || 0)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Партнёр доплачивает</span>
                    <span>{formatPrice(order.ipPayment || 0)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Client */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Клиент</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Имя</span>
                <span className="text-text-primary">{order.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Телефон</span>
                <span className="text-text-primary">{order.clientPhone}</span>
              </div>
              {order.clientEmail && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary">{order.clientEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Этапы</h2>
            <div className="space-y-3">
              {ORDER_STEPS.map((step, i) => {
                const isDone = i <= currentStepIndex
                const isCurrent = i === currentStepIndex
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        isDone
                          ? 'bg-success text-white'
                          : 'bg-bg-light text-text-muted'
                      }`}
                    >
                      {isDone ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-sm ${isCurrent ? 'font-bold text-text-primary' : isDone ? 'text-text-secondary' : 'text-text-muted'}`}>
                      {ORDER_STATUS_LABELS[step]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment info */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Оплата</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Статус</span>
                <span className="font-medium text-text-primary">{PAYMENT_STATUS_LABELS[order.paymentStatus]}</span>
              </div>
              {order.paidAt && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Дата</span>
                  <span className="text-text-primary">{formatDateTime(order.paidAt)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Сумма</span>
                <span className="font-bold text-text-primary">{formatPrice(order.isTradeIn ? (order.clientPayment || 0) : order.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Payment link */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Ссылка для оплаты</h2>
            <div className="card-soft rounded-lg p-3 text-xs break-all text-text-secondary mb-3">
              {paymentUrl}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/25 border-none cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Скопировано' : 'Копировать'}
              </button>
              <Link
                to={`/pay/${order.paymentId}`}
                target="_blank"
                className="flex items-center justify-center gap-1.5 bg-bg-light hover:bg-bg-light text-text-primary py-2 px-3 rounded-lg text-sm font-medium transition-colors no-underline"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Dates */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Даты</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Создан</span>
                <span className="text-text-primary">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Обновлен</span>
                <span className="text-text-primary">{formatDateTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
