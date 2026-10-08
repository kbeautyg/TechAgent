import type { User, Order } from '../types'
import { products } from './products'
import { rewardFor } from '../utils/calculate'

/*
 * Данные кабинета: бэкенда нет, всё хранится в памяти и localStorage.
 *
 * Демо-учётки и демо-заказы попадают в данные только в режиме разработки
 * (npm run dev) или при явном флаге сборки VITE_DEMO=1. В обычной боевой
 * сборке массивы пустые: входа по демо-учёткам нет, демо-имён в бандле нет.
 */
export const DEMO_MODE: boolean = import.meta.env.DEV || import.meta.env.VITE_DEMO === '1'

/* Новые ключи: в старых лежат заказы прежнего формата, их поля не совпадают с текущими типами */
const ORDERS_KEY = 'techagent_orders_v2'
const USERS_KEY = 'techagent_users_v2'
const COUNTER_KEY = 'techagent_order_counter'
const LEGACY_KEYS = ['techagent_orders']

/* localStorage недоступен при пререндере (Node) — используем безопасный шим */
const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> =
  typeof localStorage !== 'undefined'
    ? localStorage
    : { getItem: () => null, setItem: () => undefined, removeItem: () => undefined }

for (const key of LEGACY_KEYS) storage.removeItem(key)

