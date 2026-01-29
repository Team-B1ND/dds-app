import { useState, useEffect } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DodamThemeProvider } from '@dds-app/foundation';
import {
  FormButton,
  TextButton,
  Switch,
  SegmentedButton,
  IconButton,
  DatePicker,
  TimePicker,
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
  Checkbox,
  Tab,
  Tag,
  Badge,
  ToastContainer,
  toast,
  Stack,
  TopNavBar,
  type ScreenComponentProps,
} from '@dds-app/core';
import { Plus, Bell, Gear, Trash } from '@dds-app/icons';
import styled from 'styled-components/native';

const useWebStyles = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = (globalThis as any).document;
    if (!doc) return;

    const style = doc.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      html, body {
        touch-action: pan-x pan-y;
        -ms-touch-action: pan-x pan-y;
        overscroll-behavior: none;
      }
    `;
    doc.head.appendChild(style);

    const viewport = doc.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      );
    }

    return () => {
      doc.head.removeChild(style);
    };
  }, []);
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.surface};
`;

const Section = styled.View`
  padding: 16px;
  gap: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Spacer = styled.View`
  height: 8px;
`;

const HomeScreen = ({ navigation }: ScreenComponentProps) => {
  const overlay = useOverlay();

  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxFilledChecked, setCheckboxFilledChecked] = useState(true);
  const [tabValue, setTabValue] = useState('tab1');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<
    { hour: number; minute: number } | undefined
  >(undefined);
  const [segmentLabel, setSegmentLabel] = useState('Label');
  const [segmentLabelMany, setSegmentLabelMany] = useState('Mon');
  const [progress, setProgress] = useState(0);
  const [continuousValue, setContinuousValue] = useState(0.5);
  const [stepValue, setStepValue] = useState(2);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState({
    label: '드롭다운 첫번째',
    value: 'option1',
  });

  const handleDatePicker = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <DatePicker
        open={isOpen}
        onClose={close}
        onExited={exit}
        title="날짜 선택"
        selectedDate={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
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
        title="시간 선택"
        selectedTime={selectedTime}
        onSelect={(time) => setSelectedTime(time)}
        onPress={() => console.log('시간 선택 완료:', selectedTime)}
      />
    ));
  };

  const handleOverlayAlert = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <AlertDialog
        open={isOpen}
        title="알림"
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
      <ScrollView>
        <Section>
          <SectionTitle>Navigation</SectionTitle>
          <FormButton onPress={() => navigation.navigate('Detail')}>
            Detail 페이지로 이동
          </FormButton>
          <FormButton
            color="secondary"
            onPress={() => navigation.navigate('BlockedSwipe')}
          >
            스와이프 비활성화 페이지
          </FormButton>
        </Section>

        <Section>
          <SectionTitle>Avatar</SectionTitle>
          <Row>
            <Avatar size={24} />
            <Avatar size={32} />
            <Avatar size={40} />
            <Avatar size={56} />
          </Row>
        </Section>

        <Section>
          <SectionTitle>Tag</SectionTitle>
          <Row>
            <Tag title="primary" type="primary" />
            <Tag title="secondary" type="secondary" />
            <Tag title="danger" type="danger" />
          </Row>
        </Section>

        <Section>
          <SectionTitle>Switch</SectionTitle>
          <Row>
            <Switch
              checked={switchChecked}
              onChange={() => setSwitchChecked(!switchChecked)}
            />
          </Row>
          <Row>
            <Switch checked={true} disabled />
            <Switch checked={false} disabled />
          </Row>
        </Section>

        <Section>
          <SectionTitle>IconButton</SectionTitle>
          <Row>
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
          </Row>
        </Section>

        <Section>
          <SectionTitle>FormButton - Colors</SectionTitle>
          <Row>
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
          </Row>
        </Section>

        <Section>
          <SectionTitle>FormButton - Sizes</SectionTitle>
          <Row>
            <FormButton display="inline" size="large">
              Large
            </FormButton>
            <FormButton display="inline" size="medium">
              Medium
            </FormButton>
            <FormButton display="inline" size="small">
              Small
            </FormButton>
          </Row>
          <Spacer />
          <FormButton display="block">Block (100% width)</FormButton>
        </Section>

        <Section>
          <SectionTitle>TextButton</SectionTitle>
          <Row>
            <TextButton onPress={() => console.log('TextButton')}>
              Text Button
            </TextButton>
          </Row>
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
          <Row>
            <Badge type="dot" />
            <Badge type="number" count={1} />
            <Badge type="number" count={1200} />
          </Row>
        </Section>

        <Section>
          <SectionTitle>Progress</SectionTitle>
          <Progress progress={progress} />
          <Spacer />
          <Progress progress={progress} disabled />
          <Spacer />
          <Row>
            <CircularProgress progress={progress} size={64} strokeWidth={10} />
            <CircularProgress
              progress={progress}
              size={64}
              disabled
              strokeWidth={10}
            />
          </Row>
          <Spacer />
          <Row>
            <FormButton
              size="small"
              onPress={() => setProgress((prev) => Math.min(100, prev + 10))}
            >
              +10
            </FormButton>
            <FormButton
              size="small"
              onPress={() => setProgress((prev) => Math.max(0, prev - 10))}
            >
              -10
            </FormButton>
          </Row>
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
          <SectionTitle>Dialogs</SectionTitle>
          <Row>
            <FormButton size="small" onPress={handleOverlayAlert}>
              Alert Dialog
            </FormButton>
            <FormButton
              size="small"
              color="danger"
              onPress={handleOverlayConfirm}
            >
              Confirm Dialog
            </FormButton>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Toast</SectionTitle>
          <Row>
            <FormButton
              size="small"
              onPress={() => toast('상단 토스트', { position: 'top' })}
            >
              상단
            </FormButton>
            <FormButton size="small" onPress={() => toast.success('성공!')}>
              성공
            </FormButton>
            <FormButton size="small" onPress={() => toast.error('에러!')}>
              에러
            </FormButton>
            <FormButton size="small" onPress={() => toast.warning('경고!')}>
              경고
            </FormButton>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Dropdown</SectionTitle>
          <Dropdown
            options={[
              { label: '드롭다운 첫번째', value: 'option1' },
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
          <SectionTitle>Tab - Uncontrolled</SectionTitle>
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
          <SectionTitle>Checkbox - Filled</SectionTitle>
          <Row>
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
          </Row>
          <Row>
            <Checkbox variant="filled" size="large" checked={true} disabled />
            <Checkbox variant="filled" size="medium" checked={false} disabled />
          </Row>
        </Section>

        <Section>
          <SectionTitle>Checkbox - Outlined</SectionTitle>
          <Row>
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
          </Row>
          <Row>
            <Checkbox size="large" checked={true} disabled />
            <Checkbox size="medium" checked={false} disabled />
          </Row>
        </Section>

        <View style={{ height: 100 }} />
      </ScrollView>
    </Container>
  );
};

const DetailScreen = ({ navigation }: ScreenComponentProps) => {
  return (
    <Container>
      <Section>
        <SectionTitle>Detail Screen</SectionTitle>
        <Row>
          <FormButton onPress={() => navigation.goBack()}>뒤로 가기</FormButton>
        </Row>
        <Row>
          <FormButton
            color="secondary"
            onPress={() => navigation.navigate('Third')}
          >
            Third 페이지로 이동
          </FormButton>
        </Row>
      </Section>
    </Container>
  );
};

const ThirdScreen = ({ navigation }: ScreenComponentProps) => {
  return (
    <Container>
      <Section>
        <SectionTitle>Third Screen</SectionTitle>
        <Row>
          <FormButton onPress={() => navigation.goBack()}>뒤로 가기</FormButton>
        </Row>
      </Section>
    </Container>
  );
};

const BlockedSwipeScreen = ({ navigation }: ScreenComponentProps) => {
  return (
    <Container>
      <Section>
        <SectionTitle>Swipe Blocked Screen</SectionTitle>
        <Row>
          <FormButton onPress={() => navigation.goBack()}>뒤로 가기</FormButton>
        </Row>
        <SectionTitle style={{ marginTop: 16 }}>
          이 화면에서는 스와이프로 뒤로 갈 수 없습니다.
        </SectionTitle>
      </Section>
    </Container>
  );
};

export default function App() {
  useWebStyles();

  return (
    <SafeAreaProvider>
      <DodamThemeProvider>
        <OverlayProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              header={
                <TopNavBar
                  right={<TopNavBar.IconButton icon={<Bell size={20} />} />}
                >
                  <TopNavBar.Logo />
                </TopNavBar>
              }
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              header={
                <TopNavBar left={<TopNavBar.BackButton />}>
                  <TopNavBar.Title hasBackButton>Detail 페이지</TopNavBar.Title>
                </TopNavBar>
              }
            />
            <Stack.Screen
              name="Third"
              component={ThirdScreen}
              header={
                <TopNavBar left={<TopNavBar.BackButton />}>
                  <TopNavBar.Title hasBackButton>Third 페이지</TopNavBar.Title>
                </TopNavBar>
              }
            />
            <Stack.Screen
              name="BlockedSwipe"
              component={BlockedSwipeScreen}
              blockSwipe
              header={
                <TopNavBar left={<TopNavBar.BackButton />}>
                  <TopNavBar.Title hasBackButton>
                    스와이프 비활성화
                  </TopNavBar.Title>
                </TopNavBar>
              }
            />
          </Stack.Navigator>
          <ToastContainer />
        </OverlayProvider>
      </DodamThemeProvider>
    </SafeAreaProvider>
  );
}