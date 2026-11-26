import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const CONFIG = {
  'no-auth': {
    icon: 'person',
    title: 'Giriş tələb olunur',
    description: 'Sifarişlərinizi görmək üçün daxil olun.',
    buttonText: 'Ana səhifəyə qayıt',
    buttonTo: '/',
    fullScreen: true,
  },
  'no-orders': {
    icon: 'inventory_2',
    title: 'Sifarişiniz yoxdur',
    description: 'İlk sifarişinizi verin və burada görünəcək.',
    buttonText: 'Alışverişə başla',
    buttonTo: '/books',
    fullScreen: false,
  },
}

export default function EmptyOrdersState({ variant }: { variant: 'no-auth' | 'no-orders' }) {
  const c = CONFIG[variant]

  const card = (
    <div className="mx-auto max-w-sm rounded-md border border-line bg-white px-8 py-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-primary">
        <Icon name={c.icon} size={32} />
      </div>
      <h2 className="mb-1.5 font-display text-xl font-bold text-ink">{c.title}</h2>
      <p className="mb-6 text-sm text-muted">{c.description}</p>
      <Link to={c.buttonTo} className="inline-block rounded-sm bg-primary px-6 py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-primary-dark">
        {c.buttonText.toUpperCase()}
      </Link>
    </div>
  )

  if (c.fullScreen) {
    return <div className="flex min-h-[60vh] items-center justify-center bg-surface px-4">{card}</div>
  }
  return card
}