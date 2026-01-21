import styled from 'styled-components/native';
import { BackButton, Title, Logo, IconButton } from './components';
import type { TopNavBarProps } from './types';

const TopNavBarComponent = ({ left, right, children }: TopNavBarProps) => (
  <Container>
    {left && <LeftContainer>{left}</LeftContainer>}
    <MainContainer $hasLeft={!!left}>{children}</MainContainer>
    <RightContainer>{right}</RightContainer>
  </Container>
);

export const TopNavBar = Object.assign(TopNavBarComponent, {
  BackButton,
  Title,
  Logo,
  IconButton,
});

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.color.background.surface};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainContainer = styled.View<{ $hasLeft: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: ${({ $hasLeft }) => ($hasLeft ? '8px' : '0px')};
`;

const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;
