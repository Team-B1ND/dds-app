import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';

const TOAST_OFFSET = 60;
const ANIMATION_DURATION = 200;
const SWIPE_THRESHOLD_VERTICAL = 30;
const SWIPE_THRESHOLD_HORIZONTAL = 80;

interface UseToastAnimationOptions {
  open: boolean;
  position: 'top' | 'bottom';
  duration: number;
  onClose?: () => void;
  onExited?: () => void;
}

export const useToastAnimation = ({
  open,
  position,
  duration,
  onClose,
  onExited,
}: UseToastAnimationOptions) => {
  const [visible, setVisible] = useState(false);

  const initialY = position === 'top' ? -100 : 100;
  const translateY = useRef(new Animated.Value(initialY)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // refs로 콜백 저장하여 stale closure 방지
  const onCloseRef = useRef(onClose);
  const onExitedRef = useRef(onExited);

  useEffect(() => {
    onCloseRef.current = onClose;
    onExitedRef.current = onExited;
  }, [onClose, onExited]);

  const animateIn = useCallback(() => {
    translateY.setValue(initialY);
    translateX.setValue(0);
    opacity.setValue(0);

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
  }, [initialY, opacity, translateX, translateY]);

  const animateOut = useCallback(() => {
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
      setVisible(false);
      onExitedRef.current?.();
    });
  }, [initialY, opacity, translateY]);

  // open 상태 변경 처리
  useEffect(() => {
    if (open) {
      setVisible(true);
      animateIn();
    } else if (visible) {
      animateOut();
    }
  }, [open]);

  // 자동 닫기 타이머
  useEffect(() => {
    if (!open || duration <= 0) return;

    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration]);

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
          setVisible(false);
          onCloseRef.current?.();
          onExitedRef.current?.();
        });
      } else {
        onCloseRef.current?.();
      }

      return true;
    },
    [position, opacity, translateX]
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

  const toastStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateY }, { translateX }],
    }),
    [opacity, translateX, translateY]
  );

  const positionStyle = useMemo(
    () => ({
      top: position === 'top' ? TOAST_OFFSET : undefined,
      bottom: position === 'bottom' ? TOAST_OFFSET : undefined,
    }),
    [position]
  );

  return {
    visible,
    toastStyle,
    positionStyle,
    translateY,
    translateX,
    handleSwipe,
    resetPosition,
  };
};