export interface FieldRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: { regex: RegExp; message: string }
  custom?: (val: string, allValues?: Record<string, string>) => string | null
}

export type Rules = Record<string, FieldRules>

export function validate<T extends Record<string, string>>(
  values: T,
  rules: Rules
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [field, rule] of Object.entries(rules)) {
    const val = values[field]?.trim() ?? ''

    if (rule.required && !val) {
      errors[field] = 'Bu alan məcburidir.'
      continue
    }
    if (rule.minLength && val.length < rule.minLength) {
      errors[field] = `Minimum ${rule.minLength} simvol olmalıdır.`
      continue
    }
    if (rule.maxLength && val.length > rule.maxLength) {
      errors[field] = `Maksimum ${rule.maxLength} simvol ola bilər.`
      continue
    }
    if (rule.pattern && !rule.pattern.regex.test(val)) {
      errors[field] = rule.pattern.message
      continue
    }
    if (rule.custom) {
      const msg = rule.custom(val, values)
      if (msg) { errors[field] = msg; continue }
    }
  }

  return errors
}


export const registerRules: Rules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: { regex: /^[a-zA-ZığüşöçƏəİıĞÜŞÖÇ\s-]+$/, message: 'Yalnız hərf istifadə edin.' },
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: { regex: /^[a-zA-ZığüşöçƏəİıĞÜŞÖÇ\s-]+$/, message: 'Yalnız hərf istifadə edin.' },
  },
  email: {
    required: true,
    minLength: 5,
    pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Düzgün email formatı daxil edin.' },
  },
  password: {
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    required: true,
    custom: (val, all) =>
      val !== all?.password ? 'Şifrələr uyğun gəlmir.' : null,
  },
}
  export const checkoutRules: Rules = {
  fullName: { required: true, minLength: 3, maxLength: 50 },
  phone: { 
    required: true, 
     pattern: { regex: /^[+]?[\d\s\-()]{7,15}$/, message: 'Düzgün telefon nömrəsi daxil edin' }
  },
  city: { required: true },
  street: { required: true },
  building: {}, // isteğe bağlı
  apartment: {},
 cardNumber: {
  required: true,
  custom: (val) => {
    const digits = val.replace(/\s/g, '')
    if (!/^\d{16}$/.test(digits)) return 'Kart nömrəsi 16 rəqəm olmalıdır'
    return null
  }
},
 cardExpiry: {
  required: true,
  pattern: { regex: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'MM/İİ formatında daxil edin (03/28)' },
  custom: (val) => {
    if (!val || !val.includes('/')) return null
    const [mm, yy] = val.split('/')
    if (!mm || !yy) return null
    const now = new Date()
    const expYear = 2000 + parseInt(yy)
    const expMonth = parseInt(mm) - 1
    if (
      expYear < now.getFullYear() ||
      (expYear === now.getFullYear() && expMonth < now.getMonth())
    ) return 'Kartın müddəti bitib'
    return null
  }
},
  cardCvv: { 
    required: true, 
    pattern: { regex: /^\d{3}$/, message: 'CVV 3 rəqəm olmalıdır' } 
  },
  cardHolder: { 
    required: true, 
    minLength: 3, 
    pattern: { regex: /^[A-Z\s]+$/, message: 'Yalnız böyük hərflər və boşluq' } 
  },

  }

  export const signInRules: Rules = {
  email: {
    required: true,
    pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Düzgün email daxil edin.' },
  },
  password: {
    required: true,
  },
}

export const contactRules: Rules = {
  name: { required: true, minLength: 2, maxLength: 100 },
  email: {
    required: true,
    pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email formatı düzgün deyil.' },
  },
  subject: { required: true },
  message: { required: true, minLength: 10 },
}


export const giftCardBalanceRules: Rules = {
  cardNumber: {
    required: true,
    custom: (val) => {
      const digits = val.replace(/\s/g, '')
      if (!/^\d{16}$/.test(digits)) return 'Kart nömrəsi 16 rəqəmdən ibarət olmalıdır'
      return null
    }
  }
}