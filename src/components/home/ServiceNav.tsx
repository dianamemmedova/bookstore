import { Link } from 'react-router-dom'
import { services } from '../../data/home'

export function ServiceNav() {
  return (
    <section className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {services.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col items-center gap-2 rounded-md border border-line bg-white px-2 py-4 text-center transition-colors hover:border-primary"
          >
            <span className="text-primary">
              <Icon width={26} height={26} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors group-hover:text-ink">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}