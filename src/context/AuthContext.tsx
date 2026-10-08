import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { mockUsers, saveUsers, updateUser } from '../data/mock'

const SESSION_KEY = 'techagent_user'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  /** Регистрация Партнёра: анкета уходит на проверку ТехЭйджент (partnerStatus = 'PENDING') */
  register: (data: RegisterData) => Promise<'ok' | 'email_taken'>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  isLoading: boolean
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

function storeSession(u: User | null) {
  try {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u))
    else localStorage.removeItem(SESSION_KEY)
  } catch { /* storage недоступен */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as User
        // Берём актуальную запись: статус проверки мог поменять ТехЭйджент.
        // Сессии учёток, которых больше нет (например, демо в боевой сборке), сбрасываем.
        const fresh = mockUsers.find((u) => u.id === parsed.id && u.email === parsed.email)
        if (fresh) {
          setUser(fresh)
          storeSession(fresh)
        } else {
          storeSession(null)
        }
      }
    } catch { /* corrupted data */ }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!password.trim()) return false
    const found = mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (found) {
      setUser(found)
      storeSession(found)
      return true
    }
    return false
  }

  const register = async (data: RegisterData): Promise<'ok' | 'email_taken'> => {
    const email = data.email.trim()
    if (mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())) return 'email_taken'
    const newUser: User = {
      id: crypto.randomUUID(),
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
      createdAt: new Date().toISOString(),
    }
    mockUsers.push(newUser)
    saveUsers()
    setUser(newUser)
    storeSession(newUser)
    return 'ok'
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updated = updateUser(user.id, data) ?? { ...user, ...data }
    setUser(updated)
    storeSession(updated)
  }

  const logout = () => {
    setUser(null)
    storeSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
