import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { FALLBACK } from '../../constants/link';

export function TrendingSidebar({ books, loading }: { books: Book[]; loading: boolean }) {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-5 h-0.5 bg-[#c9a454] rounded-full" />
          <h3 className="text-base font-bold text-gray-900">
             Trend Hekayələr
          </h3>
      </div>
      <div className="space-y-3">
        {loading
          ? [1,2,3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3 border-b border-gray-100 pb-3">
                <div className="w-10 flex-shrink-0 bg-gray-100 rounded aspect-[3/4]"  />
                <div className="flex-1">
                  <div className="h-3.5 bg-gray-100 rounded w-full mb-1.5" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))
          : books.map((book, i) => (
              <div key={book.id}
                  className={`flex gap-3 items-start pb-3 ${i < books.length - 1 ? 'border-b border-gray-100' : ''}`}>
                
                <div className="flex-shrink-0 w-10 overflow-hidden rounded bg-gray-50 ring-1 ring-gray-100 aspect-[3/4]" >
                  <img
                    src={book.coverUrl ?? FALLBACK}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK }}
                  />
                </div>
                <Link to={`/books/${book.id}`} className="group flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#3d5a6b] transition-colors leading-snug mb-0.5 line-clamp-2">
                    {book.title}
                  </h4>
                  {book.authors?.[0] && <p className="text-xs text-gray-400 mb-1">{book.authors[0]}</p>}
                  <span className="text-xs font-bold text-[#3d5a6b] group-hover:text-[#c9a454] transition-colors">
                    Ətraflı →
                  </span>
                </Link>
              </div>
            ))
        }
      </div>
    </div>
  )
}