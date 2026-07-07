import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { AppText } from '../components/ui/AppText';
import { useHaptics } from '../hooks/useHaptics';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const icons: Record<string, { active: IconName; inactive: IconName; label: string }> = {
  Home: { active: 'home', inactive: 'home-outline', label: 'Home' },
  Fleet: { active: 'car-sport', inactive: 'car-sport-outline', label: 'Fleet' },
  Book: { active: 'add-circle', inactive: 'add-circle-outline', label: 'Book' },
  Packages: { active: 'map', inactive: 'map-outline', label: 'Tours' },
  Profile: { active: 'person', inactive: 'person-outline', label: 'Profile' },
};

function TabIcon({ name, focused, color }: { name: string; focused: boolean; color: string }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, { damping: 12, stiffness: 240 });
  }, [focused, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const icon = icons[name];

  return (
    <Animated.View style={style}>
      <Ionicons
        name={focused ? icon.active : icon.inactive}
        size={name === 'Book' ? 30 : 22}
        color={color}
      />
    </Animated.View>
  );
}

/** Floating glass tab bar with a spring-animated active indicator. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const haptics = useHaptics();

  const H_MARGIN = 16;
  const barWidth = width - H_MARGIN * 2;
  const tabWidth = barWidth / state.routes.length;
  const indicatorX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    indicatorX.value = withSpring(state.index * tabWidth, { damping: 16, stiffness: 180 });
  }, [state.index, tabWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View
      style={[
        styles.wrap,
        {
          bottom: Math.max(insets.bottom, 12),
          left: H_MARGIN,
          width: barWidth,
          backgroundColor: theme.dark ? 'rgba(20, 23, 46, 0.96)' : 'rgba(255, 255, 255, 0.97)',
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
      ]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.indicator,
          { width: tabWidth - 16, backgroundColor: theme.colors.primarySoft },
          indicatorStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused
          ? route.name === 'Book'
            ? theme.colors.gold
            : theme.colors.primary
          : theme.colors.textFaint;

        return (
          <Pressable
            key={route.key}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={icons[route.name].label}
            onPress={() => {
              haptics.light();
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}>
            <TabIcon name={route.name} focused={focused} color={color} />
            <AppText variant="caption" color={color}>
              {icons[route.name].label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    flexDirection: 'row',
    borderRadius: 26,
    borderWidth: 1,
    paddingVertical: 10,
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  indicator: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 8,
    borderRadius: 18,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minHeight: Platform.OS === 'ios' ? 46 : 50,
  },
});
