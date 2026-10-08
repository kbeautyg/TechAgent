import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ExternalLink, PackageCheck, PackageOpen, Printer, MessageSquareWarning, Ban, MessageCircle, Phone, Camera, ChevronDown, CircleCheck } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
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
  storageNote,
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
import type { Order, OrderStatus, BuyerClaimType } from '../../types'
import { ActionPanel, PageBar, RoundLink, StickyBar } from '../../components/app/ui'
import { useIsDesktop } from '../../components/app/useIsDesktop'
import ProductIcon from '../../components/app/ProductIcon'

const REWARD_RULE = 'Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.'
const PARTNERS_EMAIL = 'partners@techagent.pro'

const fieldCls =
  'w-full px-4 py-3 rounded-xl border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm'
const linkBtn = 'text-[15px] lg:text-sm text-primary font-medium bg-transparent border-none cursor-pointer py-2 lg:p-0 hover:underline'
/* Кнопки действий: на телефоне во всю ширину и высотой 54px, на компьютере — обычные */
const btnDesktop = 'lg:w-auto lg:min-h-[44px] lg:text-sm lg:rounded-lg lg:px-5 lg:gap-1.5'
const actBtn = `app-btn app-btn-primary ${btnDesktop}`
const actBtnSuccess = `app-btn app-btn-success ${btnDesktop}`
const actBtnSoft = `app-btn app-btn-soft ${btnDesktop}`
const printLink =
  'inline-flex items-center gap-2 bg-primary/10 text-primary min-h-[44px] px-4 rounded-xl text-[15px] lg:text-sm font-semibold no-underline hover:bg-primary/15 transition-colors'

/** Что будет дальше — подпись под полоской этапов */
const NEXT_STEP: Partial<Record<OrderStatus, string>> = {
  CREATED: 'оплата покупателем',
  PAID: 'выкуп у поставщика',
  PURCHASED: 'доставка в пункт выдачи',
  IN_TRANSIT: 'приёмка в пункте',
  AT_POINT: 'выдача покупателю',
}

