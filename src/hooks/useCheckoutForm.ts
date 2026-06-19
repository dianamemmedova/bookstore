import { useState } from 'react'
import { validate, checkoutRules } from './useFormValidation'
import { useOrders } from '../context/OrderContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { getMinDate } from '../utils/date'
import type { CheckoutFormProps } from '../types/checkout'

interface UseCheckoutFormProps extends CheckoutFormProps {
  confirmPromoUsed: () => void
}

export function useCheckoutForm({
  subtotal, discountAmount, deliveryFee, finalTotal,
  appliedPromo, onSuccess, confirmPromoUsed,
}: UseCheckoutFormProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [payMethod, setPayMethod] = useState<'card' | 'cash'>('card')
  const [form, setForm] = useState({
    fullName: '', phone: '', city: '', street: '', building: '', apartment: '',
    cardNumber: '', cardExpiry: '', cardCvv: '', cardHolder: '',
    deliveryDate: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addOrder } = useOrders()
  const { items } = useCart()
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

  const handleSubmit = () => {
    if (!validateForm()) return

    addOrder({
      items: items.map(i => ({
        id: i.id, title: i.title, author: i.author,
        cover: i.cover, price: i.price, quantity: i.quantity,
      })),
      subtotal, discountAmount, deliveryFee, finalTotal,
      promoCode: appliedPromo?.code ?? null,
      payMethod,
      deliveryDate: form.deliveryDate,
      delivery: {
        fullName: form.fullName, phone: form.phone, city: form.city,
        street: form.street, building: form.building, apartment: form.apartment,
      },
    })

    confirmPromoUsed()
     onSuccess() 
    setStep('success')
  }

  const handleSuccessNavigate = (to: string) => {
    onSuccess()
    navigate(to)
  }

  return {
    step, form, errors, payMethod, minDate,
    setPayMethod, inp, clearErr, inputClass,
    formatCard, formatExpiry,
    handleSubmit, handleSuccessNavigate,
  }
}