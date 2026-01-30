import { createContext, useContext, type ReactNode } from 'react';
import { useBridge } from './bridge';
import type { PlugContextValue } from './bridge';

const PlugContext = createContext<PlugContextValue | null>(null);

interface PlugProviderProps {
  children: ReactNode;
  requestTimeout?: number;
}

export const PlugProvider = ({
  children,
  requestTimeout,
}: PlugProviderProps) => {
  const bridge = useBridge({ requestTimeout });

  return <PlugContext.Provider value={bridge}>{children}</PlugContext.Provider>;
};

export const usePlug = (): PlugContextValue => {
  const context = useContext(PlugContext);
  if (!context) {
    throw new Error('usePlug must be used within a PlugProvider');
  }
  return context;
};
