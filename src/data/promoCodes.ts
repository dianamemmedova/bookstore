// Çatdırılma qaydaları. Dəyərləri .env faylında dəyişmək olar:
//   VITE_DELIVERY_FEE=5
//   VITE_FREE_DELIVERY_THRESHOLD=60
const num = (value: string | undefined, fallback: number) => {
  const n = Number(value)
  return value !== undefined && value !== '' && Number.isFinite(n) && n >= 0 ? n : fallback
}

export const DELIVERY_FEE = num(import.meta.env.VITE_DELIVERY_FEE, 5)
export const FREE_DELIVERY_THRESHOLD = num(import.meta.env.VITE_FREE_DELIVERY_THRESHOLD, 60)
export const SUGGESTED_CODE = 'ILKALIS20'