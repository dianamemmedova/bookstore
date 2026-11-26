import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/AuthModalContext'
import { fetchAudioAccess } from '../../services/audioService'
import type { AudioAccess } from '../../services/audioService'
import type { Book } from '../../types/book'
import AudioPlayer from './AudioPlayer'

type State = { kind: 'loading' } | { kind: 'error' } | { kind: 'ready'; access: AudioAccess }

function Box({ children }: { children: ReactNode }) {
  return <div className="rounded-md border border-dashed border-audio/40 bg-audio-soft px-4 py-4 text-sm text-on-audio-soft">{children}</div>
}

// Audio kitabın dinləmə hissəsi: giriş etməyibsə dəvət, almayıbsa kilid, alıbsa pleyer
export default function AudioSection({ book }: { book: Book }) {
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)
  const userId = user?.id ?? null

  useEffect(() => {
    if (userId === null) return
    let cancelled = false
    fetchAudioAccess(book.id)
      .then((access) => { if (!cancelled) setState({ kind: 'ready', access }) })
      .catch(() => { if (!cancelled) setState({ kind: 'error' }) })
    return () => { cancelled = true }
  }, [book.id, userId, reloadKey])

  // Pleyer xəta verəndə (məs. link vaxtı bitib) yeni link alınır
  const refresh = useCallback(() => setReloadKey((k) => k + 1), [])

  if (!book.hasAudio) {
    return book.isAudiobook ? <Box>🎧 Bu audio kitabın səs faylı tezliklə əlavə olunacaq.</Box> : null
  }

  if (userId === null) {
    return (
      <Box>
        <p className="font-semibold text-on-audio-soft">🎧 Bu kitabı dinləmək olar</p>
        <p className="mt-1">Dinləmək üçün hesabınıza daxil olun və kitabı alın.</p>
        <button onClick={openLogin} className="mt-3 rounded-sm bg-audio px-5 py-2 text-xs font-bold tracking-widest text-white hover:opacity-90">
          DAXİL OL
        </button>
      </Box>
    )
  }

  if (state.kind === 'loading') {
    return <div className="h-28 animate-pulse rounded-md bg-sunken" />
  }
  if (state.kind === 'error') {
    return (
      <Box>
        Audio yüklənə bilmədi.{' '}
        <button onClick={() => { setState({ kind: 'loading' }); refresh() }} className="font-semibold underline">Yenidən cəhd et</button>
      </Box>
    )
  }
  if (state.access.status === 'locked') {
    return (
      <Box>
        <p className="font-semibold text-on-audio-soft">🔒 Dinləmək üçün kitabı almalısınız</p>
        <p className="mt-1">Sifarişiniz verildikdən dərhal sonra audio kitabı burada dinləyə biləcəksiniz.</p>
      </Box>
    )
  }

  return <AudioPlayer src={state.access.url} title={book.title} onSourceError={refresh} />
}