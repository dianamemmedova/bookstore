import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import Icon from '../ui/Icon'

function BookSkeleton() {
  return (
    <div className="w-[140px] flex-shrink-0 animate-pulse sm:w-[160px]">
      <div className="mb-2 aspect-[3/4] rounded-md bg-sunken" />
      <div className="mb-1.5 h-3 w-full rounded bg-sunken" />
      <div className="h-3 w-2/3 rounded bg-sunken" />
    </div>
  )
}

function BookItem({ book }: { book: Book }) {
  const fallback = `https://placehold.co/160x224/e9e8e3/5a6570?text=${encodeURIComponent(book.title.slice(0, 10))}`

  return (
    <Link
      to={`/books/${book.id}`}
      className="group w-[140px] flex-shrink-0 rounded-md border border-line bg-white p-2 transition-colors hover:border-line-strong sm:w-[160px]"
    >
      <div className="relative mb-2 flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-3">
        <img
          src={book.coverUrl ?? fallback}
          alt={book.title}
          className="h-full w-full rounded-[2px] object-cover shadow-md"
          onError={(e) => { (e.target as HTMLImageElement).src = fallback }}
        />
        {book.discountPercent != null && (
          <span className="tabular absolute left-1 top-1 rounded-full bg-sale px-1.5 py-0.5 text-[11px] font-semibold text-white">
            -{book.discountPercent}%
          </span>
        )}
        {book.isAudiobook && (
          <span className="absolute bottom-1 right-1 inline-flex items-center rounded-full bg-audio-soft px-1.5 py-0.5 text-on-audio-soft">
            <Icon name="headphones" size={13} />
          </span>
        )}
      </div>
      <p className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink group-hover:underline">{book.title}</p>
      {book.authors?.[0] && <p className="mt-0.5 line-clamp-1 text-xs text-muted">{book.authors[0]}</p>}
      {book.price != null && (
        <p className="tabular mt-1 flex items-baseline gap-1.5">
          <span className={`text-sm font-semibold ${book.originalPrice != null ? 'text-sale' : 'text-ink'}`}>₼{book.price}</span>
          {book.originalPrice != null && <span className="text-xs text-muted line-through">₼{book.originalPrice}</span>}
        </p>
      )}
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

  const arrow = 'absolute top-1/3 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted shadow-sm transition-colors hover:text-ink sm:flex'

  return (
    <section className="mb-8 sm:mb-10">
      <div className="mb-3 flex items-end justify-between gap-4 border-b border-line pb-2">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="h-4 w-1 rounded-full bg-gold" />
          {title}
        </h2>
        {subtitle && seeAllTo && (
          <Link to={seeAllTo} className="inline-flex items-center gap-0.5 whitespace-nowrap text-xs font-semibold text-primary hover:underline">
            {subtitle} <Icon name="arrow_forward" size={14} />
          </Link>
        )}
      </div>

      <div className="relative">
        <button onClick={() => scroll('left')} aria-label="Geri" className={`${arrow} left-0 -translate-x-3`}>
          <Icon name="chevron_left" size={20} />
        </button>

        <div
          ref={ref}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <BookSkeleton key={i} />)
            : books.map((book) => <BookItem key={book.id} book={book} />)}
        </div>

        <button onClick={() => scroll('right')} aria-label="İrəli" className={`${arrow} right-0 translate-x-3`}>
          <Icon name="chevron_right" size={20} />
        </button>
      </div>
    </section>
  )
}