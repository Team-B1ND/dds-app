import styled, { useTheme } from 'styled-components/native';
import type { BadgeProps } from './types';

export const Badge = ({
  type = 'dot',
  color = 'red',
  count = 1,
}: BadgeProps) => {
  const theme = useTheme();
  const backgroundColor = color === 'red'
    ? theme.color.status.error
    : color;

  if (type === 'dot') {
    return <Dot $backgroundColor={backgroundColor} />;
  }

  const showOverflow = count > 999;
  const displayText = showOverflow ? '999+' : count;
  const isWide = showOverflow || count >= 10;

  if (isWide) {
    return (
      <NumberBadgeWide $backgroundColor={backgroundColor}>
        <BadgeText>{displayText}</BadgeText>
      </NumberBadgeWide>
    );
  }

  return (
    <NumberBadge $backgroundColor={backgroundColor}>
      <BadgeText>{displayText}</BadgeText>
    </NumberBadge>
  );
};

const Dot = styled.View<{ $backgroundColor: string }>`
  width: ${({ theme }) => theme.spacing.sm};
  height: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  align-self: center;
`;

const NumberBadge = styled.View<{ $backgroundColor: string }>`
  min-width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  border-radius: ${({ theme }) => theme.radius.full};
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  align-self: center;
`;

const NumberBadgeWide = styled.View<{ $backgroundColor: string }>`
  height: ${({ theme }) => theme.size.icon.md};
  min-width: ${({ theme }) => theme.size.icon.md};
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.xs}`};
  border-radius: ${({ theme }) => theme.radius.full};
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  align-self: center;
`;

const BadgeText = styled.Text`
  color: ${({ theme }) => theme.color.static.white};
  font-size: ${({ theme }) => theme.typography.label.fontSize}px;
  line-height: ${({ theme }) => theme.typography.label.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.label.letterSpacing}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  text-align-vertical: center;
  include-font-padding: false;
`;
