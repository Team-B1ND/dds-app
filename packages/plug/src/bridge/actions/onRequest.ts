import type { RequestHandler } from '@dds-app/bridge';
import type { BridgeState } from '../types';

export const createOnRequest = (stateRef: React.RefObject<BridgeState>) => {
  return <TPayload = unknown, TResponse = unknown>(
    type: string,
    handler: RequestHandler<TPayload, TResponse>
  ): (() => void) => {
    stateRef.current.requestHandlers[type] = handler as RequestHandler;

    return () => {
      delete stateRef.current.requestHandlers[type];
    };
  };
};