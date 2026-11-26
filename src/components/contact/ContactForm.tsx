import Input from '../ui/Input'
import { useContactForm } from '../../hooks/useContactForm'
import SuccessModal from '../ui/SuccessModal'
import { PRIMARY, PRIMARY_DARK, PRIMARY_DISABLED } from '../../constants/theme'

export default function ContactForm() {
  const { form, errors, isModalOpen, closeModal, isSubmitting, serverError, handleChange, handleSubmit } = useContactForm()

  return (
    <>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Mesajınız göndərildi!"
        message="Ən qısa zamanda sizinlə əlaqə saxlayacağıq."
        buttonText="Bağla"
      />

      <div className="bg-white rounded-md border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line">
          <h2 className="font-display text-lg font-bold text-ink">Mesaj Göndər</h2>
          <p className="text-sm text-muted mt-1">
            Aşağıdakı formu doldurun, ən qısa zamanda sizinlə əlaqə saxlayaq
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Adınız"
              placeholder="Əli Həsənov"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Mövzu</label>
            <select
              value={form.subject}
              onChange={e => handleChange('subject')(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-sm border text-sm outline-none transition-colors bg-white ${
                errors.subject ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#3d5a6b]'
              }`}
            >
              <option value="">Mövzu seçin...</option>
              <option value="Sifariş haqqında">Sifariş haqqında</option>
              <option value="Kitab tövsiyəsi">Kitab tövsiyəsi</option>
              <option value="Texniki problem">Texniki problem</option>
              <option value="Əməkdaşlıq">Əməkdaşlıq</option>
              <option value="Digər">Digər</option>
            </select>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Mesaj</label>
            <textarea
              value={form.message}
              onChange={e => handleChange('message')(e.target.value)}
              placeholder="Mesajınızı yazın..."
              rows={5}
              className={`w-full px-4 py-2.5 rounded-sm border text-sm outline-none transition-colors resize-none bg-white ${
                errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#3d5a6b]'
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      form.message.length >= 10 ? 'bg-green-500' : 'bg-[#c9a454]'
                    }`}
                    style={{ width: `${Math.min((form.message.length / 10) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">{form.message.length} / 10+ hərf</p>
              </div>
              {form.message.length >= 10 && (
                <span className="text-xs text-green-600">✓ Minimum tələb ödənildi</span>
              )}
            </div>
          </div>

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-sm font-bold tracking-wider text-white rounded-sm transition-all disabled:opacity-60"
            style={{ background: isSubmitting ? PRIMARY_DISABLED : PRIMARY }}
            onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = PRIMARY_DARK }}
            onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = PRIMARY }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Göndərilir...
              </span>
            ) : 'MESAJI GÖNDƏR'}
          </button>
        </form>
      </div>
    </>
  )
}