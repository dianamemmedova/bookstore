import { useAudiobooks } from '../hooks/useAudiobooks'
import BookCard from '../components/book/BookCard'
import PageHero from '../components/shared/PageHero'
import { LoadingScreen, ErrorScreen } from '../components/discount/PageStates'

export default function AudiobooksPage() {
  const { books, loading, error } = useAudiobooks()

  if (loading) return <LoadingScreen message="Kitablar yüklənir..." />
  if (error) return <ErrorScreen message={error} />

  const minPrice = books.length ? `₼${Math.min(...books.map((b) => b.price ?? 0))}` : '—'

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Dinlə"
        title="Səsli Kitablar"
        subtitle="Kitablar daim sizinlə olsun. Aldığınız audio kitabı birbaşa saytda dinləyin."
        covers={books.map((b) => b.coverUrl ?? '')}
        stats={[
          { value: books.length, label: 'audiokitab' },
          { value: minPrice, label: 'ən aşağı qiymət' },
          { value: books.filter((b) => b.discountPercent != null).length, label: 'endirimli', tone: 'sale' },
        ]}
      />

      <div className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
        {books.length === 0 ? (
          <p className="py-16 text-center text-muted">Hələlik audio kitab yoxdur.</p>
        ) : (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} showWishlist={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}