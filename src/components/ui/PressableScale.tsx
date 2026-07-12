import React from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useHaptics } from '../../hooks/useHaptics';

interface PressableScaleProps extends PressableProps {
  children: React.ReactNode;
  scaleTo?: number;
  haptic?: boolean;
  style?: ViewStyle | ViewStyle[];
}

/**
 * The base micro-interaction: springs down on press, optional haptic tick.
 * Layout styles (flex, width…) go on the outer Pressable so rows and grids
 * can size these correctly; the spring transform lives on the inner view.
 */
export function PressableScale({
  children,
  scaleTo = 0.96,
  haptic = true,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);
  const haptics = useHaptics();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      {...rest}
      style={style}
      onPressIn={e => {
        scale.value = withSpring(scaleTo, { damping: 18, stiffness: 320 });
        if (haptic) {
          haptics.light();
        }
        onPressIn?.(e);
      }}
      onPressOut={e => {
        scale.value = withSpring(1, { damping: 14, stiffness: 220 });
        onPressOut?.(e);
      }}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
