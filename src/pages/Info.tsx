import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, HandHeart, House, Landmark, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { LotusDivider, Mandala } from '../components/decor'
import { ArtGlyph } from '../components/decor/Glyphs'
import { CategoryCard } from '../components/ui/CategoryCard'
import { Field } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { categories } from '../data/categories'
import { storeConfig } from '../data/config'
import { festivals } from '../data/festivals'
import { categoryImages, productImages } from '../data/images'
import { container, fadeUp, viewport } from '../lib/motion'
import { ProductImage } from '../components/ui/ProductImage'
import { BackendUnavailableError } from '../services/client'
import { sendContact } from '../services/misc'

export function Categories() {
  return (<><PageHeader title="All Categories" crumbs={[{ label: 'Categories' }]} /><div className="container-x py-8"><motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{categories.map((c) => <CategoryCard key={c.slug} c={c} />)}</motion.div></div></>)
}

export function Festivals() {
  return (
    <><PageHeader title="Festival Specials" subtitle="Collections for every auspicious occasion." crumbs={[{ label: 'Festival Specials' }]} />
      <div className="container-x py-8"><motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.filter((f) => f.active).map((f) => (
          <motion.div key={f.slug} variants={fadeUp}><Link to={`/festivals/${f.slug}`} className="card group flex h-full flex-col items-center p-6 text-center transition hover:-translate-y-1 hover:shadow-lift"><div className="grid h-28 w-28 place-items-center rounded-t-[50%] rounded-b-xl bg-gradient-to-b from-saffron-100 to-saffron-200"><ArtGlyph kind={f.art} className="h-20 w-20 transition-transform group-hover:scale-110" /></div><h2 className="mt-3 text-3xl font-bold text-maroon-600">{f.name}</h2>{f.teluguName && <p className="font-telugu text-sm text-saffron-600">{f.teluguName}</p>}<p className="mt-1 text-sm text-maroon-800/80">{f.blurb}</p><span className="btn btn-outline mt-4">Shop Collection</span></Link></motion.div>
        ))}
      </motion.div></div></>
  )
}

const aboutStoryCards = [
  { src: categoryImages['brass-copper-items'], alt: 'Brass and copper pooja essentials', x: -82, y: -72, rotate: -9 },
  { src: productImages['lotus-m1']?.[0], alt: 'Lotus pooja decor', x: 86, y: -67, rotate: 8 },
  { src: categoryImages.garlands, alt: 'Traditional flower garlands', x: -80, y: 77, rotate: 7 },
  { src: categoryImages['varalaxmi-vratham'], alt: 'Varalaxmi Vratham devotional collection', x: 83, y: 74, rotate: -6 },
]

const aboutGallery = [
  { src: categoryImages['brass-copper-items'], alt: 'Brass and copper pooja essentials', label: 'Everyday worship' },
  { src: productImages['lotus-m1']?.[1], alt: 'Lotus decor for a sacred altar', label: 'Details of devotion' },
  { src: categoryImages.garlands, alt: 'Traditional flower garlands', label: 'A home prepared for prayer' },
  { src: categoryImages['ganesh-chaturthi'], alt: 'Ganesh Chaturthi devotional collection', label: 'Traditions for celebration' },
]

