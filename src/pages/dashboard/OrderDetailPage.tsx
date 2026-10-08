import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink, PackageCheck, PackageOpen, Printer, MessageSquareWarning, Ban } from 'lucide-react'
import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders, updateOrder } from '../../data/mock'
import { reportedIn, documentPeriod } from '../../data/partnerDocuments'
import {
  formatPrice,
  formatDate,
  formatDateTime,
  formatPercent,
  formatReward,
  storageUntil,
  storageExpired,
  periodOf,
  periodLabel,
  cancelledAtPoint,
} from '../../utils/calculate'
import {
  ORDER_STATUS_LABELS,
  ORDER_STEPS,
  BUYER_CLAIM_LABELS,
  orderStatusLabel,
  orderStatusColor,
  paymentStatusLabel,
  photoNote,
} from '../../utils/status'
import { useDataRevision } from '../../utils/store'
import { copyText, selectText } from '../../utils/clipboard'
import type { Order, BuyerClaimType } from '../../types'

const REWARD_RULE = 'Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.'
const PARTNERS_EMAIL = 'partners@techagent.pro'

const fieldCls =
  'w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm'
const fileCls =
  'block w-full text-sm text-text-secondary file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium file:cursor-pointer'
const primaryBtn =
  'inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
const successBtn =
  'inline-flex items-center gap-1.5 bg-success hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
const linkBtn = 'text-sm text-primary font-medium bg-transparent border-none cursor-pointer p-0 hover:underline'
const printLink =
  'inline-flex items-center gap-1.5 bg-bg-light text-text-primary border border-border px-4 py-2.5 rounded-lg text-sm font-semibold no-underline hover:bg-primary/10 transition-colors'

