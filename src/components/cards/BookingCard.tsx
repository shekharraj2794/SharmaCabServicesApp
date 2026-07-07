import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../theme';
import { Booking, BookingStatus } from '../../types/models';
import { AppText } from '../ui/AppText';
import { PressableScale } from '../ui/PressableScale';
import { formatDateISO, formatINR } from '../../utils/format';
import { tripTypeLabels } from '../../services/bookings';

const statusColor: Record<BookingStatus, string> = {
  requested: '#fbbf24',
  confirmed: '#22c55e',
  completed: '#818cf8',
  cancelled: '#ef4444',
};

interface BookingCardProps {
  booking: Booking;
  onRepeat?: () => void;
  onWhatsApp?: () => void;
  onCancel?: () => void;
}

export function BookingCard({ booking, onRepeat, onWhatsApp, onCancel }: BookingCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}>
      <View style={styles.header}>
        <AppText variant="label" color={theme.colors.gold}>
          {booking.code}
        </AppText>
        <View style={[styles.status, { backgroundColor: `${statusColor[booking.status]}22` }]}>
          <View style={[styles.dot, { backgroundColor: statusColor[booking.status] }]} />
          <AppText variant="caption" color={statusColor[booking.status]}>
            {booking.status.toUpperCase()}
          </AppText>
        </View>
      </View>

      <View style={styles.route}>
        <View style={styles.routeIcons}>
          <View style={[styles.pin, { borderColor: theme.colors.primary }]} />
          <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
          <Ionicons name="location" size={14} color={theme.colors.gold} />
        </View>
        <View style={styles.routeTexts}>
          <AppText variant="subheading" numberOfLines={1}>
            {booking.pickup}
          </AppText>
          <AppText variant="subheading" numberOfLines={1} style={styles.dropText}>
            {booking.drop}
          </AppText>
        </View>
      </View>

      <View style={styles.metaRow}>
        <AppText variant="caption" muted>
          {formatDateISO(booking.dateISO)} · {booking.timeSlot}
        </AppText>
        <AppText variant="caption" muted>
          {tripTypeLabels[booking.tripType]} · {booking.vehicleName}
        </AppText>
      </View>

      <View style={styles.footer}>
        <AppText variant="subheading" color={theme.colors.gold}>
          {formatINR(booking.fareEstimate)}
          <AppText variant="caption" muted>
            {'  '}est.
          </AppText>
        </AppText>
        <View style={styles.actions}>
          {onCancel ? (
            <PressableScale onPress={onCancel} accessibilityRole="button">
              <View style={[styles.actionBtn, { borderColor: theme.colors.danger }]}>
                <AppText variant="caption" color={theme.colors.danger}>
                  Cancel
                </AppText>
              </View>
            </PressableScale>
          ) : null}
          {onWhatsApp ? (
            <PressableScale onPress={onWhatsApp} accessibilityRole="button">
              <View style={[styles.actionBtn, { borderColor: theme.colors.whatsapp }]}>
                <Ionicons name="logo-whatsapp" size={13} color={theme.colors.whatsapp} />
                <AppText variant="caption" color={theme.colors.whatsapp}>
                  Chat
                </AppText>
              </View>
            </PressableScale>
          ) : null}
          {onRepeat ? (
            <PressableScale onPress={onRepeat} accessibilityRole="button">
              <View style={[styles.actionBtn, { borderColor: theme.colors.primary }]}>
                <Ionicons name="repeat-outline" size={13} color={theme.colors.primary} />
                <AppText variant="caption" color={theme.colors.primary}>
                  Repeat
                </AppText>
              </View>
            </PressableScale>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, borderWidth: 1, padding: 16, gap: 12, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  route: { flexDirection: 'row', gap: 10 },
  routeIcons: { alignItems: 'center', paddingTop: 4 },
  pin: { width: 10, height: 10, borderRadius: 5, borderWidth: 2.5 },
  line: { width: 2, flex: 1, marginVertical: 3 },
  routeTexts: { flex: 1, gap: 8 },
  dropText: { marginTop: 2 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
