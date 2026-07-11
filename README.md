# Sharma Cab Services — Mobile App

Premium React Native app for **Sharma Cab Services**, Deoghar, Jharkhand — the 5.0★-rated
(85+ Google reviews) taxi service. Android + iOS, matching the brand and content of the
[live website](https://deoghartaxiservices.netlify.app).

## Highlights

- **Dark-first theme system** with light mode and system-follow, persisted in MMKV
- **Animated splash** (logo spring + pulse ring + progress), 3-slide onboarding
- **Home**: gradient hero with Skia glow orbs + drifting gold particles, live rating chip,
  popular routes, featured vehicles, offers, animated counters, latest reviews
- **Fleet & vehicle details**: FlashList with staggered entrances, Ken Burns gallery,
  specs grid, favourites, sticky booking CTA with pulse ring
- **Booking flow**: trip types, day/time chips, vehicle picker, promo codes, transparent
  indicative fare estimate → **confetti success screen** → WhatsApp handoff to the owner
  (how the business really books rides), receipt share, history tracking
- **Tour packages, reviews, about (stats + timeline), contact (call/WhatsApp/maps/inquiry)**
- **Profile** (local, on-device), saved places, favourites; **history** with repeat booking
  and cancellation; **settings** with theme, notifications, data deletion
- **Floating glass tab bar** with a spring-animated active indicator and haptic ticks
- Micro-interactions everywhere: press-scale springs, pulse rings, shimmer skeletons,
  pull-to-refresh, haptics — all Reanimated, all 60fps-friendly

## Tech stack

React Native 0.86 · TypeScript (strict) · React Navigation 7 · **Reanimated v4**
(RN 0.86 requires v4; it ships the complete v3 API) · Gesture Handler · Skia · SVG ·
Linear Gradient · Blur (iOS; tinted fallback on Android) · MMKV v4 · Axios +
TanStack Query · FlashList v2 · Vector Icons (Ionicons) · Haptic Feedback · Lottie
(installed for future brand animations).

## Architecture

```
src/
  app/          App entry: providers (Gesture, SafeArea, Query, Theme, Navigation)
  theme/        Design tokens, dark/light themes, ThemeProvider
  navigation/   Root stack, tabs, custom animated TabBar, typed params
  components/
    ui/         AppText, PremiumButton, GlassCard, TextField, Chip, Skeleton,
                AnimatedCounter, PulseRing, RatingStars, ListRow, ScreenHeader…
    cards/      Vehicle / Review / Package / Destination / Offer / Booking cards
    fx/         ParticleField, GlowOrbs (Skia), Confetti
  screens/      14 screens (Splash → Settings)
  services/     api (axios + simulated latency), bookings, links, storage (MMKV)
  hooks/        React Query hooks, useBookings, useHaptics
  data/         Real business data: fleet, reviews, packages, routes, company
  types/        Domain models
  utils/        Formatting, date/time helpers
```

The API layer resolves from bundled real business data behind simulated latency (so
loading/skeleton states are real). Point `services/api.ts` at a backend later — the
signatures and React Query hooks stay unchanged. Fare estimates are explicitly
**indicative**; the final fare is always confirmed by the owner on WhatsApp.

## Running

```bash
npm install

# iOS (needs Xcode + CocoaPods)
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios

# Android (needs Android SDK)
npm run android
```

Checks: `npx tsc --noEmit` · `npm run lint` · `npm test`

### macOS setup notes

- **Node ≥ 20.19 required** (RN 0.86's Metro uses newer `util.styleText`). If your default
  Node is older, install a newer one (e.g. `brew install node@22`) and put it first in
  `PATH`, or set `NODE_BINARY` in `ios/.xcode.env.local`.
- If `xcodebuild` complains about Command Line Tools, point it at Xcode once:
  `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- iOS fonts: `Ionicons.ttf` is registered via `UIAppFonts` in `Info.plist` (already done).
- To run on a specific simulator:
  `npx react-native run-ios --simulator "iPhone 17 Pro"`

## Business contact

+91 87787 35540 · WhatsApp bookings · Deoghar, Jharkhand
