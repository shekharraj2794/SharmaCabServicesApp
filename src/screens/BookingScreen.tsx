import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { Chip } from '../components/ui/Chip';
import { GlassCard } from '../components/ui/GlassCard';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PressableScale } from '../components/ui/PressableScale';
import { TextField } from '../components/ui/TextField';
import { vehicles } from '../data/vehicles';
import { destinations } from '../data/destinations';
import {
  estimateFare,
  newBookingCode,
  promoDiscount,
  saveBooking,
  tripTypeLabels,
} from '../services/bookings';
import { useHaptics } from '../hooks/useHaptics';
import { formatINR, nextDays, timeSlots } from '../utils/format';
import { Booking, TripType } from '../types/models';

const tripTypes: TripType[] = ['oneWay', 'roundTrip', 'airport', 'hourly'];

interface BookingParams {
  vehicleId?: string;
  drop?: string;
}

/** Booking form — works both as the centre tab and as a prefilled modal. */
export function BookingScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params ?? {}) as BookingParams;
  const haptics = useHaptics();

  const days = useMemo(() => nextDays(7), []);

  const [pickup, setPickup] = useState('Deoghar');
  const [drop, setDrop] = useState(params.drop ?? '');
  const [tripType, setTripType] = useState<TripType>(
    params.drop === 'Deoghar Airport' ? 'airport' : 'oneWay',
  );
  const [dateISO, setDateISO] = useState(days[0].iso);
  const [timeSlot, setTimeSlot] = useState(timeSlots[3]);
  const [vehicleId, setVehicleId] = useState(params.vehicleId ?? vehicles[1].id);
  const [distanceText, setDistanceText] = useState('');
  const [promo, setPromo] = useState('');
  const [dropError, setDropError] = useState<string | undefined>(undefined);

  const vehicle = vehicles.find(v => v.id === vehicleId) ?? vehicles[0];

  const knownDistance = useMemo(() => {
    const match = destinations.find(
      d => d.name.toLowerCase() === drop.trim().toLowerCase(),
    );
    return match?.distanceKm;
  }, [drop]);

  const distanceKm = knownDistance ?? (Number(distanceText) || vehicle.minKm);
  const promoValid = promo.length > 0 ? promoDiscount(promo) !== undefined : undefined;
  const fare = estimateFare(vehicle, distanceKm, tripType, promoValid ? promo : undefined);

  const bookRide = () => {
    if (!drop.trim()) {
      setDropError('Where are we headed? Add a drop location.');
      return;
    }
    setDropError(undefined);
    const booking: Booking = {
      id: `${Date.now()}`,
      code: newBookingCode(),
      pickup: pickup.trim() || 'Deoghar',
      drop: drop.trim(),
      dateISO,
      timeSlot,
      tripType,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      fareEstimate: fare,
      promoCode: promoValid ? promo.toUpperCase() : undefined,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    haptics.success();
    navigation.navigate('BookingSuccess', { bookingId: booking.id });
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.springify()}>
          <AppText variant="title">Book your ride</AppText>
          <AppText variant="body" muted style={styles.subtitle}>
            Instant estimate now — final fare confirmed by the owner on WhatsApp.
          </AppText>
        </Animated.View>

        {/* Trip type */}
        <Animated.View entering={FadeInDown.delay(60).springify()} style={styles.chipsRow}>
          {tripTypes.map(t => (
            <Chip
              key={t}
              label={tripTypeLabels[t]}
              selected={tripType === t}
              onPress={() => setTripType(t)}
            />
          ))}
        </Animated.View>

        {/* Route */}
        <Animated.View entering={FadeInDown.delay(120).springify()}>
          <TextField
            label="Pickup"
            icon="location-outline"
            value={pickup}
            onChangeText={setPickup}
            placeholder="Pickup point"
          />
          <TextField
            label="Drop"
            icon="navigate-outline"
            value={drop}
            onChangeText={t => {
              setDrop(t);
              if (dropError) {
                setDropError(undefined);
              }
            }}
            placeholder="e.g. Kolkata, Basukinath, Deoghar Airport"
            error={dropError}
          />
          {knownDistance === undefined ? (
            <TextField
              label="Approx. distance (km)"
              icon="speedometer-outline"
              value={distanceText}
              onChangeText={setDistanceText}
              placeholder={`${vehicle.minKm}`}
              keyboardType="number-pad"
            />
          ) : (
            <AppText variant="caption" muted style={styles.distanceNote}>
              ~{knownDistance} km route — we know this one well.
            </AppText>
          )}
        </Animated.View>

        {/* Date */}
        <Animated.View entering={FadeInDown.delay(180).springify()}>
          <AppText variant="label" muted style={styles.groupLabel}>
            DATE
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hGap}>
            {days.map(d => {
              const selected = d.iso === dateISO;
              return (
                <PressableScale key={d.iso} onPress={() => setDateISO(d.iso)}>
                  <View
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
                        borderColor: selected ? theme.colors.primary : theme.colors.border,
                      },
                    ]}>
                    <AppText
                      variant="caption"
                      color={selected ? 'rgba(255,255,255,0.85)' : theme.colors.textMuted}>
                      {d.dayName}
                    </AppText>
                    <AppText variant="heading" color={selected ? '#ffffff' : theme.colors.text}>
                      {d.dayNum}
                    </AppText>
                    <AppText
                      variant="caption"
                      color={selected ? 'rgba(255,255,255,0.85)' : theme.colors.textMuted}>
                      {d.month}
                    </AppText>
                  </View>
                </PressableScale>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Time */}
        <Animated.View entering={FadeInDown.delay(240).springify()}>
          <AppText variant="label" muted style={styles.groupLabel}>
            PICKUP TIME
          </AppText>
          <View style={styles.chipsWrap}>
            {timeSlots.map(t => (
              <Chip key={t} label={t} selected={t === timeSlot} onPress={() => setTimeSlot(t)} />
            ))}
          </View>
        </Animated.View>

        {/* Vehicle */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <AppText variant="label" muted style={styles.groupLabel}>
            VEHICLE
          </AppText>
          <View style={styles.chipsWrap}>
            {vehicles.map(v => (
              <Chip
                key={v.id}
                label={`${v.name} · ${v.seats}`}
                selected={v.id === vehicleId}
                onPress={() => setVehicleId(v.id)}
              />
            ))}
          </View>
        </Animated.View>

        {/* Promo */}
        <Animated.View entering={FadeInDown.delay(340).springify()}>
          <TextField
            label="Promo code (optional)"
            icon="pricetag-outline"
            value={promo}
            onChangeText={setPromo}
            autoCapitalize="characters"
            placeholder="SHARMA10"
            error={promoValid === false ? 'That code is not active.' : undefined}
          />
          {promoValid ? (
            <AppText variant="caption" color={theme.colors.success} style={styles.promoOk}>
              Promo applied — discount reflected in the estimate.
            </AppText>
          ) : null}
        </Animated.View>

        {/* Estimate + CTA */}
        <Animated.View layout={LinearTransition.springify()} entering={FadeInDown.delay(380).springify()}>
          <GlassCard style={styles.estimateCard}>
            <View style={styles.estimateRow}>
              <View>
                <AppText variant="caption" muted>
                  Fare estimate · {tripTypeLabels[tripType]}
                </AppText>
                <AppText variant="display" color={theme.colors.gold}>
                  {formatINR(fare)}
                </AppText>
                <AppText variant="caption" muted>
                  {vehicle.name} · ~{distanceKm} km
                </AppText>
              </View>
              <Ionicons name="sparkles-outline" size={26} color={theme.colors.gold} />
            </View>
            <AppText variant="caption" muted style={styles.disclaimer}>
              Indicative only. The owner confirms the final all-inclusive fare on WhatsApp
              before your trip — no surprises.
            </AppText>
          </GlassCard>
          <PremiumButton
            label="Book Ride"
            variant="gold"
            icon="arrow-forward"
            pulse
            onPress={bookRide}
            style={styles.bookBtn}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 140 },
  subtitle: { marginTop: 4, marginBottom: 16 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  groupLabel: { marginTop: 10, marginBottom: 10, letterSpacing: 1.2 },
  hGap: { gap: 10 },
  dayCell: {
    width: 64,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 2,
  },
  distanceNote: { marginTop: -6, marginBottom: 8 },
  promoOk: { marginTop: -8, marginBottom: 4 },
  estimateCard: { marginTop: 20 },
  estimateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  disclaimer: { marginTop: 10 },
  bookBtn: { marginTop: 16 },
});
