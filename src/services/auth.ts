import { api } from './client'

export interface User { id: string; name: string; email: string; phone?: string }
export const login = (b: { email: string; password: string }) => api<User>('/auth/login', { method: 'POST', body: JSON.stringify(b) })
export const register = (b: { name: string; email: string; phone: string; password: string }) => api<User>('/auth/register', { method: 'POST', body: JSON.stringify(b) })
export const forgotPassword = (b: { email: string }) => api<{ ok: true }>('/auth/forgot-password', { method: 'POST', body: JSON.stringify(b) })
export const me = () => api<User>('/auth/me')
export const logout = () => api<{ ok: true }>('/auth/logout', { method: 'POST' })
