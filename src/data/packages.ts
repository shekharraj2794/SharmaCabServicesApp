import { TourPackage } from '../types/models';

const IMG = 'https://deoghartaxiservices.netlify.app/images';

export const tourPackages: TourPackage[] = [
  {
    id: 'city-tour',
    title: 'Temple & City Tour',
    imageUrl: `${IMG}/CityTour-f8331abc-4521-4036-bd88-eadbebd97731.png`,
    duration: 'Full day · at your pace',
    highlights: ['Baidyanath Dham darshan', 'Naulakha Temple', 'Puja arranged on request', 'Local guidance'],
    description:
      'Local sightseeing covering Baidyanath Dham, Naulakha Temple and every must-see spot in Deoghar — with darshan and puja arranged on request.',
    priceNote: 'Quoted per day · confirmed on WhatsApp',
  },
  {
    id: 'outstation',
    title: 'Outstation Journeys',
    imageUrl: `${IMG}/Outstations-7e57a70d-27e2-475d-af61-6f0c46bd3573.png`,
    duration: 'One-way & round trips',
    highlights: ['Kolkata · Patna · Varanasi', 'Gaya · Ranchi · Jamshedpur', 'Basukinath · Tarapith · Puri', 'Comfortable halts'],
    description:
      'Planned one-way drops and round trips with transparent pricing agreed before the trip and comfortable halts on the way.',
    priceNote: 'Transparent fare agreed up front',
  },
  {
    id: 'airport-transfer',
    title: 'Airport & Railway Transfers',
    imageUrl: `${IMG}/airport-0dbffe7f-2e39-430c-bfe4-1f217c74969c.png`,
    duration: 'On-time pickup & drop',
    highlights: ['Deoghar Airport', 'Railway stations', 'Luggage-friendly cars', 'Driver waiting on arrival'],
    description:
      'Punctual pickup and drop for Deoghar Airport and railway stations — luggage-friendly vehicles with the driver waiting when you land.',
    priceNote: 'Fixed quotes · no surprises',
  },
];
