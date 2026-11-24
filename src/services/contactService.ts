import { api } from '../lib/api'
import type { FormData } from '../types/contact'

// Mesaj göndər (giriş edibsə, mesaj hesaba bağlanır)
export async function sendContactMessage(form: FormData): Promise<void> {
  await api('/contact', {
    method: 'POST',
    body: { name: form.name, email: form.email, subject: form.subject, message: form.message },
  })
}

export async function subscribeNewsletter(email: string): Promise<string> {
  const res = await api<{ message: string }>('/newsletter/subscribe', { method: 'POST', body: { email }, auth: false })
  return res.message
}

export interface GiftBalance {
  balance: number // AZN
  expiresAt: string | null
}

// Kart tapılmasa backend 404 (GIFT_CARD_NOT_FOUND) atır
export function checkGiftCardBalance(cardNumber: string): Promise<GiftBalance> {
  return api<GiftBalance>('/gift-cards/balance', { method: 'POST', body: { cardNumber }, auth: false })
}