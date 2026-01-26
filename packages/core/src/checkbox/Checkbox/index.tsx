import { useRef, useEffect } from 'react';
import { Animated, Pressable } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Checkmark } from '@dds-app/icons';
import { usePressAnimation } from '../../hooks/animations';

type CheckboxSize = 'large' | 'medium' | 'small';

const SIZE_CONFIG = {
  large: { box: 32, icon: 20 },
  medium: { box: 28, icon: 18 },
  small: { box: 24, icon: 14 },
};

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'filled';
  size?: CheckboxSize;
  onChange?: () => void;
}

export const Checkbox = ({
  checked = false,
  disabled = false,
  variant = 'outlined',
  size = 'medium',
  onChange,
}: CheckboxProps) => {
  const theme = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation({ scale: 0.9 });

  const checkAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const { box: boxSize, icon: iconSize } = SIZE_CONFIG[size];

  useEffect(() => {
    Animated.spring(checkAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: checked ? 8 : 0,
    }).start();
  }, [checked, checkAnim]);

  const getCheckmarkColor = () => {
    if (variant === 'filled') {
      if (checked) return theme.color.static.white;
      return theme.color.border.normal;
    }
    if (checked) return theme.color.main.primary;
    return disabled ? theme.color.border.disabled : theme.color.border.normal;
  };

  const checkmarkStyle = {
    opacity: variant === 'outlined' ? 1 : checkAnim,
  };

  return (
    <Pressable
      disabled={disabled}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
      onPress={disabled ? undefined : onChange}
    >
      <AnimatedBox
        $checked={checked}
        $disabled={disabled}
        $variant={variant}
        $size={boxSize}
        style={animatedStyle}
      >
        <Animated.View style={checkmarkStyle}>
          <Checkmark size={iconSize} color={getCheckmarkColor()} />
        </Animated.View>
      </AnimatedBox>
    </Pressable>
  );
};

const Box = styled.View<{
  $checked: boolean;
  $disabled: boolean;
  $variant: 'outlined' | 'filled';
  $size: number;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;

  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};

  background-color: ${({ theme, $checked, $variant }) => {
    if ($variant === 'filled' && $checked) {
      return theme.color.main.primary;
    }
    return 'transparent';
  }};

  border-width: ${({ $checked, $variant }) => {
    if ($variant === 'filled' && !$checked) return '2px';
    return '0px';
  }};

  border-color: ${({ theme }) => theme.color.border.normal};
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);
