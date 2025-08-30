import { Event } from '@/types'
import EventCard from '@/components/EventCard'

interface EventGridProps {
  events: Event[]
  className?: string
}

export default function EventGrid({ events, className = '' }: EventGridProps) {
  if (!events || events.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-600">Check back later for new events.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}