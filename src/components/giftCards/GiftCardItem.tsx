import { CARD_COLORS } from '../../data/giftCards'
import type { GiftCard } from '../../data/giftCards'
import { CardSVG } from './CardSVG'

export function GiftCardItem({ card, selected, onToggle }: {
  card: GiftCard
  selected: boolean
  onToggle: (id: number) => void
}) {
  return (
    <button
      onClick={() => onToggle(card.id)}
      className={`w-full flex flex-col text-left rounded-md overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 ${
        selected ? 'ring-2 ring-[#c9a454]' : 'ring-1 ring-line'
      }`}
    >
      <div className="w-full relative aspect-[5/3]" style={{ background: CARD_COLORS[card.colorIndex].bg }}>
        <CardSVG colorIndex={card.colorIndex} />
        <span className="absolute bottom-1.5 right-1.5 bg-black/40 text-[#e8d5a3] text-[9px] font-semibold px-1.5 py-0.5 rounded">
          {card.amount}
        </span>
        {selected && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#c9a454] rounded-full flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="#1a2e3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
      <div className="bg-white p-2.5 flex-1">
        <p className="text-xs font-semibold text-ink leading-snug line-clamp-2">{card.title}</p>
        <p className="text-xs text-muted mt-0.5">{card.sub}</p>
        <p className="tabular text-xs font-semibold text-muted-gold-text mt-1">{card.amount}</p>
      </div>
    </button>
  )
}