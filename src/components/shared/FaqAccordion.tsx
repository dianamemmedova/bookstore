import { useState } from 'react'
import type { FaqAccordionProps } from '../../types/fiction'


export default function FaqAccordion({
  items,
  title = 'Tez-tez verilən suallar',
  defaultOpenIndex = null,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3  className="text-lg font-bold text-gray-900 mb-4" >
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{item.q}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}