import { useState } from 'react'
import type { CardCategory } from '../../data/giftCards'
import { GiftCardItem } from './GiftCardItem'

export function CategorySection({ category, selected, onToggle }: {
  category: CardCategory
  selected: Set<number>
  onToggle: (id: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? category.cards : category.cards.slice(0, 4)

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#3d5a6b]/20">
        <span className="w-6 h-0.5 bg-[#c9a454] rounded-full flex-shrink-0" />
        <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map((card) => (
          <GiftCardItem
            key={card.id}
            card={card}
            selected={selected.has(card.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
      {category.cards.length > 4 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 text-xs font-medium text-[#c9a454] hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          {expanded ? 'Daha az göstər ▲' : 'Hamısını gör ▼'}
        </button>
      )}
    </section>
  )
}