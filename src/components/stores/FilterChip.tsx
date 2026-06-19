import { PRIMARY } from '../../constants/theme'

export default function FilterChip({
  label, checked, onChange
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
        checked ? 'text-white shadow-sm' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
      }`}
      style={{ background: checked ? PRIMARY : undefined }}
    >
      {label}
    </button>
  )
}