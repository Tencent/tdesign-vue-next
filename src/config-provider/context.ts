import { InjectionKey, ComputedRef } from 'vue';
import { isArray, mergeWith as _mergeWith, merge } from 'lodash-es';
import defaultConfig from '../_common/js/global-config/default-config';
import defaultZhLocale from '../_common/js/global-config/locale/zh_CN';
import { GlobalConfigProvider } from './type';

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultGlobalConfig = merge(defaultConfig, defaultZhLocale);

export type Locale = typeof defaultZhLocale;

export const configProviderInjectKey: InjectionKey<ComputedRef<GlobalConfigProvider>> = Symbol('configProvide');

export const mergeWith = (defaultGlobalConfig: GlobalConfigProvider, injectConfig: GlobalConfigProvider) =>
  _mergeWith(defaultGlobalConfig, injectConfig, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
  });
