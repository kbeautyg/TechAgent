import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink, PackageCheck } from 'lucide-react'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders, saveOrders } from '../../data/mock'
import { formatPrice, formatDateTime, formatReward } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STEPS, PAYMENT_STATUS_LABELS } from '../../utils/status'
import type { Order } from '../../types'

const normName = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim()

export default function OrderDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [, setRefresh] = useState(0)
  const [recipientName, setRecipientName] = useState('')
  const [actFile, setActFile] = useState<File | null>(null)

  const order = mockOrders.find((o) => o.id === id && o.userId === user?.id)

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
  const isPaid = order.paymentStatus === 'PAID'
  const paymentUrl = `${window.location.origin}/pay/${order.paymentId}`
  const nameMatches = recipientName.trim() !== '' && normName(recipientName) === normName(order.buyerName)
  const canIssue = order.status === 'AT_POINT' && isPaid && nameMatches && actFile !== null

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleIssue = () => {
    if (!canIssue) return
    const target = mockOrders.find((o) => o.id === order.id)
    if (!target) return
    const now = new Date().toISOString()
    Object.assign(target, {
      status: 'ISSUED',
      issuedAt: now,
      // ФИО совпадает с заказом (проверено выше) — сохраняем в написании из заказа
      issuedToName: target.buyerName,
      // Файл пока никуда не загружается (бэкенда нет), фиксируем факт прикреплённого акта
      issueActUploaded: true,
      updatedAt: now,
    } satisfies Partial<Order>)
    saveOrders()
    setRefresh((k) => k + 1)
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

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-2xl font-bold text-text-primary">Заказ {order.orderNumber}</h1>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Выдача товара */}
          {order.status === 'AT_POINT' && (
            <div className="card p-5 border-2 border-primary/30">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageCheck size={18} className="text-primary" />
                Выдача товара
              </h2>
              {!isPaid ? (
                <p className="text-sm text-text-secondary">
                  Заказ не оплачен — выдавать товар нельзя. Статус оплаты меняется, когда покупатель оплатит заказ по ссылке.
                </p>
              ) : (
                <div className="space-y-4 text-sm">
                  <ol className="list-decimal pl-5 space-y-1 text-text-secondary">
                    <li>Сверьте ФИО покупателя с заказом: <span className="font-semibold text-text-primary">{order.buyerName}</span>.</li>
                    <li>Покупатель проверяет товар и подписывает акт приёма-передачи.</li>
                    <li>Прикрепите фото или скан подписанного акта и подтвердите выдачу.</li>
                  </ol>
                  <div>
                    <label htmlFor="recipient" className="block font-medium mb-1.5 text-text-secondary">ФИО получателя</label>
                    <input
                      id="recipient"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Как в документе получателя"
                      autoComplete="off"
                    />
                    {recipientName.trim() !== '' && !nameMatches && (
                      <p className="text-red-500 text-xs mt-1">ФИО не совпадает с заказом. Выдавать товар можно только покупателю из заказа.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="act" className="block font-medium mb-1.5 text-text-secondary">Подписанный акт приёма-передачи</label>
                    <input
                      id="act"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setActFile(e.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-text-secondary file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium file:cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={handleIssue}
                    disabled={!canIssue}
                    className="inline-flex items-center gap-1.5 bg-success hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check size={16} /> Подтвердить выдачу
                  </button>
                  <p className="text-xs text-text-muted">Вознаграждение начисляется после выдачи товара и загрузки подписанного акта.</p>
                </div>
              )}
            </div>
          )}

          {order.status === 'ISSUED' && (
            <div className="card p-5">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageCheck size={18} className="text-success" />
                Товар выдан
              </h2>
              <div className="space-y-2 text-sm">
                {order.issuedAt && (
                  <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Дата выдачи</span>
                    <span className="text-text-primary">{formatDateTime(order.issuedAt)}</span>
                  </div>
                )}
                {order.issuedToName && (
                  <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Получатель</span>
                    <span className="text-text-primary text-right">{order.issuedToName}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-text-secondary">Акт приёма-передачи</span>
                  <span className={order.issueActUploaded ? 'text-success' : 'text-red-500'}>
                    {order.issueActUploaded ? 'загружен' : 'не загружен'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Товар */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Товар</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Название</span>
                <span className="font-medium text-text-primary text-right">{order.productName}</span>
              </div>
              <div className="flex justify-between gap-4 font-bold">
                <span className="text-text-primary">Цена для покупателя</span>
                <span className="text-primary whitespace-nowrap">{formatPrice(order.price)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between gap-4">
                <span className="text-text-secondary">Ваше вознаграждение</span>
                <span className="text-text-primary whitespace-nowrap">{formatReward(order.partnerReward)}</span>
              </div>
              {order.status !== 'AT_POINT' && order.status !== 'ISSUED' && order.status !== 'CANCELLED' && (
                <p className="text-xs text-text-muted">Начисляется после выдачи товара и загрузки подписанного акта.</p>
              )}
            </div>
          </div>

          {/* Покупатель */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Покупатель</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">ФИО</span>
                <span className="text-text-primary text-right">{order.buyerName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Телефон</span>
                <span className="text-text-primary">{order.buyerPhone}</span>
              </div>
              {order.buyerEmail && (
                <div className="flex justify-between gap-4">
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary">{order.buyerEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Этапы */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Этапы</h2>
            {order.status === 'CANCELLED' ? (
              <p className="text-sm text-text-secondary">Заказ отменён.</p>
            ) : (
              <div className="space-y-3">
                {ORDER_STEPS.map((step, i) => {
                  const isDone = i <= currentStepIndex
                  const isCurrent = i === currentStepIndex
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                          isDone ? 'bg-success text-white' : 'bg-bg-light text-text-muted'
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
            )}
          </div>
        </div>

        {/* Боковая колонка */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Оплата</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Статус</span>
                <span className="font-medium text-text-primary">{PAYMENT_STATUS_LABELS[order.paymentStatus]}</span>
              </div>
              {order.paidAt && (
                <div className="flex justify-between gap-4">
                  <span className="text-text-secondary">Дата</span>
                  <span className="text-text-primary">{formatDateTime(order.paidAt)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Сумма</span>
                <span className="font-bold text-text-primary">{formatPrice(order.price)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Получатель оплаты</span>
                <span className="text-text-primary">ТехЭйджент</span>
              </div>
            </div>
          </div>

          {!isPaid && order.status !== 'CANCELLED' && (
            <div className="card p-5">
              <h2 className="font-bold mb-4 text-text-primary">Ссылка на оплату</h2>
              <div className="flex justify-center mb-3">
                <QRCodeSVG value={paymentUrl} size={140} />
              </div>
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
                  className="flex items-center justify-center gap-1.5 bg-bg-light text-text-primary py-2 px-3 rounded-lg text-sm font-medium transition-colors no-underline"
                  aria-label="Открыть страницу оплаты"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>
              <p className="text-xs text-text-muted mt-3">
                Оплату принимает только ТехЭйджент по этой ссылке через СБП. Принимать деньги от покупателя наличными или на свои реквизиты нельзя.
              </p>
            </div>
          )}

          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Даты</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Создан</span>
                <span className="text-text-primary">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Обновлён</span>
                <span className="text-text-primary">{formatDateTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
