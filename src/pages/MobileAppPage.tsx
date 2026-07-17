import { PRIMARY, ACCENT, BACKGROUND_LIGHT, GREEN_DARK, LIGHT_GREEN_BG, STAR_EMPTY } from '../constants/theme'
import { features, stats, reviews } from '../data/mobilApp'

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4" style={{ background: BACKGROUND_LIGHT, color: PRIMARY }}>
            Yeni — v2.0 mövcuddur
          </span>
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Kitab dünyası cibinizdə
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Book & Store tətbiqi ilə istənilən yerdən kitab axtar, sifariş ver,
            wishlist-ini idarə et və xüsusi təkliflərdən ilk xəbərdar ol.
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 sm:w-7 sm:h-7">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <span className="block text-[10px] sm:text-xs text-gray-400">Download on the</span>
                <span className="block text-xs sm:text-sm font-semibold text-gray-900">App Store</span>
              </div>
            </a>

            <a href="#" className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
             <img src="google-play.png" alt="Google Play" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
          <div className="text-left">
            <span className="block text-[10px] sm:text-xs text-gray-400">Get it on</span>
            <span className="block text-xs sm:text-sm font-semibold text-gray-900">Google Play</span>
          </div>
        </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden bg-white mb-8 sm:mb-10">
          {stats.map((s) => (
            <div  key={s.label}  className="text-center py-4 sm:py-5">
              <p className="text-xl sm:text-2xl font-semibold" style={{ color: PRIMARY }}>{s.num}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">
          Nə təklif edir?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-10">
          {features.map(f => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-sm transition-shadow">
              <i className={`ti ${f.icon} text-2xl mb-3 block`} style={{ color: PRIMARY }} aria-hidden="true" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">
          İstifadəçilər nə deyir
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} style={{ color: s <= r.stars ? ACCENT : STAR_EMPTY, fontSize: 14 }}>★</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{r.text}</p>
              <p className="text-xs font-medium text-gray-400">{r.author} — {r.city}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: LIGHT_GREEN_BG }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Hər gün yeni bir kitab kəşf et
          </h2>
          <p className="text-sm text-gray-500 mb-5 sm:mb-6">
            Pulsuz yüklə, ilk sifarişdə 10% endirim qazan.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-sm font-medium transition-colors"
              style={{ background: PRIMARY }}
              onMouseEnter={e => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
          <a  
              href="#"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              style={{ color: PRIMARY }}
            >
              Google Play
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}