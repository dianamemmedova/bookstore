import Icon from '../ui/Icon'
import type { BookTab } from '../../types/book'

export default function BookTabs({ book, author, genreLabel, activeTab, onTabChange }: BookTab) {
  const rows = [
    { label: 'Work ID', value: book.id, icon: 'tag' },
    { label: 'Janr', value: genreLabel, icon: 'category' },
    book.firstPublishYear && { label: 'Nəşr ili', value: String(book.firstPublishYear), icon: 'calendar_today' },
    book.pages && { label: 'Səhifə sayı', value: `${book.pages} səhifə`, icon: 'description' },
    book.editionCount && { label: 'Nəşr sayı', value: String(book.editionCount), icon: 'library_books' },
    book.ratingsCount && { label: 'Reytinq sayı', value: book.ratingsCount.toLocaleString(), icon: 'star' },
  ].filter(Boolean) as { label: string; value: string; icon: string }[]

  return (
    <section className="mb-10">
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-line">
        {(['details', 'author'] as const).map((tab) => {
          const active = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                active ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab === 'details' ? 'Məhsul detalları' : 'Müəllif haqqında'}
            </button>
          )
        })}
      </div>

      {activeTab === 'details' && (
        <div className="max-w-2xl overflow-hidden rounded-md border border-line bg-white">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 py-2.5 ${i < rows.length - 1 ? 'border-b border-line' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <Icon name={row.icon} size={18} className="text-muted-gold-text" />
                <span className="text-[13px] text-muted">{row.label}</span>
              </div>
              <span className="tabular text-right text-[13px] font-semibold text-ink">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'author' && (
        <div className="max-w-2xl rounded-md border border-line bg-white p-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-primary">
            <Icon name="edit_note" size={32} />
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-ink">{author}</h3>
          <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-muted">
            {author} tanınmış müəllifdir. Open Library-nin rəqəmsal kitabxanasında əsərləri mövcuddur.
          </p>
          <a
            href={`https://openlibrary.org/search?author=${encodeURIComponent(author)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            Müəllifin digər kitabları <Icon name="arrow_forward" size={15} />
          </a>
        </div>
      )}
    </section>
  )
}