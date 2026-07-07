import React, { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { PremiumButton } from '../components/ui/PremiumButton';
import { PressableScale } from '../components/ui/PressableScale';
import { storage, StorageKeys } from '../services/storage';
import { RootScreenProps } from '../navigation/types';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const slides: { key: string; icon: IconName; title: string; text: string }[] = [
  {
    key: 'trust',
    icon: 'shield-checkmark-outline',
    title: 'Deoghar rides,\ndone right',
    text: '5.0 on Google from 85+ riders. On-time pickups, spotless cars, and the owner personally in touch on every journey.',
  },
  {
    key: 'routes',
    icon: 'navigate-outline',
    title: 'Temple darshan to\nlong highways',
    text: 'Baidyanath Dham, Basukinath, Tarapith — or Kolkata, Patna, Varanasi and beyond. One-way drops and round trips.',
  },
  {
    key: 'booking',
    icon: 'logo-whatsapp',
    title: 'Book in a minute.\nNo app battles.',
    text: 'Pick your cab, get an instant estimate, and confirm on WhatsApp with a real human. No sign-ups, no surge pricing.',
  },
];

export function OnboardingScreen({ navigation }: RootScreenProps<'Onboarding'>) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const last = index === slides.length - 1;

  const finish = () => {
    storage.set(StorageKeys.onboardingDone, true);
    navigation.replace('Tabs');
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <LinearGradient colors={theme.gradients.hero} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.topBar}>
          <AppText variant="label" color={theme.colors.gold}>
            SHARMA CABS
          </AppText>
          <PressableScale onPress={finish} accessibilityRole="button" accessibilityLabel="Skip onboarding">
            <AppText variant="label" color="rgba(255,255,255,0.7)">
              Skip
            </AppText>
          </PressableScale>
        </View>

        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={s => s.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <Animated.View
                entering={FadeInDown.delay(120).springify()}
                style={[styles.iconHalo, { borderColor: 'rgba(251,191,36,0.35)' }]}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(251,191,36,0.14)' }]}>
                  <Ionicons name={item.icon} size={54} color={theme.colors.gold} />
                </View>
              </Animated.View>
              <Animated.View entering={FadeInUp.delay(220).springify()}>
                <AppText variant="display" color="#ffffff" center>
                  {item.title}
                </AppText>
              </Animated.View>
              <Animated.View entering={FadeInUp.delay(340).springify()}>
                <AppText variant="body" color="rgba(255,255,255,0.78)" center style={styles.text}>
                  {item.text}
                </AppText>
              </Animated.View>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((s, i) => (
              <View
                key={s.key}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i === index ? theme.colors.gold : 'rgba(255,255,255,0.28)',
                    width: i === index ? 26 : 8,
                  },
                ]}
              />
            ))}
          </View>
          <PremiumButton
            label={last ? 'Get started' : 'Next'}
            variant="gold"
            icon="arrow-forward"
            pulse={last}
            onPress={() => {
              if (last) {
                finish();
              } else {
                listRef.current?.scrollToIndex({ index: index + 1, animated: true });
                setIndex(index + 1);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  iconHalo: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { maxWidth: 320 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});
