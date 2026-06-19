import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { COVER_FALLBACK } from '../../constants/theme'


export function MiniBookCard({ book }: { book: Book }) {
  return (
    <div className="flex-shrink-0 w-44 cursor-pointer">
      <div className="relative mb-3">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.coverUrl ?? COVER_FALLBACK}
            alt={book.title}
            className="w-44 h-64 object-cover rounded shadow-sm hover:shadow-md transition-shadow bg-gray-100"
            onError={(e) => { 
              e.currentTarget.src = COVER_FALLBACK 
              e.currentTarget.onerror = null
            }}
          />
        </Link>
      </div>
      <Link to={`/books/${book.id}`}>
        <p className="text-sm font-medium text-gray-900 hover:underline line-clamp-2 mb-0.5">
          {book.title}
        </p>
      </Link>
      <p className="text-xs text-gray-500 mb-1 line-clamp-1">
        {book.authors[0] ?? ''}
      </p>
      {book.firstPublishYear && (
        <p className="text-xs text-gray-400">{book.firstPublishYear}</p>
      )}
    </div>
  )
}