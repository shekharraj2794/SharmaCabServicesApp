import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { PulseRing } from './PulseRing';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface PremiumButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'gold' | 'primary' | 'ghost' | 'whatsapp';
  icon?: IconName;
  loading?: boolean;
  pulse?: boolean;
  small?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function PremiumButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  pulse = false,
  small = false,
  style,
  accessibilityLabel,
}: PremiumButtonProps) {
  const { theme } = useTheme();
  const height = small ? 42 : 54;

  const textColor =
    variant === 'gold'
      ? '#1e1b4b'
      : variant === 'ghost'
      ? theme.colors.text
      : '#ffffff';

  const inner = (
    <View style={[styles.inner, { height }]}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          <AppText
            variant={small ? 'label' : 'subheading'}
            color={textColor}
            style={styles.labelText}>
            {label}
          </AppText>
          {icon ? <Ionicons name={icon} size={small ? 15 : 18} color={textColor} /> : null}
        </>
      )}
    </View>
  );

  return (
    <View style={style}>
      {pulse ? <PulseRing color={variant === 'gold' ? theme.colors.gold : theme.colors.primary} /> : null}
      <PressableScale
        onPress={loading ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}>
        {variant === 'ghost' ? (
          <View
            style={[
              styles.base,
              { borderColor: theme.colors.border, borderWidth: 1.5, backgroundColor: theme.colors.surface },
            ]}>
            {inner}
          </View>
        ) : variant === 'whatsapp' ? (
          <View style={[styles.base, { backgroundColor: theme.colors.whatsapp }]}>{inner}</View>
        ) : (
          <LinearGradient
            colors={variant === 'gold' ? theme.gradients.gold : theme.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.base}>
            {inner}
          </LinearGradient>
        )}
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 999, overflow: 'hidden' },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  labelText: { fontWeight: '700' },
});
