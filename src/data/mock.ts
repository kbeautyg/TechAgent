import type { User, Order } from '../types'

const ORDERS_KEY = 'techagent_orders'
const COUNTER_KEY = 'techagent_order_counter'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@techagent.pro',
    role: 'CLIENT',
    companyName: 'Партнёр Демонов Д.Д.',
    inn: '770312345678',
    ogrnip: '321774600012345',
    phone: '+7 999 123-45-67',
    cargoName: 'Cargo Express',
    cargoContact: '+7 800 555-00-01',
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
    email: 'ivanov@ip.ru',
    role: 'CLIENT',
    companyName: 'Партнёр Иванов И.И.',
    inn: '770498765432',
    ogrnip: '321774600098765',
    phone: '+7 999 888-77-66',
    cargoName: 'FastCargo',
    cargoContact: '+7 800 100-20-03',
    createdAt: '2026-01-20T10:00:00Z',
  },
]

/* localStorage недоступен при пререндере (Node) — используем безопасный шим */
const storage: Pick<Storage, 'getItem' | 'setItem'> =
  typeof localStorage !== 'undefined'
    ? localStorage
    : { getItem: () => null, setItem: () => undefined }

let orderCounter = parseInt(storage.getItem(COUNTER_KEY) || '1245', 10)

export function getNextOrderNumber(): string {
  orderCounter++
  storage.setItem(COUNTER_KEY, String(orderCounter))
  return `#${orderCounter}`
}

export function saveOrders(): void {
  storage.setItem(ORDERS_KEY, JSON.stringify(mockOrders))
}

function loadSavedOrders(): Order[] | null {
  try {
    const raw = storage.getItem(ORDERS_KEY)
    if (raw) return JSON.parse(raw) as Order[]
  } catch { /* ignore */ }
  return null
}

