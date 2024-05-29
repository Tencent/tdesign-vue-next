import type { ComputedRef, InjectionKey } from '@td/adapter-vue';
import { mergeWith as _mergeWith, isArray, merge } from 'lodash-es';
import type { GlobalConfigProvider } from '@td/components/config-provider/type';
import defaultConfig from '@td/common/js/global-config/default-config';
import defaultZhLocale from '@td/common/js/global-config/locale/zh_CN';

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
