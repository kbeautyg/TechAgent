import { DEMO_MODE } from '../utils/demo'
import { readJson, writeJson, mergeById, replaceArray, notifyDataChanged, onOtherTabChange } from '../utils/store'

/*
 * Заявки партнёров. Самостоятельной регистрации нет: человек оставляет заявку на /register,
 * ТехЭйджент проверяет данные и сам заводит партнёра в кабинет (админка → «Партнёры»).
 *
 * На боевом сайте заявка уходит на сервер (/api/partner-application, nginx на srv91) и приходит письмом
 * на partners@techagent.pro. В демо-режиме бэкенда нет: заявка сохраняется в этом браузере
 * и видна в админке — так можно пройти весь путь «заявка → партнёр» руками.
 */

export interface PartnerApplication {
  id: string
  companyName: string
  inn: string
  /** ОГРН или ОГРНИП */
  ogrn: string
  pointAddress: string
  contactName: string
  phone: string
  email: string
  bankName: string
  bik: string
  account: string
  comment?: string
  /** NEW — ждёт решения; DONE — партнёр заведён; DECLINED — отказано */
  status: 'NEW' | 'DONE' | 'DECLINED'
  /** Учётка, заведённая по заявке */
  userId?: string
  createdAt: string
  updatedAt: string
}

export type ApplicationData = Omit<PartnerApplication, 'id' | 'status' | 'userId' | 'createdAt' | 'updatedAt'>

const KEY = 'techagent_applications_v1'

/** Демо-заявка: вымышленные реквизиты с верными контрольными цифрами — по ней можно завести партнёра */
function demoApplications(): PartnerApplication[] {
  return [
    {
      id: 'app-demo-1',
      companyName: 'ИП Демо-заявитель (демонстрационные данные)',
      inn: '770000000082',
      ogrn: '304770000000008',
      pointAddress: 'г. Москва, ул. Демонстрационная, д. 3',
      contactName: 'Контактное лицо (демо)',
      phone: '+7 900 000-00-03',
      email: 'demo3@techagent.pro',
      bankName: 'Банк (демо)',
      bik: '044599999',
      account: '40802810000000000006',
      comment: 'Магазин электроники у метро, работаем с 10 до 21',
      status: 'NEW',
      createdAt: '2026-02-18T10:00:00Z',
      updatedAt: '2026-02-18T10:00:00Z',
    },
  ]
}

const stamp = (a: PartnerApplication) => a.updatedAt
const byNewest = (a: PartnerApplication, b: PartnerApplication) => b.createdAt.localeCompare(a.createdAt)

/** Заявки в этом браузере (только демо-режим), новые сверху */
export const applications: PartnerApplication[] = DEMO_MODE ? (readJson<PartnerApplication[]>(KEY) ?? demoApplications()) : []

function sync(): void {
  const stored = readJson<PartnerApplication[]>(KEY)
  if (stored) replaceArray(applications, mergeById(applications, stored, stamp).sort(byNewest))
}

function save(): void {
  sync()
  writeJson(KEY, applications)
  notifyDataChanged()
}

if (DEMO_MODE) onOtherTabChange([KEY], sync)

export function updateApplication(id: string, patch: Partial<PartnerApplication>): void {
  sync()
  const idx = applications.findIndex((a) => a.id === id)
  if (idx < 0) return
  applications[idx] = { ...applications[idx], ...patch, updatedAt: new Date().toISOString() }
  save()
}

/** Отправить заявку. Боевой сайт — на сервер (письмо на partners@techagent.pro), демо — в этот браузер */
export async function submitApplication(data: ApplicationData): Promise<boolean> {
  if (DEMO_MODE) {
    const now = new Date().toISOString()
    sync()
    applications.unshift({ ...data, id: crypto.randomUUID(), status: 'NEW', createdAt: now, updatedAt: now })
    save()
    return true
  }
  try {
    const res = await fetch('/api/partner-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null
    return res.ok && json?.ok === true
  } catch {
    return false
  }
}
