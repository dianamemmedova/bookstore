import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarRating } from '../ui/SharedUI'
import Icon from '../ui/Icon'
import type { Book } from '../../types/book'
import AudioSection from './AudioSection'

interface Props {
  book: Book
  author: string
  genreLabel: string
  booksUrl: string
  avgRating: number
  totalReviews: number
  onScrollToReviews: () => void
  onAddToCart: () => void
  onAddToWishlist: () => void
}

const DESC_LIMIT = 420

const GRID_COLS: Record<number, string> = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }

export default function BookInfo({
  book, author, genreLabel, booksUrl, avgRating, totalReviews,
  onScrollToReviews, onAddToCart, onAddToWishlist,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const description = book.description?.trim() ?? ''
  const isLong = description.length > DESC_LIMIT
  const inStock = book.inStock !== false

  const facts = [
    book.firstPublishYear ? { icon: 'calendar_today', label: 'Nəşr ili', value: String(book.firstPublishYear) } : null,
    book.pages ? { icon: 'description', label: 'Səhifə sayı', value: String(book.pages) } : null,
    { icon: book.isAudiobook ? 'headphones' : 'menu_book', label: 'Format', value: book.isAudiobook ? 'Audio kitab' : 'Çap kitabı' },
    { icon: 'inventory_2', label: 'Stok', value: inStock ? 'Stokda var' : 'Qurtarıb' },
  ].filter((f): f is { icon: string; label: string; value: string } => f !== null)

  const sectionTitle = 'mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink'

  return (
    <div className="lg:col-span-8 xl:col-span-9">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <Link to={booksUrl} className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white transition-colors hover:bg-primary-dark">
            {genreLabel}
          </Link>
          {book.isAudiobook && (
            <span className="inline-flex items-center gap-1 rounded-full bg-audio-soft px-2.5 py-0.5 text-[11px] font-semibold text-on-audio-soft">
              <Icon name="headphones" size={13} /> Audio
            </span>
          )}
        </div>
        <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-[34px]">{book.title}</h1>
        <p className="mt-1.5 text-sm text-muted">
          Müəllif: <span className="font-semibold text-ink">{author}</span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={avgRating} />
          <span className="tabular text-sm font-semibold text-muted-gold-text">{avgRating.toFixed(1)}</span>
          <button onClick={onScrollToReviews} className="text-[13px] text-primary underline hover:text-primary-dark">
            ({totalReviews} rəy)
          </button>
        </div>
      </div>

      <div className={`mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 ${GRID_COLS[facts.length] ?? 'sm:grid-cols-4'}`}>
        {facts.map((f) => (
          <div key={f.label} className="flex items-center gap-3 bg-white px-3 py-2.5">
            <Icon name={f.icon} size={20} className="text-muted-gold-text" />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-muted">{f.label}</p>
              <p className="tabular truncate text-[13px] font-semibold text-ink">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-md border border-line bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted">Qiymət</p>
            <p className="tabular flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className={`font-display text-3xl font-bold ${book.originalPrice != null ? 'text-sale' : 'text-ink'}`}>
                {book.price != null ? `₼${book.price}` : '—'}
              </span>
              {book.originalPrice != null && (
                <>
                  <span className="text-base text-muted line-through">₼{book.originalPrice}</span>
                  <span className="rounded-full bg-sale px-2 py-0.5 text-xs font-semibold text-white">-{book.discountPercent}%</span>
                </>
              )}
            </p>
            <p className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${inStock ? 'text-free' : 'text-sale'}`}>
              <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-free' : 'bg-sale'}`} />
              {inStock ? 'Stokda var' : 'Hazırda stokda yoxdur'}
            </p>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              onClick={onAddToCart}
              disabled={!inStock}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <Icon name="shopping_cart" size={18} /> Səbətə əlavə et
            </button>
            <button
              onClick={onAddToWishlist}
              aria-label="Sevimlilərə əlavə et"
              title="Sevimlilərə əlavə et"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-line-strong bg-white text-muted transition-colors hover:text-sale"
            >
              <Icon name="favorite" size={20} />
            </button>
          </div>
        </div>
      </div>

      {book.isAudiobook && (
        <div className="mb-6">
          <AudioSection book={book} />
        </div>
      )}

      <section className="mb-6">
        <h2 className={sectionTitle}>
          <span className="h-4 w-1 rounded-full bg-gold" />
          Kitab haqqında
        </h2>
        {description ? (
          <>
            <p className={`whitespace-pre-line text-sm leading-7 text-muted sm:text-[15px] ${expanded || !isLong ? '' : 'line-clamp-5'}`}>
              {description}
            </p>
            {isLong && (
              <button onClick={() => setExpanded((v) => !v)} className="mt-2 text-sm font-semibold text-primary hover:underline">
                {expanded ? 'Daha az göstər' : 'Daha çox oxu'}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm italic text-muted">Bu kitab üçün təsvir hələ əlavə olunmayıb.</p>
        )}
      </section>

      {book.subjects.length > 0 && (
        <section>
          <h2 className={sectionTitle}>
            <span className="h-4 w-1 rounded-full bg-gold" />
            Mövzular
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {book.subjects.map((s) => (
              <Link
                key={s}
                to={`/books?q=${encodeURIComponent(s)}`}
                className="rounded-full border border-line-strong bg-white px-3 py-1 text-xs capitalize text-muted transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}