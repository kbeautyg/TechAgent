import { useEffect, useSyncExternalStore } from 'react'
import { api, type BuyerProfile } from '../lib/api'

/*
 * Кто вошёл на сайт через сервер заказов: покупатель (по коду на email) или сотрудник ТехЭйджент (/staff).
 * Это отдельно от кабинета партнёра (AuthContext): у партнёра свой вход.
 * Ответ сервера кэшируем на страницу; refreshAccount() — после входа, выхода и правки профиля.
 */

export interface AccountState {
  /** false — сервер ещё не ответил */
  loaded: boolean
  role: 'buyer' | 'staff' | null
  buyer: BuyerProfile | null
}

let state: AccountState = { loaded: false, role: null, buyer: null }
let pending: Promise<void> | null = null
const listeners = new Set<() => void>()

function set(next: AccountState) {
  state = next
  for (const l of listeners) l()
}

export function refreshAccount(): Promise<void> {
  pending = api<{ role: 'buyer' | 'staff' | null; buyer?: BuyerProfile }>('/me')
    .then((r) => set({ loaded: true, role: r.role, buyer: r.buyer ?? null }))
    .catch(() => set({ loaded: true, role: null, buyer: null }))
  return pending
}

const SERVER_STATE: AccountState = { loaded: false, role: null, buyer: null }

/** Состояние входа. Первый вызов на странице спрашивает сервер */
export function useAccount(): AccountState {
  const s = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
    () => SERVER_STATE,
  )
  useEffect(() => {
    if (!state.loaded && !pending) void refreshAccount()
  }, [])
  return s
}

export async function logoutAccount(): Promise<void> {
  await api('/auth/logout', {}).catch(() => undefined)
  set({ loaded: true, role: null, buyer: null })
}
