export type ArtKind = 'diya' | 'kalasham' | 'lotus' | 'mala' | 'idol' | 'bell' | 'book' | 'garland' | 'frame' | 'bag' | 'cloth' | 'mandir' | 'crystal' | 'plate' | 'banana' | 'ring'

export interface Category {
  slug: string
  name: string
  art: ArtKind
  image?: string
  blurb: string
}

export interface Product {
  id: string
  slug: string
  name: string
  categorySlug: string
  collections: string[]
  price: number
  originalPrice?: number
  stock: number
  images: string[]
  art: ArtKind
  description: string
  specs?: Record<string, string>
  featured?: boolean
  /** Development placeholder — must be verified/replaced with live data */
  isSample?: boolean
}

export interface Festival {
  slug: string
  name: string
  teluguName?: string
  blurb: string
  categorySlugs: string[]
  art: ArtKind
  active: boolean
}

export interface CartLine { productId: string; qty: number }

export interface Address {
  name: string; phone: string; email?: string; line1: string; city: string; state: string; pin: string
}

export interface Order {
  id: string
  createdAt: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  lines: { productId: string; name: string; qty: number; price: number }[]
  total: number
}

export interface Offer { id: string; title: string; description: string; categorySlug?: string }

export interface ProductQuery {
  q?: string
  category?: string
  collection?: string
  min?: number
  max?: number
  inStock?: boolean
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name' | 'discount'
  ids?: string[]
  onOffer?: boolean
}
