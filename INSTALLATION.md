# Running Sharma Cabs manually — iOS & Android

Step-by-step guide to run the app on the iOS Simulator and an Android device/emulator
from your own terminal, Xcode, or Android Studio.

---

## 0. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | **≥ 20.19** (22 LTS recommended) | RN 0.86's Metro crashes on older Node |
| Xcode | 16+ (26 works) | with iOS Simulator runtimes |
| CocoaPods | 1.13+ | `brew install cocoapods` |
| JDK | 17 | `brew install openjdk@17` (Android Studio's bundled JBR also works) |
| Android SDK | Platform 36 + build-tools | installed via Android Studio |

**On this Mac specifically** (already set up, kept here for reference):

- Node 22 is installed keg-only at `/opt/homebrew/opt/node@22/bin`. Either prefix
  commands with `PATH="/opt/homebrew/opt/node@22/bin:$PATH"` or add that line to
  `~/.zshrc` once:
  ```bash
  echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
  ```
- `xcode-select` points at Command Line Tools instead of Xcode. Fix it once:
  ```bash
  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
  ```
  (Without this, prefix iOS commands with
  `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`.)

---

## 1. One-time project setup

```bash
git clone https://github.com/shekharraj2794/SharmaCabServicesApp.git
cd SharmaCabServicesApp
npm install
```

**iOS pods** (repeat only when native dependencies change):

```bash
cd ios && pod install && cd ..
```

**Machine-specific files** (gitignored — create them once per machine):

```bash
# Tells Xcode's build phases which node to use
echo 'export NODE_BINARY=/opt/homebrew/opt/node@22/bin/node' > ios/.xcode.env.local

# Tells Gradle where the Android SDK lives
echo 'sdk.dir=/Users/rajshekhar/Library/Android/sdk' > android/local.properties
```

---

## 2. Start Metro (always — one terminal, keep it running)

```bash
npm start
```

Leave this terminal open. Both apps load their JavaScript from it in development.

---

## 3. Run iOS

### Option A — terminal

```bash
npx react-native run-ios --simulator "iPhone 17 Pro"
```

(Any installed simulator name works; list them with
`xcrun simctl list devices available`.)

### Option B — Xcode

1. Open **`ios/SharmaCabServicesApp.xcworkspace`** (the *workspace*, never the
   `.xcodeproj` — pods live in the workspace).
2. Pick a simulator in the toolbar's device menu.
3. Press **Run** (⌘R). Metro must already be running (step 2).

---

## 4. Run Android

### Option A — terminal (device or emulator already running)

```bash
npx react-native run-android
```

- **Real phone:** enable *Developer options → USB debugging*, plug in, accept the
  prompt, then run the command. Check the phone is seen with
  `~/Library/Android/sdk/platform-tools/adb devices`.
- **Emulator:** start one from Android Studio first (see below), then run the command.

### Option B — Android Studio

1. Open the **`android/`** folder in Android Studio and let Gradle sync.
2. **Device Manager → ▶** to boot an emulator (if the existing AVD fails with
   *"No initial system image"*, delete it and create a new one — the API 36
   image on this machine is corrupted; re-downloading it fixes it).
3. Press **Run ▶** with the `app` configuration. Metro must be running.

---

## 5. Everyday commands

```bash
npm start                 # Metro dev server
npm test                  # unit tests
npm run lint              # eslint
npx tsc --noEmit          # type-check
npm start -- --reset-cache  # Metro with a cold cache (weird bundle issues)
```

**Shareable release APK** (debug-signed, for testing):

```bash
cd android && ./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

---

## 6. Troubleshooting (all hit and solved on this project)

| Symptom | Fix |
|---|---|
| Metro crashes: `styleText … Received ['blue','bold']` | Node too old — use Node ≥ 20.19 (see §0) |
| `pod install`: *Unable to find NitroModules* | `npm install` first (`react-native-nitro-modules` is a dependency) |
| Icons render as "?" boxes | `Ionicons.ttf` must be in `UIAppFonts` (already committed); rebuild the app |
| `xcodebuild requires Xcode` error | run the `xcode-select -s` command from §0 |
| AAPT: *file failed to compile* on images | an image in `src/assets/images` isn't a real PNG — convert with `sips -s format png` |
| Emulator: *No initial system image* | recreate the AVD in Android Studio's Device Manager |
| Port 8081 already in use | `lsof -ti:8081 \| xargs kill` then `npm start` |
| App shows old JS after edits | press `r` in the Metro terminal, or delete the app and rerun |

---

## 7. Project map

See [README.md](README.md) for architecture, features, and the Android test APK
download under **Releases**.
