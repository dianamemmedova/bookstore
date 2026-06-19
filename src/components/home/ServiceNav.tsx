import { Link } from 'react-router-dom'
import { services } from '../../data/home'

export function ServiceNav() {
  return (
    <div className="border-t border-b border-gray-100 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-center flex-wrap gap-x-6 sm:gap-x-10 gap-y-6 sm:gap-y-8">
        {services.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-2 sm:gap-3 no-underline group min-w-[70px] sm:min-w-[80px]">
            <div className="text-gray-900 group-hover:text-gray-500 transition-colors">
              <Icon width={28} height={28} aria-hidden="true" className="sm:w-9 sm:h-9" />
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-gray-500 text-center font-medium group-hover:text-gray-800 transition-colors">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}