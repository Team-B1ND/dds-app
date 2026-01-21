import styled from 'styled-components/native';
import type { TitleProps } from '../types';

export const Title = ({ children, hasBackButton = false }: TitleProps) => (
  <TitleText $hasBackButton={hasBackButton}>{children}</TitleText>
);

const TitleText = styled.Text<{ $hasBackButton: boolean }>`
  ${({ theme, $hasBackButton }) => {
    const typography = $hasBackButton
      ? theme.typography.headline
      : theme.typography.title3;
    return `
      font-size: ${typography.fontSize}px;
      line-height: ${typography.lineHeight}px;
      letter-spacing: ${typography.letterSpacing}px;
    `;
  }}
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.primary};
`;
