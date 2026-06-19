import BookThumb from './BookThumb'
import type { Order } from '../../types/order'

interface Props {
  items: Order['items']
}

export default function OrderThumbnails({ items }: Props) {
  return (
    <div className="px-5 pb-4 flex gap-2 overflow-x-auto">
      {items.map(item => (
        <BookThumb
          key={item.id}
          id={item.id}
          title={item.title}
          cover={item.cover}
          quantity={item.quantity}
          size="md"
        />
      ))}
    </div>
  )
}