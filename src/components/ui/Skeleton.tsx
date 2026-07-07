import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

/** Shimmering placeholder block for loading states. */
export function Skeleton({ width = '100%', height = 16, radius = 8, style }: SkeletonProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, [progress]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 220 }],
  }));

  const sheen = theme.dark ? 'rgba(233,235,251,0.08)' : 'rgba(255,255,255,0.85)';

  return (
    <View
      style={[
        { width, height, borderRadius: radius, backgroundColor: theme.colors.surfaceAlt },
        styles.clip,
        style,
      ]}>
      <AnimatedGradient
        colors={['transparent', sheen, 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[StyleSheet.absoluteFill, shimmerStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
});
