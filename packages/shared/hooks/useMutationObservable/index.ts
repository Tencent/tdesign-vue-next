import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { debounce, isEqual } from 'lodash-es';

export interface MutationCallback {
  (mutations: MutationRecord[]): void;
}

interface Options {
  debounceTime?: number;
  config?: MutationObserverInit;
}

const DEFAULT_OPTIONS: Options = {
  debounceTime: 0,
  config: {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  },
};

/**
 * useMutationObservable
 * @param targetEl 监听对象
 * @param callback 回调方法
 * @param options 配置项
 */
export function useMutationObservable(
  targetEl: HTMLElement | null,
  callback: MutationCallback,
  options: Options = DEFAULT_OPTIONS,
) {
  const mergedOptions = ref<Options>({ ...DEFAULT_OPTIONS, ...options });
  let observer: MutationObserver | null = null;

  const initObserver = () => {
    if (!targetEl) return;

    const { debounceTime = 0, config = DEFAULT_OPTIONS.config } = mergedOptions.value;
    const handler: MutationCallback = (...args) => {
      callback?.(...args);
    };

    observer?.disconnect();
    observer = new MutationObserver(debounceTime > 0 ? debounce(handler, debounceTime) : handler);
    observer.observe(targetEl, config);
  };

  watch(
    () => options,
    (newOptions) => {
      if (!isEqual(newOptions, mergedOptions.value)) {
        mergedOptions.value = { ...DEFAULT_OPTIONS, ...newOptions };
        initObserver();
      }
    },
    { deep: true },
  );

  onMounted(initObserver);
  onBeforeUnmount(() => observer?.disconnect());
}

export default useMutationObservable;
