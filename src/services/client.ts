import { API_BASE_URL } from '../data/config'

export class BackendUnavailableError extends Error {
  constructor(message = 'The store backend is not connected yet.') {
    super(message)
    this.name = 'BackendUnavailableError'
  }
}

/** True when VITE_API_BASE_URL is empty → services fall back to mock data. */
export const isMockMode = !API_BASE_URL

export const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (isMockMode) throw new BackendUnavailableError()
  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    })
  } catch {
    throw new BackendUnavailableError('Could not reach the store server. Please try again.')
  }
  if (!res.ok) throw new Error((await res.text().catch(() => '')) || `Request failed (${res.status})`)
  return res.json() as Promise<T>
}
