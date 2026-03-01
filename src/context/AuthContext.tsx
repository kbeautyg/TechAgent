import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { mockUsers } from '../data/mock'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  isLoading: boolean
}

export interface RegisterData {
  companyName: string
  inn: string
  ogrnip: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('techagent_user')
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch { /* corrupted data */ }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!password.trim()) return false
    const found = mockUsers.find((u) => u.email === email)
    if (found) {
      setUser(found)
      localStorage.setItem('techagent_user', JSON.stringify(found))
      return true
    }
    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    // Check if email already exists
    if (mockUsers.find(u => u.email === data.email)) return false
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      role: 'CLIENT',
      companyName: data.companyName,
      inn: data.inn,
      ogrnip: data.ogrnip,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    }
    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem('techagent_user', JSON.stringify(newUser))
    return true
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem('techagent_user', JSON.stringify(updated))
    // Also update in mockUsers array
    const idx = mockUsers.findIndex(u => u.id === user.id)
    if (idx >= 0) mockUsers[idx] = updated
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('techagent_user')
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
