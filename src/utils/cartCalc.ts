import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../data/promoCodes'

export function calcDiscount(total: number, discountRate: number): number {
  return total * discountRate
}

export function calcDelivery(afterDiscount: number): number {
  return afterDiscount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}

export function calcFinalTotal(total: number, discountRate: number): {
  discountAmount: number
  afterDiscount: number
  deliveryFee: number
  finalTotal: number
} {
  const discountAmount = calcDiscount(total, discountRate)
  const afterDiscount = Math.max(0, total - discountAmount)
  const deliveryFee = calcDelivery(afterDiscount)
  const finalTotal = afterDiscount + deliveryFee
  return { discountAmount, afterDiscount, deliveryFee, finalTotal }
}