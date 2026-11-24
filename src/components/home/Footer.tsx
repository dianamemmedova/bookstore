import { Link } from 'react-router-dom'
import { footerLinks } from '../../data/home'
import { SOCIAL_LINKS } from '../../data/socialLink'
import { useNewsletter } from '../../hooks/useNewsletter'

export function Footer() {
  const { email, setEmail, submitting, subscribed, error, submit } = useNewsletter()

  return (
    <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-3 sm:mb-4">{title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-xs sm:text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2">
            <div className="mb-6 sm:mb-8">
              <h4 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-3 sm:mb-4">Xəbərdar Olun</h4>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
                  placeholder="E-poçt ünvanınız"
                  className="flex-1 min-w-0 border border-gray-300 border-r-0 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500"
                />
                <button
                  onClick={submit}
                  disabled={submitting}
                  aria-label="Abunə ol"
                  className="flex-shrink-0 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 transition-colors disabled:opacity-60"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
              {subscribed && <p className="text-xs text-green-600 mt-2">✓ Abunəliyiniz qeydə alındı!</p>}
              {!error && !subscribed && (
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Yeni kitablar, endirim və kampaniyalardan ilk siz xəbərdar olun.
                </p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-3 sm:mb-4">Bizi İzləyin</h4>
              <div className="flex gap-2 sm:gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-900 hover:bg-gray-600 flex items-center justify-center transition-colors flex-shrink-0">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-5 gap-y-1">
            {[
              { label: 'İstifadə Şərtləri', to: '/terms' },
              { label: 'Məxfilik Siyasəti', to: '/privacy' },
              { label: 'Cookie Siyasəti',   to: '/cookies' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} BOOK & STORE. Sizin kitab mağazanız.
          </p>
        </div>
      </div>
    </footer>
  )
}