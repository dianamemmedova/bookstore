import { useState, useEffect, useRef, useCallback } from 'react'
import type { Book , UseBooksOptions , UseBooksResult , UseBookResult} from '../types/book'
import { searchBooks } from '../services/bookService'


export function useBooks(
  fetchFn: () => Promise<Book[]>,
  deps: unknown[] = [],
  options: UseBooksOptions = {}
): UseBooksResult {
  const { immediate = true } = options

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const fetchRef = useRef(fetchFn)
  useEffect(() => { fetchRef.current = fetchFn })

  const cancelRef = useRef(false)

  useEffect(() => {
    if (!immediate && tick === 0) return

    cancelRef.current = false
    setLoading(true)
    setError(null)

    fetchRef.current()
      .then((data) => {
        if (!cancelRef.current) {
          setBooks(data)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelRef.current) {
          setError(err.message ?? 'Xəta baş verdi')
          setLoading(false)
        }
      })

    return () => { cancelRef.current = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  return { books, loading, error, refetch }
}



export function useBook<T>(
  fetchFn: () => Promise<T | null>,
  deps: unknown[] = []
): UseBookResult<T> {
  const [book, setBook] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cancelRef = useRef(false)
  const fetchRef = useRef(fetchFn)
  useEffect(() => { fetchRef.current = fetchFn })

  useEffect(() => {
    cancelRef.current = false
    setLoading(true)
    setError(null)

    fetchRef.current()
      .then((data) => {
        if (!cancelRef.current) {
          setBook(data)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelRef.current) {
          setError(err.message ?? 'Kitab tapılmadı')
          setLoading(false)
        }
      })

    return () => { cancelRef.current = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { book, loading, error }
}



export function useSearch(debounceMs = 400) {
  const [query, setQuery] = useState('')
  const [books, setSearchBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelRef = useRef(false)

  const search = useCallback((q: string) => {
    setQuery(q)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!q.trim()) {
      setSearchBooks([])
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(() => {
      cancelRef.current = false
      searchBooks(q)
        .then((data) => {
          if (!cancelRef.current) {
            setSearchBooks(data)
            setLoading(false)
          }
        })
        .catch((err: Error) => {
          if (!cancelRef.current) {
            setError(err.message)
            setLoading(false)
          }
        })
    }, debounceMs)
  }, [debounceMs])

  useEffect(() => () => { cancelRef.current = true }, [])

  return { query, books, loading, error, search }
}