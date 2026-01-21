export interface Size {
  /** 아이콘 사이즈 */
  icon: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** 컴포넌트 높이 */
  component: {
    xs: string; // 작은 칩
    sm: string; // 작은 버튼
    md: string; // 기본 버튼
    lg: string; // 큰 버튼
    xl: string; // 히어로 버튼
  };
  /** 스위치 사이즈 */
  switch: {
    trackWidth: string;
    trackHeight: string;
    thumb: string;
  };
  /** 터치 영역 최소 사이즈 */
  touchable: {
    min: string; // 애플 HIG 기준
  };
  /** 다이얼로그 사이즈 */
  dialog: {
    width: string;
    minHeight: string;
  };
}