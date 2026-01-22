import { useRef, useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';

interface UsePressAnimationOptions {
  scale?: number;
}

export const usePressAnimation = (options: UsePressAnimationOptions = {}) => {
  const { scale: targetScale = 0.95 } = options;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: targetScale,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, targetScale]);

  const onPressOut = useCallback(() => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const animatedStyle = useMemo(
    () => ({ transform: [{ scale: scaleAnim }] }),
    [scaleAnim]
  );

  return { pressed, animatedStyle, onPressIn, onPressOut };
};
