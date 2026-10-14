/** Store configuration — replace with GET /api/v1/store-settings */
export const storeConfig = {
  name: 'Sri Sai Manjunatha Pooja Stores',
  teluguName: 'శ్రీ సాయి మంజునాథ పూజా స్టోర్స్',
  tagline: 'Your Trusted Place for All Pooja Needs',
  supportingTagline: 'Everything You Need for Every Sacred Beginning',
  announcement: 'Discover traditional essentials for every auspicious occasion.',
  contact: {
    // Placeholders — set real details in store settings
    address: 'Store address to be added',
    phone: '+91 00000 00000',
    email: 'hello@example.com',
    hours: 'Opening hours to be added',
  },
  social: [] as { label: string; url: string }[],
  deliveryFlat: 60,
  freeDeliveryAbove: 1500,
}
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''
