import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, StatusBar } from 'react-native';
import { darkTheme, lightTheme, Theme } from './tokens';
import { storage, StorageKeys } from '../services/storage';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveSystem(): 'light' | 'dark' {
  return Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = storage.getString(StorageKeys.themeMode);
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'dark';
  });
  const [systemScheme, setSystemScheme] = useState<'light' | 'dark'>(resolveSystem);

  useEffect(() => {
    const sub = Appearance.addChangeListener(() => setSystemScheme(resolveSystem()));
    return () => sub.remove();
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    storage.set(StorageKeys.themeMode, next);
  }, []);

  const effective = mode === 'system' ? systemScheme : mode;
  const theme = effective === 'dark' ? darkTheme : lightTheme;

  const toggle = useCallback(
    () => setMode(effective === 'dark' ? 'light' : 'dark'),
    [effective, setMode],
  );

  const value = useMemo(
    () => ({ theme, mode, setMode, toggle }),
    [theme, mode, setMode, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
