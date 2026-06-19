import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { SectionTitle } from './SectionTitle'
import { FALLBACK_IMG } from '../../constants/link'

export function BookOfTheMonth({ book, loading }: { book: Book | null; loading: boolean }) {
  return (
    <section>
      <SectionTitle>Ayın Kitabı</SectionTitle>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-[#f7f4ee] rounded-2xl p-4 sm:p-6 ring-1 ring-[#e8e0d0]">

        {loading ? (
          <div className="animate-pulse flex gap-4 sm:gap-5 w-full">
            <div className="flex-shrink-0 w-20 sm:w-28 bg-gray-200 rounded-lg aspect-[2/3]" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ) : book ? (
          <>
            <Link to={`/books/${book.id}`} className="group flex-shrink-0 mx-auto sm:mx-0">
              <div className="overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-md w-20 sm:w-28 aspect-[2/3]">
                <img
                  src={book.coverUrl ?? FALLBACK_IMG}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0 w-full">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#c9a454] uppercase mb-2 border-b border-[#c9a454]/40 pb-0.5">
                May Seçimimiz
              </span>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">{book.title}</h4>
              {book.authors?.[0] && <p className="text-sm text-gray-500 mb-3">{book.authors[0]}</p>}
              {book.description && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{book.description}</p>
              )}

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 border-t border-[#e0d8c8]">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#3d5a6b]">4.8</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Reytinq</div>
                </div>
                <div className="w-px bg-[#e0d8c8]" />
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#3d5a6b]">12K+</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Oxucu</div>
                </div>
                <div className="w-px bg-[#e0d8c8]" />
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#3d5a6b]">May</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Seçim</div>
                </div>
                <div className="w-full sm:w-auto sm:ml-auto flex items-end mt-2 sm:mt-0">
                  <Link to={`/books/${book.id}`}
                    className="w-full sm:w-auto text-center text-xs font-bold text-white bg-[#3d5a6b] hover:bg-[#2e4455] transition-colors px-4 py-2 rounded-lg">
                    Ətraflı bax →
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}