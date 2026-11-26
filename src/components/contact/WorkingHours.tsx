import { WORKING_HOURS } from '../../data/contactData'

export default function WorkingHours() {
  return (
    <div className="bg-white rounded-md border border-line p-5">
      <h3 className="font-display text-base font-bold text-ink mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#3d5a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        İş saatları
      </h3>
      <div className="space-y-2 text-sm">
        {WORKING_HOURS.map(({ day, hours, isOff }) => (
          <div key={day} className="flex justify-between">
            <span className="text-muted">{day}:</span>
            <span className={`font-medium ${isOff ? 'text-gray-400' : 'text-ink'}`}>
              {hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}