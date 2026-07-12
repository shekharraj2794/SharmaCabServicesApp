import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
  style?: TextStyle | TextStyle[];
}

/**
 * Count-up number. Driven with requestAnimationFrame + state on the JS
 * thread — animating a TextInput's text prop is not supported on the
 * New Architecture, and a dozen state updates over ~1.4s is cheap.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  delay = 0,
  duration = 1400,
  style,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const timer = setTimeout(() => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (cancelled) {
          return;
        }
        if (start === null) {
          start = now;
        }
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${prefix}${(value * eased).toFixed(decimals)}${suffix}`);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, prefix, suffix, delay, duration]);

  return (
    <Text style={style} accessibilityLabel={`${prefix}${value}${suffix}`}>
      {display}
    </Text>
  );
}
