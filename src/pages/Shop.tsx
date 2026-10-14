import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Listing } from '../components/ui/Listing'
import { PageHeader } from '../components/ui/PageHeader'
import { categoryBySlug } from '../data/categories'
import { festivals } from '../data/festivals'

const Wrap = ({ children }: { children: React.ReactNode }) => <div className="container-x py-8">{children}</div>

export function Shop() {
  return (<><PageHeader title="Shop All" subtitle="Browse every pooja essential and devotional treasure." crumbs={[{ label: 'Shop All' }]} /><Wrap><Listing /></Wrap></>)
}

export function CategoryPage() {
  const { slug } = useParams()
  const c = categoryBySlug(slug)
  if (!c) return <Navigate to="/shop" replace />
  return (<><PageHeader title={c.name} subtitle={c.blurb} crumbs={[{ label: 'Categories', to: '/categories' }, { label: c.name }]} /><Wrap><Listing fixed={{ category: c.slug }} lockCategory /></Wrap></>)
}

export function SearchPage() {
  const [sp] = useSearchParams()
  const q = sp.get('q') ?? ''
  return (<><PageHeader title={q ? `Results for “${q}”` : 'Search'} crumbs={[{ label: 'Search' }]} /><Wrap><Listing /></Wrap></>)
}

export function OffersPage() {
  return (<><PageHeader title="Offers" subtitle="Products currently priced below their reference price." crumbs={[{ label: 'Offers' }]} /><Wrap><Listing fixed={{ onOffer: true }} /></Wrap></>)
}

export function FestivalPage() {
  const { slug } = useParams()
  const f = festivals.find((x) => x.slug === slug && x.active)
  if (!f) return <Navigate to="/festivals" replace />
  return (<><PageHeader title={f.name} subtitle={f.blurb} crumbs={[{ label: 'Festival Specials', to: '/festivals' }, { label: f.name }]} /><Wrap><FestivalListing cats={f.categorySlugs} /></Wrap></>)
}

import { useAsync } from '../hooks/useAsync'
import { listProducts } from '../services/products'
import { EmptyState, ErrorState, ProductSkeletons } from '../components/ui/common'
import { ProductCard } from '../components/ui/ProductCard'
import { Link } from 'react-router-dom'
import type { Product } from '../types'

function FestivalListing({ cats }: { cats: string[] }) {
  const { data, loading, error, retry } = useAsync(async () => (await Promise.all(cats.map((c) => listProducts({ category: c })))).flat() as Product[], [cats.join()])
  if (loading) return <ProductSkeletons n={4} />
  if (error) return <ErrorState onRetry={retry} />
  if (!data!.length) return <EmptyState title="Collection coming soon" text="Products for this festival will appear here." action={<Link to="/shop" className="btn btn-primary">Browse All Products</Link>} />
  return <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{data!.map((p) => <ProductCard key={p.id} product={p} />)}</div>
}
