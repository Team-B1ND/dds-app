export interface TimePickerContentProps {
  title: string;
  selectedTime?: { hour: number; minute: number };
  onSelect: (time: { hour: number; minute: number }) => void;
  onPress: () => void;
}

export interface TimePickerProps extends TimePickerContentProps {
  open: boolean;
  onClose: () => void;
  onExited?: () => void;
  closeOnBackdrop?: boolean;
}