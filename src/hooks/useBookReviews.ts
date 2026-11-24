import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { SORT_PARAM } from '../types/review'
import type { BookReview, ReviewInput, ReviewList, ReviewSortLabel, ReviewSummary } from '../types/review'

const PAGE_SIZE = 10

const EMPTY_SUMMARY: ReviewSummary = {
  totalReviews: 0,
  avgRating: 0,
  recommendedPercent: 0,
  ratingCounts: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0 })),
}

// Kitabın rəyləri: siyahı + xülasə (orta bal, ulduz sayları) serverdən gəlir.
// Sıralama və ulduz filtri də serverdədir, "Daha çox göstər" növbəti səhifəni əlavə edir.
export function useBookReviews(bookId: string | undefined) {
  const { user } = useAuth()
  const [items, setItems] = useState<BookReview[]>([])
  const [summary, setSummary] = useState<ReviewSummary>(EMPTY_SUMMARY)
  const [sort, setSort] = useState<ReviewSortLabel>('Önə çıxan')
  const [star, setStar] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const seq = useRef(0)

  const userId = user?.id ?? null

  const fetchPage = useCallback(
    (p: number, signal?: AbortSignal) =>
      api<ReviewList>(`/books/${bookId}/reviews`, {
        query: { page: p, limit: PAGE_SIZE, sort: SORT_PARAM[sort], rating: star ?? undefined },
        signal,
      }),
    [bookId, sort, star],
  )

  // Kitab, sıralama, filtr, istifadəçi (isMine/myVote dəyişir) və ya reload olanda 1-ci səhifədən başla
  useEffect(() => {
    if (!bookId) return
    const ctrl = new AbortController()
    const mine = ++seq.current
    setLoading(true)
    setError(false)
    fetchPage(1, ctrl.signal)
      .then((res) => {
        if (mine !== seq.current) return
        setItems(res.items)
        setSummary(res.summary)
        setPage(res.page)
        setTotal(res.total)
        setTotalPages(res.totalPages)
        setLoading(false)
      })
      .catch((e) => {
        if (ctrl.signal.aborted || mine !== seq.current) return
        console.error(e)
        setError(true)
        setLoading(false)
      })
    return () => ctrl.abort()
  }, [bookId, fetchPage, userId, reloadKey])

  const loadMore = useCallback(async () => {
    if (loadingMore || page >= totalPages) return
    const mine = seq.current
    setLoadingMore(true)
    try {
      const res = await fetchPage(page + 1)
      if (mine !== seq.current) return
      setItems((prev) => [...prev, ...res.items.filter((r) => !prev.some((p) => p.id === r.id))])
      setPage(res.page)
      setTotalPages(res.totalPages)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingMore(false)
    }
  }, [fetchPage, loadingMore, page, totalPages])

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])

  // Aşağıdakılar xəta olsa ApiError atır, çağıran (modal / səhifə) mesajı göstərir.
  const createReview = useCallback(async (input: ReviewInput) => {
    await api(`/books/${bookId}/reviews`, { method: 'POST', body: input })
    reload()
  }, [bookId, reload])

  const updateReview = useCallback(async (id: number, input: ReviewInput) => {
    await api(`/reviews/${id}`, { method: 'PATCH', body: input })
    reload()
  }, [reload])

  const deleteReview = useCallback(async (id: number) => {
    await api(`/reviews/${id}`, { method: 'DELETE' })
    reload()
  }, [reload])

  // Eyni düyməyə ikinci dəfə basmaq səsi geri alır
  const vote = useCallback(async (review: BookReview, helpful: 'yes' | 'no') => {
    const updated = review.myVote === helpful
      ? await api<BookReview>(`/reviews/${review.id}/vote`, { method: 'DELETE' })
      : await api<BookReview>(`/reviews/${review.id}/vote`, { method: 'PUT', body: { helpful } })
    setItems((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
  }, [])

  const changeSort = (s: ReviewSortLabel) => setSort(s)
  const changeStar = (s: number | null) => setStar(s)

  return {
    items, summary, sort, star, total, loading, loadingMore, error,
    hasMore: page < totalPages,
    changeSort, changeStar, loadMore, reload,
    createReview, updateReview, deleteReview, vote,
  }
}