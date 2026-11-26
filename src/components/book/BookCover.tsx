import type { Book } from '../../types/book'
import Icon from '../ui/Icon'

export default function BookCover({ book }: { book: Book }) {
  const coverUrl = book.coverUrl ?? ''

  return (
    <div className="lg:col-span-4 xl:col-span-3">
      <div className="relative mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-md border border-line bg-panel p-8 lg:max-w-none">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="h-full w-full rounded-[3px] object-cover shadow-xl"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <Icon name="menu_book" size={64} className="text-line-strong" />
        )}

        {book.discountPercent != null && (
          <span className="tabular absolute left-2 top-2 rounded-full bg-sale px-2.5 py-1 text-xs font-semibold text-white">
            -{book.discountPercent}%
          </span>
        )}
        {book.isAudiobook && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-audio-soft px-2.5 py-1 text-xs font-semibold text-on-audio-soft">
            <Icon name="headphones" size={14} /> Audio
          </span>
        )}
      </div>
    </div>
  )
}