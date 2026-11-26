import { useBooks } from '../hooks/useBooks'
import { fetchDiscounted } from '../services/bookService'
import { LoadingScreen, ErrorScreen } from '../components/discount/PageStates'
import BookCard from '../components/book/BookCard'
import PageHero from '../components/shared/PageHero'

export default function DiscountedBooksPage() {
  const { books, loading, error } = useBooks(() => fetchDiscounted(60), [])

  if (loading) return <LoadingScreen message="Endirimli kitablar yüklənir..." />
  if (error)   return <ErrorScreen message={error} />

  const maxPercent = Math.max(0, ...books.map((b) => b.discountPercent ?? 0))

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Kampaniya"
        title="Endirimli Kitablar"
        subtitle="Seçilmiş kitablara xüsusi endirimlər. Stok bitənə qədər."
        covers={books.map((b) => b.coverUrl ?? '')}
        stats={[
          { value: books.length, label: 'endirimli kitab', tone: 'sale' },
          { value: maxPercent > 0 ? `${maxPercent}%-dək` : '—', label: 'endirim' },
        ]}
      />

      <div className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
        {books.length === 0 ? (
          <p className="py-16 text-center text-muted">Hazırda endirimli kitab yoxdur.</p>
        ) : (
          <main className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} showWishlist={false} />
            ))}
          </main>
        )}
      </div>
    </div>
  )
}