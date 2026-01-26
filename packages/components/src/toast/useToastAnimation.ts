import { useEffect, useCallback, useMemo } from 'react';
import { Animated, PanResponder } from 'react-native';
import { toastManager } from './toastManager';

const ANIMATION_DURATION = 200;
const SWIPE_THRESHOLD_VERTICAL = 30;
const SWIPE_THRESHOLD_HORIZONTAL = 80;

interface UseToastAnimationParams {
  id: string;
  position: 'top' | 'bottom';
  duration: number;
}

export const useToastAnimation = ({
  id,
  position,
  duration,
}: UseToastAnimationParams) => {
  const initialY = position === 'top' ? -100 : 100;

  const translateY = useMemo(() => new Animated.Value(initialY), [initialY]);
  const translateX = useMemo(() => new Animated.Value(0), []);
  const opacity = useMemo(() => new Animated.Value(0), []);

  const handleHide = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: initialY,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      toastManager.hide(id);
    });
  }, [id, initialY, opacity, translateY]);

  const handleSwipe = useCallback(
    (gestureY: number, gestureX: number): boolean => {
      const shouldDismissVertical =
        (position === 'top' && gestureY < -SWIPE_THRESHOLD_VERTICAL) ||
        (position === 'bottom' && gestureY > SWIPE_THRESHOLD_VERTICAL);
      const shouldDismissHorizontal =
        Math.abs(gestureX) > SWIPE_THRESHOLD_HORIZONTAL;

      if (!shouldDismissVertical && !shouldDismissHorizontal) {
        return false;
      }

      if (shouldDismissHorizontal) {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: gestureX > 0 ? 300 : -300,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start(() => {
          toastManager.hide(id);
        });
      } else {
        handleHide();
      }

      return true;
    },
    [id, position, opacity, translateX, handleHide]
  );

  const resetPosition = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, translateY]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dx, dy }) =>
          Math.abs(dx) > 5 || Math.abs(dy) > 5,
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_, { dx, dy }) => {
          translateY.setValue(dy);
          translateX.setValue(dx);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          if (!handleSwipe(dy, dx)) {
            resetPosition();
          }
        },
      }),
    [translateY, translateX, handleSwipe, resetPosition]
  );

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateY }, { translateX }],
    }),
    [opacity, translateX, translateY]
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration > 0) {
      const timer = setTimeout(handleHide, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [duration, handleHide, opacity, translateY]);

  return {
    animatedStyle,
    panHandlers: panResponder.panHandlers,
  };
};