import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const Bell = ({ size = 24, color = '#0F0F10' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.52296 9.66466C4.52296 5.43158 7.87056 2 12 2C16.1295 2 19.477 5.43158 19.477 9.66471V14.3639L20.893 16.189C21.1473 16.5166 20.9197 17.0002 20.5113 17.0002H3.48868C3.08033 17.0002 2.85274 16.5166 3.10694 16.189L4.52296 14.3639V9.66466ZM11.7858 22C10.0854 22 8.70707 20.5755 8.70702 18.8182H14.8645C14.8645 20.5755 13.4861 22 11.7858 22Z"
        fill={color}
      />
    </Svg>
  );
};
