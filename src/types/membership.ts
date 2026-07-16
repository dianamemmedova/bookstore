export type PlanCardProps = {
  variant: 'standard' | 'premium'
  badge: string
  title: string
  price: string
  priceNote: string
  benefits: { text: string }[]
  buttonText: string
  ribbon?: string
}