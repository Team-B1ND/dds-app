import { createContext, useContext } from 'react';

interface ItemLayout {
  width: number;
  x: number;
}

interface TabContextValue {
  value: string;
  fluid: boolean;
  onChange: (value: string) => void;
  registerLayout: (itemValue: string, layout: ItemLayout) => void;
}

export const TabContext = createContext<TabContextValue | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab.Item must be used within a Tab');
  }
  return context;
};
