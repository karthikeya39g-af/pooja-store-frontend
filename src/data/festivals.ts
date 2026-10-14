import type { Festival, Offer } from '../types'

/** Administrator-configured. `active` controls visibility; never assume a festival is currently on. */
export const festivals: Festival[] = [
  { slug: 'varalakshmi-vratham', name: 'Varalakshmi Vratham', teluguName: 'వరలక్ష్మి వ్రతం', blurb: 'Lotus décor, kalasam and vratham essentials.', categorySlugs: ['varalaxmi-vratham', 'homam-vratham'], art: 'lotus', active: true },
  { slug: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', teluguName: 'వినాయక చవితి', blurb: 'Welcome Ganapati with idols and décor.', categorySlugs: ['ganesh-chaturthi'], art: 'idol', active: true },
  { slug: 'dasara', name: 'Dasara', teluguName: 'దసరా', blurb: 'Pooja needs for the nine auspicious nights.', categorySlugs: ['festival-needs', 'daily-pooja-needs'], art: 'kalasham', active: true },
  { slug: 'diwali', name: 'Diwali', teluguName: 'దీపావళి', blurb: 'Diyas, Laxmi idols and festive décor.', categorySlugs: ['brass-copper-items', 'one-gram-gold-silver'], art: 'diya', active: true },
  { slug: 'ugadi', name: 'Ugadi', teluguName: 'ఉగాది', blurb: 'Begin the new year with garlands and torans.', categorySlugs: ['garlands', 'festival-needs'], art: 'garland', active: true },
]

export const offers: Offer[] = [
  { id: 'o1', title: 'Reference price savings', description: 'Products showing a struck-through price are discounted from their reference price.' },
]
