import { Organizer, Event } from '@/types'
import EventGrid from '@/components/EventGrid'

interface OrganizerDetailProps {
  organizer: Organizer
  events: Event[]
}

export default function OrganizerDetail({ organizer, events }: OrganizerDetailProps) {
  const profilePhoto = organizer.metadata?.profile_photo

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {profilePhoto ? (
            <img
              src={`${profilePhoto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={organizer.metadata?.name || organizer.title}
              className="w-32 h-32 rounded-full object-cover"
              width={128}
              height={128}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-4xl">👤</span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {organizer.metadata?.name || organizer.title}
            </h1>
            
            {organizer.metadata?.bio && (
              <p className="text-gray-600 text-lg mb-4">
                {organizer.metadata.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {organizer.metadata?.website && (
                <a
                  href={organizer.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Website
                </a>
              )}
              
              {organizer.metadata?.email && (
                <a
                  href={`mailto:${organizer.metadata.email}`}
                  className="btn-secondary"
                >
                  Contact
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Events by {organizer.metadata?.name || organizer.title}
        </h2>
        <p className="text-gray-600 mt-2">
          {events.length} event{events.length !== 1 ? 's' : ''} organized
        </p>
      </div>

      <EventGrid events={events} />
    </div>
  )
}