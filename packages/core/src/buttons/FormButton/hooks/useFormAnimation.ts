import { Animated } from 'react-native';
import { useRef, useEffect, useCallback } from 'react';

const MIN_PRESS_DURATION = 150;

export const useFormAnimation = (disabled = false) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(disabled ? 0.4 : 1)).current;
  const pressInTime = useRef(0);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: disabled ? 0.4 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [disabled, opacityAnim]);

  const runPressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 25,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handlePressIn = useCallback(() => {
    if (disabled) return;

    pressInTime.current = Date.now();

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 25,
        useNativeDriver: true,
      }),
    ]).start();
  }, [disabled, scaleAnim, opacityAnim]);

  const handlePressOut = useCallback(() => {
    if (disabled) return;

    const elapsed = Date.now() - pressInTime.current;
    const remaining = MIN_PRESS_DURATION - elapsed;

    if (remaining <= 0) {
      runPressOut();
    } else {
      setTimeout(runPressOut, remaining);
    }
  }, [disabled, runPressOut]);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: opacityAnim,
  };

  return { animatedStyle, handlePressIn, handlePressOut };
};
