import { useRef, useEffect, useMemo } from 'react';
import { Animated } from 'react-native';

interface ItemLayout {
  width: number;
  x: number;
}

export const useIndicatorAnimation = (
  value: string,
  itemLayouts: Map<string, ItemLayout>,
  fluid: boolean
) => {
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const layout = itemLayouts.get(value);
    if (!layout) return;

    Animated.parallel([
      Animated.spring(indicatorX, {
        toValue: layout.x,
        speed: 20,
        bounciness: 0,
        useNativeDriver: false,
      }),
      Animated.spring(indicatorWidth, {
        toValue: layout.width,
        speed: 20,
        bounciness: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, itemLayouts, indicatorX, indicatorWidth]);

  const position = useMemo(
    () => (fluid ? Animated.subtract(indicatorX, scrollOffset) : indicatorX),
    [fluid, indicatorX, scrollOffset]
  );

  const scrollHandler = useMemo(
    () =>
      Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollOffset } } }],
        { useNativeDriver: false }
      ),
    [scrollOffset]
  );

  return { position, width: indicatorWidth, scrollHandler };
};
