// Google Material Symbols ikonu (index.html-də şrift qoşulub)
export default function Icon({
  name, size = 18, filled = false, className = '',
}: { name: string; size?: number; filled?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none leading-none ${className}`}
      style={{
        fontSize: size,
        width: size,
        height: size,
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'middle',
        fontVariationSettings: filled ? "'FILL' 1" : undefined,
      }}
    >
      {name}
    </span>
  )
}