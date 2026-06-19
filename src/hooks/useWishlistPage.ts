import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { loadLists, saveLists, DEFAULT_LISTS } from '../utils/wishlistStorage'
import type { WishlistList } from '../types/wishlistPage'

export function useWishlistPage() {
  const { user } = useAuth()

  const [lists, setLists] = useState<WishlistList[]>(() =>
    loadLists(user?.email) ?? DEFAULT_LISTS()
  )
  const [activeListId, setActiveListId] = useState(() =>
    (loadLists(user?.email) ?? DEFAULT_LISTS())[0].id
  )
  const [sortBy, setSortBy] = useState('newest')
  const [results, setResults] = useState('20')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const fresh = loadLists(user?.email) ?? DEFAULT_LISTS()
    setLists(fresh)
    setActiveListId(fresh[0].id)
  }, [user?.email])

  useEffect(() => {
    saveLists(user?.email, lists)
  }, [lists, user?.email])

  const activeList = lists.find(l => l.id === activeListId) ?? lists[0]

  const removeItem = (itemId: number) => {
    setLists(prev => prev.map(l =>
      l.id === activeListId ? { ...l, items: l.items.filter(i => i.id !== itemId) } : l
    ))
  }

  const createList = (name: string, desc: string, privacy: 'public' | 'private') => {
    const newList: WishlistList = { id: Date.now(), name, description: desc, privacy, items: [] }
    setLists(prev => [...prev, newList])
    setActiveListId(newList.id)
    setShowCreateModal(false)
  }

  const editList = (name: string, desc: string, privacy: 'public' | 'private') => {
    setLists(prev => prev.map(l => l.id === activeListId ? { ...l, name, description: desc, privacy } : l))
    setShowEditModal(false)
  }

  const getSortedItems = () => {
    const items = [...(activeList?.items ?? [])]
    if (sortBy === 'az') return items.sort((a, b) => a.title.localeCompare(b.title))
    if (sortBy === 'za') return items.sort((a, b) => b.title.localeCompare(a.title))
    if (sortBy === 'oldest') return items.sort((a, b) => a.addedDate.localeCompare(b.addedDate))
    return items.sort((a, b) => b.addedDate.localeCompare(a.addedDate))
  }

  const sortedItems = getSortedItems().slice(0, parseInt(results))

  return {
    lists, activeListId, setActiveListId, activeList,
    sortBy, setSortBy, results, setResults,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    removeItem, createList, editList,
    sortedItems,
  }
}