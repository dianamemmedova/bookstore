import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { COVER_FALLBACK } from '../../constants/theme'
import Icon from '../ui/Icon'

export function MiniBookCard({ book, rank }: { book: Book; rank?: number }) {
  return (
    <article className="flex w-[160px] flex-shrink-0 flex-col rounded-md border border-line bg-white p-2 transition-colors hover:border-line-strong sm:w-[180px]">
      <Link to={`/books/${book.id}`} className="relative mb-2 flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-3">
        <img
          src={book.coverUrl ?? COVER_FALLBACK}
          alt={book.title}
          className="h-full w-full rounded-[2px] object-cover shadow-md"
          onError={(e) => {
            e.currentTarget.src = COVER_FALLBACK
            e.currentTarget.onerror = null
          }}
        />
        {rank != null && (
          <span className="tabular absolute left-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-gold font-display text-sm font-bold text-ink shadow-sm">
            {rank}
          </span>
        )}
        {book.discountPercent != null && (
          <span className="tabular absolute right-1 top-1 z-10 rounded-full bg-sale px-1.5 py-0.5 text-[11px] font-semibold text-white">
            -{book.discountPercent}%
          </span>
        )}
        {book.isAudiobook && (
          <span className="absolute bottom-1 right-1 z-10 inline-flex items-center gap-0.5 rounded-full bg-audio-soft px-1.5 py-0.5 text-[11px] font-semibold text-on-audio-soft">
            <Icon name="headphones" size={13} />Audio
          </span>
        )}
      </Link>
      <Link to={`/books/${book.id}`} className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink hover:underline">
        {book.title}
      </Link>
      <p className="mt-0.5 line-clamp-1 text-xs text-muted">{book.authors[0] ?? ''}</p>
      {book.price != null && (
        <p className="tabular mt-1 flex items-baseline gap-1.5">
          <span className={`text-[15px] font-semibold ${book.originalPrice != null ? 'text-sale' : 'text-ink'}`}>₼{book.price}</span>
          {book.originalPrice != null && <span className="text-xs text-muted line-through">₼{book.originalPrice}</span>}
        </p>
      )}
    </article>
  )
}