import { CONTACT_INFO_ITEMS } from '../../data/contactData'

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-md border border-line p-5">
      <h2 className="font-display text-lg font-bold text-ink mb-5 pb-3 border-b border-line">
        Əlaqə Məlumatları
      </h2>
      <div className="space-y-4">
        {CONTACT_INFO_ITEMS.map(({ icon, label, value, sub }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3d5a6b]/10 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted font-semibold">{label}</p>
              <p className="text-ink text-sm font-medium">{value}</p>
              <p className="text-xs text-muted mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}