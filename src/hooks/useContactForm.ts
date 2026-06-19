import { useState } from 'react'
import type { FormData } from '../types/contact'
import { initialForm } from '../types/contact'
import { contactRules, validate } from './useFormValidation'

export function useContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined as unknown as string }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate(form, contactRules)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsModalOpen(true)
      setForm(initialForm)
      setErrors({})
    }, 1000)
  }

  const closeModal = () => setIsModalOpen(false)

  return {
    form,
    errors,
    isModalOpen,
    isSubmitting,
    handleChange,
    handleSubmit,
    closeModal,
  }
}