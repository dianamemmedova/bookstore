import { Link } from 'react-router-dom'
import { PRIMARY } from '../../constants/theme'

export function CategoryRow({ cards }: { cards: { label: string; subject: string }[] }) {
  return (
    <div className="grid grid-cols-5 gap-3 mb-4">
      {cards.map(cat => (
        <Link
          key={cat.label}
          to={`/books?subject=${encodeURIComponent(cat.subject)}`}
          className="rounded-lg flex items-center justify-center text-center text-white font-bold text-sm py-8 px-3 hover:opacity-90 transition-opacity leading-snug"
          style={{ background: PRIMARY, minHeight: 100 }}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  )
}