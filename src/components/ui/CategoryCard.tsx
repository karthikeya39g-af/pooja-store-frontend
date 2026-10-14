import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUp } from '../../lib/motion'
import type { Category } from '../../types'
import { ProductImage } from './ProductImage'

export function CategoryCard({ c }: { c: Category }) {
  return (
    <motion.div variants={fadeUp}>
      <Link to={`/category/${c.slug}`} className="group relative block aspect-[.9] min-h-48 overflow-hidden rounded-[1.6rem] bg-maroon-100 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift active:scale-[.98] sm:aspect-[.92]">
        <ProductImage src={c.image} alt={c.name} fit="cover" className="h-full w-full" imageClassName="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/90 via-maroon-900/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <span className="mb-2 inline-flex items-center rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-sm">Explore</span>
          <div className="flex items-end justify-between gap-2">
            <h3 className="max-w-[85%] font-display text-xl font-bold leading-tight text-white drop-shadow-sm sm:text-2xl">{c.name}</h3>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-saffron-300 text-maroon-900 transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
