import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const ChevronLeft = ({ size = 24, color = '#0F0F10' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.25 12.001C6.2541 12.3851 6.3977 12.7161 6.702 13.009L15.507 21.629C15.7635 21.876 16.0691 22 16.4384 22C17.1655 22 17.75 21.4293 17.75 20.6954C17.75 20.3378 17.6044 20.0068 17.3523 19.7497L9.403 12.003L17.3523 4.2523C17.6024 3.9973 17.75 3.6736 17.75 3.3046C17.75 2.5727 17.1655 2 16.4384 2C16.0732 2 15.7635 2.124 15.507 2.3803L6.702 10.9931C6.3956 11.2952 6.25 11.619 6.25 12.001Z"
        fill={color}
      />
    </Svg>
  );
};
