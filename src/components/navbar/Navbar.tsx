import InfoBar      from './InfoBar'
import UtilityBar   from './UtilityBar'
import MainBar      from './MainBar'
import CategoryNav  from './CategoryNav'
import MobileMenu   from './MobileMenu'
import { useNavbar } from '../../hooks/useNavbar'

export default function Navbar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useNavbar()

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <InfoBar />
      <UtilityBar />
      <MainBar
        menuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen(o => !o)}
      />
      <CategoryNav />
      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  )
}