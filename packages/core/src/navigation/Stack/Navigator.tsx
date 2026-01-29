import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { StackContext } from './StackContext';
import { ScreenRenderer } from './ScreenRenderer';
import { useStackNavigation, useScreenConfig } from './hooks';
import type { StackNavigatorProps } from './types';

export const Navigator = ({
  children,
  initialRouteName,
}: StackNavigatorProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const screens = useScreenConfig(children);
  const initialRoute = initialRouteName || Array.from(screens.keys())[0] || '';

  const { stack, navigation, getScreenAnimValues, swipeComplete, swipeCancel } =
    useStackNavigation({ screens, initialRoute, screenWidth });

  const contextValue = useMemo(
    () => ({
      navigation,
      screens,
      currentParams: stack[stack.length - 1]?.params,
    }),
    [navigation, screens, stack]
  );

  return (
    <StackContext.Provider value={contextValue}>
      <Container>
        {stack.map((entry, index) => {
          const config = screens.get(entry.name);
          const animValues = getScreenAnimValues(index);
          if (!config || !animValues) return null;

          return (
            <ScreenRenderer
              key={entry.key}
              entry={entry}
              config={config}
              navigation={navigation}
              isTop={index === stack.length - 1}
              stackLength={stack.length}
              screenWidth={screenWidth}
              swipeThreshold={screenWidth * 0.3}
              onSwipeComplete={() => swipeComplete(entry.key)}
              onSwipeCancel={() => swipeCancel(entry.key)}
              {...animValues}
            />
          );
        })}
      </Container>
    </StackContext.Provider>
  );
};

const Container = styled.View`
  flex: 1;
  overflow: hidden;
`;
