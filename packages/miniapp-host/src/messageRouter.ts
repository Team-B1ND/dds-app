import {
  MessageType,
  parseMessage,
  type HapticTriggerPayload,
} from '@dds-app/bridge';
import { handleHapticTrigger } from './haptic';

type MessageHandler<T> = (payload: T) => void;

const handlers: {
  [MessageType.HAPTIC_TRIGGER]: MessageHandler<HapticTriggerPayload>;
} = {
  [MessageType.HAPTIC_TRIGGER]: handleHapticTrigger,
};

export const routeMessage = (data: string): boolean => {
  const message = parseMessage(data);

  if (!message) {
    console.warn('[MiniAppHost] Invalid message:', data);
    return false;
  }

  const handler = handlers[message.type];

  if (!handler) {
    console.warn('[MiniAppHost] No handler for message type:', message.type);
    return false;
  }

  handler(message.payload as never);
  return true;
};