/** Статус успели изменить в другой вкладке — действие не применено, страница уже показывает новые данные */
const STALE = 'Заказ уже изменён в другой вкладке — данные на странице обновлены.'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 leading-snug">
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

  // Выезжающая панель на телефоне: приёмка или выдача
  const [sheet, setSheet] = useState<'accept' | 'issue' | null>(null)
  const closeSheet = useCallback(() => setSheet(null), [])
  const desktop = useIsDesktop()

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

  /* Подпись под статусом: срок хранения, ожидание оплаты, дата выдачи или возврата */
  const note = storageNote(order)
  // Подробности про истёкший срок — в блоке «Товар в пункте выдачи», здесь коротко
  let statusSub: string | null = note?.expired ? 'Срок хранения истёк' : note?.text ?? null
  if (!statusSub && order.status === 'CREATED') statusSub = paymentStatusLabel(order)
  if (!statusSub && returned && order.returnedAt) statusSub = `Товар возвращён ${formatDate(order.returnedAt)}`
  else if (!statusSub && order.status === 'ISSUED' && order.issuedAt) statusSub = `Выдан ${formatDateTime(order.issuedAt)}`
  const nextStep = !returned ? NEXT_STEP[order.status] : undefined
  const telHref = `tel:${order.buyerPhone.replace(/[^\d+]/g, '')}`

  /* Главная кнопка внизу экрана на телефоне */
  let sticky: React.ReactNode = null
  if (order.status === 'IN_TRANSIT') {
    sticky = (
      <button type="button" onClick={() => setSheet('accept')} className="app-btn app-btn-primary">
        <PackageOpen size={22} /> Принять товар
      </button>
    )
  } else if (order.status === 'AT_POINT') {
    sticky = isPaid ? (
      <button type="button" onClick={() => setSheet('issue')} className="app-btn app-btn-primary">
        <PackageCheck size={22} /> Выдать товар
      </button>
    ) : (
      <button type="button" disabled className="app-btn">Оплата не получена — выдавать нельзя</button>
    )
  } else if (!isPaid && order.status !== 'CANCELLED') {
    sticky = (
      <button type="button" onClick={handleCopy} className="app-btn app-btn-primary">
        {copied ? <Check size={22} /> : <Copy size={22} />}
        {copied ? 'Ссылка скопирована' : 'Скопировать ссылку на оплату'}
      </button>
    )
  }

  return (
    <div className="max-w-5xl">
      <PageBar
        back="/dashboard/orders"
        backLabel="Назад к списку"
        title={`Заказ ${order.orderNumber}`}
        right={
          <RoundLink to="/dashboard/chat" label="Связь с менеджером">
            <MessageCircle size={22} />
          </RoundLink>
        }
        extra={
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusColor(order)}`}>
            {orderStatusLabel(order)}
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
        <div className="lg:col-span-2 space-y-3 lg:space-y-6 min-w-0">
          {/* Товар и цена — первым, как сумма операции в банке */}
          <div className="app-group p-4 flex items-center gap-4">
            <span className="w-[68px] h-[68px] rounded-2xl bg-bg-light grid place-items-center text-text-secondary shrink-0">
              <ProductIcon productId={order.productId} size={32} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-base leading-snug text-text-primary break-words">{order.productName}</p>
              <p className="font-display text-[22px] font-bold leading-tight mt-1.5 text-text-primary whitespace-nowrap">
                {formatPrice(order.price)}
              </p>
              <p className="text-[13px] text-text-muted mt-0.5">Цена для покупателя</p>
            </div>
          </div>

          {/* Статус и полоска этапов */}
          <div className="app-group p-4">
            <div className="flex items-center gap-3">
              <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${orderStatusColor(order)}`}>
                {order.status === 'CANCELLED' ? <Ban size={21} /> : returned ? <ArrowLeft size={21} /> : order.status === 'ISSUED' ? <PackageCheck size={21} /> : <PackageOpen size={21} />}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-base leading-snug text-text-primary">{orderStatusLabel(order)}</p>
                {statusSub && (
                  <p className={`text-[13px] leading-snug mt-0.5 ${note?.expired ? 'text-red-600 font-medium' : 'text-text-muted'}`}>{statusSub}</p>
                )}
              </div>
            </div>
            {order.status !== 'CANCELLED' && !returned && (
              <>
                <div className="app-progress mt-4 mb-2" aria-hidden="true">
                  {ORDER_STEPS.map((step, i) => (
                    <i
                      key={step}
                      className={i < currentStepIndex || order.status === 'ISSUED' ? 'done' : i === currentStepIndex ? 'now' : ''}
                    />
                  ))}
                </div>
                <div className="flex justify-between gap-3 text-[12.5px] leading-snug text-text-muted">
                  <span className="whitespace-nowrap">Этап {currentStepIndex + 1} из {ORDER_STEPS.length}</span>
                  {nextStep && <span className="text-right">Дальше: {nextStep}</span>}
                </div>
              </>
            )}
          </div>

          {/* Отменён, когда товар уже был в пункте выдачи */}
          {cancelledAtPoint(order) && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              <Ban size={18} className="shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                {order.refundedAt ? 'Заказ отменён, деньги покупателю возвращены. ' : 'Заказ отменён. '}
                Товар храните до указания ТехЭйджент (п. 8.3 агентского договора-оферты).
              </p>
            </div>
          )}

          {/* Приёмка товара в пункте выдачи */}
          {order.status === 'IN_TRANSIT' && (
            <ActionPanel
              title="Приёмка товара"
              icon={<PackageOpen size={18} className="text-primary" />}
              open={sheet === 'accept'}
              onClose={closeSheet}
              highlight
            >
              {!issueMode ? (
                <div className="space-y-4 text-[15px] lg:text-sm">
                  <p className="text-text-secondary leading-relaxed">Когда товар прибудет, проверьте целостность упаковки и количество мест.</p>
                  <label className="flex items-start gap-3 cursor-pointer text-text-primary min-h-[44px] py-1">
                    <input
                      type="checkbox"
                      checked={packOk}
                      onChange={(e) => setPackOk(e.target.checked)}
                      className="accent-primary mt-0.5 shrink-0 w-5 h-5"
                    />
                    Упаковка цела, количество мест совпадает
                  </label>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
                    <button onClick={acceptGoods} disabled={!packOk} className={actBtn}>
                      <Check size={18} /> Принять товар
                    </button>
                    <button type="button" onClick={() => setIssueMode(true)} className={linkBtn}>
                      Есть повреждения или расхождение
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-[15px] lg:text-sm">
                  <p className="text-text-secondary leading-relaxed">
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
                    <span className="block font-medium mb-1.5 text-text-secondary">Фото</span>
                    <label htmlFor="issue-photo" className={`app-upload ${issuePhotos > 0 ? 'is-set' : ''}`}>
                      {issuePhotos > 0 ? <Check size={22} /> : <Camera size={22} />}
                      {issuePhotos > 0 ? `Выбрано фото: ${issuePhotos} · заменить` : 'Сфотографировать или выбрать фото'}
                    </label>
                    <input
                      id="issue-photo"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setIssuePhotos(e.target.files?.length ?? 0)}
                      className="sr-only"
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
                    <button onClick={acceptWithIssue} disabled={!issueText.trim() || issuePhotos === 0} className={actBtn}>
                      <Check size={18} /> Принять с замечанием
                    </button>
                    <button type="button" onClick={() => setIssueMode(false)} className={linkBtn}>
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </ActionPanel>
          )}

          {/* Товар в пункте выдачи: приёмка, уведомление покупателя, срок хранения */}
          {order.status === 'AT_POINT' && (
            <div className="app-group p-4 lg:p-5">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary text-base">
                <PackageOpen size={18} className="text-primary" />
                Товар в пункте выдачи
              </h2>
              <div className="space-y-3 text-[15px] lg:text-sm">
                {order.receivedAt && <Row label="Принят">{formatDateTime(order.receivedAt)}</Row>}
                {order.receivedIssue && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-amber-900 break-words leading-relaxed">
                    При приёмке отмечено: {order.receivedIssue}
                    {photoNote(order)}
                  </div>
                )}
                {!order.notifiedAt ? (
                  <div className="space-y-3">
                    <p className="text-text-secondary leading-relaxed">
                      Сообщите покупателю о поступлении товара и адресе пункта выдачи:{' '}
                      <span className="text-text-primary font-medium">{order.buyerName}</span>,{' '}
                      <a href={telHref} className="text-primary font-medium whitespace-nowrap no-underline">{order.buyerPhone}</a>.
                    </p>
                    <button onClick={markNotified} className={actBtnSoft}>
                      <Check size={18} /> Покупатель уведомлён о поступлении
                    </button>
                  </div>
                ) : (
                  <>
                    <Row label="Покупатель уведомлён">{formatDateTime(order.notifiedAt)}</Row>
                    {expired ? (
                      <p className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-red-800 leading-relaxed">
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

          {/* Выдача товара: на телефоне — панель снизу по кнопке «Выдать товар» */}
          {order.status === 'AT_POINT' && (
            <ActionPanel
              title="Выдача товара"
              icon={<PackageCheck size={18} className="text-primary" />}
              open={sheet === 'issue'}
              onClose={closeSheet}
              highlight
            >
              <p className={`text-[15px] lg:text-sm mb-4 ${isPaid ? 'text-text-primary' : 'text-red-600 font-medium'}`}>
                {isPaid
                  ? <>Оплата: получена {order.paidAt ? formatDateTime(order.paidAt) : ''}</>
                  : 'Оплата: не получена — выдавать нельзя'}
              </p>
              {isPaid && (
                <div className="space-y-4 text-[15px] lg:text-sm">
                  <p className="text-text-secondary leading-relaxed">
                    Покупатель называет номер заказа, вы сверяете ФИО:{' '}
                    <span className="font-semibold text-text-primary">{order.buyerName}</span>. Документ, удостоверяющий
                    личность, — по вашей просьбе.
                  </p>
                  <ol className="list-none p-0 m-0 divide-y divide-border">
                    <li className="flex items-start gap-3.5 py-3">
                      <span className="app-step-num">1</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary leading-snug">Распечатайте акт</p>
                        <p className="text-text-secondary">Два экземпляра</p>
                        <Link to={`/dashboard/orders/${order.id}/act?print=1`} target="_blank" rel="noopener" className={`${printLink} mt-2.5`}>
                          <Printer size={18} /> Печать акта
                        </Link>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5 py-3">
                      <span className="app-step-num">2</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary leading-snug">Подпишите вместе с покупателем</p>
                        <p className="text-text-secondary leading-relaxed">
                          Покупатель проверяет товар и подписывает оба экземпляра, вы подписываете от имени ТехЭйджент. Один
                          экземпляр — покупателю.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5 py-3">
                      <span className={`app-step-num ${actFile ? 'is-done' : ''}`}>{actFile ? <Check size={18} /> : 3}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary leading-snug mb-2.5">Сфотографируйте подписанный акт</p>
                        {/* Без capture: на телефоне браузер сам предложит камеру, галерею или файл */}
                        <label htmlFor="act" className={`app-upload ${actFile ? 'is-set' : ''}`}>
                          {actFile ? <Check size={22} className="shrink-0" /> : <Camera size={22} className="shrink-0" />}
                          <span className="min-w-0 break-words">{actFile ? `${actFile.name} · заменить` : 'Фото или скан акта'}</span>
                        </label>
                        <input
                          id="act"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => setActFile(e.target.files?.[0] ?? null)}
                          className="sr-only"
                        />
                      </div>
                    </li>
                  </ol>
                  <button onClick={handleIssue} disabled={!canIssue} className={`${actBtnSuccess} max-lg:!text-[15.5px] max-lg:!px-3`}>
                    <Check size={18} className="hidden lg:block" /> Данные сверены — подтвердить выдачу
                  </button>
                </div>
              )}
            </ActionPanel>
          )}

          {order.status === 'ISSUED' && (
            <div className="app-group p-4 lg:p-5">
              <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary text-base">
                <PackageCheck size={18} className={returned ? 'text-text-muted' : 'text-success'} />
                Товар выдан
              </h2>
              <div className="space-y-2 text-[15px] lg:text-sm">
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
                  <Printer size={18} /> Распечатать акт ещё раз
                </Link>
              )}
            </div>
          )}

          {/* Обращения покупателя об обмене и возврате. После возврата новых обращений нет */}
          {order.status === 'ISSUED' && (!returned || (order.buyerClaims ?? []).length > 0) && (
            <div className="app-group p-4 lg:p-5">
              {(order.buyerClaims ?? []).length > 0 && (
                <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary text-base">
                  <MessageSquareWarning size={18} className="text-primary" />
                  Обращения покупателя
                </h2>
              )}
              <div className="space-y-3 text-[15px] lg:text-sm">
                {(order.buyerClaims ?? []).map((c) => (
                  <div key={c.id} className="bg-bg-light rounded-xl p-3">
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
                      <button onClick={() => setClaimOpen(true)} className={actBtnSoft}>
                        <MessageSquareWarning size={18} /> Обращение покупателя
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
                          <span className="block font-medium mb-1.5 text-text-secondary">Фото</span>
                          <label htmlFor="claim-photo" className={`app-upload ${claimPhoto ? 'is-set' : ''}`}>
                            {claimPhoto ? <Check size={22} className="shrink-0" /> : <Camera size={22} className="shrink-0" />}
                            <span className="min-w-0 break-words">{claimPhoto ? `${claimPhoto.name} · заменить` : 'Сфотографировать или выбрать фото'}</span>
                          </label>
                          <input
                            id="claim-photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setClaimPhoto(e.target.files?.[0] ?? null)}
                            className="sr-only"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
                          <button onClick={sendClaim} disabled={!claimText.trim()} className={actBtn}>
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

          {/* Покупатель */}
          <section>
            <h2 className="app-group-title">Покупатель</h2>
            <div className="app-group">
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">ФИО</span>
                  <span className="app-kv-value">{order.buyerName}</span>
                </div>
              </div>
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">Телефон</span>
                  <span className="app-kv-value whitespace-nowrap">{order.buyerPhone}</span>
                </div>
                <a href={telHref} className="app-round !bg-primary/10 !text-primary" aria-label={`Позвонить покупателю ${order.buyerPhone}`}>
                  <Phone size={20} />
                </a>
              </div>
              {order.buyerEmail && (
                <div className="app-kv">
                  <div className="app-kv-text">
                    <span className="app-kv-label">Email</span>
                    <span className="app-kv-value">{order.buyerEmail}</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Вознаграждение по заказу */}
          <section>
            <h2 className="app-group-title">Вознаграждение</h2>
            <div className="app-group">
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">
                    Ваше вознаграждение{order.rewardPercent && order.status !== 'CANCELLED' ? ` · ${formatPercent(order.rewardPercent)}` : ''}
                  </span>
                  <span className="app-kv-value">
                    {order.status === 'CANCELLED' ? 'не начисляется' : returned ? 'аннулировано' : formatReward(order.partnerReward)}
                  </span>
                  {rewardNote && <span className="text-[13px] leading-snug text-text-muted mt-1">{rewardNote}</span>}
                </div>
              </div>
            </div>
          </section>

          {/* Этапы и даты: на телефоне свёрнуты, чтобы экран не превращался в простыню */}
          <details className="app-group group" open={desktop || undefined} key={desktop ? 'd' : 'm'}>
            <summary className="app-kv cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="app-kv-text">
                <span className="app-kv-value">Этапы и даты</span>
              </span>
              <ChevronDown size={20} className="text-text-muted transition-transform group-open:rotate-180 shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-1">
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
              <div className="space-y-2 text-sm border-t border-border mt-4 pt-3">
                <Row label="Создан">{formatDateTime(order.createdAt)}</Row>
                <Row label="Обновлён">{formatDateTime(order.updatedAt)}</Row>
              </div>
            </div>
          </details>
        </div>

        {/* Боковая колонка на компьютере; на телефоне — ниже */}
        <div className="space-y-3 lg:space-y-6 min-w-0">
          {!isPaid && order.status !== 'CANCELLED' && (
            <section className="app-group p-4 lg:p-5">
              <h2 className="font-bold mb-4 text-text-primary text-base">Ссылка на оплату</h2>
              <div className="flex justify-center mb-3">
                <QRCodeSVG value={paymentUrl} size={160} />
              </div>
              <div ref={linkRef} className="bg-bg-light rounded-xl p-3 text-[13px] break-all text-text-secondary mb-3">
                {paymentUrl}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-dark text-white min-h-[44px] rounded-xl text-sm font-semibold transition-colors border-none cursor-pointer"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
                <Link
                  to={`/pay/${order.paymentId}`}
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 bg-bg-light text-text-primary min-h-[44px] min-w-[44px] px-3 rounded-xl text-sm font-medium transition-colors no-underline"
                  aria-label="Открыть страницу оплаты"
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
              {copyFailed && <p className="text-sm text-text-secondary mt-2" role="status">Скопируйте ссылку вручную</p>}
              <p className="text-xs leading-relaxed text-text-muted mt-3">
                Оплату принимает только ТехЭйджент по этой ссылке через СБП. Принимать деньги от покупателя наличными или на свои реквизиты нельзя.
              </p>
            </section>
          )}

          <section>
            <h2 className="app-group-title">Оплата</h2>
            <div className="app-group">
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">Статус</span>
                  <span className={`app-kv-value ${isPaid && !order.refundedAt ? 'text-success-dark' : ''}`}>
                    {paymentStatusLabel(order)}{order.paidAt ? ` ${formatDateTime(order.paidAt)}` : ''}
                  </span>
                </div>
                {isPaid && !order.refundedAt && <CircleCheck size={22} className="text-success shrink-0" />}
              </div>
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">Сумма</span>
                  <span className="app-kv-value whitespace-nowrap">{formatPrice(order.price)}</span>
                </div>
              </div>
              <div className="app-kv">
                <div className="app-kv-text">
                  <span className="app-kv-label">Получатель оплаты</span>
                  <span className="app-kv-value">ТехЭйджент</span>
                </div>
              </div>
              {order.refundedAt && (
                <div className="app-kv">
                  <div className="app-kv-text">
                    <span className="app-kv-label">Возврат оплаты</span>
                    <span className="app-kv-value">оформлен {formatDate(order.refundedAt)}</span>
                  </div>
                </div>
              )}
              {order.returnedAt && (
                <div className="app-kv">
                  <div className="app-kv-text">
                    <span className="app-kv-label">Возврат товара</span>
                    <span className="app-kv-value">{formatDate(order.returnedAt)}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {sticky && <StickyBar>{sticky}</StickyBar>}
    </div>
  )
}
