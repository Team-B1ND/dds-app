import { useCallback, useRef, useMemo } from 'react';
import { decode, isRequest, isResponse, isEvent } from '@dds-app/bridge';
import type { WebViewMessageEvent } from 'react-native-webview';
import type { BridgeState } from './types';
import {
  createHandleResponse,
  createHandleEvent,
  createHandleRequest,
} from './handlers';
import {
  createEmit,
  createRequestAction,
  createOnEvent,
  createOnRequest,
} from './actions';

const DEFAULT_TIMEOUT = 30000;

interface UseBridgeOptions {
  requestTimeout?: number;
  sendMessage: (data: string) => void;
}

export const useBridge = ({
  requestTimeout = DEFAULT_TIMEOUT,
  sendMessage,
}: UseBridgeOptions) => {
  const stateRef = useRef<BridgeState>({
    pendingRequests: {},
    eventHandlers: {},
    requestHandlers: {},
  });

  const handleResponse = useMemo(() => createHandleResponse(stateRef), []);
  const handleEvent = useMemo(() => createHandleEvent(stateRef), []);
  const handleRequest = useMemo(
    () => createHandleRequest(stateRef, sendMessage),
    [sendMessage]
  );

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const message = decode(event.nativeEvent.data);
      if (!message) return;

      if (isResponse(message)) {
        handleResponse(message);
      } else if (isEvent(message)) {
        handleEvent(message);
      } else if (isRequest(message)) {
        handleRequest(message);
      }
    },
    [handleResponse, handleEvent, handleRequest]
  );

  const emit = useMemo(() => createEmit(sendMessage), [sendMessage]);
  const request = useMemo(
    () => createRequestAction(stateRef, sendMessage, requestTimeout),
    [sendMessage, requestTimeout]
  );
  const onEvent = useMemo(() => createOnEvent(stateRef), []);
  const onRequest = useMemo(() => createOnRequest(stateRef), []);

  return {
    handleMessage,
    emit,
    request,
    onEvent,
    onRequest,
  };
};
