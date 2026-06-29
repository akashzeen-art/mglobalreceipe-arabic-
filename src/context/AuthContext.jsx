import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { COUNTRY_CODE, cpLogin, formatMsisdn, parseLoginResponse } from '../services/authApi.js'

const STORAGE_KEY = 'iq_zain_session'

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.response === 'ACTIVE' ? parsed : null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  const saveSession = useCallback((next) => {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setSession(next)
    } else {
      localStorage.removeItem(STORAGE_KEY)
      setSession(null)
    }
  }, [])

  const loginWithMobile = useCallback(async (localNumber) => {
    const msisdn = formatMsisdn(localNumber)
    if (msisdn.length <= COUNTRY_CODE.length) {
      return { active: false, error: 'يرجى إدخال رقم جوال صالح.' }
    }

    try {
      const data = await cpLogin(msisdn)
      const result = parseLoginResponse({ ...data, msisdn: data.msisdn ?? msisdn })

      if (result.active) {
        saveSession({ ...result.session, msisdn })
        return { active: true, session: result.session }
      }

      if (result.redirectURL) {
        saveSession(null)
        return { active: false, redirectURL: result.redirectURL }
      }

      return { active: false, error: result.error ?? 'فشل تسجيل الدخول.' }
    } catch (err) {
      return { active: false, error: err.message ?? 'حدث خطأ غير متوقع.' }
    }
  }, [saveSession])

  const verifyAccess = useCallback(async () => {
    if (!session?.msisdn) {
      return { active: false }
    }

    try {
      const data = await cpLogin(session.msisdn)
      const result = parseLoginResponse({ ...data, msisdn: session.msisdn })

      if (result.active) {
        const updated = { ...result.session, msisdn: session.msisdn }
        saveSession(updated)
        return { active: true, session: updated }
      }

      saveSession(null)

      if (result.redirectURL) {
        return { active: false, redirectURL: result.redirectURL }
      }

      return { active: false, error: result.error }
    } catch (err) {
      return { active: false, error: err.message }
    }
  }, [session, saveSession])

  const logout = useCallback(() => saveSession(null), [saveSession])

  const value = useMemo(
    () => ({
      session,
      isActive: session?.response === 'ACTIVE',
      loginWithMobile,
      verifyAccess,
      logout,
    }),
    [session, loginWithMobile, verifyAccess, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
