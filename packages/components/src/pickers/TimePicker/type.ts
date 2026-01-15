export interface TimePickerProps {
  title: string;
  selectedTime?: { hour: number; minute: number };
  onSelect: (time: { hour: number; minute: number }) => void;
  onPress: () => void;
}