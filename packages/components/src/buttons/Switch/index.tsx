import { Animated, Pressable } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useSwitchAnimation } from './hooks/useSwitchAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export const Switch = ({
  checked = false,
  disabled = false,
  onChange,
}: SwitchProps) => {
  const theme = useTheme();
  const { trackWidth, thumb } = theme.size.switch;
  const translateDistance = parseInt(trackWidth, 10) - parseInt(thumb, 10) - 8; // padding * 2
  const { translateX } = useSwitchAnimation(checked, translateDistance);
  const { triggerHaptic } = useTriggerHaptic();

  const handlePress = () => {
    if (disabled) return;
    triggerHaptic();
    onChange?.();
  };

  return (
    <Pressable disabled={disabled} onPress={handlePress}>
      <Track $checked={checked} $disabled={disabled}>
        <Thumb style={{ transform: [{ translateX }] }} />
      </Track>
    </Pressable>
  );
};

const Track = styled.View<{ $checked: boolean; $disabled: boolean }>`
  width: ${({ theme }) => theme.size.switch.trackWidth};
  height: ${({ theme }) => theme.size.switch.trackHeight};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.full};
  justify-content: center;

  opacity: ${({ theme, $disabled }) =>
    $disabled ? theme.opacity.low : theme.opacity.full};

  background-color: ${({ theme, $checked }) => {
    if ($checked) return theme.color.main.primary;
    return theme.color.fill.secondary;
  }};
`;

const Thumb = styled(Animated.View)`
  width: ${({ theme }) => theme.size.switch.thumb};
  height: ${({ theme }) => theme.size.switch.thumb};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.color.static.white};
`;
