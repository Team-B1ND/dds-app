import { useState, useCallback, useMemo } from 'react';
import { OverlayContext, type OverlayElement } from './OverlayContext';
import { OverlayController } from './OverlayController';

interface OverlayItem {
  id: string;
  element: OverlayElement;
}

interface OverlayProviderProps {
  children: React.ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);

  const mount = useCallback((id: string, element: OverlayElement) => {
    setOverlays((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, element } : item
        );
      }
      return [...prev, { id, element }];
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({ mount, unmount }),
    [mount, unmount]
  );

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {overlays.map(({ id, element }) => (
        <OverlayController key={id} id={id} element={element} />
      ))}
    </OverlayContext.Provider>
  );
};
