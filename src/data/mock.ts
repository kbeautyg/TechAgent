import type { User, Order } from '../types'
import { products } from './products'
import { rewardFor, rewardPercentAt } from '../utils/calculate'
import {
  storage,
  readJson,
  writeJson,
  mergeById,
  replaceArray,
  notifyDataChanged,
  onOtherTabChange,
} from '../utils/store'

/*
 * Данные кабинета: бэкенда нет, всё хранится в памяти и localStorage (см. utils/store.ts —
 * слияние данных из нескольких вкладок).
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

for (const key of LEGACY_KEYS) storage.removeItem(key)

/* ── Демо-данные (только DEMO_MODE) ── */

function demoUsers(): User[] {
  return [
    {
      id: '1',
      email: 'demo@techagent.pro',
      role: 'CLIENT',
      companyName: 'Демо-партнёр 1',
      inn: '0000000000',
      ogrn: '0000000000000',
      phone: '+7 900 000-00-01',
      contactName: 'Контактное лицо (демо)',
      pointAddress: 'г. Москва, ул. Демонстрационная, д. 1',
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
      inn: '0000000000',
      ogrn: '0000000000000',
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
      receivedAt: '2026-02-12T10:00:00Z',
      notifiedAt: '2026-02-12T11:00:00Z',
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
      receivedAt: '2026-01-31T10:00:00Z',
      notifiedAt: '2026-01-31T11:00:00Z',
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
      receivedAt: '2026-02-19T12:00:00Z',
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
      receivedAt: '2026-02-07T10:00:00Z',
      notifiedAt: '2026-02-07T11:00:00Z',
      issuedAt: '2026-02-08T16:00:00Z',
      issuedToName: 'Покупатель 10 (демо)',
      issueActUploaded: true,
      createdAt: '2026-02-01T09:30:00Z',
      updatedAt: '2026-02-08T16:00:00Z',
    },
  ]
}

/** Демо-учётки: вход по любому непустому паролю (пока им не задан свой) */
const DEMO_USER_IDS = new Set(['1', '2', '3', '4'])

export function isDemoUser(u: User): boolean {
  return DEMO_MODE && DEMO_USER_IDS.has(u.id) && !u.passwordHash
}

/* ── Пользователи ── */

const userStamp = (u: User) => u.updatedAt ?? u.createdAt
const byCreatedAsc = (a: { createdAt: string }, b: { createdAt: string }) => a.createdAt.localeCompare(b.createdAt)

export const mockUsers: User[] = readJson<User[]>(USERS_KEY) ?? (DEMO_MODE ? demoUsers() : [])

/** Перечитать учётки из localStorage и слить с памятью (другая вкладка могла их изменить) */
function syncUsers(): void {
  const stored = readJson<User[]>(USERS_KEY)
  if (stored) replaceArray(mockUsers, mergeById(mockUsers, stored, userStamp).sort(byCreatedAsc))
}

export function saveUsers(): void {
  syncUsers()
  writeJson(USERS_KEY, mockUsers)
  notifyDataChanged()
}

/** Учётка по email — по актуальным данным */
export function findUserByEmail(email: string): User | undefined {
  syncUsers()
  const e = email.trim().toLowerCase()
  return mockUsers.find((u) => u.email.toLowerCase() === e)
}

export function addUser(user: User): void {
  syncUsers()
  mockUsers.push({ ...user, updatedAt: user.updatedAt ?? user.createdAt })
  saveUsers()
}

/** Изменить данные пользователя (анкета, статус проверки) и сохранить.
 *  patch может быть функцией от актуальной записи; null — ничего не менять */
export function updateUser(id: string, patch: Partial<User> | ((fresh: User) => Partial<User> | null)): User | null {
  syncUsers()
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx < 0) return null
  const data = typeof patch === 'function' ? patch(mockUsers[idx]) : patch
  if (!data) return null
  mockUsers[idx] = { ...mockUsers[idx], ...data, updatedAt: new Date().toISOString() }
  saveUsers()
  return mockUsers.find((u) => u.id === id) ?? null
}

