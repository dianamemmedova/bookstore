import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon, CartIcon } from '../../icons'
import { useCart } from '../../context/CartContext'
import { PRIMARY, PRIMARY_DARK, ACCENT } from '../../constants/theme'

interface Props {
  onMenuToggle: () => void
  menuOpen: boolean
}

export default function MainBar({ onMenuToggle, menuOpen }: Props) {
  const [search, setSearch] = useState('')
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/books?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-6">

      <button
        onClick={onMenuToggle}
        className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-700"
        aria-label="Menyu"
      >
        {menuOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <Link to="/" className="text-lg sm:text-[26px] font-bold tracking-tight text-gray-900 no-underline whitespace-nowrap flex-shrink-0">
        BOOK <span style={{ color: ACCENT }}>&</span> STORE
      </Link>

      <form onSubmit={handleSearch} className="hidden sm:flex flex-1">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Başlıq, müəllif, ISBN ilə axtar..."
          className="flex-1 border border-gray-300 border-r-0 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-500 rounded-l min-w-0"
        />
        <button type="submit"
          className="flex items-center justify-center px-5 py-2.5 text-white rounded-r transition-colors"
          style={{ background: PRIMARY }}
          onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
          onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}>
          <SearchIcon width={16} height={16} />
        </button>
      </form>

      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 ml-auto sm:ml-0">
        <button
          className="sm:hidden w-8 h-8 flex items-center justify-center text-gray-700"
          aria-label="Axtarış"
        >
          <SearchIcon width={20} height={20} />
        </button>

        <Link to="/contact"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap no-underline hidden md:block">
          Əlaqə
        </Link>
        <Link to="/cart"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors no-underline">
          <span className="relative">
            <CartIcon width={22} height={22} className="sm:w-[26px] sm:h-[26px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-white text-[10px] w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold" style={{ background: ACCENT }}>
                {totalItems}
              </span>
            )}
          </span>
          <span className="hidden md:block">Səbət</span>
        </Link>
      </div>
    </div>
  )
}