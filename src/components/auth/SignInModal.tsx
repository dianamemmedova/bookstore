import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/useAuthModal'
import { useToast } from '../../hooks/useToast'
import { ToastContainer } from '../ui/ToastContainer'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../ui/Input'
import { signInRules, validate } from '../../hooks/useFormValidation'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
  onForgotPassword: () => void
}

export default function SignInModal({ isOpen, onClose, onSwitchToRegister, onForgotPassword }: Props) {
  const [email, setEmail] = useState('aynur@mail.com')
  const [password, setPassword] = useState('123456')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  

  const { login } = useAuth()
  const { closeAll } = useAuthModal()
  const toast = useToast()

  if (!isOpen) return <ToastContainer toasts={toast.toasts} />
    const handleSubmit = () => {
  const newErrors = validate({ email, password }, signInRules)
  setErrors(newErrors)
  if (Object.keys(newErrors).length > 0) return

  const ok = login(email, password)
  if (ok) {
    toast.success(`Xoş gəldiniz, ${email.split('@')[0]}! Uğurla daxil oldunuz.`)
    closeAll()
  } else {
    toast.error('Email və ya şifrə yanlışdır.')
  }
}

  return (
    <>
      <ToastContainer toasts={toast.toasts} />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
          
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>

          <h2 className="text-2xl text-center mb-6" >
            Daxil ol və ya Hesab Yarat
          </h2>

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
              pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
              patternMessage="Düzgün email daxil edin"
            />

            <div className="relative">
              <Input
                label="Şifrə"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                error={errors.password}
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center my-5 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              Məni xatırla
            </label>
            <button onClick={onForgotPassword} className="underline text-gray-700 bg-transparent border-none cursor-pointer p-0">
              Şifrəni unutmusunuz?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="w-full bg-[#2e6b4f] hover:bg-[#245840] text-white rounded-lg py-3 mb-3 font-medium transition-colors"
          >
            Daxil ol
          </button>

          <button
            onClick={onSwitchToRegister}
            className="w-full border border-gray-300 rounded-lg py-3 mb-5 hover:bg-gray-50 transition-colors"
          >
            Hesab Yarat
          </button>

          <p className="text-center text-xs text-gray-500">
            Daxil olmaqla <a href="#" className="underline">İstifadə Şərtlərimizi</a> və{' '}
            <a href="#" className="underline">Gizlilik Siyasətimizi</a> qəbul etmiş olursunuz
          </p>
        </div>
      </div>
    </>
  )
}