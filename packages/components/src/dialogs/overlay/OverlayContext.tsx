import { createContext } from 'react';

export interface OverlayControllerProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}

export type OverlayElement = (props: OverlayControllerProps) => React.ReactNode;

export interface OverlayContextValue {
  mount: (id: string, element: OverlayElement) => void;
  unmount: (id: string) => void;
}

export const OverlayContext = createContext<OverlayContextValue | null>(null);
