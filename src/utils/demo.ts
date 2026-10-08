/*
 * Демо-режим кабинета.
 *
 * Сборка для разработки (npm run dev) или с флагом VITE_DEMO=1 — демо всегда.
 * На боевом сайте демо включается только в одном браузере — через тестовый вход /demo
 * (на эту страницу не ведёт ни одна ссылка сайта). Тогда в этом браузере появляются демо-учётки,
 * заказы, документы и переписка; обычные посетители их не видят. «Выйти из теста» всё стирает.
 */

const FLAG_KEY = 'techagent_demo'

/** Ключи localStorage с данными кабинета: при входе в тест и выходе из него стираются */
const DATA_KEYS = [
  'techagent_user',
  'techagent_users_v2',
  'techagent_orders_v2',
  'techagent_order_counter',
  'techagent_partner_docs_v1',
  'techagent_doc_reviews_v1',
  'techagent_doc_revoked_v1',
  'techagent_applications_v1',
]

export const BUILD_DEMO: boolean = import.meta.env.DEV || import.meta.env.VITE_DEMO === '1'

function readFlag(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(FLAG_KEY) === '1'
  } catch {
    return false
  }
}

/** Тестовый вход на боевом сайте (в сборке без демо) */
export const DEMO_SESSION: boolean = !BUILD_DEMO && readFlag()

export const DEMO_MODE: boolean = BUILD_DEMO || DEMO_SESSION

/** Демо-учётки для тестового входа: id из демо-данных (data/mock.ts) */
export const DEMO_ACCOUNTS = {
  partner: { id: '1', email: 'demo@techagent.pro', home: '/dashboard' },
  admin: { id: '2', email: 'admin@techagent.pro', home: '/admin' },
} as const

function clearData(): void {
  for (const key of DATA_KEYS) localStorage.removeItem(key)
}

/** Войти в тест: чистые демо-данные в этом браузере и сразу в нужный кабинет.
 *  Полная перезагрузка — данные кабинета читаются при загрузке страницы */
export function startDemo(as: keyof typeof DEMO_ACCOUNTS): void {
  const acc = DEMO_ACCOUNTS[as]
  clearData()
  localStorage.setItem(FLAG_KEY, '1')
  localStorage.setItem('techagent_user', JSON.stringify({ id: acc.id, email: acc.email }))
  window.location.replace(acc.home)
}

/** Выйти из теста: стереть демо-данные и вернуть сайт к обычному виду */
export function endDemo(): void {
  clearData()
  localStorage.removeItem(FLAG_KEY)
  window.location.replace('/')
}
