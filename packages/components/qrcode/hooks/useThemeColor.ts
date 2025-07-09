import { ref, watch, onMounted, onBeforeUnmount, Ref } from 'vue';
import { getColorTokenColor } from '@tdesign/shared-utils/dom';
import { THEME_MODE } from '@tdesign/common-js/common';
import { debounce, isEqual } from 'lodash-es';

export interface ThemeColor {
  color: Ref<string>;
  bgColor: Ref<string>;
}

type MutationCallback = (mutations: MutationRecord[]) => void;

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

function useMutationObservable(targetEl: HTMLElement | null, cb: MutationCallback, options: Options = DEFAULT_OPTIONS) {
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
        initObserver(); // 直接重新初始化
      }
    },
    { deep: true },
  );

  onMounted(initObserver);
  onBeforeUnmount(() => observer?.disconnect());
}

function useThemeColor(): ThemeColor {
  const color = ref(getColorTokenColor('--td-text-color-primary'));
  const bgColor = ref(getColorTokenColor('--td-bg-color-specialcomponent'));

  const targetElement = document?.documentElement;
  useMutationObservable(targetElement, (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === THEME_MODE) {
          color.value = getColorTokenColor('--td-text-color-primary');
          bgColor.value = getColorTokenColor('--td-bg-color-specialcomponent');
        }
      }
    }
  });

  return { color: color, bgColor: bgColor };
}

export default useThemeColor;
