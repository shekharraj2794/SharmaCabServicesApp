import { getJSON, setJSON, StorageKeys } from './storage';
import { Booking, TripType, Vehicle } from '../types/models';
import { links } from './links';
import { company } from '../data/company';

export const tripTypeLabels: Record<TripType, string> = {
  oneWay: 'One way',
  roundTrip: 'Round trip',
  airport: 'Airport',
  hourly: 'Hourly rental',
};

/** Promo codes are indicative goodwill discounts the owner honours manually. */
const promos: Record<string, number> = {
  SHARMA10: 0.1,
  DARSHAN5: 0.05,
};

export function promoDiscount(code: string): number | undefined {
  return promos[code.trim().toUpperCase()];
}

/**
 * Indicative fare only — the app is explicit everywhere that the final
 * fare is confirmed by the owner on WhatsApp before the trip.
 */
export function estimateFare(
  vehicle: Vehicle,
  distanceKm: number,
  tripType: TripType,
  promo?: string,
): number {
  const km = Math.max(distanceKm, vehicle.minKm);
  let fare = km * vehicle.perKmRate;
  if (tripType === 'roundTrip') {
    fare = fare * 2 * 0.9;
  }
  if (tripType === 'hourly') {
    fare = Math.max(fare, 8 * 10 * vehicle.perKmRate * 0.8);
  }
  const discount = promo ? promoDiscount(promo) ?? 0 : 0;
  return Math.round((fare * (1 - discount)) / 10) * 10;
}

export function listBookings(): Booking[] {
  return getJSON<Booking[]>(StorageKeys.bookings) ?? [];
}

export function saveBooking(booking: Booking): Booking[] {
  const all = [booking, ...listBookings()];
  setJSON(StorageKeys.bookings, all);
  return all;
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking[] {
  const all = listBookings().map(b => (b.id === id ? { ...b, status } : b));
  setJSON(StorageKeys.bookings, all);
  return all;
}

export function newBookingCode(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `SC-${n}`;
}

export function whatsappMessageFor(b: Booking): string {
  return [
    `Hi, I'd like to book a cab with ${company.name}.`,
    `Booking code: ${b.code}`,
    `Trip: ${tripTypeLabels[b.tripType]}`,
    `Pickup: ${b.pickup}`,
    `Drop: ${b.drop}`,
    `Date: ${b.dateISO} · ${b.timeSlot}`,
    `Vehicle: ${b.vehicleName}`,
    `App estimate: ₹${b.fareEstimate} (please confirm final fare)`,
    b.promoCode ? `Promo: ${b.promoCode}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function sendBookingToWhatsApp(b: Booking): void {
  links.whatsapp(whatsappMessageFor(b));
}
