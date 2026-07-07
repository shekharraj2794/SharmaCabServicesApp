import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  gold?: boolean;
  style?: ViewStyle;
}

export function Chip({ label, selected = false, onPress, gold = false, style }: ChipProps) {
  const { theme } = useTheme();
  const activeBg = gold ? theme.colors.gold : theme.colors.primary;

  const body = (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: selected ? activeBg : theme.colors.surfaceAlt,
          borderColor: selected ? activeBg : theme.colors.border,
        },
        style,
      ]}>
      <AppText
        variant="label"
        color={
          selected ? (gold ? '#1e1b4b' : theme.colors.onPrimary) : theme.colors.textMuted
        }>
        {label}
      </AppText>
    </View>
  );

  if (!onPress) {
    return body;
  }
  return (
    <PressableScale onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {body}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
