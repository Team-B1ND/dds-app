import type { WebViewProps } from 'react-native-webview';
import type { RequestHandler, EventHandler } from '@dds-app/bridge';

export interface MiniAppHostProps extends Omit<WebViewProps, 'onMessage'> {
  source: WebViewProps['source'];
  requestTimeout?: number;
}

export interface MiniAppHostRef {
  // Send event to WebView (fire-and-forget)
  emit: <TPayload = unknown>(type: string, payload?: TPayload) => void;
  // Send request to WebView and wait for response
  request: <TPayload = unknown, TResponse = unknown>(
    type: string,
    payload?: TPayload,
    timeout?: number
  ) => Promise<TResponse>;
  // Subscribe to events from WebView
  onEvent: <TPayload = unknown>(
    type: string,
    handler: EventHandler<TPayload>
  ) => () => void;
  // Register request handler for requests from WebView
  onRequest: <TPayload = unknown, TResponse = unknown>(
    type: string,
    handler: RequestHandler<TPayload, TResponse>
  ) => () => void;
}