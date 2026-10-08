import type { Document, DocumentReview, Order, User } from '../types'
import { mockDocuments } from './documents'
import { addBusinessDays, formatDate, formatPercent, formatPrice, periodLabel, periodOf } from '../utils/calculate'
import {
  readJson,
  writeJson,
  mergeById,
  mergeRecords,
  replaceArray,
  replaceRecord,
  notifyDataChanged,
  onOtherTabChange,
} from '../utils/store'

/*
 * Отчёт агента и акт об оказании услуг за месяц (агентский договор-оферта, п. 6.1, 7.3–7.6).
 * Формирует ТехЭйджент в админке по каждому Партнёру: в документы попадают заказы, выданные
 * покупателям в этом месяце, по которым загружен подписанный акт приёма-передачи, и удержания
 * по заказам, возвращённым после выдачи. Отчёт и акт за месяц — пара: Партнёр принимает их
 * или направляет возражения одним решением (п. 7.5). Образец — демо-документы d2 и d3 из documents.ts.
 * Бэкенда нет: документы, решения и отзывы хранятся в localStorage (см. utils/store.ts).
 */

const DOCS_KEY = 'techagent_partner_docs_v1'
const REVIEWS_KEY = 'techagent_doc_reviews_v1'
const REVOKED_KEY = 'techagent_doc_revoked_v1'

/** Срок на возражения по отчёту и акту — 10 рабочих дней с даты формирования (п. 7.5) */
export const OBJECTION_BUSINESS_DAYS = 10

const PRINCIPAL = 'ОсОО\u00A0«ТехЭйджент»'
const PRINCIPAL_INN = '00403202610304'
const PRINCIPAL_REG = '326302-3301-ООО'

/** Минус в суммах удержаний — везде один знак */
const MINUS = '\u2212'

/** Сформированные отчёты и акты всех Партнёров, включая отозванные (их скрывает revoked) */
export const partnerDocuments: Document[] = readJson<Document[]>(DOCS_KEY) ?? []

/** Решения Партнёров по отчётам и актам: id документа → решение */
const reviews: Record<string, DocumentReview> = readJson<Record<string, DocumentReview>>(REVIEWS_KEY) ?? {}

/** Отозванные ТехЭйджент отчёты и акты: id документа → когда отозван */
const revoked: Record<string, string> = readJson<Record<string, string>>(REVOKED_KEY) ?? {}

/* ── Хранение: перед записью данные перечитываются и сливаются (другая вкладка могла их изменить) ── */

function syncDocs(): void {
  const stored = readJson<Document[]>(DOCS_KEY)
  // Документ после формирования не меняется — слияние сводится к объединению
  if (stored) replaceArray(partnerDocuments, mergeById(partnerDocuments, stored, (d) => d.createdAt))
}

function syncReviews(): void {
  const stored = readJson<Record<string, DocumentReview>>(REVIEWS_KEY)
  if (stored) replaceRecord(reviews, mergeRecords(reviews, stored, (r) => r.at))
}

function syncRevoked(): void {
  const stored = readJson<Record<string, string>>(REVOKED_KEY)
  if (stored) replaceRecord(revoked, mergeRecords(revoked, stored, (at) => at))
}

function syncAll(): void {
  syncDocs()
  syncReviews()
  syncRevoked()
}

onOtherTabChange([DOCS_KEY, REVIEWS_KEY, REVOKED_KEY], syncAll)

/* ── Документы ── */

export const isAgentDocument = (d: Document): boolean => d.type === 'REPORT' || d.type === 'ACT'

const isActive = (d: Document): boolean => !revoked[d.id]

const byDateDesc = (a: Document, b: Document) => b.createdAt.localeCompare(a.createdAt)

/** Отчётный период документа: поле period, а у демо-образцов — «за период с 01.ММ.ГГГГ» в тексте */
export function documentPeriod(doc: Document): string | null {
  if (doc.period) return doc.period
  const m = doc.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/)
  return m ? `${m[2]}-${m[1]}` : null
}

/** Документы Партнёра в кабинете: демо-образцы и сформированные ТехЭйджент (без отозванных) */
export function userDocuments(userId: string): Document[] {
  return [
    ...mockDocuments.filter((d) => d.userId === userId),
    ...partnerDocuments.filter((d) => d.userId === userId),
  ]
    .filter(isActive)
    .sort(byDateDesc)
}

