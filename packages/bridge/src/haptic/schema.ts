import { z } from 'zod';
import { MessageType } from '../types';

export const HapticFeedbackTypeSchema = z.enum([
  'impactLight',
  'impactMedium',
  'impactHeavy',
  'notificationSuccess',
  'notificationWarning',
  'notificationError',
  'selection',
]);

export const HapticTriggerPayloadSchema = z.object({
  type: HapticFeedbackTypeSchema,
});

export const HapticTriggerMessageSchema = z.object({
  id: z.string(),
  type: z.literal(MessageType.HAPTIC_TRIGGER),
  payload: HapticTriggerPayloadSchema,
});

export type HapticFeedbackType = z.infer<typeof HapticFeedbackTypeSchema>;
export type HapticTriggerPayload = z.infer<typeof HapticTriggerPayloadSchema>;
export type HapticTriggerMessage = z.infer<typeof HapticTriggerMessageSchema>;
