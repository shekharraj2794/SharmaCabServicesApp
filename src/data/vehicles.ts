import { Vehicle } from '../types/models';

const IMG = 'https://deoghartaxiservices.netlify.app/images';

/**
 * Per-km rates are indicative and used only for the in-app estimate.
 * The final fare is always confirmed by the owner on WhatsApp.
 */
export const vehicles: Vehicle[] = [
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    tagline: 'Smooth, efficient sedan for airport runs and outstation miles.',
    seats: 4,
    imageUrl: `${IMG}/Swift_Dzire-60984aca-9bf2-42cc-bbc1-e924daeb0f91.png`,
    perKmRate: 12,
    minKm: 30,
    features: ['AC', 'Spacious boot', 'Great mileage', 'Highway ready'],
    rating: 5,
    category: 'sedan',
  },
  {
    id: 'tata-tigor',
    name: 'Tata Tigor',
    tagline: 'Compact comfort with a premium feel for city travel.',
    seats: 4,
    imageUrl: `${IMG}/Tata_Tigor-d5bedc79-8518-440e-b794-25733f1d81fc.png`,
    perKmRate: 12,
    minKm: 30,
    features: ['AC', 'Premium cabin', 'City friendly', 'Clean interiors'],
    rating: 5,
    badge: 'Most booked',
    category: 'sedan',
  },
  {
    id: 'maruti-fronx',
    name: 'Maruti Fronx',
    tagline: 'Bold crossover stance — made for scenic weekend drives.',
    seats: 4,
    imageUrl: `${IMG}/Fronx_-89e54912-3730-4c15-9321-37c5ac053380.png`,
    perKmRate: 14,
    minKm: 30,
    features: ['AC', 'High seating', 'New car', 'Weekend getaways'],
    rating: 5,
    category: 'suv',
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    tagline: 'Premium MPV — the family favourite for long-distance comfort.',
    seats: 7,
    imageUrl: `${IMG}/InnovaCrysta-930fd43f-5876-4f40-8d34-389ec5072e05.png`,
    perKmRate: 18,
    minKm: 50,
    features: ['AC', 'Captain comfort', 'Big luggage room', 'Elders friendly'],
    rating: 5,
    badge: 'Family favourite',
    category: 'muv',
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    tagline: 'Flexible seven-seater for groups and temple tours.',
    seats: 7,
    imageUrl: `${IMG}/Ertiga-6e7db7a2-c45b-40f3-9b53-0c1ac2cb461b.png`,
    perKmRate: 16,
    minKm: 40,
    features: ['AC', '7 seats', 'Economical', 'Temple tours'],
    rating: 5,
    category: 'muv',
  },
  {
    id: 'force-traveller',
    name: 'Force Traveller',
    tagline: 'High-roof 16-seater for big family outings and pilgrimages.',
    seats: 16,
    imageUrl: `${IMG}/ForceTraveller-5315aaaa-e573-415b-9c50-73ac99182ae3.png`,
    perKmRate: 26,
    minKm: 80,
    features: ['High roof', '16 seats', 'Curtains', 'Group pilgrimages'],
    rating: 5,
    category: 'traveller',
  },
];

export const vehicleById = (id: string): Vehicle | undefined =>
  vehicles.find(v => v.id === id);
