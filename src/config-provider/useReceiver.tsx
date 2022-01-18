import { computed, inject, Ref } from 'vue';
import defaultConfig from './zh_CN_config';

export * from './type';

/**
 *
 * @param componentName
 * @returns {t, global}
 */
export function useReceiver<T>(componentName: string): {
  t: <T>(pattern: T, placement?: Record<string, string | number>) => any;
  global: Ref<T>;
} {
  const global = computed(() => {
    const globalConfig = inject('globalConfig', {});
    const defaultConfigData = defaultConfig[componentName];
    if (globalConfig && globalConfig[componentName]) {
      return {
        ...defaultConfigData,
        ...globalConfig[componentName],
      };
    }
    return defaultConfigData;
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
  };
}
