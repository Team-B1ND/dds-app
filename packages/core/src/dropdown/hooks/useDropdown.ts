import { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DropdownOption } from '../types';

export const useDropdown = (options: DropdownOption[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const wrapperRef = useRef<any>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const OPTION_HEIGHT = 40;
  const MAX_HEIGHT = 200;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setShouldRender(false));
    }
  }, [isOpen, animatedValue]);

  const handleToggle = () => {
    if (!isOpen && wrapperRef.current) {
      wrapperRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          const windowHeight = Dimensions.get('window').height;
          const optionsHeight = Math.min(
            options.length * OPTION_HEIGHT,
            MAX_HEIGHT
          );

          const spaceBelow = windowHeight - (y + height);
          const spaceAbove = y;

          const shouldDropUp =
            spaceBelow < optionsHeight && spaceAbove > spaceBelow;

          setDropUp(shouldDropUp);
          setLayout({ x, y: y + 4, width, height });
          setIsOpen(true);
        }
      );
    } else {
      setIsOpen(false);
    }
  };

  const optionsHeight = Math.min(options.length * OPTION_HEIGHT, MAX_HEIGHT);

  const dropdownTop = dropUp
    ? Math.max(layout.y - optionsHeight, insets.top)
    : layout.y + layout.height;

  return {
    wrapperRef,
    isOpen,
    setIsOpen,
    handleToggle,
    shouldRender,
    layout,
    dropdownTop,
    animatedValue,
    dropUp,
    MAX_HEIGHT,
  };
};
