import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useCircularProgress = (
  progress: number,
  size: number,
  strokeWidth: number
) => {
  const validProgress = useMemo(
    () => Math.min(100, Math.max(0, progress)),
    [progress]
  );

  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const animatedProgress = useRef(new Animated.Value(validProgress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: validProgress,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, validProgress]);

  const animatedStrokeOffset = useMemo(
    () =>
      animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
        extrapolate: 'clamp',
      }),
    [animatedProgress, circumference]
  );

  return {
    radius,
    circumference,
    animatedStrokeOffset,
  };
};
