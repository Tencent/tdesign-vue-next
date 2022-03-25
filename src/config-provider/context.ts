import merge from 'lodash/merge';
import defaultConfig from '../_common/js/global-config/default-config';
import defaultZhLocale from '../_common/js/global-config/locale/zh_CN';
import defaultEnLocale from '../_common/js/global-config/locale/en_US';

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultGlobalConfig = merge(defaultConfig, defaultZhLocale);

export const locale = {
  zh_CN: defaultZhLocale,
  en_US: defaultEnLocale,
};
