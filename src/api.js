import { useCallback, useEffect, useState } from 'react'

const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8010').replace(/\/$/, '')
const TOKEN_KEY = 'kigo.crm.token'

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY) || '' } catch { return '' }
}
export const setToken = (t) => {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch { /* storage blocked */ }
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

// 401 anywhere means the session ended: App listens and shows the login screen.
export const SESSION_EXPIRED = 'kigo:session-expired'

export async function api(path, { method = 'GET', body, params } = {}) {
  const url = new URL(BASE + path)
  Object.entries(params || {}).forEach(([k, v]) => v !== undefined && v !== null && v !== '' && url.searchParams.set(k, v))
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) })
  } catch {
    throw new ApiError(0, 'Server bilan aloqa yo‘q')
  }
  const data = await res.json().catch(() => null)
  if (res.status === 401 && path !== '/api/admin/me') window.dispatchEvent(new Event(SESSION_EXPIRED))
  if (!res.ok) {
    const detail = data?.detail
    throw new ApiError(res.status, typeof detail === 'string' ? detail : 'Xatolik yuz berdi')
  }
  return data
}

/** Load `path` into state; `reload` refetches, `setData` updates locally after a mutation. */
export function useApi(path, params) {
  const [state, setState] = useState({ data: null, error: null })
  const key = JSON.stringify(params || {})
  const load = useCallback(() => api(path, { params })
    .then((data) => setState({ data, error: null }))
    .catch((error) => setState((s) => ({ ...s, error }))),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [path, key])
  useEffect(() => { load() }, [load])
  const setData = (d) => setState((s) => ({ ...s, data: typeof d === 'function' ? d(s.data) : d }))
  return { ...state, reload: load, setData }
}
