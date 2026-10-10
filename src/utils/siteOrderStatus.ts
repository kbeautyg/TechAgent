import type { SiteOrder, SiteOrderStatus } from '../lib/api'

/*
 * Этапы заказа с сайта: как их называет покупатель и сотрудник, цвет черты (как у статусов в кабинете партнёра)
 * и место на полосе прогресса.
 */

export const SITE_STATUS_LABEL: Record<SiteOrderStatus, string> = {
  NEW: 'Проверяем наличие',
  AWAITING_PAYMENT: 'Ждёт оплаты',
  PAID: 'Оплачен',
  SHIPPED: 'Едет в пункт СДЭК',
  READY: 'Можно забирать',
  RECEIVED: 'Получен',
  CANCELLED: 'Отменён',
}

/** Подпись для сотрудника: что сделать сейчас */
export const STAFF_TODO: Record<SiteOrderStatus, string> = {
  NEW: 'Проверить наличие и отправить ссылку на оплату',
  AWAITING_PAYMENT: 'Ждём оплату от покупателя',
  PAID: 'Выкупить и отправить в СДЭК',
  SHIPPED: 'Едет — отметить, когда прибудет в пункт',
  READY: 'Ждёт покупателя в пункте СДЭК',
  RECEIVED: 'Готово',
  CANCELLED: 'Отменён',
}

export const SITE_STATUS_COLOR: Record<SiteOrderStatus, string> = {
  NEW: '#1B44F5',
  AWAITING_PAYMENT: '#F59E0B',
  PAID: '#12B981',
  SHIPPED: '#6366F1',
  READY: '#8B5CF6',
  RECEIVED: '#14B8A6',
  CANCELLED: '#EF4444',
}

/** Шаги полосы прогресса у покупателя */
export const PROGRESS_STEPS: { status: SiteOrderStatus; label: string }[] = [
  { status: 'NEW', label: 'Оформлен' },
  { status: 'PAID', label: 'Оплачен' },
  { status: 'SHIPPED', label: 'В пути' },
  { status: 'READY', label: 'В СДЭК' },
  { status: 'RECEIVED', label: 'Получен' },
]

const ORDER: SiteOrderStatus[] = ['NEW', 'AWAITING_PAYMENT', 'PAID', 'SHIPPED', 'READY', 'RECEIVED']

/** Сколько шагов полосы пройдено и какой идёт сейчас */
export function progressOf(status: SiteOrderStatus): { done: number; now: number } {
  if (status === 'CANCELLED') return { done: 0, now: -1 }
  if (status === 'RECEIVED') return { done: PROGRESS_STEPS.length, now: -1 }
  if (status === 'NEW') return { done: 1, now: -1 }
  if (status === 'AWAITING_PAYMENT') return { done: 1, now: 1 }
  const i = PROGRESS_STEPS.findIndex((s) => s.status === status)
  return { done: i + 1, now: i }
}

export const isActive = (o: Pick<SiteOrder, 'status'>) => o.status !== 'RECEIVED' && o.status !== 'CANCELLED'

/** Когда заказ вошёл в этап — из истории событий */
export function stepTime(o: SiteOrder, status: SiteOrderStatus): string | undefined {
  return o.events.find((e) => e.status === status)?.at
}

export function stepIndex(status: SiteOrderStatus): number {
  return ORDER.indexOf(status)
}

/** Сколько ещё товаров кроме первого: «ещё 2 товара»; пусто, если товар один */
export function itemsMore(o: Pick<SiteOrder, 'items'>): string {
  const [first, ...rest] = o.items
  if (!first) return ''
  const more = rest.reduce((n, i) => n + i.qty, 0) + (first.qty - 1)
  if (!more) return ''
  const w = more % 10 === 1 && more % 100 !== 11 ? 'товар' : [2, 3, 4].includes(more % 10) && ![12, 13, 14].includes(more % 100) ? 'товара' : 'товаров'
  return `ещё ${more} ${w}`
}

/** Подпись под товарами: «iPhone 15 Pro Max и ещё 1» */
export function itemsTitle(o: Pick<SiteOrder, 'items'>): string {
  const [first, ...rest] = o.items
  if (!first) return 'Заказ'
  const more = rest.reduce((n, i) => n + i.qty, 0) + (first.qty - 1)
  return more > 0 ? `${first.name} и ещё ${more}` : first.name
}
