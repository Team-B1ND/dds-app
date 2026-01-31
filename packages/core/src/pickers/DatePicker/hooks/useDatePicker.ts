import { useState, useMemo, useCallback } from 'react';
import { getFirstDayOfMonth, getDaysInMonth, getTodayMidnight } from '../../utils';
import { useCalendarAnimation } from './useCalendarAnimation';

interface UseDatePickerProps {
  initialSelectedDate?: Date;
  disablePastDates?: boolean;
  showTodayIndicator?: boolean;
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
  disablePastDates = false,
  showTodayIndicator = true,
  onSelect,
  onPress,
}: UseDatePickerProps) => {
  const {
    prevArrowScale,
    nextArrowScale,
    calendarOpacity,
    calendarTranslateX,
    animatePress,
    animateMonthTransition,
    animateDateSelect,
  } = useCalendarAnimation();

  const today = useMemo(() => getTodayMidnight(), []);
  const defaultDate = useMemo(
    () => initialSelectedDate ?? today,
    [initialSelectedDate, today]
  );

  const [currentYear, setCurrentYear] = useState(defaultDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(defaultDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

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

  const isDateDisabled = useCallback(
    (date: number) => {
      if (!disablePastDates) return false;
      const targetDate = new Date(currentYear, currentMonth, date);
      targetDate.setHours(0, 0, 0, 0);
      return targetDate < today;
    },
    [disablePastDates, currentYear, currentMonth, today]
  );

  const handlePrevMonth = useCallback(() => {
    animatePress(prevArrowScale);
    animateMonthTransition('prev', () => {
      setCurrentYear((y) => (currentMonth === 0 ? y - 1 : y));
      setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
    });
  }, [animatePress, prevArrowScale, animateMonthTransition, currentMonth]);

  const handleNextMonth = useCallback(() => {
    animatePress(nextArrowScale);
    animateMonthTransition('next', () => {
      setCurrentYear((y) => (currentMonth === 11 ? y + 1 : y));
      setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
    });
  }, [animatePress, nextArrowScale, animateMonthTransition, currentMonth]);

  const handleDateSelect = useCallback(
    (date: number) => {
      if (isDateDisabled(date)) return;
      animateDateSelect();
      setSelectedDate(new Date(currentYear, currentMonth, date));
    },
    [isDateDisabled, animateDateSelect, currentYear, currentMonth]
  );

  const handleConfirm = useCallback(() => {
    onSelect(selectedDate);
    onPress();
  }, [onSelect, selectedDate, onPress]);

  const isSelectedDate = useCallback(
    (date: number) =>
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === date,
    [selectedDate, currentYear, currentMonth]
  );

  const isToday = useCallback(
    (date: number) => {
      if (!showTodayIndicator) return false;
      return (
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === date
      );
    },
    [showTodayIndicator, today, currentYear, currentMonth]
  );

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
    isToday,
  };
};
