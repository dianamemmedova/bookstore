import { NavLink, Link, useLocation } from 'react-router-dom'
import { ACCENT } from '../../constants/theme'
import { categories, booksDropdown } from '../../data/navbar'
import { useNavbar } from '../../hooks/useNavbar'

const catCls = (active: boolean) =>
  `relative block px-4 py-3.5 text-[15px] whitespace-nowrap no-underline transition-colors duration-150 border-b-2
  ${active
    ? 'font-semibold text-[#a08c5b] border-[#a08c5b]'
    : 'font-normal text-gray-600 border-transparent hover:text-gray-900 hover:border-[#a08c5b]'}`
export default function CategoryNav() {
  const { booksOpen, setBooksOpen, navRef } = useNavbar()
  const location = useLocation()

  const currentGenre = new URLSearchParams(location.search).get('genre')

  const isCategoryActive = (to: string) => {
    const qIndex = to.indexOf('?')

    if (qIndex === -1) {
      return location.pathname === to
    }

    const path = to.slice(0, qIndex)
    const genre = new URLSearchParams(to.slice(qIndex + 1)).get('genre')

    return location.pathname === path && currentGenre === genre
  }

  return (
    <nav className="hidden lg:block border-t border-gray-100 relative" ref={navRef}>
      <div className="max-w-screen-xl mx-auto px-6 flex items-center overflow-x-auto">
        {categories.map((cat, index) => {
          const isActive = cat.to === '/books'
            ? location.pathname === '/books' && !currentGenre
            : isCategoryActive(cat.to)

          return (
            <div key={cat.to} className="flex items-center">
              {index !== 0 && <span className="w-px h-[18px] bg-gray-300 flex-shrink-0 mx-0.5" />}
              {cat.label === 'Kitablar' ? (
                <button onClick={() => setBooksOpen(o => !o)} className={`${catCls(booksOpen)} bg-transparent`}>
                  {cat.label}
                </button>
              ) : (
                <NavLink to={cat.to} end={cat.to === '/books'} className={() => catCls(isActive)}>
                  {cat.label}
                </NavLink>
              )}
            </div>
          )
        })}
      </div>

      {booksOpen && (
        <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl z-50">
          <div className="max-w-screen-xl mx-auto px-8 py-8">
            <div className="flex gap-12">
              {Object.values(booksDropdown).map(col => (
                <div key={col.title} className="flex-1 min-w-0">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-widest text-gray-900 pb-2 mb-3"
                    style={{ borderBottom: `2px solid ${ACCENT}` }}
                  >
                    {col.title}
                  </h3>
                  <ul className="space-y-2 list-none p-0 m-0">
                    {col.items.map((item, i) => (
                      <li key={item}>
                        <Link
                          to={col.links[i]}
                          onClick={() => setBooksOpen(false)}
                          className="block text-sm text-gray-600 hover:text-green-700 transition-colors no-underline"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}