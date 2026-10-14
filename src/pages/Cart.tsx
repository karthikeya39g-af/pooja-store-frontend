import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartLines } from '../components/layout/CartDrawer'
import { EmptyState, Qty } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { ProductImage } from '../components/ui/ProductImage'
import { inr } from '../lib/format'
import { useCart } from '../store'

export function Summary({ subtotal, delivery, total }: { subtotal: number; delivery: number; total: number }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
      <div className="flex justify-between"><span>Delivery (estimate)</span><span>{delivery ? inr(delivery) : 'Free'}</span></div>
      <div className="flex justify-between border-t border-maroon-100 pt-2 text-xl font-bold text-maroon-600"><span>Total</span><span>{inr(total)}</span></div>
    </div>
  )
}

export default function CartPage() {
  const { items, ...totals } = useCartLines()
  const { setQty, remove } = useCart()
  return (
    <>
      <PageHeader title="Your Cart" crumbs={[{ label: 'Cart' }]} />
      <div className="container-x py-8">
        {items.length === 0 ? <EmptyState title="Your cart is empty" text="Explore our collections to find sacred essentials." action={<Link to="/shop" className="btn btn-primary">Continue Shopping</Link>} /> : (
          <div className="grid gap-8 lg:grid-cols-[1fr,22rem]">
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map(({ product: p, qty }) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 60 }} className="card flex min-w-0 gap-3 p-3">
                    <ProductImage src={p.images[0]} alt={p.name} className="h-24 w-24 shrink-0 rounded-xl" />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div><Link to={`/product/${p.slug}`} className="font-display text-xl font-bold text-maroon-700">{p.name}</Link><p className="text-sm text-maroon-600">{inr(p.price)} each</p></div>
                      <div className="flex flex-wrap items-center gap-3"><Qty value={qty} onChange={(n) => setQty(p.id, n)} /><span className="w-20 text-right font-bold">{inr(p.price * qty)}</span><button aria-label={`Remove ${p.name}`} onClick={() => remove(p.id)} className="rounded-full p-2 text-maroon-500 hover:bg-maroon-50"><Trash2 className="h-5 w-5" /></button></div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <aside className="card h-fit space-y-4 p-5 lg:sticky lg:top-44">
              <h2 className="text-2xl font-bold text-maroon-600">Order Summary</h2>
              <Summary {...totals} />
              <p className="text-xs text-maroon-700/70">Final prices, discounts and stock are confirmed by the store at checkout.</p>
              <Link to="/checkout" className="btn btn-primary w-full">Proceed to Checkout</Link>
              <Link to="/shop" className="block text-center text-sm font-semibold text-maroon-500 underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
