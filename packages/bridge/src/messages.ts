import {
  BridgeMessageSchema,
  type MessageTypeValue,
  type MessagePayloadMap,
  type BridgeMessage,
} from './types';

export const createMessage = <T extends MessageTypeValue>(
  type: T,
  payload: MessagePayloadMap[T]
): BridgeMessage => ({
  id: crypto.randomUUID(),
  type,
  payload,
});

export const parseMessage = (data: string): BridgeMessage | null => {
  try {
    const json = JSON.parse(data);
    return BridgeMessageSchema.parse(json);
  } catch {
    return null;
  }
};

export const safeParseMessage = (data: string) => {
  try {
    const json = JSON.parse(data);
    return BridgeMessageSchema.safeParse(json);
  } catch {
    return { success: false as const, error: new Error('Invalid JSON') };
  }
};

export const stringifyMessage = (message: BridgeMessage): string => {
  return JSON.stringify(message);
};
