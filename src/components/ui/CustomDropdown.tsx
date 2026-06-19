import { useState, useRef, useEffect } from 'react'
import { LIGHT_BLUE_BG, LIGHT_GREEN_BG, PRIMARY, TEXT_DARK } from '../../constants/theme'
import type {  Props } from '../../types/ui'

export default function CustomDropdown({ value, onChange, options, placeholder = 'Seçin...' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors w-full justify-between"
        style={{ background: PRIMARY }}
      >
        {selected?.label ?? placeholder}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm transition-colors"
              style={{
                color: TEXT_DARK,
                background: opt.value === value ? LIGHT_GREEN_BG: 'transparent',
                fontWeight: opt.value === value ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (opt.value !== value) e.currentTarget.style.background =LIGHT_BLUE_BG
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = opt.value === value ? LIGHT_GREEN_BG : 'transparent'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}