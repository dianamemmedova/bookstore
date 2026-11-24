import { useState } from 'react'
import { validate, checkoutRules } from './useFormValidation'
import { api, ApiError } from '../lib/api'
import { useOrders } from '../context/OrderContext'
import type { ApiOrder } from '../context/OrderContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { getMinDate } from '../utils/date'
import type { CheckoutFormProps } from '../types/checkout'

type UseCheckoutFormProps = CheckoutFormProps

export function useCheckoutForm({
  appliedPromo, onSuccess,
}: UseCheckoutFormProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [payMethod, setPayMethod] = useState<'card' | 'cash'>('card')
  const [form, setForm] = useState({
    fullName: '', phone: '', city: '', street: '', building: '', apartment: '',
    cardNumber: '', cardExpiry: '', cardCvv: '', cardHolder: '',
    deliveryDate: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [orderId, setOrderId] = useState<number | null>(null)

  const { reloadOrders } = useOrders()
  const { reloadCart } = useCart()
  const navigate = useNavigate()

  const minDate = getMinDate(5)

  const inp = (field: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const clearErr = (field: string) =>
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n })

  const inputClass = (field: string) =>
    `w-full border px-3 py-2.5 text-sm outline-none transition-colors rounded-sm ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-gray-500'
    }`

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim()

  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 4)
    return d.length <= 2 ? d : d.slice(0, 2) + '/' + d.slice(2)
  }

  const validateForm = () => {
    const rules = { ...checkoutRules }
    if (payMethod !== 'card') {
      delete rules.cardNumber
      delete rules.cardExpiry
      delete rules.cardCvv
      delete rules.cardHolder
    }
    const errs = validate(form, rules)
    if (!form.deliveryDate) errs.deliveryDate = 'Çatdırılma tarixi seçin'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // Məbləğləri server özü səbətdən və bazadakı qiymətlərdən hesablayır, biz yalnız çatdırılma məlumatını göndəririk.
  // Kart məlumatı heç vaxt serverə getmir (real ödəniş inteqrasiyası yoxdur).
  const handleSubmit = async () => {
    if (submitting || !validateForm()) return
    setSubmitting(true)
    setServerError('')

    try {
      const order = await api<ApiOrder>('/orders', {
        method: 'POST',
        body: {
          payMethod: payMethod === 'card' ? 'CARD' : 'CASH',
          ...(appliedPromo && { promoCode: appliedPromo.code }),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          street: form.street.trim(),
          ...(form.building.trim() && { building: form.building.trim() }),
          ...(form.apartment.trim() && { apartment: form.apartment.trim() }),
          deliveryDate: form.deliveryDate,
        },
      })
      setOrderId(order.id)
      setStep('success')
      // Server səbəti təmizləyib: səbət və sifariş siyahısı yenilənir
      void reloadCart()
      void reloadOrders()
    } catch (e) {
      if (e instanceof ApiError) {
        const fields = e.fieldErrors()
        if (Object.keys(fields).length) setErrors(fields)
        setServerError(Object.keys(fields).length ? 'Xanalardakı xətaları düzəldin' : e.message)
      } else {
        setServerError('Gözlənilməz xəta baş verdi')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleSuccessNavigate = (to: string) => {
    onSuccess()
    navigate(to)
  }

  return {
    step, form, errors, payMethod, minDate, submitting, serverError, orderId,
    setPayMethod, inp, clearErr, inputClass,
    formatCard, formatExpiry,
    handleSubmit, handleSuccessNavigate,
  }
}