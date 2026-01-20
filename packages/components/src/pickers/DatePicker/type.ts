export interface DatePickerContentProps {
  title: string;
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  onPress: () => void;
}

export interface DatePickerProps extends DatePickerContentProps {
  open: boolean;
  onClose: () => void;
  onExited?: () => void;
  closeOnBackdrop?: boolean;
}