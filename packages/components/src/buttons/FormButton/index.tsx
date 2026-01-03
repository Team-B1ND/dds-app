import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { useFormAnimation } from './hooks/useFormAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import type { ButtonColor, ButtonDisplay } from './types';

interface FormButtonProps {
  haptic?: boolean;
  disabled?: boolean;
  display?: ButtonDisplay;
  color?: ButtonColor;
  onPress?: () => void;
  children: string;
}

export const FormButton = ({
  haptic,
  disabled = false,
  display = 'inline',
  color = 'primary',
  onPress,
  children,
}: FormButtonProps) => {
  const { triggerHaptic } = useTriggerHaptic();
  const { animatedStyle, handlePressIn, handlePressOut } =
    useFormAnimation(disabled);

  const handlePress = () => {
    if (haptic) triggerHaptic();
    onPress?.();
  };

  return (
    <AnimatedContainer
      $color={color}
      $display={display}
      disabled={disabled}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPress={handlePress}
      onPressOut={handlePressOut}
    >
      <TextContainer $color={color}>{children}</TextContainer>
    </AnimatedContainer>
  );
};

const Container = styled.Pressable<{
  $display: ButtonDisplay;
  $color: ButtonColor;
}>`
  padding: 16px;
  border-radius: 12px;

  background-color: ${({ theme, $color }) => {
    if ($color === 'primary') return theme.color.main.primary;
    if ($color === 'secondary') return theme.color.fill.secondary;
    return theme.color.status.error;
  }};

  align-self: ${({ $display }) => {
    if ($display === 'inline') return 'flex-start';
    return 'stretch';
  }};

  width: ${({ $display }) => {
    if ($display === 'block') return '100%';
    return 'auto';
  }};

  ${({ $display }) => $display === 'full' && 'flex: 1;'}
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TextContainer = styled.Text<{ $color: ButtonColor }>`
  text-align: center;

  color: ${({ theme, $color }) => {
    if ($color === 'secondary') return theme.color.text.tertiary;
    return theme.color.static.white;
  }};
`;
