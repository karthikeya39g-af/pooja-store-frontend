import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { storeConfig } from '../../data/config'
import { container, fadeUp, viewport } from '../../lib/motion'
import { Logo, RangoliDecoration, Toran } from '../decor'

export function Footer() {
  const c = storeConfig.contact
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-gold-400/70 bg-maroon-800 text-ivory-100">
      <Toran className="absolute inset-x-0 top-0 h-8 w-full opacity-35" />
      <RangoliDecoration className="absolute -bottom-28 -right-24 h-80 w-80 opacity-[.1]" color="#D4AF65" spin={false} />
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={viewport} className="container-x relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-3"><Logo className="h-14 w-14" /><div className="font-display text-xl font-bold leading-tight">{storeConfig.name}</div></div>
          <p className="mt-1 font-telugu text-sm text-saffron-200">{storeConfig.teluguName}</p>
          <p className="mt-3 text-sm text-ivory-200">{storeConfig.tagline}</p>
          {storeConfig.social.length > 0 && <ul className="mt-3 flex gap-3">{storeConfig.social.map((s) => <li key={s.url}><a href={s.url} className="underline">{s.label}</a></li>)}</ul>}
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-3 text-xl font-bold text-saffron-300">Categories</h3>
          <ul className="space-y-1.5 text-sm">{categories.slice(0, 8).map((x) => <li key={x.slug}><Link className="hover:text-saffron-300" to={`/category/${x.slug}`}>{x.name}</Link></li>)}<li><Link className="font-semibold text-saffron-300" to="/categories">All categories →</Link></li></ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-3 text-xl font-bold text-saffron-300">Customer Support</h3>
          <ul className="space-y-1.5 text-sm">
            {[['/contact', 'Contact Us'], ['/account/orders', 'Track Orders'], ['/shipping', 'Shipping Policy'], ['/returns', 'Returns & Refunds'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms & Conditions']].map(([to, l]) => <li key={to}><Link className="hover:text-saffron-300" to={to}>{l}</Link></li>)}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="mb-3 text-xl font-bold text-saffron-300">Visit & Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{c.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{c.phone}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{c.email}</li>
          </ul>
        </motion.div>
      </motion.div>
      <div className="relative border-t border-gold-300/30 py-4 text-center text-xs text-ivory-200">© {new Date().getFullYear()} {storeConfig.name}. All rights reserved.</div>
    </footer>
  )
}
