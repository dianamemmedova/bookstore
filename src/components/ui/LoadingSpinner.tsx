import { GREEN, STAR_EMPTY } from "../../constants/theme";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-3 border-gray-100 border-t-[#2e6b4f] animate-spin"
          style={{ borderWidth: '3px', borderColor: STAR_EMPTY, borderTopColor: GREEN }} />
        <div className="absolute inset-0 flex items-center justify-center text-[#2e6b4f]">
          <i className="ti ti-book-2" style={{ fontSize: '20px' }} aria-hidden="true" />
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Kitablar yüklənir
        <span className="inline-flex gap-0.5 ml-0.5">
          {[0, 200, 400].map((delay) => (
            <span
              key={delay}
              className="opacity-0 animate-pulse"
              style={{ animationDelay: `${delay}ms`, animationDuration: '1.2s' }}
            >.</span>
          ))}
        </span>
      </p>
    </div>
  )
}