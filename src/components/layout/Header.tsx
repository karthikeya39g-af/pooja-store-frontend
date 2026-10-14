import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/categories'
import { storeConfig } from '../../data/config'
import { products } from '../../data/products'
import { useCart, useWishlist } from '../../store'
import { DiyaDecoration, Logo } from '../decor'

function AnnouncementBar() {
  const [open, setOpen] = useState(() => { try { return sessionStorage.getItem('ann') !== '0' } catch { return true } })
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-saffron-400 text-maroon-900">
          <div className="container-x flex items-center justify-center gap-2 py-1.5 text-xs font-semibold sm:text-sm">
            <DiyaDecoration className="h-5 w-5 shrink-0" />
            <p className="text-center">{storeConfig.announcement}</p>
            <button aria-label="Dismiss announcement" onClick={() => { setOpen(false); try { sessionStorage.setItem('ann', '0') } catch { /* ignore */ } }} className="ml-2 rounded-full p-1 hover:bg-saffron-300"><X className="h-4 w-4" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SearchBox({ className = '', inputId }: { className?: string; inputId: string }) {
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const nav = useNavigate()
  const ref = useRef<HTMLFormElement>(null)
  const matches = useMemo(() => (q.trim().length < 2 ? [] : products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)), [q])
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setFocus(false) }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <form ref={ref} role="search" className={`relative ${className}`} onSubmit={(e) => { e.preventDefault(); if (q.trim()) { nav(`/search?q=${encodeURIComponent(q.trim())}`); setFocus(false) } }}>
      <label htmlFor={inputId} className="sr-only">Search products</label>
      <input id={inputId} value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} placeholder="Search pooja products…" autoComplete="off" className="w-full rounded-full border border-gold-200/70 bg-white/75 py-2.5 pl-4 pr-11 text-sm text-maroon-900 placeholder:text-muted transition focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200/70" />
      <button aria-label="Search" className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-maroon-500 text-white"><Search className="h-4 w-4" /></button>
      <AnimatePresence>
        {focus && matches.length > 0 && (
          <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gold-200 bg-ivory-50/95 text-maroon-800 shadow-lift backdrop-blur-xl">
            {matches.map((p) => (<li key={p.id}><Link onClick={() => { setFocus(false); setQ('') }} to={`/product/${p.slug}`} className="flex justify-between px-4 py-2.5 text-sm hover:bg-gold-100"><span>{p.name}</span><span className="text-maroon-500">in {categories.find((c) => c.slug === p.categorySlug)?.name}</span></Link></li>))}
          </motion.ul>
        )}
      </AnimatePresence>
    </form>
  )
}

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop All' },
  { to: '/category/daily-pooja-needs', label: 'Pooja Samagri' },
  { to: '/categories', label: 'All Categories', menu: true },
  { to: '/festivals', label: 'Festivals' },
  { to: '/offers', label: 'Offers' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About Us' },
]

