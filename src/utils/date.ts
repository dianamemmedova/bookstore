const AZ_MONTHS = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr']
const AZ_DAYS   = ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə']

/** Qısa ay adları (0-11) */
export const MONTHS_SHORT = ['Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek']

/** "Şənbə, 24 May 2026" */
export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${AZ_DAYS[d.getDay()]}, ${d.getDate()} ${AZ_MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

/** "24 May 2026, Şənbə" */
export function formatDateAz(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getDate()} ${AZ_MONTHS[d.getMonth()]} ${d.getFullYear()}, ${AZ_DAYS[d.getDay()]}`
}

/** "24.05.2026" */
export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}

/** "14:35" */
export function formatTime(dateStr: string): string {
  const d = new Date(dateStr)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function isSameWeek(iso: string): boolean {
  const now = new Date()
  const d = new Date(iso)
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  return d >= startOfWeek && d <= endOfWeek
}

export function isThisMonth(iso: string, month: number): boolean {
  return new Date(iso).getMonth() === month
}

/** Bugündən n gün sonrasının tarixini YYYY-MM-DD formatında qaytarır */
export function getMinDate(daysAfter = 5): string {
  const d = new Date()
  d.setDate(d.getDate() + daysAfter)
  return d.toISOString().split('T')[0]
}