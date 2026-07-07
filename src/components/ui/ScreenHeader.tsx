import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

/** Header for pushed screens: circular back button + titles. */
export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <PressableScale
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <View
          style={[
            styles.back,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
        </View>
      </PressableScale>
      <View style={styles.titles}>
        <AppText variant="heading">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" muted>
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: { flex: 1 },
});
