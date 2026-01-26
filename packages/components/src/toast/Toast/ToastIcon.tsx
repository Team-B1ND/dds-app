import {
  ColoredCheckmarkCircle,
  ColoredExclamationmarkCircle,
  ColoredXmarkCircle,
} from '@dds-app/icons';

type IconName =
  | 'success-color'
  | 'exclamationmark'
  | 'exclamationmark-color'
  | 'xmark'
  | 'xmark-color';

interface ToastIconProps {
  name: IconName;
  size?: number;
}

export const ToastIcon = ({ name, size = 22 }: ToastIconProps) => {
  switch (name) {
    case 'success-color':
      return <ColoredCheckmarkCircle size={size} />;
    case 'exclamationmark-color':
      return <ColoredExclamationmarkCircle size={size} />;
    case 'xmark-color':
      return <ColoredXmarkCircle size={size} />;
    default:
      return null;
  }
};