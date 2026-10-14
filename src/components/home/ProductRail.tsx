import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync'
import { container, viewport } from '../../lib/motion'
import { listProducts } from '../../services/products'
import { ErrorState, ProductSkeletons } from '../ui/common'
import { ProductCard } from '../ui/ProductCard'

export function ProductRail({ title, collection, viewAll, limit = 4, id }: { title: string; collection: string; viewAll: string; limit?: number; id?: string }) {
  const { data, loading, error, retry } = useAsync(() => listProducts({ collection }), [collection])
  return (
    <section id={id} className="container-x mt-14" aria-label={title}>
      <div className="mb-5 flex items-end justify-between gap-3 border-b-2 border-saffron-300 pb-2">
        <h3 className="text-2xl font-bold text-maroon-600 sm:text-3xl">{title}</h3>
        <Link to={viewAll} className="group inline-flex items-center gap-1 text-sm font-bold text-maroon-500 hover:text-maroon-700">View All<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
      </div>
      {loading ? <ProductSkeletons n={limit} /> : error ? <ErrorState onRetry={retry} /> : (
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {data!.slice(0, limit).map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      )}
    </section>
  )
}
