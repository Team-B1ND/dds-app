import { useRef } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const useCalendarAnimation = () => {
  const prevArrowScale = useRef(new Animated.Value(1)).current;
  const nextArrowScale = useRef(new Animated.Value(1)).current;
  const calendarOpacity = useRef(new Animated.Value(1)).current;
  const calendarTranslateX = useRef(new Animated.Value(0)).current;

  const animatePress = (scale: Animated.Value, callback?: () => void) => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.92,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }),
    ]).start(callback);
  };

  const animateMonthTransition = (
    direction: 'prev' | 'next',
    callback: () => void
  ) => {
    const translateValue = direction === 'prev' ? 30 : -30;

    Animated.parallel([
      Animated.timing(calendarOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(calendarTranslateX, {
        toValue: translateValue,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(() => {
      callback();
      calendarTranslateX.setValue(-translateValue);
      Animated.parallel([
        Animated.timing(calendarOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.spring(calendarTranslateX, {
          toValue: 0,
          useNativeDriver: true,
          speed: 20,
          bounciness: 4,
        }),
      ]).start();
    });
  };

  const animateDateSelect = () => {
    LayoutAnimation.configureNext({
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  };

  return {
    prevArrowScale,
    nextArrowScale,
    calendarOpacity,
    calendarTranslateX,
    animatePress,
    animateMonthTransition,
    animateDateSelect,
  };
};
