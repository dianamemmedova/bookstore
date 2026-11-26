import { features, stats, reviews } from '../data/mobilApp'
import PageHero from '../components/shared/PageHero'
import Icon from '../components/ui/Icon'

const APPLE_PATH = 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'

function StoreButtons({ dark = false }: { dark?: boolean }) {
  const base = 'inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-semibold transition-colors'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href="#" className={`${base} ${dark ? 'bg-white text-ink hover:bg-primary-container' : 'bg-primary text-white hover:bg-primary-dark'}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={APPLE_PATH} /></svg>
        App Store
      </a>
      <a href="#" className={`${base} border ${dark ? 'border-white/40 text-white hover:bg-white/10' : 'border-line-strong bg-white text-ink hover:bg-panel'}`}>
        <img src="google-play.png" alt="" className="h-4 w-4" />
        Google Play
      </a>
    </div>
  )
}

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Yeni — v2.0 mövcuddur"
        title="Kitab dünyası cibinizdə"
        subtitle="Book & Store tətbiqi ilə istənilən yerdən kitab axtar, sifariş ver, wishlist-ini idarə et və xüsusi təkliflərdən ilk xəbərdar ol."
      >
        <div className="pt-2"><StoreButtons dark /></div>
      </PageHero>

      <div className="mx-auto max-w-[1100px] px-4 py-6 lg:px-6">
        <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-md border border-line bg-white sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="py-4 text-center">
              <p className="tabular font-display text-2xl font-bold text-primary">{s.num}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="h-4 w-1 rounded-full bg-gold" /> Nə təklif edir?
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-md border border-line bg-white p-4 transition-colors hover:border-line-strong">
              <i className={`ti ${f.icon} mb-2 block text-2xl text-primary`} aria-hidden="true" />
              <h3 className="mb-1 text-sm font-semibold text-ink">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="h-4 w-1 rounded-full bg-gold" /> İstifadəçilər nə deyir
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-md border border-line bg-white p-4">
              <div className="mb-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} name="star" size={16} filled className={s <= r.stars ? 'text-gold' : 'text-line-strong'} />
                ))}
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted">{r.text}</p>
              <p className="text-xs font-medium text-ink">{r.author} <span className="text-muted">— {r.city}</span></p>
            </div>
          ))}
        </div>

        <div className="rounded-md bg-gold-container p-6 text-center sm:p-8">
          <h2 className="mb-1 font-display text-xl font-bold text-ink">Hər gün yeni bir kitab kəşf et</h2>
          <p className="mb-4 text-sm text-on-gold-container">Pulsuz yüklə, ilk sifarişdə 10% endirim qazan.</p>
          <div className="flex justify-center"><StoreButtons /></div>
        </div>
      </div>
    </div>
  )
}