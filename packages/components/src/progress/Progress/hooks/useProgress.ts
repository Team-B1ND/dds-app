import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useProgress = (progress: number) => {
  const validProgress = useMemo(
    () => Math.min(100, Math.max(0, progress)),
    [progress]
  );

  const animatedProgress = useRef(new Animated.Value(validProgress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: validProgress,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, validProgress]);

  const animatedWidth = useMemo(
    () =>
      animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      }),
    [animatedProgress]
  );

  return animatedWidth;
};
