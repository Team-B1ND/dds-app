import { useRef, useCallback } from 'react';
import styled from 'styled-components/native';
import { Pressable, useWindowDimensions, FlatList } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTimePicker } from './hooks/useTimePicker';
import type { Period } from './hooks/useTimePicker';
import { Modal } from '../Modal';
import type { TimePickerProps } from './type';

export interface TimePickerModalProps extends TimePickerProps {
  visible: boolean;
  onClose: () => void;
}

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

const TimePickerContent = ({
  title,
  selectedTime: initialTime,
  onSelect,
  onPress,
}: TimePickerProps) => {
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
    (_: any, index: number) => ({
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

const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.surface};
  padding: 24px 20px 20px 20px;
  border-radius: ${({ theme }) => theme.radius.xxxl};
`;

const Header = styled.View`
  margin-bottom: 24px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.typography.title.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const PickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${ITEM_HEIGHT * VISIBLE_ITEMS}px;
  position: relative;
`;

const PickerWrapper = styled.View`
  width: 60px;
  height: ${ITEM_HEIGHT * VISIBLE_ITEMS}px;
  overflow: hidden;
  background-color: transparent;
`;

const PickerItem = styled.View`
  height: ${ITEM_HEIGHT}px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const PickerItemText = styled.Text<{ $selected?: boolean }>`
  font-size: ${({ $selected }) => ($selected ? 22 : 18)}px;
  font-weight: ${({ theme, $selected }) =>
    $selected
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ theme, $selected }) =>
    $selected ? theme.color.text.primary : theme.color.text.placeholder};
`;

const Separator = styled.Text`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.primary};
`;

const SelectionIndicator = styled.View`
  position: absolute;
  top: ${(ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2}px;
  left: 20px;
  right: 20px;
  height: ${ITEM_HEIGHT}px;
  background-color: ${({ theme }) => theme.color.background.default};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Footer = styled.View`
  margin-top: 12px;
  align-items: flex-end;
`;

const SelectButton = styled(Pressable)`
  padding: 8px 0;
`;

const SelectText = styled.Text`
  color: ${({ theme }) => theme.color.main.primary};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

// Modal + TimePicker
export const TimePicker = ({
  visible,
  onClose,
  title,
  selectedTime,
  onSelect,
  onPress,
}: TimePickerModalProps) => {
  const handleConfirm = () => {
    onPress();
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <TimePickerContent
        title={title}
        selectedTime={selectedTime}
        onSelect={onSelect}
        onPress={handleConfirm}
      />
    </Modal>
  );
};