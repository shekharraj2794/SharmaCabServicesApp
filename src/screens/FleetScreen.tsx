import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { Skeleton } from '../components/ui/Skeleton';
import { VehicleCard } from '../components/cards/VehicleCard';
import { useVehicles } from '../hooks/queries';
import { Vehicle } from '../types/models';

export function FleetScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { data, isLoading, refetch, isRefetching } = useVehicles();

  const renderItem = ({ item, index }: { item: Vehicle; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 5) * 90).springify()}
      style={styles.cardWrap}>
      <VehicleCard
        vehicle={item}
        onPress={() => navigation.navigate('VehicleDetails', { vehicleId: item.id })}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <AppText variant="title">Our fleet</AppText>
        <AppText variant="body" muted>
          Pick your ride — every vehicle serviced, spotless and highway ready.
        </AppText>
      </View>
      {isLoading ? (
        <View style={styles.skeletons}>
          {[1, 2, 3].map(i => (
            <Skeleton key={i} height={250} radius={22} />
          ))}
        </View>
      ) : (
        <FlashList
          data={data ?? []}
          renderItem={renderItem}
          keyExtractor={v => v.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6, gap: 4 },
  list: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 120 },
  cardWrap: { marginBottom: 16 },
  skeletons: { paddingHorizontal: 16, paddingTop: 10, gap: 16 },
});
