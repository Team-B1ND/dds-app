import { useState, useCallback } from 'react';
import { useTriggerHaptic } from '../../../hooks/useTriggerHaptic';

interface UseTimePickerProps {
  initialTime?: { hour: number; minute: number };
  onSelect: (time: { hour: number; minute: number }) => void;
  onPress: () => void;
}

export type Period = '오전' | '오후';

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

// 24시간 -> 12시간 + 오전/오후 변환
const to12Hour = (hour24: number): { hour12: number; period: Period } => {
  if (hour24 === 0) return { hour12: 12, period: '오전' };
  if (hour24 === 12) return { hour12: 12, period: '오후' };
  if (hour24 < 12) return { hour12: hour24, period: '오전' };
  return { hour12: hour24 - 12, period: '오후' };
};

// 12시간 + 오전/오후 -> 24시간 변환
const to24Hour = (hour12: number, period: Period): number => {
  if (period === '오전') {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
};

export const useTimePicker = ({
  initialTime,
  onSelect,
  onPress,
}: UseTimePickerProps) => {
  const { triggerHaptic } = useTriggerHaptic();

  const now = new Date();
  const defaultTime = initialTime ?? {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };

  const { hour12: defaultHour12, period: defaultPeriod } = to12Hour(defaultTime.hour);

  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultPeriod);
  const [selectedHour, setSelectedHour] = useState(defaultHour12);
  const [selectedMinute, setSelectedMinute] = useState(defaultTime.minute);

  // period
  const periods: Period[] = ['오전', '오후'];
  // hour
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  // minute
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handlePeriodChange = useCallback(
    (period: Period) => {
      if (period !== selectedPeriod) {
        triggerHaptic();
        setSelectedPeriod(period);
        const hour24 = to24Hour(selectedHour, period);
        onSelect({ hour: hour24, minute: selectedMinute });
      }
    },
    [selectedPeriod, selectedHour, selectedMinute, onSelect, triggerHaptic]
  );

  const handleHourChange = useCallback(
    (hour: number) => {
      if (hour !== selectedHour) {
        triggerHaptic();
        setSelectedHour(hour);
        const hour24 = to24Hour(hour, selectedPeriod);
        onSelect({ hour: hour24, minute: selectedMinute });
      }
    },
    [selectedHour, selectedPeriod, selectedMinute, onSelect, triggerHaptic]
  );

  const handleMinuteChange = useCallback(
    (minute: number) => {
      if (minute !== selectedMinute) {
        triggerHaptic();
        setSelectedMinute(minute);
        const hour24 = to24Hour(selectedHour, selectedPeriod);
        onSelect({ hour: hour24, minute });
      }
    },
    [selectedHour, selectedPeriod, selectedMinute, onSelect, triggerHaptic]
  );

  const handleConfirm = () => {
    triggerHaptic();
    onPress();
  };

  const getInitialPeriodIndex = () => periods.indexOf(selectedPeriod);
  const getInitialHourIndex = () => hours.indexOf(selectedHour);

  return {
    selectedPeriod,
    selectedHour,
    selectedMinute,
    periods,
    hours,
    minutes,
    handlePeriodChange,
    handleHourChange,
    handleMinuteChange,
    handleConfirm,
    getInitialPeriodIndex,
    getInitialHourIndex,
    ITEM_HEIGHT,
    VISIBLE_ITEMS,
  };
};
