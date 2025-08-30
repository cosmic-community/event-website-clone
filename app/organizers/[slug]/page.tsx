// app/organizers/[slug]/page.tsx
import { getOrganizer, getEvents } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import OrganizerDetail from '@/components/OrganizerDetail'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const organizer = await getOrganizer(slug)

  if (!organizer) {
    return {
      title: 'Organizer Not Found - EventHub',
    }
  }

  return {
    title: `${organizer.metadata?.name || organizer.title} - EventHub`,
    description: organizer.metadata?.bio || 'Learn more about this event organizer on EventHub',
  }
}

export default async function OrganizerPage({ params }: PageProps) {
  const { slug } = await params
  const [organizer, events] = await Promise.all([
    getOrganizer(slug),
    getEvents()
  ])

  if (!organizer) {
    notFound()
  }

  // Filter events by this organizer
  const organizerEvents = events.filter(event => 
    event.metadata?.organizer?.id === organizer.id
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <OrganizerDetail organizer={organizer} events={organizerEvents} />
    </div>
  )
}