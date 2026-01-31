import { useState, useCallback, useMemo } from 'react';
import {
  type Period,
  to12Hour,
  to24Hour,
  createPeriods,
  createHours,
  createMinutes,
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
  const defaultTime = useMemo(() => {
    if (initialTime) return initialTime;
    const now = new Date();
    return { hour: now.getHours(), minute: now.getMinutes() };
  }, [initialTime]);

  const { hour12: defaultHour12, period: defaultPeriod } = useMemo(
    () => to12Hour(defaultTime.hour),
    [defaultTime.hour]
  );

  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultPeriod);
  const [selectedHour, setSelectedHour] = useState(defaultHour12);
  const [selectedMinute, setSelectedMinute] = useState(defaultTime.minute);

  const periods = useMemo(() => createPeriods(), []);
  const hours = useMemo(() => createHours(), []);
  const minutes = useMemo(() => createMinutes(), []);

  const handlePeriodChange = useCallback(
    (period: Period) => {
      if (period !== selectedPeriod) {
        setSelectedPeriod(period);
      }
    },
    [selectedPeriod]
  );

  const handleHourChange = useCallback(
    (hour: number) => {
      if (hour !== selectedHour) {
        setSelectedHour(hour);
      }
    },
    [selectedHour]
  );

  const handleMinuteChange = useCallback(
    (minute: number) => {
      if (minute !== selectedMinute) {
        setSelectedMinute(minute);
      }
    },
    [selectedMinute]
  );

  const handleConfirm = useCallback(() => {
    const hour24 = to24Hour(selectedHour, selectedPeriod);
    onSelect({ hour: hour24, minute: selectedMinute });
    onPress();
  }, [selectedHour, selectedPeriod, selectedMinute, onSelect, onPress]);

  const getInitialPeriodIndex = useCallback(
    () => periods.indexOf(defaultPeriod),
    [periods, defaultPeriod]
  );

  const getInitialHourIndex = useCallback(
    () => hours.indexOf(defaultHour12),
    [hours, defaultHour12]
  );

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
  };
};
