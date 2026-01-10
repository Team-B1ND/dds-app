export interface FontWeight {
  regular: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
}

export interface TextStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight[keyof FontWeight];
  letterSpacing?: number;
}

export interface Typography {
  /** 폰트 패밀리 */
  fontFamily: {
    default: string;
    mono: string;
  };
  /** 폰트 웨이트 */
  fontWeight: FontWeight;
  /** 타이틀 스타일 */
  title: {
    xl: TextStyle; // 메인 타이틀
    lg: TextStyle; // 섹션 타이틀
    md: TextStyle; // 페이지 타이틀
    sm: TextStyle; // 카드 타이틀
  };
  /** 본문 스타일 */
  body: {
    lg: TextStyle; // 큰 본문
    md: TextStyle; // 기본 본문
    sm: TextStyle; // 작은 본문
  };
  /** 레이블/캡션 스타일 */
  label: {
    lg: TextStyle; // 큰 레이블
    md: TextStyle; // 기본 레이블
    sm: TextStyle; // 작은 레이블
  };
}