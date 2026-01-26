import { useMemo, type ReactNode } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { useToastAnimation } from './hooks';
import { ToastIcon } from './ToastIcon';

export interface ToastProps {
  open: boolean;
  text: string;
  position?: 'top' | 'bottom';
  duration?: number;
  left?: ReactNode;
  onClose?: () => void;
  onExited?: () => void;
}

const ToastComponent = ({
  open,
  text,
  position = 'bottom',
  duration = 3000,
  left,
  onClose,
  onExited,
}: ToastProps) => {
  const {
    visible,
    toastStyle,
    positionStyle,
    translateY,
    translateX,
    handleSwipe,
    resetPosition,
  } = useToastAnimation({
    open,
    position,
    duration,
    onClose,
    onExited,
  });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dx, dy }) =>
          Math.abs(dx) > 5 || Math.abs(dy) > 5,
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_, { dx, dy }) => {
          translateY.setValue(dy);
          translateX.setValue(dx);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          if (!handleSwipe(dy, dx)) {
            resetPosition();
          }
        },
      }),
    [translateY, translateX, handleSwipe, resetPosition]
  );

  if (!visible) {
    return null;
  }

  return (
    <View
      style={[styles.container, positionStyle]}
      pointerEvents="box-none"
    >
      <AnimatedWrapper style={toastStyle} {...panResponder.panHandlers}>
        {left && <IconWrapper>{left}</IconWrapper>}
        <Text>{text}</Text>
      </AnimatedWrapper>
    </View>
  );
};

export const Toast = Object.assign(ToastComponent, { Icon: ToastIcon });

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
});

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: 90%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.fill.primary};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 2;
`;

const AnimatedWrapper = Animated.createAnimatedComponent(Wrapper);

const IconWrapper = styled.View`
  margin-right: 8px;
`;

const Text = styled.Text`
  flex-shrink: 1;
  font-size: ${({ theme }) => theme.typography.label.fontSize}px;
  line-height: ${({ theme }) => theme.typography.label.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.label.letterSpacing}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text.primary};
`;
