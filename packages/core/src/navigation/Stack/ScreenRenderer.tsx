import { useMemo, useCallback } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { TopNavBarContext } from '../TopNavBar/context';
import { useScreenAnimation } from './hooks';
import type {
  ScreenConfig,
  StackEntry,
  NavigationProp,
  ScreenComponentProps,
} from './types';

interface ScreenRendererProps {
  entry: StackEntry;
  config: ScreenConfig;
  navigation: NavigationProp;
  animValue: Animated.Value;
  panValue: Animated.Value;
  nextAnimValue: Animated.Value | null;
  nextPanValue: Animated.Value | null;
  isTop: boolean;
  stackLength: number;
  screenWidth: number;
  swipeThreshold: number;
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
}

export const ScreenRenderer = ({
  entry,
  config,
  navigation,
  animValue,
  panValue,
  nextAnimValue,
  nextPanValue,
  isTop,
  stackLength,
  screenWidth,
  swipeThreshold,
  onSwipeComplete,
  onSwipeCancel,
}: ScreenRendererProps) => {
  const Component = config.component;
  const canSwipe = isTop && stackLength > 1 && !config.blockSwipe;

  const { panResponder, animatedStyle, prevScreenStyle, dimStyle, hasPrevScreen } =
    useScreenAnimation({
      animValue,
      panValue,
      nextAnimValue,
      nextPanValue,
      screenWidth,
      swipeThreshold,
      canSwipe,
      onSwipeComplete,
      onSwipeCancel,
    });

  const route = useMemo(
    () => ({ name: entry.name, params: entry.params }),
    [entry.name, entry.params]
  );

  const componentProps: ScreenComponentProps = useMemo(
    () => ({ navigation, route }),
    [navigation, route]
  );

  const currentStyle = useMemo(() => {
    if (isTop) return animatedStyle;
    if (hasPrevScreen) return prevScreenStyle;
    return {};
  }, [isTop, animatedStyle, hasPrevScreen, prevScreenStyle]);

  const renderHeader = useCallback(() => {
    if (!config.header) return null;

    return (
      <TopNavBarContext.Provider value={{ goBack: navigation.goBack }}>
        <SafeAreaContainer edges={['top']}>{config.header}</SafeAreaContainer>
      </TopNavBarContext.Provider>
    );
  }, [config.header, navigation.goBack]);

  return (
    <AnimatedScreenContainer
      style={currentStyle}
      {...(panResponder?.panHandlers || {})}
    >
      {renderHeader()}
      <ScreenContent>
        <Component {...componentProps} />
      </ScreenContent>
      {hasPrevScreen && (
        <AnimatedDimOverlay style={dimStyle} pointerEvents="none" />
      )}
    </AnimatedScreenContainer>
  );
};

const ScreenContainerBase = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.background.surface};
`;

const AnimatedScreenContainer =
  Animated.createAnimatedComponent(ScreenContainerBase);

const ScreenContent = styled.View`
  flex: 1;
`;

const DimOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.static.black};
`;

const AnimatedDimOverlay = Animated.createAnimatedComponent(DimOverlay);

const SafeAreaContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.color.background.surface};
`;