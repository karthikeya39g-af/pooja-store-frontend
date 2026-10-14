import type { Category } from '../types'
import { getCategoryImage } from './images'

const categoryData: Category[] = [
  { slug: 'books', name: 'Books', art: 'book', blurb: 'Stotras, vratha kathas and devotional reading.' },
  { slug: 'brass-copper-items', name: 'Brass & Copper Items', art: 'diya', blurb: 'Lamps, plates and vessels for daily worship.' },
  { slug: 'cloth-items', name: 'Cloth Items', art: 'cloth', blurb: 'Sacred cloths, angavastram and pooja textiles.' },
  { slug: 'daily-pooja-needs', name: 'Daily Pooja Needs', art: 'plate', blurb: 'Everyday essentials for the home mandir.' },
  { slug: 'decorative-marriage-items', name: 'Decorative & Marriage Items', art: 'ring', blurb: 'Auspicious décor for weddings and functions.' },
  { slug: 'envelopes-bags', name: 'Envelopes & Bags', art: 'bag', blurb: 'Gifting covers and return-gift bags.' },
  { slug: 'festival-needs', name: 'Festival Needs', art: 'lotus', blurb: 'Everything for the festival of the season.' },
  { slug: 'fiber-steel-items', name: 'Fiber & Steel Items', art: 'plate', blurb: 'Durable, easy-care pooja utility items.' },
  { slug: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', art: 'idol', blurb: 'Idols, decorations and pooja samagri.' },
  { slug: 'garlands', name: 'Garlands', art: 'garland', blurb: 'Garlands and torans for every deity and doorway.' },
  { slug: 'german-silver', name: 'German Silver', art: 'plate', blurb: 'Lustrous German silver pooja articles.' },
  { slug: 'homam-vratham', name: 'Homam & Vratham', art: 'kalasham', blurb: 'Samagri for homams and sacred vrathams.' },
  { slug: 'mala-beads', name: 'Mala & Beads', art: 'mala', blurb: 'Japa malas, bracelets and sacred beads.' },
  { slug: 'one-gram-gold-silver', name: 'One Gram Gold & Silver', art: 'idol', blurb: 'Gold and silver plated idols and keepsakes.' },
  { slug: 'peetam-mandir', name: 'Peetam & Mandir', art: 'mandir', blurb: 'Wooden peetams and home temples.' },
  { slug: 'photo-frames-yantras', name: 'Photo Frames & Yantras', art: 'frame', blurb: 'Framed deities and sacred yantras.' },
  { slug: 'sphatika-maragaj', name: 'Sphatika & Maragaj Items', art: 'crystal', blurb: 'Sphatika and maragaj crystal articles.' },
  { slug: 'varalaxmi-vratham', name: 'Varalaxmi Vratham', art: 'kalasham', blurb: 'Lotus décor, kalasam sets and vratham essentials.' },
  { slug: 'others', name: 'Others', art: 'bell', blurb: 'More traditional treasures to explore.' },
]

export const categories: Category[] = categoryData.map((category) => ({
  ...category,
  image: getCategoryImage(category.slug),
}))

export const categoryBySlug = (slug?: string) => categories.find((c) => c.slug === slug)
