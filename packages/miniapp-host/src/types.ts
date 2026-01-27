import type { WebViewProps } from 'react-native-webview';

export interface MiniAppHostProps extends Omit<WebViewProps, 'onMessage'> {
  /**
   * WebView source URL or HTML
   */
  source: WebViewProps['source'];
}