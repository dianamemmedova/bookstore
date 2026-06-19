import { useEffect, useState } from 'react'
import { fetchBySubject, fetchTrending, searchBooks } from '../services/bookService'
import type { Book } from '../types/book'

type SectionKey =
  | 'newFiction'
  | 'adventure'
  | 'mystery'
  | 'romance'

export function useFictionData() {
  const [data, setData] = useState({
    bestsellers: [] as Book[],
    newFiction: [] as Book[],
    adventure: [] as Book[],
    mystery: [] as Book[],
    romance: [] as Book[],
    featured: null as Book | null,
    bannerBook: null as Book | null,
  })

  const [loading, setLoading] = useState({
    bestsellers: true,
    newFiction: true,
    adventure: true,
    mystery: true,
    romance: true,
  })

  useEffect(() => {
    async function loadData() {
      try {
        const trending = await fetchTrending(12)

        setData(prev => ({
          ...prev,
          bestsellers: trending.slice(0, 10),
          featured: trending[0] ?? null,
          bannerBook: trending[2] ?? null,
        }))
      } finally {
        setLoading(prev => ({
          ...prev,
          bestsellers: false,
        }))
      }

      const loadSubject = async (
        apiCall: Promise<Book[]>,
        key: SectionKey
      ) => {
        try {
          const books = await apiCall

          setData(prev => ({
            ...prev,
            [key]: books,
          }))
        } finally {
          setLoading(prev => ({
            ...prev,
            [key]: false,
          }))
        }
      }

      loadSubject(fetchBySubject('fiction', 10), 'newFiction')

      loadSubject(fetchBySubject('adventure', 10), 'adventure')

      loadSubject(fetchBySubject('mystery', 10), 'mystery')

      loadSubject(
        searchBooks('romance fiction', 10),
        'romance'
      )
    }

    loadData()
  }, [])

  return {
    data,
    loading,
  }
}