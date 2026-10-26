import type { AgentDocForm } from '../types'

/*
 * Обращения к серверу заказов (api/server.mjs на российском сервере; при разработке vite проксирует /api на localhost:8787).
 * Вход держится в cookie, которую ставит сервер, — в браузере ничего секретного не храним.
 */

export interface SiteOrderItem {
  productId: string
  name: string
  price: number
  qty: number
}

export type SiteOrderStatus = 'NEW' | 'AWAITING_PAYMENT' | 'PAID' | 'SHIPPED' | 'READY' | 'RECEIVED' | 'CANCELLED'

export interface SiteOrderEvent {
  status: SiteOrderStatus
  note: string
  at: string
}

export interface SiteOrder {
  number: string
  status: SiteOrderStatus
  items: SiteOrderItem[]
  goodsTotal: number
  delivery: number
  total: number
  buyerName: string
  phone: string
  email: string
  city: string
  sdekPoint: string
  /** SDEK — пункт СДЭК, PARTNER — пункт выдачи партнёра TechAgent */
  pickupType?: 'SDEK' | 'PARTNER'
  comment: string
  paymentUrl: string
  trackNumber: string
  cancelReason: string
  createdAt: string
  updatedAt: string
  events: SiteOrderEvent[]
  /** Только для сотрудников */
  staffNote?: string
  /** Только для сотрудников: партнёр, в чей пункт едет заказ, и страница оплаты заказа партнёра */
  partner?: { id: number; companyName: string; email: string; phone: string } | null
  payPage?: string
}

export interface BuyerProfile {
  email: string
  name: string
  phone: string
  city: string
  sdekPoint: string
  /** Демо-кабинет с примерами заказов: только просмотр */
  demo?: boolean
}

/** Сводка по партнёру: заказы, выдачи, начисленное, вошедшее в отчёты и выплаченное */
export interface PartnerStats {
  orders: number
  ordersSum: number
  active: number
  siteOrders: number
  issued: number
  issuedSum: number
  accrued: number
  reported: number
  paid: number
  notReported: number
}

/** Учётка партнёра на сервере: заведена сотрудником по одобренной заявке */
export interface PartnerProfile {
  id: number
  email: string
  companyName: string
  inn: string
  ogrn: string
  pointAddress: string
  contactName: string
  phone: string
  bankName: string
  bik: string
  account: string
  rewardPercent: number
  /** Вошёл по временному паролю и ещё не задал свой */
  mustChangePassword: boolean
  /** Когда партнёр сам отметил согласие с агентским договором-офертой (п. 2.1); null — ещё не отметил */
  offerAcceptedAt: string | null
  offerEdition: string
  /** Точка партнёра на карте магазина (код из api/partner-points.json или заведённой сотрудником); пусто — на карте его нет */
  pointCode?: string
  point?: { code: string; name: string; address: string; city: string; workTime: string; lat: number; lon: number } | null
  /** Точка видна покупателям: привязана и оферта принята */
  pointVisible?: boolean
  /** Новый процент вознаграждения и дата, с которой он применяется (уведомление за 14 дней) */
  rewardPercentNext?: number | null
  rewardPercentNextFrom?: string | null
  /** Только для сотрудников: доступ отключён */
  blockedAt?: string | null
  blockReason?: string
  /** Только для сотрудников: сводка по заказам и расчётам */
  stats?: PartnerStats
  createdAt: string
  /** Только для сотрудников: адрес, с которого отмечено согласие */
  offerAcceptIp?: string
}

/** Заказ в кабинете партнёра (/api/partner/orders): заказ сайта плюс то, что сделано в пункте выдачи */
export interface PartnerOrderView extends SiteOrder {
  source: 'PARTNER' | 'SITE'
  rewardPercent: number | null
  reward: number | null
  /** Страница оплаты /pay/<payToken>; у заказа с сайта её нет */
  payToken: string
  paymentReady: boolean
  /** Покупатель отметил согласия на странице оплаты */
  consentAt: string | null
  receivedAt: string | null
  receivedIssue: string
  receivedPhotos: number
  notifiedAt: string | null
  issuedAt: string | null
  issuedToName: string
  actFile: string
  claims: { id: string; type: 'EXCHANGE' | 'RETURN' | 'DEFECT'; text: string; photo: string; createdAt: string }[]
  files: string[]
}

/** Отчёт агента и акт за месяц (/api/partner/reports, /api/staff/reports): бланк без реквизитов ТехЭйджент — их добавляет сайт */
export interface AgentReportView {
  id: number
  partnerId: number
  period: string
  number: string
  form: Omit<AgentDocForm, 'principal'>
  orderNumbers: string[]
  payable: number
  review: { status: 'ACCEPTED' | 'OBJECTED'; at: string; text: string } | null
  revokedAt: string | null
  paid: { at: string; amount: number; note: string } | null
  createdAt: string
  /** Только для сотрудников */
  companyName?: string
}

/** Заявка партнёра с /register — для сотрудников */
export interface PartnerApplicationView {
  id: number
  companyName: string
  inn: string
  ogrn: string
  pointAddress: string
  contactName: string
  phone: string
  email: string
  bankName: string
  bik: string
  account: string
  comment: string
  status: 'NEW' | 'APPROVED' | 'DECLINED'
  declineReason: string
  partnerId: number | null
  createdAt: string
}

export class ApiError extends Error {
  status: number
  fields?: string[]
  constructor(status: number, code: string, fields?: string[]) {
    super(code)
    this.status = status
    this.fields = fields
  }
}

export async function api<T>(path: string, body?: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      credentials: 'same-origin',
      headers: body === undefined ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, 'network')
  }
  const json = (await res.json().catch(() => null)) as (T & { error?: string; fields?: string[] }) | null
  if (!res.ok || !json) throw new ApiError(res.status, json?.error || 'server', json?.fields)
  return json
}

/** Понятный текст ошибки для человека */
export function apiErrorText(e: unknown): string {
  if (!(e instanceof ApiError)) return 'Что-то пошло не так. Попробуйте ещё раз.'
  switch (e.message) {
    case 'network': return 'Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.'
    case 'rate': return 'Слишком много попыток. Подождите немного и попробуйте снова.'
    case 'code_wrong': return 'Неверный код. Проверьте письмо и введите код ещё раз.'
    case 'code_expired': return 'Код устарел. Запросите новый.'
    case 'password_wrong': return 'Неверный пароль.'
    case 'staff_not_configured': return 'Вход для сотрудников ещё не настроен.'
    case 'auth': return 'Войдите ещё раз.'
    case 'not_found': return 'Не найдено — обновите страницу.'
    case 'email_taken': return 'Партнёр с этим email уже есть.'
    case 'decided': return 'По заявке уже есть решение — обновите страницу.'
    case 'fields': return 'Проверьте заполненные поля.'
    case 'offer': return 'Сначала отметьте согласие с агентским договором-офертой.'
    case 'bad_transition': return 'Этап заказа уже изменился — обновите страницу.'
    case 'too_large': return 'Файл слишком большой. Сделайте фото ещё раз или выберите файл меньше 10 МБ.'
    case 'point_taken': return 'К этой точке уже привязан другой партнёр.'
    case 'blocked': return 'Доступ в кабинет отключён. Напишите на partners@techagent.pro.'
    case 'exists': return 'За этот месяц отчёт уже сформирован.'
    case 'empty': return 'За этот месяц нет выданных заказов с загруженным актом — формировать нечего.'
    default: return 'Что-то пошло не так. Попробуйте ещё раз.'
  }
}
