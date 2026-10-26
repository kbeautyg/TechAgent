import { useEffect, useSyncExternalStore } from 'react'
import type { BuyerClaim, BuyerClaimType, Order, OrderStatus } from '../types'
import { api, type AgentReportView, type PartnerOrderView, type SiteOrderStatus } from '../lib/api'
import { setServerReports } from './partnerDocuments'
import { mockOrders, DEMO_MODE } from './mock'
import { replaceArray, notifyDataChanged } from '../utils/store'

/*
 * Заказы партнёра на боевом сайте — с сервера заказов (api/server.mjs, /api/partner/orders).
 * Страницы кабинета написаны под формат демо-данных (data/mock.ts): заказы с сервера переводятся в него
 * и кладутся в тот же массив mockOrders — только в память, в браузере не сохраняются.
 * Демо-режим работает по-старому, без сервера.
 */

/** Этапы сервера → этапы кабинета. «Выкуплен у поставщика» сервер отдельно не отмечает */
const STATUS: Record<SiteOrderStatus, OrderStatus> = {
  NEW: 'CREATED',
  AWAITING_PAYMENT: 'CREATED',
  PAID: 'PAID',
  SHIPPED: 'IN_TRANSIT',
  READY: 'AT_POINT',
  RECEIVED: 'ISSUED',
  CANCELLED: 'CANCELLED',
}

const fileUrl = (number: string, name: string) => `/api/partner/orders/${number}/files/${encodeURIComponent(name)}`

export function fromServer(o: PartnerOrderView, userId: string): Order {
  const at = (s: SiteOrderStatus) => o.events.filter((e) => e.status === s).at(-1)?.at
  const paidAt = at('PAID')
  const ci = o.events.map((e) => e.status).lastIndexOf('CANCELLED')
  const beforeCancel = ci > 0 ? o.events[ci - 1].status : undefined
  const first = o.items[0]
  return {
    id: o.number,
    orderNumber: o.number,
    userId,
    productId: o.items.length === 1 ? first?.productId : undefined,
    productName: o.items.map((i) => (i.qty > 1 ? `${i.name} × ${i.qty}` : i.name)).join(', '),
    price: o.total,
    partnerReward: o.reward,
    rewardPercent: o.rewardPercent ?? undefined,
    buyerName: o.buyerName,
    buyerPhone: o.phone,
    buyerEmail: o.email || undefined,
    paymentId: o.payToken,
    paymentLink: o.payToken ? `/pay/${o.payToken}` : '',
    paymentStatus: paidAt && o.status !== 'NEW' && o.status !== 'AWAITING_PAYMENT' ? 'PAID' : 'PENDING',
    paidAt,
    saleOfferAcceptedAt: o.consentAt ?? undefined,
    pdConsentAt: o.consentAt ?? undefined,
    status: STATUS[o.status],
    receivedAt: o.receivedAt ?? undefined,
    receivedIssue: o.receivedIssue || undefined,
    receivedIssuePhotos: o.receivedPhotos || undefined,
    receivedIssuePhotoUrls: o.files.filter((f) => f.startsWith('accept-')).map((f) => fileUrl(o.number, f)),
    notifiedAt: o.notifiedAt ?? undefined,
    cancelledFrom: beforeCancel ? STATUS[beforeCancel] : undefined,
    buyerClaims: o.claims.map((c): BuyerClaim => ({
      id: c.id,
      type: c.type,
      text: c.text,
      photoAttached: Boolean(c.photo),
      photoUrl: c.photo ? fileUrl(o.number, c.photo) : undefined,
      createdAt: c.createdAt,
    })),
    issuedAt: o.issuedAt ?? undefined,
    issuedToName: o.issuedToName || undefined,
    issueActUploaded: Boolean(o.actFile),
    actUrl: o.actFile ? fileUrl(o.number, o.actFile) : undefined,
    source: o.source,
    paymentReady: o.paymentReady,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  }
}

