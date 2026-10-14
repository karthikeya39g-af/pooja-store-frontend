import { AnimatePresence, motion } from 'framer-motion'
import { Heart, RotateCcw, ShoppingBag, Truck, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ErrorState, Qty, Skeleton, ProductSkeletons, EmptyState } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { ProductCard } from '../components/ui/ProductCard'
import { ProductImage } from '../components/ui/ProductImage'
import { categoryBySlug } from '../data/categories'
import { useAsync } from '../hooks/useAsync'
import { discountPct, inr } from '../lib/format'
import { getProduct, listProducts } from '../services/products'
import { useCart, useToasts, useWishlist } from '../store'

function Related({ category, exclude }: { category: string; exclude: string }) {
  const { data, loading } = useAsync(() => listProducts({ category }), [category])
  if (loading) return <ProductSkeletons n={4} />
  const rel = (data ?? []).filter((p) => p.id !== exclude).slice(0, 4)
  if (!rel.length) return null
  return (<section className="mt-14"><h2 className="mb-4 text-3xl font-bold text-maroon-600">You May Also Like</h2><div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{rel.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>)
}

export default function ProductPage() {
  const { slug = '' } = useParams()
  const { data: p, loading, error, retry } = useAsync(() => getProduct(slug), [slug])
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const add = useCart((s) => s.add)
  const setOpen = useCart((s) => s.setOpen)
  const wished = useWishlist((s) => (p ? s.ids.includes(p.id) : false))
  const toggle = useWishlist((s) => s.toggle)
  const push = useToasts((s) => s.push)
  const nav = useNavigate()

  if (loading) return <div className="container-x grid gap-8 py-10 md:grid-cols-2"><Skeleton className="aspect-square" /><div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-8 w-1/4" /><Skeleton className="h-32" /></div></div>
  if (error) return <div className="container-x py-10"><ErrorState onRetry={retry} /></div>
  if (!p) return <div className="container-x py-10"><EmptyState title="Product not found" action={<Link to="/shop" className="btn btn-primary">Back to Shop</Link>} /></div>
  const cat = categoryBySlug(p.categorySlug)
  const pct = discountPct(p.price, p.originalPrice)
  const out = p.stock <= 0
  const imgs = p.images.length ? p.images : ['']
  return (
    <>
      <PageHeader title={p.name} crumbs={[{ label: 'Shop All', to: '/shop' }, ...(cat ? [{ label: cat.name, to: `/category/${cat.slug}` }] : []), { label: p.name }]} />
      <div className="container-x py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <div className="card relative aspect-square overflow-hidden">
              <AnimatePresence mode="wait"><motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full"><ProductImage src={imgs[img] || undefined} alt={p.name} className="h-full w-full" /></motion.div></AnimatePresence>
              {pct > 0 && <span className="absolute left-3 top-3 rounded-full bg-saffron-400 px-3 py-1 text-sm font-bold text-maroon-900">{pct}% OFF</span>}
            </div>
            {imgs.length > 1 && <div className="mt-3 flex gap-2">{imgs.map((src, i) => <button key={i} aria-label={`Show image ${i + 1}`} onClick={() => setImg(i)} className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${i === img ? 'border-maroon-500' : 'border-maroon-100'}`}><ProductImage src={src} alt={p.name} className="h-full w-full" /></button>)}</div>}
          </div>
          <div>
            {cat && <Link to={`/category/${cat.slug}`} className="text-xs font-bold uppercase tracking-wider text-leaf-600">{cat.name}</Link>}
            <h2 className="mt-1 text-4xl font-bold leading-tight text-maroon-700">{p.name}</h2>
            <div className="mt-3 flex items-baseline gap-3"><span className="text-3xl font-bold text-maroon-600">{inr(p.price)}</span>{p.originalPrice && p.originalPrice > p.price && <span className="text-lg text-maroon-700/60 line-through">{inr(p.originalPrice)}</span>}</div>
            <p className={`mt-1 text-sm font-semibold ${out ? 'text-maroon-500' : 'text-leaf-600'}`}>{out ? 'Currently out of stock' : 'In stock'}</p>
            <p className="mt-4 text-maroon-800/90">{p.description}</p>
            {p.isSample && <p className="mt-3 rounded-lg bg-saffron-100 px-3 py-2 text-xs text-maroon-700">Development sample item — to be replaced with real catalogue data.</p>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Qty value={qty} onChange={setQty} />
              <motion.button whileTap={{ scale: 0.95 }} disabled={out} onClick={() => { add(p.id, qty); push(`${p.name} added to cart`); setOpen(true) }} className="btn btn-primary"><ShoppingBag className="h-4 w-4" />Add to Cart</motion.button>
              <button disabled={out} onClick={() => { add(p.id, qty); nav('/checkout') }} className="btn btn-saffron"><Zap className="h-4 w-4" />Buy Now</button>
              <button aria-pressed={wished} aria-label="Toggle wishlist" onClick={() => push(toggle(p.id) ? 'Saved to wishlist' : 'Removed from wishlist', 'info')} className="grid h-12 w-12 place-items-center rounded-full border-2 border-maroon-200 hover:bg-maroon-50"><Heart className={`h-5 w-5 ${wished ? 'fill-maroon-500 text-maroon-500' : 'text-maroon-500'}`} /></button>
            </div>
            <dl className="mt-8 divide-y divide-maroon-100 rounded-2xl border border-maroon-100 bg-white text-sm">
              {p.specs && Object.entries(p.specs).map(([k, v]) => (<div key={k} className="flex justify-between px-4 py-2.5"><dt className="font-semibold text-maroon-700">{k}</dt><dd>{v}</dd></div>))}
              <div className="flex gap-3 px-4 py-3"><Truck className="h-5 w-5 shrink-0 text-leaf-600" /><div><dt className="font-semibold text-maroon-700">Delivery</dt><dd className="text-maroon-800/80">Delivery charges are shown at checkout. See our <Link to="/shipping" className="underline">shipping policy</Link>.</dd></div></div>
              <div className="flex gap-3 px-4 py-3"><RotateCcw className="h-5 w-5 shrink-0 text-leaf-600" /><div><dt className="font-semibold text-maroon-700">Returns</dt><dd className="text-maroon-800/80">Read our <Link to="/returns" className="underline">returns & refunds policy</Link>.</dd></div></div>
            </dl>
          </div>
        </div>
        <Related category={p.categorySlug} exclude={p.id} />
      </div>
    </>
  )
}
