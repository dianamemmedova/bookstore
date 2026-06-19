import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  type: ToastType
  message: string
}

let counter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((type: ToastType, message: string) => {
    const id = ++counter
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const success = (msg: string) => show('success', msg)
  const error   = (msg: string) => show('error', msg)
  const info    = (msg: string) => show('info', msg)

  return { toasts, success, error, info }
}