import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { ProductCard } from '../components/ui/ProductCard'
import { findProducts } from '../hooks/useProductsByIds'
import { useWishlist } from '../store'

export default function Wishlist() {
  const ids = useWishlist((s) => s.ids)
  const items = findProducts(ids)
  return (
    <>
      <PageHeader title="Wishlist" crumbs={[{ label: 'Wishlist' }]} />
      <div className="container-x py-8">
        {items.length === 0 ? <EmptyState title="Your wishlist is empty" text="Tap the heart on any product to save it here." action={<Link to="/shop" className="btn btn-primary">Browse Products</Link>} /> : <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
      </div>
    </>
  )
}
