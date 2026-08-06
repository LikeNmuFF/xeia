export interface GalleryItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  type: 'gallery' | 'photobooth';
  createdAt: string;
  location?: string;
  tags?: string[];
}

export const defaultGallery: GalleryItem[] = [
  {
    id: 'first-date-photo',
    filename: 'first-date.jpg',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop',
    caption: 'Our first date - July 24, 2025',
    type: 'gallery',
    createdAt: '2025-07-24T19:00:00',
    location: 'Downtown Coffee Shop',
    tags: ['firsts', 'romantic'],
  },
  {
    id: 'first-kiss-photo',
    filename: 'first-kiss.jpg',
    url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
    caption: 'First kiss under the stars',
    type: 'gallery',
    createdAt: '2025-08-02T21:30:00',
    location: 'City Park',
    tags: ['firsts', 'romantic'],
  },
  {
    id: 'mountain-trip-1',
    filename: 'mountain-view.jpg',
    url: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=300&h=300&fit=crop',
    caption: 'Mountain views from our cabin',
    type: 'gallery',
    createdAt: '2025-10-16T10:00:00',
    location: 'Blue Ridge Mountains',
    tags: ['nature', 'trip'],
  },
  {
    id: 'mountain-trip-2',
    filename: 'us-at-cabin.jpg',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&h=300&fit=crop',
    caption: 'Cozy cabin selfie',
    type: 'gallery',
    createdAt: '2025-10-16T14:00:00',
    location: 'Blue Ridge Mountains',
    tags: ['us', 'trip', 'selfie'],
  },
  {
    id: 'thanksgiving-photo',
    filename: 'thanksgiving-dinner.jpg',
    url: 'https://images.unsplash.com/photo-1519412659092-378457253339?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519412659092-378457253339?w=300&h=300&fit=crop',
    caption: 'Thanksgiving with the family',
    type: 'gallery',
    createdAt: '2025-11-22T18:00:00',
    location: 'Erica\'s parents home',
    tags: ['family', 'holiday'],
  },
  {
    id: '6-months-photo',
    filename: '6-months-dinner.jpg',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop',
    caption: '6 months celebration dinner',
    type: 'gallery',
    createdAt: '2026-01-24T20:00:00',
    location: 'The Riverview Restaurant',
    tags: ['anniversary', 'romantic'],
  },
  {
    id: 'valentines-2026',
    filename: 'valentines-gift.jpg',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=300&fit=crop',
    caption: 'Valentine\'s Day 2026',
    type: 'gallery',
    createdAt: '2026-02-14T19:00:00',
    location: 'Home',
    tags: ['valentines', 'gifts'],
  },
  {
    id: 'moving-day-1',
    filename: 'empty-apartment.jpg',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    caption: 'Our empty apartment on moving day',
    type: 'gallery',
    createdAt: '2026-03-01T10:00:00',
    location: 'Our first apartment',
    tags: ['moving', 'new beginnings'],
  },
  {
    id: 'moving-day-2',
    filename: 'first-night.jpg',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    caption: 'First night in our new place',
    type: 'gallery',
    createdAt: '2026-03-01T22:00:00',
    location: 'Our first apartment',
    tags: ['moving', 'home'],
  },
  {
    id: 'beach-vacation-1',
    filename: 'beach-sunset.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop',
    caption: 'Sunset at the beach',
    type: 'gallery',
    createdAt: '2026-07-03T19:30:00',
    location: 'Outer Banks, NC',
    tags: ['beach', 'vacation', 'sunset'],
  },
  {
    id: 'beach-vacation-2',
    filename: 'us-at-beach.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop',
    caption: 'Beach day together',
    type: 'gallery',
    createdAt: '2026-07-04T14:00:00',
    location: 'Outer Banks, NC',
    tags: ['beach', 'vacation', 'us'],
  },
];

export default defaultGallery;
