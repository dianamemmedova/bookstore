import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const TILES = [
  { label: 'Detektiv', to: '/books?genre=mystery', icon: 'search' },
  { label: 'Fantastika', to: '/books?genre=scifi', icon: 'rocket_launch' },
  { label: 'Romantika', to: '/books?genre=romance', icon: 'favorite' },
  { label: 'Tarix', to: '/books?genre=history', icon: 'account_balance' },
  { label: 'Elm', to: '/books?genre=science', icon: 'science' },
  { label: 'Uşaq', to: '/books?genre=children', icon: 'child_care' },
]

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {TILES.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 transition-colors hover:border-primary"
          >
            <Icon name={t.icon} size={26} className="text-primary" />
            <span className="font-display text-[15px] font-bold text-ink">{t.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}