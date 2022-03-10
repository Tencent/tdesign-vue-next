import { computed, inject, reactive } from 'vue';
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

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig('classPrefix');
  return computed(() => {
    return componentName ? `${classPrefix.value}-${componentName}` : classPrefix.value;
  });
}

export function useCommonClassName() {
  const { classPrefix } = useConfig('classPrefix');

  return {
    SIZE: computed(() => ({
      small: `${classPrefix.value}-size-s`,
      medium: `${classPrefix.value}-size-m`,
      large: `${classPrefix.value}-size-l`,
      default: '',
      xs: `${classPrefix.value}-size-xs`,
      xl: `${classPrefix.value}-size-xl`,
      block: `${classPrefix.value}-size-full-width`,
    })),
    STATUS: computed(() => ({
      loading: `${classPrefix.value}-is-loading`,
      loadMore: `${classPrefix.value}-is-load-more`,
      disabled: `${classPrefix.value}-is-disabled`,
      focused: `${classPrefix.value}-is-focused`,
      success: `${classPrefix.value}-is-success`,
      error: `${classPrefix.value}-is-error`,
      warning: `${classPrefix.value}-is-warning`,
      selected: `${classPrefix.value}-is-selected`,
      active: `${classPrefix.value}-is-active`,
      checked: `${classPrefix.value}-is-checked`,
      current: `${classPrefix.value}-is-current`,
      hidden: `${classPrefix.value}-is-hidden`,
      visible: `${classPrefix.value}-is-visible`,
      expanded: `${classPrefix.value}-is-expanded`,
      indeterminate: `${classPrefix.value}-is-indeterminate`,
    })),
  };
}
