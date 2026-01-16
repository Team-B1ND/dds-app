import { useState, useContext, useCallback } from 'react';
import { OverlayContext, type OverlayElement } from './OverlayContext';

interface OverlayControllerProps {
  id: string;
  element: OverlayElement;
}

export const OverlayController = ({ id, element }: OverlayControllerProps) => {
  const context = useContext(OverlayContext);
  const [isOpen, setIsOpen] = useState(true);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const exit = useCallback(() => {
    context?.unmount(id);
  }, [context, id]);

  return <>{element({ isOpen, close, exit })}</>;
};
