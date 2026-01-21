import { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

interface TextButtonProps {
  onPress?: () => void;
  children: string;
}

export const TextButton = ({ onPress, children }: TextButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedContainer
      $pressed={pressed}
      style={{ transform: [{ scale: scaleAnim }] }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <ButtonText>{children}</ButtonText>
    </AnimatedContainer>
  );
};

const Container = styled.Pressable<{ $pressed: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  align-self: flex-start;
  background-color: ${({ theme, $pressed }) =>
    $pressed ? theme.color.fill.primary : 'transparent'};
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ButtonText = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.body2.letterSpacing}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
