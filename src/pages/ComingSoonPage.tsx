import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-4">
      <div className="max-w-sm rounded-md border border-line bg-white px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-container text-muted-gold-text">
          <Icon name="schedule" size={32} />
        </div>
        <h1 className="mb-1.5 font-display text-xl font-bold text-ink">{title}</h1>
        <p className="mb-6 text-sm text-muted">Bu bölmə tezliklə hazır olacaq.</p>
        <Link to="/books" className="inline-block rounded-sm bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark">
          Kitablara bax
        </Link>
      </div>
    </div>
  )
}