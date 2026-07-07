import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme, ThemeMode } from '../theme';
import { Screen } from '../components/ui/Screen';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { AppText } from '../components/ui/AppText';
import { Chip } from '../components/ui/Chip';
import { ListRow } from '../components/ui/ListRow';
import { storage, StorageKeys } from '../services/storage';
import { links } from '../services/links';

const modes: { key: ThemeMode; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export function SettingsScreen() {
  const { mode, setMode } = useTheme();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(
    () => storage.getBoolean(StorageKeys.notifications) ?? true,
  );

  const toggleNotifications = (value: boolean) => {
    setNotifications(value);
    storage.set(StorageKeys.notifications, value);
  };

  const deleteData = () => {
    Alert.alert(
      'Delete my data',
      'This permanently removes your profile, saved places, favourites and booking history from this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete everything',
          style: 'destructive',
          onPress: () => {
            storage.clearAll();
            navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
          },
        },
      ],
    );
  };

  return (
    <Screen scroll>
      <ScreenHeader title="Settings" />

      <Animated.View entering={FadeInDown.springify()}>
        <AppText variant="heading" style={styles.section}>
          Appearance
        </AppText>
        <View style={styles.modes}>
          {modes.map(m => (
            <Chip
              key={m.key}
              label={m.label}
              selected={mode === m.key}
              onPress={() => setMode(m.key)}
            />
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(90).springify()}>
        <AppText variant="heading" style={styles.section}>
          Preferences
        </AppText>
        <ListRow
          icon="notifications-outline"
          title="Booking updates"
          subtitle="Reminders and status alerts"
          switchValue={notifications}
          onSwitch={toggleNotifications}
        />
        <ListRow
          icon="language-outline"
          title="Language"
          subtitle="Hindi support is on the way"
          trailing="English"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(180).springify()}>
        <AppText variant="heading" style={styles.section}>
          Legal
        </AppText>
        <ListRow
          icon="lock-closed-outline"
          title="Privacy"
          subtitle="Your data stays on this device"
          onPress={links.website}
        />
        <ListRow
          icon="document-text-outline"
          title="Terms of service"
          onPress={links.website}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(270).springify()}>
        <AppText variant="heading" style={styles.section}>
          Danger zone
        </AppText>
        <ListRow
          icon="trash-outline"
          title="Delete my data"
          subtitle="Profile, places, favourites and history"
          danger
          onPress={deleteData}
        />
      </Animated.View>

      <AppText variant="caption" muted center style={styles.version}>
        Sharma Cab Services · v1.0.0 · Made in Deoghar
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22, marginBottom: 12 },
  modes: { flexDirection: 'row', gap: 8 },
  version: { marginTop: 30 },
});
