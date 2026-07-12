import React, { useEffect, useState } from 'react';
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
  /** How many px the ring grows beyond the element on each side. */
  spread?: number;
}

/**
 * Looping attention ring. Expansion is a fixed pixel spread (not a raw
 * scale factor), so wide full-width buttons don't fling the ring off
 * screen — per-axis scale is derived from the measured size.
 */
export function PulseRing({
  color,
  borderRadius = 999,
  duration = 2600,
  spread = 14,
}: PulseRingProps) {
  const progress = useSharedValue(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
      -1,
      false,
    );
  }, [progress, duration]);

  const targetX = size.w > 0 ? 1 + (spread * 2) / size.w : 1.06;
  const targetY = size.h > 0 ? 1 + (spread * 2) / size.h : 1.3;

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.9 * (1 - progress.value),
    transform: [
      { scaleX: 1 + (targetX - 1) * progress.value },
      { scaleY: 1 + (targetY - 1) * progress.value },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      onLayout={e =>
        setSize({
          w: Math.round(e.nativeEvent.layout.width),
          h: Math.round(e.nativeEvent.layout.height),
        })
      }
      style={[
        StyleSheet.absoluteFill,
        { borderRadius, borderWidth: 2.5, borderColor: color },
        ringStyle,
      ]}
    />
  );
}
