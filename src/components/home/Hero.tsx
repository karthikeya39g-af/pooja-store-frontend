import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryImages } from '../../data/images'
import { ease } from '../../lib/motion'
import { MarigoldCorner, RangoliDecoration } from '../decor'
import { ProductImage } from '../ui/ProductImage'

interface Slide { id: string; bg: string; kicker: string; title: string; text: string; ctaTo: string }
const slides: Slide[] = [
  { id: 's1', bg: 'from-maroon-700 via-maroon-500 to-maroon-600', kicker: 'శుభ ఆరంభం · Sacred Beginnings', title: 'Bring Divinity Home', text: 'Everything you need for your daily prayers and sacred celebrations.', ctaTo: '/festivals' },
  { id: 's2', bg: 'from-maroon-800 via-maroon-700 to-maroon-500', kicker: 'Festival Collections', title: 'Celebrate Every Sacred Moment', text: 'Discover devotional treasures and traditional essentials for the occasions you hold dear.', ctaTo: '/festivals' },
]

export function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 26])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -18])
  useEffect(() => {
    if (paused || manual || reduce) return
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [paused, manual, reduce])
  const go = (n: number) => setI((n + slides.length) % slides.length)
  const s = slides[i]
  return (
    <section ref={ref} aria-roledescription="carousel" aria-label="Featured banners" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="bg-ivory-100 px-3 py-5 sm:px-5 sm:py-8">
      <div className="container-x relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-maroon-800 via-maroon-600 to-maroon-500 text-ivory-100 shadow-lift sm:rounded-[2.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(212,175,101,.12),transparent_48%)]" />
        <motion.div style={{ y: reduce ? 0 : y1 }} className="pointer-events-none absolute inset-0"><RangoliDecoration className="absolute -right-40 -top-36 h-[34rem] w-[34rem] opacity-[.12] sm:-right-28 sm:-top-40 sm:h-[42rem] sm:w-[42rem]" spin={false} /></motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }} className="pointer-events-none absolute -left-2 -top-2 z-20 w-28 origin-top-left opacity-70 sm:w-40"><MarigoldCorner /></motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }} className="pointer-events-none absolute -right-2 -top-2 z-20 hidden w-40 origin-top-right opacity-70 sm:block"><MarigoldCorner flip /></motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={s.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="relative grid min-h-[32rem] items-center gap-4 px-6 pb-20 pt-14 sm:min-h-[32rem] sm:px-12 lg:min-h-[34rem] lg:grid-cols-[1.1fr,.9fr] lg:px-16 lg:py-14">
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }} className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 rounded-full border border-saffron-200/40 bg-white/10 px-4 py-2 font-telugu text-xs font-bold uppercase tracking-wider text-saffron-200 sm:text-sm"><span className="h-1.5 w-1.5 rounded-full bg-saffron-300" />{s.kicker}</motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease }} className="mt-6 font-display text-5xl font-bold leading-[.98] tracking-tight text-white sm:text-6xl lg:text-7xl">{s.title}</motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory-200 sm:text-lg lg:mx-0">{s.text}</motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/shop" className="btn btn-saffron !px-7 !py-3.5 text-base shadow-lift">Shop Pooja Essentials<ChevronRight className="h-4 w-4" /></Link>
                <Link to={s.ctaTo === '/festivals' ? '/category/varalaxmi-vratham' : s.ctaTo} className="btn btn-ghost-light !px-7 !py-3.5 text-base">Explore Pooja Collections</Link>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ivory-200/90 lg:justify-start">
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron-300" />Daily pooja essentials</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron-300" />Festival collections</span>
              </motion.div>
            </motion.div>
            <motion.div style={{ y: reduce ? 0 : y2 }} className="relative mx-auto hidden h-[25rem] w-[25rem] place-items-center lg:grid">
              <div className="absolute inset-0 rounded-full border border-saffron-200/30" />
              <div className="absolute inset-5 rounded-full border border-dashed border-saffron-200/35" />
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-saffron-200/25 via-ivory-100/10 to-transparent shadow-[0_0_90px_rgba(212,175,101,.16)]" />
              <motion.div initial={{ scale: 0.86, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease }} className="relative h-28 w-28 overflow-hidden rounded-t-[50%] rounded-b-[2rem] border border-saffron-200/60 bg-ivory-100 shadow-[0_24px_80px_rgba(20,0,0,.28)] sm:h-52 sm:w-52 sm:rounded-b-[2.5rem] lg:h-64 lg:w-64">
                <ProductImage src={categoryImages['brass-copper-items']} alt="Brass and copper pooja essentials" fit="cover" className="h-full w-full" />
                <div className="pointer-events-none absolute inset-0 rounded-t-[50%] rounded-b-[2rem] border-4 border-ivory-100/80 sm:rounded-b-[2.5rem] sm:border-[6px]" />
                <div className="absolute inset-1.5 rounded-t-[50%] rounded-b-[1.5rem] border border-dashed border-saffron-200/90 sm:inset-2 sm:rounded-b-[2rem]" />
              </motion.div>
              <div className="absolute right-0 top-8 hidden rounded-2xl border border-white/30 bg-white/90 px-4 py-3 text-maroon-800 shadow-lift backdrop-blur-sm sm:block lg:-right-3 lg:top-10">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-maroon-400">Made for</p><p className="font-display text-lg font-bold">Sacred moments</p>
              </div>
              <div className="absolute bottom-7 left-0 hidden rounded-2xl border border-white/30 bg-saffron-300 px-4 py-3 text-maroon-900 shadow-lift sm:block lg:-left-5">
                <p className="font-display text-lg font-bold">Tradition,</p><p className="text-xs font-semibold">close to home</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center gap-3 lg:bottom-6 lg:left-auto lg:right-10">
        <button aria-label="Previous slide" onClick={() => { setManual(true); go(i - 1) }} className="grid h-9 w-9 place-items-center rounded-full bg-ivory-100/90 text-maroon-600 hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {slides.map((x, n) => (<button key={x.id} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}`} onClick={() => { setManual(true); setI(n) }} className="p-1"><motion.span animate={{ width: n === i ? 28 : 10 }} className={`block h-2.5 rounded-full ${n === i ? 'bg-saffron-400' : 'bg-ivory-100/70'}`} /></button>))}
        </div>
        <button aria-label="Next slide" onClick={() => { setManual(true); go(i + 1) }} className="grid h-9 w-9 place-items-center rounded-full bg-ivory-100/90 text-maroon-600 hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
        <button aria-label={manual ? 'Resume autoplay' : 'Pause autoplay'} onClick={() => setManual((m) => !m)} className="grid h-9 w-9 place-items-center rounded-full bg-ivory-100/90 text-maroon-600 hover:bg-white">{manual ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
        </div>
      </div>
    </section>
  )
}
