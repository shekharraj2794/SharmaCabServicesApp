import React, { memo, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const COLORS = ['#fbbf24', '#6366f1', '#818cf8', '#d97706', '#c7d2fe', '#22c55e'];
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface PieceProps {
  x: number;
  delay: number;
  duration: number;
  color: string;
  sway: number;
  spin: number;
  size: number;
}

function Piece({ x, delay, duration, color, sway, spin, size }: PieceProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.in(Easing.quad) }),
    );
  }, [progress, delay, duration]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.1, 0.85, 1], [0, 1, 1, 0]),
    transform: [
      { translateY: -40 + progress.value * (SCREEN_H + 80) },
      { translateX: Math.sin(progress.value * Math.PI * 3) * sway },
      { rotate: `${progress.value * spin}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        { left: x, width: size, height: size * 1.6, backgroundColor: color },
        style,
      ]}
    />
  );
}

/** One-shot celebration confetti for booking success. */
export const Confetti = memo(function Confetti({ count = 28 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * SCREEN_W,
        delay: Math.random() * 500,
        duration: 2400 + Math.random() * 1600,
        color: COLORS[i % COLORS.length],
        sway: 20 + Math.random() * 50,
        spin: 360 + Math.random() * 540,
        size: 6 + Math.random() * 6,
      })),
    [count],
  );

  return (
    <Animated.View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {pieces.map(p => (
        <Piece
          key={p.id}
          x={p.x}
          delay={p.delay}
          duration={p.duration}
          color={p.color}
          sway={p.sway}
          spin={p.spin}
          size={p.size}
        />
      ))}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  piece: { position: 'absolute', top: -40, borderRadius: 2 },
});