/** Все действующие отчёты агента и акты — для админки */
export function allAgentDocuments(): Document[] {
  return [...mockDocuments.filter(isAgentDocument), ...partnerDocuments.filter(isAgentDocument)]
    .filter(isActive)
    .sort(byDateDesc)
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

/** Заказы в отчёт за период: выданы покупателю в этом месяце, подписанный акт загружен, товар не возвращён */
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

/* ── Удержания по возвратам (п. 7.3) ── */

const reward = (o: Order) => o.partnerReward ?? 0

/** Сколько удержано в отчёте. В отчётах, сформированных до поля deductedAmount, удерживалось всё по deductedOrderIds */
function deductedIn(report: Document, orders: Order[]): number {
  if (report.deductedAmount !== undefined) return report.deductedAmount
  return (report.deductedOrderIds ?? []).reduce((s, id) => s + (orders.find((o) => o.id === id)?.partnerReward ?? 0), 0)
}

export interface Deductions {
  /** Возвраты, удержание по которым ещё не показано ни в одном отчёте */
  newReturns: Order[]
  /** Остаток удержания с прошлых периодов */
  carried: number
  /** Всего к удержанию: остаток + новые возвраты */
  debt: number
}

/** Долг Партнёра по удержаниям: вознаграждение по заказам, возвращённым после выдачи и уже вошедшим
 *  в отчёт агента, минус всё, что уже удержано в прежних отчётах */
export function deductions(orders: Order[], userId: string): Deductions {
  const reports = allAgentDocuments().filter((d) => d.type === 'REPORT' && d.userId === userId)
  const shown = new Set(reports.flatMap((d) => d.deductedOrderIds ?? []))
  const returned = orders.filter((o) => o.userId === userId && o.returnedAt && reportedIn(o) !== undefined)
  const shownTotal = returned.filter((o) => shown.has(o.id)).reduce((s, o) => s + reward(o), 0)
  const deductedBefore = reports.reduce((s, d) => s + deductedIn(d, orders), 0)
  const carried = Math.max(0, shownTotal - deductedBefore)
  const newReturns = returned.filter((o) => !shown.has(o.id))
  return { newReturns, carried, debt: carried + newReturns.reduce((s, o) => s + reward(o), 0) }
}

/* ── Отчёт и акт за период — пара с одним решением Партнёра (п. 7.5) ── */

export interface AgentPair {
  key: string
  userId: string
  period: string | null
  report?: Document
  act?: Document
  /** Отчёт, затем акт */
  docs: Document[]
  /** Дата формирования — от неё считается срок на возражения */
  createdAt: string
}

/** Отчёты и акты, сгруппированные по Партнёру и периоду, новые сверху */
export function agentPairs(userId?: string): AgentPair[] {
  const map = new Map<string, AgentPair>()
  for (const d of allAgentDocuments()) {
    if (userId && d.userId !== userId) continue
    const period = documentPeriod(d)
    const key = `${d.userId}|${period ?? d.id}`
    let pair = map.get(key)
    if (!pair) {
      pair = { key, userId: d.userId, period, docs: [], createdAt: d.createdAt }
      map.set(key, pair)
    }
    if (d.type === 'REPORT') pair.report = d
    else pair.act = d
    if (d.createdAt < pair.createdAt) pair.createdAt = d.createdAt
  }
  const pairs = [...map.values()]
  for (const p of pairs) p.docs = [p.report, p.act].filter((d): d is Document => d !== undefined)
  return pairs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** Заголовок пары: «Отчёт агента и акт за сентябрь 2026» */
export function pairTitle(pair: AgentPair): string {
  const what = pair.report && pair.act ? 'Отчёт агента и акт' : pair.report ? 'Отчёт агента' : 'Акт об оказании услуг'
  return pair.period ? `${what} за ${periodLabel(pair.period)}` : what
}

export function objectionDeadline(doc: Pick<Document, 'createdAt'>): Date {
  return addBusinessDays(new Date(doc.createdAt), OBJECTION_BUSINESS_DAYS)
}

export type ReviewState =
  | { kind: 'WAITING'; deadline: Date }
  | { kind: 'ACCEPTED'; at: string }
  | { kind: 'OBJECTED'; at: string; text: string }
  /** Возражений в срок не поступило — отчёт и акт считаются принятыми */
  | { kind: 'DEEMED_ACCEPTED'; deadline: Date }

export function pairReviewState(pair: AgentPair, now: Date = new Date()): ReviewState {
  const rs = pair.docs.map((d) => reviews[d.id])
  const objected = rs.find((r) => r?.status === 'OBJECTED')
  if (objected) return { kind: 'OBJECTED', at: objected.at, text: objected.text ?? '' }
  if (rs.length > 0 && rs.every((r) => r?.status === 'ACCEPTED')) {
    return { kind: 'ACCEPTED', at: rs.reduce((max, r) => (r && r.at > max ? r.at : max), '') }
  }
  const deadline = objectionDeadline(pair)
  const afterDeadline = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate() + 1)
  return now >= afterDeadline ? { kind: 'DEEMED_ACCEPTED', deadline } : { kind: 'WAITING', deadline }
}

/** Сколько пар «отчёт и акт» ждут решения Партнёра */
export function waitingPairsCount(userId: string): number {
  return agentPairs(userId).filter((p) => pairReviewState(p).kind === 'WAITING').length
}

/** Решение по паре записывается для обоих документов. false — решение уже есть или пару отозвали (другая вкладка) */
function decide(pair: AgentPair, review: DocumentReview): boolean {
  syncAll()
  if (pair.docs.some((d) => revoked[d.id]) || pairReviewState(pair).kind !== 'WAITING') {
    notifyDataChanged()
    return false
  }
  for (const d of pair.docs) reviews[d.id] = review
  syncReviews()
  writeJson(REVIEWS_KEY, reviews)
  notifyDataChanged()
  return true
}

export function acceptPair(pair: AgentPair): boolean {
  return decide(pair, { status: 'ACCEPTED', at: new Date().toISOString() })
}

export function objectPair(pair: AgentPair, text: string): boolean {
  return decide(pair, { status: 'OBJECTED', at: new Date().toISOString(), text: text.trim() })
}

/** Отозвать отчёт и акт, пока они не приняты: пара пропадает у Партнёра, за период можно сформировать заново */
export function canRevoke(pair: AgentPair): boolean {
  const kind = pairReviewState(pair).kind
  return kind === 'WAITING' || kind === 'OBJECTED'
}

export function revokePair(pair: AgentPair): boolean {
  syncAll()
  if (!canRevoke(pair)) {
    notifyDataChanged()
    return false
  }
  const at = new Date().toISOString()
  for (const d of pair.docs) revoked[d.id] = at
  syncRevoked()
  writeJson(REVOKED_KEY, revoked)
  notifyDataChanged()
  return true
}

/* ── Формирование ── */

function periodBounds(period: string): { from: string; to: string } {
  const [y, m] = period.split('-').map(Number)
  const last = new Date(y, m, 0).getDate()
  const mm = String(m).padStart(2, '0')
  return { from: `01.${mm}.${y}`, to: `${String(last).padStart(2, '0')}.${mm}.${y}` }
}

/** Процент по заказу: сохранённый при оформлении или вычисленный из суммы */
function orderPercent(o: Order): number | null {
  if (o.partnerReward === null) return null
  if (o.rewardPercent) return o.rewardPercent
  return Math.round((o.partnerReward / o.price) * 10000) / 100
}

const ogrnLabel = (ogrn?: string) => (ogrn && ogrn.length === 15 ? 'ОГРНИП' : 'ОГРН')

/** Номер акта: TA-ГГГГ/ММ-NNN. Считаются и отозванные акты — номер не повторяется */
function nextActNumber(period: string): string {
  const [y, m] = period.split('-')
  const used = [...mockDocuments, ...partnerDocuments]
    .filter((d) => d.type === 'ACT')
    .map((d) => d.title.match(/TA-(\d{4})\/(\d{2})-(\d+)/))
    .filter((mt): mt is RegExpMatchArray => mt !== null && `${mt[1]}-${mt[2]}` === period)
    .map((mt) => Number(mt[3]))
  return `TA-${y}/${m}-${String(Math.max(0, ...used) + 1).padStart(3, '0')}`
}

export type GenerateResult =
  | { status: 'created'; docs: Document[] }
  | { status: 'exists'; docs: Document[] }
  | { status: 'empty' }

/** Сформировать отчёт агента и акт за месяц. Повторное формирование за тот же месяц документы не дублирует.
 *  Без выданных за месяц заказов документы не формируются: удерживать не из чего, удержание ждёт */
export function generateAgentDocuments(partner: User, period: string, orders: Order[]): GenerateResult {
  syncAll()
  const existing = agentDocumentsFor(partner.id, period)
  if (existing.length > 0) return { status: 'exists', docs: existing }

  const list = reportableOrders(orders, partner.id, period)
  if (list.length === 0) return { status: 'empty' }

  const now = new Date()
  const createdAt = now.toISOString()
  const today = formatDate(createdAt)
  const { from, to } = periodBounds(period)
  const stamp = now.getTime().toString(36)

  const name = partner.companyName || partner.email
  const goodsTotal = list.reduce((s, o) => s + o.price, 0)
  const accruedTotal = list.reduce((s, o) => s + reward(o), 0)

  // Удержание: не больше начисленного за период, к выплате не меньше нуля, остаток переносится
  const { newReturns, carried, debt } = deductions(orders, partner.id)
  const deducted = Math.min(debt, accruedTotal)
  const payable = accruedTotal - deducted
  const carryForward = debt - deducted

  const returnLine = (o: Order) => {
    const rep = reportedIn(o)
    const repPeriod = (rep && documentPeriod(rep)) ?? (o.issuedAt ? periodOf(o.issuedAt) : null)
    return `Заказ ${o.orderNumber}: Товар возвращён Покупателем ${o.returnedAt ? formatDate(o.returnedAt) : '—'}, вознаграждение по отчёту за ${repPeriod ? periodLabel(repPeriod) : '—'} удерживается: ${MINUS}${formatPrice(reward(o))}`
  }

  const deductionRows = [
    ...newReturns.map(returnLine),
    ...(carried > 0 ? [`Остаток удержания с прошлых периодов: ${MINUS}${formatPrice(carried)}`] : []),
    `Удержано в этом периоде: ${MINUS}${formatPrice(deducted)}`,
    ...(carryForward > 0 ? [`Переносится на следующие периоды: ${formatPrice(carryForward)}`] : []),
  ]
  // Блок удержания, затем пустая строка и сумма к выплате
  const deductionBlock = debt > 0 ? `\nУДЕРЖАНИЕ ПО ВОЗВРАТАМ (п. 7.3)\n\n${deductionRows.join('\n')}\n\n` : ''

  const percents = Array.from(new Set(list.map(orderPercent).filter((p): p is number => p !== null)))
  const totalPercent = percents.length === 1 ? ` (${formatPercent(percents[0])})` : ''
  const numbers = list.map((o) => o.orderNumber.replace(/^#/, '')).join(', ')

  const lines = list.map((o, i) => {
    const p = orderPercent(o)
    const sum = o.partnerReward === null ? 'не назначено' : formatPrice(o.partnerReward)
    return [
      `${i + 1}. Заказ ${o.orderNumber}`,
      `   Товар: ${o.productName}`,
      `   Цена Товара: ${formatPrice(o.price)} (оплачено Покупателем ТехЭйджент ${o.paidAt ? formatDate(o.paidAt) : '—'})`,
      `   Выдан: ${o.issuedAt ? formatDate(o.issuedAt) : '—'}, ${o.issuedToName || o.buyerName}, акт приёма-передачи загружен`,
      `   Вознаграждение Партнёра${p !== null ? ` (${formatPercent(p)})` : ''}: ${sum}`,
    ].join('\n')
  })

  const partnerBlock = [
    `Партнёр (Агент): ${name}`,
    `ИНН: ${partner.inn || '—'}, ${ogrnLabel(partner.ogrn)}: ${partner.ogrn || '—'}`,
    `Пункт выдачи: ${partner.pointAddress || '—'}`,
  ].join('\n')

  const report: Document = {
    id: `rep-${partner.id}-${period}-${stamp}`,
    userId: partner.id,
    type: 'REPORT',
    title: `Отчёт агента за ${periodLabel(period)}`,
    fileUrl: '#',
    createdAt,
    period,
    orderIds: list.map((o) => o.id),
    deductedOrderIds: newReturns.map((o) => o.id),
    deductedAmount: deducted,
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
Вознаграждение Партнёра за выданные Заказы: ${formatPrice(accruedTotal)}
${deductionBlock}Вознаграждение Партнёра к выплате: ${formatPrice(payable)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты формирования (п. 7.5). При отсутствии возражений в этот срок отчёт считается принятым.

Партнёр (Агент): ${name}
ТехЭйджент (Принципал): ${PRINCIPAL}`,
  }

  const actNumber = nextActNumber(period)
  const deductionLines =
    deducted > 0
      ? `\nУдержано по возвратам (п. 7.3 агентского договора-оферты): ${MINUS}${formatPrice(deducted)}\nК выплате: ${formatPrice(payable)}`
      : ''

  const act: Document = {
    id: `act-${partner.id}-${period}-${stamp}`,
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
Вознаграждение Агента${totalPercent}: ${formatPrice(accruedTotal)}${deductionLines}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6 агентского договора-оферты).

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования (п. 7.5 агентского договора-оферты).

Агент: ${name}
Принципал: ${PRINCIPAL}`,
  }

  partnerDocuments.push(report, act)
  syncDocs()
  writeJson(DOCS_KEY, partnerDocuments)
  notifyDataChanged()
  return { status: 'created', docs: [report, act] }
}
