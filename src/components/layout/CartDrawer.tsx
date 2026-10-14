import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { findProducts } from '../../hooks/useProductsByIds'
import { inr } from '../../lib/format'
import { estimate } from '../../lib/pricing'
import { useCart } from '../../store'
import { ArtGlyph } from '../decor/Glyphs'
import { ProductImage } from '../ui/ProductImage'
import { Qty } from '../ui/common'

export function useCartLines() {
  const lines = useCart((s) => s.lines)
  const items = lines.map((l) => ({ ...l, product: findProducts([l.productId])[0] })).filter((l) => l.product)
  const subtotal = items.reduce((a, l) => a + l.product.price * l.qty, 0)
  return { items, ...estimate(subtotal) }
}

export function CartDrawer() {
  const { open, setOpen, setQty, remove } = useCart()
  const { items, subtotal, delivery, total } = useCartLines()
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open, setOpen])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-maroon-900/60" />
          <motion.aside role="dialog" aria-modal="true" aria-label="Shopping cart" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', ease: [0.22, 0.8, 0.3, 1], duration: 0.4 }} className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ivory-100 shadow-lift">
            <div className="flex items-center justify-between bg-maroon-500 px-5 py-4 text-ivory-100">
              <h2 className="flex items-center gap-2 text-2xl font-bold"><ShoppingBag className="h-5 w-5" />Your Cart</h2>
              <button aria-label="Close cart" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-maroon-400"><X className="h-6 w-6" /></button>
            </div>
            {items.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <ArtGlyph kind="plate" className="h-28 w-28" />
                <p className="mt-3 font-display text-2xl font-bold text-maroon-600">Your cart is empty</p>
                <p className="text-sm text-maroon-700/80">Add a few sacred essentials to begin.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn btn-primary mt-5">Start Shopping</Link>
              </motion.div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ product: p, qty }) => (
                      <motion.li key={p.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }} className="card flex gap-3 overflow-hidden p-2">
                        <ProductImage src={p.images[0]} alt={p.name} className="h-20 w-20 shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <Link to={`/product/${p.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 font-display text-lg font-bold leading-tight text-maroon-700">{p.name}</Link>
                          <p className="text-sm font-semibold text-maroon-600">{inr(p.price)}</p>
                          <div className="mt-1 flex items-center justify-between"><Qty size="sm" value={qty} onChange={(n) => setQty(p.id, n)} /><button aria-label={`Remove ${p.name}`} onClick={() => remove(p.id)} className="rounded-full p-2 text-maroon-500 hover:bg-maroon-50"><Trash2 className="h-4 w-4" /></button></div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="space-y-1 border-t border-maroon-100 bg-white p-4 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Delivery (estimate)</span><span>{delivery ? inr(delivery) : 'Free'}</span></div>
                  <div className="flex justify-between pt-1 text-lg font-bold text-maroon-600"><span>Total</span><span>{inr(total)}</span></div>
                  <p className="text-xs text-maroon-700/70">Final prices and stock are confirmed at checkout.</p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link to="/cart" onClick={() => setOpen(false)} className="btn btn-outline">View Cart</Link>
                    <Link to="/checkout" onClick={() => setOpen(false)} className="btn btn-primary">Checkout</Link>
                  </div>
                  <button onClick={() => setOpen(false)} className="w-full pt-2 text-center text-xs font-semibold text-maroon-500 underline">Continue shopping</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
