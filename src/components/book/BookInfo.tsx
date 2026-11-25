import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarRating } from '../ui/SharedUI'
import { PRIMARY, GOLD } from '../../constants/theme'
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
    book.firstPublishYear ? { icon: '📅', label: 'Nəşr ili', value: String(book.firstPublishYear) } : null,
    book.pages ? { icon: '📄', label: 'Səhifə sayı', value: String(book.pages) } : null,
    { icon: book.isAudiobook ? '🎧' : '📖', label: 'Format', value: book.isAudiobook ? 'Audio kitab' : 'Çap kitabı' },
    { icon: '📦', label: 'Stok', value: inStock ? 'Stokda var' : 'Qurtarıb' },
  ].filter((f): f is { icon: string; label: string; value: string } => f !== null)

  return (
    <div className="lg:col-span-9">
      {/* Başlıq hissəsi */}
      <div className="mb-5">
        <div className="mb-3 flex items-center gap-2">
          <Link to={booksUrl}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-80"
            style={{ background: PRIMARY }}>
            {genreLabel}
          </Link>
          {book.isAudiobook && (
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">🎧 Audio</span>
          )}
        </div>
        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">{book.title}</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Müəllif: <span className="font-semibold text-gray-800">{author}</span>
        </p>
        <div className="mt-3 flex items-center gap-2.5">
          <StarRating rating={avgRating} />
          <span className="font-semibold text-yellow-600">{avgRating.toFixed(1)}</span>
          <button onClick={onScrollToReviews}
            className="text-sm underline hover:text-gray-900" style={{ color: PRIMARY }}>
            ({totalReviews} rəy)
          </button>
        </div>
      </div>

      {/* Qiymət və əməliyyatlar */}
      <div
        className="mb-6 rounded-2xl border border-[#ebe4d3] p-5 sm:p-6"
        style={{ background: 'linear-gradient(120deg, #f8f4ea 0%, #eef2f4 100%)' }}
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-500">Qiymət</p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {book.price != null ? `₼${book.price}` : '—'}
              </span>
              {book.originalPrice != null && (
                <>
                  <span className="text-base text-gray-400 line-through">₼{book.originalPrice}</span>
                  <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">-{book.discountPercent}%</span>
                </>
              )}
            </p>
            <p className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${inStock ? 'text-green-700' : 'text-red-600'}`}>
              <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              {inStock ? 'Stokda var' : 'Hazırda stokda yoxdur'}
            </p>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              onClick={onAddToCart}
              disabled={!inStock}
              className="flex-1 rounded-full px-7 py-3 text-sm font-bold tracking-wide text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:flex-none"
              style={{ background: PRIMARY }}
            >
              🛒 Səbətə əlavə et
            </button>
            <button
              onClick={onAddToWishlist}
              aria-label="Sevimlilərə əlavə et"
              title="Sevimlilərə əlavə et"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-red-200 hover:text-red-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Qısa məlumatlar */}
      <div className={`mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 ${GRID_COLS[facts.length] ?? 'sm:grid-cols-4'}`}>
        {facts.map((f) => (
          <div key={f.label} className="flex items-center gap-3 bg-white px-4 py-3.5">
            <span className="text-xl" aria-hidden="true">{f.icon}</span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">{f.label}</p>
              <p className="truncate text-sm font-semibold text-gray-900">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Audio kitab: dinləmə */}
      {book.isAudiobook && (
        <div className="mb-8">
          <AudioSection book={book} />
        </div>
      )}

      {/* Kitab haqqında */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2.5 text-lg font-bold text-gray-900">
          <span className="h-5 w-1 rounded-full" style={{ background: GOLD }} />
          Kitab haqqında
        </h2>
        {description ? (
          <>
            <p className={`whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-[15px] ${expanded || !isLong ? '' : 'line-clamp-5'}`}>
              {description}
            </p>
            {isLong && (
              <button onClick={() => setExpanded((v) => !v)}
                className="mt-2 text-sm font-semibold hover:underline" style={{ color: PRIMARY }}>
                {expanded ? 'Daha az göstər' : 'Daha çox oxu'}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm italic text-gray-400">Bu kitab üçün təsvir hələ əlavə olunmayıb.</p>
        )}
      </section>

      {/* Mövzular */}
      {book.subjects.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2.5 text-lg font-bold text-gray-900">
            <span className="h-5 w-1 rounded-full" style={{ background: GOLD }} />
            Mövzular
          </h2>
          <div className="flex flex-wrap gap-2">
            {book.subjects.map((s) => (
              <Link key={s} to={`/books?q=${encodeURIComponent(s)}`}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs capitalize text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900">
                {s}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}