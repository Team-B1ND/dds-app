export interface DatePickerProps {
  title: string;
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  onConfirm: () => void;
}