import { useCallback, useState } from 'react';
import { Booking } from '../types/models';
import { listBookings, saveBooking, updateBookingStatus } from '../services/bookings';

/** Booking history lives in MMKV; this hook keeps React state in sync. */
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(listBookings);

  const refresh = useCallback(() => setBookings(listBookings()), []);

  const add = useCallback((b: Booking) => {
    setBookings(saveBooking(b));
  }, []);

  const setStatus = useCallback((id: string, status: Booking['status']) => {
    setBookings(updateBookingStatus(id, status));
  }, []);

  return { bookings, add, setStatus, refresh };
}
