import { useRef, useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';

export const usePressAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const onPressOut = useCallback(() => {
    setPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const animatedStyle = useMemo(() => ({ transform: [{ scale }] }), [scale]);

  return { pressed, animatedStyle, onPressIn, onPressOut };
};
