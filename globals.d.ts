// eslint-disable-next-line no-unused-vars
declare const PKG_VERSION: string;

declare module '*.vue' {
  import type { DefineComponent, Plugin } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any> & Plugin;
  export default component;
}

declare const TD_SITE_METADATA: {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};
