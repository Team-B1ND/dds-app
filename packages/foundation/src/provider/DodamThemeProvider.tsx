import { ThemeProvider } from 'styled-components/native';
import { useColorScheme, StatusBar } from 'react-native';
import type { PropsWithChildren } from 'react';
import { darkColors, lightColors } from '../colors';

export const DodamThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const theme = {
    color: colorScheme === 'dark' ? darkColors : lightColors,
  };
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.color.background.default}
      />
      {children}
    </ThemeProvider>
  );
};
