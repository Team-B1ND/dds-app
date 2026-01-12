import { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import type { SegmentedButtonProps, SegmentedButtonOption } from './types';

export const SegmentedButton = <T,>({
  options,
  value,
  defaultValue,
  disabled = false,
  haptic,
  onChange,
}: SegmentedButtonProps<T>) => {
  const { triggerHaptic } = useTriggerHaptic();
  const [internalValue, setInternalValue] = useState<T | undefined>(
    value ?? defaultValue ?? options?.[0]?.value,
  );

  const selectedValue = value ?? internalValue;

  const handlePress = (option: SegmentedButtonOption<T>) => {
    if (disabled) return;
    if (haptic) triggerHaptic();
    if (value === undefined) setInternalValue(option.value);
    onChange?.(option.value);
  };

  const getShadowStyle = useMemo(
    () =>
      (selected: boolean) => ({
        shadowColor: 'rgba(217, 217, 217, 0.25)',
        shadowOffset: { width: selected ? 0 : 2, height: selected ? 0 : 2 },
        shadowOpacity: selected ? 0 : 0.2,
        shadowRadius: selected ? 0 : 4,
      }),
    [],
  );

  return (
    <Wrapper $disabled={disabled}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <Item
            key={String(option.value)}
            $selected={isSelected}
            $disabled={disabled}
            onPress={() => handlePress(option)}
            style={getShadowStyle(isSelected)}
          >
            <Label $selected={isSelected}>
              {option.label}
            </Label>
          </Item>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.View<{ $disabled: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.fill.secondary};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.lg};
  opacity: ${({ theme, $disabled }) =>
    $disabled ? theme.opacity.medium : theme.opacity.full};
`;

const Item = styled(Pressable)<{ $selected: boolean; $disabled: boolean}>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.none}`};
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.fill.primary : 'transparent'};
  elevation: ${({ $selected }) => ($selected ? 0 : 2)};
`;

const Label = styled.Text<{ $selected: boolean }>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.color.text.primary : theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.lg.fontSize}px;
  line-height: ${({ theme }) => theme.typography.body.lg.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;