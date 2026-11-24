import { useState } from 'react'
import { useWishlistContext } from '../context/WishlistContext'

export function useWishlistPage(onError: (msg: string) => void) {
  const { lists, loading, createList: apiCreate, updateList, removeFromList } = useWishlistContext()

  const [selectedId, setActiveListId] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [results, setResults] = useState('20')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Seçilmiş siyahı silinibsə/yoxdursa birincisi açılır
  const activeList = lists.find((l) => l.id === selectedId) ?? lists[0]
  const activeListId = activeList?.id ?? 0

  const removeItem = async (bookId: number) => {
    if (!activeList) return
    const err = await removeFromList(activeList.id, bookId)
    if (err) onError(err)
  }

  const createList = async (name: string, privacy: 'public' | 'private') => {
    const res = await apiCreate(name, privacy)
    if (res.error) { onError(res.error); return }
    if (res.id !== undefined) setActiveListId(res.id)
    setShowCreateModal(false)
  }

  const editList = async (name: string, privacy: 'public' | 'private') => {
    if (!activeList) return
    const err = await updateList(activeList.id, name, privacy)
    if (err) { onError(err); return }
    setShowEditModal(false)
  }

  const items = [...(activeList?.items ?? [])]
  if (sortBy === 'az') items.sort((a, b) => a.title.localeCompare(b.title))
  else if (sortBy === 'za') items.sort((a, b) => b.title.localeCompare(a.title))
  else if (sortBy === 'oldest') items.sort((a, b) => a.addedDate.localeCompare(b.addedDate))
  else items.sort((a, b) => b.addedDate.localeCompare(a.addedDate))

  return {
    lists, loading, activeListId, setActiveListId, activeList,
    sortBy, setSortBy, results, setResults,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    removeItem, createList, editList,
    sortedItems: items.slice(0, parseInt(results)),
  }
}