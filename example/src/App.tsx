import { DodamThemeProvider } from '@dds-app/foundation';
import styled from 'styled-components/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FormButton, Switch } from '@dds-app/components';
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
            <FormButton
              haptic
              color="danger"
              display="block"
              disabled={checked}
            >
              안녕하세요
            </FormButton>
            <FormButton haptic display="block" disabled={checked}>
              안녕
            </FormButton>
            <TestView>
              <FormButton haptic display="full" color="secondary">
                취소
              </FormButton>
              <FormButton haptic display="full">
                확인
              </FormButton>
            </TestView>
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

const TestView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 10px;
`;
