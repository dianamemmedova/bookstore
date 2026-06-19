import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { useBooks } from '../../hooks/useBooks'
import { COVER_FALLBACK } from '../../constants/theme'

interface ScrollRowProps {
  title: string
  fetchFn: () => Promise<Book[]>
  seeAllTo?: string    
  seeAllHref?: string  
}

function MiniBookCard({ book }: { book: Book }) {
  return (
    <div className="flex-shrink-0 w-44">
      <div className="mb-3">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.coverUrl ?? COVER_FALLBACK}
            alt={book.title}
            className="w-44 h-64 object-cover rounded shadow-sm hover:shadow-md transition-shadow bg-gray-100"
            onError={(e) => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }}
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

export default function ScrollRow({ title, fetchFn, seeAllTo, seeAllHref }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { books, loading, error } = useBooks(fetchFn)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h2>
        {(seeAllTo || seeAllHref) && (
          seeAllTo ? (
            <Link to={seeAllTo} className="text-sm text-gray-500 hover:underline">
              Hamısına bax
            </Link>
          ) : (
            <a href={seeAllHref} target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:underline">
              Hamısına bax
            </a>
          )
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="flex gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-44">
              <div className="w-44 h-64 rounded bg-gray-100 animate-pulse mb-3" />
              <div className="h-3 bg-gray-100 rounded animate-pulse mb-2 w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-gray-400 py-8 text-center">Kitablar yüklənə bilmədi.</p>
      )}

      {/* Books */}
      {!loading && !error && books.length > 0 && (
        <div className="relative group">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            aria-label="Sola sürüşdür"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {books.map((book) => (
              <MiniBookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            aria-label="Sağa sürüşdür"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}