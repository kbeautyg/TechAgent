import type { CartItem } from '../utils/cart'
import { api, ApiError } from '../lib/api'

/*
 * Заказ покупателя с сайта (корзина → оформление) уходит на сервер заказов (api/server.mjs на российском сервере).
 * Сервер сам берёт цены из каталога, выдаёт номер заказа, пишет покупателю и сотрудникам.
 * Пока банк не подключён, ТехЭйджент проверяет наличие и присылает ссылку на оплату через СБП.
 */

export interface SiteOrderContacts {
  buyerName: string
  buyerPhone: string
  buyerEmail: string
  city: string
  sdekPoint: string
  comment: string
  /** Пункт, выбранный на карте: сервер сверяет его со списком СДЭК */
  sdekCityCode?: number
  sdekPointCode?: string
  /** Пункт выдачи партнёра TechAgent, выбранный на карте (доставка входит в цену) */
  partnerPointCode?: string
}

export interface SiteOrderResult {
  ok: boolean
  /** Номер заказа выдаёт сервер: S-ггммдд-NNNN */
  orderNumber?: string
  total?: number
  /** Товар, который сервер отклонил как недоступный */
  unavailable?: string[]
  /** Код ошибки сервера: demo — заказ из демо-кабинета */
  error?: string
}

export async function submitSiteOrder(items: CartItem[], c: SiteOrderContacts): Promise<SiteOrderResult> {
  try {
    const r = await api<{ orderNumber: string; total: number }>('/orders', {
      ...c,
      items: items.map((i) => ({ productId: i.product.id, qty: i.qty })),
      offerAccepted: true,
      pdConsent: true,
    })
    return { ok: true, orderNumber: r.orderNumber, total: r.total }
  } catch (e) {
    const unavailable = e instanceof ApiError ? (e.fields ?? []).filter((f) => f.startsWith('unavailable:')).map((f) => f.slice(12)) : []
    return { ok: false, unavailable, error: e instanceof ApiError ? e.message : undefined }
  }
}
