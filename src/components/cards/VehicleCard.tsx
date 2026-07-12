import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { Vehicle } from '../../types/models';
import { AppText } from '../ui/AppText';
import { Chip } from '../ui/Chip';
import { PressableScale } from '../ui/PressableScale';
import { formatINR } from '../../utils/format';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: () => void;
  compact?: boolean;
}

export function VehicleCard({ vehicle, onPress, compact = false }: VehicleCardProps) {
  const { theme } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      scaleTo={0.97}
      accessibilityRole="button"
      accessibilityLabel={`${vehicle.name}, ${vehicle.seats} seats`}>
      <View
        style={[
          styles.card,
          compact && styles.compact,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
          },
        ]}>
        <View style={styles.imageWrap}>
          <Image
            source={vehicle.image}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
          {vehicle.badge ? (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <AppText variant="caption" color="#ffffff" style={styles.badgeText}>
                {vehicle.badge.toUpperCase()}
              </AppText>
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <AppText variant="subheading">{vehicle.name}</AppText>
            <Chip label={`${vehicle.seats} seats`} selected gold />
          </View>
          {!compact ? (
            <AppText variant="caption" muted numberOfLines={2}>
              {vehicle.tagline}
            </AppText>
          ) : null}
          <View style={styles.footer}>
            <AppText variant="label" color={theme.colors.gold}>
              {formatINR(vehicle.perKmRate)}/km est.
            </AppText>
            <View style={styles.bookRow}>
              <AppText variant="label" color={theme.colors.primary}>
                Book
              </AppText>
              <Ionicons name="arrow-forward" size={14} color={theme.colors.primary} />
            </View>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  compact: { width: 250 },
  imageWrap: { position: 'relative' },
  image: { width: '100%', height: 140, backgroundColor: '#1d2140' },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  badgeText: { fontWeight: '700', letterSpacing: 0.6 },
  body: { padding: 14, gap: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  bookRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
