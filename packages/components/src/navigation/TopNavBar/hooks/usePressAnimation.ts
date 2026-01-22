import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

interface PressAnimationOptions {
  scaleValue?: number;
  showBackground?: boolean;
}

export const usePressAnimation = (options: PressAnimationOptions = {}) => {
  const { scaleValue = 0.85, showBackground = true } = options;

  const scale = useRef(new Animated.Value(1)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  const onPressIn = useCallback(() => {
    const animations = [
      Animated.spring(scale, { toValue: scaleValue, useNativeDriver: true }),
    ];
    if (showBackground) {
      animations.push(
        Animated.timing(bgOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      );
    }
    Animated.parallel(animations).start();
  }, [scale, bgOpacity, scaleValue, showBackground]);

  const onPressOut = useCallback(() => {
    const animations = [
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ];
    if (showBackground) {
      animations.push(
        Animated.timing(bgOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      );
    }
    Animated.parallel(animations).start();
  }, [scale, bgOpacity, showBackground]);

  return { scale, bgOpacity, onPressIn, onPressOut };
};
