import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { DodamThemeProvider } from '@dds-app/foundation';
import {
  Switch,
  FormButton,
  Progress,
  CircularProgress,
} from '@dds-app/components';

function App() {
  return (
    <SafeAreaProvider>
      <DodamThemeProvider>
        <StatusBar barStyle="dark-content" />
        <AppContent />
      </DodamThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Container>
      <ScrollContainer>
        <Title>DDS App Components</Title>

        <Section>
          <SectionTitle>Switch</SectionTitle>
          <SwitchRow>
            <Switch
              checked={switchChecked}
              onChange={() => setSwitchChecked(!switchChecked)}
            />
          </SwitchRow>
          <SwitchRow>
            <Switch checked={true} disabled />
            <SwitchLabel>Disabled (ON)</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Switch checked={false} disabled />
            <SwitchLabel>Disabled (OFF)</SwitchLabel>
          </SwitchRow>
        </Section>

        <Section>
          <SectionTitle>FormButton - Colors</SectionTitle>
          <ButtonGroup>
            <FormButton color="primary" onPress={() => console.log('Primary')}>
              Primary
            </FormButton>
            <FormButton
              color="secondary"
              onPress={() => console.log('Secondary')}
            >
              Secondary
            </FormButton>
            <FormButton color="danger" onPress={() => console.log('Danger')}>
              Danger
            </FormButton>
          </ButtonGroup>
        </Section>

        <Section>
          <SectionTitle>FormButton - Display</SectionTitle>
          <FormButton display="inline" onPress={() => console.log('Inline')}>
            Inline
          </FormButton>
          <Spacer />
          <FormButton display="block" onPress={() => console.log('Block')}>
            Block (100% width)
          </FormButton>
        </Section>

        <Section>
          <SectionTitle>FormButton - Haptic</SectionTitle>
          <FormButton haptic onPress={() => console.log('Haptic!')}>
            With Haptic Feedback
          </FormButton>
        </Section>

        <Section>
          <SectionTitle>FormButton - Disabled</SectionTitle>
          <ButtonGroup>
            <FormButton disabled color="primary">
              Disabled Primary
            </FormButton>
            <FormButton disabled color="secondary">
              Disabled Secondary
            </FormButton>
          </ButtonGroup>
        </Section>
        <Section>
          <SectionTitle>Progress</SectionTitle>
          <Progress progress={progress} />
          <Spacer />
          <Progress progress={progress} disabled />
          <Spacer />
          <CircularProgress progress={progress} size={64} strokeWidth={10} />
          <Spacer />
          <CircularProgress
            progress={progress}
            size={64}
            disabled
            strokeWidth={10}
          />
          <Spacer />
          <ButtonGroup>
            <FormButton
              onPress={() => setProgress(prev => Math.min(100, prev + 10))}
            >
              Increase Progress
            </FormButton>
            <FormButton
              onPress={() => setProgress(prev => Math.max(0, prev - 10))}
            >
              Decrease Progress
            </FormButton>
          </ButtonGroup>
        </Section>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.default};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.color.text.primary};
`;

const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const SwitchLabel = styled.Text`
  margin-left: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Spacer = styled.View`
  height: 8px;
`;

export default App;
