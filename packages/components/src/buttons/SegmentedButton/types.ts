export interface SegmentedButtonOption<T = string> {
  label: string;
  value: T;
}

export interface SegmentedButtonProps<T = string> {
  options: SegmentedButtonOption<T>[];
  value?: T;
  defaultValue?: T;
  disabled?: boolean;
  haptic?: boolean;
  onChange?: (value: T) => void;
}