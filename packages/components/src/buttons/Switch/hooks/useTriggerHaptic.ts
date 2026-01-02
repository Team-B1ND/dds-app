import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const useTriggerHaptic = () => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const triggerHaptic = () => {
    if (Platform.OS === 'web') return;
    ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  return {
    triggerHaptic,
  };
};
