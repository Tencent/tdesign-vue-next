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

export function useMutationObservable(
  targetEl: HTMLElement | null,
  cb: MutationCallback,
  options: Options = DEFAULT_OPTIONS,
) {
  const mergedOptions = ref<Options>({ ...DEFAULT_OPTIONS, ...options });
  const callbackRef = ref<MutationCallback>(cb);
  let observer: MutationObserver | null = null;

  const initObserver = () => {
    if (!targetEl) return;

    const { debounceTime = 0, config = DEFAULT_OPTIONS.config } = mergedOptions.value;
    const handler: MutationCallback = (...args) => {
      callbackRef.value(...args);
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
