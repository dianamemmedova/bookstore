import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/useAuthModal'
import { GREEN_STRONG, PRIMARY, RED_TEXT, DARK_BLUE } from '../../constants/theme'

export default function ProfileModal() {
  const { profileOpen, closeAll } = useAuthModal()
  const { user, logout } = useAuth()

  if (!profileOpen || !user) return null

  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
  const d = new Date(user.createdAt)
  const joinDate = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`

  const handleLogout = () => {
    logout()
    closeAll()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={closeAll}
    >
      <div className="bg-white w-full max-w-[520px] overflow-hidden rounded-2xl sm:rounded-[20px]"
        onClick={e => e.stopPropagation()}
      >

        <div className="relative px-5 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center"
          style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK_BLUE} 100%)` }}>
          <button onClick={closeAll}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
            ✕
          </button>

          <div className="relative inline-flex mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white mx-auto"
              style={{ background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)' }}
            >
              {initials}
            </div>
            <span
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white"
              style={{ background: GREEN_STRONG }}
            />
          </div>

          <h2 className="text-white font-bold text-lg sm:text-xl mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-white/60 text-sm">{user.email}</p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="text-yellow-300 text-xs">★</span>
            <span className="text-white/70 text-xs uppercase tracking-widest">Rewards</span>
            <span className="text-white font-bold text-xs">0 bal</span>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3">
          <InfoRow icon={<UserIcon />} label="Ad Soyad" value={`${user.firstName} ${user.lastName}`} />
          <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
          <InfoRow icon={<CalendarIcon />} label="Qeydiyyat tarixi" value={joinDate} />
        </div>

        <div className="h-px bg-gray-100 mx-4 sm:mx-6" />

        <div className="px-4 sm:px-6 py-4 sm:py-5 flex gap-3">
          <button onClick={closeAll}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors rounded-xl">
            Bağla
          </button>
          <button onClick={handleLogout}
            className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: RED_TEXT }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıxış
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50">
      <span style={{ color: PRIMARY }}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  )
}

function UserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}