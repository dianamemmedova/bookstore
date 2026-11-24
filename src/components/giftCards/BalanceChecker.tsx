import { useState } from 'react'
import { ApiError } from '../../lib/api'
import { checkGiftCardBalance } from '../../services/contactService'

export function BalanceChecker() {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const [result, setResult] = useState<'idle' | 'found' | 'notfound' | 'error'>('idle')
  const [balance, setBalance] = useState(0)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const digits = value.replace(/\D/g, '')
  const formatted = digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim()
  const isValid = digits.length === 16
  const showError = touched && !isValid && digits.length > 0
  const isEmpty = touched && digits.length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    setValue(raw)
    setResult('idle')
    if (!touched) setTouched(true)
  }

  const handleCheck = async () => {
    setTouched(true)
    if (!isValid || checking) return
    setChecking(true)
    try {
      const res = await checkGiftCardBalance(digits)
      setBalance(res.balance)
      setExpiresAt(res.expiresAt)
      setResult('found')
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) {
        setResult('notfound')
      } else {
        setErrorMsg(e instanceof ApiError ? e.message : 'Xəta baş verdi')
        setResult('error')
      }
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] px-8 py-8 mt-4 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c9a454]/10" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#c9a454]/10" />

      <div className="relative text-center">
        <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia,serif' }}>
          Kart Balansını Yoxla
        </h2>
        <p className="text-sm text-white/60 mb-5">Kartınızdakı mövcud balansı dərhal öyrənin</p>

        <div className="max-w-sm mx-auto">
          <div className="relative mb-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={formatted}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              className={`w-full text-sm outline-none px-4 py-3 rounded-xl bg-white/10 border text-white placeholder:text-white/30 transition-colors tracking-widest font-mono ${
                isEmpty || showError
                  ? 'border-red-400/70'
                  : isValid
                  ? 'border-green-400/70'
                  : 'border-white/20 focus:border-[#c9a454]/60'
              }`}
              maxLength={19}
            />
            {isValid && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-base">✓</span>}
            {showError && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-base">✗</span>}
          </div>

          {isEmpty && <p className="text-red-300 text-xs text-left mb-2 ml-1">Kart nömrəsini daxil edin</p>}
          {showError && <p className="text-red-300 text-xs text-left mb-2 ml-1">Kart nömrəsi 16 rəqəmdən ibarət olmalıdır ({digits.length}/16)</p>}
          {!showError && !isEmpty && digits.length > 0 && !isValid && (
            <p className="text-white/40 text-xs text-left mb-2 ml-1">{digits.length}/16 rəqəm</p>
          )}

          <button
            onClick={handleCheck}
            disabled={!isValid || checking}
            className={`w-full py-3 text-sm font-bold rounded-xl transition-all ${
              isValid ? 'bg-[#c9a454] text-[#1a2e3d] hover:opacity-90' : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {checking ? 'Yoxlanılır...' : 'Yoxla'}
          </button>

          {result === 'found' && (
            <div className="mt-4 bg-green-500/15 border border-green-400/30 rounded-xl px-4 py-3 text-left">
              <p className="text-green-300 text-sm font-semibold mb-1">✓ Kart tapıldı</p>
              <p className="text-white/70 text-xs">Mövcud balans:</p>
              <p className="text-white text-2xl font-bold mt-1">₼ {balance.toFixed(2)}</p>
              {expiresAt && (
                <p className="text-white/50 text-xs mt-1">
                  Etibarlıdır: {new Date(expiresAt).toLocaleDateString('en-GB').replace(/\//g, '.')}-dək
                </p>
              )}
            </div>
          )}
          {result === 'error' && (
            <div className="mt-4 bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-3 text-left">
              <p className="text-red-300 text-sm font-semibold">✗ Yoxlama alınmadı</p>
              <p className="text-white/50 text-xs mt-1">{errorMsg}</p>
            </div>
          )}
          {result === 'notfound' && (
            <div className="mt-4 bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-3 text-left">
              <p className="text-red-300 text-sm font-semibold">✗ Kart tapılmadı</p>
              <p className="text-white/50 text-xs mt-1">Kart nömrəsini yoxlayın və yenidən cəhd edin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}