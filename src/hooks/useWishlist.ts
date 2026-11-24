import { useState, useCallback } from 'react'
import { useWishlistContext } from '../context/WishlistContext'
import type { Book } from '../types/book'

// Kitab kartı və kitab səhifəsi üçün: "istək siyahısına əlavə et" pəncərəsi və əməliyyatları.
// Siyahıların özü serverdə saxlanır (WishlistContext).
export function useWishlist() {
  const { lists, savedIds, createList, addToList } = useWishlistContext()
  const [wishlistModal, setWishlistModal] = useState<Book | null>(null)

  const handleAddToList = useCallback(async (listId: number, book: Book, onToast: (msg: string) => void) => {
    const err = await addToList(listId, String(book.id))
    const listName = lists.find((l) => l.id === listId)?.name ?? 'siyahı'
    onToast(err ?? `"${book.title.slice(0, 28)}..." → ${listName}`)
    if (!err) setWishlistModal(null)
  }, [addToList, lists])

  const handleCreateAndAdd = useCallback(async (name: string, book: Book, onToast: (msg: string) => void) => {
    const created = await createList(name, 'private')
    if (created.error || created.id === undefined) { onToast(created.error ?? 'Siyahı yaradılmadı'); return }
    const err = await addToList(created.id, String(book.id))
    onToast(err ?? `"${book.title.slice(0, 28)}..." → ${name}`)
    setWishlistModal(null)
  }, [createList, addToList])

  return {
    wishlists: lists,
    savedIds,
    wishlistModal,
    setWishlistModal,
    handleAddToList,
    handleCreateAndAdd,
  }
}