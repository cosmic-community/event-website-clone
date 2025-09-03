import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
              EventHub
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/organizers" className="text-gray-700 hover:text-primary transition-colors">
              Organizers
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="/categories" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/organizers" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">
              Organizers
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}