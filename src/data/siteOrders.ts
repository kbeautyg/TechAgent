import { DEMO_MODE } from '../utils/demo'
import type { CartItem } from '../utils/cart'
import { cartDelivery, cartGoodsTotal } from '../utils/cart'

/*
 * Заказ покупателя с сайта (корзина → оформление). Пока банк не подключён, это заявка:
 * сайт отправляет её на российский сервер (/api/order-request, nginx на srv91, deploy/api/order-request.php),
 * ТехЭйджент проверяет наличие и присылает покупателю ссылку на оплату через СБП.
 * В демо-режиме бэкенда нет — заявка «уходит» без сети, чтобы можно было пройти путь целиком.
 */

export interface SiteOrderContacts {
  buyerName: string
  buyerPhone: string
  buyerEmail: string
  city: string
  sdekPoint: string
  comment: string
}

export interface SiteOrderResult {
  ok: boolean
  /** Номер заказа для покупателя: его называют при вопросах и видят в ссылке на оплату */
  orderNumber?: string
}

/** Номер вида S-261010-4821: S — заказ с сайта, дата, четыре случайные цифры (в демо; на бою номер выдаёт сервер) */
export function makeOrderNumber(now = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0')
  const date = `${String(now.getFullYear()).slice(2)}${p(now.getMonth() + 1)}${p(now.getDate())}`
  const rnd = String(Math.floor(1000 + Math.random() * 9000))
  return `S-${date}-${rnd}`
}

export async function submitSiteOrder(items: CartItem[], c: SiteOrderContacts): Promise<SiteOrderResult> {
  const payload = {
    ...c,
    items: items.map((i) => ({ productId: i.product.id, name: i.product.name, price: i.product.price, qty: i.qty })),
    goodsTotal: cartGoodsTotal(items),
    delivery: cartDelivery(items),
  }
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 600))
    return { ok: true, orderNumber: makeOrderNumber() }
  }
  try {
    const res = await fetch('/api/order-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = (await res.json().catch(() => null)) as { ok?: boolean; orderNumber?: string } | null
    // Номер выдаёт сервер — по нему заказ ищут в журнале и письме
    return res.ok && json?.ok === true && json.orderNumber ? { ok: true, orderNumber: json.orderNumber } : { ok: false }
  } catch {
    return { ok: false }
  }
}
