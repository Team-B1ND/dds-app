import { createRequest, encode } from '@dds-app/bridge';
import type { BridgeState, PendingRequest } from '../types';

export const createRequestAction = (
  stateRef: React.RefObject<BridgeState>,
  sendMessage: (data: string) => void,
  defaultTimeout: number
) => {
  return <TPayload = unknown, TResponse = unknown>(
    type: string,
    payload?: TPayload,
    timeout: number = defaultTimeout
  ): Promise<TResponse> => {
    return new Promise((resolve, reject) => {
      const message = createRequest(type, payload);
      const { pendingRequests } = stateRef.current;

      const timeoutId = setTimeout(() => {
        delete pendingRequests[message.id];
        reject(new Error(`Request timeout: ${type}`));
      }, timeout);

      pendingRequests[message.id] = {
        resolve: resolve as (data: unknown) => void,
        reject,
        timeout: timeoutId,
      } satisfies PendingRequest;

      sendMessage(encode(message));
    });
  };
};