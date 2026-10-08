import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { mockUsers, addUser, updateUser, findUserByEmail, isDemoUser } from '../data/mock'
import { useDataRevision } from '../utils/store'

const SESSION_KEY = 'techagent_user'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  /** Регистрация Партнёра: анкета уходит на проверку ТехЭйджент (partnerStatus = 'PENDING') */
  register: (data: RegisterData) => Promise<'ok' | 'email_taken'>
  logout: () => void
  /** Изменить данные своей учётки; patch может быть функцией от актуальной записи */
  updateProfile: (data: Partial<User> | ((fresh: User) => Partial<User> | null)) => User | null
}

/** Анкета Партнёра */
export interface RegisterData {
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
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null)

/** В сессии — только id и email: данные учётки всегда берутся из актуальных записей */
function storeSession(u: User | null) {
  try {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id, email: u.email }))
    else localStorage.removeItem(SESSION_KEY)
  } catch { /* storage недоступен */ }
}

/** Сохранённая сессия. Сессии учёток, которых больше нет (например, демо в боевой сборке), сбрасываем */
function restoreSession(): string | null {
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

/** SHA-256 от id учётки и пароля: пароль в открытом виде не хранится */
async function hashPassword(userId: string, password: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${userId}:${password}`))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(restoreSession)
  // Учётку могли изменить в другой вкладке (например, ТехЭйджент подтвердил анкету) — берём актуальную запись
  useDataRevision()
  const user = userId ? (mockUsers.find((u) => u.id === userId) ?? null) : null

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!password.trim()) return false
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

  const register = async (data: RegisterData): Promise<'ok' | 'email_taken'> => {
    const email = data.email.trim()
    const id = crypto.randomUUID()
    const passwordHash = await hashPassword(id, data.password)
    if (findUserByEmail(email)) return 'email_taken'
    const now = new Date().toISOString()
    const newUser: User = {
      id,
      email,
      role: 'CLIENT',
      companyName: data.companyName.trim(),
      inn: data.inn,
      ogrn: data.ogrn,
      pointAddress: data.pointAddress.trim(),
      contactName: data.contactName.trim(),
      phone: data.phone.trim(),
      bankName: data.bankName.trim(),
      bik: data.bik,
      account: data.account,
      partnerStatus: 'PENDING',
      passwordHash,
      createdAt: now,
      updatedAt: now,
    }
    addUser(newUser)
    setUserId(id)
    storeSession(newUser)
    return 'ok'
  }

  const updateProfile = (data: Partial<User> | ((fresh: User) => Partial<User> | null)): User | null =>
    userId ? updateUser(userId, data) : null

  const logout = () => {
    setUserId(null)
    storeSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
