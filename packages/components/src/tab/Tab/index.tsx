import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { Animated, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { TabContext } from './TabContext';
import { TabItem } from './TabItem';
import { useControlledValue, useIndicatorAnimation } from './hooks';

export interface TabProps {
  value?: string;
  defaultValue?: string;
  fluid?: boolean;
  onChange?: (value: string) => void;
  children: ReactNode;
}

interface ItemLayout {
  width: number;
  x: number;
}

const TabComponent = ({
  value: controlledValue,
  defaultValue,
  fluid = false,
  onChange,
  children,
}: TabProps) => {
  const [itemLayouts, setItemLayouts] = useState<Map<string, ItemLayout>>(
    new Map()
  );

  const { value, onChange: handleChange } = useControlledValue({
    controlledValue,
    defaultValue,
    onChange,
  });

  const { position, width, scrollHandler } = useIndicatorAnimation(
    value,
    itemLayouts,
    fluid
  );

  const registerLayout = useCallback(
    (itemValue: string, layout: ItemLayout) => {
      setItemLayouts((prev) => new Map(prev).set(itemValue, layout));
    },
    []
  );

  const contextValue = useMemo(
    () => ({ value, fluid, onChange: handleChange, registerLayout }),
    [value, fluid, handleChange, registerLayout]
  );

  return (
    <TabContext.Provider value={contextValue}>
      <Container $fluid={fluid}>
        {fluid ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
          >
            <ItemsContainer>{children}</ItemsContainer>
          </ScrollView>
        ) : (
          <ItemsContainer $full>{children}</ItemsContainer>
        )}
        <IndicatorTrack>
          <AnimatedIndicator style={{ left: position, width }} />
        </IndicatorTrack>
      </Container>
    </TabContext.Provider>
  );
};

export const Tab = Object.assign(TabComponent, { Item: TabItem });

const Container = styled.View<{ $fluid: boolean }>`
  position: relative;
  width: 100%;
  ${({ $fluid }) => !$fluid && 'align-self: stretch;'}
`;

const ItemsContainer = styled.View<{ $full?: boolean }>`
  flex-direction: row;
  align-items: stretch;
  ${({ $full }) => $full && 'width: 100%;'}
`;

const IndicatorTrack = styled.View`
  height: 3px;
  background-color: ${({ theme }) => theme.color.border.subtle};
`;

const Indicator = styled.View`
  position: absolute;
  height: 3px;
  background-color: ${({ theme }) => theme.color.text.primary};
  border-radius: 1.5px;
`;

const AnimatedIndicator = Animated.createAnimatedComponent(Indicator);