export function Header() {
  const [compact, setCompact] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [menu, setMenu] = useState(false)
  const count = useCart((s) => s.lines.reduce((a, l) => a + l.qty, 0))
  const setOpen = useCart((s) => s.setOpen)
  const wish = useWishlist((s) => s.ids.length)
  const { pathname } = useLocation()
  useEffect(() => { setMobile(false); setMenu(false) }, [pathname])
  useEffect(() => {
    const h = () => setCompact(window.scrollY > 60)
    h(); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h)
  }, [])
  const iconBtn = 'relative grid h-10 w-10 place-items-center rounded-full text-maroon-700 transition hover:bg-gold-100/70 active:scale-90'
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50">
        <motion.div initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className={`border-b border-gold-300/70 bg-ivory-50/90 text-maroon-800 shadow-[0_5px_22px_-18px_rgba(84,19,35,.65)] backdrop-blur-xl supports-[backdrop-filter]:bg-ivory-50/80 transition-shadow ${compact ? 'shadow-[0_8px_28px_-16px_rgba(84,19,35,.55)]' : ''}`}>
          <div className={`container-x flex items-center gap-3 transition-all duration-300 ${compact ? 'py-1.5' : 'py-3'}`}>
            <button className={`${iconBtn} lg:hidden`} aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}><Menu className="h-6 w-6" /></button>
            <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label={storeConfig.name}>
              <Logo className={`shrink-0 transition-all duration-300 ${compact ? 'h-9 w-9' : 'h-12 w-12'}`} />
              <span className="min-w-0 leading-tight">
                <span className={`block truncate font-display font-bold text-red-600 transition-all ${compact ? 'text-base sm:text-lg' : 'text-base sm:text-2xl'}`}>Sri Sai Manjunatha <span className="text-red-500">Pooja Stores</span></span>
                <span className={`hidden font-telugu text-xs text-maroon-500 sm:block ${compact ? 'sm:hidden' : ''}`}>{storeConfig.teluguName}</span>
              </span>
            </Link>
            <SearchBox inputId="site-search-desktop" className="ml-auto hidden max-w-md flex-1 md:block" />
            <div className="ml-auto flex shrink-0 items-center md:ml-2">
              <Link to="/account" className={`${iconBtn} hidden sm:grid`} aria-label="Account"><User className="h-5 w-5" /></Link>
              <Link to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wish} items`}><Heart className="h-5 w-5" />{wish > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-saffron-400 px-1 text-[10px] font-bold text-maroon-900">{wish}</span>}</Link>
              <button onClick={() => setOpen(true)} className={iconBtn} aria-label={`Cart, ${count} items`}>
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence mode="popLayout"><motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-saffron-400 px-1 text-[10px] font-bold text-maroon-900">{count}</motion.span></AnimatePresence>
              </button>
            </div>
          </div>
          <div className="container-x pb-2 md:hidden"><SearchBox inputId="site-search-mobile" /></div>
          <nav aria-label="Main" className="hidden border-t border-gold-100 lg:block">
            <ul className="container-x flex items-center justify-center gap-1">
              {links.map((l) => (
                <li key={l.to} className="relative" onMouseEnter={() => l.menu && setMenu(true)} onMouseLeave={() => l.menu && setMenu(false)} onFocus={() => l.menu && setMenu(true)} onBlur={(event) => { if (l.menu && !event.currentTarget.contains(event.relatedTarget as Node)) setMenu(false) }}>
                  <NavLink to={l.to} end={l.end} aria-haspopup={l.menu ? 'true' : undefined} aria-expanded={l.menu ? menu : undefined} className={({ isActive }) => `relative flex items-center gap-1 px-4 py-2.5 text-sm font-semibold transition hover:text-maroon-500 ${isActive ? 'text-maroon-600' : 'text-maroon-700'}`}>
                    {({ isActive }) => (<>{l.label}{l.menu && <ChevronDown className={`h-4 w-4 transition-transform ${menu ? 'rotate-180' : ''}`} />}{isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 bottom-0 h-0.5 rounded bg-saffron-400" />}</>)}
                  </NavLink>
                  {l.menu && (
                    <AnimatePresence>
                      {menu && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute left-1/2 top-full z-50 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-gold-300/80 bg-ivory-50/95 p-4 text-maroon-800 shadow-lift backdrop-blur-xl">
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3">
                            {categories.map((c) => (<li key={c.slug}><Link to={`/category/${c.slug}`} className="block rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gold-100 hover:text-maroon-600">{c.name}</Link></li>))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </header>
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} className="fixed inset-0 z-[60] bg-maroon-900/60" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-y-0 left-0 z-[70] flex w-[85%] max-w-sm flex-col overflow-y-auto bg-ivory-100 shadow-lift" aria-label="Menu">
              <div className="flex items-center justify-between border-b border-gold-300 bg-maroon-700 p-4 text-ivory-100"><span className="font-display text-xl font-bold">Menu</span><button aria-label="Close menu" onClick={() => setMobile(false)}><X className="h-6 w-6" /></button></div>
              <ul className="p-3">
                {links.filter((l) => !l.menu).map((l, i) => (<motion.li key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}><NavLink to={l.to} end={l.end} className={({ isActive }) => `block rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-gold-100 text-maroon-600' : 'text-maroon-800'}`}>{l.label}</NavLink></motion.li>))}
                <li className="mt-2 border-t border-gold-200 pt-2"><p className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-maroon-500">Categories</p>
                  {categories.map((c) => (<Link key={c.slug} to={`/category/${c.slug}`} className="block rounded-lg px-4 py-2 text-sm text-maroon-800 hover:bg-gold-100">{c.name}</Link>))}
                </li>
                <li className="mt-2 border-t border-gold-200 pt-2"><Link to="/account" className="block rounded-xl px-4 py-3 font-semibold text-maroon-800">My Account</Link></li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
