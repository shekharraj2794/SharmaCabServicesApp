import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../theme';
import { Screen } from '../components/ui/Screen';
import { AppText } from '../components/ui/AppText';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { company, milestones, stats } from '../data/company';

export function AboutScreen() {
  const { theme } = useTheme();

  return (
    <Screen scroll>
      <ScreenHeader title="About us" subtitle={company.city} />

      <Animated.View entering={FadeInDown.springify()}>
        <AppText variant="body" muted>
          {company.name} is Deoghar's trusted travel partner — safe, punctual rides with
          courteous professional drivers and clean, well-maintained vehicles. Whether it's
          a quick city trip, a full-day temple tour, or a comfortable outstation journey,
          the owner personally supervises every ride.
        </AppText>
      </Animated.View>

      {/* Stats */}
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        style={[
          styles.statsCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        {stats.map((s, i) => (
          <View key={s.label} style={styles.statItem}>
            <AnimatedCounter
              value={s.value}
              decimals={'decimals' in s ? s.decimals : 0}
              suffix={'suffix' in s ? s.suffix : ''}
              delay={i * 140}
              style={[styles.statValue, { color: theme.colors.gold }]}
            />
            <AppText variant="caption" muted center>
              {s.label}
            </AppText>
          </View>
        ))}
      </Animated.View>

      {/* Mission / vision */}
      <View style={styles.mvRow}>
        {(
          [
            { icon: 'flag-outline', title: 'Mission', text: company.mission },
            { icon: 'eye-outline', title: 'Vision', text: company.vision },
          ] as const
        ).map((m, i) => (
          <Animated.View
            key={m.title}
            entering={FadeInDown.delay(180 + i * 90).springify()}
            style={[
              styles.mvCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}>
            <Ionicons name={m.icon} size={20} color={theme.colors.gold} />
            <AppText variant="subheading">{m.title}</AppText>
            <AppText variant="caption" muted>
              {m.text}
            </AppText>
          </Animated.View>
        ))}
      </View>

      {/* Timeline */}
      <AppText variant="heading" style={styles.timelineTitle}>
        The journey so far
      </AppText>
      <View style={styles.timeline}>
        <View style={[styles.timelineLine, { backgroundColor: theme.colors.border }]} />
        {milestones.map((m, i) => (
          <Animated.View
            key={m.title}
            entering={FadeInDown.delay(260 + i * 110).springify()}
            style={styles.timelineItem}>
            <View style={[styles.timelineDot, { borderColor: theme.colors.gold, backgroundColor: theme.colors.background }]} />
            <View style={styles.timelineBody}>
              <AppText variant="caption" color={theme.colors.gold} style={styles.timelineYear}>
                {m.year.toUpperCase()}
              </AppText>
              <AppText variant="subheading">{m.title}</AppText>
              <AppText variant="caption" muted>
                {m.text}
              </AppText>
            </View>
          </Animated.View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginTop: 20,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 21, fontWeight: '800', textAlign: 'center' },
  mvRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  mvCard: { flex: 1, borderRadius: 18, borderWidth: 1, padding: 14, gap: 6 },
  timelineTitle: { marginTop: 28, marginBottom: 16 },
  timeline: { position: 'relative', paddingLeft: 22 },
  timelineLine: { position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, borderRadius: 1 },
  timelineItem: { flexDirection: 'row', marginBottom: 22 },
  timelineDot: {
    position: 'absolute',
    left: -22,
    top: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
  },
  timelineBody: { flex: 1, gap: 3 },
  timelineYear: { letterSpacing: 1.4 },
});
