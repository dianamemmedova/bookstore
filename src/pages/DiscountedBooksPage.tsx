import { useMemo } from 'react'
import { useBooks } from '../hooks/useBooks'
import { searchBooks } from '../services/bookService'
import { toDiscountedBooks } from '../utils/bookUtils'
import { LoadingScreen, ErrorScreen } from '../components/discount/PageStates'
import { StatsBar } from '../components/discount/StatsBar'
import DiscountedCard from '../components/discount/DiscountedCard'
import type { DiscountedBook } from '../types/book'
import { RED_LIGHT_BG, RED_TEXT } from '../constants/theme'

const STATS = (totalBooks: number) => [
  { value: `${totalBooks}+`, label: 'Endirimli kitab' },
  { value: '40%-dək',        label: 'Endirim' },
  { value: 'Məhdud',         label: 'Vaxt' },
]

export default function DiscountedBooksPage() {
  const { books, loading, error } = useBooks(() => searchBooks('fiction', 60), [])

  const discountedBooks = useMemo<DiscountedBook[]>(
    () => (books.length ? toDiscountedBooks(books as DiscountedBook[]) : []),
    [books],
  )

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
            Hər kitaba xüsusi endirim – 10%-dən 40%-dək!
          </p>
        </header>

        <main className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {discountedBooks.map((book) => (
            <DiscountedCard key={book.id} book={book} />
          ))}
        </main>

        <StatsBar items={STATS(discountedBooks.length)} />
      </div>
    </div>
  )
}