import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { TourPackage } from '../../types/models';
import { AppText } from '../ui/AppText';
import { PremiumButton } from '../ui/PremiumButton';

interface PackageCardProps {
  pkg: TourPackage;
  onBook: () => void;
}

export function PackageCard({ pkg, onBook }: PackageCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}>
      <Image
        source={pkg.image}
        style={styles.image}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.body}>
        <View style={[styles.duration, { backgroundColor: theme.colors.primarySoft }]}>
          <Ionicons name="time-outline" size={12} color={theme.colors.primary} />
          <AppText variant="caption" color={theme.colors.primary}>
            {pkg.duration}
          </AppText>
        </View>
        <AppText variant="heading">{pkg.title}</AppText>
        <AppText variant="body" muted>
          {pkg.description}
        </AppText>
        <View style={styles.highlights}>
          {pkg.highlights.map(h => (
            <View key={h} style={styles.highlightRow}>
              <Ionicons name="checkmark-circle" size={15} color={theme.colors.gold} />
              <AppText variant="caption" muted style={styles.highlightText}>
                {h}
              </AppText>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <AppText variant="caption" muted style={styles.priceNote}>
            {pkg.priceNote}
          </AppText>
          <PremiumButton label="Enquire" small variant="gold" icon="arrow-forward" onPress={onBook} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, borderWidth: 1, overflow: 'hidden', marginBottom: 18 },
  image: { width: '100%', height: 160, backgroundColor: '#1d2140' },
  body: { padding: 16, gap: 10 },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  highlights: { gap: 6 },
  highlightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  highlightText: { flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 12,
  },
  priceNote: { flex: 1 },
});
