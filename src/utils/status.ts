import type { OrderStatus, PaymentStatus } from '../types'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  CREATED: 'Создан',
  PAID: 'Оплачен',
  PURCHASING: 'Выкупаем товар',
  PURCHASED: 'Выкуплен',
  SHIPPING: 'Передан карго',
  DELIVERED: 'Доставлен',
  COMPLETED: 'Завершен',
  CANCELLED: 'Отменен',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  CREATED: 'bg-blue-50 text-blue-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  PURCHASING: 'bg-indigo-50 text-indigo-700',
  PURCHASED: 'bg-indigo-50 text-indigo-700',
  SHIPPING: 'bg-amber-50 text-amber-700',
  DELIVERED: 'bg-green-50 text-green-700',
  COMPLETED: 'bg-teal-50 text-teal-700',
  CANCELLED: 'bg-red-50 text-red-700',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'Ожидает оплаты',
  PAID: 'Оплачено',
  FAILED: 'Ошибка',
}

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FAILED: 'bg-red-50 text-red-700',
}

export const ORDER_STEPS: OrderStatus[] = [
  'CREATED',
  'PAID',
  'PURCHASING',
  'PURCHASED',
  'SHIPPING',
  'DELIVERED',
  'COMPLETED',
]
