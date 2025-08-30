# EventHub - Luma Event Website Clone

A modern event discovery platform inspired by Luma, built with Next.js and powered by Cosmic CMS. EventHub provides a beautiful, responsive interface for browsing events, learning about organizers, and discovering upcoming opportunities.

![App Preview](https://imgix.cosmicjs.com/53731940-85cc-11f0-8dcc-651091f6a7c0-photo-1556761175-b413da4baf72-1756577300737.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## ✨ Features

- **Event Discovery**: Browse beautifully designed event cards with rich imagery and key information
- **Category Filtering**: Filter events by categories (Networking, Tech Talks, Workshops)
- **Organizer Profiles**: View detailed organizer information with photos and bios
- **Event Details**: Comprehensive event pages with descriptions, pricing, capacity, and location
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **Modern UI**: Clean interface with Inter font and professional styling
- **TypeScript**: Full type safety with comprehensive type definitions
- **Image Optimization**: High-quality images with imgix optimization

## Clone this Project

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a Luma event website clone

### Code Generation Prompt

> Create a Luma event website clone using Next.js

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Inter Font** - Modern typography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the EventHub content structure

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd eventhub
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching Events with Relationships
```typescript
// Get events with organizer and category data
const events = await cosmic.objects
  .find({ type: 'events' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Category-based Filtering
```typescript
// Filter events by category
const categoryEvents = await cosmic.objects
  .find({ 
    type: 'events',
    'metadata.category': categoryId 
  })
  .depth(1);
```

## 🎨 Cosmic CMS Integration

EventHub integrates seamlessly with your Cosmic CMS content structure:

### Content Types
- **Events**: Main event objects with title, description, date, location, and relationships
- **Organizers**: Event organizer profiles with photos, bios, and contact information  
- **Categories**: Event categories with names, descriptions, and color coding

### Key Features
- Object relationships between Events → Organizers and Events → Categories
- Rich HTML content for event descriptions
- Image management with automatic optimization
- Select dropdown for event types (In Person, Online, Hybrid)

## 🚀 Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` or `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
Set these variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

The application will automatically use these credentials to fetch your Cosmic content.
