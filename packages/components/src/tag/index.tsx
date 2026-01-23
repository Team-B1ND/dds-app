import styled from 'styled-components/native';
import type { TagProps, TagType } from './type';
import { getTagBackground } from './utils'

export const Tag = ({ title, type = 'primary' }: TagProps) => {
  return (
    <Container $type={type}>
      <TagText>{title}</TagText>
    </Container>
  );
};

const Container = styled.View<{ $type: TagType }>`
  padding: 8px 13px;
  border-radius: ${({ theme }) => theme.radius.full};
  align-self: flex-start;
  background-color: ${({ theme, $type }) => getTagBackground(theme.color, $type)};
`;

const TagText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.body2.letterSpacing}px;
  color: ${({ theme }) => theme.color.static.white};
`;
