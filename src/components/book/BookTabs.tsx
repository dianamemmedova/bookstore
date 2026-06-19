import { PRIMARY, LIGHT_GREY } from '../../constants/theme'
import type { BookTab } from '../../types/book'

export default function BookTabs({ book, author, genreLabel, activeTab, onTabChange }: BookTab) {
  return (
    <section className="mb-10 sm:mb-16">
      <div className="flex border-b-2 border-gray-100 mb-6 sm:mb-10 gap-1 overflow-x-auto">
        {(['details', 'author'] as const).map((tab) => (
          <button key={tab} onClick={() => onTabChange(tab)}
            className="px-3 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
            style={{
              color: activeTab === tab ? PRIMARY : LIGHT_GREY,
              borderBottom: activeTab === tab ? `2px solid ${PRIMARY}` : '2px solid transparent',
              marginBottom: -2,
            }}>
            {tab === 'details' ? '📋 Məhsul Detalları' : '✍️ Müəllif Haqqında'}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {[
              { label: 'Work ID',       value: book.id,                               icon: '🔑' },
              { label: 'Janr',          value: genreLabel,                            icon: '📚' },
              book.firstPublishYear && { label: 'Nəşr ili',     value: String(book.firstPublishYear),      icon: '📅' },
              book.pages            && { label: 'Səhifə sayı',  value: `${book.pages} səhifə`,            icon: '📄' },
              book.editionCount     && { label: 'Nəşr sayı',    value: String(book.editionCount),         icon: '🖨️' },
              book.ratingsCount     && { label: 'Reytinq sayı', value: book.ratingsCount.toLocaleString(), icon: '⭐' },
            ].filter(Boolean).map((row, i, arr) => row && (
              <div key={row.label}
                className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm sm:text-base">{row.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">{row.label}</span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'author' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-5"
              style={{ background: `${PRIMARY}15` }}>
              ✍️
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{author}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md mx-auto">
              {author} tanınmış müəllifdir. Open Library-nin rəqəmsal kitabxanasında əsərləri mövcuddur.
            </p>
            <a href={`https://openlibrary.org/search?author=${encodeURIComponent(author)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: PRIMARY }}>
              Müəllifin digər kitabları →
            </a>
          </div>
        </div>
      )}
    </section>
  )
}