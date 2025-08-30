// app/events/[slug]/page.tsx
import { getEvent } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import EventDetail from '@/components/EventDetail'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    return {
      title: 'Event Not Found - EventHub',
    }
  }

  return {
    title: `${event.metadata?.event_title || event.title} - EventHub`,
    description: event.metadata?.description?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Discover this amazing event on EventHub',
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EventDetail event={event} />
    </div>
  )
}