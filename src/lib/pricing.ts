import { storeConfig } from '../data/config'

/** Display-only estimate. The backend is authoritative for totals. */
export function estimate(subtotal: number) {
  const delivery = subtotal === 0 || subtotal >= storeConfig.freeDeliveryAbove ? 0 : storeConfig.deliveryFlat
  return { subtotal, delivery, total: subtotal + delivery }
}