export function About() {
  const storyRef = useRef<HTMLElement>(null)
  const touchStart = useRef<number | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end start'] })
  const spreadProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 })
  const copyY = useTransform(scrollYProgress, [0, 0.45], [0, -24])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.65])
  const [cardOneX, cardOneY, cardOneRotate] = [
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[0].x * 0.12, aboutStoryCards[0].x]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[0].y * 0.12, aboutStoryCards[0].y]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[0].rotate * 0.35, aboutStoryCards[0].rotate]),
  ]
  const cardOneScale = useTransform(spreadProgress, [0, 0.32], [0.88, 1])
  const [cardTwoX, cardTwoY, cardTwoRotate] = [
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[1].x * 0.12, aboutStoryCards[1].x]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[1].y * 0.12, aboutStoryCards[1].y]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[1].rotate * 0.35, aboutStoryCards[1].rotate]),
  ]
  const cardTwoScale = useTransform(spreadProgress, [0, 0.32], [0.88, 1])
  const [cardThreeX, cardThreeY, cardThreeRotate] = [
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[2].x * 0.12, aboutStoryCards[2].x]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[2].y * 0.12, aboutStoryCards[2].y]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[2].rotate * 0.35, aboutStoryCards[2].rotate]),
  ]
  const cardThreeScale = useTransform(spreadProgress, [0, 0.32], [0.88, 1])
  const [cardFourX, cardFourY, cardFourRotate] = [
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[3].x * 0.12, aboutStoryCards[3].x]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[3].y * 0.12, aboutStoryCards[3].y]),
    useTransform(spreadProgress, [0, 0.32], [aboutStoryCards[3].rotate * 0.35, aboutStoryCards[3].rotate]),
  ]
  const cardFourScale = useTransform(spreadProgress, [0, 0.32], [0.88, 1])
  const cardTransforms = [
    { x: cardOneX, y: cardOneY, rotate: cardOneRotate, scale: cardOneScale },
    { x: cardTwoX, y: cardTwoY, rotate: cardTwoRotate, scale: cardTwoScale },
    { x: cardThreeX, y: cardThreeY, rotate: cardThreeRotate, scale: cardThreeScale },
    { x: cardFourX, y: cardFourY, rotate: cardFourRotate, scale: cardFourScale },
  ]
  const values = [
    { icon: Landmark, title: 'Tradition', text: 'Honouring the richness of Indian rituals.' },
    { icon: BadgeCheck, title: 'Quality', text: 'Carefully selected products for everyday worship.' },
    { icon: House, title: 'Convenience', text: 'Bringing essential pooja items closer to your home.' },
    { icon: HandHeart, title: 'Trust', text: 'Creating a reliable and welcoming shopping experience.' },
  ]
  const changeGallery = (direction: number) => setGalleryIndex((index) => (index + direction + aboutGallery.length) % aboutGallery.length)

  return (
    <div className="overflow-x-clip bg-ivory-100 text-ink">
      <section ref={storyRef} className="relative bg-ivory-100 py-10 sm:py-14 lg:py-10">
        <div className="container-x grid min-h-[calc(100svh-9rem)] items-center gap-5 lg:grid-cols-[.92fr,1.08fr] lg:gap-8">
            <motion.div style={{ y: reduce ? 0 : copyY, opacity: reduce ? 1 : copyOpacity }} className="relative z-10">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-maroon-500">{storeConfig.name}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08 }} className="max-w-2xl font-display text-[3.25rem] font-semibold leading-[.92] tracking-tight text-maroon-800 sm:text-6xl lg:text-7xl xl:text-[5.5rem]">Our Story,<br /><span className="text-maroon-500">Rooted in Devotion.</span></motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .2 }} className="mt-5 max-w-lg text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">Discover the traditions, essentials, and thoughtful details that make every sacred moment special.</motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .3 }} className="mt-6 sm:mt-8"><Link to="/shop" className="btn btn-primary !px-7">Explore the Store<ArrowRight className="h-4 w-4" /></Link></motion.div>
              <Mandala color="#D4AF65" className="pointer-events-none absolute -left-24 top-1/2 -z-10 hidden h-72 w-72 opacity-[.08] lg:block" />
            </motion.div>
            <div className="relative mx-auto h-[20rem] w-full max-w-[38rem] sm:h-[25rem] lg:h-[34rem]">
              <Mandala color="#D4AF65" className="pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-[.1] sm:h-72 sm:w-72" />
              <div className="absolute left-1/2 top-1/2 h-[16rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 sm:h-[20rem] sm:w-[25rem] lg:h-[25rem] lg:w-[31rem]">
                {aboutStoryCards.map((card, index) => {
                  const transform = cardTransforms[index]
                  return (
                    <div key={card.alt} className={`absolute left-1/2 top-1/2 aspect-[.78] w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] border-[4px] border-ivory-100 bg-ivory-100 shadow-[0_22px_55px_-28px_rgba(48,35,35,.55)] sm:rounded-[1.6rem] sm:border-[6px] ${index === 0 ? 'z-[1]' : index === 1 ? 'z-[2]' : index === 2 ? 'z-[3]' : 'z-[4]'}`}>
                      <motion.div style={{ x: reduce ? card.x : transform.x, y: reduce ? card.y : transform.y, rotate: reduce ? card.rotate : transform.rotate, scale: reduce ? 1 : transform.scale }} className="h-full w-full">
                        <ProductImage src={card.src} alt={card.alt} fit="cover" className="h-full w-full" imageClassName="transition-transform duration-700 hover:scale-105" />
                      </motion.div>
                    </div>
                  )
                })}
                <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/70 bg-ivory-50/85 px-3 py-2 text-[10px] font-semibold tracking-wide text-maroon-700 shadow-soft backdrop-blur-sm sm:px-4 sm:text-xs">A tradition of devotion</span>
              </div>
              <div className="absolute bottom-0 right-2 text-[10px] font-semibold uppercase tracking-[.18em] text-gold-500 sm:right-4 sm:text-xs">Everyday rituals · Sacred celebrations</div>
            </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-32 lg:py-40">
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: .8 }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[.24em] text-gold-500">A thought we hold close</p>
          <h2 className="font-display text-5xl font-medium leading-[.98] tracking-tight text-maroon-800 sm:text-7xl lg:text-[6.5rem]">Every Sacred Moment<br /><span className="pl-0 text-maroon-500 sm:pl-[12%]">Begins at Home.</span></h2>
          <div className="mt-8 flex items-center gap-4 sm:mt-10"><span className="h-px w-16 bg-gold-400 sm:w-24" /><p className="max-w-md text-sm leading-7 text-muted sm:text-base">{storeConfig.name} brings together pooja essentials and devotional collections for daily worship and special occasions.</p></div>
        </motion.div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-gold-500">A visual offering</p><h2 className="font-display text-4xl font-semibold text-maroon-800 sm:text-5xl">Details of devotion</h2></div>
          <span className="hidden text-sm text-muted sm:block">{String(galleryIndex + 1).padStart(2, '0')} <span className="text-gold-500">/</span> {String(aboutGallery.length).padStart(2, '0')}</span>
        </div>
        <div className="relative touch-pan-y select-none overflow-hidden rounded-[1.5rem] bg-maroon-900 sm:rounded-[2rem]" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current != null && end != null && Math.abs(end - touchStart.current) > 45) changeGallery(end < touchStart.current ? 1 : -1); touchStart.current = null }}>
          <div className="relative aspect-[.92] sm:aspect-[1.7] lg:aspect-[2.15]">
            <AnimatePresence mode="wait">
              <motion.div key={galleryIndex} initial={reduce ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: .995 }} transition={{ duration: reduce ? 0 : .42 }} className="absolute inset-0">
                <ProductImage src={aboutGallery[galleryIndex].src} alt={aboutGallery[galleryIndex].alt} fit="cover" className="h-full w-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#541323]/80 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-5 right-5 font-display text-2xl font-semibold text-ivory-100 sm:bottom-9 sm:left-9 sm:text-4xl">{aboutGallery[galleryIndex].label}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-5 right-4 flex items-center gap-2 sm:bottom-8 sm:right-8">
            <button type="button" aria-label="Previous gallery image" onClick={() => changeGallery(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-gold-200/50 bg-maroon-900/45 text-ivory-100 backdrop-blur-sm transition hover:bg-gold-300 hover:text-maroon-900"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Next gallery image" onClick={() => changeGallery(1)} className="grid h-10 w-10 place-items-center rounded-full border border-gold-200/50 bg-maroon-900/45 text-ivory-100 backdrop-blur-sm transition hover:bg-gold-300 hover:text-maroon-900"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="About image gallery">
          {aboutGallery.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={galleryIndex === index} aria-label={`Show ${item.label}`} onClick={() => setGalleryIndex(index)} className={`h-1.5 rounded-full transition-all ${galleryIndex === index ? 'w-10 bg-maroon-500' : 'w-3 bg-gold-300 hover:bg-gold-500'}`} />)}
        </div>
      </section>

      <section className="container-x grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[.9fr,1.1fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: .7 }} className="relative mx-auto w-full max-w-xl">
          <Mandala color="#D4AF65" className="pointer-events-none absolute -right-10 -top-12 -z-10 h-52 w-52 opacity-[.1] sm:h-64 sm:w-64" />
          <div className="aspect-[.9] overflow-hidden rounded-t-[48%] rounded-b-[1.5rem] border border-gold-300/60 bg-gold-100 sm:aspect-[1.05]">
            <ProductImage src={categoryImages['varalaxmi-vratham']} alt="Varalaxmi Vratham devotional collection" fit="cover" className="h-full w-full" imageClassName="transition-transform duration-700 hover:scale-105" />
          </div>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container} className="max-w-2xl">
          <motion.p variants={fadeUp} className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-gold-500">Our philosophy</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl font-medium leading-[.98] text-maroon-800 sm:text-6xl">Tradition in<br /><span className="text-maroon-500">Every Detail.</span></motion.h2>
          <motion.div variants={fadeUp}><LotusDivider className="my-6 justify-start" /></motion.div>
          <motion.p variants={fadeUp} className="text-base leading-8 text-muted">{storeConfig.name} is a place to discover the essentials of home worship, from everyday pooja needs to devotional collections for meaningful occasions.</motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-8 text-muted">We bring related traditions and thoughtful details together, so finding items for your rituals feels simple and familiar.</motion.p>
        </motion.div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#541323] py-20 text-ivory-100 sm:py-28">
        <Mandala color="#D4AF65" className="pointer-events-none absolute -left-36 -top-32 -z-10 h-80 w-80 opacity-[.1] sm:-left-24 sm:-top-40 sm:h-[30rem] sm:w-[30rem]" />
        <Mandala color="#D4AF65" className="pointer-events-none absolute -bottom-40 -right-36 -z-10 h-80 w-80 opacity-[.1] sm:-bottom-44 sm:-right-28 sm:h-[32rem] sm:w-[32rem]" />
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr,.8fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container} className="relative z-10">
            <motion.p variants={fadeUp} className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-gold-200">A moment of meaning</motion.p>
            <motion.h2 variants={fadeUp} className="max-w-xl font-display text-5xl font-medium leading-[1.02] sm:text-6xl">Made for Moments<br />of Devotion.</motion.h2>
            <motion.div variants={fadeUp} className="my-6 h-px w-20 bg-gold-300" />
            <motion.p variants={fadeUp} className="max-w-xl text-base leading-8 text-ivory-200">From the first diya of the day to the preparations for a festival, familiar pooja essentials help make space for reflection, gratitude, and togetherness.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} transition={{ duration: .7 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[45%_45%_1.5rem_1.5rem] border border-gold-300/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[45%_45%_1.5rem_1.5rem] border border-gold-300/50 bg-maroon-800">
              <ProductImage src={categoryImages['ganesh-chaturthi']} alt="Ganesh Chaturthi devotional collection" fit="cover" className="h-full w-full" imageClassName="transition-transform duration-700 hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#541323]/25 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-gold-500">Our values</p><h2 className="font-display text-4xl font-medium text-maroon-800 sm:text-5xl">What We Stand For</h2></div>
          <p className="max-w-md text-sm leading-7 text-muted">A thoughtful approach to the essentials and traditions that are part of everyday worship.</p>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, index) => (
            <motion.div key={title} variants={fadeUp} className="border-t border-gold-300/80 pt-5">
              <div className="mb-5 flex items-center justify-between"><span className="font-display text-sm text-gold-500">0{index + 1}</span><Icon className="h-5 w-5 text-maroon-500" strokeWidth={1.5} /></div>
              <h3 className="font-display text-2xl font-medium text-maroon-800">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="relative isolate grid min-h-[22rem] items-center overflow-hidden rounded-[2rem] bg-maroon-700 text-ivory-100 sm:min-h-[25rem] lg:grid-cols-[1fr,.8fr]">
          <Mandala color="#D4AF65" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-72 w-72 opacity-[.1] sm:-right-12 sm:h-96 sm:w-96" />
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container} className="relative z-10 px-7 py-10 sm:px-12 lg:py-14">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-gold-200">{storeConfig.name}</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl font-medium sm:text-6xl">Bring Divinity Home.</motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md leading-7 text-ivory-200">Find pooja essentials and devotional collections for your home and sacred occasions.</motion.p>
            <motion.div variants={fadeUp} className="mt-7"><Link to="/shop" className="btn btn-saffron">Shop Pooja Essentials<ArrowRight className="h-4 w-4" /></Link></motion.div>
          </motion.div>
          <div className="relative -mx-7 -mb-10 mt-2 h-52 overflow-hidden sm:-mx-12 sm:-mb-14 sm:h-64 lg:-mx-0 lg:-my-14 lg:h-full lg:min-h-[25rem]">
            <ProductImage src={categoryImages['brass-copper-items']} alt="Brass pooja essentials" fit="cover" className="absolute inset-0 h-full w-full" imageClassName="transition-transform duration-700 hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-700 via-maroon-700/20 to-transparent lg:bg-gradient-to-r lg:from-maroon-700 lg:via-maroon-700/35 lg:to-transparent" />
          </div>
        </div>
      </section>
    </div>
  )
}

