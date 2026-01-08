import type { Typography, FontWeight } from './types/typography';

const fontWeight: FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const typography: Typography = {
  fontFamily: {
    default: 'System',
    mono: 'monospace',
  },
  fontWeight,
  title: {
    xl: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: fontWeight.bold,
    },
    lg: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: fontWeight.bold,
    },
    md: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: fontWeight.semibold,
    },
    sm: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: fontWeight.semibold,
    },
  },
  body: {
    lg: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: fontWeight.regular,
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: fontWeight.regular,
    },
    sm: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeight.regular,
    },
  },
  label: {
    lg: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeight.medium,
    },
    md: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: fontWeight.medium,
    },
    sm: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: fontWeight.medium,
    },
  },
};