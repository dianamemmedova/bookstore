import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import { useAuth } from '../../context/AuthContext'
import { ApiError } from '../../lib/api'
import { validate, registerRules } from '../../hooks/useFormValidation'
import { ToastContainer } from '../ui/ToastContainer'
import PasswordStrength from '../ui/PasswordStrength'
import { PRIMARY, PRIMARY_DARK, TEAL_GRADIENT_START, TEAL_GRADIENT_END } from '../../constants/theme'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

const INITIAL = {
  firstName: '', lastName: '', email: '',
  password: '', confirmPassword: '',
}

function Field({ label, type = 'text', value, onChange, error, children }: {
  label: string; name: string; type?: string
  value: string; onChange: (v: string) => void
  error?: string; children?: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <div className={`relative border rounded-xl px-3 pt-4 pb-2 transition-all duration-200
        ${error ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus-within:border-[#3d5a6b] focus-within:shadow-sm'}`}>
        <label className="absolute top-1 left-3 text-xs text-gray-400">{label}</label>
        <div className="flex items-center pt-1">
          <input
            type={type} value={value}
            onChange={e => onChange(e.target.value)}
            className="flex-1 text-sm text-gray-900 outline-none bg-transparent"
          />
          {children}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  )
}

function SuccessView({ firstName, lastName, email, onClose }: {
  firstName: string; lastName: string; email: string; onClose: () => void
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8 sm:py-12 text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 shadow-inner">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
        Hesabınız yaradıldı!
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Xoş gəldiniz, <strong>{firstName} {lastName}</strong>!<br />
        <span className="text-gray-400">{email}</span>
      </p>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-4 sm:p-5 w-full max-w-xs mb-6 text-left shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#3d5a6b] to-[#2e4455] flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-sm">
            {firstName[0]}{lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{firstName} {lastName}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500 mb-1">Rewards balansı</p>
          <p className="text-xl font-bold text-[#3d5a6b]">0 <span className="text-sm font-normal text-gray-400">bal</span></p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="px-8 py-3 text-sm font-bold tracking-wider text-white rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        style={{ background: PRIMARY }}
        onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
        onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
      >
        BAŞLA
      </button>
    </div>
  )
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: Props) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [promo, setPromo] = useState(false)
  const [success, setSuccess] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const toast = useToast()
  const { register } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const set = (field: string) => (val: string) => {
    setValues(v => ({ ...v, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const handleSubmit = async () => {
    if (submitting) return
    const errs = validate(values, registerRules)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      toast.error('Zəhmət olmasa bütün xanaları düzgün doldurun.')
      return
    }
    setSubmitting(true)
    try {
      await register({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
        marketingOptIn: promo,
      })
      setSuccess(true)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          setErrors({ email: 'Bu email artıq qeydiyyatdan keçib.' })
        } else if (error.status === 400) {
          // Backend-in sahə xətaları: { email: '...', password: '...' }
          setErrors(error.fieldErrors())
        } else if (error.status === 429) {
          toast.error('Çox sayda cəhd oldu. Bir az sonra yenidən cəhd edin.')
        } else {
          toast.error(error.message)
        }
      } else {
        toast.error('Xəta baş verdi. Yenidən cəhd edin.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return <ToastContainer toasts={toast.toasts} />

  return (
    <>
      <ToastContainer toasts={toast.toasts} />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl w-full flex overflow-hidden shadow-2xl max-w-[800px] max-h-[92vh] sm:max-h-[90vh]" onClick={e => e.stopPropagation()}>

          <div className="hidden md:flex flex-col items-center justify-center text-white text-center px-8 py-10 flex-shrink-0 w-[280px]"
            style={{ background: `linear-gradient(145deg, ${TEAL_GRADIENT_START} 0%, ${TEAL_GRADIENT_END} 100%)` }}>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold italic">R</span>
            </div>
            <p className="text-2xl font-bold italic mb-4">Rewards</p>
            <h3 className="text-lg font-bold mb-3 leading-snug">Hər alış-verişdə bal yığın</h3>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Rewards ilə nə qədər çox xərcləsəniz, bir o qədər çox bal qazanırsınız.
            </p>
            <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center mb-4 text-2xl font-bold">&</div>
            <p className="text-sm text-white/80 mb-1">Hər ₼10 xərcləməyə 1 bal</p>
            <p className="text-sm font-bold mb-6">10 bal = ₼5 endirim</p>
            <p className="text-xs text-white/70 leading-relaxed">Bal-ları mağazada və onlayn istifadə edin!</p>
          </div>

          {success ? (
            <SuccessView firstName={values.firstName} lastName={values.lastName} email={values.email} onClose={onClose} />
          ) : (
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6">
              <div className="flex items-start justify-between mb-4 gap-3">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
                    Hesab yaradın və Rewards-la
                  </h2>
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
                    təkliflərdən yararlanın!
                  </h2>
                </div>
                <button onClick={onClose} className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Artıq hesabınız var?{' '}
                <button onClick={onSwitchToLogin} className="text-[#3d5a6b] font-semibold hover:underline">Daxil olun</button>.
              </p>

              <div className="space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                  <Field label="Ad" name="firstName" value={values.firstName} onChange={set('firstName')} error={errors.firstName} />
                  <Field label="Soyad" name="lastName" value={values.lastName} onChange={set('lastName')} error={errors.lastName} />
                </div>
                <Field label="Email" name="email" type="email" value={values.email} onChange={set('email')} error={errors.email} />

                <div onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)}>
                  <Field label="Şifrə" name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={set('password')} error={errors.password}>
                    <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 ml-2 hover:text-gray-600 transition-colors" type="button">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </Field>
                  {passwordFocused && <PasswordStrength password={values.password} />}
                </div>

                <Field label="Şifrə təkrar" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={values.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword}>
                  <button onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 ml-2 hover:text-gray-600 transition-colors" type="button">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Field>

                <label className="flex items-start gap-3 my-5 cursor-pointer">
                  <input type="checkbox" checked={promo} onChange={e => setPromo(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#3d5a6b] focus:ring-[#3d5a6b]/20 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    Xüsusi təkliflər, endirimlər və tanıtım e-poçtları almaq istəyirəm.
                  </span>
                </label>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  "Hesab yarat" düyməsini basmaqla{' '}
                  <a href="#" className="font-bold underline text-gray-700">Üzvlük Şərtləri</a> və{' '}
                  <a href="#" className="underline text-gray-700">İstifadə Qaydalarını</a> qəbul edirsiniz.
                </p>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 text-sm font-bold tracking-wide text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-800 transition-all duration-200"
                  >
                    LƏĞV ET
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 text-sm font-bold tracking-wide text-white rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm disabled:opacity-60"
                    style={{ background: PRIMARY }}
                    onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
                    onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
                  >
                    {submitting ? 'GÖZLƏYİN...' : 'HESAB YARAT'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}