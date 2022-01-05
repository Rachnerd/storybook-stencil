import { JSX as StencilJSX } from '../dist/types/components';

declare global {
  namespace JSX {
    interface IntrinsicElements extends StencilJSX.IntrinsicElements {}
  }
}
