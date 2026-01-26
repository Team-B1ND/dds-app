export interface SegmentedButtonOption {
  label: string;
}

export interface SegmentedButtonProps {
  options: SegmentedButtonOption[];
  label?: string;
  disabled?: boolean;
  onChange?: (label: string) => void;
}