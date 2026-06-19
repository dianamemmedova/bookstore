import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/useAuthModal'
import { categories, utilityLinks } from '../../data/navbar'
import { PRIMARY } from '../../constants/theme'

interface Props {
  onClose: () => void
}

export default function MobileMenu({ onClose }: Props) {
  const { user, logout } = useAuth()
  const { openLogin, openRegister, openProfile } = useAuthModal()
  const navigate = useNavigate()

  const go = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <div className="lg:hidden fixed inset-0 z-[60] bg-white overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-lg font-bold text-gray-900">Menyu</span>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center text-gray-700" aria-label="Bağla">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {user ? (
        <div className="px-4 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      ) : (
        <div className="px-4 py-4 border-b border-gray-100 flex gap-3">
          <button
            onClick={() => { onClose(); openLogin() }}
            className="flex-1 py-2.5 text-sm font-semibold text-white rounded-lg"
            style={{ background: PRIMARY }}>
            Daxil ol
          </button>
          <button
            onClick={() => { onClose(); openRegister() }}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg">
            Qeydiyyat
          </button>
        </div>
      )}

      <div className="px-2 py-3">
        <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Kateqoriyalar</p>
        {categories.map(cat => (
          <button
            key={cat.to}
            onClick={() => go(cat.to)}
            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-2 py-3 border-t border-gray-100">
        <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Hesab</p>
        {user && (
          <>
            <button onClick={() => { onClose(); openProfile() }}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Profilim
            </button>
            <button onClick={() => go('/orders')}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Sifarişlərim
            </button>
          </>
        )}
        <button onClick={() => go('/wishlist')}
          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
          Sevimlilər
        </button>
        {user && (
          <button onClick={() => { logout(); onClose() }}
            className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg">
            Çıxış
          </button>
        )}
      </div>

      <div className="px-2 py-3 border-t border-gray-100">
        <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Digər</p>
        {utilityLinks.map(item => (
          <button
            key={item.to}
            onClick={() => go(item.to)}
            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            {item.label}
          </button>
        ))}
        <Link to="/contact" onClick={onClose}
          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg no-underline">
          Əlaqə
        </Link>
      </div>
    </div>
  )
}