// TODO 应当提取到公共 hooks 中
import { computed, h, inject, getCurrentInstance, ref, provide } from 'vue';
import { cloneDeep, isFunction } from 'lodash-es';

import { defaultGlobalConfig, configProviderInjectKey, mergeWith } from '../utils/context';
import { GlobalConfigProvider, TdConfigProviderProps } from '../type';

import { t as commonT } from '@tdesign/common-js/global-config/t';

// 这是为了解决在非component里调用useConfig hook时发出的警告
// https://github.com/Tencent/tdesign-vue-next/issues/2025
const globalConfigCopy = ref<GlobalConfigProvider>();

export * from '../type';

/**
 * component globalConfig
 * @param componentName
 * @returns {t, globalConfig}
 * useConfig('pagination')
 */
export function useConfig<T extends keyof GlobalConfigProvider>(
  componentName: T = undefined,
  componentLocale?: GlobalConfigProvider[T],
) {
  // If we're in a component, try to inject from parent ConfigProvider first.
  // If inject fails (e.g., component not under ConfigProvider, like in LoadingPlugin),
  // fall back to globalConfigCopy which may have been set by a ConfigProvider elsewhere.
  let injectGlobalConfig = null;
  if (getCurrentInstance()) {
    injectGlobalConfig = inject(configProviderInjectKey, null);
    if (!injectGlobalConfig) {
      // Fallback to globalConfigCopy if inject returns null
      // This handles cases where the component is created outside the ConfigProvider tree
      // (e.g., LoadingPlugin, MessagePlugin, DialogPlugin, etc.)
      injectGlobalConfig = globalConfigCopy;
    }
  } else {
    injectGlobalConfig = globalConfigCopy;
  }
  const mergedGlobalConfig = computed(() => injectGlobalConfig?.value || defaultGlobalConfig);
  const globalConfig = computed(() => Object.assign({}, mergedGlobalConfig.value[componentName], componentLocale));

  const classPrefix = computed(() => {
    return mergedGlobalConfig.value.classPrefix;
  });

  // 处理正则表达式
  const t = function <T>(pattern: T, ...args: any[]) {
    if (isFunction(pattern)) {
      // 重要：组件的渲染必须存在参数 h，不能移除
      if (!args.length) return pattern(h);
      return pattern(...args);
    }
    // 使用公共翻译函数，以支持复数处理
    // @ts-expect-error be passed to rest parameter
    return commonT(pattern, ...args);
  };

  return {
    t,
    global: globalConfig,
    globalConfig,
    classPrefix,
  };
}

/**
 * provide globalConfig
 * @param {TdConfigProviderProps} props
 * @returns {ComputedRef<GlobalConfigProvider>}
 */
export const provideConfig = (props: TdConfigProviderProps) => {
  const defaultData = cloneDeep(defaultGlobalConfig);
  const mergedGlobalConfig = computed(() =>
    Object.assign({}, mergeWith(defaultData as unknown as GlobalConfigProvider, props.globalConfig)),
  );

  provide(configProviderInjectKey, mergedGlobalConfig);

  if (!globalConfigCopy.value) {
    globalConfigCopy.value = mergedGlobalConfig.value;
  }

  return mergedGlobalConfig;
};
