import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { CategoryLabel } from './CategoryLabel'

export function BookCard({ book, label }: { book: Book; label?: string }) {
  const FALLBACK = `https://placehold.co/240x320/e8e4dc/6b7280?text=${encodeURIComponent(book.title.slice(0, 12))}`
  const coverSrc = book.coverUrl ?? FALLBACK
 

  return (
    <Link to={`/books/${book.id}`} className="flex flex-col group">
      <div className="w-full overflow-hidden rounded-lg mb-3 bg-gray-50 ring-1 ring-gray-100 shadow-sm aspect-[3/4]" >
        <img
          src={coverSrc}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK }}
        />
      </div>
      <CategoryLabel label={label ?? book.subjects?.[0] ?? 'KİTAB'} />
      <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug group-hover:text-[#3d5a6b] transition-colors line-clamp-2">
        {book.title}
      </h3>
      {book.authors?.[0] && <p className="text-xs text-gray-400 mb-1">{book.authors[0]}</p>}
      {book.description && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-1">{book.description}</p>
      )}
      <span className="text-xs font-bold text-[#3d5a6b] hover:text-[#c9a454] transition-colors mt-2">Ətraflı →</span>
    </Link>
  )
}