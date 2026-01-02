import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { TRANSLATE_X } from '../constants';

export const useSwitchAnimation = (checked: boolean) => {
  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: checked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRANSLATE_X],
  });

  return { translateX };
};
