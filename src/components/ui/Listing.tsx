import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '../../data/categories'
import { useAsync } from '../../hooks/useAsync'
import { container } from '../../lib/motion'
import { listProducts } from '../../services/products'
import type { ProductQuery } from '../../types'
import { EmptyState, ErrorState, ProductSkeletons } from './common'
import { ProductCard } from './ProductCard'

const PAGE = 12
const sorts = [['featured', 'Featured'], ['price-asc', 'Price: Low to High'], ['price-desc', 'Price: High to Low'], ['discount', 'Biggest Discount'], ['name', 'Name A–Z']] as const

interface Props { fixed?: ProductQuery; lockCategory?: boolean }

export function Listing({ fixed = {}, lockCategory }: Props) {
  const [sp, setSp] = useSearchParams()
  const [shown, setShown] = useState(PAGE)
  const [drawer, setDrawer] = useState(false)
  const get = (k: string) => sp.get(k) ?? ''
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); setShown(PAGE) }
  const query: ProductQuery = useMemo(() => ({
    ...fixed,
    q: get('q') || fixed.q,
    category: lockCategory ? fixed.category : get('category') || fixed.category,
    min: get('min') ? Number(get('min')) : undefined,
    max: get('max') ? Number(get('max')) : undefined,
    inStock: get('stock') === '1',
    sort: (get('sort') || 'featured') as ProductQuery['sort'],
  }), [sp, fixed, lockCategory]) // eslint-disable-line react-hooks/exhaustive-deps
  const { data, loading, error, retry } = useAsync(() => listProducts(query), [JSON.stringify(query)])

  const chips: [string, string, string][] = []
  if (get('q') && !fixed.q) chips.push(['q', `“${get('q')}”`, ''])
  if (!lockCategory && get('category')) chips.push(['category', categories.find((c) => c.slug === get('category'))?.name ?? '', ''])
  if (get('min') || get('max')) chips.push(['price', `₹${get('min') || 0} – ${get('max') ? '₹' + get('max') : 'any'}`, ''])
  if (get('stock')) chips.push(['stock', 'In stock', ''])

  const clear = (k: string) => { const n = new URLSearchParams(sp); if (k === 'price') { n.delete('min'); n.delete('max') } else n.delete(k); setSp(n, { replace: true }) }

  const filters = (
    <div className="space-y-6">
      {!lockCategory && (
        <fieldset><legend className="label">Category</legend>
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="cat" checked={!get('category')} onChange={() => set('category', '')} className="accent-maroon-500" />All</label>
            {categories.map((c) => (<label key={c.slug} className="flex items-center gap-2 text-sm"><input type="radio" name="cat" checked={get('category') === c.slug} onChange={() => set('category', c.slug)} className="accent-maroon-500" />{c.name}</label>))}
          </div>
        </fieldset>
      )}
      <fieldset><legend className="label">Price (₹)</legend>
        <div className="flex items-center gap-2">
          <input aria-label="Minimum price" inputMode="numeric" placeholder="Min" defaultValue={get('min')} onBlur={(e) => set('min', e.target.value.replace(/\D/g, ''))} className="input !py-2" />
          <span>–</span>
          <input aria-label="Maximum price" inputMode="numeric" placeholder="Max" defaultValue={get('max')} onBlur={(e) => set('max', e.target.value.replace(/\D/g, ''))} className="input !py-2" />
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={get('stock') === '1'} onChange={(e) => set('stock', e.target.checked ? '1' : '')} className="h-4 w-4 accent-maroon-500" />In stock only</label>
    </div>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem,1fr]">
      <aside className="hidden lg:block"><div className="card sticky top-44 p-5"><h2 className="mb-4 text-xl font-bold text-maroon-600">Filters</h2>{filters}</div></aside>
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button className="btn btn-outline !py-2 lg:hidden" onClick={() => setDrawer(true)}><SlidersHorizontal className="h-4 w-4" />Filters</button>
          <p className="text-sm text-maroon-700/80" aria-live="polite">{loading ? 'Loading…' : `${data?.length ?? 0} products`}</p>
          <label className="ml-auto flex items-center gap-2 text-sm"><span className="sr-only sm:not-sr-only">Sort</span>
            <select value={get('sort') || 'featured'} onChange={(e) => set('sort', e.target.value)} className="input !w-auto !py-2">{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </label>
        </div>
        {chips.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {chips.map(([k, label]) => (<button key={k} onClick={() => clear(k)} className="inline-flex items-center gap-1 rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-maroon-700 hover:bg-saffron-200">{label}<X className="h-3 w-3" /><span className="sr-only">remove filter</span></button>))}
            <button onClick={() => setSp({}, { replace: true })} className="text-xs font-semibold text-maroon-500 underline">Clear all</button>
          </div>
        )}
        {loading ? <ProductSkeletons n={8} className="lg:grid-cols-3 xl:grid-cols-4" /> : error ? <ErrorState onRetry={retry} /> : data!.length === 0 ? (
          <EmptyState title="No products found" text="Try changing your filters or explore another collection." action={<Link to="/shop" className="btn btn-primary">Browse All Products</Link>} />
        ) : (
          <>
            <motion.div key={JSON.stringify(query)} variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {data!.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>
            {shown < data!.length && <div className="mt-8 text-center"><button onClick={() => setShown((n) => n + PAGE)} className="btn btn-outline">Load more</button></div>}
          </>
        )}
      </div>
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="fixed inset-0 z-[60] bg-maroon-900/60" />
            <motion.div role="dialog" aria-label="Filters" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-ivory-100 p-5">
              <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold text-maroon-600">Filters</h2><button aria-label="Close filters" onClick={() => setDrawer(false)}><X className="h-6 w-6" /></button></div>
              {filters}
              <button onClick={() => setDrawer(false)} className="btn btn-primary mt-6 w-full">Show results</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
