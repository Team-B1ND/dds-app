import { View, TouchableWithoutFeedback } from 'react-native';
import { Modal } from '../../common';
import { useDialogAnimation } from '../../dialogs/hooks/useDialogAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import { TimePickerContent } from './TimePickerContent';
import {
  AnimatedDimmer,
  CenterContainer,
  AnimatedContentWrapper,
} from './style';
import type { TimePickerProps } from './type';

export const TimePicker = ({
  open,
  onClose,
  onExited,
  closeOnBackdrop = true,
  title,
  selectedTime,
  onSelect,
  onPress,
}: TimePickerProps) => {
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
    <Modal visible={open} animationType="none">
      <AnimatedDimmer style={dimmerStyle}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <CenterContainer pointerEvents="box-none">
          <AnimatedContentWrapper style={dialogStyle}>
            <TimePickerContent
              title={title}
              selectedTime={selectedTime}
              onSelect={onSelect}
              onPress={handleConfirm}
            />
          </AnimatedContentWrapper>
        </CenterContainer>
      </AnimatedDimmer>
    </Modal>
  );
};