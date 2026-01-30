import type { EventHandler, RequestHandler } from '@dds-app/bridge';

export interface PendingRequest {
  resolve: (data: unknown) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
}

export interface BridgeState {
  pendingRequests: Record<string, PendingRequest>;
  eventHandlers: Record<string, Set<EventHandler>>;
  requestHandlers: Record<string, RequestHandler>;
}

export interface PlugContextValue {
  emit: <TPayload = unknown>(type: string, payload?: TPayload) => void;
  request: <TPayload = unknown, TResponse = unknown>(
    type: string,
    payload?: TPayload,
    timeout?: number
  ) => Promise<TResponse>;
  onEvent: <TPayload = unknown>(
    type: string,
    handler: EventHandler<TPayload>
  ) => () => void;
  onRequest: <TPayload = unknown, TResponse = unknown>(
    type: string,
    handler: RequestHandler<TPayload, TResponse>
  ) => () => void;
}