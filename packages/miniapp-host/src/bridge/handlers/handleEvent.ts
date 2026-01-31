import type { EventMessage } from '@dds-app/bridge';
import type { BridgeState } from '../types';

export const createHandleEvent = (stateRef: React.RefObject<BridgeState>) => {
  return (message: EventMessage) => {
    const handlers = stateRef.current.eventHandlers[message.type];
    if (!handlers) return;

    handlers.forEach((handler) => {
      try {
        handler(message.payload, message);
      } catch (error) {
        console.error(
          `[MiniAppHost] Event handler error for ${message.type}:`,
          error
        );
      }
    });
  };
};