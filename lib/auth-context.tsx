'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface License {
  key: string
  product: string
  type: 'Standart' | 'Profesyonel' | 'Kurumsal'
  status: 'active' | 'expired' | 'suspended'
  purchasedAt: string
  expiresAt: string
  domain: string
  downloadUrl: string
  version: string
}

export interface SupportTicket {
  id: string
  subject: string
  message: string
  status: 'open' | 'in-progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  replies: { from: 'user' | 'support'; message: string; createdAt: string }[]
}

export interface User {
  id: string
  name: string
  firstName: string
  lastName: string
  username: string
  email: string
  phone?: string
  phoneVerified?: boolean
  avatar?: string
  provider?: 'email' | 'google' | 'facebook'
  joinedAt: string
  licenses: License[]
  supportTickets: SupportTicket[]
}

export interface UpdateUserPayload {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  phone?: string
  phoneVerified?: boolean
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithProvider: (provider: 'google' | 'facebook') => Promise<{ success: boolean; error?: string }>
  logout: () => void
  verifyLicense: (key: string) => License | null
  updateUser: (payload: UpdateUserPayload) => Promise<{ success: boolean; error?: string }>
  createSupportTicket: (subject: string, message: string, priority: SupportTicket['priority']) => Promise<{ success: boolean; error?: string }>
  sendPhoneVerification: (phone: string) => Promise<{ success: boolean; error?: string }>
  verifyPhone: (code: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USERS_KEY = 'wte_users'
const MOCK_SESSION_KEY = 'wte_session'

const DEMO_LICENSES: License[] = [
  {
    key: 'WTE-2024-THEME-A1B2-C3D4',
    product: 'RestoPro WordPress Teması',
    type: 'Profesyonel',
    status: 'active',
    purchasedAt: '2024-11-01',
    expiresAt: '2025-11-01',
    domain: 'example.com',
    downloadUrl: '#',
    version: '2.4.1',
  },
  {
    key: 'WTE-2024-PLUG-E5F6-G7H8',
    product: 'SEO Master Eklentisi',
    type: 'Kurumsal',
    status: 'active',
    purchasedAt: '2024-10-15',
    expiresAt: '2025-10-15',
    domain: 'mybusiness.com.tr',
    downloadUrl: '#',
    version: '1.9.3',
  },
  {
    key: 'WTE-2023-SCRP-I9J0-K1L2',
    product: 'E-Ticaret Hazır Script',
    type: 'Standart',
    status: 'expired',
    purchasedAt: '2023-06-20',
    expiresAt: '2024-06-20',
    domain: 'demostore.net',
    downloadUrl: '#',
    version: '3.1.0',
  },
]

const DEMO_TICKETS: SupportTicket[] = [
  {
    id: 'ticket_001',
    subject: 'RestoPro teması kurulum sorunu',
    message: 'Temayı kurduktan sonra menü sayfası görünmüyor. Yardımcı olur musunuz?',
    status: 'closed',
    priority: 'medium',
    createdAt: '2024-11-10',
    updatedAt: '2024-11-11',
    replies: [
      { from: 'support', message: 'Merhaba! WordPress menü ayarlarından "Birincil Menü" seçeneğini etkinleştirin.', createdAt: '2024-11-11' },
      { from: 'user', message: 'Teşekkürler, sorun çözüldü!', createdAt: '2024-11-11' },
    ],
  },
]

type StoredUser = User & { password: string }

function getMockUsers(): StoredUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  const demo: StoredUser[] = [
    {
      id: 'user_demo_1',
      firstName: 'Demo',
      lastName: 'Kullanıcı',
      name: 'Demo Kullanıcı',
      username: 'demokullanici',
      email: 'demo@webtasarimevi.com',
      password: 'demo1234',
      provider: 'email',
      joinedAt: '2024-09-01',
      licenses: DEMO_LICENSES,
      supportTickets: DEMO_TICKETS,
    },
  ]
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(demo))
  return demo
}

function saveMockUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

