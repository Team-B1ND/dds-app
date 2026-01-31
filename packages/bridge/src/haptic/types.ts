export const HAPTIC_EVENT_TYPE = 'HAPTIC_TRIGGER';

export type HapticType =
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'
  | 'selection';

export interface HapticPayload {
  type: HapticType;
}
