import defaultConfig from './zh_CN_config';

// TODO 替换 zh_CN_config 配置拆分，local内未走查，走查后更换，暂时使用现有配置
// import defaultLocale from '../_common/js/locale/zh_CN';
// export type Locale = typeof defaultLocale;

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultClassPrefix = 't';

export const defaultAnimation: {
  include: string[];
  exclude: string[];
} = {
  include: [EAnimationType.ripple, EAnimationType.expand, EAnimationType.fade],
  exclude: [],
};

export const defaultGlobalConfig = {
  animation: defaultAnimation,
  classPrefix: defaultClassPrefix,
  ...defaultConfig,
};

export type GlobalConfig = typeof defaultGlobalConfig;

export interface Config {
  globalConfig?: GlobalConfig;
}
