import { products } from '../data/products'
import type { Product } from '../types'

/** Cart/wishlist lookup. In live mode swap for a batched API call. */
export const findProducts = (ids: string[]): Product[] => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]
