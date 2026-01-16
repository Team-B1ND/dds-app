export interface ProgressProps {
  progress: number;
  disabled?: boolean;
}

export interface CircularProgressProps extends ProgressProps {
  size?: number;
  strokeWidth?: number;
}
