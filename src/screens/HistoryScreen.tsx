import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { Chip } from '../components/ui/Chip';
import { PremiumButton } from '../components/ui/PremiumButton';
import { BookingCard } from '../components/cards/BookingCard';
import { useBookings } from '../hooks/useBookings';
import { sendBookingToWhatsApp } from '../services/bookings';
import { Booking } from '../types/models';

const filters = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
] as const;

type FilterKey = (typeof filters)[number]['key'];

export function HistoryScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { bookings, setStatus } = useBookings();
  const [filter, setFilter] = useState<FilterKey>('upcoming');

  const filtered = useMemo(() => {
    if (filter === 'upcoming') {
      return bookings.filter(b => b.status === 'requested' || b.status === 'confirmed');
    }
    return bookings.filter(b => b.status === filter);
  }, [bookings, filter]);

  const renderItem = ({ item, index }: { item: Booking; index: number }) => (
    <Animated.View entering={FadeInDown.delay(Math.min(index, 5) * 80).springify()}>
      <BookingCard
        booking={item}
        onWhatsApp={() => sendBookingToWhatsApp(item)}
        onCancel={
          filter === 'upcoming' ? () => setStatus(item.id, 'cancelled') : undefined
        }
        onRepeat={
          filter !== 'upcoming'
            ? () => navigation.navigate('BookingFlow', { vehicleId: item.vehicleId, drop: item.drop })
            : undefined
        }
      />
    </Animated.View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.pad}>
        <ScreenHeader title="Booking history" subtitle="Every ride, remembered" />
        <View style={styles.filters}>
          {filters.map(f => (
            <Chip
              key={f.key}
              label={f.label}
              selected={filter === f.key}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </View>
      </View>
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="car-sport-outline" size={54} color={theme.colors.textFaint} />
          <AppText variant="subheading" muted center>
            No {filter} rides yet
          </AppText>
          <AppText variant="caption" muted center style={styles.emptyText}>
            Book your first journey and it will show up here with its status and receipt.
          </AppText>
          <PremiumButton
            label="Book a ride"
            variant="gold"
            icon="arrow-forward"
            onPress={() => navigation.navigate('BookingFlow')}
          />
        </View>
      ) : (
        <FlashList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={b => b.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: 16 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  list: { paddingHorizontal: 16, paddingBottom: 60 },
  empty: { alignItems: 'center', gap: 12, marginTop: 70, paddingHorizontal: 40 },
  emptyText: { marginBottom: 8 },
});