const cs = z.object({ name: z.string().min(2, 'Enter your name'), email: z.string().email('Enter a valid email'), message: z.string().min(10, 'Please write a little more') })
export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof cs>>({ resolver: zodResolver(cs), mode: 'onTouched' })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const c = storeConfig.contact
  return (
    <><PageHeader title="Contact Us" crumbs={[{ label: 'Contact' }]} />
      <div className="container-x grid gap-8 py-10 md:grid-cols-2">
        <div className="card space-y-4 p-6"><h2 className="text-2xl font-bold text-maroon-600">Visit & reach us</h2>
          <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-leaf-600" />{c.address}</p><p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-leaf-600" />{c.phone}</p><p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-leaf-600" />{c.email}</p><p className="text-sm text-maroon-700/70">{c.hours}</p></div>
        <form noValidate onSubmit={handleSubmit(async (v) => { setMsg(null); try { await sendContact(v); setMsg({ ok: true, text: 'Thanks — your message was sent.' }); reset() } catch (e) { setMsg({ ok: false, text: e instanceof BackendUnavailableError ? 'Messages cannot be sent yet — the store server is not connected.' : 'Could not send. Please try again.' }) } })} className="card space-y-4 p-6">
          <h2 className="text-2xl font-bold text-maroon-600">Send a message</h2>
          <Field label="Name" error={errors.name?.message}><input className={`input ${errors.name ? 'input-error' : ''}`} {...register('name')} /></Field>
          <Field label="Email" error={errors.email?.message}><input type="email" className={`input ${errors.email ? 'input-error' : ''}`} {...register('email')} /></Field>
          <Field label="Message" error={errors.message?.message}><textarea rows={4} className={`input ${errors.message ? 'input-error' : ''}`} {...register('message')} /></Field>
          {msg && <p role="alert" className={`rounded-lg p-3 text-sm font-medium ${msg.ok ? 'bg-leaf-50 text-leaf-700' : 'bg-maroon-50 text-maroon-700'}`}>{msg.text}</p>}
          <button disabled={isSubmitting} className="btn btn-primary">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}Send</button>
        </form>
      </div></>
  )
}

