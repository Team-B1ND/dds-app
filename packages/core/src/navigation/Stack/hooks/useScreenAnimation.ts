import { useMemo, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const EDGE_WIDTH = 40;

interface UseScreenAnimationProps {
  animValue: Animated.Value;
  panValue: Animated.Value;
  nextAnimValue: Animated.Value | null;
  nextPanValue: Animated.Value | null;
  screenWidth: number;
  swipeThreshold: number;
  canSwipe: boolean;
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
}

export const useScreenAnimation = ({
  animValue,
  panValue,
  nextAnimValue,
  nextPanValue,
  screenWidth,
  swipeThreshold,
  canSwipe,
  onSwipeComplete,
  onSwipeCancel,
}: UseScreenAnimationProps) => {
  const isPanningRef = useRef(false);

  const panResponder = useMemo(() => {
    if (!canSwipe) return null;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dx, dy, moveX }) => {
        return (
          moveX < EDGE_WIDTH && dx > 5 && Math.abs(dx) > Math.abs(dy) * 1.5
        );
      },
      onPanResponderGrant: () => {
        isPanningRef.current = true;
      },
      onPanResponderMove: (_, { dx }) => {
        if (dx > 0) {
          panValue.setValue(dx);
        }
      },
      onPanResponderRelease: (_, { dx, vx }) => {
        isPanningRef.current = false;

        if (dx > swipeThreshold || vx > 0.5) {
          onSwipeComplete();
        } else {
          onSwipeCancel();
        }
      },
      onPanResponderTerminate: () => {
        isPanningRef.current = false;
        onSwipeCancel();
      },
    });
  }, [canSwipe, panValue, swipeThreshold, onSwipeComplete, onSwipeCancel]);

  const translateX = useMemo(() => {
    const baseTranslate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenWidth],
    });
    return Animated.add(baseTranslate, panValue);
  }, [animValue, panValue, screenWidth]);

  const prevScreenTranslateX = useMemo(() => {
    if (!nextAnimValue || !nextPanValue) return new Animated.Value(0);

    const fromAnimValue = nextAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-screenWidth * 0.3, 0],
    });

    const fromPanValue = nextPanValue.interpolate({
      inputRange: [0, screenWidth],
      outputRange: [0, screenWidth * 0.3],
      extrapolate: 'clamp',
    });

    return Animated.add(fromAnimValue, fromPanValue);
  }, [nextAnimValue, nextPanValue, screenWidth]);

  const dimOpacity = useMemo(() => {
    if (!nextAnimValue || !nextPanValue) return new Animated.Value(0);

    const fromAnimValue = nextAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    const fromPanValue = nextPanValue.interpolate({
      inputRange: [0, screenWidth],
      outputRange: [0, -0.5],
      extrapolate: 'clamp',
    });

    return Animated.add(fromAnimValue, fromPanValue);
  }, [nextAnimValue, nextPanValue, screenWidth]);

  const animatedStyle = useMemo(
    () => ({ transform: [{ translateX }] }),
    [translateX]
  );

  const prevScreenStyle = useMemo(
    () => ({ transform: [{ translateX: prevScreenTranslateX }] }),
    [prevScreenTranslateX]
  );

  const dimStyle = useMemo(() => ({ opacity: dimOpacity }), [dimOpacity]);

  return {
    panResponder,
    animatedStyle,
    prevScreenStyle,
    dimStyle,
    hasPrevScreen: Boolean(nextAnimValue && nextPanValue),
  };
};