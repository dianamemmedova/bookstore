import { Link } from 'react-router-dom'
import { StarRating } from '../ui/SharedUI'
import { PRIMARY } from '../../constants/theme'
import type { BookInfo } from '../../types/book'
import BookActions from './BookActions'



export default function BookInfo({
  book, author, genreLabel, booksUrl, avgRating, totalReviews,
  readerUrl, reading, onScrollToReviews, onRead, onAddToCart, onAddToWishlist,
}: BookInfo) {
  return (
    <div className="lg:col-span-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1 leading-snug">{book.title}</h1>
      <p className="text-sm text-gray-500 mb-3">
        by <span className="underline cursor-pointer" style={{ color: PRIMARY }}>{author}</span>
      </p>

      <div className="flex items-center gap-2 mb-4">
        <Link to={booksUrl}
          className="text-xs px-3 py-1 rounded-full font-semibold text-white hover:opacity-80 transition-opacity"
          style={{ background: PRIMARY }}>
          {genreLabel}
        </Link>
        {book.firstPublishYear && (
          <span className="text-xs text-gray-400">{book.firstPublishYear}-ci il</span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <StarRating rating={avgRating} />
        <span className="font-semibold text-yellow-600">{avgRating.toFixed(1)}</span>
        <button onClick={onScrollToReviews}
          className="text-sm underline hover:text-gray-900" style={{ color: PRIMARY }}>
          ({totalReviews} rəy)
        </button>
      </div>

      {book.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
          {book.description}
        </p>
      )}

      <BookActions
        book={book}
        readerUrl={readerUrl}
        reading={reading}
        onRead={onRead}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />
    </div>
  )
}