import { computed, h, inject } from 'vue';
import _mergeWith from 'lodash/mergeWith';
import { defaultGlobalConfig, configProviderInjectKey } from './context';
import { GlobalConfigProvider } from './type';

export * from './type';

/**
 * component globalConfig
 * @param componentName
 * @returns {t, globalConfig}
 * useConfig('pagination')
 */
export function useConfig<T extends keyof GlobalConfigProvider>(componentName?: T) {
  const injectGlobalConfig = inject(configProviderInjectKey, null);
  const mergedGlobalConfig = computed(() => injectGlobalConfig?.value || defaultGlobalConfig);
  const globalConfig = computed(() => mergedGlobalConfig.value[componentName]);

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
    global: globalConfig,
    globalConfig,
    classPrefix,
  };
}
