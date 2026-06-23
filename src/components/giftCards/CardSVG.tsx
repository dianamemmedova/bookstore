import { CARD_COLORS } from '../../data/giftCards'

export function CardSVG({ colorIndex }: { colorIndex: number }) {
  const c = CARD_COLORS[colorIndex]
  const lastFour = String(1000 + colorIndex * 1337).slice(-4)

  return (
    <svg width="100%" height="100%" viewBox="0 0 190 115"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="190" height="115" rx="12" fill={c.bg} />
      <circle cx="155" cy="25" r="40" fill={c.chip} opacity="0.08" />
      <circle cx="170" cy="10" r="28" fill={c.chip} opacity="0.06" />
      <text x="174" y="18" fontSize="9" fill={c.text} opacity="0.8" textAnchor="end">B&amp;S</text>
      <rect x="16" y="32" width="28" height="20" rx="4" fill={c.chip} opacity="0.7" />
      <line x1="16" y1="39" x2="44" y2="39" stroke={c.bg} strokeWidth="0.8" opacity="0.5" />
      <line x1="16" y1="45" x2="44" y2="45" stroke={c.bg} strokeWidth="0.8" opacity="0.5" />
      <line x1="23" y1="32" x2="23" y2="52" stroke={c.bg} strokeWidth="0.8" opacity="0.5" />
      <line x1="30" y1="32" x2="30" y2="52" stroke={c.bg} strokeWidth="0.8" opacity="0.5" />
      <line x1="37" y1="32" x2="37" y2="52" stroke={c.bg} strokeWidth="0.8" opacity="0.5" />
      <text x="16" y="88" fontFamily="monospace" fontSize="11"
        fill={c.text} opacity="0.9" letterSpacing="2">
        **** **** **** {lastFour}
      </text>
    </svg>
  )
}