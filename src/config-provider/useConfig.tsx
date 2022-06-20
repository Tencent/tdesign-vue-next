import { computed, h, inject, Ref, unref } from 'vue';
import _mergeWith from 'lodash/mergeWith';
import { GlobalConfig, defaultGlobalConfig, configProviderInjectKey } from './context';

export * from './type';

/**
 * component global config
 * @param componentName
 * @returns {t, global}
 * useConfig('pagination')
 */
export function useConfig<T extends keyof GlobalConfig>(componentName?: T) {
  const injectGlobalConfig = inject(configProviderInjectKey, null);
  const mergedGlobalConfig = computed(() => injectGlobalConfig?.value || defaultGlobalConfig);
  const global = computed(() => mergedGlobalConfig.value[componentName]);

  const classPrefix = computed(() => {
    return mergedGlobalConfig.value.classPrefix;
  });

  // 处理正则表达式
  const t = function <T>(pattern: T, ...args: any[]) {
    const [data] = args;
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
      // 重要：组件的渲染必须存在参数 h，不能移除
      if (!args.length) return pattern(h);
      return pattern(...args);
    }
    return '';
  };

  return {
    t,
    global,
    classPrefix,
  };
}
