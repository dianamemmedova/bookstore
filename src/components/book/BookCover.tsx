import type { Book } from '../../types/book'
import { PRIMARY } from '../../constants/theme'

interface Props {
  book: Book
  rawSubject: string
}

export default function BookCover({ book, rawSubject }: Props) {
  const coverUrl = book.coverUrl ?? ''

  return (
    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
      <div className="relative border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 aspect-[2/3] shadow-sm w-40 sm:w-56 lg:w-full">
        {book.ebookAccess === 'public_domain' && (
          <div className="absolute top-3 left-3 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
            Pulsuz
          </div>
        )}
        {coverUrl && (
          <img src={coverUrl} alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }} />
        )}
      </div>
      <div className="mt-3 space-y-1 w-40 sm:w-56 lg:w-full">
        {['Open Library', rawSubject].map((l) => (
          <div key={l} className="flex items-center gap-1.5 text-xs" style={{ color: PRIMARY }}>
            <span>✓</span><span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}