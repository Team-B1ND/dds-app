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
