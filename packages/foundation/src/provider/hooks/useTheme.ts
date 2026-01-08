import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../../colors';
import { radius } from '../../radius';
import { opacity } from '../../opacity';
import { size } from '../../size';
import { spacing } from '../../spacing';
import { typography } from '../../typography';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = {
    color: colorScheme === 'dark' ? darkColors : lightColors,
    radius,
    opacity,
    size,
    spacing,
    typography,
  };

  return {
    colorScheme,
    theme,
  };
};
