import { getCategories, getEvents } from '@/lib/cosmic'
import { Category, Event } from '@/types'
import Link from 'next/link'

export default async function CategoriesPage() {
  const [categories, events] = await Promise.all([
    getCategories(),
    getEvents()
  ])

  const getCategoryEventCount = (categoryId: string): number => {
    return events.filter(event => event.metadata?.category?.id === categoryId).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Categories
          </h1>
          <p className="text-xl text-gray-600">
            Browse events by category to find exactly what you're looking for.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Check back later for new categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
                    >
                      <span className="text-white text-xl font-bold">
                        {(category.metadata?.name || category.title).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {getCategoryEventCount(category.id)} events
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {category.metadata?.name || category.title}
                  </h3>
                  
                  {category.metadata?.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.metadata.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}