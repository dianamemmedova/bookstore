import { Link, useNavigate } from 'react-router-dom'
import { AccountIcon, ChevronDownIcon, HeartIcon, LocationIcon } from '../../icons'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/useAuthModal'
import { useNavbar } from '../../hooks/useNavbar'
import { utilityLinks } from '../../data/navbar'

const utilCls = "flex items-center gap-1 text-[11px] font-normal uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap no-underline"

export default function UtilityBar() {
  const { user, logout } = useAuth()
  const { openLogin, openRegister, openProfile } = useAuthModal()
  const { accountOpen, setAccountOpen, accountRef } = useNavbar()
  const navigate = useNavigate()

  return (
    <div className="hidden lg:block border-b border-gray-100 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-2.5 flex items-center justify-between">

        <div className="flex items-center">
          {utilityLinks.map((item, i) => (
            <div key={item.to} className="flex items-center">
              {i !== 0 && <span className="mx-2.5 text-gray-300 select-none">|</span>}
              <Link to={item.to} className={utilCls}>
                {item.icon && <LocationIcon width={12} height={12} />}
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setAccountOpen(o => !o)}
              className="flex items-center gap-1 text-[11px] font-normal uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
            >
              <AccountIcon width={13} height={13} />
              {user ? user.firstName : 'Hesabım'}
              <ChevronDownIcon width={10} height={10} className={`transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded z-50 w-48 py-1">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { setAccountOpen(false); openProfile() }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profilim
                    </button>
                    <Link to="/orders" onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors no-underline">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Sifarişlərim
                    </Link>
                    <button onClick={() => { logout(); setAccountOpen(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors border-t border-gray-100 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Çıxış
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setAccountOpen(false); openLogin() }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Daxil ol
                    </button>
                    <button onClick={() => { setAccountOpen(false); openRegister() }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Hesab yarat
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <span className="mx-2.5 text-gray-300 select-none">|</span>
          <button onClick={() => { if (!user) openLogin(); else navigate('/wishlist') }}
            className={utilCls} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <HeartIcon width={13} height={13} /> Sevimlilər
          </button>
        </div>
      </div>
    </div>
  )
}