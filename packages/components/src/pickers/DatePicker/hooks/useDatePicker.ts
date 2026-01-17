import { useState, useMemo, useRef } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTriggerHaptic } from '../../../hooks/useTriggerHaptic';
import { getFirstDayOfMonth, getDaysInMonth, getTodayMidnight } from '../../utils';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface UseDatePickerProps {
  initialSelectedDate?: Date;
  onSelect: (date: Date) => void;
  onPress: () => void;
}

export interface CalendarCell {
  type: 'empty' | 'date';
  date?: number;
  key: string;
}

export const useDatePicker = ({
  initialSelectedDate,
  onSelect,
  onPress,
}: UseDatePickerProps) => {
  const { triggerHaptic } = useTriggerHaptic();

  const today = useMemo(() => getTodayMidnight(), []);

  // 초기 선택 날짜가 없으면 오늘 날짜로 설정함
  const defaultDate = initialSelectedDate ?? today;

  const [currentYear, setCurrentYear] = useState(defaultDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(defaultDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

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

  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const calendarCells = useMemo<CalendarCell[]>(() => {
    const cells: CalendarCell[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push({ type: 'empty', key: `empty-${i}` });
    }

    for (let date = 1; date <= daysInMonth; date++) {
      cells.push({ type: 'date', date, key: `date-${date}` });
    }

    return cells;
  }, [firstDay, daysInMonth]);

  const isDateDisabled = (date: number) => {
    const targetDate = new Date(currentYear, currentMonth, date);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate < today;
  };

  const handlePrevMonth = () => {
    animatePress(prevArrowScale);
    triggerHaptic();
    animateMonthTransition('prev', () => {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    });
  };

  const handleNextMonth = () => {
    animatePress(nextArrowScale);
    triggerHaptic();
    animateMonthTransition('next', () => {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    });
  };

  const handleDateSelect = (date: number) => {
    if (isDateDisabled(date)) return;
    triggerHaptic();
    
    LayoutAnimation.configureNext({
      duration: 250,
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
    
    const newDate = new Date(currentYear, currentMonth, date);
    setSelectedDate(newDate);
    onSelect(newDate);
  };

  const handleConfirm = () => {
    triggerHaptic();
    onPress();
  };

  const isSelectedDate = (date: number) => {
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === date
    );
  };

  return {
    currentYear,
    currentMonth,
    calendarCells,
    prevArrowScale,
    nextArrowScale,
    calendarOpacity,
    calendarTranslateX,
    handlePrevMonth,
    handleNextMonth,
    handleDateSelect,
    handleConfirm,
    isDateDisabled,
    isSelectedDate,
  };
};
