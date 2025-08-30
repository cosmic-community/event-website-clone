import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Events
            </Link>
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Categories
            </Link>
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Organizers
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="btn-primary">
              Host Event
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}