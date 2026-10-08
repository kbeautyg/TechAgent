import type { Order, User } from '../types'

/** Подпись вместо суммы, если размер вознаграждения Партнёру не назначен */
export const REWARD_NOT_SET = 'не назначено'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(amount) + '\u00A0₽'
}

/** Вознаграждение Партнёра по заказу: процент Партнёра от цены товара */
export function rewardFor(price: number, percent?: number): number | null {
  return percent && percent > 0 ? Math.round((price * percent) / 100) : null
}

/** Процент вознаграждения, действующий на дату: новый размер применяется к заказам,
 *  оформленным начиная с rewardPercentNextFrom (оферта, п. 7.1) */
export function rewardPercentAt(
  user: Pick<User, 'rewardPercent' | 'rewardPercentNext' | 'rewardPercentNextFrom'>,
  at: Date = new Date(),
): number | undefined {
  if (user.rewardPercentNext && user.rewardPercentNextFrom && at >= new Date(user.rewardPercentNextFrom)) {
    return user.rewardPercentNext
  }
  return user.rewardPercent
}

/** Запланированное и ещё не вступившее в силу изменение процента */
export function pendingRewardChange(
  user: Pick<User, 'rewardPercentNext' | 'rewardPercentNextFrom'>,
  at: Date = new Date(),
): { percent: number; from: string } | null {
  if (user.rewardPercentNext && user.rewardPercentNextFrom && at < new Date(user.rewardPercentNextFrom)) {
    return { percent: user.rewardPercentNext, from: user.rewardPercentNextFrom }
  }
  return null
}

/** Вознаграждение Партнёра: null — размер не назначен */
export function formatReward(reward: number | null): string {
  return reward === null ? REWARD_NOT_SET : formatPrice(reward)
}

/** Процент по-русски, через запятую: 5,5% */
export function formatPercent(percent: number): string {
  return `${percent.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}%`
}

/** Начисленное вознаграждение: только выданные заказы с загруженным актом.
 *  Если хотя бы у одного размер не назначен — итог тоже не определён (null). */
export function accruedReward(orders: Order[]): number | null {
  let sum = 0
  for (const o of orders) {
    if (o.status !== 'ISSUED' || !o.issueActUploaded || o.returnedAt) continue
    if (o.partnerReward === null) return null
    sum += o.partnerReward
  }
  return sum
}

/** Сумма цен оплаченных заказов (без отменённых с возвратом) */
export function paidTotal(orders: Order[]): number {
  return orders.reduce((s, o) => (o.paymentStatus === 'PAID' && !o.refundedAt ? s + o.price : s), 0)
}

/* ── Сроки ── */

/** Товар хранится в пункте выдачи 5 дней с даты, когда Партнёр сообщил покупателю о поступлении (оферта, п. 8.3) */
export const STORAGE_DAYS = 5

/** Последний день хранения: дата уведомления + 5 дней */
export function storageUntil(order: Pick<Order, 'notifiedAt'>): Date | null {
  if (!order.notifiedAt) return null
  const d = new Date(order.notifiedAt)
  d.setDate(d.getDate() + STORAGE_DAYS)
  return d
}

/** Срок хранения истёк: наступил день после последнего дня хранения */
export function storageExpired(order: Pick<Order, 'notifiedAt'>, now: Date = new Date()): boolean {
  const until = storageUntil(order)
  if (!until) return false
  const nextDay = new Date(until.getFullYear(), until.getMonth(), until.getDate() + 1)
  return now >= nextDay
}

/** Заказ отменён, когда товар уже был в пункте выдачи: Партнёр хранит товар до указания ТехЭйджент */
export function cancelledAtPoint(order: Pick<Order, 'status' | 'cancelledFrom'>): boolean {
  return order.status === 'CANCELLED' && order.cancelledFrom === 'AT_POINT'
}

/** Строка о хранении для списка заказов: товар в пункте выдачи */
export function storageNote(order: Order, now: Date = new Date()): { text: string; expired: boolean } | null {
  if (cancelledAtPoint(order)) return { text: 'Отменён — товар храните до указания ТехЭйджент', expired: false }
  if (order.status !== 'AT_POINT') return null
  if (!order.notifiedAt) return { text: 'Сообщите покупателю о поступлении', expired: false }
  if (storageExpired(order, now)) return { text: 'Срок хранения истёк — сообщите ТехЭйджент', expired: true }
  const until = storageUntil(order)
  return until ? { text: `Хранится до ${formatDate(until.toISOString())}`, expired: false } : null
}

/* ── Рабочие дни ── */

/** Нерабочие праздничные дни в РФ (ст. 112 ТК РФ): [месяц, день] */
const HOLIDAYS: [number, number][] = [
  [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
  [2, 23], [3, 8], [5, 1], [5, 9], [6, 12], [11, 4],
]

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6

const offDaysCache = new Map<number, Set<string>>()

/** Нерабочие дни года, кроме суббот и воскресений: праздники и перенесённые выходные.
 *  Праздник, совпавший с субботой или воскресеньем, переносится на следующий рабочий день — кроме январских */
function offDays(year: number): Set<string> {
  const cached = offDaysCache.get(year)
  if (cached) return cached
  const set = new Set<string>()
  for (const [m, day] of HOLIDAYS) set.add(dayKey(new Date(year, m - 1, day)))
  for (const [m, day] of HOLIDAYS) {
    const h = new Date(year, m - 1, day)
    if (m === 1 || !isWeekend(h)) continue
    const next = new Date(h)
    do {
      next.setDate(next.getDate() + 1)
    } while (isWeekend(next) || set.has(dayKey(next)))
    set.add(dayKey(next))
  }
  offDaysCache.set(year, set)
  return set
}

export function isBusinessDay(d: Date): boolean {
  return !isWeekend(d) && !offDays(d.getFullYear()).has(dayKey(d))
}

/** Дата + n рабочих дней: не считаются суббота, воскресенье, праздники РФ и перенесённые выходные */
export function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from)
  let left = days
  while (left > 0) {
    d.setDate(d.getDate() + 1)
    if (isBusinessDay(d)) left--
  }
  return d
}

/* ── Отчётные периоды ── */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

/** Отчётный период даты: 'ГГГГ-ММ' (по местному времени) */
export function periodOf(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** 'ГГГГ-ММ' → «октябрь 2026» */
export function periodLabel(period: string): string {
  const [y, m] = period.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
