import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { RatingStars } from '../components/ui/RatingStars';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { PremiumButton } from '../components/ui/PremiumButton';
import { ReviewCard } from '../components/cards/ReviewCard';
import { useReviews } from '../hooks/queries';
import { links } from '../services/links';
import { company } from '../data/company';
import { Review } from '../types/models';

export function ReviewsScreen() {
  const { theme } = useTheme();
  const { data } = useReviews();

  const renderItem = ({ item, index }: { item: Review; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 6) * 90).springify()}
      style={styles.cardWrap}>
      <ReviewCard review={item} />
    </Animated.View>
  );

  const header = (
    <View style={styles.headerBlock}>
      <View
        style={[
          styles.scoreCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <AnimatedCounter
          value={company.rating}
          decimals={1}
          duration={1200}
          style={[styles.score, { color: theme.colors.gold }]}
        />
        <RatingStars rating={5} size={18} />
        <AppText variant="caption" muted>
          {company.reviewCount}+ five-star Google reviews
        </AppText>
        <View style={styles.linkRow}>
          <PremiumButton
            label="Google"
            variant="ghost"
            icon="open-outline"
            small
            onPress={links.maps}
            style={styles.linkBtn}
          />
          <PremiumButton
            label="Justdial"
            variant="ghost"
            icon="open-outline"
            small
            onPress={links.justdial}
            style={styles.linkBtn}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.pad}>
        <ScreenHeader title="Customer reviews" subtitle="Real riders, real words" />
      </View>
      <FlashList
        data={data ?? []}
        renderItem={renderItem}
        keyExtractor={r => r.id}
        ListHeaderComponent={header}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 60 },
  headerBlock: { marginBottom: 16 },
  scoreCard: {
    alignItems: 'center',
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 22,
  },
  score: { fontSize: 46, fontWeight: '800', textAlign: 'center' },
  linkRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  linkBtn: { minWidth: 120 },
  cardWrap: { marginBottom: 12 },
});
