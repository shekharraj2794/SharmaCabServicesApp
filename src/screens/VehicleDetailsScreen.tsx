import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { Chip } from '../components/ui/Chip';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PressableScale } from '../components/ui/PressableScale';
import { RatingStars } from '../components/ui/RatingStars';
import { vehicleById } from '../data/vehicles';
import { getJSON, setJSON, StorageKeys } from '../services/storage';
import { formatINR } from '../utils/format';
import { RootScreenProps } from '../navigation/types';

/** Vehicle detail: Ken Burns hero image, specs grid, features, sticky booking CTA. */
export function VehicleDetailsScreen({ route, navigation }: RootScreenProps<'VehicleDetails'>) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const vehicle = vehicleById(route.params.vehicleId);

  const zoom = useSharedValue(1);
  useEffect(() => {
    zoom.value = withRepeat(
      withTiming(1.08, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [zoom]);
  const kenBurns = useAnimatedStyle(() => ({ transform: [{ scale: zoom.value }] }));

  const [fav, setFav] = React.useState<boolean>(() =>
    (getJSON<string[]>(StorageKeys.favorites) ?? []).includes(route.params.vehicleId),
  );
  const toggleFav = () => {
    const all = getJSON<string[]>(StorageKeys.favorites) ?? [];
    const next = fav ? all.filter(id => id !== route.params.vehicleId) : [...all, route.params.vehicleId];
    setJSON(StorageKeys.favorites, next);
    setFav(!fav);
  };

  if (!vehicle) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
        <AppText variant="body" center style={styles.notFound}>
          Vehicle not found.
        </AppText>
      </SafeAreaView>
    );
  }

  const specs = [
    { icon: 'people-outline', label: 'Seats', value: `${vehicle.seats}` },
    { icon: 'speedometer-outline', label: 'Per km', value: `${formatINR(vehicle.perKmRate)}` },
    { icon: 'navigate-outline', label: 'Min trip', value: `${vehicle.minKm} km` },
    { icon: 'star', label: 'Rating', value: vehicle.rating.toFixed(1) },
  ] as const;

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Gallery */}
        <View style={[styles.gallery, { height: width * 0.66 }]}>
          <Animated.View style={[StyleSheet.absoluteFill, kenBurns]}>
            <Image
              source={{ uri: vehicle.imageUrl }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          </Animated.View>
          <SafeAreaView edges={['top']} style={styles.galleryBar}>
            <PressableScale onPress={() => navigation.goBack()} accessibilityLabel="Go back">
              <View style={styles.roundBtn}>
                <Ionicons name="chevron-back" size={20} color="#ffffff" />
              </View>
            </PressableScale>
            <PressableScale onPress={toggleFav} accessibilityLabel="Toggle favourite">
              <View style={styles.roundBtn}>
                <Ionicons
                  name={fav ? 'heart' : 'heart-outline'}
                  size={20}
                  color={fav ? '#fbbf24' : '#ffffff'}
                />
              </View>
            </PressableScale>
          </SafeAreaView>
          {vehicle.badge ? (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <AppText variant="caption" color="#ffffff" style={styles.badgeText}>
                {vehicle.badge.toUpperCase()}
              </AppText>
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.titleRow}>
            <View style={styles.titleCol}>
              <AppText variant="title">{vehicle.name}</AppText>
              <RatingStars rating={vehicle.rating} showValue />
            </View>
            <Chip label={`${vehicle.seats} seats`} selected gold />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(160).springify()}>
            <AppText variant="body" muted>
              {vehicle.tagline}
            </AppText>
          </Animated.View>

          {/* Specs grid */}
          <Animated.View entering={FadeInDown.delay(240).springify()} style={styles.specGrid}>
            {specs.map(s => (
              <View
                key={s.label}
                style={[
                  styles.specCell,
                  { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}>
                <Ionicons name={s.icon} size={18} color={theme.colors.primary} />
                <AppText variant="subheading">{s.value}</AppText>
                <AppText variant="caption" muted>
                  {s.label}
                </AppText>
              </View>
            ))}
          </Animated.View>

          {/* Features */}
          <Animated.View entering={FadeInDown.delay(320).springify()}>
            <AppText variant="heading" style={styles.sectionTitle}>
              What you get
            </AppText>
            <View style={styles.features}>
              {vehicle.features.map(f => (
                <Chip key={f} label={f} />
              ))}
            </View>
          </Animated.View>

          {/* Driver note */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={[
              styles.driverCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}>
            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.gold} />
            <View style={styles.driverText}>
              <AppText variant="subheading">Verified, courteous driver</AppText>
              <AppText variant="caption" muted>
                Experienced on local and outstation routes — with the owner personally in
                touch throughout your journey.
              </AppText>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Sticky booking CTA */}
      <View
        style={[
          styles.stickyBar,
          {
            paddingBottom: Math.max(insets.bottom, 14),
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <View>
          <AppText variant="caption" muted>
            Indicative fare
          </AppText>
          <AppText variant="heading" color={theme.colors.gold}>
            {formatINR(vehicle.perKmRate)}/km
          </AppText>
        </View>
        <PremiumButton
          label="Book Now"
          variant="gold"
          icon="arrow-forward"
          pulse
          onPress={() => navigation.navigate('BookingFlow', { vehicleId: vehicle.id })}
          style={styles.stickyBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  notFound: { marginTop: 60 },
  scroll: { paddingBottom: 130 },
  gallery: { overflow: 'hidden', backgroundColor: '#1d2140' },
  galleryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  roundBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(7, 8, 15, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopLeftRadius: 14,
  },
  badgeText: { fontWeight: '700', letterSpacing: 0.6 },
  body: { padding: 20, gap: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleCol: { gap: 6 },
  specGrid: { flexDirection: 'row', gap: 10 },
  specCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
  },
  sectionTitle: { marginBottom: 10 },
  features: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  driverCard: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  driverText: { flex: 1, gap: 3 },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  stickyBtn: { minWidth: 170 },
});
