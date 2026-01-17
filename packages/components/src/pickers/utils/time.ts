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
