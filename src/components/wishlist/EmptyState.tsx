import { PRIMARY, PRIMARY_DARK } from '../../constants/theme'
import { useAuthModal } from '../../context/useAuthModal'

export default function EmptyState() {
  const { openLogin } = useAuthModal()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3" >
          Sevimlilərim
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Sevimlilərinizi görmək üçün hesabınıza daxil olun.
        </p>
        <button onClick={openLogin}
          className="px-8 py-3 text-white text-sm font-medium transition-colors"
          style={{ background: PRIMARY }}
          onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
          onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}>
          Daxil ol
        </button>
      </div>
    </div>
  )
}