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
  /** Вознаграждение Партнёра, % от цены товара. Задаёт ТехЭйджент при подтверждении анкеты; видит только сам Партнёр */
  rewardPercent?: number
  /** Новый размер вознаграждения (оферта, п. 7.1): применяется к заказам, оформленным начиная с rewardPercentNextFrom —
   *  через 14 дней после изменения */
  rewardPercentNext?: number
  rewardPercentNextFrom?: string
  createdAt: string
}

/** Обращение покупателя об обмене или возврате, принятое в пункте выдачи (оферта, п. 5.1, 8.4) */
export type BuyerClaimType = 'EXCHANGE' | 'RETURN' | 'DEFECT'

export interface BuyerClaim {
  id: string
  type: BuyerClaimType
  text: string
  /** Фото приложено. Бэкенда нет — храним только отметку */
  photoAttached: boolean
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
  /** Вознаграждение Партнёра от ТехЭйджент, считается по rewardPercent Партнёра; null — размер Партнёру не назначен */
  partnerReward: number | null
  /** Процент, по которому посчитано вознаграждение (действовал на дату оформления заказа) */
  rewardPercent?: number
  buyerName: string
  buyerPhone: string
  buyerEmail?: string
  paymentId: string
  paymentLink: string
  paymentStatus: PaymentStatus
  paidAt?: string
  /** Когда Покупатель принял оферту купли-продажи (отметка перед оплатой) */
  saleOfferAcceptedAt?: string
  /** Когда Покупатель дал согласие на обработку персональных данных — отдельная отметка перед оплатой */
  pdConsentAt?: string
  status: OrderStatus
  /** Приёмка товара в пункте выдачи Партнёром (оферта, п. 5.1, 8.2) */
  receivedAt?: string
  /** Повреждение упаковки или расхождение в количестве мест, отмеченное при приёмке */
  receivedIssue?: string
  /** К отметке о повреждении приложено фото (храним только отметку) */
  receivedIssuePhoto?: boolean
  /** Партнёр сообщил покупателю о поступлении — с этой даты товар хранится 5 дней (оферта, п. 8.3) */
  notifiedAt?: string
  /** Заказ отменён ТехЭйджент с возвратом оплаты покупателю */
  refundedAt?: string
  /** Обращения покупателя об обмене и возврате */
  buyerClaims?: BuyerClaim[]
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
  /** Отчётный период отчёта агента и акта: 'ГГГГ-ММ' */
  period?: string
  /** Заказы, вошедшие в отчёт агента и акт */
  orderIds?: string[]
}

/** Решение Партнёра по отчёту агента или акту (оферта, п. 7.5) */
export interface DocumentReview {
  status: 'ACCEPTED' | 'OBJECTED'
  at: string
  /** Текст возражений */
  text?: string
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
