import { fetchAudiobooks } from '../services/bookService'
import { useBooks } from './useBooks'

// Audio kitablar backend-dəndir (admin paneldə "Audio kitab" işarələnənlər). Brauzerdə heç nə saxlanmır.
export function useAudiobooks(limit = 60) {
  return useBooks(() => fetchAudiobooks(limit), [limit])
}