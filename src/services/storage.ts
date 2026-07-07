import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'sharma-cabs' });

export const StorageKeys = {
  themeMode: 'theme.mode',
  onboardingDone: 'onboarding.done',
  profile: 'user.profile',
  addresses: 'user.addresses',
  favorites: 'user.favorites',
  bookings: 'bookings.history',
  notifications: 'settings.notifications',
  language: 'settings.language',
} as const;

export function getJSON<T>(key: string): T | undefined {
  const raw = storage.getString(key);
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function setJSON(key: string, value: unknown): void {
  storage.set(key, JSON.stringify(value));
}
