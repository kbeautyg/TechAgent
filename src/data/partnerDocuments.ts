import type { Document, DocumentReview, Order, User } from '../types'
import { mockDocuments } from './documents'
import { addBusinessDays, formatDate, formatPrice, periodLabel, periodOf } from '../utils/calculate'

/*
 * Отчёт агента и акт об оказании услуг за месяц (агентский договор-оферта, п. 6.1, 7.4, 7.5).
 * Формирует ТехЭйджент в админке по каждому Партнёру: в документы попадают заказы, выданные
 * покупателям в этом месяце, по которым загружен подписанный акт приёма-передачи.
 * Образец — демо-документы d2 и d3 из documents.ts. Бэкенда нет: документы и решения
 * Партнёра по ним хранятся в localStorage.
 */

const DOCS_KEY = 'techagent_partner_docs_v1'
const REVIEWS_KEY = 'techagent_doc_reviews_v1'

/** Срок на возражения по отчёту и акту — 10 рабочих дней с даты формирования (п. 7.5) */
export const OBJECTION_BUSINESS_DAYS = 10

const PRINCIPAL = 'ОсОО «ТехЭйджент»'
const PRINCIPAL_INN = '00403202610304'
const PRINCIPAL_REG = '326302-3301-ООО'

const storage: Pick<Storage, 'getItem' | 'setItem'> =
  typeof localStorage !== 'undefined'
    ? localStorage
    : { getItem: () => null, setItem: () => undefined }

function load<T>(key: string): T | null {
  try {
    const raw = storage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch { /* ignore */ }
  return null
}

/** Сформированные отчёты и акты всех Партнёров */
export const partnerDocuments: Document[] = load<Document[]>(DOCS_KEY) ?? []

/** Решения Партнёров по отчётам и актам: id документа → решение */
const reviews: Record<string, DocumentReview> = load<Record<string, DocumentReview>>(REVIEWS_KEY) ?? {}

function saveDocs(): void {
  storage.setItem(DOCS_KEY, JSON.stringify(partnerDocuments))
}

function saveReviews(): void {
  storage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

export const isAgentDocument = (d: Document): boolean => d.type === 'REPORT' || d.type === 'ACT'

const byDateDesc = (a: Document, b: Document) => b.createdAt.localeCompare(a.createdAt)

/** Отчётный период документа: поле period, а у демо-образцов — «за период с 01.ММ.ГГГГ» в тексте */
export function documentPeriod(doc: Document): string | null {
  if (doc.period) return doc.period
  const m = doc.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/)
  return m ? `${m[2]}-${m[1]}` : null
}

/** Документы Партнёра в кабинете: демо-образцы и сформированные ТехЭйджент */
export function userDocuments(userId: string): Document[] {
  return [
    ...mockDocuments.filter((d) => d.userId === userId),
    ...partnerDocuments.filter((d) => d.userId === userId),
  ].sort(byDateDesc)
}

/** Все отчёты агента и акты — для админки */
export function allAgentDocuments(): Document[] {
  return [...mockDocuments.filter(isAgentDocument), ...partnerDocuments.filter(isAgentDocument)].sort(byDateDesc)
}

/** Отчёт и акт Партнёра за период, если уже сформированы */
export function agentDocumentsFor(userId: string, period: string): Document[] {
  return allAgentDocuments().filter((d) => d.userId === userId && documentPeriod(d) === period)
}

/** Отчёт агента, в который вошёл заказ. У демо-образцов списка заказов нет — сверяем Партнёра и период */
export function reportedIn(order: Order): Document | undefined {
  return allAgentDocuments().find(
    (d) =>
      d.type === 'REPORT' &&
      d.userId === order.userId &&
      (d.orderIds
        ? d.orderIds.includes(order.id)
        : order.issuedAt !== undefined && documentPeriod(d) === periodOf(order.issuedAt)),
  )
}

/** Заказы в отчёт за период: выданы покупателю в этом месяце, подписанный акт загружен */
export function reportableOrders(orders: Order[], userId: string, period: string): Order[] {
  return orders
    .filter(
      (o) =>
        o.userId === userId &&
        o.status === 'ISSUED' &&
        o.issueActUploaded &&
        !o.returnedAt &&
        o.issuedAt !== undefined &&
        periodOf(o.issuedAt) === period,
    )
    .sort((a, b) => (a.issuedAt ?? '').localeCompare(b.issuedAt ?? ''))
}

/** Возвращённые после выдачи заказы, вознаграждение по которым уже вошло в отчёт и ещё не удержано (п. 7.3) */
export function pendingDeductions(orders: Order[], userId: string): Order[] {
  const deducted = new Set(allAgentDocuments().flatMap((d) => d.deductedOrderIds ?? []))
  return orders.filter((o) => o.userId === userId && o.returnedAt && !deducted.has(o.id) && reportedIn(o) !== undefined)
}

/* ── Принятие отчёта Партнёром (п. 7.5) ── */

export function objectionDeadline(doc: Document): Date {
  return addBusinessDays(new Date(doc.createdAt), OBJECTION_BUSINESS_DAYS)
}

export type ReviewState =
  | { kind: 'WAITING'; deadline: Date }
  | { kind: 'ACCEPTED'; at: string }
  | { kind: 'OBJECTED'; at: string; text: string }
  /** Возражений в срок не поступило — отчёт и акт считаются принятыми */
  | { kind: 'DEEMED_ACCEPTED'; deadline: Date }

export function reviewState(doc: Document, now: Date = new Date()): ReviewState {
  const r = reviews[doc.id]
  if (r?.status === 'ACCEPTED') return { kind: 'ACCEPTED', at: r.at }
  if (r?.status === 'OBJECTED') return { kind: 'OBJECTED', at: r.at, text: r.text ?? '' }
  const deadline = objectionDeadline(doc)
  const afterDeadline = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate() + 1)
  return now >= afterDeadline ? { kind: 'DEEMED_ACCEPTED', deadline } : { kind: 'WAITING', deadline }
}

