import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { Destination } from '../../types/models';
import { AppText } from '../ui/AppText';
import { PressableScale } from '../ui/PressableScale';

const kindIcon = {
  city: 'business-outline',
  temple: 'flame-outline',
  airport: 'airplane-outline',
} as const;

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

export function DestinationCard({ destination, onPress }: DestinationCardProps) {
  const { theme } = useTheme();
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Book ${destination.from} to ${destination.name}`}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <View style={[styles.iconWrap, { backgroundColor: theme.colors.primarySoft }]}>
          <Ionicons
            name={kindIcon[destination.kind]}
            size={18}
            color={theme.colors.primary}
          />
        </View>
        <AppText variant="subheading" numberOfLines={1}>
          {destination.name}
        </AppText>
        <AppText variant="caption" muted>
          ~{destination.distanceKm} km · from {destination.from}
        </AppText>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
});
