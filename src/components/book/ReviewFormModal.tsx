import { useState } from 'react'
import { ApiError } from '../../lib/api'
import { PRIMARY } from '../../constants/theme'
import type { BookReview, ReviewInput } from '../../types/review'

interface Props {
  bookTitle: string
  review: BookReview | null // null → yeni rəy
  onClose: () => void
  onSubmit: (input: ReviewInput) => Promise<void>
}

export default function ReviewFormModal({ bookTitle, review, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(review?.rating ?? 0)
  const [title, setTitle] = useState(review?.title ?? '')
  const [body, setBody] = useState(review?.body ?? '')
  // Tövsiyə: istifadəçi toxunmayana qədər ulduza görə (4-5 → bəli)
  const [recommended, setRecommended] = useState<boolean | null>(review ? review.recommended : null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const effectiveRecommended = recommended ?? rating >= 4

  const validate = () => {
    const e: Record<string, string> = {}
    if (rating < 1) e.rating = 'Ulduz seçin'
    if (title.trim().length < 3) e.title = 'Başlıq ən azı 3 simvol olmalıdır'
    if (body.trim().length < 10) e.body = 'Rəy ən azı 10 simvol olmalıdır'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (submitting || !validate()) return
    setSubmitting(true)
    setServerError('')
    try {
      await onSubmit({ rating, title: title.trim(), body: body.trim(), recommended: effectiveRecommended })
      onClose()
    } catch (err) {
      if (err instanceof ApiError) {
        const fe = err.fieldErrors()
        if (Object.keys(fe).length) setErrors(fe)
        else setServerError(err.message)
      } else {
        setServerError('Xəta baş verdi. Yenidən cəhd edin')
      }
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" aria-label="Bağla">✕</button>
        <h2 className="text-xl font-bold text-gray-900 mb-1">{review ? 'Rəyi redaktə et' : 'Rəy yaz'}</h2>
        <p className="text-sm text-gray-400 mb-5 line-clamp-1">{bookTitle}</p>

        <p className="text-sm text-gray-700 mb-1">Qiymətin</p>
        <div className="flex gap-1 mb-1" role="radiogroup" aria-label="Qiymət">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => setRating(s)} aria-label={`${s} ulduz`}
              className={`text-3xl leading-none transition-colors ${s <= rating ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-200'}`}>
              ★
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-xs text-red-500 mb-2">{errors.rating}</p>}

        <label className="block text-sm text-gray-700 mt-4 mb-1" htmlFor="rv-title">Başlıq</label>
        <input id="rv-title" value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}

        <label className="block text-sm text-gray-700 mt-4 mb-1" htmlFor="rv-body">Rəyin</label>
        <textarea id="rv-body" value={body} maxLength={2000} rows={5} onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none" />
        <div className="flex justify-between">
          <span className="text-xs text-red-500">{errors.body}</span>
          <span className="text-xs text-gray-400">{body.length}/2000</span>
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={effectiveRecommended} onChange={(e) => setRecommended(e.target.checked)} />
          Bu kitabı tövsiyə edirəm
        </label>

        {serverError && <p className="text-sm text-red-500 mt-4">{serverError}</p>}

        <div className="flex items-center gap-4 mt-6">
          <button onClick={submit} disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg disabled:opacity-60"
            style={{ background: PRIMARY }}>
            {submitting ? 'Göndərilir...' : review ? 'Yadda saxla' : 'Göndər'}
          </button>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">Ləğv et</button>
        </div>
      </div>
    </div>
  )
}