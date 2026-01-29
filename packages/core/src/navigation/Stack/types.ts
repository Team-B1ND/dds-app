import type { ComponentType, ReactNode } from 'react';

export interface RouteParams {
  [key: string]: any;
}

export interface NavigationProp {
  navigate: (name: string, params?: RouteParams) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  getParam: <T = any>(key: string, defaultValue?: T) => T | undefined;
}

export interface RouteProp {
  name: string;
  params?: RouteParams;
}

export interface ScreenComponentProps {
  navigation: NavigationProp;
  route: RouteProp;
}

export interface ScreenConfig {
  name: string;
  component: ComponentType<ScreenComponentProps>;
  header?: ReactNode;
  blockSwipe?: boolean;
}

export interface StackNavigatorProps {
  children: ReactNode;
  initialRouteName?: string;
}

export interface ScreenProps {
  name: string;
  component: ComponentType<ScreenComponentProps>;
  header?: ReactNode;
  blockSwipe?: boolean;
}

export interface StackEntry {
  key: string;
  name: string;
  params?: RouteParams;
}
