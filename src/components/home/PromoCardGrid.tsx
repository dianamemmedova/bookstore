import { Link } from 'react-router-dom'
import type { PromoCard } from '../../data/sections'

export function PromoCardGrid({ cards }: { cards: PromoCard[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 border-b border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.src}
            to={card.to}
            className="block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <img
              src={card.src}
              alt={card.label}
              className="w-full h-48 sm:h-80 object-cover group-hover:opacity-95 transition-opacity bg-gray-100"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}