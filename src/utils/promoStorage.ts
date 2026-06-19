const KEY = 'bookstore_used_promos'

function getUsedPromos(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function hasUsedPromo(email: string, code: string): boolean {
  const all = getUsedPromos()
  return (all[email] ?? []).includes(code.toUpperCase())
}

export function markPromoUsed(email: string, code: string): void {
  const all = getUsedPromos()
  if (!all[email]) all[email] = []
  const upper = code.toUpperCase()
  if (!all[email].includes(upper)) {
    all[email].push(upper)
  }
  localStorage.setItem(KEY, JSON.stringify(all))
}