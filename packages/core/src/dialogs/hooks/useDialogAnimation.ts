import { useRef, useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';

export const useDialogAnimation = (open: boolean, onExited?: () => void) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        onExited?.();
      });
    }
  }, [open, fadeAnim, scaleAnim, onExited]);

  const wiggle = useCallback(() => {
    Animated.sequence([
      Animated.timing(translateXAnim, {
        toValue: 4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: -4,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: -3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateXAnim]);

  const dimmerStyle = {
    opacity: fadeAnim,
  };

  const dialogStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }, { translateX: translateXAnim }],
  };

  return { dimmerStyle, dialogStyle, visible, wiggle };
};
