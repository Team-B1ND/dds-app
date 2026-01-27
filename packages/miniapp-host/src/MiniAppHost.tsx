import { useCallback } from 'react';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { routeMessage } from './messageRouter';
import type { MiniAppHostProps } from './types';

export const MiniAppHost = ({ source, ...props }: MiniAppHostProps) => {
  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    routeMessage(data);
  }, []);

  return <WebView source={source} onMessage={handleMessage} {...props} />;
};