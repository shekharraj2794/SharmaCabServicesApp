import React, { useEffect } from 'react';
import { TextInput, TextStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
  style?: TextStyle | TextStyle[];
}

/** Count-up number driven on the UI thread (classic ReText pattern). */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  delay = 0,
  duration = 1400,
  style,
}: AnimatedCounterProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(value, { duration, easing: Easing.out(Easing.cubic) }),
    );
  }, [progress, value, delay, duration]);

  const animatedProps = useAnimatedProps(() => {
    const text = `${prefix}${progress.value.toFixed(decimals)}${suffix}`;
    return { text } as { text: string };
  });

  return (
    <AnimatedTextInput
      editable={false}
      defaultValue={`${prefix}${(0).toFixed(decimals)}${suffix}`}
      animatedProps={animatedProps}
      underlineColorAndroid="transparent"
      style={[{ padding: 0 }, style]}
      accessibilityLabel={`${prefix}${value}${suffix}`}
    />
  );
}
