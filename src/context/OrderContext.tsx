import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '../types/order'

const STORAGE_KEY = 'bookstore_orders'

function loadOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch { return [] }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void
  cancelOrder: (id: string) => void
  deleteOrder: (id: string) => void
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  addOrder: () => {},
  cancelOrder: () => {},
  deleteOrder: () => {},
})

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders)

  const addOrder = (data: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    }
    const updated = [newOrder, ...orders]
    setOrders(updated)
    saveOrders(updated)
  }

  const cancelOrder = (id: string) => {
    const updated = orders.map(o =>
      o.id === id && o.status === 'confirmed' ? { ...o, status: 'cancelled' as const } : o
    )
    setOrders(updated)
    saveOrders(updated)
  }

  const deleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id)
    setOrders(updated)
    saveOrders(updated)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderContext)