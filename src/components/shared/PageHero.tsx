import type { ReactNode } from 'react'

export interface HeroStat {
  value: string | number
  label: string
}

type Tone = 'primary' | 'sale'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  stats?: HeroStat[]
  tone?: Tone
  covers?: string[] // sağda üst-üstə düzülən kitab şəkilləri (ən çox 3)
  children?: ReactNode
}

const TONES: Record<Tone, { bg: string; border: string; accent: string; glow: string }> = {
  primary: { bg: '#f6efe1', border: '#e9dcc0', accent: '#a08c5b', glow: '#c9a454' },
  sale:    { bg: '#fbece8', border: '#f1cfc7', accent: '#b4343f', glow: '#f87171' },
}

const COVER_POS = [
  { left: 0,   rotate: -8, z: 1, top: 14 },
  { left: 70,  rotate: 0,  z: 3, top: 0 },
  { left: 140, rotate: 8,  z: 2, top: 14 },
]

// Bütün siyahı səhifələri üçün ortaq başlıq: isti krem fon, sağda kitab şəkilləri
export default function PageHero({ eyebrow, title, subtitle, stats, tone = 'primary', covers, children }: Props) {
  const t = TONES[tone]
  const shown = (covers ?? []).filter(Boolean).slice(0, 3)

  return (
    <header
      className="relative overflow-hidden rounded-3xl border px-6 py-7 sm:px-10 sm:py-9"
      style={{ background: t.bg, borderColor: t.border }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full opacity-[0.14]" style={{ background: t.glow }} />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-40 h-40 w-40 rounded-full border-[14px] opacity-[0.18]" style={{ borderColor: t.glow }} />

      <div className="relative flex items-center justify-between gap-8">
        <div className="min-w-0 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: t.accent }}>
              <span className="h-px w-8" style={{ background: t.accent }} />
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1f2a33] sm:text-[40px]">{title}</h1>
          {subtitle && <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">{subtitle}</p>}

          {stats && stats.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-y-3">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col pr-6 ${i > 0 ? 'border-l pl-6' : ''}`} style={i > 0 ? { borderColor: t.border } : undefined}>
                  <dt className="order-2 mt-1.5 text-[11px] uppercase tracking-wide text-gray-500">{s.label}</dt>
                  <dd className="order-1 text-2xl font-bold leading-none tabular-nums text-[#1f2a33]">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {children && <div className="mt-5">{children}</div>}
        </div>

        {shown.length > 0 && (
          <div className="relative hidden h-40 w-60 flex-shrink-0 md:block" aria-hidden="true">
            {shown.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className="absolute h-36 w-24 rounded-md object-cover shadow-xl ring-1 ring-black/10"
                style={{
                  left: COVER_POS[i].left + 20,
                  top: COVER_POS[i].top,
                  zIndex: COVER_POS[i].z,
                  transform: `rotate(${COVER_POS[i].rotate}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  )
}