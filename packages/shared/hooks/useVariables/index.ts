import { nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { THEME_MODE } from '@tdesign/common-js/common';
import getColorTokenColor from '@tdesign/common-js/utils/getColorTokenColor';
import useMutationObservable from '../useMutationObservable';

/**
 * useVariables
 * @param variable CSS 变量名
 * @example
 *   const { textColor, brandColor } = useVariables({
 *      textColor: '--td-color-primary',
 *      brandColor: '--td-brand-color',
 *   });
 */
export function useVariables<T extends Record<string, string>>(variables: T): Record<keyof T, Ref<string>> {
  const values = {} as Record<keyof T, Ref<string>>;

  // 初始化 ref
  Object.entries(variables).forEach(([key]) => {
    values[key as keyof T] = ref('');
  });

  // 等待 DOM 更新后获取具体变量的值
  nextTick(() => {
    Object.entries(variables).forEach(([key, varName]) => {
      values[key].value = getColorTokenColor(varName);
    });
  });

  const targetElement = document?.documentElement;
  useMutationObservable(targetElement, (mutationsList) => {
    mutationsList.some((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === THEME_MODE) {
        Object.entries(variables).forEach(([key, varName]) => {
          values[key].value = getColorTokenColor(varName);
        });
        return true;
      }
      return false;
    });
  });

  return values;
}
