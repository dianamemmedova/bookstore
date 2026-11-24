const AZ_MONTHS = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr']
const AZ_DAYS   = ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə']

/** Qısa ay adları (0-11) */
export const MONTHS_SHORT = ['Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek']

/** "Şənbə, 24 May 2026" */
export function formatDate(iso: string): string {
  if (!iso) return ''
  // "2026-11-24" (yalnız tarix) yerli gün kimi oxunsun, UTC sürüşməsi olmasın
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00`) : new Date(iso)
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

/** Bu günün tarixi (YYYY-MM-DD), brauzerin yerli vaxtı ilə */
export function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// "2026-11-24" → yerli gün (UTC sürüşməsi olmasın deyə hissələrlə qururuq)
function parseIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Bu həftə (bazar ertəsi → bazar) */
export function isSameWeek(iso: string): boolean {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7))
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
  const d = parseIso(iso)
  return d >= start && d <= end
}

/** monthOffset: 0 = bu ay, 1 = gələn ay */
export function isInMonth(iso: string, monthOffset: number): boolean {
  const now = new Date()
  const target = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const d = parseIso(iso)
  return d.getFullYear() === target.getFullYear() && d.getMonth() === target.getMonth()
}

/** Gələn aydan sonrakı tarixlər */
export function isAfterNextMonth(iso: string): boolean {
  const now = new Date()
  return parseIso(iso) >= new Date(now.getFullYear(), now.getMonth() + 2, 1)
}

/** Bugündən n gün sonrasının tarixini YYYY-MM-DD formatında qaytarır */
export function getMinDate(daysAfter = 5): string {
  const d = new Date()
  d.setDate(d.getDate() + daysAfter)
  return d.toISOString().split('T')[0]
}