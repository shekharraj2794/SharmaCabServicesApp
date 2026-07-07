import axios from 'axios';
import { vehicles } from '../data/vehicles';
import { reviews } from '../data/reviews';
import { tourPackages } from '../data/packages';
import { destinations, offers } from '../data/destinations';
import { Destination, Offer, Review, TourPackage, Vehicle } from '../types/models';

/**
 * API layer. Today the business runs on WhatsApp bookings and static
 * content, so these resolve from bundled data behind a small simulated
 * latency (which exercises loading/skeleton states). When a real backend
 * exists, point `client` at it and replace the bodies — signatures stay.
 */
export const client = axios.create({
  baseURL: 'https://deoghartaxiservices.netlify.app',
  timeout: 12000,
});

const simulate = <T,>(data: T, ms = 450): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), ms));

export const api = {
  fetchVehicles: (): Promise<Vehicle[]> => simulate(vehicles),
  fetchReviews: (): Promise<Review[]> => simulate(reviews),
  fetchPackages: (): Promise<TourPackage[]> => simulate(tourPackages),
  fetchDestinations: (): Promise<Destination[]> => simulate(destinations, 300),
  fetchOffers: (): Promise<Offer[]> => simulate(offers, 300),
};
