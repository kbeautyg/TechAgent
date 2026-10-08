import type { OrderStatus, PaymentStatus, PartnerStatus, BuyerClaimType } from '../types'

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
