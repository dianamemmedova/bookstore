import { useRef, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_QUERIES } from '../../services/bookService'
import type { SectionConfig } from '../../data/sections'
import type { Book } from '../../types/book'
import { MiniBookCard } from './MiniBookCard'
import { rowReducer } from '../../types/homeScrollRow'

export function ScrollRow({ section }: { section: SectionConfig }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(rowReducer, { status: 'loading', books: [] })

  useEffect(() => {
    let cancelled = false

    FEATURED_QUERIES[section.key as keyof typeof FEATURED_QUERIES]()
      .then((data: Book[]) => {
        if (!cancelled) dispatch({ type: 'success', books: data.slice(0, 20) })
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: 'error' })
      })

    return () => { cancelled = true }
  }, [section.key])

  const loading = state.status === 'loading'
  const error   = state.status === 'error'
  const books   = state.books

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  const seeAllTo = `/books?q=${encodeURIComponent(section.seeAllQuery)}`

  return (
    <>
      <section className="py-8">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-2xl font-semibold text-gray-900">
            {section.title}
          </h2>
          <Link to={seeAllTo} className="text-sm text-gray-500 hover:underline underline-offset-2">
            Hamısına bax
          </Link>
        </div>

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

        {error && (
          <p className="text-sm text-gray-400 py-8 text-center">
            Kitablar yüklənə bilmədi. Internet bağlantınızı yoxlayın.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="relative group">
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

        {!loading && !error && books.length === 0 && (
          <p className="text-sm text-gray-400 py-8 text-center">Kitab tapılmadı.</p>
        )}
      </section>

      {section.banner && (
        <Link
          to="/books"
          className="block w-full mb-2 overflow-hidden"
        >
          <img
            src={section.banner.src}
            alt={section.banner.alt}
            className="w-full object-cover hover:opacity-95 transition-opacity max-h-[300px] object-center"
          />
        </Link>
      )}
    </>
  )
}