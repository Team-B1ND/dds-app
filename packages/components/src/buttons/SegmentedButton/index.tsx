import { useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Animated, Pressable } from 'react-native';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import { useSegmentedAnimation } from './hooks/useSegmentedAnimation';
import type { SegmentedButtonProps, SegmentedButtonOption } from './types';

export const SegmentedButton = <T,>({
  options,
  value,
  defaultValue,
  disabled = false,
  haptic,
  onChange,
}: SegmentedButtonProps<T>) => {
  const theme = useTheme();
  const { triggerHaptic } = useTriggerHaptic();
  const [internalValue, setInternalValue] = useState<T | undefined>(
    value ?? defaultValue ?? options?.[0]?.value,
  );
  const [containerWidth, setContainerWidth] = useState(0);

  const selectedValue = value ?? internalValue;
  const selectedIndex = options.findIndex((opt) => opt.value === selectedValue);
  const { translateX } = useSegmentedAnimation(selectedIndex, options.length);

  const handlePress = (option: SegmentedButtonOption<T>) => {
    if (disabled) return;
    if (haptic) triggerHaptic();
    if (value === undefined) setInternalValue(option.value);
    onChange?.(option.value);
  };

  const itemWidth = containerWidth / options.length;

  const indicatorStyle = useMemo(() => {
    const outputRange = [];
    for (let i = 0; i < options.length; i++) {
      outputRange.push(i * itemWidth);
    }
    return {
      width: itemWidth,
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: options.map((_, i) => i),
            outputRange,
          }),
        },
      ],
    };
  }, [translateX, options.length, itemWidth]);

  return (
    <Wrapper
      $disabled={disabled}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 8)}
    >
      <Indicator style={indicatorStyle} />
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <ItemWrapper key={String(option.value)}>
            <ItemButton
              $disabled={disabled}
              onPress={() => handlePress(option)}
            >
              <Label $selected={isSelected}>
                {option.label}
              </Label>
            </ItemButton>
          </ItemWrapper>
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
  position: relative;
  opacity: ${({ theme, $disabled }) =>
    $disabled ? theme.opacity.medium : theme.opacity.full};
`;

const Indicator = styled(Animated.View)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.xs};
  top: ${({ theme }) => theme.spacing.xs};
  bottom: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.color.fill.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  shadow-color: ${({ theme }) => theme.color.static.black};
  shadow-offset: 2px 2px;
  shadow-opacity: ${({ theme }) => theme.opacity.subtle};
  shadow-radius: 4px;
  elevation: 2;
`;

const ItemWrapper = styled.View`
  flex: 1;
  z-index: 1;
`;

const ItemButton = styled(Pressable)<{ $disabled: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.none}`};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text<{ $selected: boolean }>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.color.text.primary : theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.lg.fontSize}px;
  line-height: ${({ theme }) => theme.typography.body.lg.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;