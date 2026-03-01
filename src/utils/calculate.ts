import type { OrderCalculation } from '../types'

const COMMISSION_RATE = 0.03

export function calculateOrder(
  productCost: number,
  isTradeIn: boolean,
  oldValue?: number
): OrderCalculation {
  const commission = Math.round(productCost * COMMISSION_RATE)
  const totalCost = productCost + commission

  if (isTradeIn && oldValue && oldValue > 0) {
    const clientPayment = Math.max(0, totalCost - oldValue)
    const ipPayment = oldValue

    return {
      productCost,
      commission,
      totalCost,
      isTradeIn: true,
      oldValue,
      clientPayment,
      ipPayment,
    }
  }

  return {
    productCost,
    commission,
    totalCost,
    isTradeIn: false,
  }
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(amount) + '\u20BD'
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
