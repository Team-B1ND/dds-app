import { z } from 'zod';
import {
  HapticTriggerMessageSchema,
  type HapticTriggerPayload,
} from './haptic';

// Message types
export const MessageType = {
  HAPTIC_TRIGGER: 'HAPTIC_TRIGGER',
} as const;

export type MessageTypeValue = (typeof MessageType)[keyof typeof MessageType];

// Union of all message schemas
export const BridgeMessageSchema = z.discriminatedUnion('type', [
  HapticTriggerMessageSchema,
]);

// Response schema
export const BridgeResponseSchema = z.object({
  id: z.string(),
  success: z.boolean(),
  error: z.string().optional(),
});

// Inferred types
export type BridgeMessage = z.infer<typeof BridgeMessageSchema>;
export type BridgeResponse = z.infer<typeof BridgeResponseSchema>;

// Payload map for createMessage helper
export type MessagePayloadMap = {
  [MessageType.HAPTIC_TRIGGER]: HapticTriggerPayload;
};