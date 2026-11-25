import { PRIMARY } from '../../constants/theme'
import { infoMessages } from '../../data/navbar'
import { useInfoBar } from '../../hooks/useInfoBar'

export default function InfoBar() {
  const { currentInfo, animating, direction, handleArrow } = useInfoBar()

  const slideStyle = (): React.CSSProperties => ({
    transform: animating ? (direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)') : 'translateX(0)',
    opacity: animating ? 0 : 1,
    transition: 'transform 0.35s ease, opacity 0.35s ease',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '700',
    letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff',
    whiteSpace: 'nowrap', lineHeight: 1,
  })

  return (
    <div className="flex items-center justify-center overflow-hidden h-[32px] sm:h-[34px]" style={{ background: PRIMARY }}>
      <div className="flex items-center h-[28px] sm:h-[34px] p-0">
        <button onClick={() => handleArrow('left')} aria-label="Əvvəlki"
          className="flex items-center justify-center w-6 sm:w-7 bg-transparent cursor-pointer text-white/70 hover:text-white transition-colors flex-shrink-0 select-none p-0 pb-[4px] sm:pb-[5px] border-none text-[20px] sm:text-[24px]">
          &#8249;
        </button>
        <div className="overflow-hidden flex items-center justify-center cursor-pointer w-[260px] sm:w-[480px] h-[28px] sm:h-[34px]"
          onClick={() => handleArrow('right')}>
          <span style={slideStyle()} className="px-2 text-center">{infoMessages[currentInfo]}</span>
        </div>
        <button onClick={() => handleArrow('right')} aria-label="Növbəti"
          className="flex items-center justify-center w-6 sm:w-7 h-[28px] sm:h-[34px] bg-transparent border-none cursor-pointer text-white/70 hover:text-white transition-colors flex-shrink-0 select-none pb-[4px] sm:pb-[5px] text-[20px] sm:text-[24px]">
          &#8250;
        </button>
      </div>
    </div>
  )
}