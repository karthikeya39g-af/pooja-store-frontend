import type { Address, Order } from '../types'
import { api } from './client'

export interface CreateOrderInput { address: Address; lines: { productId: string; qty: number }[] }

/** Backend recalculates all prices, discounts and stock. Never trust client totals. */
export const createOrder = (input: CreateOrderInput) => api<{ orderId: string }>('/orders', { method: 'POST', body: JSON.stringify(input) })
export const myOrders = () => api<Order[]>('/orders/my')
