import { useBooks } from '../hooks/useBooks'
import { fetchDiscounted } from '../services/bookService'
import { LoadingScreen, ErrorScreen } from '../components/discount/PageStates'
import { StatsBar } from '../components/discount/StatsBar'
import DiscountedCard from '../components/discount/DiscountedCard'
import { RED_LIGHT_BG, RED_TEXT } from '../constants/theme'

const STATS = (totalBooks: number, maxPercent: number) => [
  { value: String(totalBooks), label: 'Endirimli kitab' },
  { value: `${maxPercent}%-dək`, label: 'Endirim' },
  { value: 'Məhdud',           label: 'Vaxt' },
]

export default function DiscountedBooksPage() {
  const { books, loading, error } = useBooks(() => fetchDiscounted(60), [])

  if (loading) return <LoadingScreen message="Endirimli kitablar yüklənir..." />
  if (error)   return <ErrorScreen message={error} />

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">

        <header className="text-center mb-8 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-4"
            style={{ background: RED_LIGHT_BG, color: RED_TEXT }}>
            🔥 Məhdud Təklif
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Endirimli Kitablar
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-4">
            Seçilmiş kitablara xüsusi endirimlər
          </p>
        </header>

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Hazırda endirimli kitab yoxdur.</p>
        ) : (
          <>
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
              {books.map((book) => (
                <DiscountedCard key={book.id} book={book} />
              ))}
            </main>

            <StatsBar items={STATS(books.length, Math.max(...books.map((b) => b.discountPercent ?? 0)))} />
          </>
        )}
      </div>
    </div>
  )
}