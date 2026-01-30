import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import type { NavigationProp, ScreenConfig, StackEntry } from '../types';

interface UseAndroidBackHandlerParams {
  navigation: NavigationProp;
  stack: StackEntry[];
  screens: Map<string, ScreenConfig>;
}

export const useAndroidBackHandler = ({
  navigation,
  stack,
  screens,
}: UseAndroidBackHandlerParams) => {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (!navigation.canGoBack()) {
        return false;
      }

      const currentScreenName = stack[stack.length - 1]?.name;
      const currentScreenConfig = currentScreenName
        ? screens.get(currentScreenName)
        : null;

      if (currentScreenConfig?.blockSwipe) {
        return true;
      }

      navigation.goBack();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => subscription.remove();
  }, [navigation, stack, screens]);
};