import type { WishlistList } from '../types/wishlistPage'

const STORAGE_PREFIX = 'bookstore_wishlists'

export function getWishlistStorageKey(userKey: string | number | undefined): string {
  return userKey ? `${STORAGE_PREFIX}_${userKey}` : STORAGE_PREFIX
}
//istifadəçiyə xas storage açarı yaratmaq

export function loadLists(userId: string | number | undefined): WishlistList[] | null {
  try {
    const raw = localStorage.getItem(getWishlistStorageKey(userId))
    if (!raw) return null
    return JSON.parse(raw) as WishlistList[]
  } catch {
    return null
  }
}
//  localStorage-dan oxumaq , açara uyğun stringi qaytarir

export function saveLists(userId: string | number | undefined, lists: WishlistList[]) {
  try {
    localStorage.setItem(getWishlistStorageKey(userId), JSON.stringify(lists))
  } catch { /* silent */ }
}
// yeni lisdi elave edir locala

export const DEFAULT_LISTS = (): WishlistList[] => [
  { id: 1, name: 'Mənim Sevimlilərim', description: '', privacy: 'private', items: [] }
]
// baslanğıc vistlist siyahisi