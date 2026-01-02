import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../../colors';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = {
    color: colorScheme === 'dark' ? darkColors : lightColors,
  };

  return {
    colorScheme,
    theme,
  };
};
