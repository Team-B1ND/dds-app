import { useTheme } from 'styled-components/native';
import { IconButton as BaseIconButton } from '../../../buttons';
import type { IconButtonProps } from '../types';

export const IconButton = ({ icon, onPress }: IconButtonProps) => {
  const theme = useTheme();

  return (
    <BaseIconButton
      icon={icon}
      color={theme.color.text.tertiary}
      haptic
      onPress={onPress}
    />
  );
};
