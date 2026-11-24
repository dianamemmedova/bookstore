import { useState } from 'react'
import type { FormData } from '../types/contact'
import { initialForm } from '../types/contact'
import { contactRules, validate } from './useFormValidation'
import { ApiError } from '../lib/api'
import { sendContactMessage } from '../services/contactService'

export function useContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (field: keyof FormData) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined as unknown as string }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    const newErrors = validate(form, contactRules)
    setErrors(newErrors)
    setServerError('')
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await sendContactMessage(form)
      setIsModalOpen(true)
      setForm(initialForm)
      setErrors({})
    } catch (err) {
      if (err instanceof ApiError) {
        const fe = err.fieldErrors()
        if (Object.keys(fe).length) setErrors(fe)
        else setServerError(err.message)
      } else {
        setServerError('Xəta baş verdi. Yenidən cəhd edin')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => setIsModalOpen(false)

  return {
    form,
    errors,
    isModalOpen,
    isSubmitting,
    serverError,
    handleChange,
    handleSubmit,
    closeModal,
  }
}