const defaultOrders: Order[] = [
  // === Заказы пользователя demo (id: 1) ===
  {
    id: 'o1',
    orderNumber: '#1241',
    userId: '1',
    productName: 'iPhone 15 Pro 256GB Black Titanium',
    productCost: 95000,
    commission: 2850,
    totalCost: 97850,
    isTradeIn: false,
    clientName: 'Петров Алексей',
    clientPhone: '+7 916 555-12-34',
    clientEmail: 'petrov@mail.ru',
    paymentId: 'pay_abc123',
    paymentLink: '/pay/pay_abc123',
    paymentStatus: 'PAID',
    paidAt: '2026-02-12T14:45:00Z',
    status: 'PURCHASING',
    createdAt: '2026-02-12T14:30:00Z',
    updatedAt: '2026-02-12T14:45:00Z',
  },
  {
    id: 'o2',
    orderNumber: '#1240',
    userId: '1',
    productName: 'MacBook Pro M3 14" 512GB',
    productCost: 180000,
    commission: 5400,
    totalCost: 185400,
    isTradeIn: false,
    clientName: 'Кузнецова Анна',
    clientPhone: '+7 925 444-33-22',
    paymentId: 'pay_def456',
    paymentLink: '/pay/pay_def456',
    paymentStatus: 'PAID',
    paidAt: '2026-02-10T10:20:00Z',
    status: 'SHIPPING',
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-11T12:00:00Z',
  },
  {
    id: 'o3',
    orderNumber: '#1238',
    userId: '1',
    productName: 'iPhone 15 128GB Blue',
    productCost: 75000,
    commission: 2250,
    totalCost: 77250,
    isTradeIn: true,
    oldProduct: 'iPhone 13 128GB',
    oldValue: 40000,
    clientPayment: 37250,
    ipPayment: 40000,
    clientName: 'Смирнов Сергей',
    clientPhone: '+7 903 333-22-11',
    paymentId: 'pay_ghi789',
    paymentLink: '/pay/pay_ghi789',
    paymentStatus: 'PAID',
    paidAt: '2026-02-05T16:00:00Z',
    status: 'COMPLETED',
    createdAt: '2026-02-05T15:30:00Z',
    updatedAt: '2026-02-12T10:00:00Z',
  },
  {
    id: 'o4',
    orderNumber: '#1245',
    userId: '1',
    productName: 'Samsung Galaxy S24 Ultra 512GB',
    productCost: 105000,
    commission: 3150,
    totalCost: 108150,
    isTradeIn: false,
    clientName: 'Волкова Мария',
    clientPhone: '+7 926 222-11-00',
    paymentId: 'pay_jkl012',
    paymentLink: '/pay/pay_jkl012',
    paymentStatus: 'PENDING',
    status: 'CREATED',
    createdAt: '2026-02-17T09:00:00Z',
    updatedAt: '2026-02-17T09:00:00Z',
  },
  {
    id: 'o5',
    orderNumber: '#1236',
    userId: '1',
    productName: 'iPad Pro M4 11" 256GB',
    productCost: 85000,
    commission: 2550,
    totalCost: 87550,
    isTradeIn: false,
    clientName: 'Козлов Дмитрий',
    clientPhone: '+7 905 111-00-99',
    paymentId: 'pay_ipad01',
    paymentLink: '/pay/pay_ipad01',
    paymentStatus: 'PAID',
    paidAt: '2026-01-28T11:00:00Z',
    status: 'DELIVERED',
    createdAt: '2026-01-28T10:30:00Z',
    updatedAt: '2026-02-04T14:00:00Z',
  },
  {
    id: 'o6',
    orderNumber: '#1235',
    userId: '1',
    productName: 'AirPods Pro 2',
    productCost: 22000,
    commission: 660,
    totalCost: 22660,
    isTradeIn: false,
    clientName: 'Новикова Елена',
    clientPhone: '+7 917 777-66-55',
    paymentId: 'pay_air01',
    paymentLink: '/pay/pay_air01',
    paymentStatus: 'PAID',
    paidAt: '2026-01-25T09:30:00Z',
    status: 'COMPLETED',
    createdAt: '2026-01-25T09:00:00Z',
    updatedAt: '2026-02-01T16:00:00Z',
  },
  {
    id: 'o7',
    orderNumber: '#1243',
    userId: '1',
    productName: 'MacBook Air M3 15" 256GB',
    productCost: 130000,
    commission: 3900,
    totalCost: 133900,
    isTradeIn: true,
    oldProduct: 'MacBook Air M1',
    oldValue: 55000,
    clientPayment: 78900,
    ipPayment: 55000,
    clientName: 'Соколов Андрей',
    clientPhone: '+7 909 888-77-66',
    paymentId: 'pay_mba01',
    paymentLink: '/pay/pay_mba01',
    paymentStatus: 'PAID',
    paidAt: '2026-02-14T15:00:00Z',
    status: 'PURCHASED',
    createdAt: '2026-02-14T14:30:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },

  // === Заказы пользователя ivanov (id: 3) ===
  {
    id: 'o8',
    orderNumber: '#1239',
    userId: '3',
    productName: 'MacBook Air M3 13" 512GB',
    productCost: 120000,
    commission: 3600,
    totalCost: 123600,
    isTradeIn: false,
    clientName: 'Фёдоров Дмитрий',
    clientPhone: '+7 903 111-00-99',
    paymentId: 'pay_mno345',
    paymentLink: '/pay/pay_mno345',
    paymentStatus: 'PAID',
    paidAt: '2026-02-08T11:00:00Z',
    status: 'DELIVERED',
    createdAt: '2026-02-08T10:30:00Z',
    updatedAt: '2026-02-14T14:00:00Z',
  },
  {
    id: 'o9',
    orderNumber: '#1242',
    userId: '3',
    productName: 'iPhone 15 Pro Max 512GB Natural Titanium',
    productCost: 140000,
    commission: 4200,
    totalCost: 144200,
    isTradeIn: true,
    oldProduct: 'iPhone 14 Pro 256GB',
    oldValue: 65000,
    clientPayment: 79200,
    ipPayment: 65000,
    clientName: 'Морозова Ольга',
    clientPhone: '+7 915 456-78-90',
    paymentId: 'pay_iph15pm',
    paymentLink: '/pay/pay_iph15pm',
    paymentStatus: 'PAID',
    paidAt: '2026-02-13T12:00:00Z',
    status: 'PURCHASING',
    createdAt: '2026-02-13T11:30:00Z',
    updatedAt: '2026-02-13T12:00:00Z',
  },
  {
    id: 'o10',
    orderNumber: '#1244',
    userId: '3',
    productName: 'Samsung Galaxy Z Fold5 512GB',
    productCost: 145000,
    commission: 4350,
    totalCost: 149350,
    isTradeIn: false,
    clientName: 'Лебедев Артём',
    clientPhone: '+7 926 321-54-87',
    paymentId: 'pay_fold5',
    paymentLink: '/pay/pay_fold5',
    paymentStatus: 'PENDING',
    status: 'CREATED',
    createdAt: '2026-02-16T14:00:00Z',
    updatedAt: '2026-02-16T14:00:00Z',
  },
  {
    id: 'o11',
    orderNumber: '#1237',
    userId: '3',
    productName: 'Apple Watch Ultra 2',
    productCost: 68000,
    commission: 2040,
    totalCost: 70040,
    isTradeIn: false,
    clientName: 'Павлова Наталья',
    clientPhone: '+7 917 654-32-10',
    paymentId: 'pay_awu2',
    paymentLink: '/pay/pay_awu2',
    paymentStatus: 'PAID',
    paidAt: '2026-02-01T10:00:00Z',
    status: 'COMPLETED',
    createdAt: '2026-02-01T09:30:00Z',
    updatedAt: '2026-02-08T16:00:00Z',
  },
]

export const mockOrders: Order[] = loadSavedOrders() || [...defaultOrders]

// Persist default orders on first load
if (!storage.getItem(ORDERS_KEY)) {
  saveOrders()
}
