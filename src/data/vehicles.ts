import { Vehicle } from '../types/models';
import { images } from '../assets/images';

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
    image: images.dzire,
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
    image: images.tigor,
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
    image: images.fronx,
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
    image: images.innova,
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
    image: images.ertiga,
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
    image: images.traveller,
    perKmRate: 26,
    minKm: 80,
    features: ['High roof', '16 seats', 'Curtains', 'Group pilgrimages'],
    rating: 5,
    category: 'traveller',
  },
];

export const vehicleById = (id: string): Vehicle | undefined =>
  vehicles.find(v => v.id === id);
