/**
 * Design tokens — the single source of truth for the Sharma Cabs brand.
 * Indigo carries the brand, champagne gold carries attention.
 */

export const palette = {
  indigo950: '#1e1b4b',
  indigo900: '#312e81',
  indigo800: '#3730a3',
  indigo700: '#4338ca',
  indigo600: '#4f46e5',
  indigo500: '#6366f1',
  indigo400: '#818cf8',
  indigo300: '#a5b4fc',
  indigo200: '#c7d2fe',

  gold500: '#fbbf24',
  gold600: '#d97706',
  gold300: '#fcd34d',

  night950: '#07080f',
  night900: '#0b0e20',
  night800: '#14172e',
  night700: '#1d2140',

  white: '#ffffff',
  cloud50: '#f7f7fb',
  cloud100: '#eef0f7',
  slate900: '#0f172a',
  slate600: '#475569',
  slate400: '#94a3b8',

  green500: '#22c55e',
  whatsapp: '#1fae54',
  red500: '#ef4444',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'label'
  | 'caption';

export const typography: Record<
  TypographyVariant,
  { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '600' | '700' | '800'; letterSpacing?: number }
> = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -0.8 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '700', letterSpacing: -0.5 },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700', letterSpacing: -0.3 },
  subheading: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.2 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.3 },
};

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  textFaint: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  gold: string;
  goldDeep: string;
  border: string;
  overlay: string;
  success: string;
  danger: string;
  whatsapp: string;
  shadow: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  gradients: {
    primary: [string, string];
    gold: [string, string];
    hero: [string, string, string];
    card: [string, string];
  };
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: palette.night900,
    surface: palette.night800,
    surfaceAlt: palette.night700,
    text: '#e9ebfb',
    textMuted: '#a5accd',
    textFaint: '#6b7299',
    primary: palette.indigo500,
    primarySoft: 'rgba(99, 102, 241, 0.16)',
    onPrimary: palette.white,
    gold: palette.gold500,
    goldDeep: palette.gold600,
    border: 'rgba(129, 140, 248, 0.16)',
    overlay: 'rgba(7, 8, 15, 0.7)',
    success: palette.green500,
    danger: palette.red500,
    whatsapp: palette.whatsapp,
    shadow: 'rgba(0, 0, 0, 0.55)',
  },
  gradients: {
    primary: [palette.indigo500, palette.indigo700],
    gold: [palette.gold500, palette.gold600],
    hero: [palette.indigo900, palette.night900, palette.night950],
    card: [palette.night800, palette.night700],
  },
  spacing,
  radii,
  typography,
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: palette.cloud50,
    surface: palette.white,
    surfaceAlt: palette.cloud100,
    text: palette.slate900,
    textMuted: palette.slate600,
    textFaint: palette.slate400,
    primary: palette.indigo600,
    primarySoft: 'rgba(79, 70, 229, 0.1)',
    onPrimary: palette.white,
    gold: palette.gold600,
    goldDeep: '#b45309',
    border: 'rgba(30, 27, 75, 0.1)',
    overlay: 'rgba(15, 23, 42, 0.45)',
    success: '#16a34a',
    danger: '#dc2626',
    whatsapp: palette.whatsapp,
    shadow: 'rgba(30, 27, 75, 0.18)',
  },
  gradients: {
    primary: [palette.indigo600, palette.indigo800],
    gold: [palette.gold500, palette.gold600],
    hero: [palette.indigo800, palette.indigo900, palette.indigo950],
    card: [palette.white, palette.cloud100],
  },
  spacing,
  radii,
  typography,
};
