import { useEffect, useRef, useMemo } from 'react';
import { decode, isRequest, isResponse, isEvent } from '@dds-app/bridge';
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
}

export const useBridge = ({
  requestTimeout = DEFAULT_TIMEOUT,
}: UseBridgeOptions = {}) => {
  const stateRef = useRef<BridgeState>({
    pendingRequests: {},
    eventHandlers: {},
    requestHandlers: {},
  });

  const sendToNative = useMemo(() => {
    return (data: string) => {
      window.ReactNativeWebView?.postMessage(data);
    };
  }, []);

  const handleResponse = useMemo(() => createHandleResponse(stateRef), []);
  const handleEvent = useMemo(() => createHandleEvent(stateRef), []);
  const handleRequest = useMemo(
    () => createHandleRequest(stateRef, sendToNative),
    [sendToNative]
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = decode(event.data);
      if (!message) return;

      if (isResponse(message)) {
        handleResponse(message);
      } else if (isEvent(message)) {
        handleEvent(message);
      } else if (isRequest(message)) {
        handleRequest(message).catch(() => {});
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleResponse, handleEvent, handleRequest]);

  const emit = useMemo(() => createEmit(sendToNative), [sendToNative]);
  const request = useMemo(
    () => createRequestAction(stateRef, sendToNative, requestTimeout),
    [sendToNative, requestTimeout]
  );
  const onEvent = useMemo(() => createOnEvent(stateRef), []);
  const onRequest = useMemo(() => createOnRequest(stateRef), []);

  return { emit, request, onEvent, onRequest };
};
