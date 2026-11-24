import { forwardRef, useState } from 'react'
import { StarRating } from '../ui/SharedUI'
import { LIGHT_ORANGE, PRIMARY , BORDER_DEFAULT , WHITE, GRAY_TEXT} from '../../constants/theme'
import { REVIEW_SORTS } from '../../types/review'
import type { BookReview, ReviewSortLabel, ReviewSummary } from '../../types/review'

interface Props {
  reviews: BookReview[]
  summary: ReviewSummary
  total: number // filtrə uyğun rəylərin sayı
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  error: boolean
  starFilter: number | null
  reviewSort: ReviewSortLabel
  loggedIn: boolean
  onStarFilter: (star: number | null) => void
  onSortChange: (sort: ReviewSortLabel) => void
  onVote: (review: BookReview, vote: 'yes' | 'no') => void
  onWrite: () => void
  onEdit: (review: BookReview) => void
  onDelete: (review: BookReview) => void
  onLoadMore: () => void
  onRetry: () => void
}

const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']
const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

const BookReviews = forwardRef<HTMLElement, Props>(({
  reviews, summary, total, loading, loadingMore, hasMore, error,
  starFilter, reviewSort, loggedIn,
  onStarFilter, onSortChange, onVote, onWrite, onEdit, onDelete, onLoadMore, onRetry,
}, ref) => {
  const { avgRating, totalReviews, recommendedPercent, ratingCounts } = summary
  const [confirmId, setConfirmId] = useState<number | null>(null)
  return (
    <section ref={ref} className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Müştəri Rəyləri</h2>
        <p className="text-sm text-gray-400">{totalReviews} oxucunun fikirləri</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-900 mb-2">{avgRating.toFixed(1)}</p>
            <StarRating rating={avgRating} size="lg" />
            <p className="text-sm text-gray-400 mt-2">{totalReviews} rəy əsasında</p>
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
              ✓ {recommendedPercent}% tövsiyə edir
            </div>
          </div>
          <div className="space-y-2">
            {ratingCounts.map(({ star, count }) => (
              <button key={star}
                onClick={() => onStarFilter(starFilter === star ? null : star)}
                className="w-full flex items-center gap-3">
                <span className="text-xs text-gray-500 w-4 text-right flex-shrink-0">{star}</span>
                <span className="text-yellow-400 text-xs flex-shrink-0">★</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0}%`,
                      background: starFilter === star ? PRIMARY : LIGHT_ORANGE,
                    }} />
                </div>
                <span className="text-xs text-gray-400 w-4 flex-shrink-0">{count}</span>
                {starFilter === star && (
                  <span className="text-xs text-white px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: PRIMARY }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-gray-700">
          {total} rəy
          {starFilter != null && (
            <button onClick={() => onStarFilter(null)}
              className="ml-2 text-xs px-2 py-0.5 rounded-full text-white"
              style={{ background: PRIMARY }}>
              {starFilter}★ ✕
            </button>
          )}
        </p>
        <div className="flex items-center gap-2">
          <select value={reviewSort} onChange={(e) => onSortChange(e.target.value as ReviewSortLabel)}
            className="border border-gray-200 text-sm px-3 py-2 rounded-lg outline-none bg-white text-gray-700">
            {REVIEW_SORTS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <button onClick={onWrite}
            className="px-4 py-2 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: PRIMARY }}>
            {loggedIn ? 'Rəy Yaz' : 'Rəy yazmaq üçün daxil ol'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[0, 1].map((i) => <div key={i} className="h-36 bg-gray-100 animate-pulse rounded-2xl" />)}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-sm text-gray-500 mb-3">Rəylər yüklənmədi</p>
          <button onClick={onRetry} className="text-sm underline" style={{ color: PRIMARY }}>Yenidən cəhd et</button>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-10">
          {starFilter != null ? 'Bu ulduz sayında rəy yoxdur' : 'Hələ rəy yoxdur. İlk rəyi sən yaz!'}
        </p>
      ) : (
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} data-testid="review"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: PRIMARY }}>
                {review.user[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {review.user}
                      {review.isMine && <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>Sənin rəyin</span>}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(review.createdAt)}{review.updatedAt !== review.createdAt && ' · redaktə olunub'}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 mt-3 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">{review.body}</p>
                {review.recommended && <p className="text-xs text-green-700 mt-2">✓ Tövsiyə edir</p>}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50 flex-wrap">
                  {review.isMine ? (
                    confirmId === review.id ? (
                      <>
                        <span className="text-xs text-gray-500">Rəy silinsin?</span>
                        <button onClick={() => { setConfirmId(null); onDelete(review) }} className="text-xs font-semibold text-red-600 hover:underline">Bəli, sil</button>
                        <button onClick={() => setConfirmId(null)} className="text-xs text-gray-500 hover:underline">Xeyr</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => onEdit(review)} className="text-xs text-gray-600 hover:underline">Redaktə et</button>
                        <button onClick={() => setConfirmId(review.id)} className="text-xs text-red-600 hover:underline">Sil</button>
                        <span className="text-xs text-gray-400 ml-auto">👍 {review.helpful.yes} · 👎 {review.helpful.no}</span>
                      </>
                    )
                  ) : (
                    <>
                      <span className="text-xs text-gray-400">Faydalı oldu?</span>
                      {(['yes', 'no'] as const).map((v) => (
                        <button key={v} onClick={() => onVote(review, v)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all"
                          style={{
                            borderColor: review.myVote === v ? PRIMARY : BORDER_DEFAULT,
                            background: review.myVote === v ? `${PRIMARY}10` : WHITE ,
                            color: review.myVote === v ? PRIMARY : GRAY_TEXT,
                            fontWeight: review.myVote === v ? 600 : 400,
                          }}>
                          {v === 'yes' ? '👍' : '👎'}
                          {v === 'yes' ? review.helpful.yes : review.helpful.no}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {hasMore && (
          <div className="text-center pt-2">
            <button onClick={onLoadMore} disabled={loadingMore}
              className="px-6 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-60">
              {loadingMore ? 'Yüklənir...' : 'Daha çox göstər'}
            </button>
          </div>
        )}
      </div>
      )}
    </section>
  )
})

BookReviews.displayName = 'BookReviews'
export default BookReviews