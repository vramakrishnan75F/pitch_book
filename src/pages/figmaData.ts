export const figmaSlots = [
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
  '9:00 PM - 10:00 PM',
]

export type FigmaVenue = {
  id: number
  name: string
  location: string
  distance: string
  rating: number
  reviews: number
  pricePerHour: number
  badge: string | null
  available: boolean
  amenities: string[]
  sport: string
  image: string
}

export const figmaVenues: FigmaVenue[] = [
  {
    id: 1,
    name: 'Elite Football Ground',
    location: 'Whitefield, Bangalore',
    distance: '1.2 km',
    rating: 4.9,
    reviews: 284,
    pricePerHour: 800,
    badge: 'Top Rated',
    available: true,
    amenities: ['Floodlights', 'Parking', 'Changing Room'],
    sport: 'Football',
    image:
      'https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'SkyLine Tennis Club',
    location: 'Koramangala, Bangalore',
    distance: '2.4 km',
    rating: 4.8,
    reviews: 192,
    pricePerHour: 600,
    badge: 'Trending',
    available: true,
    amenities: ['3 Courts', 'Cafe', 'Coaching'],
    sport: 'Tennis',
    image:
      'https://images.unsplash.com/photo-1761404984667-16d6c9158c59?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'BlueShuttle Badminton',
    location: 'Indiranagar, Bangalore',
    distance: '3.1 km',
    rating: 4.7,
    reviews: 438,
    pricePerHour: 350,
    badge: 'Popular',
    available: true,
    amenities: ['8 Courts', 'AC', 'Locker Room'],
    sport: 'Badminton',
    image:
      'https://images.unsplash.com/photo-1718452739586-5b467f1f109b?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Urban Hoops Arena',
    location: 'HSR Layout, Bangalore',
    distance: '4.8 km',
    rating: 4.6,
    reviews: 156,
    pricePerHour: 500,
    badge: null,
    available: false,
    amenities: ['Full Court', 'Flood Lights', 'Water'],
    sport: 'Basketball',
    image:
      'https://images.unsplash.com/photo-1590227632180-80a3bf110871?w=960&h=560&fit=crop&auto=format',
  },
]
