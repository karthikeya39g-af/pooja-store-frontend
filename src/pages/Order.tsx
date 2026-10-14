import { motion } from 'framer-motion'
import { CheckCircle2, HelpCircle } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'

/** Success is shown only when navigated here after backend-verified payment. */
export default function OrderConfirmation() {
  const { id } = useParams()
  const confirmed = (useLocation().state as { confirmed?: boolean } | null)?.confirmed
  return (
    <>
      <PageHeader title="Order" crumbs={[{ label: 'Order' }]} />
      <div className="container-x py-14 text-center">
        {confirmed ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="mx-auto max-w-md">
            <CheckCircle2 className="mx-auto h-20 w-20 text-leaf-500" />
            <h2 className="mt-3 text-4xl font-bold text-maroon-600">Thank you!</h2>
            <p className="mt-2">Your payment was confirmed. Order reference <b>{id}</b>.</p>
          </motion.div>
        ) : (
          <div className="mx-auto max-w-md"><HelpCircle className="mx-auto h-16 w-16 text-maroon-400" /><h2 className="mt-3 text-3xl font-bold text-maroon-600">Order status unavailable</h2><p className="mt-2">We can only show a confirmation after the store verifies your payment. Check <Link className="underline" to="/account/orders">your orders</Link>.</p></div>
        )}
        <Link to="/shop" className="btn btn-primary mt-6">Continue Shopping</Link>
      </div>
    </>
  )
}
