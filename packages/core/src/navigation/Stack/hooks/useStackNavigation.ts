import { useState, useCallback, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { ScreenConfig, StackEntry, RouteParams, NavigationProp } from '../types';

let keyCounter = 0;
const generateKey = () => `screen-${++keyCounter}`;

const ANIMATION_DURATION = 280;

interface UseStackNavigationProps {
  screens: Map<string, ScreenConfig>;
  initialRoute: string;
  screenWidth: number;
}

export const useStackNavigation = ({
  screens,
  initialRoute,
  screenWidth,
}: UseStackNavigationProps) => {
  const [stack, setStack] = useState<StackEntry[]>(() => [
    { key: generateKey(), name: initialRoute },
  ]);

  const animValuesRef = useRef<Map<string, Animated.Value>>(new Map());
  const panValuesRef = useRef<Map<string, Animated.Value>>(new Map());
  const isAnimatingRef = useRef(false);

  const getAnimValue = useCallback((key: string, initial: number = 0) => {
    if (!animValuesRef.current.has(key)) {
      animValuesRef.current.set(key, new Animated.Value(initial));
    }
    return animValuesRef.current.get(key)!;
  }, []);

  const getPanValue = useCallback((key: string) => {
    if (!panValuesRef.current.has(key)) {
      panValuesRef.current.set(key, new Animated.Value(0));
    }
    return panValuesRef.current.get(key)!;
  }, []);

  const navigate = useCallback(
    (name: string, params?: RouteParams) => {
      if (isAnimatingRef.current) return;
      if (!screens.has(name)) {
        console.warn(`Screen "${name}" not found`);
        return;
      }

      isAnimatingRef.current = true;
      const newKey = generateKey();
      const animValue = getAnimValue(newKey, 1);

      setStack((prev) => [...prev, { key: newKey, name, params }]);

      Animated.timing(animValue, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        isAnimatingRef.current = false;
      });
    },
    [screens, getAnimValue]
  );

  const goBack = useCallback(() => {
    if (isAnimatingRef.current) return;
    if (stack.length <= 1) return;

    const currentEntry = stack[stack.length - 1];
    if (!currentEntry) return;

    isAnimatingRef.current = true;
    const animValue = getAnimValue(currentEntry.key);

    Animated.timing(animValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setStack((prev) => {
        const newStack = prev.slice(0, -1);
        animValuesRef.current.delete(currentEntry.key);
        panValuesRef.current.delete(currentEntry.key);
        return newStack;
      });
      isAnimatingRef.current = false;
    });
  }, [stack, getAnimValue]);

  const removeTopScreen = useCallback(() => {
    if (stack.length <= 1) return;

    const currentEntry = stack[stack.length - 1];
    if (!currentEntry) return;

    setStack((prev) => {
      const newStack = prev.slice(0, -1);
      animValuesRef.current.delete(currentEntry.key);
      panValuesRef.current.delete(currentEntry.key);
      return newStack;
    });
  }, [stack]);

  const canGoBack = useCallback(() => stack.length > 1, [stack.length]);

  const getParam = useCallback(
    <T = unknown>(key: string, defaultValue?: T): T | undefined => {
      const currentEntry = stack[stack.length - 1];
      return (currentEntry?.params?.[key] as T) ?? defaultValue;
    },
    [stack]
  );

  const navigation: NavigationProp = useMemo(
    () => ({ navigate, goBack, canGoBack, getParam }),
    [navigate, goBack, canGoBack, getParam]
  );

  const swipeComplete = useCallback(
    (key: string) => {
      Animated.timing(getPanValue(key), {
        toValue: screenWidth,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        removeTopScreen();
      });
    },
    [getPanValue, screenWidth, removeTopScreen]
  );

  const swipeCancel = useCallback(
    (key: string) => {
      Animated.spring(getPanValue(key), {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    },
    [getPanValue]
  );

  const getScreenAnimValues = useCallback(
    (index: number) => {
      const entry = stack[index];
      if (!entry) return null;

      const nextEntry = stack[index + 1];
      const hasNext = index < stack.length - 1 && nextEntry;

      return {
        animValue: getAnimValue(entry.key),
        panValue: getPanValue(entry.key),
        nextAnimValue: hasNext ? getAnimValue(nextEntry.key) : null,
        nextPanValue: hasNext ? getPanValue(nextEntry.key) : null,
      };
    },
    [stack, getAnimValue, getPanValue]
  );

  return {
    stack,
    navigation,
    getScreenAnimValues,
    swipeComplete,
    swipeCancel,
  };
};