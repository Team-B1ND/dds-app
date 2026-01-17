import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';

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
  gap: 2px;
  margin-bottom: 24px;
`;

export const MonthRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ArrowButton = styled(Pressable)`
  padding: 4px;
`;

export const AnimatedArrowButton = Animated.createAnimatedComponent(ArrowButton);

export const Arrow = styled.Text`
  font-size: 30px;
  color: ${({ theme }) => theme.color.main.primary};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.typography.title.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const MonthText = styled.Text`
  color: ${({ theme }) => theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const DayText = styled.Text`
  color: ${({ theme }) => theme.color.text.placeholder};
  font-size: ${({ theme }) => theme.typography.label.lg.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-align: center;
`;

export const DateText = styled.Text<{ $disabled?: boolean }>`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.text.disabled : theme.color.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`;

export const SelectedText = styled.Text`
  color: ${({ theme }) => theme.color.static.white};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SelectText = styled.Text`
  color: ${({ theme }) => theme.color.main.primary};
  font-size: ${({ theme }) => theme.typography.body.md.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const DayRow = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const DayCell = styled.View`
  flex: 1;
  align-items: center;
`;

const Calendar = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const AnimatedCalendar = Animated.createAnimatedComponent(Calendar);

export const DateCell = styled.View`
  width: 14.28%;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const DateButton = styled(Pressable)`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

export const SelectedDate = styled.View`
  background-color: ${({ theme }) => theme.color.main.primary};
  width: 36px;
  height: 36px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.View`
  margin-top: 12px;
  align-items: flex-end;
`;

export const SelectButton = styled(Pressable)`
  padding: 8px 0;
`;
