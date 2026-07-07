import { Destination, Offer } from '../types/models';

export const destinations: Destination[] = [
  { id: 'airport', name: 'Deoghar Airport', from: 'Deoghar', distanceKm: 12, kind: 'airport' },
  { id: 'basukinath', name: 'Basukinath', from: 'Deoghar', distanceKm: 43, kind: 'temple' },
  { id: 'tarapith', name: 'Tarapith', from: 'Deoghar', distanceKm: 125, kind: 'temple' },
  { id: 'kolkata', name: 'Kolkata', from: 'Deoghar', distanceKm: 320, kind: 'city' },
  { id: 'patna', name: 'Patna', from: 'Deoghar', distanceKm: 280, kind: 'city' },
  { id: 'gaya', name: 'Gaya', from: 'Deoghar', distanceKm: 250, kind: 'temple' },
  { id: 'varanasi', name: 'Varanasi', from: 'Deoghar', distanceKm: 445, kind: 'temple' },
  { id: 'ranchi', name: 'Ranchi', from: 'Deoghar', distanceKm: 250, kind: 'city' },
  { id: 'jamshedpur', name: 'Jamshedpur', from: 'Deoghar', distanceKm: 330, kind: 'city' },
  { id: 'puri', name: 'Jagannath Puri', from: 'Deoghar', distanceKm: 800, kind: 'temple' },
];

export const offers: Offer[] = [
  {
    id: 'round-trip',
    title: 'Round trips, better rates',
    subtitle: 'Book a return journey together and ask for the round-trip fare.',
    tag: 'Popular',
  },
  {
    id: 'airport-fixed',
    title: 'Airport transfers, fixed quotes',
    subtitle: 'Deoghar Airport pickup & drop at a fixed price — no surprises.',
    tag: 'Fixed fare',
  },
  {
    id: 'pilgrimage',
    title: 'Full pilgrimage packages',
    subtitle: 'Cabs, hotels, darshan and puja — arranged end to end.',
    tag: 'End to end',
  },
];
