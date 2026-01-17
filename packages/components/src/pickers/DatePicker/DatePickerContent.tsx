import { useWindowDimensions } from 'react-native';
import { useDatePicker } from './hooks/useDatePicker';
import type { DatePickerContentProps } from './type';
import {
  ModalContainer,
  Header,
  Title,
  MonthRow,
  MonthText,
  ArrowRow,
  AnimatedArrowButton,
  Arrow,
  DayRow,
  DayCell,
  DayText,
  AnimatedCalendar,
  DateCell,
  DateButton,
  SelectedDate,
  SelectedText,
  DateText,
  Footer,
  SelectButton,
  SelectText,
} from './style';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePickerContent = ({
  title,
  selectedDate: initialSelectedDate,
  onSelect,
  onPress,
}: DatePickerContentProps) => {
  const { width: screenWidth } = useWindowDimensions();
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
