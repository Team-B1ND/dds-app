import { cloneElement, isValidElement, type ReactNode } from 'react';
import { Animated } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { usePressAnimation } from '../../hooks/animations';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';

interface IconButtonProps {
  icon: ReactNode;
  color?: string;
  disabled?: boolean;
  haptic?: boolean;
  onPress?: () => void;
}

export const IconButton = ({
  icon,
  color,
  disabled = false,
  haptic = false,
  onPress,
}: IconButtonProps) => {
  const theme = useTheme();
  const { triggerHaptic } = useTriggerHaptic();
  const { pressed, animatedStyle, onPressIn, onPressOut } = usePressAnimation({ scale: 0.9 });

  const iconColor = disabled ? theme.color.text.disabled : color;
  const coloredIcon =
    iconColor && isValidElement(icon)
      ? cloneElement(icon, { color: iconColor } as object)
      : icon;

  const handlePress = () => {
    if (haptic) triggerHaptic();
    onPress?.();
  };

  return (
    <AnimatedContainer
      $pressed={pressed && !disabled}
      style={animatedStyle}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
      onPress={disabled ? undefined : handlePress}
      disabled={disabled}
    >
      {coloredIcon}
    </AnimatedContainer>
  );
};

const Container = styled.Pressable<{ $pressed: boolean }>`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme, $pressed }) =>
    $pressed ? theme.color.fill.primary : 'transparent'};
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
