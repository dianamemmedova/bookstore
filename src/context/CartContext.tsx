import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { api, ApiError } from '../lib/api'
import { mapBook } from '../services/bookService'
import type { ApiBook } from '../services/bookService'
import { useAuth } from './AuthContext'
import type { CartItem } from '../types/cart'

// Backend-in səbət formatı (GET /cart, PUT/DELETE /cart/items/:id)
interface ApiCart {
  items: { bookId: number; quantity: number; book: ApiBook; available: boolean }[]
  itemCount: number
  subtotal: number
}

function toCartItems(cart: ApiCart): CartItem[] {
  return cart.items.map(({ bookId, quantity, book, available }) => {
    const b = mapBook(book)
    return {
      id: String(bookId),
      title: b.title,
      author: b.authors[0] ?? 'Naməlum müəllif',
      cover: b.coverUrl ?? '',
      price: b.price ?? 0,
      genre: b.subjects[0] ?? '',
      rating: 0,
      description: b.description ?? '',
      year: b.firstPublishYear ?? 0,
      pages: b.pages ?? 0,
      quantity,
      available,
    }
  })
}

const errorText = (e: unknown) => (e instanceof ApiError ? e.message : 'Xəta baş verdi')

// Əməliyyat uğurludursa null, olmasa istifadəçiyə göstəriləcək mesaj qaytarır
type Result = Promise<string | null>

interface CartContextValue {
  items: CartItem[]
  loading: boolean
  addToCart: (item: Omit<CartItem, 'quantity'>) => Result
  removeFromCart: (id: string) => Result
  updateQty: (id: string, qty: number) => Result
  clearCart: () => Result
  reloadCart: () => Promise<void>
  isInCart: (id: string) => boolean
  total: number
  count: number
  totalItems: number
}

const CartContext = createContext<CartContextValue | null>(null)

// Səbət serverdə saxlanır (hər istifadəçiyə ayrıca). Giriş edilməyibsə səbət boşdur.
export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  // Ardıcıl sorğularda köhnə cavab yenisini əzməsin deyə
  const seq = useRef(0)

  const apply = useCallback((cart: ApiCart, mySeq: number) => {
    if (mySeq === seq.current) setItems(toCartItems(cart))
  }, [])

  const reloadCart = useCallback(async () => {
    if (userId === null) { setItems([]); return }
    const mySeq = ++seq.current
    setLoading(true)
    try {
      apply(await api<ApiCart>('/cart'), mySeq)
    } catch { /* səbət yüklənməsə boş qalır, səhifə işləməyə davam edir */ }
    finally { if (mySeq === seq.current) setLoading(false) }
  }, [userId, apply])

  // İstifadəçi dəyişəndə (giriş/çıxış) səbət yenidən yüklənir
  useEffect(() => { void reloadCart() }, [reloadCart])

  const setQuantity = useCallback(async (id: string, qty: number): Result => {
    if (userId === null) return 'Əvvəlcə daxil olun'
    const mySeq = ++seq.current
    try {
      apply(await api<ApiCart>(`/cart/items/${id}`, { method: 'PUT', body: { quantity: qty } }), mySeq)
      return null
    } catch (e) { return errorText(e) }
  }, [userId, apply])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>): Result => {
    const current = items.find((i) => i.id === item.id)?.quantity ?? 0
    return setQuantity(item.id, current + 1)
  }, [items, setQuantity])

  const updateQty = useCallback((id: string, qty: number): Result => {
    if (qty < 1) return Promise.resolve(null)
    return setQuantity(id, qty)
  }, [setQuantity])

  const removeFromCart = useCallback(async (id: string): Result => {
    if (userId === null) return null
    const mySeq = ++seq.current
    try {
      apply(await api<ApiCart>(`/cart/items/${id}`, { method: 'DELETE' }), mySeq)
      return null
    } catch (e) { return errorText(e) }
  }, [userId, apply])

  const clearCart = useCallback(async (): Result => {
    if (userId === null) return null
    ++seq.current
    try {
      await api('/cart', { method: 'DELETE' })
      setItems([])
      return null
    } catch (e) { return errorText(e) }
  }, [userId])

  const isInCart = useCallback((id: string) => items.some((i) => i.id === id), [items])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, loading, addToCart, removeFromCart, updateQty, clearCart, reloadCart,
      isInCart, total, count, totalItems: count,
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