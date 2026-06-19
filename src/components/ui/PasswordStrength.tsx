import { RED_ERROR, ORANGE_WEAK, YELLOW_MEDIUM, GREEN_STRONG, GREEN_ACCENT2 } from '../../constants/theme'

interface Props { password: string }

interface Check { label: string; ok: boolean }

function getChecks(p: string): Check[] {
  return [
    { label: 'Böyük və kiçik hərf', ok: /[a-z]/.test(p) && /[A-Z]/.test(p) },
    { label: 'Xüsusi simvol (#$&...)', ok: /[^a-zA-Z0-9]/.test(p) },
    { label: 'Minimum 12 simvol', ok: p.length >= 12 },
  ]
}

function getStrength(p: string): { level: number; label: string; color: string } {
  if (!p) return { level: 0, label: '', color: '' }
  const checks = getChecks(p)
  const passed = checks.filter(c => c.ok).length
  const hasMin = p.length >= 6

  if (!hasMin) return { level: 1, label: 'Çox zəif', color: RED_ERROR }
  if (passed === 0) return { level: 2, label: 'Zəif', color: ORANGE_WEAK }
  if (passed === 1) return { level: 3, label: 'Orta', color: YELLOW_MEDIUM }
  if (passed === 2) return { level: 4, label: 'Güclü', color: GREEN_STRONG }
  return { level: 4, label: 'Çox güclü', color: GREEN_ACCENT2 }
}

export default function PasswordStrength({ password }: Props) {
  if (!password) return null

  const { level, label, color } = getStrength(password)
  const checks = getChecks(password)

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 bg-white shadow-sm">
      <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">
        Minimum 6 simvol olmalıdır
      </p>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: level >= i ? '100%' : '0%', background: color }}
            />
          </div>
        ))}
      </div>

      <p className="text-xs mb-2" style={{ color }}>
        {label}
      </p>

      <p className="text-xs text-gray-500 mb-1">Daha yaxşı olar ki:</p>
      {checks.map(c => (
        <div key={c.label} className="flex items-center gap-2 text-xs text-gray-600 mb-0.5">
          {c.ok
            ? <span className="text-green-600">✓</span>
            : <span className="text-gray-400">✗</span>
          }
          {c.label}
        </div>
      ))}
    </div>
  )
}