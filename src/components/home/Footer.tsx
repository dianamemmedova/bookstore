import { Link } from 'react-router-dom'
import { footerLinks } from '../../data/home'
import { SOCIAL_LINKS } from '../../data/socialLink'
import { useNewsletter } from '../../hooks/useNewsletter'
import Icon from '../ui/Icon'

export function Footer() {
  const { email, setEmail, submitting, subscribed, error, submit } = useNewsletter()

  return (
    <footer className="mt-10 bg-primary-dark text-white">
      <div className="mx-auto max-w-[1480px] px-4 py-10 lg:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-6">

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[13px] text-primary-container/80 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2">
            <div className="mb-6">
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light">Xəbərdar Olun</h4>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
                  placeholder="E-poçt ünvanınız"
                  className="min-w-0 flex-1 rounded-l-sm border border-primary bg-primary/40 px-3 py-2 text-sm text-white placeholder-primary-container/50 outline-none focus:border-gold"
                />
                <button
                  onClick={submit}
                  disabled={submitting}
                  aria-label="Abunə ol"
                  className="flex-shrink-0 rounded-r-sm bg-gold px-3 py-2 text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
                >
                  <Icon name="arrow_forward" size={18} />
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
              {subscribed && <p className="mt-2 text-xs text-green-300">✓ Abunəliyiniz qeydə alındı!</p>}
              {!error && !subscribed && (
                <p className="mt-2 text-xs leading-relaxed text-primary-container/70">
                  Yeni kitablar, endirim və kampaniyalardan ilk siz xəbərdar olun.
                </p>
              )}
            </div>

            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light">Bizi İzləyin</h4>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary transition-colors hover:bg-gold hover:text-ink"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:text-left lg:px-6">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:justify-start">
            {[
              { label: 'İstifadə Şərtləri', to: '/terms' },
              { label: 'Məxfilik Siyasəti', to: '/privacy' },
              { label: 'Cookie Siyasəti', to: '/cookies' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-primary-container/70 transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-primary-container/70">
            © {new Date().getFullYear()} BOOK & STORE. Sizin kitab mağazanız.
          </p>
        </div>
      </div>
    </footer>
  )
}