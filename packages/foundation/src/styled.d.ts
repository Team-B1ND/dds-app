import 'styled-components/native';
import type { Themes } from './provider';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Themes {}
}
