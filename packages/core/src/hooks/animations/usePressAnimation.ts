import { useRef, useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';

interface UsePressAnimationOptions {
  scale?: number;
  minPressDuration?: number;
}

const MIN_PRESS_DURATION = 150;

export const usePressAnimation = (options: UsePressAnimationOptions = {}) => {
  const { scale: targetScale = 0.95, minPressDuration = MIN_PRESS_DURATION } = options;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);
  const pressInTime = useRef(0);
  const pendingPressOut = useRef(false);

  const runPressOut = useCallback(() => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    pressInTime.current = Date.now();
    pendingPressOut.current = false;

    Animated.spring(scaleAnim, {
      toValue: targetScale,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, targetScale]);

  const onPressOut = useCallback(() => {
    const elapsed = Date.now() - pressInTime.current;
    const remaining = minPressDuration - elapsed;

    if (remaining <= 0) {
      runPressOut();
    } else {
      setTimeout(runPressOut, remaining);
    }
  }, [runPressOut, minPressDuration]);

  const animatedStyle = useMemo(
    () => ({ transform: [{ scale: scaleAnim }] }),
    [scaleAnim]
  );

  return { pressed, animatedStyle, onPressIn, onPressOut };
};
