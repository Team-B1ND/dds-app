export const SWITCH_SIZE = {
  trackWidth: 52,
  trackHeight: 30,
  thumb: 22,
  padding: 4,
} as const;

export const TRANSLATE_X =
  SWITCH_SIZE.trackWidth - SWITCH_SIZE.thumb - SWITCH_SIZE.padding * 2;
