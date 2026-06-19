import { useState } from 'react'
import type { FormModal } from '../../types/wishlistPage'
import { GREEN, GREEN_DARKEST } from '../../constants/theme'


export default function WishlistFormModal({
  mode, initialName = '', initialDesc = '', initialPrivacy = 'private', onClose, onSave
}: FormModal) {
  const [name, setName] = useState(initialName)
  const [desc, setDesc] = useState(initialDesc)
  const [privacy, setPrivacy] = useState<'public' | 'private'>(initialPrivacy)
  const maxDesc = 250

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl">✕</button>
        <h2 className="text-2xl text-gray-900 mb-6" >
          {mode === 'create' ? 'Yeni Sevimlilər Siyahısı Yarat' : 'Sevimlilər Siyahısını Redaktə Et'}
        </h2>

        <div className="border border-green-800 mb-4 relative">
          <label className="absolute top-2 left-3 text-xs text-gray-400">
            {mode === 'create' ? 'Yeni Siyahının Adı' : 'Siyahının Adı'}
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            className="w-full pt-6 pb-2 px-3 text-sm text-gray-900 outline-none bg-gray-50" />
        </div>

        <label className="block text-sm text-gray-700 mb-2">Siyahının Təsviri</label>
        <div className="relative mb-5">
          <textarea value={desc} onChange={e => setDesc(e.target.value.slice(0, maxDesc))} rows={5}
            className="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none resize-none focus:border-gray-400 transition-colors" />
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">{maxDesc - desc.length}/{maxDesc}</span>
        </div>

        <p className="text-sm text-gray-700 mb-3">Bu siyahını kim görə bilər?</p>
        <label className="flex items-start gap-3 mb-3 cursor-pointer">
          <input type="radio" name="privacy" checked={privacy === 'public'} onChange={() => setPrivacy('public')} className="mt-0.5 accent-green-800" />
          <span className="text-sm text-gray-700">Hamı (İctimai) bu siyahını görə bilər</span>
        </label>
        <label className="flex items-start gap-3 mb-7 cursor-pointer">
          <input type="radio" name="privacy" checked={privacy === 'private'} onChange={() => setPrivacy('private')} className="mt-0.5 accent-green-800" />
          <span className="text-sm text-gray-700">Yalnız Siz (Şəxsi). Bu parametrlə paylaşım deaktivdir.</span>
        </label>

        <div className="flex items-center gap-4">
          <button onClick={() => { if (name.trim()) onSave(name, desc, privacy) }}
            className="px-7 py-3 text-sm font-medium text-white transition-colors"
            style={{ background: GREEN }}
            onMouseEnter={e => (e.currentTarget.style.background = GREEN_DARKEST)}
            onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
            {mode === 'create' ? 'Yeni Siyahı Yarat' : 'Yadda Saxla'}
          </button>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Ləğv et</button>
        </div>
      </div>
    </div>
  )
}