/** Изменение процента вознаграждения подтверждённого Партнёра (оферта, п. 7.1):
 *  новый размер применяется к заказам, оформленным через 14 дней после изменения */
export const REWARD_CHANGE_NOTICE_DAYS = 14

export function scheduleRewardChange(id: string, percent: number): User | null {
  const from = new Date()
  from.setDate(from.getDate() + REWARD_CHANGE_NOTICE_DAYS)
  return updateUser(id, (u) => ({
    // Если прежнее изменение уже вступило в силу — оно становится текущим размером
    rewardPercent: rewardPercentAt(u),
    rewardPercentNext: percent,
    rewardPercentNextFrom: from.toISOString(),
  }))
}

/* ── Заказы ── */

/** Демо-заказы: вознаграждение — процент Партнёра от цены товара, как в новом заказе */
function demoOrdersWithReward(): Order[] {
  const users = demoUsers()
  return demoOrders().map((o) => {
    const percent = users.find((u) => u.id === o.userId)?.rewardPercent
    return { ...o, rewardPercent: percent, partnerReward: rewardFor(o.price, percent) }
  })
}

const orderStamp = (o: Order) => o.updatedAt ?? o.createdAt
const byCreatedDesc = (a: Order, b: Order) => b.createdAt.localeCompare(a.createdAt)

/** Все заказы, новые сверху */
export const mockOrders: Order[] = readJson<Order[]>(ORDERS_KEY) ?? (DEMO_MODE ? demoOrdersWithReward() : [])

function syncOrders(): void {
  const stored = readJson<Order[]>(ORDERS_KEY)
  if (stored) replaceArray(mockOrders, mergeById(mockOrders, stored, orderStamp).sort(byCreatedDesc))
}

export function saveOrders(): void {
  syncOrders()
  writeJson(ORDERS_KEY, mockOrders)
  notifyDataChanged()
}

const orderNo = (o: Order) => parseInt(o.orderNumber.replace(/\D/g, ''), 10) || 0

/** Новый заказ: номер выдаётся по свежим данным — две вкладки не получат одинаковый */
export function createOrder(draft: Omit<Order, 'orderNumber'>): Order {
  syncOrders()
  const stored = parseInt(storage.getItem(COUNTER_KEY) || '', 10)
  const last = Math.max(Number.isNaN(stored) ? 1245 : stored, ...mockOrders.map(orderNo))
  storage.setItem(COUNTER_KEY, String(last + 1))
  const order: Order = { ...draft, orderNumber: `#${last + 1}` }
  mockOrders.unshift(order)
  saveOrders()
  return order
}

/** Изменить заказ. Данные перечитываются перед изменением; guard проверяет актуальный заказ —
 *  статус мог поменяться в другой вкладке. Тогда изменение не применяется (null), а страница перерисовывается */
export function updateOrder(
  id: string,
  patch: Partial<Order> | ((fresh: Order) => Partial<Order>),
  guard?: (fresh: Order) => boolean,
): Order | null {
  syncOrders()
  const idx = mockOrders.findIndex((o) => o.id === id)
  if (idx < 0) return null
  const fresh = mockOrders[idx]
  if (guard && !guard(fresh)) {
    notifyDataChanged()
    return null
  }
  const data = typeof patch === 'function' ? patch(fresh) : patch
  mockOrders[idx] = { ...fresh, ...data, updatedAt: new Date().toISOString() }
  saveOrders()
  return mockOrders.find((o) => o.id === id) ?? null
}

if (!storage.getItem(ORDERS_KEY)) writeJson(ORDERS_KEY, mockOrders)
if (!storage.getItem(USERS_KEY)) writeJson(USERS_KEY, mockUsers)

/* Заказы и учётки изменили в другой вкладке — перечитать */
onOtherTabChange([ORDERS_KEY, USERS_KEY], () => {
  syncOrders()
  syncUsers()
})
