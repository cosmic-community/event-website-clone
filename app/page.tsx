import { getEvents, getCategories } from '@/lib/cosmic'
import EventGrid from '@/components/EventGrid'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [events, categories] = await Promise.all([
    getEvents(),
    getCategories()
  ])

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

        <EventGrid events={events} />
      </div>
    </div>
  )
}