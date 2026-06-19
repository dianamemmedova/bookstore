import { PRIMARY } from '../../constants/theme'
import type { SidebarProps } from '../../types/fiction'


export function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0 text-sm">
      {sections.map((section, i) => (
        <div key={section.title}>
          <div className="mb-6">
            <p className="font-bold uppercase tracking-wider text-gray-800 mb-2" style={{ fontSize: 11 }}>
              {section.title}
            </p>
            {section.links.map(l => (
              <a key={l} href="#" className="block py-1 hover:underline" style={{ color: PRIMARY }}>
                {l}
              </a>
            ))}
          </div>
          {i < sections.length - 1 && <div className="h-px bg-gray-200 mb-4" />}
        </div>
      ))}
    </aside>
  )
}