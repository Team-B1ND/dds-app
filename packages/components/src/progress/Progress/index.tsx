import styled from 'styled-components/native';
import { Animated } from 'react-native';
import type { ProgressProps } from '../types';
import { useProgress } from './hooks/useProgress';

export const Progress = ({ progress, disabled = false }: ProgressProps) => {
  const animatedWidth = useProgress(progress);

  return (
    <Container>
      <Bar style={{ width: animatedWidth }} $disabled={disabled} />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 14px;
  background-color: ${({ theme }) => theme.color.border.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Bar = styled(Animated.View)<{
  $disabled: boolean;
}>`
  height: 14px;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.border.strong : theme.color.main.primary};
  border-radius: ${({ theme }) => theme.radius.md};
`;
