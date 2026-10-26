import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { mockUsers, updateUser, findUserByEmail, isDemoUser, DEMO_MODE } from '../data/mock'
import { hashPassword } from '../utils/password'
import { useDataRevision } from '../utils/store'
import { api, type PartnerProfile } from '../lib/api'
import { clearPartnerOrders } from '../data/partnerOrders'

/*
 * Вход в кабинет партнёра.
 * Боевой сайт: учётки на сервере заказов (api/server.mjs) — их заводит сотрудник, одобряя заявку; вход держится в cookie,
 * войти можно с любого устройства. Демо-режим (utils/demo.ts): учётки в этом браузере (data/mock.ts), как раньше.
 */

const SESSION_KEY = 'techagent_user'

interface AuthContextType {
  user: User | null
  /** Сервер ещё не ответил, вошёл ли партнёр (только боевой сайт) */
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  /** Первый вход: свой пароль вместо временного (если нужен) и согласие с офертой. Возвращает текст ошибки или null */
  completeFirstLogin: (password: string | null) => Promise<string | null>
  logout: () => void
  /** Изменить данные своей учётки; patch может быть функцией от актуальной записи.
   *  На боевом сайте партнёр сам меняет только контакты — остальное через partners@techagent.pro */
  updateProfile: (data: Partial<User> | ((fresh: User) => Partial<User> | null)) => User | null
}

const AuthContext = createContext<AuthContextType | null>(null)

/** Учётка с сервера в формате кабинета. Сервер заводит только подтверждённых партнёров */
function fromServer(p: PartnerProfile): User {
  return {
    id: `p${p.id}`,
    email: p.email,
    role: 'CLIENT',
    companyName: p.companyName,
    inn: p.inn,
    ogrn: p.ogrn,
    phone: p.phone,
    contactName: p.contactName,
    pointAddress: p.pointAddress,
    mapPoint: p.point ?? null,
    rewardPercentNext: p.rewardPercentNext ?? undefined,
    rewardPercentNextFrom: p.rewardPercentNextFrom ?? undefined,
    pointVisible: Boolean(p.pointVisible),
    bankName: p.bankName,
    bik: p.bik,
    account: p.account,
    partnerStatus: 'VERIFIED',
    rewardPercent: p.rewardPercent,
    mustChangePassword: p.mustChangePassword,
    offerAcceptedAt: p.offerAcceptedAt ?? undefined,
    createdAt: p.createdAt,
  }
}

/** Кто вошёл — по cookie сервера. null — не вошёл или это не партнёр (покупатель, сотрудник) */
async function loadPartner(): Promise<User | null> {
  try {
    const r = await api<{ role: string | null; partner?: PartnerProfile }>('/me')
    return r.role === 'partner' && r.partner ? fromServer(r.partner) : null
  } catch {
    return null
  }
}

/** В сессии — только id и email: данные учётки всегда берутся из актуальных записей */
function storeSession(u: User | null) {
  try {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id, email: u.email }))
    else localStorage.removeItem(SESSION_KEY)
  } catch { /* storage недоступен */ }
}

/** Сохранённая сессия. Сессии учёток, которых больше нет (например, демо в боевой сборке), сбрасываем */
function restoreSession(): string | null {
  if (!DEMO_MODE) return null
  try {
    const saved = localStorage.getItem(SESSION_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved) as { id?: string; email?: string }
    const found = mockUsers.find((u) => u.id === parsed.id && u.email === parsed.email)
    if (found) return found.id
    localStorage.removeItem(SESSION_KEY)
  } catch { /* storage недоступен (пререндер) или данные повреждены */ }
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(restoreSession)
  const [serverUser, setServerUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(!DEMO_MODE)
  // Учётку могли изменить в другой вкладке (например, ТехЭйджент подтвердил анкету) — берём актуальную запись
  useDataRevision()
  const user = DEMO_MODE ? (userId ? (mockUsers.find((u) => u.id === userId) ?? null) : null) : serverUser

  const refresh = async (): Promise<User | null> => {
    const u = await loadPartner()
    setServerUser(u)
    setLoading(false)
    return u
  }

  useEffect(() => {
    if (DEMO_MODE) return
    let alive = true
    loadPartner().then((u) => {
      if (!alive) return
      setServerUser(u)
      setLoading(false)
    })
    return () => { alive = false }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!password.trim()) return false
    if (!DEMO_MODE) {
      try {
        await api('/auth/partner', { email: email.trim(), password })
        return Boolean(await refresh())
      } catch {
        return false
      }
    }
    const found = findUserByEmail(email)
    if (!found) return false
    if (found.passwordHash) {
      if ((await hashPassword(found.id, password)) !== found.passwordHash) return false
    } else if (!isDemoUser(found)) {
      // Учётка заведена до проверки паролей: первый вход задаёт пароль
      updateUser(found.id, { passwordHash: await hashPassword(found.id, password) })
    }
    setUserId(found.id)
    storeSession(found)
    return true
  }

  const completeFirstLogin = async (password: string | null): Promise<string | null> => {
    if (!user) return 'Войдите ещё раз'
    if (!DEMO_MODE) {
      try {
        const r = await api<{ partner: PartnerProfile }>('/partner/activate', { ...(password ? { password } : {}), acceptOffer: true })
        setServerUser(fromServer(r.partner))
        return null
      } catch {
        return 'Не получилось сохранить. Проверьте интернет и попробуйте ещё раз.'
      }
    }
    if (password) updateUser(user.id, { passwordHash: await hashPassword(user.id, password), mustChangePassword: false })
    updateUser(user.id, (fresh) => (fresh.offerAcceptedAt ? null : { offerAcceptedAt: new Date().toISOString() }))
    return null
  }

  const updateProfile = (data: Partial<User> | ((fresh: User) => Partial<User> | null)): User | null => {
    if (DEMO_MODE) return userId ? updateUser(userId, data) : null
    if (!serverUser) return null
    const patch = typeof data === 'function' ? data(serverUser) : data
    if (!patch) return serverUser
    const next = { ...serverUser, ...patch }
    setServerUser(next)
    if (patch.contactName !== undefined || patch.phone !== undefined) {
      api<{ partner: PartnerProfile }>('/partner/profile', { contactName: next.contactName, phone: next.phone })
        .then((r) => setServerUser(fromServer(r.partner)))
        .catch(() => void refresh())
    }
    return next
  }

  const logout = () => {
    setUserId(null)
    storeSession(null)
    if (!DEMO_MODE) {
      setServerUser(null)
      clearPartnerOrders()
      void api('/auth/logout', {}).catch(() => undefined)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, completeFirstLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
