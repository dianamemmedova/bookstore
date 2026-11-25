import { PRIMARY, PRIMARY_LIGHT_BG } from '../constants/theme'
import { useAudiobooks } from '../hooks/useAudiobooks'
import { Link } from 'react-router-dom'
import type { Book } from '../types/book'
import { FALLBACK_COVER } from '../constants/link'

interface StatCardProps {
  icon: string
  value: string | number
  label: string
}

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-4"
            style={{ background: PRIMARY_LIGHT_BG, color: PRIMARY }}>
            🎧 Dinləməyə başla
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Səsli Kitablar
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-4">
            Kitablar daim sizinlə olsun
          </p>
        </div>

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Hələlik audio kitab yoxdur.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {books.map((book) => (
              <AudiobookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-16">
          <StatCard icon="📚" value={books.length} label="Audiokitab" />
          <StatCard icon="💸" value={books.length ? `₼${Math.min(...books.map((b) => b.price ?? 0))}` : '—'} label="Ən aşağı qiymət" />
          <StatCard icon="🔥" value={books.filter((b) => b.discountPercent != null).length} label="Endirimli" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border border-gray-100 hover:border-gray-200">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
        style={{ background: PRIMARY_LIGHT_BG, color: PRIMARY }}>
        {icon}
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}

function AudiobookCard({ book }: { book: Book }) {
  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col border border-gray-100">
      <Link to={`/books/${book.id}`} className="relative overflow-hidden bg-gray-100 aspect-[3/4] block">
        <img
          src={book.coverUrl ?? FALLBACK_COVER}
          alt={book.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_COVER }}
        />
        {book.discountPercent != null && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{book.discountPercent}%
          </span>
        )}
      </Link>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
        <p className="text-xs text-gray-500 mb-auto">{book.authors[0] ?? 'Müəllif məlumatı yoxdur'}</p>
        <div className="pt-3 flex items-center justify-between gap-2">
          <p className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-gray-900">₼{book.price}</span>
            {book.originalPrice != null && <span className="text-xs text-gray-400 line-through">₼{book.originalPrice}</span>}
          </p>
          <Link
            to={`/books/${book.id}`}
            className="text-xs font-medium text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: PRIMARY }}
          >
            Ətraflı
          </Link>
        </div>
      </div>
    </div>
  )
}