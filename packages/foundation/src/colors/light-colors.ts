import type { Colors } from './types/colors';

export const lightColors: Colors = {
  brand: {
    primary: '#0083F0',
    secondary: 'rgba(0, 131, 240, 0.65)',
  },
  text: {
    primary: '#0F0F10',
    secondary: '#383A3B',
    tertiary: '#5D5F60',
    placeholder: '#747678',
    disabled: '#E6E6E7',
    inverse: '#F5F5F5',
  },
  background: {
    default: '#F5F5F5',
    surface: '#FFFFFF',
  },
  border: {
    normal: '#DCDDDE',
    strong: '#C4C5C6',
    subtle: '#E6E6E7',
    disabled: '#E6E6E7',
  },
  fill: {
    primary: '#F5F5F5',
    secondary: '#DCDDDE',
    hover: '#E0E1E2',
    disabled: 'rgba(245, 245, 245, 0.5)',
  },
  status: {
    success: '#00BF40',
    error: '#FF4242',
    warning: '#FFC800',
    info: '#0083F0',
  },
  overlay: {
    dim: 'rgba(0, 0, 0, 0.2)',
  },
  static: {
    white: '#FFFFFF',
    black: '#121212',
  },
};
