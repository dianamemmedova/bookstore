import { useState } from 'react'
import { Link } from 'react-router-dom'


export function AboutSection() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl text-gray-900 mb-6" >
          Onlayn Kitab Mağazamızla Tanış Olun
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Azərbaycanın ən böyük onlayn kitab mağazası
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            <Link to="/books?genre=fiction" className="underline underline-offset-2 hover:text-gray-900">Bədii ədəbiyyat</Link>,{' '}
            <Link to="/books?genre=biography" className="underline underline-offset-2 hover:text-gray-900">bioqrafiya</Link>,{' '}
            <Link to="/books?genre=scifi" className="underline underline-offset-2 hover:text-gray-900">elmi fantastika</Link>,{' '}
            <Link to="/books?genre=mystery" className="underline underline-offset-2 hover:text-gray-900">detektiv</Link>,{' '}
            <Link to="/books?genre=children" className="underline underline-offset-2 hover:text-gray-900">uşaq ədəbiyyatı</Link>{' '}
            — hər zövqə uyğun kitab tapacaqsınız. Open Library-nin milyonlarla kitabını pulsuz oxuyun!
          </p>
          {expanded && (
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Open Library, İnternet Arxivinin bir layihəsidir. Milyonlarla kitab pulsuz oxuna, yüklənə bilər.
              Klassiklərdən müasir əsərlərə qədər geniş kolleksiya sizin ixtiyarınızdadır.
            </p>
          )}
          <button  onClick={() => setExpanded((p) => !p)}
            className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 flex items-center gap-1 mx-auto" >
            {expanded ? 'Daha Az' : 'Daha Çox'}
            <svg className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}