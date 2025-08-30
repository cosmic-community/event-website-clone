export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing
            <span className="block text-primary">Events</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with like-minded people, learn new skills, and grow your network. 
            Find networking events, tech talks, workshops, and more happening in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary text-lg px-8 py-3">
              Explore Events
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Host an Event
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}