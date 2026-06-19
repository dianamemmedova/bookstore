import { useMemo } from 'react'
import { useBooks } from './useBooks'
import { fetchTrending, fetchBySubject, searchBooks } from '../services/bookService'

export function useBlogData() {
  const { books: trending6, loading: loadTrending } = useBooks(
    () => fetchTrending(6)
  )
  const { books: fiction,    loading: loadMeantTo1 } = useBooks(() => fetchBySubject('fiction', 1))
  const { books: nonFiction, loading: loadMeantTo2 } = useBooks(() => fetchBySubject('nonfiction', 1))
  const { books: children,   loading: loadMeantTo3 } = useBooks(() => fetchBySubject('children', 1))
  const { books: history,    loading: loadSpring1  } = useBooks(() => searchBooks('american history', 1))
  const { books: classic,    loading: loadSpring2  } = useBooks(() => searchBooks('great american novel', 1))
  const { books: nature,     loading: loadSpring3  } = useBooks(() => searchBooks('nature travel', 1))
  const { books: inspiring,  loading: loadSpring4  } = useBooks(() => searchBooks('inspiring fiction', 1))
  const { books: new2026,    loading: loadNew      } = useBooks(() => searchBooks('best books 2026', 3))
  const { books: literary,   loading: loadLiterary } = useBooks(() => fetchBySubject('literary fiction', 4))

  const featured  = trending6[0] ?? null
  const trending  = trending6.slice(1, 4)
  const bookMonth = trending6[4] ?? null

  const meantToBooks = useMemo(
    () => [...fiction, ...nonFiction, ...children],
    [fiction, nonFiction, children]
  )
  const springBooks = useMemo(
    () => [...history, ...classic, ...nature, ...inspiring],
    [history, classic, nature, inspiring]
  )

  return {
    featured, trending, bookMonth, new2026, literary,
    meantToBooks, springBooks,
    meantLabels:  ['BƏDİİ ƏSƏRLƏR', 'QEYRİ-BƏDİİ', 'UŞAQ KİTABLARI'],
    springLabels: ['TARİX', 'KLASSİK ROMAN', 'TƏBİƏT & SƏYAHƏT', 'İLHAM VERİCİ'],
    loading: {
      featured:  loadTrending,
      trending:  loadTrending,
      month:     loadTrending,
      meantTo:   loadMeantTo1 || loadMeantTo2 || loadMeantTo3,
      spring:    loadSpring1  || loadSpring2  || loadSpring3 || loadSpring4,
      new:       loadNew,
      literary:  loadLiterary,
    }
  }
}