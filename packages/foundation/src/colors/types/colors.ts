export interface Colors {
  /** 서비스 전반에서 사용하는 브랜드 핵심 컬러 */
  brand: {
    primary: string;
    secondary: string;
  };
  /** 의미 기반 텍스트 컬러 정의 */
  text: {
    primary: string; // 기본 본문
    secondary: string; // 보조 설명
    tertiary: string; // 캡션, 낮은 강조
    placeholder: string; // 입력 필드 플레이스홀더
    disabled: string; // 비활성
    inverse: string; // 어두운 배경 위
  };
  /** 레이아웃과 서피스를 위한 배경 컬러 */
  background: {
    default: string; // 앱 또는 페이지 기본 설정
    surface: string; // 카드, 컨테이너 배경
  };
  /** 경계선 및 구분선 컬러 */
  border: {
    normal: string; // 기본 테두리
    strong: string; // 강조된 테두리
    subtle: string; // 약한 구분선
    disabled: string; // 비활성 테두리
  };
  /** UI 요소 내부 채움 컬러 */
  fill: {
    primary: string; // 주요 채움
    secondary: string; // 보조 채움
    hover: string; // 마우스 호버 상태
    disabled: string; // 비활성 채움
  };
  /** 상태 전달을 위한 의미적 컬러 */
  status: {
    success: string; // 성공, 완료
    error: string; // 오류, 위험
    warning: string; // 경고, 주의
    info: string; // 정보 안내
  };
  /** 모달 및 오버레이용 반투명 컬러 */
  overlay: {
    dim: string; // 배경 딤 처리
  };
  /** 테마 변경과 무관한 고정 컬러 */
  static: {
    white: string;
    black: string;
  };
}
