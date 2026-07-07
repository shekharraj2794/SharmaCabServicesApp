import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Review } from '../../types/models';
import { AppText } from '../ui/AppText';
import { RatingStars } from '../ui/RatingStars';

interface ReviewCardProps {
  review: Review;
  style?: ViewStyle;
}

export function ReviewCard({ review, style }: ReviewCardProps) {
  const { theme } = useTheme();
  const initials = review.author
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        style,
      ]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primarySoft }]}>
          <AppText variant="label" color={theme.colors.primary}>
            {initials}
          </AppText>
        </View>
        <View style={styles.headerText}>
          <AppText variant="subheading" numberOfLines={1}>
            {review.author}
          </AppText>
          {review.role ? (
            <AppText variant="caption" muted>
              {review.role}
            </AppText>
          ) : null}
        </View>
        <View style={[styles.sourceTag, { backgroundColor: theme.colors.primarySoft }]}>
          <AppText variant="caption" color={theme.colors.primary}>
            {review.source}
          </AppText>
        </View>
      </View>
      <RatingStars rating={review.rating} />
      <AppText variant="body" muted numberOfLines={5} style={styles.text}>
        “{review.text}”
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerText: { flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  text: { fontStyle: 'italic' },
});
