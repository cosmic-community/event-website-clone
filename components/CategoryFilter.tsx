'use client'

import { Category } from '@/types'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: Category[]
  className?: string
}

export default function CategoryFilter({ categories, className = '' }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!categories || categories.length === 0) {
    return null
  }

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // In a real app, this would trigger filtering logic
    // For now, it's just visual feedback
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Events
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category.id
              ? 'text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={selectedCategory === category.id ? {
            backgroundColor: category.metadata?.color || '#3b82f6'
          } : {}}
        >
          {category.metadata?.name || category.title}
        </button>
      ))}
    </div>
  )
}