import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import {
  AUTH_USER_STORAGE_KEY,
  getStoredAuthUser,
  type AuthUser,
} from './authStorage'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredAuthUser())

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(AUTH_USER_STORAGE_KEY)
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      login: setUser,
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
