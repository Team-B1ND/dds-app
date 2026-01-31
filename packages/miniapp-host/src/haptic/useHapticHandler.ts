import { useEffect } from 'react';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {
  HAPTIC_EVENT_TYPE,
  type HapticPayload,
  type HapticType,
} from '@dds-app/bridge';
import type { MiniAppHostRef } from '../types';

const hapticTypeMap: Record<HapticType, HapticFeedbackTypes> = {
  impactLight: HapticFeedbackTypes.impactLight,
  impactMedium: HapticFeedbackTypes.impactMedium,
  impactHeavy: HapticFeedbackTypes.impactHeavy,
  notificationSuccess: HapticFeedbackTypes.notificationSuccess,
  notificationWarning: HapticFeedbackTypes.notificationWarning,
  notificationError: HapticFeedbackTypes.notificationError,
  selection: HapticFeedbackTypes.selection,
};

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const useHapticHandler = (
  hostRef: React.RefObject<MiniAppHostRef | null>
) => {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    return host.onEvent<HapticPayload>(HAPTIC_EVENT_TYPE, (payload) => {
      const hapticType =
        hapticTypeMap[payload.type] || hapticTypeMap.impactLight;
      ReactNativeHapticFeedback.trigger(hapticType, hapticOptions);
    });
  }, [hostRef]);
};
