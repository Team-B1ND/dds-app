import { useEffect, useRef } from 'react';
import { PanResponder, Animated } from 'react-native';

export const useSlide = (
  max: number,
  initialValue: number,
  width: number,
  onChange: (value: number) => void
) => {
  const initialProgress = initialValue / max;

  const progress = useRef(new Animated.Value(initialProgress)).current;
  const progressRef = useRef(initialProgress);
  const startRef = useRef(0);

  useEffect(() => {
    const id = progress.addListener((data) => {
      progressRef.current = data.value;
    });

    return () => {
      progress.removeListener(id);
    };
  }, [progress]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      startRef.current = progressRef.current;
    },

    onPanResponderMove: (_, gestureState) => {
      const next = Math.min(
        1,
        Math.max(0, startRef.current + gestureState.dx / width)
      );
      progressRef.current = next;
      progress.setValue(next);
    },

    onPanResponderRelease: () => {
      onChange(progressRef.current * max);
    },
  });

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const thumbX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  return {
    panResponder,
    fillWidth,
    thumbX,
  };
};
