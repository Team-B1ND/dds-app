import { useRef, useCallback, useMemo } from 'react';
import { useWindowDimensions, FlatList } from 'react-native';
import { FormButton } from '../../buttons';
import { useTimePicker, type Period } from './hooks/useTimePicker';
import {
  ITEM_HEIGHT,
  createScrollHandler,
  getPickerItemLayout,
  getPickerPadding,
} from '../utils';
import type { TimePickerContentProps } from './type';
import * as S from './style';

export const TimePickerContent = ({
  title,
  selectedTime: initialTime,
  onSelect,
  onPress,
}: TimePickerContentProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const modalWidth = Math.min(screenWidth * 0.9, 340);

  const {
    selectedPeriod,
    selectedHour,
    selectedMinute,
    periods,
    hours,
    minutes,
    handlePeriodChange,
    handleHourChange,
    handleMinuteChange,
    handleConfirm,
    getInitialPeriodIndex,
    getInitialHourIndex,
  } = useTimePicker({ initialTime, onSelect, onPress });

  const periodListRef = useRef<FlatList<Period>>(null);
  const hourListRef = useRef<FlatList<number>>(null);
  const minuteListRef = useRef<FlatList<number>>(null);

  const handlePeriodScroll = useCallback(
    createScrollHandler(periods, handlePeriodChange),
    [periods, handlePeriodChange]
  );

  const handleHourScroll = useCallback(
    createScrollHandler(hours, handleHourChange),
    [hours, handleHourChange]
  );

  const handleMinuteScroll = useCallback(
    createScrollHandler(minutes, handleMinuteChange),
    [minutes, handleMinuteChange]
  );

  const renderPeriodItem = useCallback(
    ({ item }: { item: Period }) => (
      <S.PickerItem>
        <S.PickerItemText $selected={item === selectedPeriod}>
          {item}
        </S.PickerItemText>
      </S.PickerItem>
    ),
    [selectedPeriod]
  );

  const renderHourItem = useCallback(
    ({ item }: { item: number }) => (
      <S.PickerItem>
        <S.PickerItemText $selected={item === selectedHour}>
          {item}
        </S.PickerItemText>
      </S.PickerItem>
    ),
    [selectedHour]
  );

  const renderMinuteItem = useCallback(
    ({ item }: { item: number }) => (
      <S.PickerItem>
        <S.PickerItemText $selected={item === selectedMinute}>
          {item.toString().padStart(2, '0')}
        </S.PickerItemText>
      </S.PickerItem>
    ),
    [selectedMinute]
  );

  const paddingHeight = getPickerPadding();
  const contentContainerStyle = useMemo(
    () => ({ paddingTop: paddingHeight, paddingBottom: paddingHeight }),
    [paddingHeight]
  );

  const flatListProps = {
    showsVerticalScrollIndicator: false,
    snapToInterval: ITEM_HEIGHT,
    decelerationRate: 'fast' as const,
    getItemLayout: getPickerItemLayout,
    scrollEventThrottle: 16,
    contentContainerStyle,
  };

  return (
    <S.ModalContainer style={{ width: modalWidth }}>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>

      <S.PickerContainer>
        <S.SelectionIndicator pointerEvents="none" />
        <S.PickerWrapper>
          <FlatList
            ref={periodListRef}
            data={periods}
            keyExtractor={(item) => `period-${item}`}
            renderItem={renderPeriodItem}
            initialScrollIndex={getInitialPeriodIndex()}
            onScroll={handlePeriodScroll}
            {...flatListProps}
          />
        </S.PickerWrapper>

        <S.PickerWrapper>
          <FlatList
            ref={hourListRef}
            data={hours}
            keyExtractor={(item) => `hour-${item}`}
            renderItem={renderHourItem}
            initialScrollIndex={getInitialHourIndex()}
            onScroll={handleHourScroll}
            {...flatListProps}
          />
        </S.PickerWrapper>

        <S.Separator>:</S.Separator>

        <S.PickerWrapper>
          <FlatList
            ref={minuteListRef}
            data={minutes}
            keyExtractor={(item) => `minute-${item}`}
            renderItem={renderMinuteItem}
            initialScrollIndex={selectedMinute}
            onScroll={handleMinuteScroll}
            {...flatListProps}
          />
        </S.PickerWrapper>
      </S.PickerContainer>

      <S.Footer>
        <FormButton display="block" onPress={handleConfirm}>
          선택
        </FormButton>
      </S.Footer>
    </S.ModalContainer>
  );
};
