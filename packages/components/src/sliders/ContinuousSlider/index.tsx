import { Animated } from 'react-native';
import styled from 'styled-components/native';
import type { ContinuousSliderProps } from '../types';
import { useSlide } from './hooks/useSlide';

export const ContinuousSlider = ({
  value,
  max,
  onChange,
  width = 280,
}: ContinuousSliderProps) => {
  const { panResponder, fillWidth, thumbX } = useSlide(
    max,
    value,
    width,
    onChange
  );

  return (
    <Track {...panResponder.panHandlers} $width={width}>
      <Fill style={{ width: fillWidth }} />
      <Thumb
        style={{ transform: [{ translateX: Animated.subtract(thumbX, 10) }] }}
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

const Thumb = styled(Animated.View)`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.color.main.primary};
  top: -3px;
`;
