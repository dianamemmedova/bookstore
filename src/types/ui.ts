import type { ReactNode } from 'react'

export  interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}


export interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  fullWidth?: boolean
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  patternMessage?: string
  disabled?: boolean
  rows?: number
  textarea?: boolean
  children?: React.ReactNode
}

export interface Option {
  value: string
  label: string
}

export interface Props {
  value: string
  onChange: (val: string) => void
  options: Option[]
  placeholder?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}