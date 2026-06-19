import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import type { Book } from '../types/book'
import type { WishlistList, WishlistItem } from '../types/wishlistPage'
import { toNumId } from '../utils/idUtils'
import { loadLists, saveLists, DEFAULT_LISTS } from '../utils/wishlistStorage'
import { getBookPrice } from '../utils/bookPrice'   

function bookToItem(book: Book): WishlistItem {
  const numId = toNumId(book.id)
  const seed = numId % 10
  const fallbackRating = seed < 3 ? 3 : seed < 7 ? 4 : 5

  return {
    id: numId,
    originalId: book.id, 
    title: book.title,
    author: book.authors?.[0] ?? 'Naməlum',
    cover: book.coverUrl ?? '',
    rating: book.ratingsAverage && book.ratingsAverage > 0 ? book.ratingsAverage : fallbackRating,
    reviewCount: book.ratingsCount && book.ratingsCount > 0 ? book.ratingsCount : (numId % 490) + 10,
    format: 'Elektron Kitab',
    price: `₼${getBookPrice(book.id)}`,
    available: true,
    addedDate: new Date().toISOString().slice(0, 10),
  }
}

export function useWishlist() {
  const { user } = useAuth()

  const [wishlists, setWishlists] = useState<WishlistList[]>(() =>
    loadLists(user?.email) ?? DEFAULT_LISTS()
  )
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const all = loadLists(user?.email) ?? []
    const ids = all.flatMap(l => l.items.map(i => String(i.id)))
    return new Set(ids)
  })
  const [wishlistModal, setWishlistModal] = useState<Book | null>(null)

  const handleAddToList = useCallback((listId: number, book: Book, onToast: (msg: string) => void) => {
    const newItem = bookToItem(book)
    setWishlists(prev => {
      const updated = prev.map(list => {
        if (list.id !== listId) return list
        if (list.items.some(i => i.id === newItem.id)) return list
        return { ...list, items: [...list.items, newItem] }
      })
      saveLists(user?.email, updated)
      return updated
    })
    setSavedIds(prev => new Set([...prev, book.id]))
    const listName = wishlists.find(l => l.id === listId)?.name ?? 'siyahı'
    onToast(`"${book.title.slice(0, 28)}..." → ${listName}`)
    setWishlistModal(null)
  }, [wishlists, user?.email])

  const handleCreateAndAdd = useCallback((name: string, book: Book, onToast: (msg: string) => void) => {
    const newItem = bookToItem(book)
    const newList: WishlistList = {
      id: Date.now(), name, description: '', privacy: 'private', items: [newItem]
    }
    setWishlists(prev => {
      const updated = [...prev, newList]
      saveLists(user?.email, updated)
      return updated
    })
    setSavedIds(prev => new Set([...prev, book.id]))
    onToast(`"${book.title.slice(0, 28)}..." → ${name}`)
    setWishlistModal(null)
  }, [user?.email])

  return {
    wishlists,
    savedIds,
    wishlistModal,
    setWishlistModal,
    handleAddToList,
    handleCreateAndAdd,
  }
}