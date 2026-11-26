import { Link } from 'react-router-dom'

// Səhifə ortasındakı dəvət zolağı: sol və sağda kiçik kitab şəkilləri, ortada mətn və düymə
export default function PromoStrip({
  title, cta = 'KƏŞF ET', to = '/books', leftCovers = [], rightCovers = [],
}: {
  title: string
  cta?: string
  to?: string
  leftCovers?: string[]
  rightCovers?: string[]
}) {
  const covers = (list: string[]) => list.filter(Boolean).slice(0, 3)

  const Stack = ({ list, tilt }: { list: string[]; tilt: number }) => (
    <div className="hidden items-center sm:flex" aria-hidden="true">
      {covers(list).map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          className="-ml-3 h-20 w-14 rounded-sm border border-white/20 object-cover shadow-lg first:ml-0"
          style={{ transform: `rotate(${(i - 1) * tilt}deg)` }}
        />
      ))}
    </div>
  )

  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-md bg-primary-dark px-6 py-5 sm:mb-10">
      <Stack list={leftCovers} tilt={7} />
      <div className="min-w-0 flex-1 text-center">
        <h3 className="font-display text-lg font-bold leading-snug text-white">{title}</h3>
        <Link
          to={to}
          className="mt-3 inline-block rounded-sm bg-gold px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
        >
          {cta}
        </Link>
      </div>
      <Stack list={rightCovers} tilt={-7} />
    </div>
  )
}