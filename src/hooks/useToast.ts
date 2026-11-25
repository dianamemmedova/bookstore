import { useState, useCallback, useRef } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  type: ToastType
  message: string
}

let counter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const show = useCallback((type: ToastType, message: string) => {
    const key = `${type}:${message}`

    // Eyni mesaj artıq ekrandadırsa təkrar əlavə etmirik, yalnız vaxtını uzadırıq
    const existing = timers.current.get(key)
    if (existing) clearTimeout(existing)

    setToasts((prev) =>
      prev.some((t) => t.type === type && t.message === message)
        ? prev
        : [...prev, { id: ++counter, type, message }],
    )

    timers.current.set(
      key,
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => !(t.type === type && t.message === message)))
        timers.current.delete(key)
      }, 3000),
    )
  }, [])

  const success = (msg: string) => show('success', msg)
  const error   = (msg: string) => show('error', msg)
  const info    = (msg: string) => show('info', msg)

  return { toasts, success, error, info }
}