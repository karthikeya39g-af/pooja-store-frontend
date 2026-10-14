import { api } from './client'

/** 1) create order on server  2) open Razorpay with returned id  3) POST signature to /verify */
export const createPaymentOrder = (orderId: string) =>
  api<{ razorpayOrderId: string; amount: number; currency: string; keyId: string }>('/payments/create-order', { method: 'POST', body: JSON.stringify({ orderId }) })
export const verifyPayment = (payload: { orderId: string; razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
  api<{ status: 'paid' | 'failed' }>('/payments/verify', { method: 'POST', body: JSON.stringify(payload) })
