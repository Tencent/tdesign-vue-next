/* eslint-disable */
import { HTMLAttributes } from 'vue';

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [emit: string]: any;
    }
  }

  const __IS_DEV__: boolean;
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    [attr: string]: any;
  }

  interface CSSProperties {
    [attr: string]: any;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // todo
    [x: string]: any;
  }
}
