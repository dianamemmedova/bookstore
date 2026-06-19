import { useState, useCallback } from 'react'
import { PROMO_CODES } from '../data/promoCodes'
import { useAuth } from '../context/AuthContext'
import { hasUsedPromo, markPromoUsed } from '../utils/promoStorage'

interface AppliedPromo {
  code: string
  discount: number
}

export function usePromo() {
  const [promoInput,           setPromoInput]           = useState('')
  const [appliedPromo,         setAppliedPromo]         = useState<AppliedPromo | null>(null)
  const [promoError,           setPromoError]           = useState('')
  const [suggestionDismissed,  setSuggestionDismissed]  = useState(false)

  const { user } = useAuth()

  const applyPromo = useCallback((codeOverride?: string) => {
    const code = (codeOverride ?? promoInput).trim().toUpperCase()

    if (!code) {
      setPromoError('Promo kodu daxil edin')
      return
    }

    if (appliedPromo?.code === code) {
      setPromoError('Bu promo kodu artıq tətbiq edilib')
      return
    }

    const found = PROMO_CODES[code]
    if (!found) {
      setPromoError('Promo kodu etibarlı deyil')
      return
    }

    if (user && hasUsedPromo(user.email, code)) {
      setPromoError('Bu promo kodu artıq istifadə edilib')
      return
    }

    setAppliedPromo({ code, discount: found.discount })
    setPromoInput('')
    setPromoError('')
  }, [promoInput, appliedPromo, user])

  const removePromo = useCallback(() => {
    setAppliedPromo(null)
    setPromoInput('')
    setPromoError('')
  }, [])

  const confirmPromoUsed = useCallback(() => {
    if (user && appliedPromo) {
      markPromoUsed(user.email, appliedPromo.code)
    }
  }, [user, appliedPromo])

  return {
    promoInput,      setPromoInput,
    appliedPromo,
    promoError,      setPromoError,
    suggestionDismissed, setSuggestionDismissed,
    applyPromo,
    removePromo,
    confirmPromoUsed,
  }
}