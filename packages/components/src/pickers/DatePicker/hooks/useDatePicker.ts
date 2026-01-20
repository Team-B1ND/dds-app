import { useState, useMemo } from 'react';
import { useTriggerHaptic } from '../../../hooks/useTriggerHaptic';
import { getFirstDayOfMonth, getDaysInMonth, getTodayMidnight } from '../../utils';
import { useCalendarAnimation } from './useCalendarAnimation';

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

  // 초기 선택 날짜가 없으면 오늘 날짜로 설정함
  const defaultDate = initialSelectedDate ?? today;

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
    
    animateDateSelect();
    
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
