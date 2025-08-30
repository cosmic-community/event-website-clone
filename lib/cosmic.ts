import { createBucketClient } from '@cosmicjs/sdk'
import { Event, Organizer, Category, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all events with related data
export async function getEvents(): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const events = response.objects as Event[];
    
    // Sort by date (newest first)
    return events.sort((a, b) => {
      const dateA = new Date(a.metadata?.event_datetime || '').getTime();
      const dateB = new Date(b.metadata?.event_datetime || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch events');
  }
}

// Get single event by slug
export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Event;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch event');
  }
}

// Get events by category
export async function getEventsByCategory(categoryId: string): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'events',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const events = response.objects as Event[];
    
    // Sort by date (newest first)
    return events.sort((a, b) => {
      const dateA = new Date(a.metadata?.event_datetime || '').getTime();
      const dateB = new Date(b.metadata?.event_datetime || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch events by category');
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get single organizer by slug
export async function getOrganizer(slug: string): Promise<Organizer | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'organizers', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Organizer;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch organizer');
  }
}

// Get all organizers
export async function getOrganizers(): Promise<Organizer[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'organizers' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Organizer[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch organizers');
  }
}