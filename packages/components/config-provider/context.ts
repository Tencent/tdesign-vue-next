import { InjectionKey, ComputedRef } from 'vue';
import { mergeWith as _mergeWith } from 'lodash-es';
import { merge } from 'lodash-es';
import defaultConfig from '@tdesign/common/js/global-config/default-config';
import defaultZhLocale from '@tdesign/common/js/global-config/locale/zh_CN';
import { GlobalConfigProvider } from './type';
import { isArray } from 'lodash-es';

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
