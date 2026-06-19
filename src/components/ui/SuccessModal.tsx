import Modal from '../ui/Modal'
import type { SuccessModalProps } from '../../data/succes'
import { DARK_ALT, PRIMARY } from '../../constants/theme'


export default function SuccessModal({
  isOpen,
  onClose,
  title = 'Əməliyyat uğurla başa çatdı!',
  message = 'Məlumatınız qeydə alındı. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.',
  buttonText = 'Bağla',
}: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center py-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 animate-bounce">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-800 text-base font-medium mb-2">{title}</p>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          style={{ background: '#3d5a6b' }}
          onMouseEnter={e => (e.currentTarget.style.background = DARK_ALT)}
          onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  )
}