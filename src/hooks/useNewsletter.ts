import { useState } from 'react'
import { ApiError } from '../lib/api'
import { subscribeNewsletter } from '../services/contactService'

// Footer-dakı və Əlaqə səhifəsindəki abunə formaları eyni məntiqi istifadə edir
export function useNewsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (submitting) return
    if (!email.trim()) { setError('Email daxil edin'); return }
    setSubmitting(true)
    setError('')
    try {
      await subscribeNewsletter(email.trim())
      setSubscribed(true)
      setEmail('')
    } catch (e) {
      const fields = e instanceof ApiError ? e.fieldErrors() : {}
      setError(fields.email ?? (e instanceof ApiError ? e.message : 'Xəta baş verdi'))
    } finally {
      setSubmitting(false)
    }
  }

  const changeEmail = (v: string) => { setEmail(v); if (error) setError('') }

  return { email, setEmail: changeEmail, submitting, subscribed, error, submit }
}