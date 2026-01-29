import { Navigator } from './Navigator';
import { Screen } from './Screen';

export const Stack = {
  Navigator,
  Screen,
};

export { useNavigation, useRoute } from './StackContext';

export type {
  NavigationProp,
  RouteProp,
  ScreenComponentProps,
  ScreenProps,
  StackNavigatorProps,
} from './types';
