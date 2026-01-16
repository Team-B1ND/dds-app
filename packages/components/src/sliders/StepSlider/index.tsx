import { Animated } from 'react-native';
import { useMemo } from 'react';
import styled from 'styled-components/native';
import type { StepSliderProps } from '../types';
import { useSlide } from './hooks/useSlide';

export const StepSlider = ({
  steps,
  value,
  onChange,
  width = 280,
}: StepSliderProps) => {
  const { panResponder, fillWidth, thumbX } = useSlide(
    steps,
    value,
    width,
    onChange
  );

  const stepIndicators = useMemo(() => {
    return Array.from({ length: steps }, (_, i) => {
      const position = (i / (steps - 1)) * width;
      return <StepDot key={i} style={{ left: position - 8 }} />;
    });
  }, [steps, width]);

  return (
    <Track {...panResponder.panHandlers} $width={width}>
      {stepIndicators}
      <Fill style={{ width: fillWidth }} />
      <Thumb
        style={{ transform: [{ translateX: Animated.subtract(thumbX, 8) }] }}
      />
    </Track>
  );
};

const Track = styled.View<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  height: 8px;
  background-color: ${({ theme }) => theme.color.border.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  justify-content: center;
`;

const Fill = styled(Animated.View)`
  height: 8px;
  background-color: ${({ theme }) => theme.color.main.primary};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const StepDot = styled.View`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.color.main.secondary};
  top: 0;
`;

const Thumb = styled(Animated.View)`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.color.main.primary};
  top: -3px;
`;
