import type { EventHandler } from '@dds-app/bridge';
import type { BridgeState } from '../types';

export const createOnEvent = (stateRef: React.RefObject<BridgeState>) => {
  return <TPayload = unknown>(
    type: string,
    handler: EventHandler<TPayload>
  ): (() => void) => {
    const { eventHandlers } = stateRef.current;

    if (!eventHandlers[type]) {
      eventHandlers[type] = new Set();
    }
    eventHandlers[type].add(handler as EventHandler);

    return () => {
      const handlers = eventHandlers[type];
      if (handlers) {
        handlers.delete(handler as EventHandler);
        if (handlers.size === 0) {
          delete eventHandlers[type];
        }
      }
    };
  };
};