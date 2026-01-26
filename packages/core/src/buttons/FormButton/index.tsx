import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { useFormAnimation } from './hooks/useFormAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import type { ButtonColor, ButtonDisplay, ButtonSize } from './types';

interface FormButtonProps {
  haptic?: boolean;
  disabled?: boolean;
  display?: ButtonDisplay;
  color?: ButtonColor;
  size?: ButtonSize;
  onPress?: () => void;
  children: string;
}

export const FormButton = ({
  haptic,
  disabled = false,
  display = 'inline',
  color = 'primary',
  size = 'medium',
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
      $size={size}
      disabled={disabled}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPress={handlePress}
      onPressOut={handlePressOut}
    >
      <TextContainer $color={color} $size={size}>{children}</TextContainer>
    </AnimatedContainer>
  );
};

const Container = styled.Pressable<{
  $display: ButtonDisplay;
  $color: ButtonColor;
  $size: ButtonSize;
}>`
  padding: ${({ $size }) => {
    if ($size === 'large') return '13.5px 24px';
    if ($size === 'small') return '10px 16px';
    return '13px 20px';
  }};
  border-radius: ${({ $size }) => {
    if ($size === 'large') return '12px';
    if ($size === 'small') return '8px';
    return '10px';
  }};

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

const TextContainer = styled.Text<{ $color: ButtonColor; $size: ButtonSize }>`
  text-align: center;
  font-size: ${({ theme, $size }) => {
    if ($size === 'large') return theme.typography.headline.fontSize;
    if ($size === 'small') return theme.typography.label.fontSize;
    return theme.typography.body2.fontSize;
  }}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme, $size }) => {
    if ($size === 'large') return theme.typography.headline.lineHeight;
    if ($size === 'small') return theme.typography.label.lineHeight;
    return theme.typography.body2.lineHeight;
  }}px;
  letter-spacing: ${({ theme, $size }) => {
    if ($size === 'large') return theme.typography.headline.letterSpacing;
    if ($size === 'small') return theme.typography.label.letterSpacing;
    return theme.typography.body2.letterSpacing;
  }}px;

  color: ${({ theme, $color }) => {
    if ($color === 'secondary') return theme.color.text.tertiary;
    return theme.color.static.white;
  }};
`;
