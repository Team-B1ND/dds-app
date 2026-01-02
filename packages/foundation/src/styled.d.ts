import 'styled-components/native';
import type { Themes } from '@dds-app/foundation/provider/types/themes';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Themes {}
}
