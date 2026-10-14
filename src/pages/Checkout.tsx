import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCartLines } from '../components/layout/CartDrawer'
import { EmptyState, Field } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { inr } from '../lib/format'
import { BackendUnavailableError } from '../services/client'
import { createOrder } from '../services/orders'
import { createPaymentOrder, verifyPayment } from '../services/payments'
import { useCart } from '../store'
import { Summary } from './Cart'

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  line1: z.string().trim().min(6, 'Enter your full delivery address'),
  city: z.string().trim().min(2, 'Enter your city'),
  state: z.string().trim().min(2, 'Enter your state'),
  pin: z.string().regex(/^\d{6}$/, 'Enter a 6-digit PIN code'),
})
type Form = z.infer<typeof schema>

declare global { interface Window { Razorpay?: new (o: Record<string, unknown>) => { open: () => void; on: (e: string, cb: () => void) => void } } }
const loadRazorpay = () => new Promise<boolean>((res) => {
  if (window.Razorpay) return res(true)
  const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = () => res(true); s.onerror = () => res(false); document.body.appendChild(s)
})

const steps = ['Delivery', 'Review & Pay']

export default function Checkout() {
  const { items, ...totals } = useCartLines()
  const clear = useCart((s) => s.clear)
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema), mode: 'onTouched' })
  const cls = (k: keyof Form) => `input ${errors[k] ? 'input-error' : ''}`

  if (!items.length) return (<><PageHeader title="Checkout" /><div className="container-x py-8"><EmptyState title="Nothing to check out" action={<Link to="/shop" className="btn btn-primary">Shop Now</Link>} /></div></>)

  const pay = async () => {
    setBusy(true); setErr('')
    try {
      const { orderId } = await createOrder({ address: getValues(), lines: items.map((l) => ({ productId: l.productId, qty: l.qty })) })
      const p = await createPaymentOrder(orderId)
      if (!(await loadRazorpay()) || !window.Razorpay) throw new Error('Could not load the payment window. Check your connection and try again.')
      const v = getValues()
      const rz = new window.Razorpay({
        key: p.keyId, amount: p.amount, currency: p.currency, order_id: p.razorpayOrderId, name: 'Sri Sai Manjunatha Pooja Stores',
        prefill: { name: v.name, contact: v.phone, email: v.email }, theme: { color: '#9E1B32' },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const out = await verifyPayment({ orderId, ...r })
            if (out.status === 'paid') { clear(); nav(`/order/${orderId}`, { state: { confirmed: true } }) } else setErr('Payment could not be verified. You have not been charged for this order unless the bank confirms it.')
          } catch { setErr('We could not confirm your payment yet. Please check your orders before trying again.') } finally { setBusy(false) }
        },
        modal: { ondismiss: () => setBusy(false) },
      })
      rz.on('payment.failed', () => { setErr('Payment failed. Please try again.'); setBusy(false) })
      rz.open()
    } catch (e) {
      setErr(e instanceof BackendUnavailableError ? 'Checkout cannot be completed right now because the store server is not connected. Your cart is saved and no order has been placed.' : (e as Error).message || 'Something went wrong.')
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="container-x py-8">
        <ol className="mx-auto mb-8 flex max-w-md items-center" aria-label="Checkout steps">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <motion.span animate={{ backgroundColor: i <= step ? '#9E1B32' : '#F5D6DB', color: i <= step ? '#fff' : '#721324' }} className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold">{i < step ? <Check className="h-4 w-4" /> : i + 1}</motion.span>
              <span className={`ml-2 text-sm font-semibold ${i <= step ? 'text-maroon-600' : 'text-maroon-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className="mx-3 h-0.5 flex-1 bg-maroon-100"><motion.div className="h-full bg-maroon-500" animate={{ width: step > i ? '100%' : '0%' }} /></div>}
            </li>
          ))}
        </ol>
        <div className="grid gap-8 lg:grid-cols-[1fr,22rem]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.form key="a" noValidate initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSubmit(() => setStep(1))} className="card grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
                <h2 className="text-2xl font-bold text-maroon-600 sm:col-span-2">Delivery details</h2>
                <Field label="Full name" error={errors.name?.message}><input autoComplete="name" className={cls('name')} {...register('name')} /></Field>
                <Field label="Mobile number" error={errors.phone?.message}><input inputMode="numeric" autoComplete="tel-national" maxLength={10} className={cls('phone')} {...register('phone')} /></Field>
                <div className="sm:col-span-2"><Field label="Email (optional)" error={errors.email?.message}><input type="email" autoComplete="email" className={cls('email')} {...register('email')} /></Field></div>
                <div className="sm:col-span-2"><Field label="Delivery address" error={errors.line1?.message}><textarea rows={3} autoComplete="street-address" className={cls('line1')} {...register('line1')} /></Field></div>
                <Field label="City" error={errors.city?.message}><input autoComplete="address-level2" className={cls('city')} {...register('city')} /></Field>
                <Field label="State" error={errors.state?.message}><input autoComplete="address-level1" className={cls('state')} {...register('state')} /></Field>
                <Field label="PIN code" error={errors.pin?.message}><input inputMode="numeric" maxLength={6} autoComplete="postal-code" className={cls('pin')} {...register('pin')} /></Field>
                <div className="sm:col-span-2"><button className="btn btn-primary w-full sm:w-auto">Continue to payment</button></div>
              </motion.form>
            ) : (
              <motion.div key="b" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-5 p-5 sm:p-7">
                <h2 className="text-2xl font-bold text-maroon-600">Review & pay</h2>
                <div className="rounded-xl bg-ivory-100 p-4 text-sm"><p className="font-semibold">{getValues('name')} · {getValues('phone')}</p><p>{getValues('line1')}, {getValues('city')}, {getValues('state')} {getValues('pin')}</p><button onClick={() => setStep(0)} className="mt-1 text-xs font-bold text-maroon-500 underline">Edit</button></div>
                <div className="rounded-xl border border-maroon-100 p-4 text-sm"><p className="font-semibold text-maroon-700">Payment method</p><p>Online payment via Razorpay (UPI, cards, netbanking). You will be asked to pay in a secure window.</p></div>
                <AnimatePresence>{err && <motion.div role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2 rounded-xl border border-maroon-200 bg-maroon-50 p-3 text-sm text-maroon-700"><AlertCircle className="h-5 w-5 shrink-0" />{err}</motion.div>}</AnimatePresence>
                <button disabled={busy} onClick={pay} className="btn btn-primary w-full !py-3.5 text-base">{busy && <Loader2 className="h-5 w-5 animate-spin" />}{busy ? 'Processing…' : `Place Order · ${inr(totals.total)}`}</button>
              </motion.div>
            )}
          </AnimatePresence>
          <aside className="card h-fit space-y-4 p-5 lg:sticky lg:top-44">
            <h2 className="text-xl font-bold text-maroon-600">Order summary</h2>
            <ul className="space-y-1 text-sm">{items.map((l) => <li key={l.productId} className="flex justify-between gap-2"><span className="truncate">{l.product.name} × {l.qty}</span><span>{inr(l.product.price * l.qty)}</span></li>)}</ul>
            <Summary {...totals} />
            <p className="text-xs text-maroon-700/70">Totals are an estimate. The store confirms final amounts before payment.</p>
          </aside>
        </div>
      </div>
    </>
  )
}
