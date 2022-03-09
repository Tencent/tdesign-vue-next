import { computed, inject } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import { defaultGlobalConfig, GlobalConfig } from './context';

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
export function useConfig<T extends keyof GlobalConfig>(componentName: T) {
  const mergedGlobalConfig = computed(() => {
    const globalConfig = inject<GlobalConfig>('globalConfig', Object.create(null));
    const mergedGlobalConfig = merge(cloneDeep(defaultGlobalConfig), globalConfig);
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
      return pattern(data);
    }
    return '';
  };

  return {
    t,
    global,
    classPrefix,
  };
}

export function usePrefixClass(componentName: string) {
  const { classPrefix } = useConfig('classPrefix');
  const COMPONENT_NAME = computed(() => {
    return `${classPrefix.value}-${componentName}`;
  });
  return COMPONENT_NAME;
}