function stripPassword(u: StoredUser): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _p, ...safe } = u
  return safe
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Temp phone verification state (in memory only)
  const [pendingPhone, setPendingPhone] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MOCK_SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        const users = getMockUsers()
        const found = users.find((u) => u.id === session.userId)
        if (found) setUser(stripPassword(found))
      }
    } catch {}
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    const users = getMockUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return { success: false, error: 'E-posta veya şifre hatalı.' }
    const safe = stripPassword(found)
    setUser(safe)
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ userId: found.id }))
    return { success: true }
  }, [])

  const register = useCallback(async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    const users = getMockUsers()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' }
    }
    if (users.find((u) => u.username?.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Bu kullanıcı adı zaten alınmış.' }
    }
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      username,
      email,
      password,
      provider: 'email',
      joinedAt: new Date().toISOString().split('T')[0],
      licenses: [],
      supportTickets: [],
    }
    users.push(newUser)
    saveMockUsers(users)
    setUser(stripPassword(newUser))
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ userId: newUser.id }))
    return { success: true }
  }, [])

  const loginWithProvider = useCallback(async (provider: 'google' | 'facebook') => {
    await new Promise((r) => setTimeout(r, 1000))
    const email = `${provider}_user@webtasarimevi.com`
    const users = getMockUsers()
    let found = users.find((u) => u.email === email)
    if (!found) {
      const providerName = provider === 'google' ? 'Google' : 'Facebook'
      const newUser: StoredUser = {
        id: `user_${provider}_1`,
        firstName: providerName,
        lastName: 'Kullanıcı',
        name: `${providerName} Kullanıcı`,
        username: `${provider}kullanici`,
        email,
        password: '',
        provider,
        joinedAt: new Date().toISOString().split('T')[0],
        licenses: DEMO_LICENSES.slice(0, 1),
        supportTickets: [],
      }
      users.push(newUser)
      saveMockUsers(users)
      found = newUser
    }
    setUser(stripPassword(found))
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ userId: found.id }))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(MOCK_SESSION_KEY)
  }, [])

  const verifyLicense = useCallback((key: string): License | null => {
    const users = getMockUsers()
    for (const u of users) {
      const lic = u.licenses?.find((l) => l.key.trim().toUpperCase() === key.trim().toUpperCase())
      if (lic) return lic
    }
    return null
  }, [])

  const updateUser = useCallback(async (payload: UpdateUserPayload): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600))
    if (!user) return { success: false, error: 'Oturum açık değil.' }
    const users = getMockUsers()
    const idx = users.findIndex((u) => u.id === user.id)
    if (idx === -1) return { success: false, error: 'Kullanıcı bulunamadı.' }

    // Username uniqueness check
    if (payload.username && payload.username !== users[idx].username) {
      const taken = users.find((u) => u.username?.toLowerCase() === payload.username!.toLowerCase() && u.id !== user.id)
      if (taken) return { success: false, error: 'Bu kullanıcı adı zaten alınmış.' }
    }
    // Email uniqueness check
    if (payload.email && payload.email !== users[idx].email) {
      const taken = users.find((u) => u.email.toLowerCase() === payload.email!.toLowerCase() && u.id !== user.id)
      if (taken) return { success: false, error: 'Bu e-posta zaten kayıtlı.' }
    }

    const updated: StoredUser = {
      ...users[idx],
      ...payload,
      name: `${payload.firstName ?? users[idx].firstName} ${payload.lastName ?? users[idx].lastName}`,
    }
    users[idx] = updated
    saveMockUsers(users)
    setUser(stripPassword(updated))
    return { success: true }
  }, [user])

  const createSupportTicket = useCallback(async (subject: string, message: string, priority: SupportTicket['priority']): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 700))
    if (!user) return { success: false, error: 'Oturum açık değil.' }
    const users = getMockUsers()
    const idx = users.findIndex((u) => u.id === user.id)
    if (idx === -1) return { success: false, error: 'Kullanıcı bulunamadı.' }
    const ticket: SupportTicket = {
      id: `ticket_${Date.now()}`,
      subject,
      message,
      status: 'open',
      priority,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      replies: [],
    }
    users[idx].supportTickets = [...(users[idx].supportTickets ?? []), ticket]
    saveMockUsers(users)
    setUser(stripPassword(users[idx]))
    return { success: true }
  }, [user])

  const sendPhoneVerification = useCallback(async (phone: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800))
    setPendingPhone(phone)
    // In a real app, SMS would be sent here. Code is always "123456" for demo.
    return { success: true }
  }, [])

  const verifyPhone = useCallback(async (code: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800))
    if (code !== '123456') return { success: false, error: 'Doğrulama kodu hatalı. (Demo: 123456)' }
    if (!pendingPhone) return { success: false, error: 'Önce telefon numarası girin.' }
    const result = await updateUser({ phone: pendingPhone, phoneVerified: true })
    if (result.success) setPendingPhone(null)
    return result
  }, [pendingPhone, updateUser])

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, register, loginWithProvider, logout,
      verifyLicense, updateUser,
      createSupportTicket,
      sendPhoneVerification, verifyPhone,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
