import { SOCIAL_LINKS } from '../../data/contactData'

export default function SocialLinks() {
  return (
    <div className="bg-white rounded-md border border-line p-5">
      <h3 className="font-display text-base font-bold text-ink mb-4">Bizi izləyin</h3>
      <div className="flex gap-3">
        {SOCIAL_LINKS.map(({ label, href, color, bgColor, icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color, backgroundColor: `${bgColor}1a` }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = bgColor
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = `${bgColor}1a`
              e.currentTarget.style.color = color
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  )
}