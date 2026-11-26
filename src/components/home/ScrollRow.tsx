import { useRef, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_QUERIES } from '../../services/bookService'
import type { SectionConfig } from '../../data/sections'
import type { Book } from '../../types/book'
import { MiniBookCard } from './MiniBookCard'
import Icon from '../ui/Icon'
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

  const arrow = 'absolute top-1/3 z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-muted shadow-sm transition-opacity hover:text-ink sm:flex opacity-0 group-hover:opacity-100'

  return (
    <>
      <section className="py-6">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-2">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <span className="h-4 w-1 rounded-full bg-gold" />
            {section.title}
          </h2>
          <Link to={seeAllTo} className="inline-flex items-center gap-0.5 whitespace-nowrap text-xs font-semibold text-primary hover:underline">
            Hamısına bax <Icon name="arrow_forward" size={14} />
          </Link>
        </div>

        {loading && (
          <div className="flex gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-[160px] flex-shrink-0 sm:w-[180px]">
                <div className="mb-2 aspect-[3/4] animate-pulse rounded-md bg-sunken" />
                <div className="mb-1.5 h-3 w-3/4 animate-pulse rounded bg-sunken" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-sunken" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-muted">
            Kitablar yüklənə bilmədi. Internet bağlantınızı yoxlayın.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="group relative">
            <button onClick={() => scroll('left')} className={`${arrow} left-0 -translate-x-3`} aria-label="Sola sürüşdür">
              <Icon name="chevron_left" size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {books.map((book, i) => (
                <MiniBookCard key={book.id} book={book} rank={section.key === 'trending' && i < 10 ? i + 1 : undefined} />
              ))}
            </div>

            <button onClick={() => scroll('right')} className={`${arrow} right-0 translate-x-3`} aria-label="Sağa sürüşdür">
              <Icon name="chevron_right" size={20} />
            </button>
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">Kitab tapılmadı.</p>
        )}
      </section>

      {section.banner && (
        <Link to="/books" className="mb-4 block w-full overflow-hidden rounded-md">
          <img
            src={section.banner.src}
            alt={section.banner.alt}
            className="max-h-[260px] w-full object-cover object-center transition-opacity hover:opacity-95"
          />
        </Link>
      )}
    </>
  )
}