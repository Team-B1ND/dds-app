import {
  createSuccessResponse,
  createErrorResponse,
  encode,
  type RequestMessage,
} from '@dds-app/bridge';
import type { BridgeState } from '../types';

export const createHandleRequest = (
  stateRef: React.RefObject<BridgeState>,
  sendMessage: (data: string) => void
) => {
  return async (message: RequestMessage) => {
    const handler = stateRef.current.requestHandlers[message.type];

    if (!handler) {
      sendMessage(
        encode(
          createErrorResponse(
            message.id,
            `No handler for request type: ${message.type}`
          )
        )
      );
      return;
    }

    try {
      const result = await handler(message.payload, message);
      sendMessage(encode(createSuccessResponse(message.id, result)));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      sendMessage(encode(createErrorResponse(message.id, errorMessage)));
    }
  };
};