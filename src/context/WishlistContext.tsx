import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { api, ApiError } from '../lib/api'
import { mapBook } from '../services/bookService'
import type { ApiBook } from '../services/bookService'
import { useAuth } from './AuthContext'
import type { WishlistList } from '../types/wishlistPage'

// Backend formatı (GET /wishlists/:id və s.)
interface ApiWishlist {
  id: number
  name: string
  isPublic: boolean
  items: { bookId: number; addedAt: string; book: ApiBook }[]
}

interface ApiWishlistSummary { id: number }

const DEFAULT_NAME = 'Mənim Sevimlilərim'

function mapList(w: ApiWishlist): WishlistList {
  return {
    id: w.id,
    name: w.name,
    privacy: w.isPublic ? 'public' : 'private',
    items: w.items.map(({ bookId, addedAt, book }) => {
      const b = mapBook(book)
      return {
        id: bookId,
        originalId: String(bookId),
        title: b.title,
        author: b.authors[0] ?? 'Naməlum',
        cover: b.coverUrl ?? '',
        rating: b.ratingsAverage ?? 0,
        reviewCount: b.ratingsCount ?? 0,
        format: 'Kitab',
        price: b.price != null ? `₼${b.price}` : '',
        available: b.inStock !== false,
        addedDate: addedAt.slice(0, 10),
      }
    }),
  }
}

const errorText = (e: unknown) => (e instanceof ApiError ? e.message : 'Xəta baş verdi')

interface WishlistContextValue {
  lists: WishlistList[]
  loading: boolean
  savedIds: Set<string>
  createList: (name: string, privacy: 'public' | 'private') => Promise<{ id?: number; error?: string }>
  updateList: (id: number, name: string, privacy: 'public' | 'private') => Promise<string | null>
  addToList: (listId: number, bookId: string) => Promise<string | null>
  removeFromList: (listId: number, bookId: number) => Promise<string | null>
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

// İstək siyahıları serverdə saxlanır. İlk girişdə "Mənim Sevimlilərim" siyahısı avtomatik yaradılır.
export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [lists, setLists] = useState<WishlistList[]>([])
  const [loading, setLoading] = useState(false)
  const creatingDefault = useRef(false)

  const replace = (list: ApiWishlist) =>
    setLists((prev) => prev.map((l) => (l.id === list.id ? mapList(list) : l)))

  useEffect(() => {
    if (userId === null) { setLists([]); return }
    let cancelled = false
    setLoading(true)

    ;(async () => {
      try {
        let summaries = await api<ApiWishlistSummary[] | { items: ApiWishlistSummary[] }>('/wishlists')
        let ids = (Array.isArray(summaries) ? summaries : summaries.items).map((s) => s.id)

        if (ids.length === 0 && !creatingDefault.current) {
          creatingDefault.current = true
          try {
            const created = await api<ApiWishlist>('/wishlists', { method: 'POST', body: { name: DEFAULT_NAME, isPublic: false } })
            ids = [created.id]
          } catch {
            summaries = await api<ApiWishlistSummary[] | { items: ApiWishlistSummary[] }>('/wishlists')
            ids = (Array.isArray(summaries) ? summaries : summaries.items).map((s) => s.id)
          } finally {
            creatingDefault.current = false
          }
        }

        const details = await Promise.all(ids.map((id) => api<ApiWishlist>(`/wishlists/${id}`)))
        if (!cancelled) setLists(details.map(mapList))
      } catch { /* siyahı yüklənməsə boş qalır */ }
      finally { if (!cancelled) setLoading(false) }
    })()

    return () => { cancelled = true }
  }, [userId])

  const createList = useCallback(async (name: string, privacy: 'public' | 'private') => {
    try {
      const created = await api<ApiWishlist>('/wishlists', { method: 'POST', body: { name: name.trim(), isPublic: privacy === 'public' } })
      setLists((prev) => [...prev, mapList(created)])
      return { id: created.id }
    } catch (e) { return { error: errorText(e) } }
  }, [])

  const updateList = useCallback(async (id: number, name: string, privacy: 'public' | 'private') => {
    try {
      replace(await api<ApiWishlist>(`/wishlists/${id}`, { method: 'PATCH', body: { name: name.trim(), isPublic: privacy === 'public' } }))
      return null
    } catch (e) { return errorText(e) }
  }, [])

  const addToList = useCallback(async (listId: number, bookId: string) => {
    try {
      replace(await api<ApiWishlist>(`/wishlists/${listId}/items/${bookId}`, { method: 'PUT' }))
      return null
    } catch (e) { return errorText(e) }
  }, [])

  const removeFromList = useCallback(async (listId: number, bookId: number) => {
    try {
      replace(await api<ApiWishlist>(`/wishlists/${listId}/items/${bookId}`, { method: 'DELETE' }))
      return null
    } catch (e) { return errorText(e) }
  }, [])

  const savedIds = new Set(lists.flatMap((l) => l.items.map((i) => String(i.id))))

  return (
    <WishlistContext.Provider value={{ lists, loading, savedIds, createList, updateList, addToList, removeFromList }}>
      {children}
    </WishlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlistContext() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlistContext must be used inside WishlistProvider')
  return ctx
}