export function acceptDocument(docId: string): void {
  reviews[docId] = { status: 'ACCEPTED', at: new Date().toISOString() }
  saveReviews()
}

export function objectDocument(docId: string, text: string): void {
  reviews[docId] = { status: 'OBJECTED', at: new Date().toISOString(), text: text.trim() }
  saveReviews()
}

/* ── Формирование ── */

function periodBounds(period: string): { from: string; to: string } {
  const [y, m] = period.split('-').map(Number)
  const last = new Date(y, m, 0).getDate()
  const mm = String(m).padStart(2, '0')
  return { from: `01.${mm}.${y}`, to: `${String(last).padStart(2, '0')}.${mm}.${y}` }
}

const percentText = (p: number) => `${p.toLocaleString('ru-RU')}%`

/** Процент по заказу: сохранённый при оформлении или вычисленный из суммы */
function orderPercent(o: Order): number | null {
  if (o.partnerReward === null) return null
  if (o.rewardPercent) return o.rewardPercent
  return Math.round((o.partnerReward / o.price) * 10000) / 100
}

const ogrnLabel = (ogrn?: string) => (ogrn && ogrn.length === 15 ? 'ОГРНИП' : 'ОГРН')

export type GenerateResult =
  | { status: 'created'; docs: Document[] }
  | { status: 'exists'; docs: Document[] }
  | { status: 'empty' }

