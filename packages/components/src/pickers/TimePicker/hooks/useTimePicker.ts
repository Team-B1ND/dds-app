import { useState, useCallback } from 'react';
import { useTriggerHaptic } from '../../../hooks/useTriggerHaptic';
import {
  type Period,
  to12Hour,
  to24Hour,
  createPeriods,
  createHours,
  createMinutes,
  ITEM_HEIGHT,
  VISIBLE_ITEMS,
} from '../../utils';

interface UseTimePickerProps {
  initialTime?: { hour: number; minute: number };
  onSelect: (time: { hour: number; minute: number }) => void;
  onPress: () => void;
}

export type { Period };

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

  const periods = createPeriods();
  const hours = createHours();
  const minutes = createMinutes();

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
