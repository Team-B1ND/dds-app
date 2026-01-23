import { useCallback } from 'react';
import { Animated, Pressable, type LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import { useTabContext } from './TabContext';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import { usePressAnimation } from '../../hooks/animations';

interface TabItemProps {
  value: string;
  children: string;
}

export const TabItem = ({ value, children }: TabItemProps) => {
  const {
    value: selectedValue,
    fluid,
    onChange,
    registerLayout,
  } = useTabContext();
  const { triggerHaptic } = useTriggerHaptic();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation({
    scale: 0.95,
  });

  const isSelected = selectedValue === value;

  const handlePress = () => {
    if (!isSelected) {
      triggerHaptic();
      onChange(value);
    }
  };

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, x } = e.nativeEvent.layout;
      registerLayout(value, { width, x });
    },
    [value, registerLayout]
  );

  return (
    <Container $fluid={fluid} onLayout={handleLayout}>
      <StyledPressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <AnimatedTextWrapper style={animatedStyle}>
          <ItemText $selected={isSelected}>{children}</ItemText>
        </AnimatedTextWrapper>
      </StyledPressable>
    </Container>
  );
};

const Container = styled.View<{ $fluid: boolean }>`
  ${({ $fluid }) => !$fluid && 'flex: 1;'}
  align-items: center;
`;

const StyledPressable = styled(Pressable)`
  padding: 12px;
`;

const TextWrapper = styled.View``;

const AnimatedTextWrapper = Animated.createAnimatedComponent(TextWrapper);

const ItemText = styled.Text<{ $selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.headline.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight}px;
  color: ${({ theme, $selected }) =>
    $selected ? theme.color.text.primary : theme.color.text.tertiary};
`;
