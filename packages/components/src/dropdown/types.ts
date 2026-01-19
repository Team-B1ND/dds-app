export interface DropdownProps {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  width?: number | string;
}

export interface DropdownOption {
  label: string;
  value: string;
}
