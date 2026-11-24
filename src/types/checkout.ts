export type CheckoutField =
  | 'fullName' | 'phone' | 'city' | 'street' | 'building' | 'apartment'
  | 'cardNumber' | 'cardExpiry' | 'cardCvv' | 'cardHolder' | 'deliveryDate'

export interface AppliedPromo { code: string; discount: number }

export interface CheckoutFormProps {
  subtotal: number
  discountAmount: number
  deliveryFee: number
  finalTotal: number
  appliedPromo: AppliedPromo | null
  onSuccess: () => void
}

export interface Succes {
  deliveryDate: string
  orderId?: number | null
  onOrders: () => void
  onBooks: () => void
}

export interface Delivery {
  form: {
    fullName: string
    phone: string
    city: string
    street: string
    building: string
    apartment: string
    deliveryDate: string
  }
  errors: Record<string, string>
  minDate: string
  inp: (field: CheckoutField, value: string) => void
  clearErr: (field: CheckoutField) => void
  inputClass: (field: CheckoutField) => string
}

export interface PaymentProps {
  payMethod: 'card' | 'cash'
  setPayMethod: (v: 'card' | 'cash') => void
  form: {
    cardNumber: string
    cardExpiry: string
    cardCvv: string
    cardHolder: string
  }
  errors: Record<string, string>
  inp: (field: CheckoutField, value: string) => void
  clearErr: (field: CheckoutField) => void
  inputClass: (field: CheckoutField) => string
  formatCard: (val: string) => string
  formatExpiry: (val: string) => string
}

export interface AppliedPromo { code: string; discount: number }

export interface CheckoutModal {
  subtotal: number
  discountAmount: number
  deliveryFee: number
  finalTotal: number
  appliedPromo: AppliedPromo | null
  onClose: () => void
  onSuccess: () => void
}