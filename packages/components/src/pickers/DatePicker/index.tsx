import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { useDialogAnimation } from '../../dialogs/hooks/useDialogAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
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
  onSelect,
  onPress,
}: DatePickerProps) => {
  const { dimmerStyle, dialogStyle, visible, wiggle } = useDialogAnimation(
    open,
    onExited
  );
  const { triggerHaptic } = useTriggerHaptic();

  const handleConfirm = () => {
    onPress();
    onClose();
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    } else {
      wiggle();
      triggerHaptic();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={open} animationType="none">
      <AnimatedDimmer style={dimmerStyle}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <CenterContainer pointerEvents="box-none">
          <AnimatedContentWrapper style={dialogStyle}>
            <DatePickerContent
              title={title}
              selectedDate={selectedDate}
              onSelect={onSelect}
              onPress={handleConfirm}
            />
          </AnimatedContentWrapper>
        </CenterContainer>
      </AnimatedDimmer>
    </Modal>
  );
};

