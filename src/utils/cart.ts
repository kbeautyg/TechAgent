import { useSyncExternalStore } from 'react'
import { products, type Product } from '../data/products'
import { readJson, writeJson } from './store'
import { SDEK_DELIVERY_PRICE } from '../seo/site'

/*
 * Корзина покупателя на сайте. Живёт в браузере покупателя (localStorage): до оформления заказа
 * ей больше негде быть, а вкладки видят одну и ту же корзину через событие `storage`.
 * Храним id товара, цвет и количество — цену и название всегда берём из каталога.
 * Один и тот же товар в двух цветах — две разные строки.
 */

export interface CartLine {
  productId: string
  /** Цвет из product.colors; у товаров без выбора цвета — пусто */
  color?: string
  qty: number
}

export interface CartItem extends CartLine {
  product: Product
}

const KEY = 'techagent.cart'
const EVENT = 'techagent:cart'
/** Больше пяти одинаковых устройств в одни руки — это уже опт, такой заказ обсуждаем отдельно */
export const MAX_QTY = 5

let cache: CartLine[] | null = null

function load(): CartLine[] {
  if (cache) return cache
  const raw = readJson<CartLine[]>(KEY)
  cache = Array.isArray(raw)
    ? raw.filter((l) => l && typeof l.productId === 'string' && Number.isInteger(l.qty) && l.qty > 0 && (l.color === undefined || typeof l.color === 'string'))
    : []
  return cache
}

function save(lines: CartLine[]): void {
  cache = lines
  writeJson(KEY, lines)
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENT))
}

function subscribe(cb: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null
      cb()
    }
  }
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', onStorage)
  }
}

const EMPTY: CartLine[] = []

/** Строки корзины; товары, которых больше нет в каталоге или которые недоступны, отбрасываются */
export function useCart(): CartItem[] {
  const lines = useSyncExternalStore(subscribe, load, () => EMPTY)
  const items: CartItem[] = []
  for (const l of lines) {
    const product = products.find((p) => p.id === l.productId)
    if (!product?.inStock) continue
    // Цвет, которого больше нет у товара, заменяется первым доступным
    const color = product.colors.some((c) => c.name === l.color) ? l.color : product.colors[0]?.name
    items.push({ ...l, color, qty: Math.min(l.qty, MAX_QTY), product })
  }
  return items
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty, 0)
}

export function cartGoodsTotal(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.product.price * i.qty, 0)
}

/** Доставка одна на заказ. null — сумма ещё не назначена, её сообщают при подтверждении */
export function cartDelivery(items: CartItem[]): number | null {
  return items.length ? SDEK_DELIVERY_PRICE : 0
}

export function cartTotal(items: CartItem[]): number {
  return cartGoodsTotal(items) + (cartDelivery(items) ?? 0)
}

const same = (l: CartLine, productId: string, color?: string) => l.productId === productId && (l.color || '') === (color || '')

/** Строка корзины для товара в этом цвете, если он уже там */
export function findLine(items: CartItem[], productId: string, color?: string): CartItem | undefined {
  return items.find((i) => same(i, productId, color))
}

export function addToCart(productId: string, color?: string, qty = 1): void {
  const lines = [...load()]
  const i = lines.findIndex((l) => same(l, productId, color))
  if (i >= 0) lines[i] = { ...lines[i], qty: Math.min(MAX_QTY, lines[i].qty + qty) }
  else lines.push({ productId, ...(color ? { color } : {}), qty: Math.min(MAX_QTY, qty) })
  save(lines)
}

export function setCartQty(productId: string, color: string | undefined, qty: number): void {
  if (qty <= 0) return removeFromCart(productId, color)
  save(load().map((l) => (same(l, productId, color) ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)))
}

export function removeFromCart(productId: string, color?: string): void {
  save(load().filter((l) => !same(l, productId, color)))
}

export function clearCart(): void {
  save([])
}
