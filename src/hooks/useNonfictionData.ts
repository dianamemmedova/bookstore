import { useState, useEffect } from 'react'
import { fetchBySubject, searchBooks, fetchTrending } from '../services/bookService'
import type { Book } from '../types/book'

type NonfictionData = {
  bestsellers: Book[]
  newNonfic:   Book[]
  history:     Book[]
  selfHelp:    Book[]
  biography:   Book[]
  paperbacks:  Book[]
  bannerBook:  Book | null
  monthPick:   Book | null
}

type NonfictionLoading = {
  bestsellers: boolean
  newNonfic:   boolean
  history:     boolean
  selfHelp:    boolean
  biography:   boolean
  paperbacks:  boolean
}

export function useNonfictionData() {
  const [data, setData] = useState<NonfictionData>({
    bestsellers: [],
    newNonfic:   [],
    history:     [],
    selfHelp:    [],
    biography:   [],
    paperbacks:  [],
    bannerBook:  null,
    monthPick:   null,
  })

  const [loading, setLoading] = useState<NonfictionLoading>({
    bestsellers: true,
    newNonfic:   true,
    history:     true,
    selfHelp:    true,
    biography:   true,
    paperbacks:  true,
  })

  useEffect(() => {
    fetchTrending(12)
      .then(books => {
        setData(prev => ({
          ...prev,
          bestsellers: books.slice(0, 10),
          bannerBook:  books[1] ?? null,
          monthPick:   books[3] ?? null,
        }))
      })
      .finally(() => setLoading(prev => ({ ...prev, bestsellers: false })))

    const loadSubject = (subject: string, key: keyof NonfictionData, loadKey: keyof NonfictionLoading) => {
      fetchBySubject(subject, 10)
        .then(books => setData(prev => ({ ...prev, [key]: books })))
        .finally(() => setLoading(prev => ({ ...prev, [loadKey]: false })))
    }

    loadSubject('nonfiction', 'newNonfic',  'newNonfic')
    loadSubject('history',    'history',    'history')
    loadSubject('self_help',  'selfHelp',   'selfHelp')
    loadSubject('biography',  'biography',  'biography')

    searchBooks('nonfiction paperback bestseller', 10)
      .then(books => setData(prev => ({ ...prev, paperbacks: books })))
      .finally(() => setLoading(prev => ({ ...prev, paperbacks: false })))
  }, [])

  return { data, loading }
}