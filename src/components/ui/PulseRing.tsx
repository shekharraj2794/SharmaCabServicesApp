import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface PulseRingProps {
  color: string;
  borderRadius?: number;
  duration?: number;
}

/** Looping attention ring — the app twin of the website's pulsing CTA. */
export function PulseRing({ color, borderRadius = 999, duration = 2600 }: PulseRingProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
      -1,
      false,
    );
  }, [progress, duration]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ scale: 0.96 + progress.value * 0.35 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius, borderWidth: 2.5, borderColor: color },
        ringStyle,
      ]}
    />
  );
}
