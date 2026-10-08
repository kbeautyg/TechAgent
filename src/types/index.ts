/*
 * Модель «ТехЭйджент — продавец»: ОсОО «ТехЭйджент» покупает товар у поставщика и продаёт его
 * Покупателю; Партнёр — агент ТехЭйджент и пункт выдачи, денег Покупателя не получает.
 */

/** CLIENT — Партнёр (агент и пункт выдачи), ADMIN — сотрудник ТехЭйджент */
export type Role = 'CLIENT' | 'ADMIN'

/** Проверка Партнёра ТехЭйджент до первого заказа */
export type PartnerStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'

/** создан → оплачен → выкуплен у поставщика → в пути → прибыл в пункт выдачи → выдан покупателю */
export type OrderStatus =
  | 'CREATED'
  | 'PAID'
  | 'PURCHASED'
  | 'IN_TRANSIT'
  | 'AT_POINT'
  | 'ISSUED'
  | 'CANCELLED'

export type DocumentType =
  | 'CONTRACT'
  | 'ACT'
  | 'REPORT'
  | 'OFFER'
  | 'SALE_OFFER'
  | 'PRIVACY'
  | 'TERMS'
  | 'PAYMENT'

export interface User {
  id: string
  email: string
  role: Role
  /** Наименование Партнёра */
  companyName?: string
  inn?: string
  /** ОГРН или ОГРНИП */
  ogrn?: string
  phone?: string
  /** Контактное лицо */
  contactName?: string
  /** Адрес пункта выдачи */
  pointAddress?: string
  /** Реквизиты для выплаты вознаграждения */
  bankName?: string
  bik?: string
  account?: string
  partnerStatus?: PartnerStatus
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  /** Партнёр, оформивший заказ (пункт выдачи) */
  userId: string
  productId?: string
  productName: string
  /** Цена товара для Покупателя, её устанавливает ТехЭйджент. Это и есть сумма к оплате */
  price: number
  /** Вознаграждение Партнёра от ТехЭйджент; null — размер ещё не определён ({{PARTNER_REWARD}}) */
  partnerReward: number | null
  buyerName: string
  buyerPhone: string
  buyerEmail?: string
  paymentId: string
  paymentLink: string
  paymentStatus: PaymentStatus
  paidAt?: string
  /** Когда Покупатель принял оферту купли-продажи (отметка перед оплатой) */
  saleOfferAcceptedAt?: string
  status: OrderStatus
  /** Выдача товара в пункте Партнёра */
  issuedAt?: string
  issuedToName?: string
  /** Загружен подписанный акт приёма-передачи — без него вознаграждение не начисляется */
  issueActUploaded?: boolean
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

export interface Stats {
  totalOrders: number
  totalRevenue: number
  totalReward: number
  activeOrders: number
  pendingPayments: number
  inDelivery: number
  totalUsers?: number
}
