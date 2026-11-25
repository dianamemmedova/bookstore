import { useEffect, useRef, useState } from 'react'
import { GOLD } from '../../constants/theme'

const SPEEDS = [1, 1.25, 1.5, 2, 0.75]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}

interface Props {
  src: string
  title: string
  // Link vaxtı bitəndə (və ya xəta olanda) yeni link almaq üçün
  onSourceError: () => void
}

export default function AudioPlayer({ src, title, onSourceError }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const resumeAt = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[speedIdx]
  }, [speedIdx])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) void a.play().catch(() => {})
    else a.pause()
  }

  const skip = (delta: number) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = Math.min(Math.max(a.currentTime + delta, 0), a.duration || 0)
  }

  const seek = (value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value
    setCurrent(value)
  }

  const percent = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="rounded-2xl p-4 text-white shadow-lg sm:p-5" style={{ background: 'linear-gradient(120deg, #2e4455 0%, #3d5a6b 100%)' }}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const a = e.currentTarget
          setDuration(a.duration)
          setLoading(false)
          a.playbackRate = SPEEDS[speedIdx]
          // Link yenilənəndə qaldığımız yerdən davam edirik
          if (resumeAt.current > 0) {
            a.currentTime = resumeAt.current
            resumeAt.current = 0
          }
        }}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onError={() => {
          resumeAt.current = audioRef.current?.currentTime ?? 0
          setPlaying(false)
          onSourceError()
        }}
      />

      <p className="mb-3 truncate text-xs font-semibold uppercase tracking-widest text-white/60">🎧 Səsli kitab · {title}</p>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => skip(-15)}
          aria-label="15 saniyə geri"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-white/20"
        >
          −15
        </button>
        <button
          onClick={toggle}
          aria-label={playing ? 'Dayandır' : 'Oxut'}
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-[#1a2e3d] shadow-md transition-transform hover:scale-105"
          style={{ background: GOLD }}
        >
          {loading && !playing ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a2e3d]/30 border-t-[#1a2e3d]" />
          ) : playing ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg className="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" /></svg>
          )}
        </button>
        <button
          onClick={() => skip(15)}
          aria-label="15 saniyə irəli"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-white/20"
        >
          +15
        </button>

        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(current, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Audio mövqeyi"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
            style={{
              accentColor: GOLD,
              background: `linear-gradient(to right, ${GOLD} ${percent}%, rgba(255,255,255,0.25) ${percent}%)`,
            }}
          />
          <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/70">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button
          onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
          aria-label="Sürəti dəyiş"
          className="hidden h-9 min-w-[3.25rem] items-center justify-center rounded-full bg-white/10 text-xs font-bold tabular-nums transition-colors hover:bg-white/20 sm:flex"
        >
          {SPEEDS[speedIdx]}x
        </button>
      </div>

      <button
        onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
        className="mt-3 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tabular-nums hover:bg-white/20 sm:hidden"
      >
        Sürət: {SPEEDS[speedIdx]}x
      </button>
    </div>
  )
}