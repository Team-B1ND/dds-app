import styled, { useTheme } from 'styled-components/native';
import { Person } from '@dds-app/icons';

interface AvatarProps {
  size?: number;
}

export const Avatar = ({ size = 40 }: AvatarProps) => {
  const theme = useTheme();
  const iconSize = size * 0.6;

  return (
    <Container $size={size}>
      <Person size={iconSize} color={theme.color.fill.secondary} />
    </Container>
  );
};

const Container = styled.View<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $size }) => $size / 2}px;
  background-color: ${({ theme }) => theme.color.fill.primary};
  align-items: center;
  justify-content: center;
`;
