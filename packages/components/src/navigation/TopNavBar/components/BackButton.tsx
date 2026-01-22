import { Animated, Pressable } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { ArrowLeft } from '@dds-app/icons';
import type { BackButtonProps } from '../types';
import { useTopNavBarContext } from '../context';
import { usePressAnimation } from '../hooks';

export const BackButton = ({ onPress }: BackButtonProps) => {
  const theme = useTheme();
  const { goBack } = useTopNavBarContext();
  const { scale, bgOpacity, onPressIn, onPressOut } = usePressAnimation();

  return (
    <Container
      onPress={onPress ?? goBack}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Background style={{ opacity: bgOpacity }} />
      <Animated.View style={{ transform: [{ scale }] }}>
        <ArrowLeft size={24} color={theme.color.text.primary} />
      </Animated.View>
    </Container>
  );
};

const Container = styled(Pressable)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
`;

const Background = styled(Animated.View)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.fill.primary};
`;
