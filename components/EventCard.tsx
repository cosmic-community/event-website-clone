import { Event } from '@/types'
import Link from 'next/link'

interface EventCardProps {
  event: Event
  className?: string
}

export default function EventCard({ event, className = '' }: EventCardProps) {
  const eventDate = event.metadata?.event_datetime
  const organizer = event.metadata?.organizer
  const category = event.metadata?.category
  const featuredImage = event.metadata?.featured_image

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className={`event-card overflow-hidden ${className}`}>
      <Link href={`/events/${event.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={event.metadata?.event_title || event.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              width={400}
              height={200}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <span className="text-primary text-6xl">🎉</span>
            </div>
          )}
          
          {category && (
            <div className="absolute top-3 left-3">
              <span 
                className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full"
                style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
              >
                {category.metadata?.name || category.title}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">
              <div className="font-medium">{formatDate(eventDate)}</div>
              {formatTime(eventDate) && (
                <div>{formatTime(eventDate)}</div>
              )}
            </div>
            {event.metadata?.price && (
              <div className="text-sm font-semibold text-primary">
                {event.metadata.price}
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {event.metadata?.event_title || event.title}
          </h3>

          {event.metadata?.location && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-1">
              📍 {event.metadata.location}
            </p>
          )}

          {organizer && (
            <div className="flex items-center">
              {organizer.metadata?.profile_photo ? (
                <img
                  src={`${organizer.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={organizer.metadata?.name || organizer.title}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-gray-500 text-sm">👤</span>
                </div>
              )}
              <span className="text-sm text-gray-600">
                {organizer.metadata?.name || organizer.title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}