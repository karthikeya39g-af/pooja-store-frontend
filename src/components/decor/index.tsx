import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewport, ease } from '../../lib/motion'
import { ArtGlyph } from './Glyphs'
import type { ArtKind } from '../../types'

/** Brand emblem: diya flame over lotus */
export function Logo({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <img src="/ssmp-logo.svg" alt="Sri Sai Manjunatha Pooja Store" className={`block object-contain ${className}`} />
  )
}

export function Mandala({ className = '', color = '#D4AF65' }: { className?: string; color?: string }) {
  const petals = Array.from({ length: 24 })
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke={color} strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="100" cy="100" r="97" strokeDasharray="1.5 4" />
      <circle cx="100" cy="100" r="89" />
      <circle cx="100" cy="100" r="72" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="51" />
      <circle cx="100" cy="100" r="25" />
      <circle cx="100" cy="100" r="9" />
      {petals.map((_, i) => {
        const rotate = (i * 360) / petals.length
        return <g key={i} transform={`rotate(${rotate} 100 100)`}>
          <path d="M100 74C91 60 89 43 100 17c11 26 9 43 0 57z" />
          <path d="M100 49c-4-8-4-15 0-23 4 8 4 15 0 23z" />
          <circle cx="100" cy="10" r="1.35" fill={color} stroke="none" />
        </g>
      })}
      {Array.from({ length: 12 }, (_, i) => <path key={`leaf-${i}`} d="M100 123C91 115 88 105 100 91c12 14 9 24 0 32z" transform={`rotate(${i * 30 + 15} 100 100)`} />)}
      <path d="M100 91c-5 4-7 7-7 9 0 5 4 8 7 10 3-2 7-5 7-10 0-2-2-5-7-9z" />
    </svg>
  )
}

/** Slow-rotating mandala / rangoli backdrop */
export function RangoliDecoration({ className = '', color = '#D4AF65', spin = true }: { className?: string; color?: string; spin?: boolean }) {
  return <div className={`pointer-events-none select-none ${className}`} aria-hidden="true"><Mandala color={color} className={`h-full w-full ${spin ? 'animate-spinslow' : ''}`} /></div>
}

/** Marigold cluster for corners */
export function MarigoldCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  const flower = (cx: number, cy: number, r: number, key: number) => (
    <g key={key}>
      {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx={cx} cy={cy - r * 0.62} rx={r * 0.26} ry={r * 0.42} fill={i % 2 ? '#D4AF65' : '#E8D5A3'} transform={`rotate(${i * 36} ${cx} ${cy})`} />)}
      <circle cx={cx} cy={cy} r={r * 0.28} fill="#861B32" />
    </g>
  )
  return (
    <svg viewBox="0 0 160 160" className={`pointer-events-none select-none ${className}`} style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M0 18C40 20 80 40 100 82s24 56 28 78" fill="none" stroke="#D4AF65" strokeWidth="2" />
      {[[22, 22, 20], [58, 34, 18], [86, 62, 17], [104, 98, 16], [120, 132, 14]].map(([x, y, r], i) => flower(x, y, r, i))}
      {[[40, 56], [74, 80], [96, 120]].map(([x, y], i) => <path key={i} d={`M${x} ${y}c10-12 22-10 26 0-10 10-22 8-26 0z`} fill="#E8D5A3" opacity=".85" />)}
    </svg>
  )
}

export function DiyaDecoration({ className = 'h-14 w-14' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <ArtGlyph kind="diya" className="h-full w-full" />
      <span className="absolute left-1/2 top-[8%] h-[34%] w-[16%] -translate-x-1/2 animate-flicker rounded-full bg-saffron-300/40" />
    </div>
  )
}

export function FestivalOrnament({ kind = 'lotus', className = 'h-16 w-16' }: { kind?: ArtKind; className?: string }) {
  return <ArtGlyph kind={kind} className={className} />
}

/** Section separator */
export function LotusDivider({ className = '', tone = 'maroon' }: { className?: string; tone?: 'maroon' | 'ivory' }) {
  const c = tone === 'maroon' ? '#D4AF65' : '#E8D5A3'
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className={`flex items-center justify-center gap-3 ${className}`} role="presentation">
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: 0.9, ease }} style={{ originX: 1, background: `linear-gradient(to left, ${c}, transparent)` }} className="h-px w-16 sm:w-28" />
      <svg viewBox="0 0 48 24" className="h-6 w-12" aria-hidden="true">
        <path d="M24 2c4 5 5 10 0 17-5-7-4-12 0-17z" fill="#D4AF65" />
        <path d="M24 20C14 20 8 14 4 6c8 0 14 4 20 14zM24 20c10 0 16-6 20-14-8 0-14 4-20 14z" fill={c} opacity=".85" />
      </svg>
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: 0.9, ease }} style={{ originX: 0, background: `linear-gradient(to right, ${c}, transparent)` }} className="h-px w-16 sm:w-28" />
    </motion.div>
  )
}

export function TraditionalSectionHeader({ title, subtitle, align = 'center', tone = 'dark' }: { title: string; subtitle?: string; align?: 'center' | 'left'; tone?: 'dark' | 'light' }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className={`mb-8 sm:mb-10 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.h2 variants={fadeUp} className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${tone === 'light' ? 'text-ivory-100' : 'text-maroon-600'}`}>{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} className={`mt-2 max-w-2xl text-base ${align === 'center' ? 'mx-auto' : ''} ${tone === 'light' ? 'text-ivory-200' : 'text-maroon-700/80'}`}>{subtitle}</motion.p>}
      <LotusDivider className={`mt-4 ${align === 'center' ? '' : 'justify-start'}`} tone={tone === 'light' ? 'ivory' : 'maroon'} />
    </motion.div>
  )
}

/** Temple-arch frame wrapping an image or content */
export function TempleArchFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 380" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M8 372V150C8 70 80 40 150 8c70 32 142 62 142 142v222z" fill="none" stroke="#F28C28" strokeWidth="5" />
        <path d="M20 372V152C20 80 86 52 150 24c64 28 130 56 130 128v220z" fill="none" stroke="#9E1B32" strokeWidth="1.5" strokeDasharray="3 5" />
        <circle cx="150" cy="8" r="7" fill="#9E1B32" />
      </svg>
      <div className="relative h-full w-full overflow-hidden" style={{ clipPath: 'path("M20 380V152C20 80 86 52 150 24c64 28 130 56 130 128v228z")' }}>{children}</div>
    </div>
  )
}

/** Mango-leaf toran strip */
export function Toran({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 40" preserveAspectRatio="none" className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <path d="M0 4h600" stroke="#D4AF65" strokeWidth="1.5" />
      {Array.from({ length: 30 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20 + 10} 4)`}>
          <path d="M0 0c-6 8-6 20 0 30 6-10 6-22 0-30z" fill="#D4AF65" className="origin-top" style={{ transformOrigin: '0 0' }} />
          {i % 3 === 1 && <circle cx="0" cy="34" r="3" fill="#E8D5A3" />}
        </g>
      ))}
    </svg>
  )
}
