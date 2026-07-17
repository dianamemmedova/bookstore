import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { CartItem } from '../types/cart'

function getKey(email?: string) {
  return email ? `bookstore_cart_${email}` : 'bookstore_cart_guest'
}
// hər isdifadəçi üçün key yaradırıq emailinden isdifade edirek eger 
// emaili yoxdusa guest acari isdifade edir

function loadCart(email?: string): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(getKey(email)) || '[]')
  } catch { return [] }
}
// loacaldan goturub cartiteme yaziriq stringi

function saveCart(items: CartItem[], email?: string) {
  localStorage.setItem(getKey(email), JSON.stringify(items))
}
//massivi stringe çevirib uyğun açarla birlikdə saxlayırıq localda

interface CartContextValue {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  total: number
  count: number
  totalItems: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children, userEmail }: { children: ReactNode; userEmail?: string }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart(userEmail))

  useEffect(() => {
    setItems(loadCart(userEmail))
  }, [userEmail])
  // isdifadeçi giriş çıxış edende userEmail deyisende mehsullar yeniden localStorageden yuklenir


  useEffect(() => {
    saveCart(items, userEmail)
  }, [items, userEmail])
  // əgər userEmail yada mehsullarda deyisiklik olsa ls avdomatik yenilənir

  //Omit<CartItem , 'quantity' > ts nən utility type - dır 
  //Cartİtem tipinden quantity sahəsini çıxarıb yeni tip yaradır
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])
  // useCallback funksiyanı yadda saxlayır hər renderdə yeni funksiya referansı yaranmasın

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem(getKey(userEmail))
  }, [userEmail])

  const isInCart = useCallback((id: string) => items.some(i => i.id === id), [items])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQty,
      clearCart, isInCart, total, count, totalItems: count,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}