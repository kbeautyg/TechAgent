export type Role = 'CLIENT' | 'ADMIN'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'

export type OrderStatus =
  | 'CREATED'
  | 'PAID'
  | 'PURCHASING'
  | 'PURCHASED'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'

export type DocumentType = 'CONTRACT' | 'ACT' | 'REPORT' | 'OFFER' | 'PRIVACY' | 'TERMS'

export interface User {
  id: string
  email: string
  role: Role
  companyName?: string
  inn?: string
  ogrnip?: string
  phone?: string
  cargoName?: string
  cargoContact?: string
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  productName: string
  productCost: number
  commission: number
  totalCost: number
  isTradeIn: boolean
  oldProduct?: string
  oldValue?: number
  clientPayment?: number
  ipPayment?: number
  clientName: string
  clientPhone: string
  clientEmail?: string
  paymentId: string
  paymentLink: string
  paymentStatus: PaymentStatus
  paidAt?: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
  user?: User
}

export interface Document {
  id: string
  userId: string
  type: DocumentType
  title: string
  fileUrl: string
  createdAt: string
  content?: string
}

export interface OrderCalculation {
  productCost: number
  commission: number
  totalCost: number
  isTradeIn: boolean
  oldValue?: number
  clientPayment?: number
  ipPayment?: number
}

export interface Stats {
  totalOrders: number
  totalRevenue: number
  totalCommission: number
  activeOrders: number
  pendingPayments: number
  inDelivery: number
  totalUsers?: number
}