/** Статус успели изменить в другой вкладке — действие не применено, страница уже показывает новые данные */
const STALE = 'Заказ уже изменён в другой вкладке — данные на странице обновлены.'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary text-right">{children}</span>
    </div>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  useDataRevision()
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const linkRef = useRef<HTMLDivElement>(null)

  // Приёмка
  const [packOk, setPackOk] = useState(false)
  const [issueMode, setIssueMode] = useState(false)
  const [issueText, setIssueText] = useState('')
  const [issuePhotos, setIssuePhotos] = useState(0)

  // Выдача: распечатать акт → подписать → сфотографировать → подтвердить
  const [actFile, setActFile] = useState<File | null>(null)

  // Обращение покупателя
  const [claimOpen, setClaimOpen] = useState(false)
  const [claimType, setClaimType] = useState<BuyerClaimType>('EXCHANGE')
  const [claimText, setClaimText] = useState('')
  const [claimPhoto, setClaimPhoto] = useState<File | null>(null)

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
  const canIssue = order.status === 'AT_POINT' && isPaid && actFile !== null
  const until = storageUntil(order)
  const expired = order.status === 'AT_POINT' && storageExpired(order)
  const returned = Boolean(order.returnedAt)

  /** Изменение применяется, только если заказ всё ещё в ожидаемом статусе */
  const patch = (data: Parameters<typeof updateOrder>[1], guard: (fresh: Order) => boolean): boolean => {
    const ok = updateOrder(order.id, data, guard) !== null
    if (!ok) alert(STALE)
    return ok
  }

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

  const inTransit = (o: Order) => o.status === 'IN_TRANSIT'

  /* Приёмка в пункте выдачи (оферта, п. 5.1, 8.2) */
  const acceptGoods = () => {
    if (order.status !== 'IN_TRANSIT' || !packOk) return
    patch({ status: 'AT_POINT', receivedAt: new Date().toISOString() }, inTransit)
  }

  const acceptWithIssue = () => {
    if (order.status !== 'IN_TRANSIT' || !issueText.trim() || issuePhotos === 0) return
    // Фото пока никуда не загружаются (бэкенда нет) — фиксируем описание и сколько фото приложено
    patch(
      {
        status: 'AT_POINT',
        receivedAt: new Date().toISOString(),
        receivedIssue: issueText.trim(),
        receivedIssuePhoto: true,
        receivedIssuePhotos: issuePhotos,
      },
      inTransit,
    )
  }

  /* Уведомление покупателя: с этой даты товар хранится 5 дней (оферта, п. 8.3) */
  const markNotified = () => {
    if (order.status !== 'AT_POINT' || order.notifiedAt) return
    patch({ notifiedAt: new Date().toISOString() }, (o) => o.status === 'AT_POINT' && !o.notifiedAt)
  }

  const handleIssue = () => {
    if (!canIssue) return
    patch(
      {
        status: 'ISSUED',
        issuedAt: new Date().toISOString(),
        // Выдача только покупателю из заказа: партнёр сверил данные и подтвердил это кнопкой
        issuedToName: order.buyerName,
        // Файл пока никуда не загружается (бэкенда нет), фиксируем факт прикреплённого акта
        issueActUploaded: true,
      },
      (o) => o.status === 'AT_POINT' && o.paymentStatus === 'PAID',
    )
  }

  /* Обращение покупателя об обмене или возврате (оферта, п. 5.1, 8.4) */
  const sendClaim = () => {
    if (order.status !== 'ISSUED' || returned || !claimText.trim()) return
    const claim = {
      id: crypto.randomUUID(),
      type: claimType,
      text: claimText.trim(),
      photoAttached: claimPhoto !== null,
      createdAt: new Date().toISOString(),
    }
    const ok = patch(
      (fresh) => ({ buyerClaims: [...(fresh.buyerClaims ?? []), claim] }),
      (o) => o.status === 'ISSUED' && !o.returnedAt,
    )
    if (!ok) return
    setClaimOpen(false)
    setClaimText('')
    setClaimPhoto(null)
    setClaimType('EXCHANGE')
  }

  /* Вознаграждение по заказу — правило показывается один раз, здесь */
  const reported = order.status === 'ISSUED' ? reportedIn(order) : undefined
  const reportedPeriod = reported ? documentPeriod(reported) : null
  let rewardNote: string | null = REWARD_RULE
  if (order.status === 'CANCELLED') rewardNote = null
  else if (returned) {
    rewardNote = reportedPeriod
      ? 'Товар возвращён покупателем — вознаграждение аннулировано и будет удержано из следующей выплаты (п. 7.3 агентского договора-оферты).'
      : 'Товар возвращён покупателем — вознаграждение аннулировано (п. 7.3 агентского договора-оферты).'
  } else if (order.status === 'ISSUED' && order.issueActUploaded && order.issuedAt) {
    rewardNote = reportedPeriod
      ? `Начислено, вошло в отчёт агента за ${periodLabel(reportedPeriod)}.`
      : `Начислено, войдёт в отчёт агента за ${periodLabel(periodOf(order.issuedAt))}.`
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
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusColor(order)}`}>
          {orderStatusLabel(order)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {/* Отменён, когда товар уже был в пункте выдачи */}
          {cancelledAtPoint(order) && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              <Ban size={18} className="shrink-0 mt-0.5" />
              <p className="text-sm">
                {order.refundedAt ? 'Заказ отменён, деньги покупателю возвращены. ' : 'Заказ отменён. '}
                Товар храните до указания ТехЭйджент (п. 8.3 агентского договора-оферты).
              </p>
            </div>
          )}

          {/* Приёмка товара в пункте выдачи */}
          {order.status === 'IN_TRANSIT' && (
            <div className="card p-5 border-2 border-primary/30">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageOpen size={18} className="text-primary" />
                Приёмка товара
              </h2>
              {!issueMode ? (
                <div className="space-y-4 text-sm">
                  <p className="text-text-secondary">Когда товар прибудет, проверьте целостность упаковки и количество мест.</p>
                  <label className="flex items-start gap-2.5 cursor-pointer text-text-primary">
                    <input
                      type="checkbox"
                      checked={packOk}
                      onChange={(e) => setPackOk(e.target.checked)}
                      className="accent-primary mt-0.5 shrink-0"
                    />
                    Упаковка цела, количество мест совпадает
                  </label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button onClick={acceptGoods} disabled={!packOk} className={primaryBtn}>
                      <Check size={16} /> Принять товар
                    </button>
                    <button type="button" onClick={() => setIssueMode(true)} className={linkBtn}>
                      Есть повреждения или расхождение
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm">
                  <p className="text-text-secondary">
                    Опишите повреждение упаковки или расхождение в количестве мест и приложите фото.
                  </p>
                  <div>
                    <label htmlFor="issue-text" className="block font-medium mb-1.5 text-text-secondary">Что обнаружено</label>
                    <textarea
                      id="issue-text"
                      rows={3}
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      className={fieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="issue-photo" className="block font-medium mb-1.5 text-text-secondary">Фото</label>
                    <input
                      id="issue-photo"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setIssuePhotos(e.target.files?.length ?? 0)}
                      className={fileCls}
                    />
                    {issuePhotos > 1 && <p className="text-xs text-text-muted mt-1">Выбрано фото: {issuePhotos}</p>}
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button onClick={acceptWithIssue} disabled={!issueText.trim() || issuePhotos === 0} className={primaryBtn}>
                      <Check size={16} /> Принять с замечанием
                    </button>
                    <button type="button" onClick={() => setIssueMode(false)} className={linkBtn}>
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Товар в пункте выдачи: приёмка, уведомление покупателя, срок хранения */}
          {order.status === 'AT_POINT' && (
            <div className="card p-5">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageOpen size={18} className="text-primary" />
                Товар в пункте выдачи
              </h2>
              <div className="space-y-3 text-sm">
                {order.receivedAt && <Row label="Принят">{formatDateTime(order.receivedAt)}</Row>}
                {order.receivedIssue && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-amber-900 break-words">
                    При приёмке отмечено: {order.receivedIssue}
                    {photoNote(order)}
                  </div>
                )}
                {!order.notifiedAt ? (
                  <div className="space-y-3">
                    <p className="text-text-secondary">
                      Сообщите покупателю о поступлении товара и адресе пункта выдачи:{' '}
                      <span className="text-text-primary font-medium">{order.buyerName}</span>,{' '}
                      <span className="text-text-primary whitespace-nowrap">{order.buyerPhone}</span>.
                    </p>
                    <button onClick={markNotified} className={primaryBtn}>
                      <Check size={16} /> Покупатель уведомлён о поступлении
                    </button>
                  </div>
                ) : (
                  <>
                    <Row label="Покупатель уведомлён">{formatDateTime(order.notifiedAt)}</Row>
                    {expired ? (
                      <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-red-800">
                        Срок хранения истёк — сообщите ТехЭйджент:{' '}
                        <a href={`mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(`Заказ ${order.orderNumber}: срок хранения истёк`)}`} className="text-red-800 underline">
                          {PARTNERS_EMAIL}
                        </a>
                      </p>
                    ) : (
                      until && <Row label="Хранится до">{formatDate(until.toISOString())}</Row>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Выдача товара */}
          {order.status === 'AT_POINT' && (
            <div className="card p-5 border-2 border-primary/30">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageCheck size={18} className="text-primary" />
                Выдача товара
              </h2>
              <p className={`text-sm mb-4 ${isPaid ? 'text-text-primary' : 'text-red-600 font-medium'}`}>
                {isPaid
                  ? <>Оплата: получена {order.paidAt ? formatDateTime(order.paidAt) : ''}</>
                  : 'Оплата: не получена — выдавать нельзя'}
              </p>
              {isPaid && (
                <div className="space-y-4 text-sm">
                  <p className="text-text-secondary">
                    Покупатель называет номер заказа, вы сверяете ФИО:{' '}
                    <span className="font-semibold text-text-primary">{order.buyerName}</span>. Документ, удостоверяющий
                    личность, — по вашей просьбе.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-2">1</span>
                      <Link to={`/dashboard/orders/${order.id}/act?print=1`} target="_blank" rel="noopener" className={printLink}>
                        <Printer size={16} /> Распечатать акт (2 экз.)
                      </Link>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</span>
                      <p className="text-text-secondary m-0">
                        Покупатель проверяет товар и подписывает оба экземпляра, вы подписываете от имени ТехЭйджент. Один
                        экземпляр — покупателю.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</span>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="act" className="block font-medium mb-1.5 text-text-secondary">Фото или скан подписанного акта</label>
                        {/* Без capture: на телефоне браузер сам предложит камеру, галерею или файл */}
                        <input
                          id="act"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => setActFile(e.target.files?.[0] ?? null)}
                          className={fileCls}
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-2">4</span>
                      <button onClick={handleIssue} disabled={!canIssue} className={successBtn}>
                        <Check size={16} /> Данные сверены — подтвердить выдачу
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {order.status === 'ISSUED' && (
            <div className="card p-5">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                <PackageCheck size={18} className={returned ? 'text-text-muted' : 'text-success'} />
                Товар выдан
              </h2>
              <div className="space-y-2 text-sm">
                {order.issuedAt && <Row label="Дата выдачи">{formatDateTime(order.issuedAt)}</Row>}
                {order.issuedToName && <Row label="Получатель">{order.issuedToName}</Row>}
                <div className="flex justify-between gap-4">
                  <span className="text-text-secondary">Акт приёма-передачи</span>
                  <span className={order.issueActUploaded ? 'text-success' : 'text-red-500'}>
                    {order.issueActUploaded ? 'загружен' : 'не загружен'}
                  </span>
                </div>
              </div>
              {isPaid && (
                <Link to={`/dashboard/orders/${order.id}/act?print=1`} target="_blank" rel="noopener" className={`${printLink} mt-4`}>
                  <Printer size={16} /> Распечатать акт ещё раз
                </Link>
              )}
            </div>
          )}

          {/* Обращения покупателя об обмене и возврате. После возврата новых обращений нет */}
          {order.status === 'ISSUED' && (!returned || (order.buyerClaims ?? []).length > 0) && (
            <div className="card p-5">
              {(order.buyerClaims ?? []).length > 0 && (
                <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
                  <MessageSquareWarning size={18} className="text-primary" />
                  Обращения покупателя
                </h2>
              )}
              <div className="space-y-3 text-sm">
                {(order.buyerClaims ?? []).map((c) => (
                  <div key={c.id} className="card-soft rounded-lg p-3">
                    <p className="text-text-primary font-medium">
                      {BUYER_CLAIM_LABELS[c.type]} · передано {formatDateTime(c.createdAt)}
                    </p>
                    <p className="text-text-secondary mt-1 whitespace-pre-wrap break-words">{c.text}</p>
                    {c.photoAttached && <p className="text-xs text-text-muted mt-1">Фото приложено</p>}
                  </div>
                ))}
                {!returned && (
                  <>
                    {!claimOpen ? (
                      <button onClick={() => setClaimOpen(true)} className={primaryBtn}>
                        <MessageSquareWarning size={16} /> Обращение покупателя
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="claim-type" className="block font-medium mb-1.5 text-text-secondary">Тип обращения</label>
                          <select
                            id="claim-type"
                            value={claimType}
                            onChange={(e) => setClaimType(e.target.value as BuyerClaimType)}
                            className={fieldCls}
                          >
                            {(Object.keys(BUYER_CLAIM_LABELS) as BuyerClaimType[]).map((t) => (
                              <option key={t} value={t}>{BUYER_CLAIM_LABELS[t]}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="claim-text" className="block font-medium mb-1.5 text-text-secondary">Описание</label>
                          <textarea
                            id="claim-text"
                            rows={3}
                            value={claimText}
                            onChange={(e) => setClaimText(e.target.value)}
                            className={fieldCls}
                          />
                        </div>
                        <div>
                          <label htmlFor="claim-photo" className="block font-medium mb-1.5 text-text-secondary">Фото</label>
                          <input
                            id="claim-photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setClaimPhoto(e.target.files?.[0] ?? null)}
                            className={fileCls}
                          />
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <button onClick={sendClaim} disabled={!claimText.trim()} className={primaryBtn}>
                            Передать в ТехЭйджент
                          </button>
                          <button type="button" onClick={() => setClaimOpen(false)} className={linkBtn}>
                            Отмена
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-text-muted">Передайте обращение в течение 1 рабочего дня.</p>
                  </>
                )}
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
                <span className="text-text-secondary">
                  Вознаграждение{order.rewardPercent && order.status !== 'CANCELLED' ? ` (${formatPercent(order.rewardPercent)})` : ''}
                </span>
                <span className="text-text-primary whitespace-nowrap">
                  {order.status === 'CANCELLED' ? 'не начисляется' : returned ? 'аннулировано' : formatReward(order.partnerReward)}
                </span>
              </div>
              {rewardNote && <p className="text-xs text-text-muted">{rewardNote}</p>}
            </div>
          </div>

          {/* Покупатель */}
          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Покупатель</h2>
            <div className="space-y-2 text-sm">
              <Row label="ФИО">{order.buyerName}</Row>
              <Row label="Телефон">{order.buyerPhone}</Row>
              {order.buyerEmail && <Row label="Email">{order.buyerEmail}</Row>}
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
                  const isCurrent = i === currentStepIndex && !returned
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
                {order.returnedAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-orange-100 text-orange-700">
                      <ArrowLeft size={14} />
                    </div>
                    <span className="text-sm font-bold text-text-primary">
                      Возврат после выдачи · {formatDate(order.returnedAt)}
                    </span>
                  </div>
                )}
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
                <span className="font-medium text-text-primary text-right">{paymentStatusLabel(order)}</span>
              </div>
              {order.paidAt && <Row label="Дата">{formatDateTime(order.paidAt)}</Row>}
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Сумма</span>
                <span className="font-bold text-text-primary whitespace-nowrap">{formatPrice(order.price)}</span>
              </div>
              <Row label="Получатель оплаты">ТехЭйджент</Row>
              {order.refundedAt && <Row label="Возврат оплаты">оформлен {formatDate(order.refundedAt)}</Row>}
              {order.returnedAt && <Row label="Возврат товара">{formatDate(order.returnedAt)}</Row>}
            </div>
          </div>

          {!isPaid && order.status !== 'CANCELLED' && (
            <div className="card p-5">
              <h2 className="font-bold mb-4 text-text-primary">Ссылка на оплату</h2>
              <div className="flex justify-center mb-3">
                <QRCodeSVG value={paymentUrl} size={140} />
              </div>
              <div ref={linkRef} className="card-soft rounded-lg p-3 text-xs break-all text-text-secondary mb-3">
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
              {copyFailed && <p className="text-sm text-text-secondary mt-2" role="status">Скопируйте ссылку вручную</p>}
              <p className="text-xs text-text-muted mt-3">
                Оплату принимает только ТехЭйджент по этой ссылке через СБП. Принимать деньги от покупателя наличными или на свои реквизиты нельзя.
              </p>
            </div>
          )}

          <div className="card p-5">
            <h2 className="font-bold mb-4 text-text-primary">Даты</h2>
            <div className="space-y-2 text-sm">
              <Row label="Создан">{formatDateTime(order.createdAt)}</Row>
              <Row label="Обновлён">{formatDateTime(order.updatedAt)}</Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
