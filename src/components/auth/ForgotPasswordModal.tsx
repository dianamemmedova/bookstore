import { useState } from 'react'
import { useToast } from '../../hooks/useToast'
import { ToastContainer } from '../ui/ToastContainer'

interface Props {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }: Props) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const toast = useToast()

  if (!isOpen) return <ToastContainer toasts={toast.toasts} />

  const handleSubmit = () => {
    if (!email.trim()) { toast.error('Zəhmət olmasa email ünvanınızı daxil edin.'); return }
    setSent(true)
    toast.success('Şifrə sıfırlama linki göndərildi!')
  }

  const handleBackToLogin = () => { setSent(false); setEmail(''); onBackToLogin() }

  return (
    <>
      <ToastContainer toasts={toast.toasts} />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Bağla">
            <i className="ti ti-x text-lg" />
          </button>
          <h2 className="text-2xl text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Şifrəni Unutmusunuz?
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Email ünvanınızı daxil edin, şifrə sıfırlama linki göndərəcəyik.
          </p>
          {sent && <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm text-center mb-4">
            ✅ Link <strong>{email}</strong> ünvanına göndərildi. Zəhmət olmasa emailinizi yoxlayın.
          </div>}
          {!sent && (
            <>
              <label className="block text-sm text-gray-700 mb-1">Email ünvanı <span className="text-red-500">*</span></label>
              <input type="email" placeholder="nümunə@mail.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-sm focus:outline-none focus:border-green-700" />
              <button onClick={handleSubmit} className="w-full bg-[#2e6b4f] hover:bg-[#245840] text-white rounded-lg py-3 font-medium transition-colors">Şifrəni Bərpa Et</button>
            </>
          )}
          <button onClick={handleBackToLogin} className="flex items-center justify-center gap-1 w-full mt-4 text-sm text-[#2e6b4f] hover:underline">‹ Girişə Qayıt</button>
        </div>
      </div>
    </>
  )
}