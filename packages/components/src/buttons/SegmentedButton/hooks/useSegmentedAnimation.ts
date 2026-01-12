import { Animated } from 'react-native';
import { useRef, useEffect } from 'react';

export const useSegmentedAnimation = (selectedIndex: number) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [selectedIndex, translateX]);

  return { translateX };
};
