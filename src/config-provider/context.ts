import merge from 'lodash/merge';
import defaultConfig from '../_common/js/global-config/default-config';
import defaultZhLocale from '../_common/js/global-config/locale/zh_CN';

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultGlobalConfig = merge(defaultConfig, defaultZhLocale);

export type Locale = typeof defaultZhLocale;
export type GlobalConfig = typeof defaultGlobalConfig;
