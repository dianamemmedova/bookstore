import { forwardRef } from 'react'
import { StarRating } from '../ui/SharedUI'
import { LIGHT_ORANGE, PRIMARY , BORDER_DEFAULT , WHITE, GRAY_TEXT} from '../../constants/theme'
import type { sampleReviews } from '../../data/reviews'

type Review = typeof sampleReviews[number]

interface Props {
  reviews: Review[]
  filteredReviews: Review[]
  avgRating: number
  totalReviews: number
  recommended: number
  ratingCounts: { star: number; count: number }[]
  starFilter: number | null
  reviewSort: string
  helpfulVotes: Record<number, 'yes' | 'no' | null>
  onStarFilter: (star: number | null) => void
  onSortChange: (sort: string) => void
  onVote: (id: number, vote: 'yes' | 'no') => void
}

const BookReviews = forwardRef<HTMLElement, Props>(({
  filteredReviews, avgRating, totalReviews, recommended,
  ratingCounts, starFilter, reviewSort, helpfulVotes,
  onStarFilter, onSortChange, onVote,
}, ref) => {
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
              ✓ {Math.round((recommended / totalReviews) * 100)}% tövsiyə edir
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
          {filteredReviews.length} rəy
          {starFilter != null && (
            <button onClick={() => onStarFilter(null)}
              className="ml-2 text-xs px-2 py-0.5 rounded-full text-white"
              style={{ background: PRIMARY }}>
              {starFilter}★ ✕
            </button>
          )}
        </p>
        <div className="flex items-center gap-2">
          <select value={reviewSort} onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-200 text-sm px-3 py-2 rounded-lg outline-none bg-white text-gray-700">
            {['Önə çıxan', 'Ən yeni', 'Ən yüksək reytinq', 'Ən aşağı reytinq'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <button className="px-4 py-2 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: PRIMARY }}>
            Rəy Yaz
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: PRIMARY }}>
                {review.user[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{review.user}</p>
                    <p className="text-xs text-gray-400">{review.location} · {review.time}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 mt-3 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">Faydalı oldu?</span>
                  {(['yes', 'no'] as const).map((v) => (
                    <button key={v} onClick={() => onVote(review.id, v)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all"
                      style={{
                        borderColor: helpfulVotes[review.id] === v ? PRIMARY : BORDER_DEFAULT,
                        background: helpfulVotes[review.id] === v ? `${PRIMARY}10` : WHITE ,
                        color: helpfulVotes[review.id] === v ? PRIMARY : GRAY_TEXT,
                        fontWeight: helpfulVotes[review.id] === v ? 600 : 400,
                      }}>
                      {v === 'yes' ? '👍' : '👎'}
                      {v === 'yes' ? review.helpful.yes : review.helpful.no}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

BookReviews.displayName = 'BookReviews'
export default BookReviews