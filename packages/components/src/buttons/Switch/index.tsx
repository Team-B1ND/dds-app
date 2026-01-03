import React from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useSwitchAnimation } from './hooks/useSwitchAnimation';
import { SWITCH_SIZE } from './constants';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  disabled = false,
  onChange,
}) => {
  const { translateX } = useSwitchAnimation(checked);
  const { triggerHaptic } = useTriggerHaptic();

  const handlePress = () => {
    if (disabled) return;
    triggerHaptic();
    onChange?.();
  };

  return (
    <Pressable disabled={disabled} onPress={handlePress}>
      <Track $checked={checked} $disabled={disabled}>
        <Thumb $disabled={disabled} style={{ transform: [{ translateX }] }} />
      </Track>
    </Pressable>
  );
};

const Track = styled.View<{ $checked: boolean; $disabled: boolean }>`
  width: ${SWITCH_SIZE.trackWidth}px;
  height: ${SWITCH_SIZE.trackHeight}px;
  padding: ${SWITCH_SIZE.padding}px;
  border-radius: ${SWITCH_SIZE.trackHeight / 2}px;
  justify-content: center;
  background-color: ${({ theme, $checked, $disabled }) =>
    $disabled
      ? theme.color.border.disabled
      : $checked
      ? theme.color.main.primary
      : theme.color.fill.secondary};
`;

const Thumb = styled(Animated.View)<{ $disabled: boolean }>`
  width: ${SWITCH_SIZE.thumb}px;
  height: ${SWITCH_SIZE.thumb}px;
  border-radius: ${SWITCH_SIZE.thumb / 2}px;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.fill.disabled : theme.color.static.white};
`;
