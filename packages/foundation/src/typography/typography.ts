import type { Typography, FontWeight } from './types/typography';

const fontWeight: FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const typography: Typography = {
  fontFamily: {
    default: 'System',
    mono: 'monospace',
  },
  fontWeight,
  // Title styles
  title1: {
    fontSize: 36,
    lineHeight: 47, // 130%
    letterSpacing: -1.08, // -3%
  },
  title2: {
    fontSize: 28,
    lineHeight: 36, // 130%
    letterSpacing: -0.84, // -3%
  },
  title3: {
    fontSize: 24,
    lineHeight: 31, // 130%
    letterSpacing: -0.72, // -3%
  },
  // Heading styles
  heading1: {
    fontSize: 22,
    lineHeight: 29, // 130%
    letterSpacing: -0.44, // -2%
  },
  heading2: {
    fontSize: 20,
    lineHeight: 28, // 140%
    letterSpacing: -0.2, // -1%
  },
  // Headline style
  headline: {
    fontSize: 18,
    lineHeight: 27, // 150%
    letterSpacing: 0, // 0%
  },
  // Body styles
  body1: {
    fontSize: 16,
    lineHeight: 24, // 150%
    letterSpacing: 0.16, // 1%
  },
  body2: {
    fontSize: 15,
    lineHeight: 21, // 140%
    letterSpacing: 0.15, // 1%
  },
  // Label style
  label: {
    fontSize: 14,
    lineHeight: 20, // 140%
    letterSpacing: 0.28, // 2%
  },
  // Caption styles
  caption1: {
    fontSize: 13,
    lineHeight: 17, // 130%
    letterSpacing: 0.39, // 3%
  },
  caption2: {
    fontSize: 12,
    lineHeight: 16, // 130%
    letterSpacing: 0.36, // 3%
  },
};
