import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { discountPct, inr } from '../../lib/format'
import { fadeUp } from '../../lib/motion'
import { useCart, useToasts, useWishlist } from '../../store'
import type { Product } from '../../types'
import { ProductImage } from './ProductImage'

export function ProductCard({ product: p }: { product: Product }) {
  const add = useCart((s) => s.add)
  const wished = useWishlist((s) => s.ids.includes(p.id))
  const toggle = useWishlist((s) => s.toggle)
  const push = useToasts((s) => s.push)
  const pct = discountPct(p.price, p.originalPrice)
  const out = p.stock <= 0
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="group card flex flex-col overflow-hidden !rounded-[1.6rem] !border-maroon-100/70 !shadow-[0_8px_30px_-18px_rgba(89,14,28,.35)] transition-all hover:!shadow-lift">
      <div className="relative p-2.5 pb-0 sm:p-3 sm:pb-0">
        <Link to={`/product/${p.slug}`} aria-label={`View ${p.name}`} className="block aspect-square overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-ivory-100 to-saffron-50">
          <ProductImage src={p.images[0]} alt={p.name} className="h-full w-full" imageClassName="p-2 transition-transform duration-700 group-hover:scale-105 sm:p-3" />
        </Link>
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-1.5 sm:left-5 sm:top-5">
          {pct > 0 && <span className="rounded-full bg-saffron-300 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-maroon-900 shadow-sm">Save {pct}%</span>}
          <AnimatePresence>{out && <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="rounded-full bg-maroon-700 px-2.5 py-1 text-[10px] font-semibold text-white">Out of stock</motion.span>}</AnimatePresence>
        </div>
        <button aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wished} onClick={() => push(toggle(p.id) ? 'Saved to wishlist' : 'Removed from wishlist', 'info')} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-maroon-500 shadow-soft transition hover:bg-maroon-500 hover:text-white active:scale-90 sm:right-5 sm:top-5">
          <motion.span key={String(wished)} initial={{ scale: 0.5 }} animate={{ scale: [0.5, 1.35, 1] }} transition={{ duration: 0.4 }}>
            <Heart className={`h-5 w-5 ${wished ? 'fill-maroon-500 text-maroon-500' : 'text-maroon-500'}`} />
          </motion.span>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-3.5 sm:p-4 sm:pt-4">
        <Link to={`/product/${p.slug}`} className="line-clamp-2 min-h-[2.8rem] font-display text-xl font-bold leading-tight text-maroon-800 transition-colors hover:text-maroon-500 sm:text-2xl">{p.name}</Link>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-lg font-extrabold text-maroon-600 sm:text-xl">{inr(p.price)}</span>
          {p.originalPrice && p.originalPrice > p.price && <span className="text-xs text-maroon-700/55 line-through">{inr(p.originalPrice)}</span>}
        </div>
        <p className={`mt-1 flex items-center gap-1.5 text-[11px] font-semibold ${out ? 'text-maroon-500' : 'text-leaf-600'}`}><span className={`h-1.5 w-1.5 rounded-full ${out ? 'bg-maroon-400' : 'bg-leaf-500'}`} />{out ? 'Currently unavailable' : 'In stock'}</p>
        <div className="mt-auto grid grid-cols-[2.75rem,1fr] gap-2 pt-4">
          <Link to={`/product/${p.slug}`} aria-label={`View details of ${p.name}`} className="grid place-items-center rounded-full border border-maroon-200 text-maroon-600 transition hover:border-maroon-500 hover:bg-maroon-50"><Eye className="h-4 w-4" /></Link>
          <motion.button whileTap={{ scale: 0.96 }} disabled={out} onClick={() => { add(p.id); push(`${p.name} added to cart`) }} className="btn btn-primary !min-h-11 !gap-1 !px-2 !py-2.5 text-[11px] whitespace-nowrap sm:!gap-2 sm:!px-3 sm:text-sm"><ShoppingBag className="h-4 w-4 shrink-0" />Add to Cart</motion.button>
        </div>
      </div>
    </motion.article>
  )
}
