import { View, TouchableWithoutFeedback } from 'react-native';
import { Modal } from '../../common';
import { useDialogAnimation } from '../../dialogs/hooks/useDialogAnimation';
import { DatePickerContent } from './DatePickerContent';
import {
  AnimatedDimmer,
  CenterContainer,
  AnimatedContentWrapper,
} from './style';
import type { DatePickerProps } from './type';

export const DatePicker = ({
  open,
  onClose,
  onExited,
  closeOnBackdrop = true,
  title,
  selectedDate,
  disablePastDates = false,
  showTodayIndicator = true,
  onSelect,
  onPress,
}: DatePickerProps) => {
  const { dimmerStyle, dialogStyle, visible, wiggle } = useDialogAnimation(
    open,
    onExited
  );

  const handleConfirm = () => {
    onPress();
    onClose();
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    } else {
      wiggle();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={open} animationType="none">
      <AnimatedDimmer style={dimmerStyle}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <CenterContainer pointerEvents="box-none">
          <AnimatedContentWrapper style={dialogStyle}>
            <DatePickerContent
              title={title}
              selectedDate={selectedDate}
              disablePastDates={disablePastDates}
              showTodayIndicator={showTodayIndicator}
              onSelect={onSelect}
              onPress={handleConfirm}
            />
          </AnimatedContentWrapper>
        </CenterContainer>
      </AnimatedDimmer>
    </Modal>
  );
};

