import { HTMLAttributes } from 'vue';
import type { Router } from 'vue-router';
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [emit: string]: any;
    }
  }
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
    $router: Router;
  }
}
