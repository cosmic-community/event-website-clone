import { Event } from '@/types'
import Link from 'next/link'

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  const eventDate = event.metadata?.event_datetime
  const organizer = event.metadata?.organizer
  const category = event.metadata?.category
  const featuredImage = event.metadata?.featured_image

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {featuredImage && (
          <div className="aspect-video relative">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={event.metadata?.event_title || event.title}
              className="w-full h-full object-cover"
              width={600}
              height={300}
            />
            {category && (
              <div className="absolute top-4 left-4">
                <span 
                  className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
                  style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
                >
                  {category.metadata?.name || category.title}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {event.metadata?.event_title || event.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <span className="text-xl mr-2">📅</span>
                <div>
                  <div className="font-medium">{formatDate(eventDate)}</div>
                  {formatTime(eventDate) && (
                    <div className="text-sm">{formatTime(eventDate)}</div>
                  )}
                </div>
              </div>

              {event.metadata?.location && (
                <div className="flex items-center">
                  <span className="text-xl mr-2">📍</span>
                  <div>{event.metadata.location}</div>
                </div>
              )}

              {event.metadata?.event_type && (
                <div className="flex items-center">
                  <span className="text-xl mr-2">🎯</span>
                  <div>{event.metadata.event_type.value}</div>
                </div>
              )}

              {event.metadata?.capacity && (
                <div className="flex items-center">
                  <span className="text-xl mr-2">👥</span>
                  <div>{event.metadata.capacity} attendees</div>
                </div>
              )}

              {event.metadata?.price && (
                <div className="flex items-center">
                  <span className="text-xl mr-2">💰</span>
                  <div className="font-semibold text-primary">{event.metadata.price}</div>
                </div>
              )}
            </div>
          </div>

          {event.metadata?.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: event.metadata.description }}
              />
            </div>
          )}

          {organizer && (
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Organizer</h2>
              <Link href={`/organizers/${organizer.slug}`}>
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  {organizer.metadata?.profile_photo ? (
                    <img
                      src={`${organizer.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                      alt={organizer.metadata?.name || organizer.title}
                      className="w-16 h-16 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {organizer.metadata?.name || organizer.title}
                    </h3>
                    {organizer.metadata?.bio && (
                      <p className="text-gray-600 mt-1 line-clamp-3">
                        {organizer.metadata.bio}
                      </p>
                    )}
                    {organizer.metadata?.website && (
                      <p className="text-primary text-sm mt-2">
                        View Profile →
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button className="btn-primary text-lg px-8 py-3 flex-1 sm:flex-none">
              Register for Event
            </button>
            <button className="btn-secondary text-lg px-6 py-3">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}