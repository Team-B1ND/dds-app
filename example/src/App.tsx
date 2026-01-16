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
  ContinuousSlider,
  StepSlider,
  AlertDialog,
  ConfirmDialog,
  OverlayProvider,
  useOverlay,
} from '@dds-app/components';

function App() {
  return (
    <SafeAreaProvider>
      <DodamThemeProvider>
        <OverlayProvider>
          <StatusBar barStyle="dark-content" />
          <AppContent />
        </OverlayProvider>
      </DodamThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [continuousValue, setContinuousValue] = useState(0.5);
  const [stepValue, setStepValue] = useState(2);

  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const overlay = useOverlay();

  const handleOverlayAlert = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <AlertDialog
        open={isOpen}
        title="useOverlay 알림"
        description="useOverlay hook으로 열린 다이얼로그입니다"
        onClose={close}
        onExited={exit}
      />
    ));
  };

  const handleOverlayConfirm = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <ConfirmDialog
        open={isOpen}
        title="삭제 확인"
        description="정말로 삭제하시겠어요?"
        onClose={close}
        onExited={exit}
      >
        <ConfirmDialog.Button
          color="secondary"
          display="full"
          onPress={close}
        >
          취소
        </ConfirmDialog.Button>
        <ConfirmDialog.Button
          color="danger"
          display="full"
          onPress={() => {
            console.log('삭제됨!');
            close();
          }}
        >
          삭제
        </ConfirmDialog.Button>
      </ConfirmDialog>
    ));
  };

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
        <Section>
          <SectionTitle>Sliders</SectionTitle>
          <ContinuousSlider
            value={continuousValue}
            max={1}
            onChange={setContinuousValue}
          />
          <Spacer />
          <StepSlider steps={5} value={stepValue} onChange={setStepValue} />
        </Section>

        <Section>
          <SectionTitle>Dialogs - State 방식</SectionTitle>
          <ButtonGroup>
            <FormButton onPress={() => setAlertOpen(true)}>
              AlertDialog 열기
            </FormButton>
            <FormButton onPress={() => setConfirmOpen(true)}>
              ConfirmDialog 열기
            </FormButton>
          </ButtonGroup>

          <AlertDialog
            open={alertOpen}
            title="알림"
            description="이것은 AlertDialog 입니다"
            buttonText="확인"
            onClose={() => setAlertOpen(false)}
          />

          <ConfirmDialog
            open={confirmOpen}
            title="확인"
            description="이 작업을 진행하시겠어요?"
            onClose={() => setConfirmOpen(false)}
          >
            <ConfirmDialog.Button
              color="secondary"
              display="full"
              onPress={() => setConfirmOpen(false)}
            >
              취소
            </ConfirmDialog.Button>
            <ConfirmDialog.Button
              color="primary"
              display="full"
              onPress={() => {
                console.log('확인!');
                setConfirmOpen(false);
              }}
            >
              확인
            </ConfirmDialog.Button>
          </ConfirmDialog>
        </Section>

        <Section>
          <SectionTitle>Dialogs - useOverlay 방식</SectionTitle>
          <ButtonGroup>
            <FormButton onPress={handleOverlayAlert}>
              useOverlay Alert
            </FormButton>
            <FormButton color="danger" onPress={handleOverlayConfirm}>
              useOverlay Confirm
            </FormButton>
          </ButtonGroup>
        </Section>

        <Section>
          <SectionTitle>Dialogs - closeOnDimmerClick</SectionTitle>
          <FormButton
            onPress={() => {
              overlay.open(({ isOpen, close, exit }) => (
                <AlertDialog
                  open={isOpen}
                  title="딤 클릭으로 닫기"
                  description="딤 영역을 클릭하면 닫혀요"
                  closeOnDimmerClick={true}
                  onClose={close}
                  onExited={exit}
                />
              ));
            }}
          >
            Dim 클릭으로 닫기
          </FormButton>
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
