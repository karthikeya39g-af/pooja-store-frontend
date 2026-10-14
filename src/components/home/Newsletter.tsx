import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { subscribeNewsletter } from '../../services/misc'
import { fadeUp, viewport } from '../../lib/motion'
import { DiyaDecoration, MarigoldCorner, RangoliDecoration } from '../decor'

const schema = z.object({ email: z.string().min(1, 'Please enter your email').email('Enter a valid email address') })

export function Newsletter() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<{ email: string }>({ resolver: zodResolver(schema) })
  const [state, setState] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  return (
    <section className="container-x mt-20">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-gold-300/70 bg-maroon-700 px-6 py-12 text-center text-ivory-100 shadow-lift sm:px-12">
        <MarigoldCorner className="absolute -left-3 -top-3 w-32 opacity-45 sm:w-44" />
        <MarigoldCorner flip className="absolute -right-3 -top-3 w-32 opacity-45 sm:w-44" />
        <RangoliDecoration className="absolute -bottom-44 left-1/2 h-80 w-80 -translate-x-1/2 opacity-[.1]" spin={false} />
        <div className="relative mx-auto max-w-xl">
          <DiyaDecoration className="mx-auto h-14 w-14" />
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Stay Connected to Every Auspicious Occasion</h2>
          <p className="mt-2 text-ivory-200">Hear about new collections and festival specials.</p>
          <form noValidate onSubmit={handleSubmit(async ({ email }) => {
            setState(null)
            try { await subscribeNewsletter(email); setState({ tone: 'ok', text: 'Thank you! You are subscribed.' }); reset() }
            catch (e) { setState({ tone: 'err', text: (e as Error).name === 'BackendUnavailableError' ? 'Subscriptions are not available yet — the store server is not connected.' : 'Could not subscribe. Please try again.' }) }
          })} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <div className="flex-1 text-left">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" placeholder="Your email address" aria-invalid={!!errors.email} {...register('email')} className={`input !rounded-full ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <p role="alert" className="mt-1 pl-4 text-xs font-semibold text-saffron-200">{errors.email.message}</p>}
            </div>
            <button disabled={isSubmitting} className="btn btn-saffron !py-3">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Subscribe</button>
          </form>
          {state && <p role="status" className={`mt-3 text-sm font-semibold ${state.tone === 'ok' ? 'text-leaf-100' : 'text-saffron-200'}`}>{state.text}</p>}
        </div>
      </motion.div>
    </section>
  )
}
