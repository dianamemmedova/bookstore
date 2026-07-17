export function getPayMethodLabel(method: string): string {
  return method === 'card' ? '💳 Kart' : '💸 Nağd'
}

export function getOrderAddress(delivery: {
  city: string
  street: string
  building?: string
  apartment?: string
}): string {
  return [
    delivery.city,
    delivery.street,
    delivery.building  && `Bina ${delivery.building}`,
    delivery.apartment && `Mənzil ${delivery.apartment}`,
  ].filter(Boolean).join(', ')
}

// unvan sətirini dinamik şəkildə qururuq