export interface CartItem {
  id: string
  title: string
  author: string
  cover: string
  price: number
  genre: string
  rating: number
  description: string
  year: number
  pages: number
  quantity: number
  available?: boolean // false: stok azalıb və ya qurtarıb
}

export interface PromoCode { discount: number; label: string }

export interface CartItemProps {
  id: string
  title: string
  author: string
  cover: string
  price: number
  quantity: number
  available?: boolean
  onInc: () => void
  onDec: () => void
  onRemove: () => void
}

export interface OrderSummaryProps {
  items: { id: string; title: string; price: number; quantity: number }[]
  total: number
  discountAmount: number
  deliveryFee: number
  finalTotal: number
  appliedPromo: { code: string; discount: number } | null
  promoInput: string
  setPromoInput: (v: string) => void
  promoError: string
  setPromoError: (v: string) => void
  suggestionDismissed: boolean
  setSuggestionDismissed: (v: boolean) => void
  suggestionAvailable?: boolean
  applyPromo: (code?: string) => void
  applying?: boolean
  removePromo: () => void
  user: unknown
  onCheckout: () => void
  onLogin: () => void
}

export interface PromoSectionProps {
  promoInput: string
  setPromoInput: (v: string) => void
  promoError: string
  setPromoError: (v: string) => void
  appliedPromo: { code: string; discount: number } | null
  suggestionDismissed: boolean
  setSuggestionDismissed: (v: boolean) => void
  suggestionAvailable?: boolean
  applyPromo: (code?: string) => void
  applying?: boolean
  removePromo: () => void
}