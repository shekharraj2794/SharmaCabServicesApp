import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme';
import { Screen } from '../components/ui/Screen';
import { AppText } from '../components/ui/AppText';
import { ListRow } from '../components/ui/ListRow';
import { TextField } from '../components/ui/TextField';
import { PremiumButton } from '../components/ui/PremiumButton';
import { Chip } from '../components/ui/Chip';
import { getJSON, setJSON, storage, StorageKeys } from '../services/storage';
import { vehicleById } from '../data/vehicles';
import { SavedAddress, UserProfile } from '../types/models';

export function ProfileScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [profile, setProfile] = useState<UserProfile>(
    () => getJSON<UserProfile>(StorageKeys.profile) ?? { name: '', phone: '' },
  );
  const [editing, setEditing] = useState(!profile.name);
  const [addresses, setAddresses] = useState<SavedAddress[]>(
    () => getJSON<SavedAddress[]>(StorageKeys.addresses) ?? [],
  );
  const [newAddress, setNewAddress] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    () => getJSON<string[]>(StorageKeys.favorites) ?? [],
  );

  const saveProfile = () => {
    setJSON(StorageKeys.profile, profile);
    setEditing(false);
  };

  const addAddress = () => {
    if (!newAddress.trim()) {
      return;
    }
    const next = [
      ...addresses,
      { id: `${Date.now()}`, label: `Place ${addresses.length + 1}`, address: newAddress.trim() },
    ];
    setAddresses(next);
    setJSON(StorageKeys.addresses, next);
    setNewAddress('');
  };

  const removeAddress = (id: string) => {
    const next = addresses.filter(a => a.id !== id);
    setAddresses(next);
    setJSON(StorageKeys.addresses, next);
  };

  const removeFavorite = (id: string) => {
    const next = favorites.filter(f => f !== id);
    setFavorites(next);
    setJSON(StorageKeys.favorites, next);
  };

  const logout = () => {
    Alert.alert('Log out', 'This clears your profile details on this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          storage.remove(StorageKeys.profile);
          setProfile({ name: '', phone: '' });
          setEditing(true);
        },
      },
    ]);
  };

  const initials =
    profile.name
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SC';

  return (
    <Screen scroll>
      <AppText variant="title" style={styles.title}>
        Profile
      </AppText>

      {/* Identity card */}
      <Animated.View entering={FadeInDown.springify()}>
        <LinearGradient
          colors={theme.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.idCard}>
          <View style={styles.avatar}>
            <AppText variant="heading" color="#1e1b4b">
              {initials}
            </AppText>
          </View>
          <View style={styles.idText}>
            <AppText variant="heading" color="#ffffff">
              {profile.name || 'Welcome, rider'}
            </AppText>
            <AppText variant="caption" color="rgba(255,255,255,0.8)">
              {profile.phone || 'Add your details for faster booking'}
            </AppText>
          </View>
          <Ionicons
            name={editing ? 'close' : 'create-outline'}
            size={20}
            color="#ffffff"
            onPress={() => setEditing(!editing)}
            accessibilityLabel={editing ? 'Cancel editing' : 'Edit profile'}
          />
        </LinearGradient>
      </Animated.View>

      {editing ? (
        <Animated.View entering={FadeInDown.springify()} style={styles.editBlock}>
          <TextField
            label="Name"
            icon="person-outline"
            value={profile.name}
            onChangeText={t => setProfile({ ...profile, name: t })}
            placeholder="Your name"
          />
          <TextField
            label="Phone"
            icon="call-outline"
            value={profile.phone}
            onChangeText={t => setProfile({ ...profile, phone: t })}
            placeholder="+91 …"
            keyboardType="phone-pad"
          />
          <PremiumButton label="Save profile" variant="primary" onPress={saveProfile} />
        </Animated.View>
      ) : null}

      {/* Saved addresses */}
      <AppText variant="heading" style={styles.section}>
        Saved places
      </AppText>
      {addresses.map(a => (
        <ListRow
          key={a.id}
          icon="bookmark-outline"
          title={a.address}
          subtitle={a.label}
          onPress={() => removeAddress(a.id)}
          trailing="Remove"
        />
      ))}
      <View style={styles.addRow}>
        <View style={styles.addField}>
          <TextField
            label="Add a place"
            icon="location-outline"
            value={newAddress}
            onChangeText={setNewAddress}
            placeholder="e.g. Home — Castairs Town, Deoghar"
          />
        </View>
        <PremiumButton label="Add" small variant="primary" onPress={addAddress} style={styles.addBtn} />
      </View>

      {/* Favourites */}
      {favorites.length > 0 ? (
        <>
          <AppText variant="heading" style={styles.section}>
            Favourite vehicles
          </AppText>
          <View style={styles.favRow}>
            {favorites.map(id => {
              const v = vehicleById(id);
              return v ? (
                <Chip key={id} label={`${v.name} ✕`} selected onPress={() => removeFavorite(id)} />
              ) : null;
            })}
          </View>
        </>
      ) : null}

      {/* Links */}
      <AppText variant="heading" style={styles.section}>
        More
      </AppText>
      <ListRow
        icon="time-outline"
        title="Booking history"
        subtitle="Upcoming, completed and cancelled rides"
        onPress={() => navigation.navigate('History')}
      />
      <ListRow
        icon="star-outline"
        title="Reviews"
        subtitle="5.0 on Google · 85+ reviews"
        onPress={() => navigation.navigate('Reviews')}
      />
      <ListRow
        icon="information-circle-outline"
        title="About Sharma Cabs"
        onPress={() => navigation.navigate('About')}
      />
      <ListRow
        icon="call-outline"
        title="Contact & support"
        onPress={() => navigation.navigate('Contact')}
      />
      <ListRow
        icon="settings-outline"
        title="Settings"
        subtitle="Theme, notifications, privacy"
        onPress={() => navigation.navigate('Settings')}
      />
      {profile.name ? (
        <ListRow icon="log-out-outline" title="Log out" danger onPress={logout} />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: 14, marginBottom: 16 },
  idCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 22,
    padding: 18,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: { flex: 1, gap: 2 },
  editBlock: { marginTop: 16 },
  section: { marginTop: 26, marginBottom: 12 },
  addRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  addField: { flex: 1 },
  addBtn: { marginTop: 24 },
  favRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
