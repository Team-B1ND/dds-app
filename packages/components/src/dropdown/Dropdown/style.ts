import { Animated } from 'react-native';

export const AnimatedDropdown = styled(Animated.View)<{
  $left: number;
  $top: number;
  $width: number | string;
  $maxHeight: number;
}>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  z-index: 1001;
`;
import styled from 'styled-components/native';

export const Wrapper = styled.View<{ $isOpen: boolean }>`
  position: relative;
  z-index: ${({ $isOpen }) => ($isOpen ? 1000 : 'auto')};
`;

export const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalRoot = styled.View`
  flex: 1;
  position: relative;
`;

export const Container = styled.TouchableOpacity<{ $width?: number | string }>`
  ${({ $width }) => $width && `width: ${$width};`}
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.color.fill.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $width }) => ($width ? 'space-between' : 'center')};
  gap: ${({ $width }) => ($width ? '0px' : '12px')};
`;

export const SelectedText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.lg.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lg.lineHeight};
  font-weight: ${({ theme }) => theme.typography.body.lg.fontWeight};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const OptionsContainer = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.color.fill.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  max-height: 200px;
  overflow: hidden;
  padding: 4px;
  z-index: 100;
`;

export const Option = styled.TouchableOpacity<{ $selected: boolean }>`
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.fill.secondary : 'transparent'};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 4px 8px;
`;

export const OptionText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.lg.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lg.lineHeight};
  font-weight: ${({ theme }) => theme.typography.body.lg.fontWeight};
  color: ${({ theme }) => theme.color.text.secondary};
`;
