import { useState, useRef, useEffect, useCallback } from 'react'
import { infoMessages } from '../data/navbar'

export function useInfoBar() {
  const [currentInfo, setCurrentInfo] = useState(0)
  const [animating,   setAnimating]   = useState(false)
  const [direction,   setDirection]   = useState<'left' | 'right'>('right')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((dir: 'left' | 'right') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrentInfo(prev =>
        dir === 'right'
          ? (prev + 1) % infoMessages.length
          : (prev - 1 + infoMessages.length) % infoMessages.length
      )
      setAnimating(false)
    }, 350)
  }, [animating])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => goTo('right'), 6000)
  }, [goTo])

  const handleArrow = useCallback((dir: 'left' | 'right') => {
    goTo(dir)
    resetInterval()
  }, [goTo, resetInterval])

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo('right'), 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { currentInfo, animating, direction, handleArrow }
}