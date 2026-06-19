import type { Store, StoreEvent } from '../types/store'

export const BAKU_CENTER = { lat: 40.4093, lng: 49.8671 }

export const stores: Store[] = [
  { id: 1, name: 'Nəriman Nərimanov', address: 'Nəriman Nərimanov küç. 25, Bakı', lat: 40.4093, lng: 49.8671, phone: '+994 12 310 00 01', hours: 'B.e.–Şən: 09:00–21:00' },
  { id: 2, name: 'İçərişəhər', address: 'Qız Qalası yan., Bakı', lat: 40.3660, lng: 49.8358, phone: '+994 12 310 00 02', hours: 'B.e.–Şən: 10:00–20:00' },
  { id: 3, name: 'Xətai', address: 'Xətai pr. 14, Bakı', lat: 40.3935, lng: 49.8812, phone: '+994 12 310 00 03', hours: 'B.e.–Şən: 09:00–21:00' },
  { id: 4, name: 'Yasamal', address: 'Həsən Əliyev küç. 3, Bakı', lat: 40.4030, lng: 49.8380, phone: '+994 12 310 00 04', hours: 'B.e.–Şən: 10:00–20:00' },
  { id: 5, name: 'Nizami Mall', address: 'Nizami küç. 107, Bakı', lat: 40.3791, lng: 49.8512, phone: '+994 12 310 00 05', hours: 'B.e.–Baz: 10:00–22:00' },
  { id: 6, name: 'Sumqayıt', address: 'M.Müşfiq küç. 18, Sumqayıt', lat: 40.5960, lng: 49.6500, phone: '+994 18 310 00 06', hours: 'B.e.–Şən: 09:00–20:00' },
]

export const events: StoreEvent[] = [
  { id: 1, storeId: 1, storeName: 'Nəriman Nərimanov', locationType: 'Mağazada', date: '2026-05-24', time: '11:00', title: 'Şənbə Uşaq Hekayəsi', type: 'Uşaq Tədbiri' },
  { id: 2, storeId: 2, storeName: 'İçərişəhər', locationType: 'Mağazada', date: '2026-05-24', time: '11:00', title: 'Həftəlik Uşaq Nağılı', type: 'Uşaq Tədbiri' },
  { id: 3, storeId: 3, storeName: 'Xətai', locationType: 'Mağazada', date: '2026-05-25', time: '14:00', title: 'Bazar Günü Nağıl Saatı', type: 'Uşaq Tədbiri' },
  { id: 4, storeId: 4, storeName: 'Yasamal', locationType: 'Mağazada', date: '2026-05-30', time: '11:00', title: 'Həftəlik Uşaq Nağılı', type: 'Uşaq Tədbiri' },
  { id: 5, storeId: 5, storeName: 'Nizami Mall', locationType: 'Mağazada', date: '2026-05-30', time: '11:00', title: 'K-POP Kitab Saatı', type: 'Uşaq Tədbiri' },
  { id: 6, storeId: 1, storeName: 'Nəriman Nərimanov', locationType: 'Mağazada', date: '2026-05-30', time: '13:00', title: 'Müəllif İmza Günü', type: 'Müəllif Tədbiri' },
  { id: 7, storeId: 2, storeName: 'İçərişəhər', locationType: 'Mağazada', date: '2026-05-30', time: '14:00', title: 'Yerli Müəlliflə Söhbət', type: 'Müəllif Tədbiri' },
  { id: 8, storeId: 3, storeName: 'Xətai', locationType: 'Mağazada', date: '2026-05-31', time: '14:00', title: 'Bazar Günü Nağıl Saatı', type: 'Uşaq Tədbiri' },
  { id: 9, storeId: 4, storeName: 'Yasamal', locationType: 'Mağazada', date: '2026-05-31', time: '14:00', title: 'Bazar Günü Nağıl Saatı', type: 'Uşaq Tədbiri' },
  { id: 10, storeId: 6, storeName: 'Sumqayıt', locationType: 'Virtual', date: '2026-06-05', time: '18:00', title: 'Virtual Müəllif Müzakirəsi', type: 'Müəllif Tədbiri' },
  { id: 11, storeId: 1, storeName: 'Nəriman Nərimanov', locationType: 'Virtual', date: '2026-06-10', time: '19:00', title: 'Online Kitab Klubu', type: 'Digər' },
  { id: 12, storeId: 5, storeName: 'Nizami Mall', locationType: 'Mağazada', date: '2026-06-15', time: '15:00', title: 'Yay Kitabları Təqdimatı', type: 'Digər' },
]