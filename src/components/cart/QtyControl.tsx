export function QtyControl({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="inline-flex items-center gap-3">
      <button onClick={onDec} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors select-none text-lg leading-none">−</button>
      <span className="text-sm font-medium text-gray-800 select-none min-w-[16px] text-center">{qty}</span>
      <button onClick={onInc} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors select-none text-lg leading-none">+</button>
    </div>
  )
}