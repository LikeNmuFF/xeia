export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

export const defaultTimeline: TimelineEvent[] = [
  {
    id: 'first-date',
    title: 'First Date',
    date: 'July 24, 2025',
    description: 'Our first official date at the coffee shop downtown. We talked for hours and knew there was something special between us.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
    location: 'Downtown Coffee Shop',
  },
  {
    id: 'first-kiss',
    title: 'First Kiss',
    date: 'August 2, 2025',
    description: 'Under the stars at the city park. It was magical and we both knew our feelings were real.',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
    location: 'City Park',
  },
  {
    id: 'official',
    title: 'Made it Official',
    date: 'September 1, 2025',
    description: 'We decided to be exclusive and start our journey together officially. No more dating apps, just us.',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf',
    location: 'Our favorite restaurant',
  },
  {
    id: 'first-trip',
    title: 'First Trip Together',
    date: 'October 15-18, 2025',
    description: 'Our weekend getaway to the Blue Ridge Mountains. First of many adventures together.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5',
    location: 'Blue Ridge Mountains',
  },
  {
    id: 'thanksgiving',
    title: 'Met the Family',
    date: 'November 22, 2025',
    description: 'Thanksgiving with both families. Everyone could see how happy we make each other.',
    imageUrl: 'https://images.unsplash.com/photo-1519412659092-378457253339',
    location: 'Erica\'s parents home',
  },
  {
    id: 'first-anniversary',
    title: '6 Months Anniversary',
    date: 'January 24, 2026',
    description: 'Celebrated 6 months together with a romantic dinner and promises of forever.',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486',
    location: 'The Riverview Restaurant',
  },
  {
    id: 'valentines',
    title: 'First Valentine\'s Day',
    date: 'February 14, 2026',
    description: 'Our first Valentine\'s Day together. Roses, chocolate, and lots of love.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    location: 'Home',
  },
  {
    id: 'moving-in',
    title: 'Moved In Together',
    date: 'March 1, 2026',
    description: 'Took the big step and started living together. Every day since has been amazing.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    location: 'Our first apartment',
  },
  {
    id: 'vacation',
    title: 'Summer Beach Vacation',
    date: 'July 1-7, 2026',
    description: 'A week of sun, sand, and relaxation. Our first real vacation together.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    location: 'Outer Banks, NC',
  },
  {
    id: '18-months',
    title: '18 Months of Love',
    date: 'January 24, 2027',
    description: '18 beautiful months of love, laughter, and growing together. Here\'s to forever.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
    location: 'Wherever we are',
  },
];

export default defaultTimeline;
