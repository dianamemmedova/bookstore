import { CONTACT_INFO_ITEMS } from '../../data/contactData'

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
        Əlaqə Məlumatları
      </h2>
      <div className="space-y-5">
        {CONTACT_INFO_ITEMS.map(({ icon, label, value, sub }) => (
          <div key={label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#3d5a6b]/10 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{label}</p>
              <p className="text-gray-700 font-medium">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}