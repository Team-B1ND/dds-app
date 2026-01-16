import { useContext, useCallback, useRef } from 'react';
import { OverlayContext, type OverlayElement } from './OverlayContext';

let overlayId = 0;

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  const idRef = useRef<string | null>(null);

  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }

  const open = useCallback(
    (element: OverlayElement) => {
      overlayId += 1;
      const id = `overlay-${overlayId}`;
      idRef.current = id;
      context.mount(id, element);
    },
    [context]
  );

  const close = useCallback(() => {
    if (idRef.current) {
      context.unmount(idRef.current);
      idRef.current = null;
    }
  }, [context]);

  return { open, close };
};
