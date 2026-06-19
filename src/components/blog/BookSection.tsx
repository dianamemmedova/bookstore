import type { BookSectionProps } from '../../types/book'
import { SectionTitle } from './SectionTitle'
import { BookCard } from './BookCard'
import { SkeletonCard } from './SkeletonCard'

export function BookSection({ title, books, loading, cols = 3, label }: BookSectionProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }[cols]

  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className={`grid ${colClass} gap-4 sm:gap-6`}>
        {loading
          ? Array.from({ length: cols }).map((_, i) => <SkeletonCard key={i} />)
          : books.map((book) => <BookCard key={book.id} book={book} label={label} />)
        }
      </div>
    </section>
  )
}