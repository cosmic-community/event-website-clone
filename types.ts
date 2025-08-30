// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Event type literal for select-dropdown
type EventType = 'in_person' | 'online' | 'hybrid';

// Event interface
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    event_title?: string;
    description?: string;
    event_datetime?: string;
    location?: string;
    event_type?: {
      key: EventType;
      value: string;
    };
    capacity?: number;
    price?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    organizer?: Organizer;
    category?: Category;
  };
}

// Organizer interface
export interface Organizer extends CosmicObject {
  type: 'organizers';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    website?: string;
    email?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type === 'events';
}

export function isOrganizer(obj: CosmicObject): obj is Organizer {
  return obj.type === 'organizers';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type EventCardProps = {
  event: Event;
  className?: string;
};

export type OrganizerCardProps = {
  organizer: Organizer;
  className?: string;
};

export type CategoryFilterProps = {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (categoryId?: string) => void;
};