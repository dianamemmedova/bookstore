import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api, ApiError, AUTH_EXPIRED_EVENT, tokenStore } from '../lib/api'

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
  marketingOptIn?: boolean
}

interface AuthResult { user: AuthUser; token: string }

interface AuthContextType {
  user: AuthUser | null
  loading: boolean // səhifə açılanda token yoxlanana qədər true
  login: (email: string, password: string) => Promise<void> // xəta olsa ApiError atır
  register: (input: RegisterInput) => Promise<void>
  logout: (onLogout?: () => void) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  // Token varsa əvvəl onu yoxlayırıq, yoxdursa gözləməyə ehtiyac yoxdur
  const [loading, setLoading] = useState(() => tokenStore.get() !== null)

  // Səhifə yenilənəndə girişi bərpa et
  useEffect(() => {
    if (!tokenStore.get()) return
    let cancelled = false
    api<AuthUser>('/me')
      .then((me) => { if (!cancelled) setUser(me) })
      .catch((error) => {
        // Yalnız token etibarsızdırsa sil; server söndürülübsə token qalsın
        if (error instanceof ApiError && error.status === 401) tokenStore.clear()
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Başqa sorğuda 401 gəlsə (token vaxtı bitib) istifadəçini çıxar
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<AuthResult>('/auth/login', { method: 'POST', body: { email, password }, auth: false })
    tokenStore.set(res.token)
    setUser(res.user)
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    const res = await api<AuthResult>('/auth/register', { method: 'POST', body: input, auth: false })
    tokenStore.set(res.token)
    setUser(res.user)
  }, [])

  const logout = useCallback((onLogout?: () => void) => {
    tokenStore.clear()
    setUser(null)
    onLogout?.()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)