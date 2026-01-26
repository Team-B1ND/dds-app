export interface ContinuousSliderProps {
  value: number;
  max: number;
  onChange: (v: number) => void;
  width?: number;
}

export interface StepSliderProps {
  steps: number;
  value: number;
  onChange: (step: number) => void;
  width?: number;
}
