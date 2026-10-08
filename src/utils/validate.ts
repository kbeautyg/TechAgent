/*
 * Проверки полей — одни и те же в анкете партнёра, в профиле и в новом заказе.
 * Каждая функция ...Error возвращает текст ошибки или null, если всё верно.
 */

/** Только цифры: вставка «4070 2810 9000 0000 1234» даёт 20 цифр */
export function onlyDigits(value: string, max?: number): string {
  const d = value.replace(/\D/g, '')
  return max ? d.slice(0, max) : d
}

const weighted = (digits: string, weights: number[]) => weights.reduce((s, w, i) => s + w * Number(digits[i]), 0)

/* ── ИНН ── */

/** ИНН: 10 цифр у организации, 12 — у предпринимателя; контрольные числа по алгоритму ФНС */
export function isValidInn(inn: string): boolean {
  if (/^\d{10}$/.test(inn)) {
    return (weighted(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10 === Number(inn[9])
  }
  if (/^\d{12}$/.test(inn)) {
    const n11 = (weighted(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10
    const n12 = (weighted(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10
    return n11 === Number(inn[10]) && n12 === Number(inn[11])
  }
  return false
}

export function innError(inn: string): string | null {
  if (!inn) return 'Укажите ИНН'
  if (!/^(\d{10}|\d{12})$/.test(inn)) return 'ИНН — 10 цифр у организации или 12 цифр у предпринимателя'
  if (!isValidInn(inn)) return 'В ИНН ошибка: не сходится контрольное число'
  return null
}

/* ── ОГРН / ОГРНИП ── */

/** ОГРН — 13 цифр, ОГРНИП — 15; последняя цифра — остаток от деления на 11 (на 13 у ОГРНИП) */
export function isValidOgrn(ogrn: string): boolean {
  if (/^\d{13}$/.test(ogrn)) return (Number(ogrn.slice(0, 12)) % 11) % 10 === Number(ogrn[12])
  if (/^\d{15}$/.test(ogrn)) return (Number(ogrn.slice(0, 14)) % 13) % 10 === Number(ogrn[14])
  return false
}

export function ogrnError(ogrn: string, inn: string): string | null {
  if (!ogrn) return 'Укажите ОГРН или ОГРНИП'
  if (!/^(\d{13}|\d{15})$/.test(ogrn)) return 'ОГРН — 13 цифр, ОГРНИП — 15 цифр'
  if (inn.length === 10 && ogrn.length !== 13) return 'У организации (ИНН из 10 цифр) — ОГРН из 13 цифр'
  if (inn.length === 12 && ogrn.length !== 15) return 'У предпринимателя (ИНН из 12 цифр) — ОГРНИП из 15 цифр'
  if (!isValidOgrn(ogrn)) return `В ${ogrn.length === 15 ? 'ОГРНИП' : 'ОГРН'} ошибка: не сходится контрольная цифра`
  return null
}

/* ── Банк ── */

/** БИК российского банка: 9 цифр, начинается с 04 */
export function bikError(bik: string): string | null {
  if (!bik) return 'Укажите БИК'
  if (!/^\d{9}$/.test(bik)) return 'БИК — 9 цифр'
  if (!bik.startsWith('04')) return 'БИК российского банка начинается с 04'
  return null
}

/** Контрольный ключ счёта по БИК (алгоритм Банка России): 3 последние цифры БИК + 20 цифр счёта,
 *  веса 7-1-3; для счетов в РКЦ вместо них — «0» и 5–6-я цифры БИК */
export function accountMatchesBik(account: string, bik: string): boolean {
  if (!/^\d{20}$/.test(account) || !/^\d{9}$/.test(bik)) return false
  const tail = bik.slice(6)
  const prefix = ['000', '001', '002'].includes(tail) ? `0${bik.slice(4, 6)}` : tail
  const s = prefix + account
  const w = [7, 1, 3]
  let sum = 0
  for (let i = 0; i < s.length; i++) sum += (Number(s[i]) * w[i % 3]) % 10
  return sum % 10 === 0
}

export function accountError(account: string, bik: string): string | null {
  if (!account) return 'Укажите расчётный счёт'
  if (!/^\d{20}$/.test(account)) return 'Расчётный счёт — 20 цифр'
  if (bikError(bik)) return null // сначала исправить БИК — ошибка показана у него
  if (!accountMatchesBik(account, bik)) return 'Счёт не сходится с БИК: проверьте номер счёта и БИК'
  return null
}

/* ── Телефон ── */

/** Российский номер: 11 цифр с 7 или 8 впереди либо 10 цифр. Возвращает 10 цифр без кода страны */
function nationalPhone(value: string): string | null {
  const d = value.replace(/\D/g, '')
  if (d.length === 11 && (d[0] === '7' || d[0] === '8')) return d.slice(1)
  if (d.length === 10) return d
  return null
}

/** +7 900 000-00-00; неверный номер возвращается как есть */
export function formatPhone(value: string): string {
  const n = nationalPhone(value)
  return n ? `+7 ${n.slice(0, 3)} ${n.slice(3, 6)}-${n.slice(6, 8)}-${n.slice(8)}` : value.trim()
}

export function phoneError(value: string): string | null {
  if (!value.trim()) return 'Укажите телефон'
  if (!nationalPhone(value)) return 'Нужен российский номер: +7 и 10 цифр'
  return null
}

/* ── Email ── */

export function isValidEmail(value: string): boolean {
  const s = value.trim()
  const at = s.indexOf('@')
  if (s.length > 254 || at < 1 || at !== s.lastIndexOf('@')) return false
  const local = s.slice(0, at)
  const domain = s.slice(at + 1)
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false
  if (!/^[\p{L}\p{N}!#$%&'*+/=?^_`{|}~.-]+$/u.test(local)) return false
  const labels = domain.split('.')
  if (labels.length < 2) return false
  if (!labels.every((l) => /^[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?$/u.test(l))) return false
  const tld = labels[labels.length - 1]
  return /^\p{L}{2,}$/u.test(tld) || /^xn--[a-z0-9-]+$/i.test(tld)
}

export function emailError(value: string): string | null {
  if (!value.trim()) return 'Укажите email'
  if (!isValidEmail(value)) return 'Введите корректный email'
  return null
}

/* ── Анкета партнёра ── */

export interface PartnerFields {
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
}

export type PartnerErrors = Partial<Record<keyof PartnerFields, string>>

/** Ошибки анкеты. only — проверить только эти поля (у подтверждённого партнёра меняются только контакты) */
export function partnerErrors(f: PartnerFields, only?: (keyof PartnerFields)[]): PartnerErrors {
  const all: Record<keyof PartnerFields, string | null> = {
    companyName: f.companyName.trim() ? null : 'Укажите наименование',
    inn: innError(f.inn),
    ogrn: ogrnError(f.ogrn, f.inn),
    pointAddress: f.pointAddress.trim() ? null : 'Укажите адрес пункта выдачи',
    contactName: f.contactName.trim() ? null : 'Укажите контактное лицо',
    phone: phoneError(f.phone),
    email: emailError(f.email),
    bankName: f.bankName.trim() ? null : 'Укажите банк',
    bik: bikError(f.bik),
    account: accountError(f.account, f.bik),
  }
  const errors: PartnerErrors = {}
  for (const k of only ?? (Object.keys(all) as (keyof PartnerFields)[])) {
    const e = all[k]
    if (e) errors[k] = e
  }
  return errors
}
