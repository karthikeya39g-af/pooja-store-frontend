import type { Variants } from 'framer-motion'

export const ease = [0.22, 0.8, 0.3, 1] as const
export const dur = { fast: 0.25, base: 0.5, slow: 0.9 }
export const stagger = 0.08

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease } },
}
export const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger } } }
export const viewport = { once: true, margin: '-60px' } as const
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}
