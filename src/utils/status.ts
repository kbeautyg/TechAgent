import type { Order, OrderStatus, PaymentStatus, PartnerStatus, BuyerClaimType } from '../types'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  CREATED: 'Создан',
  PAID: 'Оплачен',
  PURCHASED: 'Выкуплен у поставщика',
  IN_TRANSIT: 'В пути',
  AT_POINT: 'Прибыл в пункт выдачи',
  ISSUED: 'Выдан покупателю',
  CANCELLED: 'Отменён',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  CREATED: 'bg-blue-50 text-blue-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  PURCHASED: 'bg-indigo-50 text-indigo-700',
  IN_TRANSIT: 'bg-amber-50 text-amber-700',
  AT_POINT: 'bg-violet-50 text-violet-700',
  ISSUED: 'bg-teal-50 text-teal-700',
  CANCELLED: 'bg-red-50 text-red-700',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'Ожидает оплаты',
  PAID: 'Оплата получена',
  FAILED: 'Ошибка оплаты',
}

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FAILED: 'bg-red-50 text-red-700',
}

/* ── Возврат после выдачи и отмена с возвратом денег ──
 * Возвращённый заказ остаётся в статусе ISSUED (выдача была), но выглядит и считается как возврат */

/** Товар выдан и не возвращён: такие заказы считаются в «Выдано» и в фильтре «Выданы» */
export const isIssued = (o: Pick<Order, 'status' | 'returnedAt'>): boolean => o.status === 'ISSUED' && !o.returnedAt

export function orderStatusLabel(o: Pick<Order, 'status' | 'returnedAt'>): string {
  return o.returnedAt ? 'Возврат после выдачи' : ORDER_STATUS_LABELS[o.status]
}

export function orderStatusColor(o: Pick<Order, 'status' | 'returnedAt'>): string {
  return o.returnedAt ? 'bg-orange-50 text-orange-700' : ORDER_STATUS_COLORS[o.status]
}

export function paymentStatusLabel(o: Pick<Order, 'paymentStatus' | 'refundedAt'>): string {
  return o.refundedAt ? 'Возврат оформлен' : PAYMENT_STATUS_LABELS[o.paymentStatus]
}

export function paymentStatusColor(o: Pick<Order, 'paymentStatus' | 'refundedAt'>): string {
  return o.refundedAt ? 'bg-slate-100 text-slate-700' : PAYMENT_STATUS_COLORS[o.paymentStatus]
}

/** Шкала заказа: создан → оплачен → выкуплен у поставщика → в пути → прибыл в пункт выдачи → выдан покупателю */
export const ORDER_STEPS: OrderStatus[] = [
  'CREATED',
  'PAID',
  'PURCHASED',
  'IN_TRANSIT',
  'AT_POINT',
  'ISSUED',
]

/** Какие статусы ведёт ТехЭйджент в админке. CREATED → PAID — только по факту оплаты («Оплата поступила»).
 *  IN_TRANSIT → AT_POINT — приёмку отмечает Партнёр, AT_POINT → ISSUED — выдачу подтверждает Партнёр */
export const ADMIN_NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PAID: 'PURCHASED',
  PURCHASED: 'IN_TRANSIT',
}

/** Подпись статуса AT_POINT в фильтрах и плитках — одинаковая у Партнёра и в админке */
export const AT_POINT_FILTER_LABEL = 'В пункте выдачи'

export const BUYER_CLAIM_LABELS: Record<BuyerClaimType, string> = {
  EXCHANGE: 'Обмен',
  RETURN: 'Возврат',
  DEFECT: 'Недостаток товара',
}

export const PARTNER_STATUS_LABELS: Record<PartnerStatus, string> = {
  PENDING: 'На проверке',
  VERIFIED: 'Подтверждён',
  REJECTED: 'Отклонён',
}

export const PARTNER_STATUS_COLORS: Record<PartnerStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  VERIFIED: 'bg-emerald-50 text-emerald-700',
  REJECTED: 'bg-red-50 text-red-700',
}

/** « (фото: 3)» — сколько фото приложено к отметке о повреждении при приёмке */
export function photoNote(order: Pick<Order, 'receivedIssuePhotos' | 'receivedIssuePhoto'>): string {
  if (order.receivedIssuePhotos) return ` (фото: ${order.receivedIssuePhotos})`
  return order.receivedIssuePhoto ? ' (фото приложено)' : ''
}

/** Короткий статус для строки списка заказов на телефоне */
const ORDER_STATUS_SHORT: Record<OrderStatus, string> = {
  CREATED: 'Ждёт оплаты',
  PAID: 'Оплачен',
  PURCHASED: 'Выкуплен',
  IN_TRANSIT: 'В пути',
  AT_POINT: 'В пункте',
  ISSUED: 'Выдан',
  CANCELLED: 'Отменён',
}

export function orderStatusShort(o: Pick<Order, 'status' | 'returnedAt'>): string {
  return o.returnedAt ? 'Возврат' : ORDER_STATUS_SHORT[o.status]
}

/** Цвет текста статуса (без фона) — для подписи справа в строке заказа */
export function orderStatusText(o: Pick<Order, 'status' | 'returnedAt'>): string {
  return orderStatusColor(o).split(' ').find((c) => c.startsWith('text-')) ?? 'text-text-secondary'
}
