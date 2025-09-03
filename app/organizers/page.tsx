import { getOrganizers, getEvents } from '@/lib/cosmic'
import { Organizer, Event } from '@/types'
import Link from 'next/link'

export default async function OrganizersPage() {
  const [organizers, events] = await Promise.all([
    getOrganizers(),
    getEvents()
  ])

  const getOrganizerEventCount = (organizerId: string): number => {
    return events.filter(event => event.metadata?.organizer?.id === organizerId).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Organizers
          </h1>
          <p className="text-xl text-gray-600">
            Meet the passionate people behind our community events.
          </p>
        </div>

        {organizers.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No organizers found</h3>
            <p className="text-gray-600">Check back later for new organizers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizers.map((organizer) => (
              <Link
                key={organizer.id}
                href={`/organizers/${organizer.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {organizer.metadata?.profile_photo?.imgix_url ? (
                      <img
                        src={`${organizer.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                        alt={organizer.metadata?.name || organizer.title}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="text-white text-xl font-bold">
                          {(organizer.metadata?.name || organizer.title).charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {organizer.metadata?.name || organizer.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {getOrganizerEventCount(organizer.id)} events organized
                      </p>
                    </div>
                  </div>
                  
                  {organizer.metadata?.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {organizer.metadata.bio}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    {organizer.metadata?.website && (
                      <span className="text-primary hover:text-primary/80 transition-colors">
                        Visit Website →
                      </span>
                    )}
                    {organizer.metadata?.email && (
                      <span className="text-gray-500">
                        {organizer.metadata.email}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}