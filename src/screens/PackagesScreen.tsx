import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { Skeleton } from '../components/ui/Skeleton';
import { PackageCard } from '../components/cards/PackageCard';
import { usePackages } from '../hooks/queries';
import { links } from '../services/links';
import { TourPackage } from '../types/models';

export function PackagesScreen() {
  const { theme } = useTheme();
  const { data, isLoading } = usePackages();

  const renderItem = ({ item, index }: { item: TourPackage; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 110).springify()}>
      <PackageCard
        pkg={item}
        onBook={() => links.whatsapp(`Hi, I'm interested in the ${item.title} package.`)}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <AppText variant="title">Tour packages</AppText>
        <AppText variant="body" muted>
          Darshan, sightseeing and long journeys — planned end to end.
        </AppText>
      </View>
      {isLoading ? (
        <View style={styles.skeletons}>
          {[1, 2].map(i => (
            <Skeleton key={i} height={300} radius={22} />
          ))}
        </View>
      ) : (
        <FlashList
          data={data ?? []}
          renderItem={renderItem}
          keyExtractor={p => p.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10, gap: 4 },
  list: { paddingHorizontal: 16, paddingBottom: 120 },
  skeletons: { paddingHorizontal: 16, gap: 16 },
});
