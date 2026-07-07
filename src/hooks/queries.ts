import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useVehicles = () =>
  useQuery({ queryKey: ['vehicles'], queryFn: api.fetchVehicles });

export const useReviews = () =>
  useQuery({ queryKey: ['reviews'], queryFn: api.fetchReviews });

export const usePackages = () =>
  useQuery({ queryKey: ['packages'], queryFn: api.fetchPackages });

export const useDestinations = () =>
  useQuery({ queryKey: ['destinations'], queryFn: api.fetchDestinations });

export const useOffers = () =>
  useQuery({ queryKey: ['offers'], queryFn: api.fetchOffers });
