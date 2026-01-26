import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import styled from 'styled-components/native';
import { toastManager, type ToastItem } from './toastManager';
import { useToastAnimation } from './useToastAnimation';

const TOAST_OFFSET = 60;

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return toastManager.subscribe(setToasts);
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} />
      ))}
    </>
  );
};

interface ToastItemComponentProps {
  toast: ToastItem;
}

const ToastItemComponent = ({ toast }: ToastItemComponentProps) => {
  const { id, message, position, duration, icon } = toast;

  const { animatedStyle, panHandlers } = useToastAnimation({
    id,
    position,
    duration,
  });

  const containerStyle = useMemo(
    () => [
      styles.container,
      position === 'top' ? { top: TOAST_OFFSET } : { bottom: TOAST_OFFSET },
    ],
    [position]
  );

  return (
    <View style={containerStyle} pointerEvents="box-none">
      <AnimatedWrapper style={animatedStyle} {...panHandlers}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Text>{message}</Text>
      </AnimatedWrapper>
    </View>
  );
};

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
