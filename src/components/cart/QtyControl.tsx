import Icon from '../ui/Icon'

export function QtyControl({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-sm border border-line-strong bg-white">
      <button onClick={onDec} aria-label="Azalt" className="flex h-7 w-7 select-none items-center justify-center text-muted transition-colors hover:bg-panel hover:text-ink">
        <Icon name="remove" size={16} />
      </button>
      <span className="tabular min-w-[30px] select-none border-x border-line-strong text-center text-[13px] font-semibold text-ink">
        {qty}
      </span>
      <button onClick={onInc} aria-label="Artır" className="flex h-7 w-7 select-none items-center justify-center text-muted transition-colors hover:bg-panel hover:text-ink">
        <Icon name="add" size={16} />
      </button>
    </div>
  )
}