import type { HeartIconProps } from "../types/book"

export const HeartIcon = ({ filled = false, fillColor = 'none', strokeColor = 'currentColor' }: HeartIconProps) => (
  <svg className="w-4 h-4 transition-colors" viewBox="0 0 24 24"
    fill={filled ? fillColor : 'none'}
    stroke={filled ? fillColor : strokeColor}
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
)

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className ?? 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
)