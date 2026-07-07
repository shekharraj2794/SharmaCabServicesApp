import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { Offer } from '../../types/models';
import { AppText } from '../ui/AppText';
import { PressableScale } from '../ui/PressableScale';

interface OfferCardProps {
  offer: Offer;
  onPress: () => void;
}

export function OfferCard({ offer, onPress }: OfferCardProps) {
  const { theme } = useTheme();
  return (
    <PressableScale onPress={onPress} accessibilityRole="button" accessibilityLabel={offer.title}>
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <View style={styles.tag}>
          <Ionicons name="pricetag-outline" size={12} color="#1e1b4b" />
          <AppText variant="caption" color="#1e1b4b" style={styles.tagText}>
            {offer.tag}
          </AppText>
        </View>
        <AppText variant="subheading" color="#ffffff">
          {offer.title}
        </AppText>
        <AppText variant="caption" color="rgba(255,255,255,0.85)">
          {offer.subtitle}
        </AppText>
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    borderRadius: 20,
    padding: 16,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: { fontWeight: '700' },
});
