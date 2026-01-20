import { useRef, useCallback } from 'react';
import { useWindowDimensions, FlatList } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTimePicker } from './hooks/useTimePicker';
import type { Period } from './hooks/useTimePicker';
import { ITEM_HEIGHT, VISIBLE_ITEMS } from '../utils';
import type { TimePickerContentProps } from './type';
import {
  ModalContainer,
  Header,
  Title,
  PickerContainer,
  SelectionIndicator,
  PickerWrapper,
  PickerItem,
  PickerItemText,
  Separator,
  Footer,
  SelectButton,
  SelectText,
} from './style';

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
  } = useTimePicker({
    initialTime,
    onSelect,
    onPress,
  });

  const periodListRef = useRef<FlatList<Period>>(null);
  const hourListRef = useRef<FlatList<number>>(null);
  const minuteListRef = useRef<FlatList<number>>(null);

  const handlePeriodScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, periods.length - 1));
      const period = periods[clampedIndex];
      if (period !== undefined) {
        handlePeriodChange(period);
      }
    },
    [periods, handlePeriodChange]
  );

  const handleHourScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, hours.length - 1));
      const hour = hours[clampedIndex];
      if (hour !== undefined) {
        handleHourChange(hour);
      }
    },
    [hours, handleHourChange]
  );

  const handleMinuteScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, minutes.length - 1));
      const minute = minutes[clampedIndex];
      if (minute !== undefined) {
        handleMinuteChange(minute);
      }
    },
    [minutes, handleMinuteChange]
  );

  const renderPeriodItem = useCallback(
    ({ item }: { item: Period }) => {
      const isSelected = item === selectedPeriod;
      return (
        <PickerItem>
          <PickerItemText $selected={isSelected}>{item}</PickerItemText>
        </PickerItem>
      );
    },
    [selectedPeriod]
  );

  const renderHourItem = useCallback(
    ({ item }: { item: number }) => {
      const isSelected = item === selectedHour;
      return (
        <PickerItem>
          <PickerItemText $selected={isSelected}>{item}</PickerItemText>
        </PickerItem>
      );
    },
    [selectedHour]
  );

  const renderMinuteItem = useCallback(
    ({ item }: { item: number }) => {
      const isSelected = item === selectedMinute;
      return (
        <PickerItem>
          <PickerItemText $selected={isSelected}>
            {item.toString().padStart(2, '0')}
          </PickerItemText>
        </PickerItem>
      );
    },
    [selectedMinute]
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const paddingHeight = (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;

  return (
    <ModalContainer style={{ width: modalWidth }}>
      <Header>
        <Title>{title}</Title>
      </Header>

      <PickerContainer>
        <SelectionIndicator pointerEvents="none" />
        <PickerWrapper>
          <FlatList
            ref={periodListRef}
            data={periods}
            keyExtractor={(item) => `period-${item}`}
            renderItem={renderPeriodItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            initialScrollIndex={getInitialPeriodIndex()}
            onScroll={handlePeriodScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: paddingHeight,
              paddingBottom: paddingHeight,
            }}
          />
        </PickerWrapper>

        <PickerWrapper>
          <FlatList
            ref={hourListRef}
            data={hours}
            keyExtractor={(item) => `hour-${item}`}
            renderItem={renderHourItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            initialScrollIndex={getInitialHourIndex()}
            onScroll={handleHourScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: paddingHeight,
              paddingBottom: paddingHeight,
            }}
          />
        </PickerWrapper>

        <Separator>:</Separator>

        <PickerWrapper>
          <FlatList
            ref={minuteListRef}
            data={minutes}
            keyExtractor={(item) => `minute-${item}`}
            renderItem={renderMinuteItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            initialScrollIndex={selectedMinute}
            onScroll={handleMinuteScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: paddingHeight,
              paddingBottom: paddingHeight,
            }}
          />
        </PickerWrapper>
      </PickerContainer>

      <Footer>
        <SelectButton onPress={handleConfirm}>
          <SelectText>선택</SelectText>
        </SelectButton>
      </Footer>
    </ModalContainer>
  );
};
