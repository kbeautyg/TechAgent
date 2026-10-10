/*
 * Обращения к серверу заказов (api/server.mjs на российском сервере; при разработке vite проксирует /api на localhost:8787).
 * Вход держится в cookie, которую ставит сервер, — в браузере ничего секретного не храним.
 */

export interface SiteOrderItem {
  productId: string
  name: string
  price: number
  qty: number
}

export type SiteOrderStatus = 'NEW' | 'AWAITING_PAYMENT' | 'PAID' | 'SHIPPED' | 'READY' | 'RECEIVED' | 'CANCELLED'

export interface SiteOrderEvent {
  status: SiteOrderStatus
  note: string
  at: string
}

export interface SiteOrder {
  number: string
  status: SiteOrderStatus
  items: SiteOrderItem[]
  goodsTotal: number
  delivery: number
  total: number
  buyerName: string
  phone: string
  email: string
  city: string
  sdekPoint: string
  /** SDEK — пункт СДЭК, PARTNER — пункт выдачи партнёра TechAgent */
  pickupType?: 'SDEK' | 'PARTNER'
  comment: string
  paymentUrl: string
  trackNumber: string
  cancelReason: string
  createdAt: string
  updatedAt: string
  events: SiteOrderEvent[]
  /** Только для сотрудников */
  staffNote?: string
}

export interface BuyerProfile {
  email: string
  name: string
  phone: string
  city: string
  sdekPoint: string
  /** Демо-кабинет с примерами заказов: только просмотр */
  demo?: boolean
}

export class ApiError extends Error {
  status: number
  fields?: string[]
  constructor(status: number, code: string, fields?: string[]) {
    super(code)
    this.status = status
    this.fields = fields
  }
}

export async function api<T>(path: string, body?: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      credentials: 'same-origin',
      headers: body === undefined ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'network')
  }
  const json = (await res.json().catch(() => null)) as (T & { error?: string; fields?: string[] }) | null
  if (!res.ok || !json) throw new ApiError(res.status, json?.error || 'server', json?.fields)
  return json
}

/** Понятный текст ошибки для человека */
export function apiErrorText(e: unknown): string {
  if (!(e instanceof ApiError)) return 'Что-то пошло не так. Попробуйте ещё раз.'
  switch (e.message) {
    case 'network': return 'Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.'
    case 'rate': return 'Слишком много попыток. Подождите немного и попробуйте снова.'
    case 'code_wrong': return 'Неверный код. Проверьте письмо и введите код ещё раз.'
    case 'code_expired': return 'Код устарел. Запросите новый.'
    case 'password_wrong': return 'Неверный пароль.'
    case 'staff_not_configured': return 'Вход для сотрудников ещё не настроен.'
    case 'auth': return 'Войдите ещё раз.'
    case 'not_found': return 'Заказ не найден.'
    default: return 'Что-то пошло не так. Попробуйте ещё раз.'
  }
}
