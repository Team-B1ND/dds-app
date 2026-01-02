import { DodamThemeProvider } from '@dds-app/foundation';
import styled from 'styled-components/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from '@dds-app/components';
import { useState } from 'react';

export default function App() {
  const [checked, setChecked] = useState(true);

  return (
    <DodamThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          <ExampleView>
            <Switch
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          </ExampleView>
        </SafeAreaView>
      </SafeAreaProvider>
    </DodamThemeProvider>
  );
}

const ExampleView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.background.default};
`;
