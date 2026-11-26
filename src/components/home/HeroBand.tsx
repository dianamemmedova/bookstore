import { Link } from 'react-router-dom'
import { fetchTrending } from '../../services/bookService'
import { useBooks } from '../../hooks/useBooks'

// Stitch ana səhifə banneri: sol tərəfdə başlıq və düymələr, sağda əyilmiş kitab şəkilləri
const SLOTS = [
  'w-28 sm:w-36 -rotate-12 translate-y-4 border-white/20 z-0',
  'w-32 sm:w-40 -rotate-6 translate-y-1 -ml-8 border-white/20 z-10',
  'w-36 sm:w-44 rotate-3 -translate-y-2 -ml-8 border-2 border-gold z-20',
  'hidden w-28 sm:block sm:w-36 rotate-12 translate-y-5 -ml-8 border-white/20 z-10',
]

export function HeroBand() {
  const { books } = useBooks(() => fetchTrending(12), [])
  const covers = books.filter((b) => b.coverUrl).slice(0, 4)

  return (
    <section className="overflow-hidden border-b border-primary bg-primary-dark text-white">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-8 px-4 py-10 lg:grid-cols-12 lg:px-6 lg:py-14">
        <div className="flex flex-col items-start gap-4 lg:col-span-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">Payız — Qış seçimi • 2026</span>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
            Növbəti sevimli kitabınızı tapın
          </h1>
          <p className="max-w-prose text-sm leading-relaxed text-primary-container sm:text-base">
            Yerli və dünya ədəbiyyatının seçilmiş nəşrləri, səsli kitablar və müstəqil kitabxana tövsiyələri — hamısı bir ünvanda.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/books" className="rounded-sm bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light">
              Kitablara bax
            </Link>
            <Link to="/clearance" className="rounded-sm border border-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary">
              Endirimlər
            </Link>
          </div>
        </div>

        <div className="flex h-64 items-center justify-center sm:h-80 lg:col-span-6 lg:justify-end" aria-hidden={covers.length === 0}>
          {covers.map((b, i) => (
            <Link
              key={b.id}
              to={`/books/${b.id}`}
              className={`relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-sm border shadow-2xl transition-transform duration-200 hover:-translate-y-3 ${SLOTS[i]}`}
            >
              <img src={b.coverUrl ?? ''} alt={b.title} className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}