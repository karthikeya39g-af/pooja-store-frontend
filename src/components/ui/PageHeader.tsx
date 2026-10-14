import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mandala, MarigoldCorner } from '../decor'

export function PageHeader({ title, subtitle, crumbs = [] }: { title: string; subtitle?: ReactNode; crumbs?: { label: string; to?: string }[] }) {
  return (
    <div className="relative overflow-hidden border-b border-gold-300/70 bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-600 text-ivory-100">
      <Mandala color="#D4AF65" className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 opacity-[.12] sm:-right-4 sm:h-72 sm:w-72" />
      <MarigoldCorner className="absolute -left-2 -top-2 w-28 opacity-60" />
      <div className="container-x relative py-8 pl-24 sm:py-10 sm:pl-32">
        <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1 text-xs text-saffron-200">
          <Link to="/" className="hover:underline">Home</Link>
          {crumbs.map((c) => (<span key={c.label} className="flex items-center gap-1"><ChevronRight className="h-3 w-3" />{c.to ? <Link to={c.to} className="hover:underline">{c.label}</Link> : <span>{c.label}</span>}</span>))}
        </nav>
        <h1 className="text-3xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-ivory-200">{subtitle}</p>}
      </div>
    </div>
  )
}
