import type { ReactNode } from 'react'

export interface HeroStat {
  value: string | number
  label: string
  tone?: 'default' | 'sale'
}

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  stats?: HeroStat[]
  covers?: string[] // sağda üst-üstə düzülən kitab şəkilləri (ən çox 3)
  children?: ReactNode
}

// Stitch dizaynı: tünd göy-mavi banner, qızılı eyebrow, çiplər, sağda əyilmiş kitab şəkilləri
const COVERS = [
  { size: 'w-16 sm:w-20', style: 'z-0 -rotate-6 border-white/20' },
  { size: 'w-20 sm:w-24', style: 'z-10 rotate-2 -ml-4 border-gold' },
  { size: 'w-16 sm:w-20', style: 'z-0 rotate-12 -ml-4 border-white/20' },
]

export default function PageHero({ eyebrow, title, subtitle, stats, covers = [], children }: Props) {
  const list = covers.filter(Boolean).slice(0, 3)

  return (
    <section className="overflow-hidden border-b border-primary bg-primary-dark text-white">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-6 lg:px-6">
        <div className="flex min-w-0 flex-col gap-2">
          {eyebrow && <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light">{eyebrow}</span>}
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[28px]">{title}</h1>
          {subtitle && <p className="max-w-lg text-xs text-primary-container sm:text-sm">{subtitle}</p>}

          {stats && stats.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className={`tabular rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
                    s.tone === 'sale' ? 'bg-sale' : 'bg-primary'
                  }`}
                >
                  {s.value} {s.label}
                </span>
              ))}
            </div>
          )}
          {children}
        </div>

        {list.length > 0 && (
          <div className="hidden flex-shrink-0 items-center pr-4 md:flex" aria-hidden="true">
            {list.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className={`aspect-[3/4] rounded-sm border object-cover shadow-xl ${COVERS[i].size} ${COVERS[i].style}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}