import { useState } from 'react'
import type { InputProps } from '../../types/ui'

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error: externalError,
  fullWidth = true,
  required = false,
  minLength,
  maxLength,
  pattern,
  patternMessage,
  disabled = false,
  rows = 3,
  textarea = false,
  children,
}: InputProps) {
  const [internalError, setInternalError] = useState<string>('')

  const validate = (val: string) => {
    if (required && !val.trim()) {
      setInternalError(`${label || 'Bu sahə'} tələb olunur`)
      return false
    }
    if (minLength && val.trim().length < minLength) {
      setInternalError(`${label || 'Bu sahə'} minimum ${minLength} simvol olmalıdır`)
      return false
    }
    if (maxLength && val.trim().length > maxLength) {
      setInternalError(`${label || 'Bu sahə'} maksimum ${maxLength} simvol ola bilər`)
      return false
    }
    if (pattern && val.trim() && !pattern.test(val.trim())) {
      setInternalError(patternMessage || `${label || 'Bu sahə'} düzgün formatda deyil`)
      return false
    }
    setInternalError('')
    return true
  }

  const handleChange = (val: string) => {
    onChange(val)
    if (!disabled) validate(val)
  }

  const displayError = externalError || internalError

  const baseClass = `px-4 py-3 rounded-xl border text-sm w-full outline-none transition-all duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400
    ${displayError
      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200'
      : 'border-gray-200 focus:border-[#3d5a6b] focus:ring-1 focus:ring-[#3d5a6b]/20'
    }`

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500 text-xs">*</span>}
        </label>
      )}
      
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClass}
        />
      )}

       {children && <div className="absolute right-3 top-1/2 -translate-y-1/2">{children}</div>}
      
      {displayError && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {displayError}
        </p>
      )}
    </div>
  )
}