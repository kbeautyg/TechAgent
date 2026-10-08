import type { Order } from '../types'

/** Подпись вместо суммы, если размер вознаграждения Партнёру не назначен */
export const REWARD_NOT_SET = 'не назначено'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(amount) + '₽'
}

/** Вознаграждение Партнёра по заказу: процент Партнёра от цены товара */
export function rewardFor(price: number, percent?: number): number | null {
  return percent && percent > 0 ? Math.round((price * percent) / 100) : null
}

/** Вознаграждение Партнёра: null — размер не назначен */
export function formatReward(reward: number | null): string {
  return reward === null ? REWARD_NOT_SET : formatPrice(reward)
}

/** Начисленное вознаграждение: только выданные заказы с загруженным актом.
 *  Если хотя бы у одного размер не назначен — итог тоже не определён (null). */
export function accruedReward(orders: Order[]): number | null {
  let sum = 0
  for (const o of orders) {
    if (o.status !== 'ISSUED' || !o.issueActUploaded) continue
    if (o.partnerReward === null) return null
    sum += o.partnerReward
  }
  return sum
}

/** Сумма цен оплаченных заказов */
export function paidTotal(orders: Order[]): number {
  return orders.reduce((s, o) => (o.paymentStatus === 'PAID' ? s + o.price : s), 0)
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
