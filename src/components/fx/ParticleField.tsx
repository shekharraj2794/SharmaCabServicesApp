import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ParticleProps {
  x: number;
  size: number;
  delay: number;
  duration: number;
  height: number;
  color: string;
}

function Particle({ x, size, delay, duration, height, color }: ParticleProps) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false),
    );
  }, [progress, delay, duration]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - Math.abs(progress.value - 0.5) * 2) + 0.05,
    transform: [{ translateY: (1 - progress.value) * height }],
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        { left: x, width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        style,
      ]}
    />
  );
}

interface ParticleFieldProps {
  count?: number;
  width: number;
  height: number;
  color?: string;
}

/** Gold dust drifting upward — the hero's ambient life. Purely decorative. */
export const ParticleField = memo(function ParticleField({
  count = 14,
  width,
  height,
  color = '#fbbf24',
}: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4000,
        duration: 6000 + Math.random() * 6000,
      })),
    [count, width],
  );

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, styles.clip]}>
      {particles.map(p => (
        <Particle
          key={p.id}
          x={p.x}
          size={p.size}
          delay={p.delay}
          duration={p.duration}
          height={height}
          color={color}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  dot: { position: 'absolute', top: -8 },
});
