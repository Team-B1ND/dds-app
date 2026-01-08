export interface Opacity {
  full: number; // 완전 불투명
  high: number; // 높은 불투명도 - 호버 상태
  medium: number; // 중간 불투명도 - 비활성 상태
  low: number; // 낮은 불투명도 - 오버레이
  subtle: number; // 아주 낮은 불투명도 - 배경 힌트
  transparent: number; // 완전 투명
}