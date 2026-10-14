import type { Product } from '../types'
import { getProductImages } from './images'

/**
 * DEVELOPMENT REFERENCE DATA — prices, stock and discounts are unverified.
 * Replace with live API data (GET /api/v1/products). Image URLs are kept in `images.ts`.
 */
type P = Omit<Product, 'id' | 'images' | 'stock'> & { stock?: number }
const mk = (p: P, i: number): Product => ({ id: `p${i + 1}`, images: getProductImages(p.slug), stock: 12, ...p })

const raw: P[] = [
  // Varalaxmi Vratham
  { slug: 'lotus-m1', name: 'Lotus M1', categorySlug: 'varalaxmi-vratham', collections: ['varalaxmi-vratham'], price: 1799, art: 'lotus', featured: true, description: 'Lotus décor piece for the Varalaxmi Vratham altar. Variants to be confirmed before launch.' },
  { slug: 'banana-tree', name: 'Banana Tree', categorySlug: 'varalaxmi-vratham', collections: ['varalaxmi-vratham'], price: 1299, art: 'banana', description: 'Decorative banana tree for the vratham mandapam.' },
  { slug: 'lotus-m2', name: 'Lotus M2', categorySlug: 'varalaxmi-vratham', collections: ['varalaxmi-vratham'], price: 1499, art: 'lotus', description: 'A second lotus décor design for the vratham setting.' },
  // One Gram Gold & Silver
  { slug: 'laxmi-ganesh', name: 'Laxmi Ganesh', categorySlug: 'one-gram-gold-silver', collections: ['one-gram-gold-silver', 'featured'], price: 900, originalPrice: 1000, art: 'idol', featured: true, description: 'Laxmi and Ganesh pair in one-gram gold finish.' },
  { slug: 'shiva-lingam', name: 'Shiva Lingam', categorySlug: 'one-gram-gold-silver', collections: ['one-gram-gold-silver'], price: 504, originalPrice: 560, art: 'idol', description: 'Shiva Lingam in one-gram gold finish.' },
  { slug: 'cow-calf-kd-big', name: 'Cow Calf KD Big', categorySlug: 'one-gram-gold-silver', collections: ['one-gram-gold-silver', 'featured'], price: 2879, originalPrice: 3199, art: 'idol', featured: true, description: 'Large cow and calf figure in one-gram gold finish.' },
  { slug: 'silver-plated-tirupati-balaji-10', name: 'Silver Plated Tirupati Balaji 10-inch', categorySlug: 'one-gram-gold-silver', collections: ['one-gram-gold-silver', 'featured'], price: 3700, art: 'idol', featured: true, specs: { Height: '10 inch', Finish: 'Silver plated' }, description: 'Silver plated Tirupati Balaji idol, 10 inches tall.' },
  { slug: 'silver-plated-balaji-charan', name: 'Silver Plated Balaji Charan', categorySlug: 'one-gram-gold-silver', collections: ['one-gram-gold-silver'], price: 899, originalPrice: 999, art: 'idol', description: 'Silver plated Balaji charan (sacred feet).' },
  // Mala & Beads
  { slug: 'pyarits-bracelet', name: 'Pyarits Bracelet', categorySlug: 'mala-beads', collections: ['mala-beads'], price: 314, originalPrice: 349, art: 'mala', description: 'Beaded bracelet for daily wear.' },
  { slug: 'navagraha-mala-yellow', name: 'Navagraha Mala Yellow', categorySlug: 'mala-beads', collections: ['mala-beads', 'featured'], price: 810, originalPrice: 900, art: 'mala', featured: true, description: 'Navagraha mala in yellow.' },
  { slug: 'navagraha-mala-block', name: 'Navagraha Mala Block', categorySlug: 'mala-beads', collections: ['mala-beads'], price: 810, originalPrice: 900, art: 'mala', description: 'Navagraha mala in block colour.' },
  { slug: 'navagraha-mala-white', name: 'Navagraha Mala White', categorySlug: 'mala-beads', collections: ['mala-beads'], price: 810, originalPrice: 900, art: 'mala', description: 'Navagraha mala in white.' },
  { slug: 'navagraha-mala-blue', name: 'Navagraha Mala Blue', categorySlug: 'mala-beads', collections: ['mala-beads'], price: 810, originalPrice: 900, art: 'mala', description: 'Navagraha mala in blue.' },
  // Placeholder samples so every featured collection renders (replace with real stock)
  { slug: 'sample-brass-diya', name: 'Brass Diya (sample)', categorySlug: 'brass-copper-items', collections: ['brass-copper-items', 'featured'], price: 450, art: 'diya', isSample: true, featured: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-copper-kalasham', name: 'Copper Kalasham (sample)', categorySlug: 'brass-copper-items', collections: ['brass-copper-items', 'featured'], price: 650, art: 'kalasham', isSample: true, featured: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-brass-bell', name: 'Brass Pooja Bell (sample)', categorySlug: 'brass-copper-items', collections: ['brass-copper-items'], price: 350, art: 'bell', isSample: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-brass-plate', name: 'Brass Pooja Plate (sample)', categorySlug: 'brass-copper-items', collections: ['brass-copper-items'], price: 550, art: 'plate', isSample: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-pooja-thali', name: 'Pooja Thali Set (sample)', categorySlug: 'daily-pooja-needs', collections: ['daily-pooja-needs'], price: 499, art: 'plate', isSample: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-agarbatti', name: 'Agarbatti Stand (sample)', categorySlug: 'daily-pooja-needs', collections: ['daily-pooja-needs'], price: 120, art: 'bell', isSample: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-cotton-wicks', name: 'Cotton Wicks Pack (sample)', categorySlug: 'daily-pooja-needs', collections: ['daily-pooja-needs'], price: 60, art: 'diya', isSample: true, description: 'Placeholder product — replace with real catalogue item.' },
  { slug: 'sample-kumkum-set', name: 'Haldi Kumkum Set (sample)', categorySlug: 'daily-pooja-needs', collections: ['daily-pooja-needs'], price: 150, art: 'plate', isSample: true, stock: 0, description: 'Placeholder product — replace with real catalogue item.' },
]

export const products: Product[] = raw.map(mk)
