import type { ReactNode } from 'react'
import Navbar from '../navbar/Navbar'
import { useAuthModal } from '../../context/AuthModalContext'
import SignInModal from '../auth/SignInModal'
import RegisterModal from '../auth/RegisterModal'
import ForgotPasswordModal from '../auth/ForgotPasswordModal'
import ProfileModal from '../auth/ProfileModal' 
import { Footer } from '../home/Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { loginOpen, registerOpen, forgotOpen,  openLogin, openRegister, openForgot, closeAll } = useAuthModal()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <SignInModal
        isOpen={loginOpen}
        onClose={closeAll}
        onSwitchToRegister={openRegister}
        onForgotPassword={openForgot}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={closeAll}
        onSwitchToLogin={openLogin}
      />

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={closeAll}
        onBackToLogin={openLogin}
      />
      
      <ProfileModal /> 

      


      <main>{children}</main>
      <Footer />
    </div>
  )
}