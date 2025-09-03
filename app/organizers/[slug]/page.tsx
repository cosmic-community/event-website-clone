// app/organizers/[slug]/page.tsx
import { getOrganizer, getEvents } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import OrganizerDetail from '@/components/OrganizerDetail'

interface OrganizerPageProps {
  params: Promise<{ slug: string }>
}

export default async function OrganizerPage({ params }: OrganizerPageProps) {
  const { slug } = await params
  
  const [organizer, allEvents] = await Promise.all([
    getOrganizer(slug),
    getEvents()
  ])

  if (!organizer) {
    notFound()
  }

  // Filter events by this organizer
  const organizerEvents = allEvents.filter(
    event => event.metadata?.organizer?.id === organizer.id
  )

  return <OrganizerDetail organizer={organizer} events={organizerEvents} />
}