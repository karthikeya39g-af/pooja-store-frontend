import { categories } from '../data/categories'
import { products } from '../data/products'
import type { Category, Product, ProductQuery } from '../types'
import { api, delay, isMockMode } from './client'

export async function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  if (!isMockMode) {
    const qs = new URLSearchParams(Object.entries(query).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)]))
    return api<Product[]>(`/products?${qs}`)
  }
  await delay(300)
  let out = products.slice()
  const { q, category, collection, min, max, inStock, sort, ids, onOffer } = query
  if (ids) out = out.filter((p) => ids.includes(p.id))
  if (q) {
    const s = q.toLowerCase().trim()
    out = out.filter((p) => `${p.name} ${p.description} ${categories.find((c) => c.slug === p.categorySlug)?.name}`.toLowerCase().includes(s))
  }
  if (category) out = out.filter((p) => p.categorySlug === category)
  if (collection) out = out.filter((p) => p.collections.includes(collection))
  if (min != null) out = out.filter((p) => p.price >= min)
  if (max != null) out = out.filter((p) => p.price <= max)
  if (inStock) out = out.filter((p) => p.stock > 0)
  if (onOffer) out = out.filter((p) => p.originalPrice && p.originalPrice > p.price)
  const disc = (p: Product) => (p.originalPrice ? (p.originalPrice - p.price) / p.originalPrice : 0)
  switch (sort) {
    case 'price-asc': out.sort((a, b) => a.price - b.price); break
    case 'price-desc': out.sort((a, b) => b.price - a.price); break
    case 'name': out.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'discount': out.sort((a, b) => disc(b) - disc(a)); break
    default: out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  }
  return out
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!isMockMode) return api<Product>(`/products/${slug}`)
  await delay(200)
  return products.find((p) => p.slug === slug || p.id === slug)
}

export async function listCategories(): Promise<Category[]> {
  if (!isMockMode) return api<Category[]>('/categories')
  return categories
}
