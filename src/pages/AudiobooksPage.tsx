import { PRIMARY } from '../constants/theme'
import { useAudiobooks } from '../hooks/useAudiobooks'
import { Link } from 'react-router-dom'
import type { Book } from '../types/book'
import { FALLBACK_COVER } from '../constants/link'
import PageHero from '../components/shared/PageHero'

export default function AudiobooksPage() {
  const { books, loading, error } = useAudiobooks()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Kitablar yüklənir...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-red-600">
          <p className="text-sm sm:text-base">{error}</p>
          <button onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base">
            Yenidən cəhd et
          </button>
        </div>
      </div>
    )
  }

  const minPrice = books.length ? `₼${Math.min(...books.map((b) => b.price ?? 0))}` : '—'

  return (
    <div className="min-h-screen bg-[#fcfaf6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-12 sm:pb-16">
        <PageHero
          eyebrow="🎧 Dinləməyə başla"
          title="Səsli Kitablar"
          subtitle="Kitablar daim sizinlə olsun. Aldığınız audio kitabı birbaşa saytda dinləyin."
          covers={books.map((b) => b.coverUrl ?? '')}
          stats={[
            { value: books.length, label: 'Audiokitab' },
            { value: minPrice, label: 'Ən aşağı qiymət' },
            { value: books.filter((b) => b.discountPercent != null).length, label: 'Endirimli' },
          ]}
        />

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Hələlik audio kitab yoxdur.</p>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {books.map((book) => (
              <AudiobookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AudiobookCard({ book }: { book: Book }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#eee5d1] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a08c5b]/10">
      <Link to={`/books/${book.id}`} className="relative flex h-56 items-center justify-center bg-[#f6efe1] px-5 py-5">
        <img
          src={book.coverUrl ?? FALLBACK_COVER}
          alt={book.title}
          className="h-full w-auto max-w-full rounded-sm object-contain shadow-lg transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_COVER }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-800 shadow-sm">
          🎧 Audio
        </span>
        {book.discountPercent != null && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
            -{book.discountPercent}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/books/${book.id}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-[#1f2a33] hover:underline">{book.title}</h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-gray-500">{book.authors[0] ?? 'Müəllif məlumatı yoxdur'}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">₼{book.price}</span>
          {book.originalPrice != null && <span className="text-xs text-gray-400 line-through">₼{book.originalPrice}</span>}
        </div>
        <Link
          to={`/books/${book.id}`}
          className="mt-3 block w-full rounded-full py-2 text-center text-xs font-bold tracking-wide text-white transition-colors hover:opacity-90"
          style={{ background: PRIMARY }}
        >
          Ətraflı bax
        </Link>
      </div>
    </div>
  )
}