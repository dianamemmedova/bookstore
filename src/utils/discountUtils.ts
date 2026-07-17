const DISCOUNT_STEPS = [10, 15, 20, 25, 30, 35, 40]


export function getRandomDiscount(): number {
  return DISCOUNT_STEPS[Math.floor(Math.random() * DISCOUNT_STEPS.length)]
}
//təsadüfü endirim faizi

export function formatAuthors(authors: string[], maxNames = 2): string {
  if (!authors.length) return 'Müəllif məlumatı yoxdur'
  if (authors.length <= maxNames) return authors.join(', ')
  return `${authors.slice(0, maxNames).join(', ')} və b. (${authors.length})`
}
// müəllif adlarının qısaldılması

export function calcDiscountedPrice(originalPrice: number, discountPercent: number): number {
  return parseFloat((originalPrice * (1 - discountPercent / 100)).toFixed(2))
}
//  endirimli qiymətin hesablanması