import type { SidebarProps } from '../../types/fiction'

// Fiction və Nonfiction səhifələrinin yan menyusu
export function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className="hidden w-56 flex-shrink-0 lg:block">
      <div className="sticky top-36 space-y-4 rounded-md border border-line bg-white p-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 border-b border-line pb-1 text-[11px] font-bold uppercase tracking-wider text-muted">
              {section.title}
            </p>
            <ul className="m-0 list-none space-y-0.5 p-0">
              {section.links.map((l) => (
                <li key={l}>
                  <a href="#" className="block rounded-sm px-2 py-1 text-[13px] text-ink transition-colors hover:bg-panel hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}