import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type MessageTypeValue,
  type MessagePayloadMap,
  createMessage,
  stringifyMessage,
} from '@dds-app/bridge';

declare const window: {
  ReactNativeWebView?: {
    postMessage: (data: string) => void;
  };
};

interface PlugContextValue {
  send: <T extends MessageTypeValue>(
    type: T,
    payload: MessagePayloadMap[T]
  ) => void;
}

const PlugContext = createContext<PlugContextValue | null>(null);

interface PlugProviderProps {
  children: ReactNode;
}

export const PlugProvider = ({ children }: PlugProviderProps) => {
  const send = useCallback(
    <T extends MessageTypeValue>(type: T, payload: MessagePayloadMap[T]) => {
      const message = createMessage(type, payload);
      const data = stringifyMessage(message);

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(data);
      }
    },
    []
  );

  return (
    <PlugContext.Provider value={{ send }}>{children}</PlugContext.Provider>
  );
};

export const usePlug = (): PlugContextValue => {
  const context = useContext(PlugContext);
  if (!context) {
    throw new Error('usePlug must be used within a PlugProvider');
  }
  return context;
};
