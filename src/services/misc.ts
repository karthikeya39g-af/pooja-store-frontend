import { festivals, offers } from '../data/festivals'
import { storeConfig } from '../data/config'
import type { Festival, Offer } from '../types'
import { api, delay, isMockMode } from './client'

export async function getOffers(): Promise<Offer[]> {
  if (!isMockMode) return api<Offer[]>('/offers')
  await delay(150); return offers
}
export async function getFestivals(): Promise<Festival[]> {
  if (!isMockMode) return api<Festival[]>('/festivals')
  return festivals.filter((f) => f.active)
}
export async function getStoreSettings() {
  if (!isMockMode) return api<typeof storeConfig>('/store-settings')
  return storeConfig
}
export const subscribeNewsletter = (email: string) => api<{ ok: true }>('/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
export const sendContact = (b: { name: string; email: string; message: string }) => api<{ ok: true }>('/contact', { method: 'POST', body: JSON.stringify(b) })
