import { createContext, useContext } from 'react';
import type { NavigationProp, ScreenConfig, RouteParams } from './types';

interface StackContextValue {
  navigation: NavigationProp;
  screens: Map<string, ScreenConfig>;
  currentParams?: RouteParams;
}

export const StackContext = createContext<StackContextValue | null>(null);

export const useNavigation = (): NavigationProp => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error('useNavigation must be used within a Stack.Navigator');
  }
  return context.navigation;
};

export const useRoute = () => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error('useRoute must be used within a Stack.Navigator');
  }
  return {
    params: context.currentParams,
  };
};
