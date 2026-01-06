import { InjectionKey, ComputedRef } from 'vue';
import { mergeWith as _mergeWith, merge, isArray } from 'lodash-es';
import { defaultConfig } from '@tdesign/utils/global-config';
import { zhCN as defaultZhLocale } from '@tdesign/utils/global-config/locale';
import { GlobalConfigProvider } from '../type';

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
