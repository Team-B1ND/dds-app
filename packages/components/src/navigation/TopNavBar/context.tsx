import { createContext, useContext } from 'react';

interface TopNavBarContextValue {
  goBack?: () => void;
}

export const TopNavBarContext = createContext<TopNavBarContextValue>({});

export const useTopNavBarContext = () => useContext(TopNavBarContext);
