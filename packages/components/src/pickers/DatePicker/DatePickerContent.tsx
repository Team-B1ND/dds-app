import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ChevronLeft, ChevronRight } from '@dds-app/icons';
import { FormButton } from '../../buttons';
import { useDatePicker } from './hooks/useDatePicker';
import type { DatePickerContentProps } from './type';
import * as S from './style';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePickerContent = ({
  title,
  selectedDate: initialSelectedDate,
  disablePastDates = false,
  showTodayIndicator = true,
  onSelect,
  onPress,
}: DatePickerContentProps) => {
  const theme = useTheme();
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
    isToday,
  } = useDatePicker({ initialSelectedDate, disablePastDates, showTodayIndicator, onSelect, onPress });

  return (
    <S.ModalContainer style={{ width: modalWidth }}>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.MonthRow>
          <S.MonthText>
            {currentYear}년 {currentMonth + 1}월
          </S.MonthText>
          <S.ArrowRow>
            <S.AnimatedArrowButton
              style={{ transform: [{ scale: prevArrowScale }] }}
              onPress={handlePrevMonth}
            >
              <ChevronLeft size={20} color={theme.color.main.primary} />
            </S.AnimatedArrowButton>
            <S.AnimatedArrowButton
              style={{ transform: [{ scale: nextArrowScale }] }}
              onPress={handleNextMonth}
            >
              <ChevronRight size={20} color={theme.color.main.primary} />
            </S.AnimatedArrowButton>
          </S.ArrowRow>
        </S.MonthRow>
      </S.Header>

      <S.DayRow>
        {DAYS.map((day) => (
          <S.DayCell key={day}>
            <S.DayText>{day}</S.DayText>
          </S.DayCell>
        ))}
      </S.DayRow>

      <S.AnimatedCalendar
        style={{
          opacity: calendarOpacity,
          transform: [{ translateX: calendarTranslateX }],
        }}
      >
        {calendarCells.map((cell) => {
          if (cell.type === 'empty') return <S.DateCell key={cell.key} />;

          const date = cell.date!;
          const isSelected = isSelectedDate(date);
          const isDisabled = isDateDisabled(date);
          const isTodayDate = isToday(date);

          return (
            <S.DateCell key={cell.key}>
              <S.DateButton
                onPress={() => handleDateSelect(date)}
                disabled={isDisabled}
              >
                {isSelected ? (
                  <S.SelectedDate>
                    <S.SelectedText>{date}</S.SelectedText>
                  </S.SelectedDate>
                ) : isTodayDate ? (
                  <S.TodayDate>
                    <S.TodayText>{date}</S.TodayText>
                  </S.TodayDate>
                ) : (
                  <S.DateText $disabled={isDisabled}>{date}</S.DateText>
                )}
              </S.DateButton>
            </S.DateCell>
          );
        })}
      </S.AnimatedCalendar>

      <S.Footer>
        <FormButton display="block" onPress={handleConfirm}>
          선택
        </FormButton>
      </S.Footer>
    </S.ModalContainer>
  );
};
