import { useBooks } from '../hooks/useBooks'
import { fetchDiscounted } from '../services/bookService'
import { LoadingScreen, ErrorScreen } from '../components/discount/PageStates'
import DiscountedCard from '../components/discount/DiscountedCard'
import PageHero from '../components/shared/PageHero'

export default function DiscountedBooksPage() {
  const { books, loading, error } = useBooks(() => fetchDiscounted(60), [])

  if (loading) return <LoadingScreen message="Endirimli kitablar yüklənir..." />
  if (error)   return <ErrorScreen message={error} />

  const maxPercent = Math.max(0, ...books.map((b) => b.discountPercent ?? 0))

  return (
    <div className="min-h-screen bg-[#fcfaf6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-12 sm:pb-16">
        <PageHero
          tone="sale"
          eyebrow="🔥 Məhdud təklif"
          title="Endirimli Kitablar"
          subtitle="Seçilmiş kitablara xüsusi endirimlər. Stok bitənə qədər."
          covers={books.map((b) => b.coverUrl ?? '')}
          stats={[
            { value: books.length, label: 'Endirimli kitab' },
            { value: maxPercent > 0 ? `${maxPercent}%-dək` : '—', label: 'Endirim' },
          ]}
        />

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Hazırda endirimli kitab yoxdur.</p>
        ) : (
          <main className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {books.map((book) => (
              <DiscountedCard key={book.id} book={book} />
            ))}
          </main>
        )}
      </div>
    </div>
  )
}