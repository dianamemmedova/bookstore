export interface OrderItem {
  id: string
  title: string
  author: string
  cover: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  items: OrderItem[]
  subtotal: number
  discountAmount: number
  deliveryFee: number
  deliveryDate?: string
  finalTotal: number
  promoCode: string | null
  payMethod: 'card' | 'cash'
  delivery: {
    fullName: string
    phone: string
    city: string
    street: string
    building: string
    apartment: string
  }
 status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
}

export interface Detail {
  label: string
  value: string
  valueColor?: string
}

export const STATUS_MAP = {
  pending:   { label: 'Gözləyir',    bg: '#fef9c3', color: '#854d0e' },
  confirmed: { label: 'Təsdiqləndi', bg: '#dcfce7', color: '#166534' },
  delivered: { label: 'Çatdırıldı',  bg: '#dbeafe', color: '#1e40af' },
  cancelled: { label: 'Ləğv edildi', bg: '#fee2e2', color: '#991b1b' },
}

export interface BookThumb {
  id: string
  title: string
  cover: string
  quantity?: number
  size?: 'sm' | 'md'
}

export interface OrderHeader {
  order: Order
  expanded: boolean
  onToggle: () => void
}

export interface Status {
  status: Order['status']
}

export interface Delivery {
  delivery: Order['delivery']
  deliveryDate?: string
}