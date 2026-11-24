import { useState, useCallback, useEffect } from 'react'
import { api, ApiError } from '../lib/api'
import { SUGGESTED_CODE } from '../data/promoCodes'

interface AppliedPromo {
  code: string
  discount: number // 0.20 = 20%
}

interface ValidateResponse {
  code: string
  description: string | null
  discountPercent: number
}

// Promo kodu serverdə yoxlanılır: mövcuddur, aktivdir, müddəti bitməyib, bu istifadəçi işlətməyib.
// Endirim burada yalnız göstərmək üçündür; sifarişdə server özü yenidən hesablayır.
export function usePromo() {
  const [promoInput,           setPromoInput]           = useState('')
  const [appliedPromo,         setAppliedPromo]         = useState<AppliedPromo | null>(null)
  const [promoError,           setPromoError]           = useState('')
  const [suggestionDismissed,  setSuggestionDismissed]  = useState(false)
  const [applying,             setApplying]             = useState(false)
  // Təklif bannerı yalnız həmin kod bazada həqiqətən işləyirsə göstərilir
  const [suggestionAvailable,  setSuggestionAvailable]  = useState(false)

  useEffect(() => {
    let cancelled = false
    api('/promo/validate', { method: 'POST', body: { code: SUGGESTED_CODE } })
      .then(() => { if (!cancelled) setSuggestionAvailable(true) })
      .catch(() => { if (!cancelled) setSuggestionAvailable(false) })
    return () => { cancelled = true }
  }, [])

  const applyPromo = useCallback(async (codeOverride?: string) => {
    const code = (codeOverride ?? promoInput).trim().toUpperCase()

    if (!code) {
      setPromoError('Promo kodu daxil edin')
      return
    }

    if (appliedPromo?.code === code) {
      setPromoError('Bu promo kodu artıq tətbiq edilib')
      return
    }

    setApplying(true)
    try {
      const res = await api<ValidateResponse>('/promo/validate', { method: 'POST', body: { code } })
      setAppliedPromo({ code: res.code, discount: res.discountPercent / 100 })
      setPromoInput('')
      setPromoError('')
    } catch (e) {
      setPromoError(e instanceof ApiError ? e.message : 'Promo kodu yoxlanmadı')
    } finally {
      setApplying(false)
    }
  }, [promoInput, appliedPromo])

  const removePromo = useCallback(() => {
    setAppliedPromo(null)
    setPromoInput('')
    setPromoError('')
  }, [])

  // Sifariş yaradılanda server promo istifadəsini özü qeyd edir. Köhnə checkout kodu üçün boş funksiya qalır.
  const confirmPromoUsed = useCallback(() => {}, [])

  return {
    promoInput,      setPromoInput,
    appliedPromo,
    promoError,      setPromoError,
    suggestionDismissed, setSuggestionDismissed,
    suggestionAvailable,
    applying,
    applyPromo,
    removePromo,
    confirmPromoUsed,
  }
}