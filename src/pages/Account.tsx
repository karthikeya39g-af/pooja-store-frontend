import { Package, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ErrorState, EmptyState, Skeleton } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { useAsync } from '../hooks/useAsync'
import { inr } from '../lib/format'
import { BackendUnavailableError } from '../services/client'
import { me } from '../services/auth'
import { myOrders } from '../services/orders'

function Shell({ children, title }: { children: React.ReactNode; title: string }) {
  const tab = ({ isActive }: { isActive: boolean }) => `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${isActive ? 'bg-maroon-500 text-white' : 'text-maroon-700 hover:bg-maroon-50'}`
  return (
    <>
      <PageHeader title={title} crumbs={[{ label: 'Account' }]} />
      <div className="container-x grid gap-6 py-8 md:grid-cols-[14rem,1fr]">
        <nav aria-label="Account" className="card flex gap-1 p-2 md:flex-col"><NavLink end to="/account" className={tab}><User className="h-4 w-4" />Profile</NavLink><NavLink to="/account/orders" className={tab}><Package className="h-4 w-4" />Orders</NavLink></nav>
        <div>{children}</div>
      </div>
    </>
  )
}
const SignIn = () => <EmptyState title="Please sign in" text="Sign in to view your details and orders." action={<Link to="/login" className="btn btn-primary">Sign In</Link>} />

export default function Account() {
  const { data, loading, error, retry } = useAsync(me, [])
  return (
    <Shell title="My Account">
      {loading ? <Skeleton className="h-32" /> : error ? (error instanceof BackendUnavailableError ? <SignIn /> : <ErrorState onRetry={retry} />) : (
        <div className="card p-6"><h2 className="text-2xl font-bold text-maroon-600">{data!.name}</h2><p>{data!.email}</p>{data!.phone && <p>{data!.phone}</p>}</div>
      )}
    </Shell>
  )
}

export function Orders() {
  const { data, loading, error, retry } = useAsync(myOrders, [])
  return (
    <Shell title="Order History">
      {loading ? <Skeleton className="h-32" /> : error ? (error instanceof BackendUnavailableError ? <SignIn /> : <ErrorState onRetry={retry} />) : !data!.length ? <EmptyState title="No orders yet" action={<Link to="/shop" className="btn btn-primary">Start Shopping</Link>} /> : (
        <ul className="space-y-3">{data!.map((o) => (<li key={o.id} className="card p-4"><div className="flex justify-between"><b>#{o.id}</b><span className="rounded-full bg-saffron-100 px-3 text-xs font-bold capitalize leading-6">{o.status}</span></div><p className="text-sm">{new Date(o.createdAt).toLocaleDateString('en-IN')} · {o.lines.length} items</p><p className="font-bold text-maroon-600">{inr(o.total)}</p></li>))}</ul>
      )}
    </Shell>
  )
}
