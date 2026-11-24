import { useNewsletter } from '../../hooks/useNewsletter'

export default function NewsletterCard() {
  const { email, setEmail, submitting, subscribed, error, submit } = useNewsletter()

  return (
    <div className="bg-gradient-to-r from-[#3d5a6b] to-[#2e4455] rounded-lg p-5 text-white">
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Xəbər bülleteni
      </h3>
      {subscribed ? (
        <div className="mt-1">
          <p className="text-xs text-green-300 mb-1">✓ Abunəliyiniz qeydə alındı!</p>
          <p className="text-xs text-white/60">Yeni kitablar və endirimlər haqqında bildirişləri e-poçtunuza göndərəcəyik. 📬</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-white/80 mb-3">Yeni kitablar və endirimlərdən xəbərdar olun</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit() }}
              placeholder="Email ünvanı"
              className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/20 focus:border-white/40"
            />
            <button
              onClick={submit}
              disabled={submitting}
              className="bg-[#c9a454] hover:bg-[#b8943a] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-60"
            >
              {submitting ? '...' : 'Abunə'}
            </button>
          </div>
          {error && <p className="text-xs text-red-300 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}