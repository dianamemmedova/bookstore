import { Link } from 'react-router-dom'
import { PRIMARY } from '../../constants/theme'

interface Props {
  variant: 'no-auth' | 'no-orders'
}

const CONFIG = {
  'no-auth': {
    icon: (
      <svg className="w-8 h-8" style={{ color: PRIMARY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Giriş tələb olunur',
    description: 'Sifarişlərinizi görmək üçün daxil olun.',
    buttonText: 'Ana səhifəyə qayıt',
    buttonTo: '/',
    fullScreen: true,
  },
  'no-orders': {
    icon: (
      <svg className="w-8 h-8" style={{ color: PRIMARY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Sifarişiniz yoxdur',
    description: 'İlk sifarişinizi verin və burada görünəcək.',
    buttonText: 'Alışverişə başla',
    buttonTo: '/books',
    fullScreen: false,
  },
}

export default function EmptyOrdersState({ variant }: Props) {
  const c = CONFIG[variant]

  if (c.fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center bg-[#eef2f5]">
            {c.icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.title}</h2>
          <p className="text-sm text-gray-400 mb-6">{c.description}</p>
          <Link to={c.buttonTo} className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-md"
            style={{ background: PRIMARY }}>
            {c.buttonText}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center bg-[#eef2f5]">
        {c.icon}
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{c.title}</h2>
      <p className="text-sm text-gray-400 mb-6">{c.description}</p>
      <Link to={c.buttonTo} className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-md"
        style={{ background: PRIMARY }}>
        {c.buttonText}
      </Link>
    </div>
  )
}