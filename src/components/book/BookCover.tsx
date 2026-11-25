import type { Book } from '../../types/book'

export default function BookCover({ book }: { book: Book }) {
  const coverUrl = book.coverUrl ?? ''

  return (
    <div className="lg:col-span-3 flex justify-center lg:justify-start">
      <div className="relative w-44 sm:w-52 lg:w-60">
        {/* Kitabın altındakı yumşaq kölgə */}
        <div className="absolute inset-x-5 -bottom-3 h-8 rounded-full bg-black/25 blur-xl" aria-hidden="true" />

        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-100 shadow-xl ring-1 ring-black/10">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-gray-300">📖</div>
          )}

          {book.discountPercent != null && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow">
              -{book.discountPercent}%
            </span>
          )}
          {book.isAudiobook && (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow">
              🎧 Audio
            </span>
          )}
        </div>
      </div>
    </div>
  )
}