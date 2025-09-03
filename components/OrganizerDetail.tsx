import { Organizer, Event } from '@/types'
import Link from 'next/link'

interface OrganizerDetailProps {
  organizer: Organizer
  events: Event[]
}

export default function OrganizerDetail({ organizer, events }: OrganizerDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-8">
              {organizer.metadata?.profile_photo?.imgix_url ? (
                <img
                  src={`${organizer.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={organizer.metadata?.name || organizer.title}
                  className="w-24 h-24 rounded-full object-cover mr-6"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mr-6">
                  <span className="text-white text-3xl font-bold">
                    {(organizer.metadata?.name || organizer.title).charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {organizer.metadata?.name || organizer.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{events.length} events organized</span>
                  {organizer.metadata?.email && (
                    <a
                      href={`mailto:${organizer.metadata.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {organizer.metadata.email}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {organizer.metadata?.bio && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {organizer.metadata.bio}
                </p>
              </div>
            )}

            {organizer.metadata?.website && (
              <div className="mb-8">
                <a
                  href={organizer.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {events.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Organized Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 mb-1">
                        {event.metadata?.event_title || event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {event.metadata?.event_datetime && 
                          new Date(event.metadata.event_datetime).toLocaleDateString()
                        }
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.metadata?.location}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}