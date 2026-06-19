import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { sliderImages } from '../../data/home'
import { ACCENT } from '../../constants/theme'


export function ImageSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sliderImages.length)
  }, [])

  const goTo = useCallback((index: number) => {
    setAnimating(true)
    setTimeout(() => { setCurrent(index); setAnimating(false) }, 400)
  }, [])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(goNext, 5000)
  }, [goNext])

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [goNext])

  const handleArrow = (dir: 'left' | 'right') => {
    if (animating) return
    const next = dir === 'left'
      ? (current - 1 + sliderImages.length) % sliderImages.length
      : (current + 1) % sliderImages.length
    goTo(next)
    resetInterval()
  }

  return (
    <section className="relative w-full overflow-hidden h-[200px] sm:h-[320px] lg:h-[420px]">
  {sliderImages.map((img, i) => (
    <Link key={img.src} to={img.link} className="absolute inset-0 block"
      style={{
        opacity: i === current ? (animating ? 0 : 1) : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: i === current ? 'auto' : 'none',
      }}>
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
    </Link>
  ))}

  <button onClick={() => handleArrow('left')} aria-label="Əvvəlki"
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md text-gray-700 text-lg sm:text-xl">
    ‹
  </button>
  <button onClick={() => handleArrow('right')} aria-label="Növbəti"
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md text-gray-700 text-lg sm:text-xl">
    ›
  </button>

  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
    {sliderImages.map((_, i) => (
      <button key={i} onClick={() => { goTo(i); resetInterval() }} aria-label={`Şəkil ${i + 1}`}
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300"
        style={{
          background: i === current ? ACCENT : 'rgba(255,255,255,0.6)',
          transform: i === current ? 'scale(1.2)' : 'scale(1)',
        }}
      />
    ))}
  </div>
</section>
  )
}