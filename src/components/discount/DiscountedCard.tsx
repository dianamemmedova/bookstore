import { GREEN_DARK, PRIMARY } from '../../constants/theme'
import { FALLBACK_COVER } from '../../constants/link'
import { formatAuthors } from '../../utils/discountUtils'
import type { DiscountedBook } from '../../types/book'

interface Props {
  book: DiscountedBook
}

export default function DiscountedCard({ book }: Props) {
  const coverUrl = book.coverUrl ?? FALLBACK_COVER

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col border border-red-100 relative">
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        -{book.discountPercent}%
      </div>

      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_COVER)}
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="h-[40px] sm:h-[56px]">
          <h5 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">{book.title}</h5>
        </div>
        <div className="min-h-[20px] sm:min-h-[24px]">
          <p className="text-xs sm:text-[13px] text-gray-600 mt-1">{formatAuthors(book.authors)}</p>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-bold text-red-600">{book.discountedPrice} ₼</span>
          <span className="text-xs sm:text-sm text-gray-400 line-through">{book.price} ₼</span>
        </div>

        <div className="mt-auto pt-3">
          <button
            className="text-xs font-medium text-white px-4 py-1.5 rounded-full w-full text-center"
            style={{ background: PRIMARY }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
          >
            Səbətə əlavə et
          </button>
        </div>
      </div>
    </div>
  )
}