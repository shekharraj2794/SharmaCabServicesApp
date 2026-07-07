import { Milestone } from '../types/models';

export const company = {
  name: 'Sharma Cab Services',
  shortName: 'Sharma Cabs',
  city: 'Deoghar, Jharkhand',
  phonePrimary: '+918778735540',
  phoneSecondary: '+919523198324',
  phonePrimaryDisplay: '+91 87787 35540',
  phoneSecondaryDisplay: '+91 95231 98324',
  whatsappNumber: '918778735540',
  email: 'sharmacabservices.deoghar@gmail.com',
  website: 'https://deoghartaxiservices.netlify.app',
  googleMapsQuery: 'Sharma Cab Service Deoghar',
  justdialUrl:
    'https://www.justdial.com/Deoghar-Jharkhand/SHARMA-CAB-SERVICE-Near-By-Jack-N-Jill-School-Deoghar/9999P6432-6432-260223152738-A1Z3_BZDET',
  rating: 5.0,
  reviewCount: 85,
  tagline: 'Your journey, beautifully driven.',
  supportLine: "Deoghar's most reliable, comfortable & affordable taxi service",
  mission:
    'Show up on time, keep the car spotless, and treat every passenger like family — on every single ride.',
  vision:
    'To be the cab service every traveller in Jharkhand books without a second thought, from airport runs to pilgrimages.',
};

export const stats = [
  { label: 'Google rating', value: 5, decimals: 1 },
  { label: 'Five-star reviews', value: 85, suffix: '+' },
  { label: 'Vehicle options', value: 6, suffix: '+' },
  { label: 'On the road', value: 24, suffix: '×7' },
] as const;

export const milestones: Milestone[] = [
  {
    year: 'The promise',
    title: 'One car, one rule',
    text: 'Sharma Cab Services began in Deoghar with a simple promise: on time, spotless, and personally supervised.',
  },
  {
    year: 'The routes',
    title: 'Beyond the city',
    text: 'Riders started booking outstation — Kolkata, Patna, Varanasi, Tarapith — and kept coming back.',
  },
  {
    year: 'The fleet',
    title: 'Six vehicles strong',
    text: 'From the nimble Dzire to a 16-seat Force Traveller for full pilgrimage groups.',
  },
  {
    year: 'Today',
    title: '5.0 on Google',
    text: '85+ five-star reviews. The owner still checks in on every night journey.',
  },
];
