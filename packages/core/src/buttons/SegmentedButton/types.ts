export interface SegmentedButtonOption {
  label: string;
}

export interface SegmentedButtonProps {
  options: SegmentedButtonOption[];
  label?: string;
  disabled?: boolean;
  haptic?: boolean;
  onChange?: (label: string) => void;
}