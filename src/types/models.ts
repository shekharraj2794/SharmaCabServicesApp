export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  seats: number;
  imageUrl: string;
  perKmRate: number;
  minKm: number;
  features: string[];
  rating: number;
  badge?: string;
  category: 'sedan' | 'suv' | 'muv' | 'traveller';
}

export interface TourPackage {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  highlights: string[];
  description: string;
  priceNote: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  source: 'Google' | 'Justdial';
}

export interface Destination {
  id: string;
  name: string;
  from: string;
  distanceKm: number;
  emojiFree?: boolean;
  kind: 'city' | 'temple' | 'airport';
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
}

export type TripType = 'oneWay' | 'roundTrip' | 'airport' | 'hourly';

export type BookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  code: string;
  pickup: string;
  drop: string;
  dateISO: string;
  timeSlot: string;
  tripType: TripType;
  vehicleId: string;
  vehicleName: string;
  fareEstimate: number;
  promoCode?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
}
