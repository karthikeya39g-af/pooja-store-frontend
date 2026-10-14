import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLine } from '../types'

interface CartState {
  lines: CartLine[]
  open: boolean
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  setOpen: (o: boolean) => void
}
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (id, qty = 1) => set((s) => {
        const ex = s.lines.find((l) => l.productId === id)
        return { lines: ex ? s.lines.map((l) => (l.productId === id ? { ...l, qty: Math.min(l.qty + qty, 99) } : l)) : [...s.lines, { productId: id, qty }] }
      }),
      setQty: (id, qty) => set((s) => ({ lines: qty <= 0 ? s.lines.filter((l) => l.productId !== id) : s.lines.map((l) => (l.productId === id ? { ...l, qty: Math.min(qty, 99) } : l)) })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.productId !== id) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    { name: 'ssmps-cart', partialize: (s) => ({ lines: s.lines }) },
  ),
)

interface WishState { ids: string[]; toggle: (id: string) => boolean }
export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const had = get().ids.includes(id)
        set({ ids: had ? get().ids.filter((x) => x !== id) : [...get().ids, id] })
        return !had
      },
    }),
    { name: 'ssmps-wishlist' },
  ),
)

export interface Toast { id: number; text: string; tone: 'success' | 'info' | 'error' }
interface ToastState { toasts: Toast[]; push: (text: string, tone?: Toast['tone']) => void; dismiss: (id: number) => void }
let tid = 0
export const useToasts = create<ToastState>((set, get) => ({
  toasts: [],
  push: (text, tone = 'success') => {
    const id = ++tid
    set({ toasts: [...get().toasts.slice(-2), { id, text, tone }] })
    setTimeout(() => get().dismiss(id), 3200)
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}))
