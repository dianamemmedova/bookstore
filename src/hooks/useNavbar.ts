import { useRef, useEffect, useState } from 'react'

export function useNavbar() {
  const [booksOpen,   setBooksOpen]   = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef     = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current     && !navRef.current.contains(e.target as Node))     setBooksOpen(false)
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return {
    booksOpen, setBooksOpen,
    accountOpen, setAccountOpen,
    mobileMenuOpen, setMobileMenuOpen,
    navRef, accountRef,
  }
}