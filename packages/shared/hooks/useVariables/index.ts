import { ref } from 'vue';
import type { Ref } from 'vue';
import { isString } from 'lodash-es';
import { THEME_MODE } from '@tdesign/common-js/common';
import { getColorTokenColor } from '@tdesign/shared-utils/dom';
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
  let varsArray: string[] = [];

  varsArray = Object.values(variables);
  Object.entries(variables).forEach(([key, varName]) => {
    values[key as keyof T] = ref(getColorTokenColor(varName));
  });

  varsArray.forEach((varName) => {
    values[varName as keyof T] = ref(getColorTokenColor(varName));
  });

  const targetElement = document?.documentElement;
  useMutationObservable(targetElement, (mutationsList) => {
    mutationsList.some((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === THEME_MODE) {
        if (isString(variables) || Array.isArray(variables)) {
          varsArray.forEach((varName) => {
            values[varName].value = getColorTokenColor(varName);
          });
        } else {
          Object.entries(variables).forEach(([key, varName]) => {
            values[key].value = getColorTokenColor(varName);
          });
        }
        return true;
      }
      return false;
    });
  });

  return values;
}
