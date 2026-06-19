import { useContext } from 'react'
import { AuthModalContext } from './AuthModalContext'

export const useAuthModal = () => useContext(AuthModalContext)