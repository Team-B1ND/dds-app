import { useState, useCallback } from 'react';

interface UseControlledValueProps {
  controlledValue?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const useControlledValue = ({
  controlledValue,
  defaultValue,
  onChange,
}: UseControlledValueProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const value = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  return { value, onChange: handleChange };
};
