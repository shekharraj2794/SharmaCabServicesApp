import { useCallback } from 'react';
import HapticFeedback from 'react-native-haptic-feedback';

const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };

export function useHaptics() {
  const light = useCallback(() => HapticFeedback.trigger('impactLight', options), []);
  const medium = useCallback(() => HapticFeedback.trigger('impactMedium', options), []);
  const success = useCallback(
    () => HapticFeedback.trigger('notificationSuccess', options),
    [],
  );
  return { light, medium, success };
}
