import React from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { Screen } from '../components/ui/Screen';
import { AppText } from '../components/ui/AppText';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PressableScale } from '../components/ui/PressableScale';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Skeleton } from '../components/ui/Skeleton';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { RatingStars } from '../components/ui/RatingStars';
import { GlowOrbs } from '../components/fx/GlowOrbs';
import { ParticleField } from '../components/fx/ParticleField';
import { VehicleCard } from '../components/cards/VehicleCard';
import { ReviewCard } from '../components/cards/ReviewCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { OfferCard } from '../components/cards/OfferCard';
import { BookingCard } from '../components/cards/BookingCard';
import { useDestinations, useOffers, useReviews, useVehicles } from '../hooks/queries';
import { useBookings } from '../hooks/useBookings';
import { company, stats } from '../data/company';
import { links } from '../services/links';
import { sendBookingToWhatsApp } from '../services/bookings';

const HERO_HEIGHT = 300;

export function HomeScreen() {
  const { theme, toggle } = useTheme();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const vehicles = useVehicles();
  const reviews = useReviews();
  const destinations = useDestinations();
  const offers = useOffers();
  const { bookings, refresh } = useBookings();

  const heroWidth = width - theme.spacing.lg * 2;
  const latestBooking = bookings[0];

  return (
    <Screen scroll onRefresh={refresh}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.locationWrap}>
          <Ionicons name="location" size={16} color={theme.colors.gold} />
          <View>
            <AppText variant="caption" muted>
              Serving from
            </AppText>
            <AppText variant="subheading">{company.city}</AppText>
          </View>
        </View>
        <PressableScale
          onPress={toggle}
          accessibilityRole="button"
          accessibilityLabel="Toggle dark and light mode">
          <View
            style={[
              styles.themeBtn,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}>
            <Ionicons
              name={theme.dark ? 'sunny-outline' : 'moon-outline'}
              size={18}
              color={theme.colors.text}
            />
          </View>
        </PressableScale>
      </View>

      {/* Hero */}
      <Animated.View entering={FadeInDown.duration(600).springify()}>
        <LinearGradient
          colors={theme.gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { height: HERO_HEIGHT }]}>
          <GlowOrbs width={heroWidth} height={HERO_HEIGHT} />
          <ParticleField width={heroWidth} height={HERO_HEIGHT} count={12} />
          <PressableScale onPress={() => navigation.navigate('Reviews')} haptic={false}>
            <View style={styles.ratingChip}>
              <RatingStars rating={5} size={12} />
              <AppText variant="caption" color="#ffffff">
                {company.rating.toFixed(1)} on Google · {company.reviewCount}+ reviews
              </AppText>
            </View>
          </PressableScale>
          <AppText variant="display" color="#ffffff" style={styles.heroTitle}>
            Your journey,{'\n'}
            <AppText variant="display" color={theme.colors.gold}>
              beautifully driven.
            </AppText>
          </AppText>
          <AppText variant="caption" color="rgba(255,255,255,0.8)">
            {company.supportLine}
          </AppText>
          <View style={styles.heroButtons}>
            <PremiumButton
              label="Book Now"
              variant="gold"
              icon="arrow-forward"
              pulse
              small
              onPress={() => navigation.navigate('BookingFlow')}
            />
            <PremiumButton
              label="WhatsApp"
              variant="whatsapp"
              icon="logo-whatsapp"
              small
              onPress={() => links.whatsapp("Hi, I'd like to book a cab with Sharma Cab Services.")}
            />
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Popular destinations */}
      <SectionHeader
        title="Popular routes"
        actionLabel="Book custom"
        onAction={() => navigation.navigate('BookingFlow')}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {destinations.isLoading
          ? [1, 2, 3].map(i => <Skeleton key={i} width={150} height={110} radius={18} />)
          : (destinations.data ?? []).slice(0, 6).map((d, i) => (
              <Animated.View key={d.id} entering={FadeInRight.delay(i * 70).springify()}>
                <DestinationCard
                  destination={d}
                  onPress={() => navigation.navigate('BookingFlow', { drop: d.name })}
                />
              </Animated.View>
            ))}
      </ScrollView>

      {/* Featured vehicles */}
      <SectionHeader
        title="Featured vehicles"
        actionLabel="View fleet"
        onAction={() => navigation.navigate('Tabs', { screen: 'Fleet' })}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {vehicles.isLoading
          ? [1, 2].map(i => <Skeleton key={i} width={250} height={240} radius={22} />)
          : (vehicles.data ?? []).slice(0, 4).map((v, i) => (
              <Animated.View key={v.id} entering={FadeInRight.delay(i * 80).springify()}>
                <VehicleCard
                  vehicle={v}
                  compact
                  onPress={() => navigation.navigate('VehicleDetails', { vehicleId: v.id })}
                />
              </Animated.View>
            ))}
      </ScrollView>

      {/* Offers */}
      <SectionHeader title="Special offers" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {(offers.data ?? []).map((o, i) => (
          <Animated.View key={o.id} entering={FadeInRight.delay(i * 80).springify()}>
            <OfferCard
              offer={o}
              onPress={() => links.whatsapp(`Hi, I'd like to know more about: ${o.title}`)}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Stats */}
      <Animated.View
        entering={FadeInDown.delay(120).springify()}
        style={[
          styles.statsCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        {stats.map((s, i) => (
          <View key={s.label} style={styles.statItem}>
            <AnimatedCounter
              value={s.value}
              decimals={'decimals' in s ? s.decimals : 0}
              suffix={'suffix' in s ? s.suffix : ''}
              delay={i * 150}
              style={[styles.statValue, { color: theme.colors.gold }]}
            />
            <AppText variant="caption" muted center>
              {s.label}
            </AppText>
          </View>
        ))}
      </Animated.View>

      {/* Recent booking */}
      {latestBooking ? (
        <>
          <SectionHeader
            title="Recent booking"
            actionLabel="History"
            onAction={() => navigation.navigate('History')}
          />
          <BookingCard
            booking={latestBooking}
            onWhatsApp={() => sendBookingToWhatsApp(latestBooking)}
          />
        </>
      ) : null}

      {/* Reviews */}
      <SectionHeader
        title="Riders love us"
        actionLabel="All reviews"
        onAction={() => navigation.navigate('Reviews')}
      />
      <View style={styles.reviewsCol}>
        {reviews.isLoading
          ? [1, 2].map(i => <Skeleton key={i} height={140} radius={20} />)
          : (reviews.data ?? []).slice(0, 2).map((r, i) => (
              <Animated.View key={r.id} entering={FadeInDown.delay(i * 100).springify()}>
                <ReviewCard review={r} />
              </Animated.View>
            ))}
      </View>

      {/* Quick links */}
      <View style={styles.quickLinks}>
        {(
          [
            { icon: 'information-circle-outline', label: 'About', to: 'About' },
            { icon: 'call-outline', label: 'Contact', to: 'Contact' },
            { icon: 'time-outline', label: 'History', to: 'History' },
          ] as const
        ).map(q => (
          <PressableScale
            key={q.to}
            onPress={() => navigation.navigate(q.to)}
            style={styles.quickLinkWrap}
            accessibilityRole="button"
            accessibilityLabel={q.label}>
            <View
              style={[
                styles.quickLink,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}>
              <Ionicons name={q.icon} size={20} color={theme.colors.primary} />
              <AppText variant="label">{q.label}</AppText>
            </View>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  locationWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  themeBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    borderRadius: 26,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    gap: 8,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 6,
  },
  heroTitle: { marginBottom: 2 },
  heroButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  hScroll: { gap: 12, paddingRight: 8 },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginTop: 28,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  reviewsCol: { gap: 12 },
  quickLinks: { flexDirection: 'row', gap: 10, marginTop: 24 },
  quickLinkWrap: { flex: 1 },
  quickLink: {
    alignItems: 'center',
    gap: 6,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
  },
});
