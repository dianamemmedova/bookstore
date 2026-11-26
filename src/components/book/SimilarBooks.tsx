import { Link } from 'react-router-dom'
import type { SimilarBook } from '../../types/book'

export default function SimilarBooks({ books, subjectToSlug }: SimilarBook) {
  if (books.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
        <span className="h-4 w-1 rounded-full bg-gold" />
        Bəyənə biləcəkləriniz
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {books.map((b) => {
          const bSlug = subjectToSlug(b.subjects[0] ?? '')
          return (
            <div key={b.id} className="w-36 flex-shrink-0 rounded-md border border-line bg-white p-2 transition-colors hover:border-line-strong">
              <Link to={`/books/${b.id}`} state={{ fromGenre: bSlug }} className="mb-2 flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-2.5">
                <img
                  src={b.coverUrl ?? ''}
                  alt={b.title}
                  className="h-full w-full rounded-[2px] object-cover shadow-md"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </Link>
              <Link to={`/books/${b.id}`} state={{ fromGenre: bSlug }}>
                <p className="mb-0.5 line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink hover:underline">{b.title}</p>
              </Link>
              <p className="line-clamp-1 text-xs text-muted">{b.authors[0] ?? ''}</p>
              {b.price != null && <p className="tabular mt-1 text-sm font-semibold text-ink">₼{b.price}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}