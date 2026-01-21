import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';
import { ITEM_HEIGHT, VISIBLE_ITEMS } from '../utils';

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.surface};
  padding: 24px 20px 20px 20px;
  border-radius: ${({ theme }) => theme.radius.xxxl};
`;

export const Dimmer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.overlay.dim};
`;

export const AnimatedDimmer = Animated.createAnimatedComponent(Dimmer);

export const CenterContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ContentWrapper = styled.View``;

export const AnimatedContentWrapper =
  Animated.createAnimatedComponent(ContentWrapper);


export const Header = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.typography.heading2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.heading2.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.heading2.letterSpacing}px;
`;


export const PickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${ITEM_HEIGHT * VISIBLE_ITEMS}px;
  position: relative;
`;

export const PickerWrapper = styled.View`
  width: 60px;
  height: ${ITEM_HEIGHT * VISIBLE_ITEMS}px;
  overflow: hidden;
  background-color: transparent;
`;

export const PickerItem = styled.View`
  height: ${ITEM_HEIGHT}px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const PickerItemText = styled.Text<{ $selected?: boolean }>`
  font-size: ${({ $selected }) => ($selected ? 22 : 18)}px;
  font-weight: ${({ theme, $selected }) =>
    $selected
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ theme, $selected }) =>
    $selected ? theme.color.text.primary : theme.color.text.placeholder};
`;

export const Separator = styled.Text`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const SelectionIndicator = styled.View`
  position: absolute;
  top: ${(ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2}px;
  left: 20px;
  right: 20px;
  height: ${ITEM_HEIGHT}px;
  background-color: ${({ theme }) => theme.color.background.default};
  border-radius: ${({ theme }) => theme.radius.lg};
`;


export const Footer = styled.View`
  margin-top: 12px;
  align-items: flex-end;
`;

export const SelectButton = styled(Pressable)`
  padding: 8px 0;
`;

export const SelectText = styled.Text`
  color: ${({ theme }) => theme.color.main.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.body1.letterSpacing}px;
`;
