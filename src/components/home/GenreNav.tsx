import { Link } from 'react-router-dom'
import { genres } from '../../data/home'

export function GenreNav() {
  return (
    <div className="border-t border-b border-gray-100 py-6 sm:py-8">
      <div className="max-w-[1480px] mx-auto px-4 flex justify-center flex-wrap gap-4 sm:gap-8">
        {genres.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-2 sm:gap-2.5 no-underline group">
            <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center bg-[#DDEEFF] transition-colors group-hover:bg-blue-100">
              <Icon width={24} height={24} aria-hidden="true" className="sm:w-8 sm:h-8" />
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-wider text-gray-500 text-center font-medium group-hover:text-gray-800 transition-colors max-w-[75px]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}