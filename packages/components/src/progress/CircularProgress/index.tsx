import styled from 'styled-components/native';
import Svg, { Circle } from 'react-native-svg';
import { Animated } from 'react-native';
import type { CircularProgressProps } from '../types';
import { useCircularProgress } from './hooks/useCircularProgress';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({
  progress,
  disabled = false,
  size = 80,
  strokeWidth = 8,
}: CircularProgressProps) => {
  const { animatedStrokeOffset, circumference, radius } = useCircularProgress(
    progress,
    size,
    strokeWidth
  );

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={disabled ? '#9CA3AF' : '#2563EB'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
