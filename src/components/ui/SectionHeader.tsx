import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <AppText variant="heading">{title}</AppText>
      {actionLabel && onAction ? (
        <PressableScale onPress={onAction} accessibilityRole="button">
          <View style={styles.action}>
            <AppText variant="label" color={theme.colors.primary}>
              {actionLabel}
            </AppText>
            <Ionicons name="chevron-forward" size={14} color={theme.colors.primary} />
          </View>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 14,
  },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
