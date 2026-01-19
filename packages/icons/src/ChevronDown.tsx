import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ChevronDown = ({
  width = 14,
  height = 8,
  color = '#0F0F10',
}: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 8" fill="none">
      <Path
        d="M6.66733 7.66667C6.9234 7.66393 7.14407 7.5682 7.33933 7.36533L13.086 1.4953C13.2507 1.32433 13.3333 1.12057 13.3333 0.8744C13.3333 0.389633 12.9529 0 12.4636 0C12.2252 0 12.0045 0.0970666 11.8331 0.265133L6.66867 5.56467L1.50153 0.265133C1.33153 0.0984332 1.11573 0 0.869733 0C0.3818 0 0 0.389633 0 0.8744C0 1.11783 0.0826667 1.32433 0.253533 1.4953L5.9954 7.36533C6.1968 7.5696 6.41267 7.66667 6.66733 7.66667Z"
        fill={color}
      />
    </Svg>
  );
};
