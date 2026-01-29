import { useMemo, Children, isValidElement, type ReactNode } from 'react';
import { Screen } from '../Screen';
import type { ScreenProps, ScreenConfig } from '../types';

export const useScreenConfig = (children: ReactNode) => {
  return useMemo(() => {
    const screenMap = new Map<string, ScreenConfig>();
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === Screen) {
        const props = child.props as ScreenProps;
        screenMap.set(props.name, {
          name: props.name,
          component: props.component,
          header: props.header,
          blockSwipe: props.blockSwipe,
        });
      }
    });
    return screenMap;
  }, [children]);
};