import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

/* eslint-disable react-refresh/only-export-components */

interface AuthModalContextType {
  loginOpen: boolean
  registerOpen: boolean
  forgotOpen: boolean
  profileOpen: boolean     
  openLogin: () => void
  openRegister: () => void
  openForgot: () => void
  openProfile: () => void  
  closeAll: () => void
}

export const AuthModalContext = createContext<AuthModalContextType>({
  loginOpen: false,
  registerOpen: false,
  forgotOpen: false,
  profileOpen: false,
  openLogin: () => {},
  openRegister: () => {},
  openForgot: () => {},
  openProfile: () => {},
  closeAll: () => {},
})

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false) 

  return (
    <AuthModalContext.Provider value={{
      loginOpen,
      registerOpen,
      forgotOpen,
      profileOpen,
      openLogin:    () => { setLoginOpen(true);    setRegisterOpen(false); setForgotOpen(false);    setProfileOpen(false)},
      openRegister: () => { setRegisterOpen(true); setLoginOpen(false);    setForgotOpen(false);    setProfileOpen(false)},
      openForgot:   () => { setForgotOpen(true);   setLoginOpen(false);    setRegisterOpen(false);  setProfileOpen(false)},
      openProfile: () =>  { setProfileOpen(true);  setLoginOpen(false);    setRegisterOpen(false);  setForgotOpen(false)},

      closeAll:     () => { setLoginOpen(false);   setRegisterOpen(false); setForgotOpen(false);  setProfileOpen(false)},
    }}>
      {children}
    </AuthModalContext.Provider>
  )
}