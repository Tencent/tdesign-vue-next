import { computed, h, inject, Ref, unref } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import { defaultGlobalConfig, GlobalConfig } from './context';

export * from './type';

// deal with https://github.com/lodash/lodash/issues/1313
export const merge = (defaultGlobalConfig: GlobalConfig, injectConfig: GlobalConfig) =>
  _mergeWith(defaultGlobalConfig, injectConfig, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });

/**
 * component global config
 * @param componentName
 * @returns {t, global}
 * useConfig('pagination')
 */
export function useConfig<T extends keyof GlobalConfig>(componentName?: T) {
  const globalConfig = inject<Ref<GlobalConfig>>('globalConfig', Object.create(null));

  const mergedGlobalConfig = computed(() => {
    const mergedGlobalConfig = merge(cloneDeep(defaultGlobalConfig), unref(globalConfig));
    return mergedGlobalConfig;
  });

  const global = computed(() => {
    return mergedGlobalConfig.value[componentName];
  });

  const classPrefix = computed(() => {
    return mergedGlobalConfig.value.classPrefix;
  });

  // 处理正则表达式
  const t = function <T>(pattern: T, data?: Record<string, string | number>) {
    if (typeof pattern === 'string') {
      if (!data) return pattern;
      const regular = /\{\s*([\w-]+)\s*\}/g;
      const translated = pattern.replace(regular, (match, key) => {
        if (data) {
          return String(data[key]);
        }
        return '';
      });
      return translated;
    }
    if (typeof pattern === 'function') {
      return pattern(data ?? h);
    }
    return '';
  };

  return {
    t,
    global,
    classPrefix,
  };
}
