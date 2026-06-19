import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { CategoryLabel } from './CategoryLabel'
import { FALLBACK_IMG } from '../../constants/link'

export function FeaturedBook({ book, loading }: { book: Book | null; loading: boolean }) {
  if (loading) return (
    <div className="animate-pulse flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
      <div className="flex-shrink-0 w-28 sm:w-44 mx-auto sm:mx-0 bg-gray-100 rounded-lg aspect-[2/3]" />
      <div className="flex-1 pt-2">
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
        <div className="h-6 bg-gray-100 rounded w-full mb-2" />
        <div className="h-6 bg-gray-100 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-100 rounded w-1/4 mb-4" />
        <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  )

  if (!book) return null

  return (
    <Link to={`/books/${book.id}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full">
      <div className="flex-shrink-0 relative overflow-hidden rounded-lg bg-gray-50 w-28 sm:w-44 mx-auto sm:mx-0 aspect-[2/3] ring-1 ring-gray-100 shadow-md">
        <img
          src={book.coverUrl ?? FALLBACK_IMG}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
        />
        <div className="absolute top-2 left-2 bg-[#c9a454] text-[#1a2e3d] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow">
          Trend
        </div>
      </div>

      <div className="flex flex-col justify-start pt-1">
        <CategoryLabel label={book.subjects?.[0] ?? 'TREND'} />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#3d5a6b] transition-colors leading-snug mb-1">
          {book.title}
        </h2>
        {book.authors?.[0] && <p className="text-sm text-gray-400 mb-3">{book.authors[0]}</p>}
        {book.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">{book.description}</p>
        )}
        <span className="text-xs font-bold text-[#3d5a6b] group-hover:text-[#c9a454] transition-colors mt-3">
          Ətraflı →
        </span>
      </div>
    </Link>
  )
}