const policies: Record<string, { title: string; body: string[] }> = {
  privacy: { title: 'Privacy Policy', body: ['This page is a placeholder. The store owner must supply the final privacy policy before launch.', 'It should describe what personal data is collected (name, phone, address, email), why, how long it is kept and how customers can request deletion.'] },
  terms: { title: 'Terms & Conditions', body: ['This page is a placeholder. The store owner must supply final terms before launch.', 'It should cover ordering, pricing, payment, cancellations and governing law.'] },
  shipping: { title: 'Shipping Policy', body: ['This page is a placeholder. Delivery areas, charges and timelines must be confirmed by the store before launch.', `Delivery charges are calculated at checkout.`] },
  returns: { title: 'Returns & Refunds', body: ['This page is a placeholder. The store owner must supply the final returns and refunds policy before launch.'] },
}
export function Policy() {
  const key = useLocation().pathname.replace('/', '')
  const p = policies[key]
  return (<><PageHeader title={p?.title ?? 'Policy'} crumbs={[{ label: p?.title ?? 'Policy' }]} /><div className="container-x max-w-3xl space-y-4 py-10">{(p?.body ?? ['Page not found.']).map((t) => <p key={t} className="text-maroon-800/90">{t}</p>)}</div></>)
}

export function NotFound() {
  return (<div className="container-x py-20 text-center"><ArtGlyph kind="diya" className="mx-auto h-28 w-28" /><h1 className="mt-4 text-5xl font-bold text-maroon-600">Page not found</h1><p className="mt-2">The page you are looking for does not exist.</p><Link to="/" className="btn btn-primary mt-6">Back to Home</Link></div>)
}
