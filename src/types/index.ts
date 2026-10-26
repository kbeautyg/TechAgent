/*
 * Модель «ТехЭйджент — продавец»: ООО «ТехЭйджент» покупает товар у поставщика и продаёт его
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
  /** Причина отклонения анкеты — её видит Партнёр в профиле */
  rejectReason?: string
  /** SHA-256 пароля (с id учётки). У демо-учёток нет: вход по любому непустому паролю */
  passwordHash?: string
  /** Учётку завёл ТехЭйджент по заявке: при первом входе Партнёр задаёт свой пароль */
  mustChangePassword?: boolean
  /** Акцепт агентского договора-оферты — отметка при первом входе в кабинет (оферта, п. 2.1) */
  offerAcceptedAt?: string
  createdAt: string
  /** Когда запись менялась последней — по этому времени сливаются данные из разных вкладок */
  updatedAt?: string
}

/** Обращение покупателя об обмене или возврате, принятое в пункте выдачи (оферта, п. 5.1, 8.4) */
export type BuyerClaimType = 'EXCHANGE' | 'RETURN' | 'DEFECT'

export interface BuyerClaim {
  id: string
  type: BuyerClaimType
  text: string
  /** Фото приложено. В демо храним только отметку */
  photoAttached: boolean
  /** Фото на сервере (боевой кабинет) */
  photoUrl?: string
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
  /** Сколько фото приложено к отметке о повреждении (в демо сами файлы не хранятся) */
  receivedIssuePhotos?: number
  /** Фото повреждения на сервере (боевой кабинет) */
  receivedIssuePhotoUrls?: string[]
  /** Партнёр сообщил покупателю о поступлении — с этой даты товар хранится 5 дней (оферта, п. 8.3) */
  notifiedAt?: string
  /** Заказ отменён ТехЭйджент с возвратом оплаты покупателю */
  refundedAt?: string
  /** Статус, из которого заказ отменён: из пункта выдачи товар остаётся у Партнёра до указания ТехЭйджент */
  cancelledFrom?: OrderStatus
  /** Товар возвращён покупателем после выдачи, деньги возвращены: вознаграждение аннулируется (оферта Партнёру, п. 7.3) */
  returnedAt?: string
  /** Обращения покупателя об обмене и возврате */
  buyerClaims?: BuyerClaim[]
  /** Выдача товара в пункте Партнёра */
  issuedAt?: string
  issuedToName?: string
  /** Загружен подписанный акт приёма-передачи — без него вознаграждение не начисляется */
  issueActUploaded?: boolean
  /** Фото или скан подписанного акта на сервере (боевой кабинет) */
  actUrl?: string
  /** PARTNER — оформил Партнёр в кабинете, SITE — покупатель на сайте выбрал пункт Партнёра: вознаграждения нет (агентская оферта, «Заказ») */
  source?: 'PARTNER' | 'SITE'
  /** ТехЭйджент подтвердил наличие — по ссылке на оплату покупатель уже может заплатить */
  paymentReady?: boolean
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
  /** Заказы, удержание по которым впервые показано в этом отчёте (возврат после выдачи, п. 7.3) */
  deductedOrderIds?: string[]
  /** Сколько удержано по возвратам в этом отчёте: не больше начисленного за период, остаток переносится */
  deductedAmount?: number
  /** Данные бланка отчёта агента и акта — по ним документ печатается в принятой форме */
  agentForm?: AgentDocForm
  /** Данные бланка подтверждения акцепта оферты */
  acceptanceForm?: AcceptanceForm
}

/** Сторона в документе: наименование и реквизиты на дату формирования документа */
export interface DocParty {
  name: string
  /** Строки реквизитов: ИНН и КПП, ОГРН, адрес, банковский счёт */
  details: string[]
  /** Должность и ФИО подписанта, если известны */
  signerTitle?: string
  signerName?: string
}

/** Строка отчёта агента: заказ, товар по которому выдан покупателю */
export interface AgentDocRow {
  orderNumber: string
  product: string
  paidAt?: string
  issuedAt?: string
  buyer: string
  price: number
  percent: number | null
  reward: number | null
}

/** Удержание по заказу, возвращённому после выдачи (оферта, п. 7.3) */
export interface AgentDocReturn {
  orderNumber: string
  returnedAt?: string
  /** Период отчёта, в котором вознаграждение было начислено: 'ГГГГ-ММ' */
  period: string | null
  amount: number
}

/** Бланк отчёта агента и акта за месяц: один набор данных на оба документа */
export interface AgentDocForm {
  /** Номер акта, им же нумеруется отчёт: TA-ГГГГ/ММ-NNN */
  number: string
  /** Дата формирования, ISO */
  date: string
  /** Границы отчётного периода: ДД.ММ.ГГГГ */
  periodFrom: string
  periodTo: string
  /** Дата акцепта агентского договора-оферты, ISO */
  acceptedAt?: string
  agent: DocParty
  principal: DocParty
  rows: AgentDocRow[]
  returns: AgentDocReturn[]
  /** Остаток удержания с прошлых периодов */
  carried: number
  /** Удержано в этом периоде */
  deducted: number
  /** Переносится на следующие периоды */
  carryForward: number
  goodsTotal: number
  accruedTotal: number
  payable: number
}

/** Бланк подтверждения акцепта агентского договора-оферты */
export interface AcceptanceForm {
  partner: DocParty
  principal: DocParty
  /** Доступ в кабинет открыт, ISO */
  openedAt: string
  /** Дата акцепта, ISO */
  acceptedAt: string
  percent?: number
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
