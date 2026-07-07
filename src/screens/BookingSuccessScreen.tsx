import React, { useEffect } from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PulseRing } from '../components/ui/PulseRing';
import { Confetti } from '../components/fx/Confetti';
import { BookingCard } from '../components/cards/BookingCard';
import { listBookings, sendBookingToWhatsApp, whatsappMessageFor } from '../services/bookings';
import { links } from '../services/links';
import { company } from '../data/company';
import { RootScreenProps } from '../navigation/types';

/** Celebration + handoff: confetti, summary, WhatsApp confirm, receipt share. */
export function BookingSuccessScreen({ route, navigation }: RootScreenProps<'BookingSuccess'>) {
  const { theme } = useTheme();
  const booking = listBookings().find(b => b.id === route.params.bookingId);

  const checkScale = useSharedValue(0);
  useEffect(() => {
    checkScale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 160 }));
  }, [checkScale]);
  const checkStyle = useAnimatedStyle(() => ({ transform: [{ scale: checkScale.value }] }));

  const shareReceipt = async () => {
    if (!booking) {
      return;
    }
    await Share.share({
      message: `${company.name} — booking request\n\n${whatsappMessageFor(booking)}\n\n${company.phonePrimaryDisplay}`,
    });
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <Confetti />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.checkWrap}>
          <PulseRing color={theme.colors.success} borderRadius={70} />
          <Animated.View
            style={[styles.check, { backgroundColor: `${theme.colors.success}22` }, checkStyle]}>
            <Ionicons name="checkmark-circle" size={84} color={theme.colors.success} />
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <AppText variant="title" center>
            Ride requested!
          </AppText>
          <AppText variant="body" muted center style={styles.subtitle}>
            One last step — send it to us on WhatsApp and the owner will confirm your
            driver and final fare right away.
          </AppText>
        </Animated.View>

        {booking ? (
          <Animated.View entering={FadeInDown.delay(420).springify()}>
            <BookingCard booking={booking} />
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(540).springify()} style={styles.actions}>
          {booking ? (
            <PremiumButton
              label="Confirm on WhatsApp"
              variant="whatsapp"
              icon="logo-whatsapp"
              pulse
              onPress={() => sendBookingToWhatsApp(booking)}
            />
          ) : null}
          <PremiumButton
            label="Call the owner"
            variant="ghost"
            icon="call-outline"
            onPress={() => links.call()}
          />
          <View style={styles.secondaryRow}>
            <PremiumButton
              label="Receipt"
              variant="ghost"
              icon="download-outline"
              small
              onPress={shareReceipt}
              style={styles.flexBtn}
            />
            <PremiumButton
              label="Track booking"
              variant="ghost"
              icon="time-outline"
              small
              onPress={() => navigation.navigate('History')}
              style={styles.flexBtn}
            />
          </View>
          <PremiumButton
            label="Done"
            variant="primary"
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: 20, paddingTop: 40, gap: 20 },
  checkWrap: { alignSelf: 'center', width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  check: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: { marginTop: 8, paddingHorizontal: 12 },
  actions: { gap: 12 },
  secondaryRow: { flexDirection: 'row', gap: 12 },
  flexBtn: { flex: 1 },
});
