import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { DodamThemeProvider } from '@dds-app/foundation';
import {
  Switch,
  FormButton,
  DatePicker,
  TimePicker,
  SegmentedButton,
  Progress,
  CircularProgress,
  ContinuousSlider,
  StepSlider,
  AlertDialog,
  ConfirmDialog,
  OverlayProvider,
  useOverlay,
  Dropdown,
  Avatar,
} from '@dds-app/components';
import { IconPage } from './IconPage';

type Screen = 'main' | 'icons';

function App() {
  const [screen, setScreen] = useState<Screen>('main');

  return (
    <SafeAreaProvider>
      <DodamThemeProvider>
        <OverlayProvider>
          <StatusBar barStyle="dark-content" />
          {screen === 'main' ? (
            <AppContent onNavigateToIcons={() => setScreen('icons')} />
          ) : (
            <IconPage onBack={() => setScreen('main')} />
          )}
        </OverlayProvider>
      </DodamThemeProvider>
    </SafeAreaProvider>
  );
}

interface AppContentProps {
  onNavigateToIcons: () => void;
}

function AppContent({ onNavigateToIcons }: AppContentProps) {
  const [switchChecked, setSwitchChecked] = useState(false);

  // Date / Time Picker
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<
    { hour: number; minute: number } | undefined
  >(undefined);

  // Segmented / Progress / Slider
  const [segmentLabel, setSegmentLabel] = useState('Label');
  const [segmentLabelMany, setSegmentLabelMany] = useState('Mon');
  const [progress, setProgress] = useState(0);
  const [continuousValue, setContinuousValue] = useState(0.5);
  const [stepValue, setStepValue] = useState(2);

  // Dialogs
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState({
    label: '드롭다운 첫번째',
    value: 'option1',
  });
  const overlay = useOverlay();

  const handleDatePicker = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <DatePicker
        open={isOpen}
        onClose={close}
        onExited={exit}
        title="외출 일시"
        selectedDate={selectedDate}
        onSelect={date => setSelectedDate(date)}
        onPress={() => console.log('날짜 선택 완료:', selectedDate)}
      />
    ));
  };

  const handleTimePicker = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <TimePicker
        open={isOpen}
        onClose={close}
        onExited={exit}
        title="외출 일시"
        selectedTime={selectedTime}
        onSelect={time => setSelectedTime(time)}
        onPress={() => console.log('시간 선택 완료:', selectedTime)}
      />
    ));
  };


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
        <ConfirmDialog.Button color="secondary" display="full" onPress={close}>
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
          <FormButton onPress={onNavigateToIcons}>Icon 보기</FormButton>
        </Section>

        <Section>
          <SectionTitle>Avatar</SectionTitle>
          <ButtonGroup>
            <Avatar size={24} />
            <Avatar size={32} />
            <Avatar size={40} />
            <Avatar size={56} />
          </ButtonGroup>
        </Section>

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
          <SectionTitle>FormButton - Display & Size</SectionTitle>
          <ButtonGroup>
            <FormButton display="inline" size="large" onPress={() => console.log('Large')}>
              Large
            </FormButton>
            <FormButton display="inline" size="medium" onPress={() => console.log('Medium')}>
              Medium
            </FormButton>
            <FormButton display="inline" size="small" onPress={() => console.log('Small')}>
              Small
            </FormButton>
          </ButtonGroup>
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
          <SectionTitle>DatePicker</SectionTitle>

          <FormButton onPress={handleDatePicker}>
            {selectedDate
              ? `${selectedDate.getFullYear()}년 ${
                  selectedDate.getMonth() + 1
                }월 ${selectedDate.getDate()}일`
              : '날짜 선택'}
          </FormButton>
        </Section>

        <Section>
          <SectionTitle>TimePicker</SectionTitle>

          <FormButton onPress={handleTimePicker}>
            {selectedTime
              ? `${selectedTime.hour
                  .toString()
                  .padStart(2, '0')}:${selectedTime.minute
                  .toString()
                  .padStart(2, '0')}`
              : '시간 선택'}
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
          <SectionTitle>SegmentedButton - 2 options</SectionTitle>
          <SegmentedButton
            options={[{ label: 'Label' }, { label: 'Label2' }]}
            label={segmentLabel}
            onChange={setSegmentLabel}
          />
        </Section>

        <Section>
          <SectionTitle>SegmentedButton - 5 options</SectionTitle>
          <SegmentedButton
            options={[
              { label: 'Mon' },
              { label: 'Tue' },
              { label: 'Wed' },
              { label: 'Thu' },
              { label: 'Fri' },
            ]}
            label={segmentLabelMany}
            onChange={setSegmentLabelMany}
          />
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
          <SectionTitle>Dialogs - Description 없음</SectionTitle>
          <ButtonGroup>
            <FormButton
              onPress={() => {
                overlay.open(({ isOpen, close, exit }) => (
                  <AlertDialog
                    open={isOpen}
                    title="알림"
                    onClose={close}
                    onExited={exit}
                  />
                ));
              }}
            >
              Alert (No Desc)
            </FormButton>
            <FormButton
              onPress={() => {
                overlay.open(({ isOpen, close, exit }) => (
                  <ConfirmDialog
                    open={isOpen}
                    title="확인하시겠어요?"
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
                      color="primary"
                      display="full"
                      onPress={close}
                    >
                      확인
                    </ConfirmDialog.Button>
                  </ConfirmDialog>
                ));
              }}
            >
              Confirm (No Desc)
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

        <Section>
          <SectionTitle>Dropdown</SectionTitle>
          <Dropdown
            options={[
              { label: '드롭다운 첫번째ㅐㅐㅐㅐㅐ', value: 'option1' },
              { label: '드롭다운 두번째', value: 'option2' },
              { label: '드롭다운 세번째', value: 'option3' },
            ]}
            selectedOption={selectedDropdownOption}
            onSelect={setSelectedDropdownOption}
            width={240}
          />
        </Section>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.surface};
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
  align-items: flex-start;
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
