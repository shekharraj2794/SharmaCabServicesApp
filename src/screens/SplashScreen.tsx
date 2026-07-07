import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { ParticleField } from '../components/fx/ParticleField';
import { storage, StorageKeys } from '../services/storage';
import { company } from '../data/company';
import { RootScreenProps } from '../navigation/types';

/** Animated brand reveal: monogram springs in, ring pulses, wordmark fades. */
export function SplashScreen({ navigation }: RootScreenProps<'Splash'>) {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();

  const markScale = useSharedValue(0.4);
  const markOpacity = useSharedValue(0);
  const ring = useSharedValue(0);
  const bar = useSharedValue(0);

  useEffect(() => {
    markOpacity.value = withTiming(1, { duration: 450 });
    markScale.value = withSpring(1, { damping: 11, stiffness: 140 });
    ring.value = withDelay(
      350,
      withRepeat(withTiming(1, { duration: 1400, easing: Easing.out(Easing.cubic) }), -1),
    );
    bar.value = withDelay(300, withTiming(1, { duration: 1700, easing: Easing.inOut(Easing.ease) }));

    const timer = setTimeout(() => {
      const done = storage.getBoolean(StorageKeys.onboardingDone);
      navigation.replace(done ? 'Tabs' : 'Onboarding');
    }, 2300);
    return () => clearTimeout(timer);
  }, [navigation, markOpacity, markScale, ring, bar]);

  const markStyle = useAnimatedStyle(() => ({
    opacity: markOpacity.value,
    transform: [{ scale: markScale.value }],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 1 - ring.value,
    transform: [{ scale: 1 + ring.value * 0.6 }],
  }));
  const barStyle = useAnimatedStyle(() => ({
    width: `${bar.value * 100}%`,
  }));

  return (
    <LinearGradient colors={theme.gradients.hero} style={styles.flex}>
      <ParticleField width={width} height={height} count={16} />
      <View style={styles.center}>
        <View style={styles.markWrap}>
          <Animated.View
            style={[styles.ring, { borderColor: theme.colors.gold }, ringStyle]}
          />
          <Animated.View style={markStyle}>
            <LinearGradient
              colors={theme.gradients.gold}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mark}>
              <AppText variant="display" color="#1e1b4b" style={styles.markText}>
                SC
              </AppText>
            </LinearGradient>
          </Animated.View>
        </View>

        <Animated.View entering={FadeIn.delay(500).duration(700)} style={styles.nameWrap}>
          <AppText variant="title" color="#ffffff" center>
            {company.name}
          </AppText>
          <AppText variant="caption" color="rgba(255,255,255,0.75)" center style={styles.tagline}>
            {company.tagline.toUpperCase()}
          </AppText>
        </Animated.View>

        <View style={[styles.barTrack, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <Animated.View
            style={[styles.barFill, { backgroundColor: theme.colors.gold }, barStyle]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  markWrap: { alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
  },
  mark: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: { fontWeight: '800' },
  nameWrap: { gap: 6 },
  tagline: { letterSpacing: 2.4 },
  barTrack: { width: 170, height: 3, borderRadius: 2, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2 },
});
