import type { ComputedRef, InjectionKey } from '@td/adapter-vue';
import _mergeWith from 'lodash/mergeWith';
import { isArray, merge } from 'lodash-es';
import type { GlobalConfigProvider } from '@td/intel/config-provider/type';
import defaultConfig from '@td/shared/_common/js/global-config/default-config';
import defaultZhLocale from '@td/shared/_common/js/global-config/locale/zh_CN';

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultGlobalConfig = merge(defaultConfig, defaultZhLocale);

export type Locale = typeof defaultZhLocale;

export const configProviderInjectKey: InjectionKey<ComputedRef<GlobalConfigProvider>> = Symbol('configProvide');

export function mergeWith(defaultGlobalConfig: GlobalConfigProvider, injectConfig: GlobalConfigProvider) {
  return _mergeWith(defaultGlobalConfig, injectConfig, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
  });
}