function load<T>(key: string): T | null {
  try {
    const raw = storage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch { /* ignore */ }
  return null
}

/* ── Демо-данные (только DEMO_MODE) ── */

function demoUsers(): User[] {
  return [
    {
      id: '1',
      email: 'demo@techagent.pro',
      role: 'CLIENT',
      companyName: 'Демо-партнёр 1',
      inn: '000000000001',
      ogrn: '000000000000001',
      phone: '+7 900 000-00-01',
      contactName: 'Контактное лицо (демо)',
      pointAddress: 'Адрес пункта выдачи (демо)',
      bankName: 'Банк (демо)',
      bik: '000000000',
      account: '00000000000000000001',
      partnerStatus: 'VERIFIED',
      rewardPercent: 5,
      createdAt: '2026-01-15T10:00:00Z',
    },
    {
      id: '2',
      email: 'admin@techagent.pro',
      role: 'ADMIN',
      companyName: 'TechAgent',
      createdAt: '2026-01-01T10:00:00Z',
    },
    {
      id: '3',
      email: 'demo2@techagent.pro',
      role: 'CLIENT',
      companyName: 'Демо-партнёр 2',
      inn: '000000000002',
      ogrn: '000000000000002',
      phone: '+7 900 000-00-02',
      contactName: 'Контактное лицо (демо)',
      pointAddress: 'Адрес пункта выдачи (демо)',
      bankName: 'Банк (демо)',
      bik: '000000000',
      account: '00000000000000000002',
      partnerStatus: 'VERIFIED',
      rewardPercent: 5,
      createdAt: '2026-01-20T10:00:00Z',
    },
    {
      id: '4',
      email: 'demo3@techagent.pro',
      role: 'CLIENT',
      companyName: 'Демо-партнёр 3',
      inn: '000000000003',
      ogrn: '000000000000003',
      phone: '+7 900 000-00-03',
      contactName: 'Контактное лицо (демо)',
      pointAddress: 'Адрес пункта выдачи (демо)',
      bankName: 'Банк (демо)',
      bik: '000000000',
      account: '00000000000000000003',
      partnerStatus: 'PENDING',
      createdAt: '2026-02-18T10:00:00Z',
    },
  ]
}

/** Товар и цена — из каталога, как при оформлении настоящего заказа */
function item(productId: string): Pick<Order, 'productId' | 'productName' | 'price'> {
  const p = products.find((x) => x.id === productId)
  return { productId, productName: p?.name ?? productId, price: p?.price ?? 0 }
}

function demoOrders(): Order[] {
  return [
    // === Демо-партнёр 1 (id: 1) ===
    {
      id: 'o1',
      orderNumber: '#1245',
      userId: '1',
      ...item('sgts24u256b'),
      partnerReward: null,
      buyerName: 'Покупатель 1 (демо)',
      buyerPhone: '+7 900 000-00-11',
      paymentId: 'pay_demo01',
      paymentLink: '/pay/pay_demo01',
      paymentStatus: 'PENDING',
      status: 'CREATED',
      createdAt: '2026-02-17T09:00:00Z',
      updatedAt: '2026-02-17T09:00:00Z',
    },
    {
      id: 'o2',
      orderNumber: '#1243',
      userId: '1',
      ...item('macbookairm315256'),
      partnerReward: null,
      buyerName: 'Покупатель 2 (демо)',
      buyerPhone: '+7 900 000-00-12',
      buyerEmail: 'buyer2@example.com',
      paymentId: 'pay_demo02',
      paymentLink: '/pay/pay_demo02',
      paymentStatus: 'PAID',
      paidAt: '2026-02-14T15:00:00Z',
      saleOfferAcceptedAt: '2026-02-14T14:58:00Z',
      status: 'PAID',
      createdAt: '2026-02-14T14:30:00Z',
      updatedAt: '2026-02-14T15:00:00Z',
    },
    {
      id: 'o3',
      orderNumber: '#1241',
      userId: '1',
      ...item('iph15p256b'),
      partnerReward: null,
      buyerName: 'Покупатель 3 (демо)',
      buyerPhone: '+7 900 000-00-13',
      paymentId: 'pay_demo03',
      paymentLink: '/pay/pay_demo03',
      paymentStatus: 'PAID',
      paidAt: '2026-02-12T14:45:00Z',
      saleOfferAcceptedAt: '2026-02-12T14:44:00Z',
      status: 'PURCHASED',
      createdAt: '2026-02-12T14:30:00Z',
      updatedAt: '2026-02-13T10:00:00Z',
    },
    {
      id: 'o4',
      orderNumber: '#1240',
      userId: '1',
      ...item('macbookairm3512'),
      partnerReward: null,
      buyerName: 'Покупатель 4 (демо)',
      buyerPhone: '+7 900 000-00-14',
      paymentId: 'pay_demo04',
      paymentLink: '/pay/pay_demo04',
      paymentStatus: 'PAID',
      paidAt: '2026-02-10T10:20:00Z',
      saleOfferAcceptedAt: '2026-02-10T10:19:00Z',
      status: 'IN_TRANSIT',
      createdAt: '2026-02-10T10:00:00Z',
      updatedAt: '2026-02-11T12:00:00Z',
    },
    {
      id: 'o5',
      orderNumber: '#1238',
      userId: '1',
      ...item('xm14512b'),
      partnerReward: null,
      buyerName: 'Покупатель 5 (демо)',
      buyerPhone: '+7 900 000-00-15',
      buyerEmail: 'buyer5@example.com',
      paymentId: 'pay_demo05',
      paymentLink: '/pay/pay_demo05',
      paymentStatus: 'PAID',
      paidAt: '2026-02-05T16:00:00Z',
      saleOfferAcceptedAt: '2026-02-05T15:59:00Z',
      status: 'AT_POINT',
      createdAt: '2026-02-05T15:30:00Z',
      updatedAt: '2026-02-12T10:00:00Z',
    },
    {
      id: 'o6',
      orderNumber: '#1235',
      userId: '1',
      ...item('sgts24256b'),
      partnerReward: null,
      buyerName: 'Покупатель 6 (демо)',
      buyerPhone: '+7 900 000-00-16',
      paymentId: 'pay_demo06',
      paymentLink: '/pay/pay_demo06',
      paymentStatus: 'PAID',
      paidAt: '2026-01-25T09:30:00Z',
      saleOfferAcceptedAt: '2026-01-25T09:29:00Z',
      status: 'ISSUED',
      issuedAt: '2026-02-01T16:00:00Z',
      issuedToName: 'Покупатель 6 (демо)',
      issueActUploaded: true,
      createdAt: '2026-01-25T09:00:00Z',
      updatedAt: '2026-02-01T16:00:00Z',
    },
    {
      id: 'o7',
      orderNumber: '#1234',
      userId: '1',
      ...item('xmrn14p256b'),
      partnerReward: null,
      buyerName: 'Покупатель 7 (демо)',
      buyerPhone: '+7 900 000-00-17',
      paymentId: 'pay_demo07',
      paymentLink: '/pay/pay_demo07',
      paymentStatus: 'PENDING',
      status: 'CANCELLED',
      createdAt: '2026-01-22T12:00:00Z',
      updatedAt: '2026-01-24T12:00:00Z',
    },

    // === Демо-партнёр 2 (id: 3) ===
    {
      id: 'o8',
      orderNumber: '#1244',
      userId: '3',
      ...item('sgts25u256b'),
      partnerReward: null,
      buyerName: 'Покупатель 8 (демо)',
      buyerPhone: '+7 900 000-00-18',
      paymentId: 'pay_demo08',
      paymentLink: '/pay/pay_demo08',
      paymentStatus: 'PENDING',
      status: 'CREATED',
      createdAt: '2026-02-16T14:00:00Z',
      updatedAt: '2026-02-16T14:00:00Z',
    },
    {
      id: 'o9',
      orderNumber: '#1242',
      userId: '3',
      ...item('iph15pm256n'),
      partnerReward: null,
      buyerName: 'Покупатель 9 (демо)',
      buyerPhone: '+7 900 000-00-19',
      paymentId: 'pay_demo09',
      paymentLink: '/pay/pay_demo09',
      paymentStatus: 'PAID',
      paidAt: '2026-02-13T12:00:00Z',
      saleOfferAcceptedAt: '2026-02-13T11:59:00Z',
      status: 'AT_POINT',
      createdAt: '2026-02-13T11:30:00Z',
      updatedAt: '2026-02-19T12:00:00Z',
    },
    {
      id: 'o10',
      orderNumber: '#1237',
      userId: '3',
      ...item('macbookairm3256'),
      partnerReward: null,
      buyerName: 'Покупатель 10 (демо)',
      buyerPhone: '+7 900 000-00-20',
      paymentId: 'pay_demo10',
      paymentLink: '/pay/pay_demo10',
      paymentStatus: 'PAID',
      paidAt: '2026-02-01T10:00:00Z',
      saleOfferAcceptedAt: '2026-02-01T09:59:00Z',
      status: 'ISSUED',
      issuedAt: '2026-02-08T16:00:00Z',
      issuedToName: 'Покупатель 10 (демо)',
      issueActUploaded: true,
      createdAt: '2026-02-01T09:30:00Z',
      updatedAt: '2026-02-08T16:00:00Z',
    },
  ]
}

/* ── Пользователи ── */

export const mockUsers: User[] = load<User[]>(USERS_KEY) ?? (DEMO_MODE ? demoUsers() : [])

export function saveUsers(): void {
  storage.setItem(USERS_KEY, JSON.stringify(mockUsers))
}

/** Изменить данные пользователя (анкета, статус проверки) и сохранить */
export function updateUser(id: string, patch: Partial<User>): User | null {
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx < 0) return null
  mockUsers[idx] = { ...mockUsers[idx], ...patch }
  saveUsers()
  return mockUsers[idx]
}

/* ── Заказы ── */

let orderCounter = parseInt(storage.getItem(COUNTER_KEY) || '1245', 10)

export function getNextOrderNumber(): string {
  orderCounter++
  storage.setItem(COUNTER_KEY, String(orderCounter))
  return `#${orderCounter}`
}

/** Демо-заказы: вознаграждение — процент Партнёра от цены товара, как в новом заказе */
function demoOrdersWithReward(): Order[] {
  const users = demoUsers()
  return demoOrders().map((o) => ({
    ...o,
    partnerReward: rewardFor(o.price, users.find((u) => u.id === o.userId)?.rewardPercent),
  }))
}

export const mockOrders: Order[] = load<Order[]>(ORDERS_KEY) ?? (DEMO_MODE ? demoOrdersWithReward() : [])

export function saveOrders(): void {
  storage.setItem(ORDERS_KEY, JSON.stringify(mockOrders))
}

if (!storage.getItem(ORDERS_KEY)) saveOrders()
if (!storage.getItem(USERS_KEY)) saveUsers()
