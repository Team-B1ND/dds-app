import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const Chart = ({ size = 24, color = '#0F0F10' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.99999 22.5H7.5V7.6601C7.5 7.15616 7.08953 6.75 6.58024 6.75H3.91976C3.41047 6.75 3 7.15616 3 7.6601L2.99999 22.5C3.49999 22.5 2.45356 22.5 2.99999 22.5Z"
        fill={color}
      />
      <Path
        d="M13.3302 12.75H10.6698C10.1605 12.75 9.75 13.1562 9.75 13.6603V22.5H14.25V13.6603C14.25 13.1562 13.8395 12.75 13.3302 12.75Z"
        fill={color}
      />
      <Path
        d="M16.5 22.5H21V5.40674C21 4.90466 20.5895 4.5 20.0802 4.5H17.4198C16.9105 4.5 16.5 4.90466 16.5 5.40674V22.5Z"
        fill={color}
      />
    </Svg>
  );
};
