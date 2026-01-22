import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export type Period = '오전' | '오후';

export const ITEM_HEIGHT = 40;
export const VISIBLE_ITEMS = 5;

export const to12Hour = (hour24: number): { hour12: number; period: Period } => {
  if (hour24 === 0) return { hour12: 12, period: '오전' };
  if (hour24 === 12) return { hour12: 12, period: '오후' };
  if (hour24 < 12) return { hour12: hour24, period: '오전' };
  return { hour12: hour24 - 12, period: '오후' };
};

export const to24Hour = (hour12: number, period: Period): number => {
  if (period === '오전') {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
};

export const createPeriods = (): Period[] => ['오전', '오후'];
export const createHours = (): number[] => Array.from({ length: 12 }, (_, i) => i + 1);
export const createMinutes = (): number[] => Array.from({ length: 60 }, (_, i) => i);

export const createScrollHandler =
  <T,>(items: T[], onChange: (item: T) => void) =>
  (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    const item = items[clampedIndex];
    if (item !== undefined) onChange(item);
  };

export const getPickerItemLayout = (_: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export const getPickerPadding = () => (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;
