import { TourPackage } from '../types/models';
import { images } from '../assets/images';

export const tourPackages: TourPackage[] = [
  {
    id: 'city-tour',
    title: 'Temple & City Tour',
    image: images.cityTour,
    duration: 'Full day · at your pace',
    highlights: ['Baidyanath Dham darshan', 'Naulakha Temple', 'Puja arranged on request', 'Local guidance'],
    description:
      'Local sightseeing covering Baidyanath Dham, Naulakha Temple and every must-see spot in Deoghar — with darshan and puja arranged on request.',
    priceNote: 'Quoted per day · confirmed on WhatsApp',
  },
  {
    id: 'outstation',
    title: 'Outstation Journeys',
    image: images.outstation,
    duration: 'One-way & round trips',
    highlights: ['Kolkata · Patna · Varanasi', 'Gaya · Ranchi · Jamshedpur', 'Basukinath · Tarapith · Puri', 'Comfortable halts'],
    description:
      'Planned one-way drops and round trips with transparent pricing agreed before the trip and comfortable halts on the way.',
    priceNote: 'Transparent fare agreed up front',
  },
  {
    id: 'airport-transfer',
    title: 'Airport & Railway Transfers',
    image: images.airport,
    duration: 'On-time pickup & drop',
    highlights: ['Deoghar Airport', 'Railway stations', 'Luggage-friendly cars', 'Driver waiting on arrival'],
    description:
      'Punctual pickup and drop for Deoghar Airport and railway stations — luggage-friendly vehicles with the driver waiting when you land.',
    priceNote: 'Fixed quotes · no surprises',
  },
];
