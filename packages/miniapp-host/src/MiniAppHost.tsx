import { useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import { WebView } from 'react-native-webview';
import type WebViewType from 'react-native-webview';
import { useBridge } from './bridge';
import type { MiniAppHostProps, MiniAppHostRef } from './types';

export const MiniAppHost = forwardRef<MiniAppHostRef, MiniAppHostProps>(
  ({ source, requestTimeout, ...props }, ref) => {
    const webViewRef = useRef<WebViewType>(null);

    const sendMessage = useCallback((data: string) => {
      webViewRef.current?.postMessage(data);
    }, []);

    const { handleMessage, emit, request, onEvent, onRequest } = useBridge({
      requestTimeout,
      sendMessage,
    });

    useImperativeHandle(ref, () => ({ emit, request, onEvent, onRequest }), [
      emit,
      request,
      onEvent,
      onRequest,
    ]);

    return (
      <WebView
        ref={webViewRef}
        source={source}
        onMessage={handleMessage}
        {...props}
      />
    );
  }
);

MiniAppHost.displayName = 'MiniAppHost';
