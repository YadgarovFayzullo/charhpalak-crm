import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { api, setToken, SESSION_EXPIRED } from './api.js'

const Ctx = createContext(null)

/** The signed-in staff member (/api/admin/me) and a toast for failed actions. */
export function SessionProvider({ children }) {
  const [me, setMe] = useState(undefined) // undefined = loading, null = signed out
  const [toast, setToast] = useState('')
  const timer = useRef()

  const refresh = useCallback(() => api('/api/admin/me').then(setMe).catch(() => setMe(null)), [])
  useEffect(() => { refresh() }, [refresh])
  useEffect(() => {
    const out = () => { setToken(''); setMe(null) }
    window.addEventListener(SESSION_EXPIRED, out)
    return () => window.removeEventListener(SESSION_EXPIRED, out)
  }, [])

  const showError = (msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 5000)
  }

  /** Run a mutation; errors become a toast. Resolves to the result or undefined. Refreshes sidebar badges. */
  const run = async (fn) => {
    try {
      const r = await fn()
      refresh()
      return r
    } catch (e) {
      showError(e.message)
      return undefined
    }
  }

  const logout = async () => {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => {})
    setToken('')
    setMe(null)
  }

  return <Ctx.Provider value={{ me, refresh, run, logout, error: toast, clearError: () => setToast('') }}>{children}</Ctx.Provider>
}

export const useSession = () => useContext(Ctx)
