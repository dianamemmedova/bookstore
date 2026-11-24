import { api } from '../lib/api'
import type { EventType, LocationType, Store, StoreEvent } from '../types/store'

interface ApiStore {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  hours: string
}

interface ApiEvent {
  id: number
  storeId: number
  storeName: string
  title: string
  type: 'AUTHOR' | 'KIDS' | 'OTHER'
  locationType: 'IN_STORE' | 'VIRTUAL'
  date: string // "2026-12-05"
  time: string // "14:00"
}

const TYPE_LABEL: Record<ApiEvent['type'], EventType> = {
  AUTHOR: 'Müəllif Tədbiri',
  KIDS: 'Uşaq Tədbiri',
  OTHER: 'Digər',
}
const LOCATION_LABEL: Record<ApiEvent['locationType'], LocationType> = {
  IN_STORE: 'Mağazada',
  VIRTUAL: 'Virtual',
}

// Public qovluqda 6 mağaza və 12 tədbir şəkli var. ID-yə görə dövr edirik ki, yeni əlavə olunanların da şəkli olsun
const storeImage = (id: number) => `/stores/store-${((id - 1) % 6) + 1}.jpg`
const eventImage = (id: number) => `/events/event-${((id - 1) % 12) + 1}.jpg`

export async function fetchStores(signal?: AbortSignal): Promise<Store[]> {
  const res = await api<{ items: ApiStore[] }>('/stores', { signal, auth: false })
  return res.items.map((s, i) => ({ ...s, num: i + 1, image: storeImage(s.id) }))
}

// from: bu gündən başlayaraq gələcək tədbirlər
export async function fetchEvents(from: string, signal?: AbortSignal): Promise<StoreEvent[]> {
  const res = await api<{ items: ApiEvent[] }>('/events', { query: { from, limit: 200 }, signal, auth: false })
  return res.items.map((e) => ({
    id: e.id,
    storeId: e.storeId,
    storeName: e.storeName,
    title: e.title,
    date: e.date,
    time: e.time,
    type: TYPE_LABEL[e.type],
    locationType: LOCATION_LABEL[e.locationType],
    image: eventImage(e.id),
  }))
}