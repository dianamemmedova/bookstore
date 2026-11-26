import BookThumb from './BookThumb'
import type { Order } from '../../types/order'

export default function OrderThumbnails({ items }: { items: Order['items'] }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-3">
      {items.map(item => (
        <BookThumb key={item.id} id={item.id} title={item.title} cover={item.cover} quantity={item.quantity} size="md" />
      ))}
    </div>
  )
}