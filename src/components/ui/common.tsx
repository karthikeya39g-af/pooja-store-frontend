import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, Minus, Plus, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useToasts } from '../../store'
import { ArtGlyph } from '../decor/Glyphs'

export const Skeleton = ({ className = '' }: { className?: string }) => <div className={`animate-pulse rounded-xl bg-maroon-100/60 ${className}`} />

export const ProductSkeletons = ({ n = 8, className = '' }: { n?: number; className?: string }) => (
  <div className={`grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="card flex flex-col overflow-hidden !rounded-[1.6rem] p-2.5 sm:p-3">
        <Skeleton className="aspect-square rounded-[1.2rem]" />
        <div className="flex flex-1 flex-col p-1 pt-3 sm:p-1.5 sm:pt-4">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="mt-2 h-5 w-2/5" />
          <Skeleton className="mt-2 h-3 w-1/3" />
          <div className="mt-auto grid grid-cols-[2.75rem,1fr] gap-2 pt-4"><Skeleton className="h-11 rounded-full" /><Skeleton className="h-11 rounded-full" /></div>
        </div>
      </div>
    ))}
  </div>
)

export function EmptyState({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto flex max-w-md flex-col items-center py-14 text-center">
      <ArtGlyph kind="diya" className="h-24 w-24 opacity-90" />
      <h3 className="mt-4 text-2xl font-bold text-maroon-600">{title}</h3>
      {text && <p className="mt-1 text-maroon-700/80">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
      <AlertCircle className="h-10 w-10 text-maroon-500" />
      <h3 className="mt-3 text-2xl font-bold text-maroon-600">Something went wrong</h3>
      <p className="mt-1 text-maroon-700/80">{message ?? 'We could not load this right now.'}</p>
      {onRetry && <button onClick={onRetry} className="btn btn-primary mt-4">Try again</button>}
    </div>
  )
}

export function Qty({ value, onChange, min = 1, max = 99, size = 'md' }: { value: number; onChange: (n: number) => void; min?: number; max?: number; size?: 'sm' | 'md' }) {
  const b = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <div className="inline-flex items-center rounded-full border border-maroon-200 bg-white">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} className={`${b} grid place-items-center rounded-full text-maroon-600 hover:bg-maroon-50 active:scale-90`}><Minus className="h-4 w-4" /></button>
      <motion.span key={value} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="min-w-8 text-center text-sm font-semibold" aria-live="polite">{value}</motion.span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(max, value + 1))} className={`${b} grid place-items-center rounded-full text-maroon-600 hover:bg-maroon-50 active:scale-90`}><Plus className="h-4 w-4" /></button>
    </div>
  )
}

export function Toasts() {
  const { toasts, dismiss } = useToasts()
  const Icon = { success: CheckCircle2, info: Info, error: AlertCircle }
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => {
          const I = Icon[t.tone]
          return (
            <motion.div key={t.id} layout initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} className={`pointer-events-auto flex max-w-sm items-center gap-3 rounded-full px-4 py-3 text-sm font-medium text-white shadow-lift ${t.tone === 'error' ? 'bg-maroon-600' : t.tone === 'info' ? 'bg-maroon-800' : 'bg-leaf-500'}`}>
              <I className="h-5 w-5 shrink-0" /><span>{t.text}</span>
              <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="ml-1 opacity-80 hover:opacity-100"><X className="h-4 w-4" /></button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div><label className="label">{label}</label>{children}{error && <p role="alert" className="mt-1 text-xs font-medium text-maroon-500">{error}</p>}</div>
)
