import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  type HapticOptions,
} from 'react-native-haptic-feedback';
import type { HapticTriggerPayload, HapticFeedbackType } from '@dds-app/bridge';

const HAPTIC_TYPE_MAP: Record<HapticFeedbackType, HapticFeedbackTypes> = {
  impactLight: HapticFeedbackTypes.impactLight,
  impactMedium: HapticFeedbackTypes.impactMedium,
  impactHeavy: HapticFeedbackTypes.impactHeavy,
  notificationSuccess: HapticFeedbackTypes.notificationSuccess,
  notificationWarning: HapticFeedbackTypes.notificationWarning,
  notificationError: HapticFeedbackTypes.notificationError,
  selection: HapticFeedbackTypes.selection,
};

const options: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const handleHapticTrigger = (payload: HapticTriggerPayload) => {
  const hapticType = HAPTIC_TYPE_MAP[payload.type];
  ReactNativeHapticFeedback.trigger(hapticType, options);
};
