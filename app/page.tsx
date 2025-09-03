import { getEvents, getCategories } from '@/lib/cosmic'
import EventGrid from '@/components/EventGrid'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const categoryFilter = params.category as string | undefined

  const [allEvents, categories] = await Promise.all([
    getEvents(),
    getCategories()
  ])

  // Filter events by category if a category is selected
  const filteredEvents = categoryFilter
    ? allEvents.filter(event => event.metadata?.category?.id === categoryFilter)
    : allEvents

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Events
          </h2>
          <p className="text-gray-600 text-lg">
            Find networking events, tech talks, workshops, and more happening near you.
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>

        <div className="mb-4">
          {categoryFilter && (
            <div className="text-sm text-gray-600">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} 
              {categoryFilter && ` in ${categories.find(cat => cat.id === categoryFilter)?.metadata?.name || 'selected category'}`}
            </div>
          )}
        </div>

        <EventGrid events={filteredEvents} />
      </div>
    </div>
  )
}