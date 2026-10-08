import type { Order } from '../types'

/** Маркер вместо суммы вознаграждения, пока его размер не определён */
export const PARTNER_REWARD_MARKER = '{{PARTNER_REWARD}}'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(amount) + '₽'
}

/** Вознаграждение Партнёра: null — размер ещё не определён, показываем маркер */
export function formatReward(reward: number | null): string {
  return reward === null ? PARTNER_REWARD_MARKER : formatPrice(reward)
}

/** Начисленное вознаграждение: только выданные заказы с загруженным актом.
 *  Если хотя бы у одного размер не определён — итог тоже не определён (null). */
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
