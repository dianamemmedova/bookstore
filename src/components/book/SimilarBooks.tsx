import { Link } from 'react-router-dom'
import type { SimilarBook } from '../../types/book'
import { PRIMARY } from '../../constants/theme'



export default function SimilarBooks({ books, subjectToSlug }: SimilarBook) {
  if (books.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-8 relative">
        <span className="relative z-10 px-4 bg-white">Bəyənə Biləcəkləriniz</span>
        <span className="absolute inset-x-0 top-1/2 border-t border-gray-200" />
      </h2>
      <div className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {books.map((b) => {
          const bSlug = subjectToSlug(b.subjects[0] ?? '')
          return (
            <div key={b.id} className="flex-shrink-0 w-40 text-center">
              <Link to={`/books/${b.id}`} state={{ fromGenre: bSlug }}>
                <img src={b.coverUrl ?? ''} alt={b.title}
                  className="w-40 h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow mx-auto bg-gray-100"
                  onError={(e) => { e.currentTarget.style.display = 'none' }} />
              </Link>
              <Link to={`/books/${b.id}`} state={{ fromGenre: bSlug }}>
                <p className="text-xs font-medium text-gray-900 hover:underline line-clamp-2 mt-2 mb-0.5">
                  {b.title}
                </p>
              </Link>
              <p className="text-xs" style={{ color: PRIMARY }}>{b.authors[0] ?? ''}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}