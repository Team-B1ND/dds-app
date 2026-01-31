import { useEffect, useRef } from 'react';
import { PanResponder, Animated } from 'react-native';

export const useSlide = (
  steps: number,
  initialValue: number,
  width: number,
  onChange: (step: number) => void
) => {
  const initialProgress = initialValue / (steps - 1);

  const progress = useRef(new Animated.Value(initialProgress)).current;
  const progressRef = useRef(initialProgress);
  const startRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const id = progress.addListener((data) => {
      progressRef.current = data.value;
    });

    return () => {
      progress.removeListener(id);
    };
  }, [progress]);

  const handleRelease = () => {
    isDraggingRef.current = false;
    const snapped = Math.round(progressRef.current * (steps - 1)) / (steps - 1);

    Animated.timing(progress, {
      toValue: snapped,
      duration: 150,
      useNativeDriver: false,
    }).start();

    onChange(Math.round(snapped * (steps - 1)));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {
      isDraggingRef.current = true;
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

    onPanResponderRelease: handleRelease,
    onPanResponderTerminate: handleRelease,
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
