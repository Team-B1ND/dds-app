import 'styled-components';
import type { Themes } from '@dds-app/foundation/provider/types/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Themes {}
}