/** Сформировать отчёт агента и акт за месяц. Повторное формирование за тот же месяц документы не дублирует */
export function generateAgentDocuments(partner: User, period: string, orders: Order[]): GenerateResult {
  const existing = agentDocumentsFor(partner.id, period)
  if (existing.length > 0) return { status: 'exists', docs: existing }

  const list = reportableOrders(orders, partner.id, period)
  const deductions = pendingDeductions(orders, partner.id)
  if (list.length === 0 && deductions.length === 0) return { status: 'empty' }

  const now = new Date()
  const createdAt = now.toISOString()
  const today = formatDate(createdAt)
  const deadline = formatDate(objectionDeadline({ createdAt } as Document).toISOString())
  const { from, to } = periodBounds(period)
  const [y, m] = period.split('-')

  const name = partner.companyName || partner.email
  const goodsTotal = list.reduce((s, o) => s + o.price, 0)
  const accruedTotal = list.reduce((s, o) => s + (o.partnerReward ?? 0), 0)
  const deductedTotal = deductions.reduce((s, o) => s + (o.partnerReward ?? 0), 0)
  const rewardTotal = accruedTotal - deductedTotal
  const deductionBlock = deductions.length
    ? `\n\nУДЕРЖАНИЕ ПО ВОЗВРАТАМ (п. 7.3)\n\n${deductions
        .map((o) => `Заказ ${o.orderNumber}: Товар возвращён Покупателем ${o.returnedAt ? formatDate(o.returnedAt) : ''}, вознаграждение по отчёту за ${o.issuedAt ? periodLabel(periodOf(o.issuedAt)) : '—'} удерживается: −${formatPrice(o.partnerReward ?? 0)}`)
        .join('\n')}`
    : ''
  const percents = Array.from(new Set(list.map(orderPercent).filter((p): p is number => p !== null)))
  const totalPercent = percents.length === 1 ? ` (${percentText(percents[0])})` : ''
  const numbers = list.map((o) => o.orderNumber.replace(/^#/, '')).join(', ')

  const lines = list.map((o, i) => {
    const p = orderPercent(o)
    const reward = o.partnerReward === null ? 'не назначено' : formatPrice(o.partnerReward)
    return [
      `${i + 1}. Заказ ${o.orderNumber}`,
      `   Товар: ${o.productName}`,
      `   Цена Товара: ${formatPrice(o.price)} (оплачено Покупателем ТехЭйджент ${o.paidAt ? formatDate(o.paidAt) : '—'})`,
      `   Выдан: ${o.issuedAt ? formatDate(o.issuedAt) : '—'}, ${o.issuedToName || o.buyerName}, акт приёма-передачи загружен`,
      `   Вознаграждение Партнёра${p !== null ? ` (${percentText(p)})` : ''}: ${reward}`,
    ].join('\n')
  })

  const partnerBlock = [
    `Партнёр (Агент): ${name}`,
    `ИНН: ${partner.inn || '—'}, ${ogrnLabel(partner.ogrn)}: ${partner.ogrn || '—'}`,
    `Пункт выдачи: ${partner.pointAddress || '—'}`,
  ].join('\n')

  const report: Document = {
    id: `rep-${partner.id}-${period}`,
    userId: partner.id,
    type: 'REPORT',
    title: `Отчёт агента за ${periodLabel(period)}`,
    fileUrl: '#',
    createdAt,
    period,
    orderIds: list.map((o) => o.id),
    deductedOrderIds: deductions.map((o) => o.id),
    content: `ОТЧЁТ АГЕНТА
за период с ${from} по ${to}
Дата формирования: ${today}

${partnerBlock}
ТехЭйджент (Принципал): ${PRINCIPAL}, ИНН ${PRINCIPAL_INN}
Основание: агентский договор-оферта, раздел 7

Партнёр отчитывается перед ТехЭйджент о Заказах, Товар по которым выдан Покупателям в отчётном периоде.

ВЫДАННЫЕ ЗАКАЗЫ

${lines.join('\n\n')}

ИТОГО ЗА ПЕРИОД

Выдано Заказов: ${list.length}
Сумма Товаров, выданных Покупателям: ${formatPrice(goodsTotal)}
Вознаграждение Партнёра за выданные Заказы: ${formatPrice(accruedTotal)}${deductionBlock}
Вознаграждение Партнёра к выплате: ${formatPrice(rewardTotal)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты его формирования — до ${deadline} включительно (п. 7.5). При отсутствии возражений отчёт считается принятым.

Партнёр: ${name}
${PRINCIPAL}`,
  }

  const seq = allAgentDocuments().filter((d) => d.type === 'ACT' && documentPeriod(d) === period).length + 1
  const actNumber = `TA-${y}/${m}-${String(seq).padStart(3, '0')}`

  const act: Document = {
    id: `act-${partner.id}-${period}`,
    userId: partner.id,
    type: 'ACT',
    title: `Акт об оказании услуг № ${actNumber}`,
    fileUrl: '#',
    createdAt,
    period,
    orderIds: list.map((o) => o.id),
    content: `АКТ ОБ ОКАЗАНИИ УСЛУГ № ${actNumber}
от ${today}

Партнёр (Агент): ${name}, ИНН ${partner.inn || '—'}
ТехЭйджент (Принципал): ${PRINCIPAL}, ИНН ${PRINCIPAL_INN}, рег. № ${PRINCIPAL_REG}
Основание: агентский договор-оферта, отчёт агента за период с ${from} по ${to}

Агент оказал, а Принципал принял услуги за период с ${from} по ${to}: привлечение Покупателей, оформление Заказов, приём и хранение Товара, выдача Товара Покупателям от имени Принципала.

Выдано Заказов: ${list.length} (№ ${numbers})
Сумма Товаров, выданных Покупателям: ${formatPrice(goodsTotal)}
Вознаграждение Агента${totalPercent}: ${formatPrice(accruedTotal)}${deductedTotal ? `\nУдержано по возвратам (п. 7.3): −${formatPrice(deductedTotal)}\nК выплате: ${formatPrice(rewardTotal)}` : ''}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта.

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования — до ${deadline} включительно.

Агент: ${name}
Принципал: ${PRINCIPAL}`,
  }

  partnerDocuments.push(report, act)
  saveDocs()
  return { status: 'created', docs: [report, act] }
}
