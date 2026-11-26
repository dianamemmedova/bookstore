import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import Icon from '../ui/Icon'

// Redaktor seçimi / ayın kitabı: şəkil solda, məlumat sağda
export default function FeaturedBook({ book, label }: { book: Book | null | undefined; label: string }) {
  if (!book) return null

  const meta = [
    book.firstPublishYear ? `${book.firstPublishYear}` : null,
    book.pages ? `${book.pages} səhifə` : null,
    book.isAudiobook ? 'Audio kitab' : null,
  ].filter(Boolean)

  return (
    <section className="flex flex-col gap-4 rounded-md border border-line bg-white p-4 sm:flex-row sm:items-center sm:gap-6">
      {book.coverUrl && (
        <Link
          to={`/books/${book.id}`}
          className="flex aspect-[3/4] w-32 flex-shrink-0 items-center justify-center rounded-sm bg-panel p-3 sm:w-36"
        >
          <img src={book.coverUrl} alt={book.title} className="h-full w-full rounded-[2px] object-cover shadow-md" />
        </Link>
      )}

      <div className="min-w-0 flex-1">
        <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-gold-text">
          <Icon name="star" size={14} filled /> {label}
        </p>
        <h2 className="line-clamp-2 font-display text-xl font-bold leading-snug text-ink">{book.title}</h2>
        {book.authors[0] && <p className="mt-0.5 text-sm text-muted">{book.authors[0]}</p>}

        {meta.length > 0 && <p className="tabular mt-2 text-xs text-muted">{meta.join('  ·  ')}</p>}

        {book.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{book.description}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Link
            to={`/books/${book.id}`}
            className="rounded-sm bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            Ətraflı bax
          </Link>
          {book.price != null && (
            <p className="tabular flex items-baseline gap-2">
              <span className={`text-base font-semibold ${book.originalPrice != null ? 'text-sale' : 'text-ink'}`}>₼{book.price}</span>
              {book.originalPrice != null && (
                <>
                  <span className="text-xs text-muted line-through">₼{book.originalPrice}</span>
                  <span className="rounded-full bg-sale px-1.5 py-0.5 text-[11px] font-semibold text-white">-{book.discountPercent}%</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}