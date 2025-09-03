// app/categories/[slug]/page.tsx
import { getEventsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import EventGrid from '@/components/EventGrid'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  const [categories, events] = await Promise.all([
    getCategories(),
    getEventsByCategory(slug)
  ])

  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-primary">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {category.metadata?.name || category.title}
            </span>
          </nav>

          <div className="flex items-center mb-4">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
            >
              <span className="text-white text-2xl font-bold">
                {(category.metadata?.name || category.title).charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {category.metadata?.name || category.title}
              </h1>
              {category.metadata?.description && (
                <p className="text-xl text-gray-600 mt-2">
                  {category.metadata.description}
                </p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {events.length} {events.length === 1 ? 'event' : 'events'} found
          </div>
        </div>

        <EventGrid events={events} />

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No events found in this category yet.
            </p>
            <Link
              href="/categories"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}