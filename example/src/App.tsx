import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { DodamThemeProvider } from '@dds-app/foundation';
import {
  Switch,
  FormButton,
  DatePicker,
  TimePicker,
  SegmentedButton,
  Badge,
  Progress,
  CircularProgress,
  ContinuousSlider,
  StepSlider,
  AlertDialog,
  ConfirmDialog,
  OverlayProvider,
  useOverlay,
  Dropdown,
  TopNavBar,
  createTopNavBarOptions,
  IconButton,
  Avatar,
  Checkbox,
  Tab,
  Tag,
  Toast,
} from '@dds-app/components';
import { Plus, Bell, Gear, Trash } from '@dds-app/icons';
import { IconScreen } from './IconScreen';

type RootStackParamList = {
  Main: undefined;
  Icons: undefined;
};

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <DodamThemeProvider>
        <OverlayProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen
                name="Icons"
                component={IconScreen}
                options={{
                  ...createTopNavBarOptions(),
                  headerLeft: () => <TopNavBar.BackButton />,
                  headerTitle: () => (
                    <TopNavBar.Title hasBackButton>Icons</TopNavBar.Title>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OverlayProvider>
      </DodamThemeProvider>
    </SafeAreaProvider>
  );
}

function MainScreen({ navigation }: MainScreenProps) {
  // Toast state는 화면 루트 레벨에서 관리
  const [toastTopOpen, setToastTopOpen] = useState(false);
  const [toastBottomOpen, setToastBottomOpen] = useState(false);

  return (
    <StyledSafeAreaView>
      <AppContent
        onNavigateToIcons={() => navigation.navigate('Icons')}
        onShowTopToast={() => setToastTopOpen(true)}
        onShowBottomToast={() => setToastBottomOpen(true)}
      />
      {/* Toast는 화면 루트 레벨에 배치 - 화면 기준으로 위치됨 */}
      <Toast
        position="top"
        open={toastTopOpen}
        text="상단 토스트 메시지예요"
        duration={3000}
        onClose={() => setToastTopOpen(false)}
      />
      <Toast
        position="bottom"
        open={toastBottomOpen}
        left={<Toast.Icon name="success-color" />}
        text="아이콘이 포함된 토스트예요"
        duration={3000}
        onClose={() => setToastBottomOpen(false)}
      />
    </StyledSafeAreaView>
  );
}

interface AppContentProps {
  onNavigateToIcons: () => void;
  onShowTopToast: () => void;
  onShowBottomToast: () => void;
}

function AppContent({
  onNavigateToIcons,
  onShowTopToast,
  onShowBottomToast,
}: AppContentProps) {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxFilledChecked, setCheckboxFilledChecked] = useState(true);
  const [tabValue, setTabValue] = useState('tab1');

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
          <SectionTitle>TopNavBar - Logo</SectionTitle>
          <NavBarWrapper>
            <TopNavBar
              right={
                <>
                  <TopNavBar.IconButton icon={<Plus size={24} />} />
                  <TopNavBar.IconButton icon={<Bell size={24} />} />
                </>
              }
            >
              <TopNavBar.Logo />
            </TopNavBar>
          </NavBarWrapper>
        </Section>

        <Section>
          <SectionTitle>TopNavBar - Title (No Back)</SectionTitle>
          <NavBarWrapper>
            <TopNavBar
              right={
                <>
                  <TopNavBar.IconButton icon={<Plus size={24} />} />
                  <TopNavBar.IconButton icon={<Bell size={24} />} />
                </>
              }
            >
              <TopNavBar.Title>제목을 입력해주세요</TopNavBar.Title>
            </TopNavBar>
          </NavBarWrapper>
        </Section>

        <Section>
          <SectionTitle>TopNavBar - With Back Button</SectionTitle>
          <NavBarWrapper>
            <TopNavBar
              left={
                <TopNavBar.BackButton onPress={() => console.log('Back')} />
              }
              right={
                <>
                  <TopNavBar.IconButton icon={<Plus size={24} />} />
                  <TopNavBar.IconButton icon={<Bell size={24} />} />
                </>
              }
            >
              <TopNavBar.Title hasBackButton>
                제목을 입력해주세요
              </TopNavBar.Title>
            </TopNavBar>
          </NavBarWrapper>
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
          <SectionTitle>Tag</SectionTitle>
          <ButtonGroup>
            <Tag title="primary" type="primary" />
            <Tag title="secondary" type="secondary" />
            <Tag title="danger" type="danger" />
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
          <SectionTitle>IconButton</SectionTitle>
          <ButtonGroup>
            <IconButton
              icon={<Plus size={24} />}
              onPress={() => console.log('Plus')}
            />
            <IconButton
              icon={<Bell size={24} />}
              onPress={() => console.log('Bell')}
            />
            <IconButton
              icon={<Gear size={24} />}
              onPress={() => console.log('Gear')}
            />
            <IconButton
              icon={<Trash size={24} />}
              color="#FF4242"
              onPress={() => console.log('Trash')}
            />
            <IconButton icon={<Plus size={24} />} disabled />
          </ButtonGroup>
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
            <FormButton
              display="inline"
              size="large"
              onPress={() => console.log('Large')}
            >
              Large
            </FormButton>
            <FormButton
              display="inline"
              size="medium"
              onPress={() => console.log('Medium')}
            >
              Medium
            </FormButton>
            <FormButton
              display="inline"
              size="small"
              onPress={() => console.log('Small')}
            >
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
          <SectionTitle>Badges</SectionTitle>
          <ButtonGroup>
            <Badge type="dot" />
            <Badge type="number" count={1} />
            <Badge type="number" count={1200} />
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
          <SectionTitle>Toast</SectionTitle>
          <ButtonGroup>
            <FormButton onPress={onShowTopToast}>상단 토스트</FormButton>
            <FormButton onPress={onShowBottomToast}>
              하단 토스트 (아이콘)
            </FormButton>
          </ButtonGroup>
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

        <Section>
          <SectionTitle>Tab - Controlled</SectionTitle>
          <Tab value={tabValue} onChange={setTabValue}>
            <Tab.Item value="tab1">전체</Tab.Item>
            <Tab.Item value="tab2">기숙사</Tab.Item>
            <Tab.Item value="tab3">학교</Tab.Item>
          </Tab>
        </Section>

        <Section>
          <SectionTitle>Tab - Uncontrolled (defaultValue)</SectionTitle>
          <Tab defaultValue="tab2">
            <Tab.Item value="tab1">급식</Tab.Item>
            <Tab.Item value="tab2">일정</Tab.Item>
            <Tab.Item value="tab3">공지사항</Tab.Item>
            <Tab.Item value="tab4">설정</Tab.Item>
          </Tab>
        </Section>

        <Section>
          <SectionTitle>Tab - Fluid (Scrollable)</SectionTitle>
          <Tab defaultValue="mon" fluid>
            <Tab.Item value="mon">월요일</Tab.Item>
            <Tab.Item value="tue">화요일</Tab.Item>
            <Tab.Item value="wed">수요일</Tab.Item>
            <Tab.Item value="thu">목요일</Tab.Item>
            <Tab.Item value="fri">금요일</Tab.Item>
            <Tab.Item value="sat">토요일</Tab.Item>
            <Tab.Item value="sun">일요일</Tab.Item>
          </Tab>
        </Section>

        <Section>
          <SectionTitle>Checkbox - Filled (Sizes)</SectionTitle>
          <SwitchRow>
            <Checkbox
              variant="filled"
              size="large"
              checked={checkboxFilledChecked}
              onChange={() => setCheckboxFilledChecked(!checkboxFilledChecked)}
            />
            <Checkbox
              variant="filled"
              size="medium"
              checked={checkboxFilledChecked}
              onChange={() => setCheckboxFilledChecked(!checkboxFilledChecked)}
            />
            <Checkbox
              variant="filled"
              size="small"
              checked={checkboxFilledChecked}
              onChange={() => setCheckboxFilledChecked(!checkboxFilledChecked)}
            />
            <SwitchLabel>Large / Medium / Small</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Checkbox variant="filled" size="large" checked={true} disabled />
            <Checkbox variant="filled" size="medium" checked={true} disabled />
            <Checkbox variant="filled" size="small" checked={true} disabled />
            <SwitchLabel>Disabled (Checked)</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Checkbox variant="filled" size="large" checked={false} disabled />
            <Checkbox variant="filled" size="medium" checked={false} disabled />
            <Checkbox variant="filled" size="small" checked={false} disabled />
            <SwitchLabel>Disabled (Unchecked)</SwitchLabel>
          </SwitchRow>
        </Section>

        <Section>
          <SectionTitle>Checkbox - Outlined (Sizes)</SectionTitle>
          <SwitchRow>
            <Checkbox
              size="large"
              checked={checkboxChecked}
              onChange={() => setCheckboxChecked(!checkboxChecked)}
            />
            <Checkbox
              size="medium"
              checked={checkboxChecked}
              onChange={() => setCheckboxChecked(!checkboxChecked)}
            />
            <Checkbox
              size="small"
              checked={checkboxChecked}
              onChange={() => setCheckboxChecked(!checkboxChecked)}
            />
            <SwitchLabel>Large / Medium / Small</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Checkbox size="large" checked={true} disabled />
            <Checkbox size="medium" checked={true} disabled />
            <Checkbox size="small" checked={true} disabled />
            <SwitchLabel>Disabled (Checked)</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Checkbox size="large" checked={false} disabled />
            <Checkbox size="medium" checked={false} disabled />
            <Checkbox size="small" checked={false} disabled />
            <SwitchLabel>Disabled (Unchecked)</SwitchLabel>
          </SwitchRow>
        </Section>
      </ScrollContainer>
    </Container>
  );
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.surface};
`;

const Container = styled.View`
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
  gap: 8px;
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

const NavBarWrapper = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.border.normal};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

export default App;
