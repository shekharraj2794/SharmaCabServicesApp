import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
}

/**
 * Frosted glass surface. Real blur on iOS; Android falls back to a
 * translucent tint (BlurView on Android is costly and inconsistent).
 */
export function GlassCard({ children, style, intensity = 18 }: GlassCardProps) {
  const { theme } = useTheme();

  const frame: ViewStyle = {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(233, 235, 251, 0.14)' : 'rgba(255, 255, 255, 0.55)',
    overflow: 'hidden',
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={[frame, style]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={theme.dark ? 'dark' : 'light'}
          blurAmount={intensity}
        />
        <View style={styles.content}>{children}</View>
      </View>
    );
  }

  return (
    <View
      style={[
        frame,
        {
          backgroundColor: theme.dark
            ? 'rgba(20, 23, 46, 0.88)'
            : 'rgba(255, 255, 255, 0.82)',
        },
        style,
      ]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
});
