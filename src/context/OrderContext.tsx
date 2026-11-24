import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api, ApiError } from '../lib/api'
import { coverOf } from '../services/bookService'
import { useAuth } from './AuthContext'
import type { Order } from '../types/order'

// Backend-in sifariş formatı (GET /orders, POST /orders, POST /orders/:id/cancel)
export interface ApiOrder {
  id: number
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED'
  payMethod: 'CARD' | 'CASH'
  items: { bookId: number; title: string; author: string; coverUrl: string | null; unitPrice: number; quantity: number }[]
  subtotal: number
  discountAmount: number
  deliveryFee: number
  finalTotal: number
  promoCode: string | null
  deliveryDate: string
  delivery: {
    fullName: string
    phone: string
    city: string
    street: string
    building: string | null
    apartment: string | null
  }
  createdAt: string
}

// Backend sifarişini ekrandakı komponentlərin gözlədiyi Order tipinə çevirir
export function mapOrder(o: ApiOrder): Order {
  return {
    id: String(o.id),
    createdAt: o.createdAt,
    items: o.items.map((i) => ({
      id: String(i.bookId),
      title: i.title,
      author: i.author,
      cover: coverOf(i.coverUrl) ?? '',
      price: i.unitPrice,
      quantity: i.quantity,
    })),
    subtotal: o.subtotal,
    discountAmount: o.discountAmount,
    deliveryFee: o.deliveryFee,
    finalTotal: o.finalTotal,
    promoCode: o.promoCode,
    payMethod: o.payMethod === 'CARD' ? 'card' : 'cash',
    deliveryDate: o.deliveryDate,
    delivery: {
      fullName: o.delivery.fullName,
      phone: o.delivery.phone,
      city: o.delivery.city,
      street: o.delivery.street,
      building: o.delivery.building ?? '',
      apartment: o.delivery.apartment ?? '',
    },
    status: o.status.toLowerCase() as Order['status'],
  }
}

interface OrderContextType {
  orders: Order[]
  loading: boolean
  reloadOrders: () => Promise<void>
  cancelOrder: (id: string) => Promise<string | null> // uğurlu olsa null, əks halda xəta mesajı
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  loading: false,
  reloadOrders: async () => {},
  cancelOrder: async () => null,
})

// Sifarişlər serverdə saxlanır. Giriş edilməyibsə siyahı boşdur.
export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  const reloadOrders = useCallback(async () => {
    if (userId === null) { setOrders([]); return }
    setLoading(true)
    try {
      const res = await api<{ items: ApiOrder[] }>('/orders')
      setOrders(res.items.map(mapOrder))
    } catch { /* siyahı yüklənməsə köhnə məlumat qalır */ }
    finally { setLoading(false) }
  }, [userId])

  useEffect(() => { void reloadOrders() }, [reloadOrders])

  const cancelOrder = useCallback(async (id: string) => {
    try {
      const updated = await api<ApiOrder>(`/orders/${id}/cancel`, { method: 'POST' })
      setOrders((prev) => prev.map((o) => (o.id === id ? mapOrder(updated) : o)))
      return null
    } catch (e) {
      return e instanceof ApiError ? e.message : 'Ləğv etmək olmadı'
    }
  }, [])

  return (
    <OrderContext.Provider value={{ orders, loading, reloadOrders, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderContext)