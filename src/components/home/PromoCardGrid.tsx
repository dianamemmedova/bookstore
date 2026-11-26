import { Link } from 'react-router-dom'
import type { PromoCard } from '../../data/sections'

export function PromoCardGrid({ cards }: { cards: PromoCard[] }) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 pb-6 lg:px-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.src}
            to={card.to}
            className="group block overflow-hidden rounded-md border border-line transition-colors hover:border-line-strong"
          >
            <img
              src={card.src}
              alt={card.label}
              className="h-44 w-full bg-sunken object-cover transition-opacity group-hover:opacity-95 sm:h-64"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}