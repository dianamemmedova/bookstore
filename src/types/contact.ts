export interface FormData {
  [key: string]: string
  
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface ContactInfoItem {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
}

export interface WorkingHourItem {
  day: string
  hours: string
  isOff?: boolean
}

export interface SocialLinkItem {
  label: string
  href: string
  color: string
  bgColor: string
  icon: React.ReactNode
}

export const initialForm: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

