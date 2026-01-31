import type { ResponseMessage } from '@dds-app/bridge';
import type { BridgeState } from '../types';

export const createHandleResponse = (stateRef: React.RefObject<BridgeState>) => {
  return (message: ResponseMessage) => {
    const { pendingRequests } = stateRef.current;
    const pending = pendingRequests[message.requestId];
    if (!pending) return;

    clearTimeout(pending.timeout);
    delete pendingRequests[message.requestId];

    if (message.success) {
      pending.resolve(message.data);
    } else {
      pending.reject(new Error(message.error || 'Request failed'));
    }
  };
};