import type { ReactNode } from 'react';

export interface TopNavBarProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}

export interface BackButtonProps {
  onPress?: () => void;
}

export interface TitleProps {
  children: string;
  hasBackButton?: boolean;
}

export interface IconButtonProps {
  icon: ReactNode;
  onPress?: () => void;
}
