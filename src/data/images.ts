const BASE = 'https://api.srirudra.com/Uploads/Images/'

export const categoryImages: Record<string, string> = {
  books: `${BASE}jpeg-optimizer_Books.webp`,
  'brass-copper-items': `${BASE}jpeg-optimizer_Brass%20&Copper%20Items.jpg`,
  'cloth-items': `${BASE}jpeg-optimizer_Cloth%20Items.jpg`,
  'daily-pooja-needs': `${BASE}jpeg-optimizer_Daily%20Pooja%20Needs.jpg`,
  'decorative-marriage-items': `${BASE}jpeg-optimizer_Decorative%20&%20Marrige%20Items.jpg`,
  'envelopes-bags': `${BASE}jpeg-optimizer_Envelopes%20&%20Bags%20(1).jpg`,
  'festival-needs': `${BASE}jpeg-optimizer_Festival%20Needs.jpg`,
  'fiber-steel-items': `${BASE}jpeg-optimizer_Fiber%207%20Steel%20Items%20(1).jpg`,
  'ganesh-chaturthi': `${BASE}Gemini_Generated_Image_jy546hjy546hjy54.png`,
  garlands: `${BASE}jpeg-optimizer_Garlands%20(2).jpg`,
  'german-silver': `${BASE}jpeg-optimizer_German%20Silver.jpg`,
  'homam-vratham': `${BASE}jpeg-optimizer_Homam&%20Vratham.jpg`,
  'mala-beads': `${BASE}jpeg-optimizer_Mala%20&%20Beads.jpg`,
  'one-gram-gold-silver': `${BASE}jpeg-optimizer_One%20Gram%20Gold%20&%20Silver.jpg`,
  'peetam-mandir': `${BASE}jpeg-optimizer_Peetam&%20Mandir.jpg`,
  'photo-frames-yantras': `${BASE}jpeg-optimizer_Photos%20Frames&%20Yantras.jpg`,
  'sphatika-maragaj': `${BASE}jpeg-optimizer_Sphatika&%20Maragaj%20Items.jpg`,
  'varalaxmi-vratham': `${BASE}jpeg-optimizer_Varalaxmi%20Vratham.jpg`,
  others: `${BASE}jpeg-optimizer_Others.jpg`,
}

export const productImages: Record<string, string[]> = {
  'lotus-m1': [
    `${BASE}204.jpg`,
    `${BASE}203.jpg`,
    `${BASE}202.webp`,
  ],
  'banana-tree': [
    `${BASE}Haldi%20Kumkum%20%20price%20%20%E2%82%B929%20(2).jpg`,
  ],
  'lotus-m2': [
    `${BASE}Haldi%20Kumkum.jpg`,
  ],
  'laxmi-ganesh': [
    `${BASE}Silver%20Plted%20Laxmi%20&%20ganesh%20Sr%2000230.jpg`,
  ],
  'shiva-lingam': [
    `${BASE}Untitled%20design%20(1).jpg`,
  ],
  'cow-calf-kd-big': [
    `${BASE}Cow%20Colf%20KD%20601%20Big%20Sr%2002366%20(2).jpg`,
  ],
  'silver-plated-tirupati-balaji-10': [], // TODO: NO IMAGE URL supplied; use the shared placeholder.
  'silver-plated-balaji-charan': [], // TODO: NO IMAGE URL supplied; use the shared placeholder.
  'pyarits-bracelet': [
    `${BASE}Sri%20Rudra%20Pyarits%20Braslets%20(SR%2003724)%20349%20(4).jpg`,
  ],
  'navagraha-mala-yellow': [
    `${BASE}Sri%20Rudra%20Navagraha%20Mala%20(SR%2000693)999%20(15).jpg`,
  ],
  'navagraha-mala-block': [
    `${BASE}Sri%20Rudra%20Navagraha%20Mala%20(SR%2000693)999%20(12).jpg`,
  ],
  'navagraha-mala-white': [], // TODO: NO IMAGE URL supplied; use the shared placeholder.
  'navagraha-mala-blue': [], // TODO: NO IMAGE URL supplied; use the shared placeholder.
}

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23F5F0E8" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%239E1B32"%3EImage%20Coming%20Soon%3C/text%3E%3C/svg%3E'

export function getCategoryImage(slug: string): string {
  return categoryImages[slug] ?? PLACEHOLDER_IMAGE
}

export function getProductImages(slug: string): string[] {
  const imgs = productImages[slug]
  if (!imgs || imgs.length === 0) return [PLACEHOLDER_IMAGE]
  return imgs
}