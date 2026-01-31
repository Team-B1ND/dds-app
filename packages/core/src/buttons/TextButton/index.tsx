import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { usePressAnimation } from '../../hooks/animations';

interface TextButtonProps {
  onPress?: () => void;
  children: string;
}

export const TextButton = ({ onPress, children }: TextButtonProps) => {
  const { pressed, animatedStyle, onPressIn, onPressOut } = usePressAnimation();

  return (
    <AnimatedContainer
      $pressed={pressed}
      style={animatedStyle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
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
