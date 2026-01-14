import styled from 'styled-components/native';
import { Animated, Pressable, useWindowDimensions } from 'react-native';
import { useDatePicker } from './hooks/useDatePicker';
import { Modal } from '../Modal';
import type { DatePickerProps } from './type';

export interface DatePickerModalProps extends DatePickerProps {
  visible: boolean;
  onClose: () => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePicker = ({
  title,
  selectedDate: initialSelectedDate,
  onSelect,
  onPress,
}: DatePickerProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // 모달 너비 계산
  const modalWidth = Math.min(screenWidth * 0.9, 340);

  const {
    currentYear,
    currentMonth,
    calendarCells,
    prevArrowScale,
    nextArrowScale,
    calendarOpacity,
    calendarTranslateX,
    handlePrevMonth,
    handleNextMonth,
    handleDateSelect,
    handleConfirm,
    isDateDisabled,
    isSelectedDate,
  } = useDatePicker({
    initialSelectedDate,
    onSelect,
    onPress,
  });

  return (
    <ModalContainer style={{ width: modalWidth }}>
      <Header>
        <Title>{title}</Title>

        <MonthRow>
          <MonthText>
            {currentYear}년 {currentMonth + 1}월
          </MonthText>

          <ArrowRow>
            <AnimatedArrowButton
              style={{ transform: [{ scale: prevArrowScale }] }}
              onPress={handlePrevMonth}
            >
              <Arrow>{'‹'}</Arrow>
            </AnimatedArrowButton>
            <AnimatedArrowButton
              style={{ transform: [{ scale: nextArrowScale }] }}
              onPress={handleNextMonth}
            >
              <Arrow>{'›'}</Arrow>
            </AnimatedArrowButton>
          </ArrowRow>
        </MonthRow>
      </Header>

      <DayRow>
        {DAYS.map((day) => (
          <DayCell key={day}>
            <DayText>{day}</DayText>
          </DayCell>
        ))}
      </DayRow>

      <AnimatedCalendar
        style={{
          opacity: calendarOpacity,
          transform: [{ translateX: calendarTranslateX }],
        }}
      >
        {calendarCells.map((cell) => {
          if (cell.type === 'empty') {
            return <DateCell key={cell.key} />;
          }

          const date = cell.date!;
          const isSelected = isSelectedDate(date);
          const isDisabled = isDateDisabled(date);

          return (
            <DateCell key={cell.key}>
              <DateButton
                onPress={() => handleDateSelect(date)}
                disabled={isDisabled}
              >
                {isSelected ? (
                  <SelectedDate>
                    <SelectedText>{date}</SelectedText>
                  </SelectedDate>
                ) : (
                  <DateText $disabled={isDisabled}>{date}</DateText>
                )}
              </DateButton>
            </DateCell>
          );
        })}
      </AnimatedCalendar>

      <Footer>
        <SelectButton onPress={handleConfirm}>
          <SelectText>선택</SelectText>
        </SelectButton>
      </Footer>
    </ModalContainer>
  );
};

const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.surface};
  padding: 24px 20px 20px 20px;
  border-radius: ${({ theme }) => theme.radius.xxxl};
`;

// Text Styles
const Title = styled.Text`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.typography.title.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const MonthText = styled.Text`
  color: ${({ theme }) => theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const DayText = styled.Text`
  color: ${({ theme }) => theme.color.text.placeholder};
  font-size: ${({ theme }) => theme.typography.label.lg.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-align: center;
`;

const DateText = styled.Text<{ $disabled?: boolean }>`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.text.disabled : theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`;

const SelectedText = styled.Text`
  color: ${({ theme }) => theme.color.static.white};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SelectText = styled.Text`
  color: ${({ theme }) => theme.color.main.primary};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Header = styled.View`
  gap: 2px;
  margin-bottom: 24px;
`;

const MonthRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowRow = styled.View`
  flex-direction: row;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  gap: 12px;
`;

const ArrowButton = styled(Pressable)`
  padding: 4px;
`;

const AnimatedArrowButton = Animated.createAnimatedComponent(ArrowButton);

const Arrow = styled.Text`
  font-size: 30px;
  color: ${({ theme }) => theme.color.main.primary};
`;

const DayRow = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const DayCell = styled.View`
  flex: 1;
  align-items: center;
`;

const Calendar = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const AnimatedCalendar = Animated.createAnimatedComponent(Calendar);

const DateCell = styled.View`
  width: 14.28%;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const DateButton = styled(Pressable)`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

const SelectedDate = styled.View`
  background-color: ${({ theme }) => theme.color.main.primary};
  width: 36px;
  height: 36px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.View`
  margin-top: 12px;
  align-items: flex-end;
`;

const SelectButton = styled(Pressable)`
  padding: 8px 0;
`;

// Modal + DatePicker
export const DatePickerModal = ({
  visible,
  onClose,
  title,
  selectedDate,
  onSelect,
  onPress,
}: DatePickerModalProps) => {
  const handleConfirm = () => {
    onPress();
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <DatePicker
        title={title}
        selectedDate={selectedDate}
        onSelect={onSelect}
        onPress={handleConfirm}
      />
    </Modal>
  );
};
