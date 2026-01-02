import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useTheme } from './hooks/useTheme';

export const DodamThemeProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, theme } = useTheme();

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
