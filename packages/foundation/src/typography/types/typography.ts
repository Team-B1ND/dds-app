export interface FontWeight {
  regular: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
  extrabold: '800';
}

export interface TextStyle {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface Typography {
  /** 폰트 패밀리 */
  fontFamily: {
    default: string;
    mono: string;
  };
  /** 폰트 웨이트 */
  fontWeight: FontWeight;
  /** Title 스타일 */
  title1: TextStyle;
  title2: TextStyle;
  title3: TextStyle;
  /** Heading 스타일 */
  heading1: TextStyle;
  heading2: TextStyle;
  /** Headline 스타일 */
  headline: TextStyle;
  /** Body 스타일 */
  body1: TextStyle;
  body2: TextStyle;
  /** Label 스타일 */
  label: TextStyle;
  /** Caption 스타일 */
  caption1: TextStyle;
  caption2: TextStyle;
}
