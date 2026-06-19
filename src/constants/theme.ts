
import type { EventType } from '../types/store'

export const PRIMARY      = '#3d5a6b'
export const ACCENT       = '#a08c5b'
export const PRIMARY_DARK = '#2e4455'
export const COVER_FALLBACK = 'https://covers.openlibrary.org/b/id/0-M.jpg'
export const GREEN = '#2e6b4f'
export const DARK_ALT = '#1e3a4f'
export const BACKGROUND_LIGHT = '#f8f7f4' 
export const BACKGROUND_SOFT = '#eef3f6' 
export const PURPLE = '#7c3aed'
export const GREEN_DARK = '#245840'
export const WHITE        = '#fff'
export const TEXT_DARK    = '#374151'
export const BORDER_LIGHT = '#d1d5db'
export const RED = '#ef4444'
export const GOLD         = '#c9a454'
export const BORDER_DEFAULT = '#e5e7eb'
export const AMBER_DARK = '#b45309'
export const LIGHT_GREY = '#9ca3af'
export const LIGHT_ORANGE = '#f59e0b'
export const PRIMARY_LIGHT_BG = '#eef9f5'
export const DARK_BLUE = '#1a2e3d'
export const GRAY_TEXT = '#6b7280'
export const PRIMARY_DISABLED = '#6b8a9a'
export const RED_LIGHT_BG = '#fee2e2'
export const RED_TEXT = '#dc2626'
export const STAR_EMPTY = '#e5e7eb'
export const BEIGE_BG = '#f5f0e8'
export const BLUE_GRAY_BG = '#e8eef2'
export const LIGHT_BLUE_BG = '#f0f4f6'
export const LIGHT_GREEN_BG = '#f0f7f4'

export const GREEN_ACCENT = '#2d7a4f'
export const RED_ERROR = '#ef4444'
export const ORANGE_WEAK = '#f97316'
export const YELLOW_MEDIUM = '#eab308'
export const GREEN_STRONG = '#22c55e'
export const GREEN_ACCENT2 = '#16a34a'
export const GREEN_DARKEST = '#245840'
export const TEAL_GRADIENT_START = '#2e8b8b'
export const TEAL_GRADIENT_END = '#1a6b6b'


export const EVENT_COLORS: Record<EventType, { bg: string; text: string; dot: string }> = {
  'Müəllif Tədbiri': { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  'Uşaq Tədbiri':   { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  'Digər':          { bg: '#f5f3ff', text: '#6d28d9', dot: '#8b5cf6' },
}