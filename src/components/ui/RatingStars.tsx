import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { AppText } from './AppText';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function RatingStars({ rating, size = 14, showValue = false }: RatingStarsProps) {
  const { theme } = useTheme();
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Rated ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={theme.colors.gold}
        />
      ))}
      {showValue ? (
        <AppText variant="label" style={styles.value}>
          {rating.toFixed(1)}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  value: { marginLeft: 6 },
});
