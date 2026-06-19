import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { PRIMARY, LIGHT_ORANGE , STAR_EMPTY } from '../../constants/theme'

function BookSkeleton() {
  return (
    <div className="flex-shrink-0 animate-pulse w-[120px] sm:w-[160px]">
      <div className="bg-gray-200 rounded mb-2 aspect-[5/7]" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-1" />
      <div className="flex gap-1 mt-1">
        {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-gray-200 rounded" />)}
      </div>
    </div>
  )
}

function BookItem({ book }: { book: Book }) {
  const FALLBACK = `https://placehold.co/160x224/e8e4dc/9ca3af?text=${encodeURIComponent(book.title.slice(0, 10))}`
  const stars = Math.round(book.ratingsAverage ?? 3.5)

  return (
    <Link
      to={`/books/${book.id}`}
      className="flex-shrink-0 cursor-pointer group w-[120px] sm:w-[160px]"
    >
      <div className="relative overflow-hidden rounded mb-2 bg-gray-100 aspect-[5/7]">
        <img
          src={book.coverUrl ?? FALLBACK}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK }}
        />
        <button
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
          onClick={e => e.preventDefault()}
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-0.5 group-hover:underline">
        {book.title}
      </p>
      {book.authors?.[0] && (
        <p className="text-xs mb-1" style={{ color: PRIMARY }}>{book.authors[0]}</p>
      )}
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} className="w-3 h-3" fill={i <= stars ? LIGHT_ORANGE  : STAR_EMPTY} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </Link>
  )
}

export function CarouselSection({
  title, subtitle, books, loading, seeAllTo,
}: {
  title: string
  subtitle?: string
  books: Book[]
  loading: boolean
  seeAllTo?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' })
  }

  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-4 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="text-center px-2">
          <h2 className="text-base sm:text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && seeAllTo && (
            <Link to={seeAllTo} className="text-xs hover:underline" style={{ color: PRIMARY }}>
              {subtitle}
            </Link>
          )}
          {subtitle && !seeAllTo && (
            <span className="text-xs" style={{ color: PRIMARY }}>{subtitle}</span>
          )}
        </div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="relative px-1 sm:px-0">
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={ref}
          className="flex gap-3 sm:gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <BookSkeleton key={i} />)
            : books.map(book => <BookItem key={book.id} book={book} />)
          }
        </div>

        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}