export interface Colors {
  /** 메인 컬러 */
  main: {
    primary: string;
    secondary: string;
  };
  /** 텍스트 컬러 */
  text: {
    primary: string; // 기본 본문
    secondary: string; // 보조 설명
    tertiary: string; // 캡션, 낮은 강조
    placeholder: string; // 입력 필드 플레이스홀더
    disabled: string; // 비활성
    inverse: string; // 어두운 배경 위
  };
  /** 배경 컬러 */
  background: {
    default: string; // 앱 또는 페이지 기본 설정
    surface: string; // 카드, 컨테이너
  };
  /** 경계선 컬러 */
  border: {
    normal: string; // 기본
    strong: string; // 강조
    subtle: string; // 약한 구분
    disabled: string; // 비활성
  };
  /** UI 내부 컬러 */
  fill: {
    primary: string; // 주요
    secondary: string; // 보조
    hover: string; // 마우스 호버
    disabled: string; // 비활성
  };
  /** 상태 전달 컬러 */
  status: {
    success: string; // 성공, 완료
    error: string; // 오류, 위험
    warning: string; // 경고, 주의
    info: string; // 정보 안내
  };
  /** 모달 및 오버레이 컬러 */
  overlay: {
    dim: string; // 배경 딤
  };
  /** 고정 컬러 */
  static: {
    white: string;
    black: string;
  };
}
