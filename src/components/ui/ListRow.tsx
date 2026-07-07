import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ListRowProps {
  icon: IconName;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
  switchValue?: boolean;
  onSwitch?: (value: boolean) => void;
  trailing?: string;
}

/** Settings/profile row: icon tile, labels, chevron / switch / value. */
export function ListRow({
  icon,
  title,
  subtitle,
  onPress,
  danger = false,
  switchValue,
  onSwitch,
  trailing,
}: ListRowProps) {
  const { theme } = useTheme();
  const tint = danger ? theme.colors.danger : theme.colors.primary;

  const body = (
    <View
      style={[
        styles.row,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}>
      <View style={[styles.iconTile, { backgroundColor: theme.colors.primarySoft }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <View style={styles.texts}>
        <AppText variant="subheading" color={danger ? theme.colors.danger : undefined}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" muted>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {onSwitch !== undefined ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitch}
          trackColor={{ true: theme.colors.primary, false: theme.colors.surfaceAlt }}
          thumbColor="#ffffff"
        />
      ) : trailing ? (
        <AppText variant="label" muted>
          {trailing}
        </AppText>
      ) : onPress ? (
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textFaint} />
      ) : null}
    </View>
  );

  if (!onPress) {
    return body;
  }
  return (
    <PressableScale onPress={onPress} scaleTo={0.98} accessibilityRole="button">
      {body}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 2 },
});
