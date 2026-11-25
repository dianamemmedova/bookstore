import { api, API_URL, ApiError } from '../lib/api'

export type AudioAccess = { status: 'ok'; url: string } | { status: 'locked' }

// Backend alıb-almadığını yoxlayır. Almayıbsa 403 gəlir, bu xəta deyil, "kilidli" vəziyyətdir.
export async function fetchAudioAccess(bookId: string): Promise<AudioAccess> {
  try {
    const data = await api<{ url: string; expiresInSeconds: number }>(`/books/${encodeURIComponent(bookId)}/audio-access`)
    return { status: 'ok', url: `${API_URL}${data.url}` }
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) return { status: 'locked' }
    throw e
  }
}