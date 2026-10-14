import { motion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LotusDivider, Mandala, RangoliDecoration, TempleArchFrame, TraditionalSectionHeader } from '../components/decor'
import { ArtGlyph } from '../components/decor/Glyphs'
import { Hero } from '../components/home/Hero'
import { Newsletter } from '../components/home/Newsletter'
import { ProductRail } from '../components/home/ProductRail'
import { CategoryCard } from '../components/ui/CategoryCard'
import { categories } from '../data/categories'
import { festivals } from '../data/festivals'
import { ProductImage } from '../components/ui/ProductImage'
import { container, fadeUp, viewport } from '../lib/motion'
import { ProductCard } from '../components/ui/ProductCard'
import { useAsync } from '../hooks/useAsync'
import { listProducts } from '../services/products'
import { ProductSkeletons } from '../components/ui/common'

function Featured() {
  const { data, loading } = useAsync(() => listProducts({ collection: 'featured' }), [])
  const featuredPhoto = data?.find((product) => product.images.length > 0)
  return (
    <section className="container-x mt-20">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr),minmax(0,7fr)]">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="relative mx-auto w-full max-w-sm">
          <TempleArchFrame className="aspect-[300/380]">
            <div className="grid h-full w-full place-items-center bg-gradient-to-b from-saffron-100 to-ivory-100">
              {featuredPhoto ? <ProductImage src={featuredPhoto.images[0]} alt={featuredPhoto.name} fit="cover" className="h-full w-full" /> : <ArtGlyph kind="kalasham" className="h-3/5 w-3/5" />}
            </div>
          </TempleArchFrame>
          <ArtGlyph kind="diya" className="absolute -bottom-3 -left-4 h-16 w-16 animate-flicker" />
          <ArtGlyph kind="diya" className="absolute -bottom-3 -right-4 h-16 w-16 animate-flicker" />
        </motion.div>
        <div>
          <TraditionalSectionHeader align="left" title="Bring Home Auspicious Traditions" subtitle="Selected pooja essentials and brass treasures for the home mandir." />
          {loading ? <ProductSkeletons n={4} className="sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3" /> : (
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              {data!.slice(0, 6).map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

function Festivals() {
  return (
    <section className="relative mt-20 overflow-hidden border-y border-gold-400/50 bg-maroon-700 py-16 text-ivory-100 sm:py-20">
      <RangoliDecoration className="absolute -left-40 -top-28 h-[32rem] w-[32rem] opacity-[.12] sm:-left-28 sm:h-[38rem] sm:w-[38rem]" spin={false} />
      <RangoliDecoration className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] opacity-[.1] sm:-right-28 sm:h-[40rem] sm:w-[40rem]" spin={false} />
      <div className="container-x relative">
        <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-[.22em] text-gold-200">Mark the occasion</p>
        <TraditionalSectionHeader tone="light" title="Festival Collections" subtitle="Explore the store’s active festival collections and their traditional essentials." />
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {festivals.filter((f) => f.active).map((f, i) => (
            <motion.div key={f.slug} variants={fadeUp} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <Link to={`/festivals/${f.slug}`} className="group relative flex min-h-52 h-full items-end overflow-hidden rounded-[1.5rem] border border-gold-300/70 bg-maroon-800 shadow-soft transition-all hover:-translate-y-1 hover:border-gold-200 hover:shadow-lift">
                <ProductImage src={categories.find((c) => f.categorySlugs.includes(c.slug))?.image} alt={f.name} fit="cover" className="absolute inset-0 h-full w-full" imageClassName="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/95 via-maroon-900/40 to-maroon-900/5" />
                <div className="relative w-full p-5 sm:p-6">
                  <span className="mb-2 inline-flex rounded-full border border-gold-200/60 bg-maroon-900/35 px-3 py-1 font-telugu text-[11px] text-gold-100 backdrop-blur-sm">{f.teluguName || 'Sacred collection'}</span>
                  <div className="flex items-end justify-between gap-3">
                    <div><h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">{f.name}</h3><p className="mt-1 text-sm text-ivory-200">{f.blurb}</p></div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-200/70 bg-maroon-900/40 text-gold-100 transition group-hover:bg-gold-300 group-hover:text-maroon-900"><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const trust = [
  { icon: Sparkles, title: 'Thoughtfully Selected Essentials', text: 'A considered range for daily worship, festivals and family functions.' },
  { icon: BookOpenCheck, title: 'Clear Product Information', text: 'Straightforward names, prices and availability so you can choose with confidence.' },
  { icon: Truck, title: 'Convenient Shopping Experience', text: 'Browse by category or festival and check out in a few simple steps.' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container-x mt-14 sm:mt-20">
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-saffron-600">Find your essentials</p><TraditionalSectionHeader align="left" title="Shop by collection" subtitle="Thoughtful essentials for daily worship, festivals and every auspicious occasion." /></div>
          <Link to="/categories" className="group inline-flex w-fit items-center gap-2 rounded-full border border-maroon-200 bg-white px-5 py-3 text-sm font-bold text-maroon-600 shadow-soft transition hover:border-maroon-500 hover:bg-maroon-500 hover:text-white">Browse all collections<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.slug} c={c} />)}
        </motion.div>
      </section>

      <Featured />
      <Festivals />

      <div className="mt-6">
        <ProductRail title="Varalaxmi Vratham" collection="varalaxmi-vratham" viewAll="/category/varalaxmi-vratham" />
        <ProductRail title="One Gram Gold & Silver" collection="one-gram-gold-silver" viewAll="/category/one-gram-gold-silver" />
        <ProductRail title="Mala & Beads" collection="mala-beads" viewAll="/category/mala-beads" />
        <ProductRail title="Daily Pooja Needs" collection="daily-pooja-needs" viewAll="/category/daily-pooja-needs" />
        <ProductRail title="Brass & Copper Items" collection="brass-copper-items" viewAll="/category/brass-copper-items" />
      </div>

      <section className="container-x mt-20">
        <div className="relative isolate overflow-hidden rounded-3xl border border-gold-300/50 bg-maroon-700 p-8 text-ivory-100 sm:p-14">
          <Mandala color="#D4AF65" className="pointer-events-none absolute -right-16 -top-16 z-0 h-80 w-80 opacity-[.12]" />
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr,auto]">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container}>
              <motion.p variants={fadeUp} className="font-telugu text-sm font-bold text-gold-200">{'శ్రీ సాయి మంజునాథ పూజా స్టోర్స్'}</motion.p>
              <motion.h2 variants={fadeUp} className="mt-1 max-w-xl text-4xl font-bold leading-tight text-ivory-100 sm:text-5xl">Tradition That Belongs in Every Home</motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-xl text-ivory-200">From daily worship to festival celebrations, explore pooja essentials and devotional collections chosen to help your family begin every sacred moment with care.</motion.p>
              <motion.div variants={fadeUp} className="mt-6"><Link to="/shop" className="btn btn-primary">Shop Now<ArrowRight className="h-4 w-4" /></Link></motion.div>
            </motion.div>
            <TempleArchFrame className="mx-auto hidden aspect-[300/380] w-56 md:block">
              <div className="grid h-full place-items-center bg-ivory-100"><ArtGlyph kind="mandir" className="h-3/4 w-3/4" /></div>
            </TempleArchFrame>
          </div>
        </div>
      </section>

      <section className="container-x mt-20">
        <TraditionalSectionHeader title="Why Shop With Us?" />
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-5 md:grid-cols-3">
          {trust.map(({ icon: I, title, text }) => (
            <motion.div key={title} variants={fadeUp} whileHover={{ y: -6 }} className="card relative overflow-hidden p-7 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-300 bg-gold-100 text-maroon-600"><I className="h-7 w-7" /></div>
              <h3 className="mt-4 text-2xl font-bold text-maroon-600">{title}</h3>
              <LotusDivider className="my-2 scale-75" />
              <p className="text-sm text-maroon-800/80">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Newsletter />
    </>
  )
}
