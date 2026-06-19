export const PROMO_CODES: Record<string, { discount: number; label: string }> = {
  ILKALIS20: { discount: 0.20, label: 'İlk alışa özel — 20% endirim' },
  KITAB10:   { discount: 0.10, label: '10% endirim' },
  BAKU15:    { discount: 0.15, label: '15% endirim' },
}

export const DELIVERY_FEE = 5
export const FREE_DELIVERY_THRESHOLD = 60
export const SUGGESTED_CODE = 'ILKALIS20'