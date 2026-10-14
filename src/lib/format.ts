export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
export const discountPct = (price: number, orig?: number) => (orig && orig > price ? Math.round(((orig - price) / orig) * 100) : 0)