/* Загружены ли заказы с сервера — до этого страница заказа не говорит «не найден» */
let loaded = DEMO_MODE
let owner = ''
const listeners = new Set<() => void>()
const setLoaded = (v: boolean) => {
  loaded = v
  listeners.forEach((l) => l())
}
export function useOrdersLoaded(): boolean {
  return useSyncExternalStore((l) => (listeners.add(l), () => listeners.delete(l)), () => loaded, () => loaded)
}

/** Перечитать заказы партнёра с сервера — и его отчёты агента: они считаются по этим заказам */
export async function loadPartnerOrders(userId: string): Promise<void> {
  if (DEMO_MODE) return
  const [r, rep] = await Promise.all([
    api<{ orders: PartnerOrderView[] }>('/partner/orders'),
    api<{ reports: AgentReportView[] }>('/partner/reports'),
  ])
  owner = userId
  replaceArray(mockOrders, r.orders.map((o) => fromServer(o, userId)))
  setServerReports(rep.reports, userId)
  notifyDataChanged()
  setLoaded(true)
}

/** Выход: заказы прошлого партнёра не должны остаться в памяти */
export function clearPartnerOrders(): void {
  if (DEMO_MODE) return
  owner = ''
  replaceArray(mockOrders, [])
  setServerReports([], '')
  notifyDataChanged()
  setLoaded(false)
}

/** Кабинет открыт: заказы с сервера сразу и потом раз в минуту и при возвращении на вкладку (этапы меняет ТехЭйджент) */
export function usePartnerOrdersSync(userId: string | undefined): void {
  useEffect(() => {
    if (DEMO_MODE || !userId) return
    if (owner && owner !== userId) clearPartnerOrders()
    // Сервер не ответил — страницы не ждут вечно: покажут то, что есть
    const load = () => void loadPartnerOrders(userId).catch(() => setLoaded(true))
    load()
    const timer = window.setInterval(load, 60_000)
    const onVisible = () => document.visibilityState === 'visible' && load()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [userId])
}

/** Заказ после действия на сервере — заменить в списке */
function put(o: PartnerOrderView): Order {
  const order = fromServer(o, owner)
  const idx = mockOrders.findIndex((x) => x.id === order.id)
  if (idx >= 0) mockOrders[idx] = order
  else mockOrders.unshift(order)
  notifyDataChanged()
  return order
}

const post = async (path: string, body: unknown) => put((await api<{ order: PartnerOrderView }>(path, body)).order)

export function createPartnerOrder(data: { productId: string; color: string; buyerName: string; buyerPhone: string; buyerEmail: string }) {
  return post('/partner/orders', { ...data, buyerInformed: true })
}

export async function acceptPartnerOrder(number: string, issue: string, photos: File[]) {
  return post(`/partner/orders/${number}/accept`, { issue, photos: await Promise.all(photos.map((f) => fileData(f))) })
}

export function notifiedPartnerOrder(number: string) {
  return post(`/partner/orders/${number}/notified`, {})
}

export async function issuePartnerOrder(number: string, act: File) {
  return post(`/partner/orders/${number}/issue`, { act: await fileData(act) })
}

export async function claimPartnerOrder(number: string, type: BuyerClaimType, text: string, photo: File | null) {
  return post(`/partner/orders/${number}/claim`, { type, text, ...(photo ? { photo: await fileData(photo) } : {}) })
}

/**
 * Файл для отправки на сервер. Фото с телефона весят 3–10 МБ — уменьшаем до 1800 точек по длинной стороне и
 * пересохраняем в JPEG: текст акта читается, а отправка не ждёт минуту на мобильном интернете. PDF — как есть
 */
export async function fileData(file: File): Promise<string> {
  const raw = () => new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
  if (!file.type.startsWith('image/')) return raw()
  try {
    const bmp = await createImageBitmap(file)
    const k = Math.min(1, 1800 / Math.max(bmp.width, bmp.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bmp.width * k)
    canvas.height = Math.round(bmp.height * k)
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
    bmp.close()
    return canvas.toDataURL('image/jpeg', 0.85)
  } catch {
    // Браузер не смог прочитать формат (например, HEIC) — отправляем как есть, сервер проверит
    return raw()
  }
}
